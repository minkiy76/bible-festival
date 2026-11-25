const $ = (selector) => document.querySelector(selector);

// 문자열을 html에 안전하게 넣기 위한 이스케이프
function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(text ?? "").replace(/[&<>"]/g, (ch) => map[ch]);
}

// IMG에 있는 이름이면 그 파일 경로를, 아니면 그대로(주소) 사용
function imageUrl(key) {
  const url = IMG[key] || key;
  // 파일 경로(images/...)에는 VERSION 을 붙여서, 사진을 바꿔 올렸을 때 브라우저가 예전 사진을 계속 쓰지 않게 한다.
  const isFile = !/^(https?:|data:)/.test(url);
  return isFile && typeof VERSION !== "undefined" ? url + "?v=" + VERSION : url;
}

/* ---------- 상품 이미지 ---------- */

// 상품 이미지 태그. 파일이 없거나 열리지 않으면 아래 error 핸들러가 "이미지 준비 중"으로 바꾼다.
function productImage(product) {
  return `<img src="${escapeHtml(imageUrl(product.img))}" alt="${escapeHtml(product.name)}" loading="lazy">`;
}

addEventListener("error", (event) => {
  const img = event.target;
  if (!img || img.tagName !== "IMG" || !img.closest(".im")) return;

  const placeholder = document.createElement("div");
  placeholder.className = "ph";
  placeholder.textContent = "이미지 준비 중";
  img.replaceWith(placeholder);
}, true);

/* ---------- 공통 영역 (로고, 메뉴, 푸터) ---------- */

function renderCommon() {
  $("#logo").src = imageUrl(SITE.logo);
  $("#churchName").textContent = SITE.church;
  $("#footerLogo").src = imageUrl(SITE.footerLogo);
  $("#footerName").textContent = SITE.footerName;
  $("#footerAddress").textContent = SITE.address;
}

// 메뉴: "바이블 페스티벌(홈)" + 코너들
function renderMenu() {
  const items = [["", "바이블 페스티벌"], ...CORNERS.map((c) => [c.name, c.name])];
  $("#menu").innerHTML = items
    .map(([key, label]) => `<a href="#${encodeURIComponent(key)}" data-k="${escapeHtml(key)}">${escapeHtml(label)}</a>`)
    .join("<span>·</span>");

  $("#burger").onclick = () => $("#menu").classList.toggle("open");   // 모바일 햄버거
  $("#menu").onclick = () => $("#menu").classList.remove("open");
}

/* ---------- 홈 화면 ---------- */

let slideTimer = null;

// 행사 사진 슬라이드: 3.5초마다 자동 전환 + 좌우로 밀기 + 아래 점을 눌러 이동
function setupGallery() {
  const gallery = $("#gallery");
  const track = gallery.querySelector(".gal-track");
  const dots = [...document.querySelectorAll(".dots button")];
  const count = dots.length;
  let current = 0;

  // index 번째 사진을 보여준다. 바로 옆 사진으로 갈 때만 미끄러지고, 멀리 이동(맨 끝에서 처음 등)은 바로 바꾼다.
  function show(index, animate = true) {
    const next = (index + count) % count;
    const adjacent = Math.abs(next - current) === 1;
    track.style.transition = animate && adjacent ? "" : "none";
    track.style.transform = `translateX(${-next * 100}%)`;
    current = next;
    dots.forEach((dot, i) => dot.classList.toggle("on", i === current));
  }

  function restartTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => show(current + 1), 3500);
  }

  // 점을 누르면 그 사진으로 이동
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      show(i);
      restartTimer();
    });
  });

  // 손가락(또는 마우스)으로 좌우로 밀기
  let startX = null;
  let startY = 0;
  let deltaX = 0;
  let dragging = false;

  gallery.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    deltaX = 0;
    dragging = false;
    clearInterval(slideTimer);          // 밀고 있는 동안은 자동 전환을 멈춘다
  });

  gallery.addEventListener("pointermove", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!dragging) {
      // 세로로 움직이면(스크롤) 끼어들지 않고, 가로로 8px 이상 움직일 때부터 사진을 따라 움직인다.
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      dragging = true;
      gallery.setPointerCapture(e.pointerId);
      track.style.transition = "none";
    }
    deltaX = dx;
    track.style.transform = `translateX(calc(${-current * 100}% + ${dx}px))`;
  });

  function finishDrag() {
    if (startX === null) return;
    if (dragging) {
      const threshold = Math.max(40, gallery.clientWidth * 0.15);   // 이만큼 이상 밀면 다음/이전 사진
      if (deltaX < -threshold) show(current + 1);
      else if (deltaX > threshold) show(current - 1);
      else show(current);                                           // 조금만 밀었으면 제자리로
    }
    startX = null;
    dragging = false;
    restartTimer();
  }
  gallery.addEventListener("pointerup", finishDrag);
  gallery.addEventListener("pointercancel", finishDrag);

  show(0, false);
  restartTimer();
}

