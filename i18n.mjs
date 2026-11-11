// Human-editable copy. Japanese source markup remains the default and fallback.
export const languages = ['ja', 'en', 'ko', 'zh-Hans'];
export const locales = { ja: 'ja-JP', en: 'en-GB', ko: 'ko-KR', 'zh-Hans': 'zh-CN' };
const entries = [
['.skip-link','Skip to content','본문 바로가기','跳转到正文'],
['.intro-word','Let’s dig in!','잘 먹겠습니다!','开动啦！'],
['#skip-intro','Skip ↗','건너뛰기 ↗','跳过 ↗'],
['nav a[href="#top"]','Home','처음으로','首页'],
['nav a[href="#craft"]','Our craft','맛의 비밀','美味秘诀'],
['nav a[href="#menu"]','Menu','메뉴','菜单'],
['nav a[href="#story"]','Our story','가게 이야기','我们的故事'],
['nav a[href="#calendar"]','Opening days','영업일','营业日'],
['nav a[href="#access"]','Visit us ↗','찾아오시는 길 ↗','到店路线 ↗'],
['.header-access','Visit us <span>↗</span>','찾아오시는 길 <span>↗</span>','到店路线 <span>↗</span>'],
['.hero-location','Heiwa, Fukuoka.<br>A treat, twice a month.','후쿠오카 헤이와,<br>한 달에 두 번의 즐거움.','福冈·平和，<br>每月两次的美味期待。'],
['#hero-title','<span class="hero-small">Every 2nd &amp; 4th Sunday,</span><span class="hero-burger-line">a special burger.</span><span class="hero-big"><span>Dig</span><span>in.</span></span>','<span class="hero-small">둘째·넷째 일요일엔,</span><span class="hero-burger-line">특별한 버거를</span><span class="hero-big"><span>크게</span><span>한입!</span></span>','<span class="hero-small">每月第2、第4个星期日，</span><span class="hero-burger-line">特别的汉堡，</span><span class="hero-big"><span>就要</span><span>大口吃！</span></span>'],
['.hero-tag','Handmade.<br>Even the buns.','번부터<br>직접 만듭니다.','从面包开始，<br>店内手工制作。'],
['.hero-fries>span','Fries?<br>Of course!','감자튀김도<br>함께!','薯条也<br>一起吃！'],
['.open-stamp','<span class="hours-label">Every 2nd &amp; 4th Sunday</span><strong class="hours-time">11:30<span>–</span>15:00</strong>','<span class="hours-label">매월 둘째·넷째 일요일</span><strong class="hours-time">11:30<span>–</span>15:00</strong>','<span class="hours-label">每月第2、第4个星期日</span><strong class="hours-time">11:30<span>–</span>15:00</strong>'],
['.hero-bottom>p','Big bites. No fuss.<br>Make Sunday lunch a little special.','격식 없이, 크게 한입.<br>일요일 점심을 조금 특별하게.','不必拘束，大口享用。<br>让周日午餐多一点特别。'],
['.ribbon-group>span','Fluffy. Juicy. Happy.','폭신. 촉촉. 미소.','松软。多汁。满足。'],
['.signature-copy>.eyebrow','Your Sunday treat.','일요일의 특별한 한 끼.','星期天的美味犒赏。'],
['#signature-title','<span class="red-label">Twice a month</span><span class="serif-line">A little <span class="big-kanji">treat.</span></span><span class="serif-line">A <span class="circle-word">big bite.</span></span>','<span class="red-label">한 달에 두 번</span><span class="serif-line">작은 <span class="big-kanji">행복</span>을,</span><span class="serif-line">커다란 <span class="circle-word">한입</span>에.</span>','<span class="red-label">每月两次</span><span class="serif-line">一点<span class="big-kanji">小奢侈</span>，</span><span class="serif-line">尽在<span class="circle-word">大大一口</span>。</span>'],
['.signature-copy>.body-copy','A homemade bun and a 100% beef patty.<br>Fresh vegetables and our special cheese sauce.<br>Start with our signature Peace Burger.','직접 만든 번에 소고기 100% 패티.<br>채소와 특제 치즈 소스를 더한,<br>먼저 맛보셨으면 하는 피스 버거.','自制面包搭配100%牛肉饼，<br>叠上蔬菜和特制芝士酱。<br>第一次来，就尝尝招牌和平汉堡。'],
['.signature-copy>.ink-link','Choose your burger <span>↗</span>','오늘의 버거 고르기 <span>↗</span>','挑选今天的汉堡 <span>↗</span>'],
['.food-caption','Go on.<br>Take a big bite!','망설이지 말고,<br>크게 한입!','别客气，<br>大口咬下去！'],
['.signature-scribble','Great flavour.<br>Bigger bites.','맛있는 순간은,<br>커다란 한입에서.','美味，<br>从大口吃开始。'],
['.craft-heading>.eyebrow','The first secret to delicious.','맛있는 이유, 첫 번째.','美味秘诀，第一章。'],
['#buns-title','<span class="red-label">Baked for this day</span><span class="serif-line">Handmade.<br><strong>Right from the bun.</strong></span>','<span class="red-label">이날을 위해</span><span class="serif-line">번부터,<br><strong>정성껏 만듭니다.</strong></span>','<span class="red-label">专为这一天烘焙</span><span class="serif-line">从面包开始，<br><strong>认真手作。</strong></span>'],
['.photo-stamp','Baked<br>in-house','매장에서<br>직접 굽는 번','店内<br>新鲜烘焙'],
['.sensory-buns','<span>Fluf</span><span>fy</span><small>!</small>','<span>폭</span><span>신</span><small>!</small>','<span>松</span><span>软</span><small>！</small>'],
['.buns-copy>h3','Made for that very first bite.','한입 베어 무는, 그 순간까지.','只为咬下的那一刻。'],
['.buns-copy>.body-copy','We bake our buns in-house for burger day.<br>Fluffy, fragrant and golden.<br><mark>The bun is a star in its own right.</mark>','이날을 위해 매장에서 구워 내는 번.<br>폭신하고, 고소하게.<br><mark>빵도 맛의 주인공입니다.</mark>','为了这一天，在店里亲手烤制面包。<br>松软，满是烘焙香气。<br><mark>面包也是美味的主角。</mark>'],
['.patty-heading>.eyebrow','The second secret to delicious.','맛있는 이유, 두 번째.','美味秘诀，第二章。'],
['#patty-title>.cream-label','Serious about the sear.','굽기에도, 진심을.','火候，认真讲究。'],
['.sensory-patty','Sizzle<small>!</small>','지글<small>지글!</small>','滋滋<small>作响！</small>'],
['.patty-paper>h3','A patty you can taste<br>the difference in.','한입 먹는 순간,<br>다름이 느껴지는 패티.','咬下第一口，<br>就能尝出不同。'],
['.patty-paper>p','Carefully chosen ingredients, carefully cooked.<br>With our homemade bun,<br>every bite brings it all together.','재료와 굽기에 정성을 담은 패티.<br>직접 만든 번과 함께 베어 물면,<br>한입 가득 맛이 어우러집니다.','用心挑选食材，认真掌握火候。<br>与自制面包一起咬下，<br>每一口，都是层层美味。'],
['.fries-break .sensory','Crunch<small>!</small>','바삭<small>!</small>','咔嚓<small>！</small>'],
['.fries-line','One more bite.<br><span class="red-label">Can’t resist.</span>','자꾸 손이 가는,<br><span class="red-label">이 맛.</span>','忍不住，<br><span class="red-label">再来一口。</span>'],
['.fries-break .body-copy','Fries come with every burger.','모든 버거에는 감자튀김이 함께 나옵니다.','每款汉堡都配有薯条。'],
['.menu-heading>.eyebrow','Pick today’s main event.','오늘의 주인공을 골라 보세요.','选出今天的主角。'],
['#menu-title','<span>Which one</span><strong>will you bite into?</strong>','<span>어떤 버거를</span><strong>한입 베어 볼까요?</strong>','<span>今天想</span><strong>咬哪一口？</strong>'],
['.menu-heading>p:last-child','Swipe through and find your favourite.','좌우로 넘기며 마음에 드는 한 접시를 골라 보세요.','左右滑动，选出心仪的一盘。'],
['[data-index="0"] .plate-label','Start here!','고민된다면, 이걸로!','第一次来，就选它！'],
['[data-index="1"] .plate-label','Sweet meets savoury.','달콤 짭짤한 맛.','甜咸交织，刚刚好。'],
['[data-index="2"] .plate-label','A little extra treat.','조금 더 특별하게.','多一层美味犒赏。'],
['[data-index="3"] .plate-label','In the mood for shrimp?','탱글한 새우가 당기는 날.','换个口味，尝尝虾排。'],
['.price>span','JPY','엔','日元'],
['.price>small','Fries included','감자튀김 포함','含薯条'],
['#menu-random','Surprise me! <span aria-hidden="true">↻</span>','골라 주세요! <span aria-hidden="true">↻</span>','帮我选一个！ <span aria-hidden="true">↻</span>'],
['.side-menu>h3','Something on the side?','하나 더 곁들일까요?','再搭配一点？'],
['.side-menu dl>div:nth-child(1)>dt','Extra fries','감자튀김 단품','单点薯条'],
['.side-menu dl>div:nth-child(2)>dt','Salad set','샐러드 세트','沙拉套餐'],
['.side-menu dl>div:nth-child(3)>dt','Soft drink','소프트드링크','软饮'],
['.side-menu dl>div:nth-child(4)>dt','Highball / wine','하이볼·와인','嗨棒／葡萄酒'],
['.side-menu dl>div:nth-child(1)>dd','JPY 300','300엔','300日元'],
['.side-menu dl>div:nth-child(2)>dd','+ JPY 500','＋500엔','＋500日元'],
['.side-menu dl>div:nth-child(3)>dd','JPY 300','300엔','300日元'],
['.side-menu dl>div:nth-child(4)>dd','JPY 500','500엔','500日元'],
['.story-top>.eyebrow','Two sides to the same place.','이 가게의 또 다른 모습.','同一家店，两种美好时光。'],
['#story-title','<span class="day-word">Day</span><small>&</small><span class="night-word">Night</span><span class="story-title-end">Twice the delight.</span>','<span class="day-word">낮</span><small>과</small><span class="night-word">밤</span><span class="story-title-end">두 번 즐거운 곳.</span>','<span class="day-word">昼</span><small>与</small><span class="night-word">夜</span><span class="story-title-end">双倍的美味时光。</span>'],
['.story-bubble>span','From the heart','가게의 마음','我们的心意'],
['.story-note','With family. With friends.<br>Just you is lovely, too.','가족과. 친구와.<br>물론, 혼자서도.','和家人，和朋友，<br>当然，一个人也欢迎。'],
['#story-day','☀ By day','☀ 낮의 모습','☀ 白天'],
['#story-night','☾ By night','☾ 밤의 모습','☾ 夜晚'],
['.calendar-copy>.eyebrow','When’s our next Sunday together?','다음 만남은 어느 일요일일까요?','下次相聚，是哪个星期天？'],
['#calendar-title','<span class="red-label">On your calendar</span><span class="serif-line">Make a <span class="calendar-circle">date.</span></span>','<span class="red-label">달력에</span><span class="serif-line">맛있는 <span class="calendar-circle">동그라미</span>를.</span>','<span class="red-label">在日历上</span><span class="serif-line"><span class="calendar-circle">圈出</span>美味。</span>'],
['.calendar-copy>.body-copy','The 2nd and 4th Sunday of every month.<br>Bring your appetite.','매월 둘째·넷째 일요일.<br>배고픈 마음으로 찾아오세요.','每月第2、第4个星期日。<br>带着好胃口来吧。'],
['.schedule-note','These are our regular opening days.<br>Please check Instagram for any changes.','정기 영업 일정입니다.<br>임시 변경 사항은 인스타그램을 확인해 주세요.','以上为常规营业计划。<br>临时调整请查看Instagram。'],
['.calendar-legend>span','<i></i> Burger opening day','<i></i> 버거 영업 예정일','<i></i> 汉堡营业计划日'],
['#month-today','This month','이번 달','本月'],
['.access-heading>.eyebrow','Your Sunday treat is right here.','맛있는 일요일은, 이곳에서.','美味的星期天，就在这里。'],
['#access-title','<span class="access-place">Heiwa, Minami Ward, Fukuoka City</span><span class="red-label">See you soon.</span>','<span class="access-place">후쿠오카시 미나미구 헤이와에서</span><span class="red-label">기다릴게요.</span>','<span class="access-place">在福冈市南区平和</span><span class="red-label">等你来。</span>'],
['.map-frame>a','Open map & directions ↗','큰 지도로 길찾기 ↗','打开地图查看路线 ↗'],
['.shop-info>h3','Peace Burger','피스 버거','和平汉堡'],
['.shop-info>p','Inside Italian bar Hirutoyoru','이탈리안 바 「히루토요루」 내','位于意式餐酒吧「Hirutoyoru」内'],
['.shop-info dl>div:nth-child(1)>dt','Open','영업일','营业日'],
['.shop-info dl>div:nth-child(1)>dd','2nd & 4th Sunday each month','매월 둘째·넷째 일요일','每月第2、第4个星期日'],
['.shop-info dl>div:nth-child(2)>dt','Hours','시간','时间'],
['.shop-info dl>div:nth-child(3)>dt','Address','주소','地址'],
['.shop-info dl>div:nth-child(3)>dd','〒815-0071<br>2-1-1 Heiwa, Minami-ku,<br>Fukuoka, Japan','〒815-0071<br>일본 후쿠오카시 미나미구<br>헤이와 2-1-1','〒815-0071<br>日本福冈市南区平和2-1-1'],
['.shop-info dl>div:nth-child(4)>dt','Phone','전화','电话'],
['.contact-links a:first-child','Latest updates on Instagram ↗','인스타그램에서 최신 소식 ↗','Instagram最新动态 ↗'],
['.contact-links a:last-child','Official LINE ↗','공식 LINE ↗','官方LINE ↗'],
['.footer-message>span','Until then,','그럼,','那么，'],
['.footer-message>strong','See you on Sunday!','일요일에 만나요!','星期天见！'],
['#mobile-menu>div>span','Peace Burger','피스 버거','和平汉堡'],
['#close-menu','Close ×','닫기 ×','关闭 ×'],
['#mobile-menu>p','2nd & 4th Sunday each month<br>11:30–15:00','매월 둘째·넷째 일요일<br>11:30–15:00','每月第2、第4个星期日<br>11:30–15:00']
];
export const copy = {
 ja: {
  title:'ピースバーガー｜第2・第4日曜日は、特別なバーガーにかぶりつく日。',
  description:'毎月第2・第4日曜日、11:30〜15:00。福岡市南区平和で、バンズから手づくりのピースバーガー。おしながき、営業日カレンダー、お店への行き方をご覧いただけます。',
  next:'次の営業予定は',today:'本日は営業予定日です',beforeOpen:'本日、11:30から営業予定',calendar:'営業日カレンダー',opening:'バーガー営業予定日',choose:'を選ぶ',
  names:['ピースバーガー','テリヤキ','テリヤキエッグ','エビカツ'],
  descriptions:['ビーフ100%パティにベーコン、レタス、トマト。特製チーズソースを重ねた、看板バーガー。','甘辛いテリヤキソースとパティを、自家製バンズで。今日は、親しみのあるこの味に。','テリヤキにたまごを重ねた、ちょっと欲張りなひと皿。大きな口で、いっしょにどうぞ。','エビカツを自家製バンズではさんだ一品。お肉とはひと味違うおいしさを楽しみたい日に。'],
  day:{bubble:'「今日はバーガー<br><strong>食べに行こう！</strong>」',note:'そう思ってもらえる、手づくりの一品を。',sign:'日曜のお昼は、ピースバーガー。',subtitle:'月に二度だけ、ハンバーガーの店に。',text:'福岡・平尾のイタリアンバル「ヒルトヨル」が、毎月第2・第4日曜日のお昼だけ「ピースバーガー」に大変身。バンズから一つひとつ、丁寧に焼き上げています。'},
  night:{bubble:'毎日がんばる自分へ。<br><strong>ご褒美のイタリアンを。</strong>',note:'心をこめた、自慢のひと皿と。',sign:'ヨルは、イタリアンバル。',subtitle:'自分に、ご褒美のイタリアンを。',text:'夜の「ヒルトヨル」は、ワインとパスタを楽しむイタリアンバル。心をこめたひと皿とともに、毎日がんばる自分に、おいしいひとときを。'}
 },
 en: {
  title:'Peace Burger | Sundays are for big bites.',description:'Handmade burgers in Heiwa, Fukuoka, on the 2nd and 4th Sundays of each month. Menu, opening calendar and directions.',next:'Our next scheduled opening',today:'Today is a scheduled opening day',beforeOpen:'Scheduled to open today at 11:30',calendar:'Opening calendar',opening:'Burger opening day',choose:'Choose ',
  names:['Peace Burger','Teriyaki','Teriyaki Egg','Shrimp Cutlet'],
  descriptions:['Our signature burger: a 100% beef patty, bacon, lettuce and tomato, finished with our special cheese sauce.','A beef patty with sweet and savoury teriyaki sauce in our homemade bun. A familiar favourite for today.','Teriyaki with an egg on top. A little extra indulgence, made for a big bite.','A shrimp cutlet in our homemade bun. For those days when you fancy something a little different.'],
  day:{bubble:'“Let’s go out<br><strong>for burgers today!”</strong>',note:'Handmade food that makes you want to say just that.',sign:'Sunday lunch means Peace Burger.',subtitle:'Twice a month, we become a burger place.',text:'Hirutoyoru, an Italian bar in Fukuoka’s Hirao area, becomes Peace Burger at lunchtime on the 2nd and 4th Sundays of each month. Every bun is baked with care in-house.'},
  night:{bubble:'You deserve a treat.<br><strong>Enjoy Italian tonight.</strong>',note:'A dish we’re proud of, made with heart.',sign:'By night, an Italian bar.',subtitle:'A little Italian reward for yourself.',text:'By night, Hirutoyoru is an Italian bar serving wine and pasta. Take a moment for yourself and enjoy a dish made with care.'}
 },
 ko: {
  title:'피스 버거 | 일요일엔 크게 한입!',description:'매월 둘째·넷째 일요일, 후쿠오카 헤이와에서 번부터 직접 만드는 피스 버거. 메뉴, 영업일 달력, 오시는 길.',next:'다음 영업 예정일',today:'오늘은 영업 예정일입니다',beforeOpen:'오늘 11:30에 영업 예정',calendar:'영업일 달력',opening:'버거 영업 예정일',choose:' 선택',
  names:['피스 버거','데리야키','데리야키 에그','새우카츠'],
  descriptions:['소고기 100% 패티에 베이컨, 양상추, 토마토와 특제 치즈 소스를 더한 대표 버거.','달콤 짭짤한 데리야키 소스와 패티를 직접 만든 번에 담았습니다. 오늘은 익숙하고 반가운 맛으로.','데리야키에 달걀을 더한, 조금 더 푸짐한 한 접시. 크게 한입 베어 물어 보세요.','직접 만든 번에 새우카츠를 넣었습니다. 고기와는 또 다른 맛이 당기는 날에.'],
  day:{bubble:'“오늘은 버거<br><strong>먹으러 가자!”</strong>',note:'그 말이 절로 나오는, 정성껏 만든 한 끼를.',sign:'일요일 점심은, 피스 버거.',subtitle:'한 달에 두 번, 버거 가게로 변신합니다.',text:'후쿠오카 히라오의 이탈리안 바 「히루토요루」가 매월 둘째·넷째 일요일 점심에만 「피스 버거」로 변신합니다. 번부터 하나하나 정성껏 구워 냅니다.'},
  night:{bubble:'매일 애쓰는 나에게.<br><strong>이탈리안으로 선물을.</strong>',note:'마음을 담아 만든, 자신 있는 한 접시.',sign:'밤에는, 이탈리안 바.',subtitle:'나를 위한 작은 선물, 이탈리안.',text:'밤의 「히루토요루」는 와인과 파스타를 즐기는 이탈리안 바입니다. 정성껏 준비한 한 접시와 함께, 매일 애쓰는 나에게 맛있는 휴식을 선물하세요.'}
 },
 'zh-Hans': {
  title:'和平汉堡 | 星期天，就要大口吃！',description:'每月第2、第4个星期日，在福冈平和品尝从面包开始手工制作的和平汉堡。菜单、营业日历与到店路线。',next:'下一次营业计划日',today:'今天是营业计划日',beforeOpen:'今天计划于11:30开始营业',calendar:'营业日历',opening:'汉堡营业计划日',choose:'选择',
  names:['和平汉堡','照烧汉堡','照烧鸡蛋汉堡','虾排汉堡'],
  descriptions:['100%牛肉饼搭配培根、生菜、番茄，再叠上特制芝士酱。这就是我们的招牌汉堡。','香甜咸鲜的照烧酱与肉饼，夹入自制面包。今天，就选这份熟悉的美味。','在照烧汉堡里再加一层鸡蛋，多一点丰盛，多一份满足。一起大口享用吧。','自制面包夹上虾排。想尝试不同于肉饼的风味时，就选这一款。'],
  day:{bubble:'“今天一起去<br><strong>吃汉堡吧！”</strong>',note:'用心手作，让你想起就想来吃的一餐。',sign:'周日午餐，来吃和平汉堡。',subtitle:'每月两次，变身汉堡小店。',text:'福冈平尾的意式餐酒吧「Hirutoyoru」，每月第2、第4个星期日的午间会变身为「和平汉堡」。从面包开始，每一个都认真制作、用心烘焙。'},
  night:{bubble:'犒赏每天努力的自己，<br><strong>享用一餐意式美味。</strong>',note:'用心制作，献上我们的拿手好菜。',sign:'到了夜晚，是意式餐酒吧。',subtitle:'用一餐意式美味，犒赏自己。',text:'夜晚的「Hirutoyoru」是一家可以享用葡萄酒与意大利面的意式餐酒吧。用一盘倾注心意的美食，为每天努力的自己留一段美好时光。'}
 }
};
const attributes = [
 ['#intro','aria-label','Opening burger animation','버거 오프닝 애니메이션','汉堡开场动画'],
 ['.brand','aria-label','Peace Burger — back to top','피스 버거·맨 위로','和平汉堡·回到顶部'],
 ['.desktop-nav','aria-label','Main navigation','메인 메뉴','主导航'],
 ['.nav-toggle','aria-label','Open navigation','메뉴 열기','打开导航'],
 ['#close-menu','aria-label','Close navigation','메뉴 닫기','关闭导航'],
 ['#buns-play','aria-label','Make the bun bounce','번을 폭신하게 움직이기','让面包弹一弹'],
 ['.sensory-buns','aria-label','Fluffy!','폭신!','松软！'],
 ['.fries-break','aria-label','Fries on the side','감자튀김도 함께','薯条一起吃'],
 ['.menu-carousel','aria-roledescription','carousel','캐러셀','轮播'],
 ['.menu-carousel','aria-label','Four burgers','네 가지 버거','四款汉堡'],
 ['.menu-tabs','aria-label','Choose by name','이름으로 고르기','按名称选择'],
 ['#menu-prev','aria-label','Previous burger','이전 버거 보기','上一款汉堡'],
 ['#menu-next','aria-label','Next burger','다음 버거 보기','下一款汉堡'],
 ['.day-night-switch','aria-label','Day and night','낮과 밤의 모습','白天与夜晚'],
 ['#month-prev','aria-label','Previous month','이전 달','上个月'],
 ['#month-next','aria-label','Next month','다음 달','下个月'],
 ['.map-frame iframe','title','Peace Burger, 2-1-1 Heiwa, Minami Ward, Fukuoka City','피스 버거·후쿠오카시 미나미구 헤이와 2-1-1 지도','和平汉堡·福冈市南区平和2-1-1地图'],
 ['.footer nav','aria-label','Footer navigation','하단 메뉴','页脚导航'],
 ['.mobile-dock','aria-label','Quick navigation','빠른 메뉴','快捷导航'],
 ['#mobile-menu nav','aria-label','Navigation','메뉴','导航'],
 ['img[src="assets/logo.png"]','alt','Peace Burger','피스 버거','和平汉堡'],
 ['img[src="assets/burger-cutout.png"][alt]:not([alt=""])','alt','Peace Burger with a homemade bun','직접 만든 번의 피스 버거','自制面包的和平汉堡'],
 ['img[src="assets/fries-cutout.png"][alt]:not([alt=""])','alt','Illustration of golden fries','노릇한 감자튀김 이미지','金黄薯条示意图'],
 ['img[src="assets/buns-closeup.png"]','alt','Illustration of a fluffy homemade bun','폭신한 수제 번의 단면 이미지','松软自制面包的切面示意图'],
 ['.signature-reel .film-poster','alt','Peace Burger with bacon and a cheese-topped patty on a house-baked bun','수제 번에 베이컨과 치즈 패티를 올린 피스 버거','自制面包夹着培根和芝士肉饼的和平汉堡'],
 ['.craft-patty .film-poster','alt','Beef patties searing on the griddle','철판 위에서 노릇하게 익어가는 소고기 패티','牛肉饼在铁板上煎至焦香'],
 ['img[src="assets/peace.png"]','alt','Peace Burger with fries','피스 버거와 감자튀김','和平汉堡配薯条'],
 ['img[src="assets/teriyaki.png"]','alt','Teriyaki burger with fries','데리야키 버거와 감자튀김','照烧汉堡配薯条'],
 ['img[src="assets/teriyaki-egg.png"]','alt','Teriyaki egg burger with fries','데리야키 에그와 감자튀김','照烧鸡蛋汉堡配薯条'],
 ['img[src="assets/ebikatsu.png"]','alt','Shrimp cutlet burger with fries','새우카츠 버거와 감자튀김','虾排汉堡配薯条'],
 ['img[src="assets/staff.png"]','alt','The Peace Burger team','피스 버거 직원들','和平汉堡的伙伴们'],
 ['img[src="assets/exterior.png"]','alt','Entrance to Hirutoyoru','히루토요루 입구','Hirutoyoru店铺入口']
];
let originalMarkup, originalAttributes;
export function applyTranslations(language) {
 const index = languages.indexOf(language);
 if (index < 0) throw new Error('Unsupported language');
 // Capture each Japanese element separately, including repeated navigation labels.
 originalMarkup ??= entries.map(([selector]) => [...document.querySelectorAll(selector)].map(el => [el, el.innerHTML]));
 originalAttributes ??= attributes.map(([selector,attribute]) => [...document.querySelectorAll(selector)].map(el => [el, el.getAttribute(attribute)]));
 entries.forEach((entry, i) => originalMarkup[i].forEach(([el, ja]) => { el.innerHTML = index === 0 ? ja : entry[index]; }));
 attributes.forEach((entry, i) => originalAttributes[i].forEach(([el, ja]) => { el.setAttribute(entry[1], index === 0 ? ja : entry[index + 1]); }));
 document.documentElement.lang = language;
 document.title = copy[language].title;
 document.querySelector('meta[name="description"]').content = copy[language].description;
 document.querySelector('#language-select').value = language;
 if (language === 'ko' || language === 'zh-Hans') {
  const id = `font-${language}`;
  if (!document.getElementById(id)) {
   const link = document.createElement('link'); link.id = id; link.rel = 'stylesheet';
   const suffix = language === 'ko' ? 'KR' : 'SC';
   link.href = `https://fonts.googleapis.com/css2?family=Noto+Sans+${suffix}:wght@400;500;700;900&family=Noto+Serif+${suffix}:wght@700;900&display=swap`;
   document.head.append(link);
  }
 }
}
