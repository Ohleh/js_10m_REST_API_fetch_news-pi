// newsapi.org

// Base url
// resource
// parameters

const ulRef = document.querySelector(".news__list");
const KEY = "04817410139a4f28b3432ba663d88446";
const BASE_URL = "https://newsapi.org/v2";
const URL = `${BASE_URL}/top-headlines?country=us&pageSize=10&apiKey=${KEY}`;

// function fetch
// (function checkStatus ok ?)
// function createItem
// function createList
// function renderContent

fetch(URL)
  .then((response) => checkStatus(response))
  .then((data) => renderContent(data.articles))
  .catch((e) => console.log("error:", e));

const checkStatus = (res) => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
};

const createItem = (article) => `<li>
<img src=${article.urlToImage} alt=${article.description} style=height:300>
<p> ${article.title ?? ""}</p>
<p> ${article.description ?? ""}</p>
${article.author ? `<p>${article.author}</p>` : ""}
</li>`;

const renderList = (dataArr) =>
  dataArr.reduce((acc, el) => acc + createItem(el), "");

const renderContent = (data) => {
  const content = renderList(data);
  return ulRef.insertAdjacentHTML("beforeend", content);
};