function renderHome() {
  // 코너 타일 (TILE_ORDER 순서)
  const tiles = TILE_ORDER
    .map((name) => CORNERS.find((c) => c.name === name))
    .map((c) => `
      <a class="tile" href="#${encodeURIComponent(c.name)}">
        <img src="${imageUrl(c.tile)}" alt="${escapeHtml(c.name)}">
        <span class="lb">${escapeHtml(c.name)}</span>
      </a>`)
    .join("");

  // 행사 사진 슬라이드 + 점 표시
  const photos = SITE.gallery.map((key) => `<img src="${imageUrl(key)}" alt="">`).join("");
  const dots = SITE.gallery
    .map((_, i) => `<button type="button" class="${i === 0 ? "on" : ""}" aria-label="${i + 1}번째 사진"></button>`)
    .join("");

  // 예배 안내
  const info = SITE.info;
  const infoLines = info.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");

  $("#page").innerHTML = `
    <div class="home">
      <div class="tiles">${tiles}</div>
      <hr class="sep">
      <div class="gal" id="gallery"><div class="gal-track">${photos}</div></div>
      <div class="dots">${dots}</div>
      <hr class="sep">
      <div class="info">
        <img class="ip" src="${imageUrl(info.photo)}" alt="">
        <div class="it">
          <h3>${escapeHtml(info.title)} <small>${escapeHtml(info.age)}</small></h3>
          ${infoLines}
        </div>
      </div>
    </div>`;

  setupGallery();
}

/* ---------- 코너(상품 목록) 화면 ---------- */

// 소분류(GROUP_ORDER 순서), 포인트 높은순, 이름 가나다순
function groupRank(product) {
  const rank = GROUP_ORDER.indexOf(product.group);
  return rank === -1 ? 0 : rank;       // group 이 없는 상품은 맨 앞 그룹으로 취급
}

function sortProducts(a, b) {
  return (groupRank(a) - groupRank(b)) || (b.points - a.points) || a.name.localeCompare(b.name, "ko");
}

function productCard(product) {
  const hasPoints = product.points !== "" && product.points != null;
  const points = hasPoints
    ? `<em>${escapeHtml(Number(product.points).toLocaleString("ko-KR"))}</em> 포인트`
    : "";
  return `
    <div class="p">
      <div class="im">${productImage(product)}</div>
      <b>${escapeHtml(product.name)}</b>
      <span>${points}</span>
    </div>`;
}

function renderCorner(corner) {
  const products = PRODUCTS.filter((p) => p.cat === corner.name).sort(sortProducts);

  // 두 개씩 한 줄로 묶는다 (모바일은 CSS에서 한 줄에 하나)
  let rows = "";
  for (let i = 0; i < products.length; i += 2) {
    rows += `<div class="row">${products.slice(i, i + 2).map(productCard).join("")}</div>`;
  }
  $("#page").innerHTML = `<div class="list">${rows}</div>`;
}

/* ---------- 화면 전환 (주소의 #해시로 홈/코너 구분) ---------- */

function route() {
  clearInterval(slideTimer);

  const key = decodeURIComponent(location.hash.slice(1));

  const corner = CORNERS.find((c) => c.name === key);
  const isHome = !corner;

  // 현재 메뉴 강조
  document.querySelectorAll("#menu a").forEach((a) => {
    a.classList.toggle("on", a.dataset.k === (isHome ? "" : key));
  });

  // 배너 사진 + 제목
  const hero = $("#hero");
  hero.style.backgroundImage = `url("${imageUrl(isHome ? SITE.banner : corner.banner)}")`;
  hero.classList.toggle("light", !isHome && !!corner.light);

  $("#title").innerHTML = isHome
    ? `<h1>${escapeHtml(SITE.title)}</h1>${SITE.subtitle ? `<p>${escapeHtml(SITE.subtitle)}</p>` : ""}`
    : `<h1>${escapeHtml(corner.name)}</h1><div class="u"></div>`;

  document.title = (isHome ? "" : corner.name + " - ") + SITE.title;
  window.scrollTo(0, 0);

  if (isHome) renderHome();
  else renderCorner(corner);

  playEnterAnimation();
}

