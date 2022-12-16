//API Taken from - https://rapidapi.com/Coinranking/api/coinranking1

// The URL for the Article Search API at coinranking
const baseURL = "https://coinranking1.p.rapidapi.com/coins/";

// STEP 1: Get your own API key and paste it below…
const key = "2cdf14a81emshb4221322bfabc0ap110dccjsn16362add46d0";
let url;

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector(".search");
const orderBy = document.querySelector("#orderBy");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const section = document.querySelector("section");

// STEP 2: Add a submit event listener for the search form, referencing the fetchResults function as the callback
searchForm.addEventListener("submit", fetchResults);

// Functions
function fetchResults(event) {
  // Use preventDefault() to stop the form submitting
  event.preventDefault();
  // STEP 3a: Assemble the full URL, according to the API documentation at the rapid API
  url = `${baseURL}?rapidapi-key=${key}&search=${searchTerm.value}&orderBy=${orderBy.value}`;

  // STEP 4: Use fetch() to pass the URL that we built as a request to the API service
  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      displayResults(json);
    });
}

function displayResults(json) {
  // STEP 5: Log to the console the results from the API
  console.log(json);

  // Clear out the old results…
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  // STEP 6: Create the var coins to capture the coins from the JSON object
  var coins = json.data.coins;

  if (coins.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results returned.";
    section.appendChild(para);
  } else {
    for (let i = 0; i < coins.length; i++) {
      const article = document.createElement("article");
      const textDiv = document.createElement("div");
      const imageDiv = document.createElement("div");
      const name = document.createElement("p");
      const symbol = document.createElement("p");
      const price = document.createElement("p");
      const img = document.createElement("img");

      const current = coins[i];
      console.log(current);

      // STEP 7: Look at the console output from the API…
      name.textContent = current.name;
      symbol.textContent = current.symbol;
      price.textContent = current.price;
      let iconUrl = current.iconUrl.replace("svg", "png");

      img.src = `${iconUrl}`;
      img.alt = "coin image";

      // STEP 8: Put each article together as an ARTICLE element and append it as a child of the SECTION element in the HTML
      textDiv.appendChild(name);
      textDiv.appendChild(symbol);
      textDiv.appendChild(price);
      imageDiv.appendChild(img);
      article.appendChild(textDiv);
      article.appendChild(imageDiv);
      section.appendChild(article);

      article.style.display = "flex";
      article.style.justifyContent = "space-between";
    }
  }
}
