// 보완 예정 1: 스크롤시 상단 메뉴바와 검색아이콘(검색창) 상단 고정되게
// 보완 예정 2: 검색결과 0건이면 "결과 없음" 출력
// 보완 예정 3: 기사 날짜표시 년/월/일로 표시

// const API_Key = `e0fce2d4211a448fb98af0c7169b9658`;

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const searchEntChk = document.querySelector("#search-input");
const menus = document.querySelectorAll(".menus button");
const sideMenu = document.querySelectorAll(".side-menu-list button");
const titleClk = document.querySelector(".title-logo");
let imageUrl = "";
let newsHTML = "";
let newsList = [];
let qKey = ""; // search-input값을 넣을 전역변수
let categoryKey = ""; //카테고리 값을 넣을 전역변수
// let pageNum = "";               //보여줄 페이지 번호
// let pageSizeKey = "20";          //페이지당 보여줄 결과물 갯수

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => {
    categoryKey = event.target.textContent.toLowerCase();
    getNewsByCategory(event);
  })
);
sideMenu.forEach((menu) =>
  menu.addEventListener("click", (event) => {
    categoryKey = event.target.textContent.toLowerCase();
    getNewsByCategory(event);
  })
);

// 타이틀 클릭시 검색 및 카테고리 초기화
titleClk.addEventListener("click", () => {
  qKey = "";
  categoryKey = "";
  document.getElementById("search-result").innerHTML = "";
  getNewsByCategory();
});

// 써치 입력시 엔터 치면 검색 실행
searchEntChk.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key == "Enter" && !searchInput.value == "") {
    qKey = searchInput.value;
    searchAlarm();
    getNewsByCategory();
    searchInput.value = "";
  }
});

// 검색아이콘 클릭시 함수
function searchBoxWorks() {
  let inputArea = document.getElementById("input-area");
  // 닫혀있으면 입력창 열기
  if (inputArea.style.display === "inline") {
    // 써치 인풋 입력창 보이는 상태인가?
    if (searchInput.value == "") {
      // 써치 인풋 비어있는지 체크
      inputArea.style.display = "none"; // 입력창이 비어있으면 보이는 상태를 안보이게
    } else {
      // 써치 인풋에 내용이 있으면 q에 인풋밸류 넣고 겟뉴스
      qKey = searchInput.value;
      getNewsByCategory();
      searchInput.value = ""; //뉴스 나오면 입력창 초기화
      console.log("검색어", qKey);
      return;
    }
  } else {
    inputArea.style.display = "inline"; // 써치인풋이 비어있으면 입력창 안보이게
  }
}

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const getNewsByCategory = async (event) => {
  try {
    const url = new URL(
      `https://noona-news-api-test.netlify.app/top-headlines?q=${qKey}&category=${categoryKey}`
    );
    const response = await fetch(url);
    console.log("rrr by cate", response);
    const data = await response.json();
    if (response.status === 200) {
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const validateImageUrl = (imgUrl) => {
  const image = new Image();
  image.src = imgUrl;
  console.log("imgurl", imgUrl);
  console.log(image.complete);
  return image.complete || image.width + image.height > 0;
};

const render = () => {
  qKey !== ""
    ? searchAlarm()
    : (document.getElementById("search-result").innerHTML = "");
  console.log(newsList.length);
  newsHTML =
    newsList.length === 0
      ? `<div class="alert alert-danger" role="alert"> 검색 결과가 없습니다 ! </div>`
      : newsList
          .map((news) => {
            const validatedImage = validateImageUrl(news.urlToImage);
            console.log(news.urlToImage);
            console.log(validatedImage);
            return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src="${
        validatedImage ? news.urlToImage : "imgs/no-image.png"
      }"/>
    </div>    
    <div class="col-lg-8">
      <h2>${
        news.title.length > 40
          ? news.title.substring(0, 40) + "..."
          : news.title
      }</h2>  
      <p>${
        news.description == null || news.description == ""
          ? "내용없음"
          : news.description.length > 100
          ? news.description.substring(0, 100) + "..." //200자 너무 길어서 100자만... 제목은 40자만...
          : news.description
      }</p>      
      <div>${news.source.name} * ${news.publishedAt} - ${moment(
              news.publishedAt
            )
              .startOf("day")
              .fromNow()}</div>
    </div>
  </div>`;
          })
          .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getNewsByCategory();

function searchAlarm() {
  document.getElementById(
    "search-result"
  ).innerHTML = `<p>검색어 "${qKey}"로 "${
    categoryKey == "" ? "전체" : categoryKey
  }"카테고리에서 검색한 결과입니다</p>`;
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert"> ${errorMessage} </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
