/* ============================================================
   바이블 페스티벌 선물 안내 - 설정과 상품 데이터
   수정은 이 파일에서만 하면 됩니다. (화면 동작은 app.js, 디자인은 style.css)
   ============================================================ */

/* 파일을 새로 올릴 때마다 바뀌는 값. css/js/사진 주소 뒤에 붙여서 브라우저가 예전 파일을 쓰지 않게 한다. */
const VERSION = "20261125103135";

/* ---------- 1. 사이트 기본 정보 ----------
   logo, banner, gallery, info.photo, footerLogo 는 아래 IMG 에 있는 이름이다. */
const SITE = {
  church: "금광교회 유년부 지혜마을",       // 왼쪽 상단 이름
  title: "지혜마을 바이블 페스티벌",        // 홈 화면 큰 제목
  subtitle: "",                              // 제목 아래 작은 글씨 (비우면 숨김)
  logo: "logo",
  banner: "banner_home",
  gallery: ["g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10", "g11", "g12", "g13", "g14", "g15", "g16"],                      // 홈 화면 행사 사진 슬라이드
  info: {                                    // 홈 화면 예배 안내
    photo: "info_photo",
    title: "유년부 지혜마을",
    age: "(8~10세/초등학교 1~3학년)",
    lines: ["예배 : 주일 오전 10시, 2층 드림홀"]
  },
  footerLogo: "footer_logo",
  footerName: "금광교회 유년부 지혜마을",
  address: "경기도 성남시 수정구 산성대로 613 (양지동, 스포랜드) 금광교회"
};

/* ---------- 2. 코너 ----------
   name: 코너 이름, tile: 홈 화면 타일 이미지, banner: 코너 페이지 배너 사진,
   light: true 이면 배너 위에 밝은 막을 씌워 글씨를 검게 보여준다. 메뉴는 이 순서로 나온다. */
const CORNERS = [
  {"name": "인형", "tile": "tile2", "banner": "banner_doll", "light": false},
  {"name": "장난감", "tile": "tile0", "banner": "banner_toy", "light": false},
  {"name": "문구랑 슈퍼랑", "tile": "tile1", "banner": "banner_stat", "light": false},
  {"name": "패션", "tile": "tile3", "banner": "banner_fash", "light": false},
  {"name": "효도", "tile": "tile4", "banner": "banner_hyo", "light": false}
];

/* 홈 화면 타일 순서 */
const TILE_ORDER = ["인형", "장난감", "문구랑 슈퍼랑", "패션", "효도"];

/* ---------- 3. 상품 ----------
   cat: 코너, name: 상품명(줄바꿈은 \n), points: 포인트, img: 사진 파일(images/products 폴더),
   group: 소분류(문구랑 슈퍼랑 코너만 사용).
   사진을 바꾸려면 같은 이름으로 덮어쓰거나 img 경로를 고치면 된다.
   화면에서는 코너별로 소분류(GROUP_ORDER 순서), 포인트 높은순, 이름 가나다순으로 자동 정렬된다. */
const GROUP_ORDER = ["문구", "슈퍼"];   // 문구랑 슈퍼랑 코너: 문구를 먼저, 먹고 마시는 슈퍼 상품을 뒤에 보여준다.

