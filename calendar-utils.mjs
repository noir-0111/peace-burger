/** All public dates use Japan time; months are 1–12. */
export const OPEN_MINUTE = 11 * 60 + 30;
export const CLOSE_MINUTE = 15 * 60;
export function businessDates(year, month) {
  const firstSunday = 1 + (7 - new Date(Date.UTC(year, month - 1, 1)).getUTCDay()) % 7;
  return [firstSunday + 7, firstSunday + 21];
}
export function shiftMonth(year, month, amount) {
  const date = new Date(Date.UTC(year, month - 1 + amount, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}
export function jstParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
  }).formatToParts(now);
  return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}
export function nextOpening(today = jstParts()) {
  for (let offset = 0; offset < 2; offset++) {
    const { year, month } = shiftMonth(today.year, today.month, offset);
    for (const day of businessDates(year, month)) {
      const difference = (Date.UTC(year, month - 1, day) - Date.UTC(today.year, today.month - 1, today.day)) / 86400000;
      if (difference < 0 || (difference === 0 && today.hour * 60 + today.minute >= CLOSE_MINUTE)) continue;
      return { year, month, day, isToday: difference === 0, isOpen: difference === 0 && today.hour * 60 + today.minute >= OPEN_MINUTE };
    }
  }
}
