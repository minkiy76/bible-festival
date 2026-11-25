const $ = (selector) => document.querySelector(selector);

// 문자열을 html에 안전하게 넣기 위한 이스케이프
function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(text ?? "").replace(/[&<>"]/g, (ch) => map[ch]);
}

// IMG에 있는 이름이면 그 파일 경로를, 아니면 그대로(주소) 사용
function imageUrl(key) {
  return IMG[key] || key;
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

// 행사 사진을 3.5초마다 바꿔 보여준다.
function startSlideshow() {
  const photos = document.querySelectorAll(".gal img");
  const dots = document.querySelectorAll(".dots i");
  let current = 0;

  slideTimer = setInterval(() => {
    photos[current].classList.remove("on");
    dots[current].classList.remove("on");
    current = (current + 1) % photos.length;
    photos[current].classList.add("on");
    dots[current].classList.add("on");
  }, 3500);
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
  const photos = SITE.gallery
    .map((key, i) => `<img src="${imageUrl(key)}" class="${i === 0 ? "on" : ""}" alt="" loading="lazy">`)
    .join("");
  const dots = SITE.gallery.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");

  // 예배 안내
  const info = SITE.info;
  const infoLines = info.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");

  $("#page").innerHTML = `
    <div class="home">
      <div class="tiles">${tiles}</div>
      <hr class="sep">
      <div class="gal">${photos}</div>
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

  startSlideshow();
}

/* ---------- 코너(상품 목록) 화면 ---------- */

// 포인트 높은순, 같으면 이름 가나다순
function sortProducts(a, b) {
  return (b.points - a.points) || a.name.localeCompare(b.name, "ko");
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
addEventListener("hashchange", route);
route();