const PRODUCTS = [
  {"cat": "인형", "name": "헬로키티 입체 바디필로우", "points": 450, "img": "images/products/doll-01.jpg"},
  {"cat": "인형", "name": "코끼리 인형 550mm", "points": 380, "img": "images/products/doll-02.jpg"},
  {"cat": "인형", "name": "기린 인형 60cm", "points": 310, "img": "images/products/doll-03.jpg"},
  {"cat": "인형", "name": "치이카와 대형 먼작귀 봉제 인형", "points": 290, "img": "images/products/doll-04.jpg"},
  {"cat": "인형", "name": "치이카와 인형 가방 키링 10cm\n(우사기스타)", "points": 265, "img": "images/products/doll-05.jpg"},
  {"cat": "인형", "name": "다다랜드 애착 바디필로우\n거위 인형", "points": 200, "img": "images/products/doll-06.jpg"},
  {"cat": "인형", "name": "오후꽃 산리오 인형키링\n포근한 감성(포차코)", "points": 165, "img": "images/products/doll-07.jpg"},
  {"cat": "인형", "name": "모찌 깜냥 고양이 인형", "points": 110, "img": "images/products/doll-08.jpg"},
  {"cat": "인형", "name": "곰인형 키링(랜덤 1개)", "points": 20, "img": "images/products/doll-09.jpg"},
  {"cat": "장난감", "name": "산리오 웹툰그리기세트", "points": 600, "img": "images/products/toy-01.jpg"},
  {"cat": "장난감", "name": "공룡 6 in 1 자동차 운반차\n장난감 미니카 세트", "points": 460, "img": "images/products/toy-02.jpg"},
  {"cat": "장난감", "name": "베이블레이드X BX-23 스타터\n피닉스소어 9-60GF", "points": 460, "img": "images/products/toy-03.jpg"},
  {"cat": "장난감", "name": "사이버트럭 RC카", "points": 410, "img": "images/products/toy-04.jpg"},
  {"cat": "장난감", "name": "오늘의 방 소꿉놀이 세트", "points": 360, "img": "images/products/toy-05.jpg"},
  {"cat": "장난감", "name": "도블 보드게임", "points": 280, "img": "images/products/toy-06.jpg"},
  {"cat": "장난감", "name": "크리스마스 나노블럭(6종)", "points": 270, "img": "images/products/toy-07.jpg"},
  {"cat": "장난감", "name": "빌리네집 우주큐브(4종)", "points": 240, "img": "images/products/toy-08.jpg"},
  {"cat": "장난감", "name": "무드등 만들기 재료", "points": 220, "img": "images/products/toy-09.jpg"},
  {"cat": "장난감", "name": "국가대표 사격", "points": 200, "img": "images/products/toy-10.jpg"},
  {"cat": "장난감", "name": "솜사탕행성 슬라임", "points": 190, "img": "images/products/toy-11.jpg"},
  {"cat": "장난감", "name": "CK 폴리스 RC카", "points": 170, "img": "images/products/toy-12.jpg"},
  {"cat": "장난감", "name": "악세사리 만들기 키트", "points": 160, "img": "images/products/toy-13.jpg"},
  {"cat": "장난감", "name": "또봇 미니 타키온", "points": 140, "img": "images/products/toy-14.jpg"},
  {"cat": "장난감", "name": "종이 스퀴시 만들기 편의점", "points": 130, "img": "images/products/toy-15.jpg"},
  {"cat": "장난감", "name": "리듬 핑거게임", "points": 125, "img": "images/products/toy-16.jpg"},
  {"cat": "장난감", "name": "에어 글라이더건 + 비행기 2개", "points": 100, "img": "images/products/toy-17.jpg"},
  {"cat": "장난감", "name": "펭귄얼음깨기 보드게임", "points": 100, "img": "images/products/toy-18.jpg"},
  {"cat": "장난감", "name": "푸쉬팝 게임기", "points": 100, "img": "images/products/toy-19.jpg"},
  {"cat": "장난감", "name": "산리오 LED 키캡키링 2구(랜덤)", "points": 80, "img": "images/products/toy-20.jpg"},
  {"cat": "장난감", "name": "달걀노른자 뿌셔볼", "points": 40, "img": "images/products/toy-21.jpg"},
  {"cat": "장난감", "name": "뿌셔볼 기본", "points": 40, "img": "images/products/toy-22.jpg"},
  {"cat": "장난감", "name": "말랑 모찌 랜덤박스 스퀴시 뽑기", "points": 20, "img": "images/products/toy-23.jpg"},
  {"cat": "장난감", "name": "몬스터 랜덤 키링", "points": 20, "img": "images/products/toy-24.jpg"},
  {"cat": "장난감", "name": "애니멀 말랑 모찌", "points": 15, "img": "images/products/toy-25.jpg"},
  {"cat": "문구랑 슈퍼랑", "name": "산리오 다이어리 꾸미기\n문구세트", "points": 290, "img": "images/products/stationery-01.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "산리오 큐트 내꾸야 다꾸BAG\n시나모롤", "points": 290, "img": "images/products/stationery-02.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "타이거 미니 아티스트박스\n문구세트", "points": 290, "img": "images/products/stationery-03.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "카카오프렌즈\n춘식이 알찬구성 실속문구세트", "points": 180, "img": "images/products/stationery-04.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "초등 필통, 아보카도 그린", "points": 160, "img": "images/products/stationery-05.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "치이카와 스티커(방수)", "points": 150, "img": "images/products/stationery-06.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "산리오캐릭터즈 포켓지갑", "points": 115, "img": "images/products/stationery-07.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "헬로키티 입체 스티커", "points": 100, "img": "images/products/stationery-08.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "레인보우 스크래치노트 SP+\n전용나무펜", "points": 90, "img": "images/products/stationery-09.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "도라에몽 연필 세트", "points": 15, "img": "images/products/stationery-10.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "입체 동물 스티커", "points": 15, "img": "images/products/stationery-11.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "쓸수록 귀여운동물이 되는 지우개", "points": 5, "img": "images/products/stationery-12.jpg", "group": "문구"},
  {"cat": "문구랑 슈퍼랑", "name": "곽과자 12종 세트", "points": 350, "img": "images/products/stationery-13.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "멘토스 미니 레인보우 캔디", "points": 170, "img": "images/products/stationery-14.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "킨더 조이 초콜릿 핑크(2개)", "points": 40, "img": "images/products/stationery-15.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "얼려먹는초코만들기(랜덤)", "points": 20, "img": "images/products/stationery-16.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "초코픽(1개)", "points": 20, "img": "images/products/stationery-17.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "모구모구 과채음료 리치맛", "points": 15, "img": "images/products/stationery-18.jpg", "group": "슈퍼"},
  {"cat": "문구랑 슈퍼랑", "name": "호음호음 꼬마솜사탕(1개)", "points": 5, "img": "images/products/stationery-19.jpg", "group": "슈퍼"},
  {"cat": "패션", "name": "어린이 가을 잠옷세트\n치이카와 긴팔 긴바지 파자마\n사이즈 14/16", "points": 310, "img": "images/products/fashion-01.jpg"},
  {"cat": "패션", "name": "강아지 프린팅 백팩\n신학기 책가방 인형세트", "points": 300, "img": "images/products/fashion-02.jpg"},
  {"cat": "패션", "name": "짱구와 친구들 수면안대\n(흰둥이)", "points": 180, "img": "images/products/fashion-03.jpg"},
  {"cat": "패션", "name": "코듀로이 NICE 야구모자", "points": 180, "img": "images/products/fashion-04.jpg"},
  {"cat": "패션", "name": "말랑젤리 보고싶곰 크로스백", "points": 150, "img": "images/products/fashion-05.jpg"},
  {"cat": "패션", "name": "곱창밴드 5종 세트", "points": 100, "img": "images/products/fashion-06.jpg"},
  {"cat": "패션", "name": "시나모롤 치카치카 양치 세트", "points": 100, "img": "images/products/fashion-07.jpg"},
  {"cat": "패션", "name": "애니나라 캐릭터 수면안대\n코지(스타이블루)", "points": 100, "img": "images/products/fashion-08.jpg"},
  {"cat": "효도", "name": "홈플래닛\n미니 무선 전동 마사지건", "points": 200, "img": "images/products/hyodo-01.jpg"},
  {"cat": "효도", "name": "메디힐 더마플러스\n저분자 히알루론산 마스크팩", "points": 110, "img": "images/products/hyodo-02.jpg"},
  {"cat": "효도", "name": "맥심 슈프림 골드 커피믹스", "points": 60, "img": "images/products/hyodo-03.jpg"},
  {"cat": "효도", "name": "카밀 핸드 앤 네일 크림 클래식", "points": 60, "img": "images/products/hyodo-04.jpg"},
  {"cat": "효도", "name": "히말라야 립밤 무색", "points": 60, "img": "images/products/hyodo-05.jpg"},
  {"cat": "효도", "name": "베베숲 오리진 유아물티슈 캡형", "points": 15, "img": "images/products/hyodo-06.jpg"}
];

/* ---------- 4. 화면용 이미지 이름과 파일 경로 ---------- */
const IMG = {
  "logo": "images/logo.jpg",
  "banner_home": "images/banner_home.jpg",
  "tile0": "images/tile0.jpg",
  "tile1": "images/tile1.jpg",
  "tile2": "images/tile2.jpg",
  "tile3": "images/tile3.jpg",
  "tile4": "images/tile4.jpg",
  "footer_logo": "images/footer_logo.jpg",
  "banner_doll": "images/banner_doll.jpg",
  "banner_toy": "images/banner_toy.jpg",
  "banner_stat": "images/banner_stat.jpg",
  "banner_fash": "images/banner_fash.jpg",
  "banner_hyo": "images/banner_hyo.jpg",
  "info_photo": "images/info_photo.jpg",
  "g0": "images/g0.jpg",
  "g1": "images/g1.jpg",
  "g2": "images/g2.jpg",
  "g3": "images/g3.jpg",
  "g4": "images/g4.jpg",
  "g5": "images/g5.jpg",
  "g6": "images/g6.jpg",
  "g7": "images/g7.jpg",
  "g8": "images/g8.jpg",
  "g9": "images/g9.jpg",
  "g10": "images/g10.jpg",
  "g11": "images/g11.jpg",
  "g12": "images/g12.jpg",
  "g13": "images/g13.jpg",
  "g14": "images/g14.jpg",
  "g15": "images/g15.jpg",
  "g16": "images/g16.jpg"
};