/* ---------- 상단 배너를 좌우로 밀어 다음/이전 코너로 이동 ---------- */

// 메뉴 순서(홈, 그다음 코너들)와 같은 순서로 화면을 넘긴다.
function pageKeys() {
  return ["", ...CORNERS.map((c) => c.name)];
}

// 밀어서 이동했을 때만 "next"(다음) 또는 "prev"(이전)가 들어 있다.
let swipeDirection = null;

// 밀어서 이동한 경우, 새 화면이 미는 방향에서 들어오는 효과를 보여준다.
function playEnterAnimation() {
  if (!swipeDirection) return;
  const className = swipeDirection === "next" ? "enter-next" : "enter-prev";
  swipeDirection = null;

  [$("#title"), $("#page")].forEach((el) => {
    el.classList.remove("enter-next", "enter-prev");
    void el.offsetWidth;                       // 같은 효과를 연속으로 줄 때 다시 시작되게 함
    el.classList.add(className);
    el.addEventListener("animationend", () => el.classList.remove(className), { once: true });
  });
}

function setupHeroSwipe() {
  const hero = $("#hero");
  const title = $("#title");
  let startX = null;
  let startY = 0;
  let deltaX = 0;
  let dragging = false;

  hero.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest("a, button, .menu")) return;       // 로고, 메뉴 버튼을 누르는 동작과 겹치지 않게
    startX = e.clientX;
    startY = e.clientY;
    deltaX = 0;
    dragging = false;
  });

  hero.addEventListener("pointermove", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!dragging) {
      // 세로로 움직이면(스크롤) 끼어들지 않고, 가로로 10px 이상 확실히 움직일 때부터 제목이 손가락을 따라 움직인다.
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      dragging = true;
      hero.setPointerCapture(e.pointerId);
      title.style.transition = "none";
    }
    deltaX = dx;
    title.style.transform = `translateX(${dx * 0.4}px)`;
    title.style.opacity = String(1 - Math.min(Math.abs(dx) / hero.clientWidth, 0.6));
  });

  function finish() {
    if (startX === null) return;
    const wasDragging = dragging;
    startX = null;
    dragging = false;
    if (!wasDragging) return;

    // 이 정도 이상 밀면 이동하고, 조금만 밀었으면 제자리로 돌아간다.
    const threshold = Math.max(60, hero.clientWidth * 0.2);
    const keys = pageKeys();
    const current = decodeURIComponent(location.hash.slice(1));
    const index = Math.max(0, keys.indexOf(current));
    // 마지막 화면에서 다음으로 밀면 처음으로, 처음 화면에서 이전으로 밀면 마지막으로 돌아간다(한 바퀴 순환).
    const target = (index + (deltaX < 0 ? 1 : -1) + keys.length) % keys.length;

    if (Math.abs(deltaX) >= threshold) {
      swipeDirection = deltaX < 0 ? "next" : "prev";
      $("#menu").classList.remove("open");
      title.style.transition = "";
      title.style.transform = "";
      title.style.opacity = "";
      location.hash = target === 0 ? "" : encodeURIComponent(keys[target]);
      return;
    }

    // 제자리로 부드럽게 되돌리기
    title.style.transition = "transform .2s, opacity .2s";
    title.style.transform = "";
    title.style.opacity = "";
    setTimeout(() => { title.style.transition = ""; }, 220);
  }
  hero.addEventListener("pointerup", finish);
  hero.addEventListener("pointercancel", finish);
}

/* ---------- 맨 위로 가기 버튼 ---------- */

// 300px 이상 내려오면 버튼을 보이고, 누르면 부드럽게 맨 위로 올라간다.
function setupScrollTop() {
  const button = $("#toTop");
  const toggle = () => button.classList.toggle("show", window.pageYOffset > 300);

  window.addEventListener("scroll", toggle, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  toggle();
}

renderCommon();
renderMenu();
setupScrollTop();
setupHeroSwipe();
addEventListener("hashchange", route);
route();
