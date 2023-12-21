let apiKey = "d9446b3f5f96412ba73dada5f3449a5b";

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API
  fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const articles = data.articles;

      const newsContainer = document.getElementById("newsContainer");

      let renderedNewsCount = 0;
      for (let i = 0; i < articles.length; i++) {
        const articleData = articles[i];

        if (!articleData.urlToImage) {
          continue;
        }

        const articleElement = createArticleElement(articleData);
        newsContainer.appendChild(articleElement);

        renderedNewsCount++;

        if (renderedNewsCount >= 12) {
          break;
        }
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function createArticleElement(articleData) {
  const article = document.createElement("article");
  article.id = `news`;
  const fallbackImg = "../assets/fallbackNewsImg.jpg";
  article.innerHTML = `
        <img src="${articleData.urlToImage || fallbackImg}" alt="">
        <h2>${articleData.title}</h2>
        <p>${articleData.description}</p>
        <a href="${
          articleData.url
        }" target="_blank">Read full article <img src="../assets/arrow-right.png"/></a>
    `;
  return article;
}

function searchNews(event) {
  event.preventDefault();

  const searchQuery = document.getElementById("searchInput").value.trim();

  if (searchQuery) {
    document.getElementById(
      "searchQueryHeader"
    ).textContent = `Top News for "${searchQuery}"`;
    fetchNews(searchQuery);
  }
}

async function fetchNews(query) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=2023-12-20&to=2023-12-20&sortBy=popularity&apiKey=${apiKey}`
    );
    const data = await response.json();
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";

    let renderedNewsCount = 0;
    for (let i = 0; i < data.articles.length; i++) {
      const articleData = data.articles[i];

      if (!articleData.urlToImage) {
        continue;
      }

      const articleElement = createArticleElement(articleData);
      newsContainer.appendChild(articleElement);

      renderedNewsCount++;
      if (renderedNewsCount >= 12) {
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
