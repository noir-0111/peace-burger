const filmPaths = new Set([
  '/assets/film/signature.mp4',
  '/assets/film/griddle.mp4'
]);

function matchesIfRange(value, headers) {
  if (!value) return true;
  if (value.startsWith('W/')) return false;
  if (value.startsWith('"')) return value === headers.get('ETag');
  const modified = headers.get('Last-Modified');
  return modified !== null && Number.isFinite(Date.parse(value))
    && Date.parse(value) === Date.parse(modified);
}

function byteRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value);
  if (!match || (!match[1] && !match[2])) return null;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (suffix === 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  }
  if (start >= size || start > end) return null;
  return { start, end };
}

export async function onRequestGet({ request, env }) {
  if (!filmPaths.has(new URL(request.url).pathname)) return env.ASSETS.fetch(request);

  // ASSETS applies the project's existing cache and security header rules.
  const upstream = new Request(request);
  upstream.headers.delete('Range');
  upstream.headers.delete('If-Range');
  upstream.headers.set('Accept-Encoding', 'identity');
  const asset = await env.ASSETS.fetch(upstream);
  if (asset.status !== 200 || !asset.headers.get('Content-Type')?.startsWith('video/mp4')) {
    return asset;
  }
  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');

  if (request.method === 'HEAD') return new Response(null, { status: 200, headers });
  const range = request.headers.get('Range')?.trim();
  if (!range || !matchesIfRange(request.headers.get('If-Range'), headers)
    || !/^bytes=/i.test(range) || range.includes(',')) {
    return new Response(asset.body, { status: 200, headers });
  }

  // These two local MP4s are under 7 MB. Only range requests buffer the file.
  const bytes = await asset.arrayBuffer();
  const selection = byteRange(range, bytes.byteLength);
  headers.delete('Content-Encoding');
  if (!selection) {
    headers.set('Content-Range', `bytes */${bytes.byteLength}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }

  const { start, end } = selection;
  headers.set('Content-Range', `bytes ${start}-${end}/${bytes.byteLength}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

export const onRequestHead = onRequestGet;
