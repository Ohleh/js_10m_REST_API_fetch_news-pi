// newsapi.org

// Base url
// resource
// parameters

// == 1 tsk
// function fetch
// (function checkStatus ok ?)
// function createItem
// function createList
// function renderContent
// == 1 end

// == 2 tsk
// (зчитати дані)
// поставити обробник події на сабміт форми, фетч по кнопці (сабміті)
// зчитати дані з селекта і інпута
// підставити ці дані в ссилку для оновлення по сабміту
// тест рендера
// == 2 end

// == 3 tsk
// (пагінація)
// вивести текст кількості сторінок і новин (окрема функція)
// додати кнопку load more

const formRef = document.querySelector(".formNews");
const categoryRef = document.querySelector(".category");
const pageSizeRef = document.querySelector(".pageSize");
const totalResult = document.querySelector(".totalResults");
const totalPage = document.querySelector(".totalPages");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
const ulRef = document.querySelector(".newsList");
const KEY = "04817410139a4f28b3432ba663d88446";
const BASE_URL = "https://newsapi.org/v2";
let pageCounter = 1;

const hideLoadMoreBtn = (data, pageSize) => {
  if (pageCounter >= Math.ceil(data?.totalResults / pageSize)) {
    loadMoreBtn.classList.add("hide");
  }
};

const pagesInfo = (data, pageSize) => {
  ulRef.textContent = "";
  totalResult.textContent = `Total news number: ${data?.totalResults}.`;
  totalPage.textContent = `Total pages: ${Math.ceil(
    data?.totalResults / pageSize
  )}.`;
};

const onSubmit = (e) => {
  e.preventDefault();
  const category = categoryRef.value;
  const pageSize = pageSizeRef.value;
  const URL = `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${pageCounter}&apiKey=${KEY}`;

  fetch(URL)
    .then((response) => checkStatus(response))
    .then((data) => {
      if (e.type === "submit") {
        pagesInfo(data, pageSize);
        loadMoreBtn.classList.remove("hide");
      }
      renderContent(data.articles);
      hideLoadMoreBtn(data, pageSize);
      pageCounter += 1;
    })
    .catch((e) => console.log("error:", e));
};

formRef.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onSubmit);

const checkStatus = (res) => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
};

const createItem = (article) => `<li>
<img src=${article.urlToImage} alt=${article.description} style=height:300>
<h2> ${article.title.slice(0, 40) ?? ""}...</h2>
<p> ${article.description ?? ""}</p>
${article.author ? `<p>${article.author}</p>` : ""}
<a href=${article.url}>read more</a>
</li>`;

const renderList = (dataArr) =>
  dataArr.reduce((acc, el) => acc + createItem(el), "");

const renderContent = (data) => {
  const content = renderList(data);
  return ulRef.insertAdjacentHTML("beforeend", content);
};
