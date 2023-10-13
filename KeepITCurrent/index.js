const API_KEY = "e8fae72a2dc4499e8485de9c4e9c3ffa"
const url = "https://newsapi.org/v2/everything?q="

async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data
}
fetchData("all").then(data => renderMain(data.articles));

//menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden");
})

function updateDateTime() {
  const dateTimeContainer = document.querySelector('.date-time');
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateTime = new Date();

  // Format the time to 24-hour clock system
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDate = dateTime.toLocaleDateString('en-US', options);

  // Set the content and styling
  timeElement.textContent = formattedTime;
  dateElement.textContent = formattedDate;

  // You can adjust the font size and style for time and date here
  timeElement.style.fontSize = '24px';
  dateElement.style.fontSize = '16px';

  // Update the time and date every second
  setInterval(updateDateTime, 1000);
}

// Initial call to set the time and date
updateDateTime();

// Function to fetch trending articles for a specific category
async function fetchTrending(category) {
    const res = await fetch(`${url}${category}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data.articles[0]; // Get the first article as the trending one
  }
  
  // Function to render trending articles
  async function renderTrendingArticles() {
    const trendingSection = document.querySelector('.trending-grid');
  
    // Define the categories
    const categories = ['sports', 'politics', 'music', 'movies', 'economics', 'tech', 'food', 'health'];
  
    for (const category of categories) {
      const trendingArticle = await fetchTrending(category);
  
      if (trendingArticle) {
        const articleHTML = `
          <div class="trending-article">
            <a href="${trendingArticle.url}">
              <img src="${trendingArticle.urlToImage}" alt="${trendingArticle.title}" />
              <h3>${trendingArticle.title}</h3>
            </a>
          </div>
        `;
  
        trendingSection.insertAdjacentHTML('beforeend', articleHTML);
      }
    }
  }
  
  // Call the function to render trending articles
  renderTrendingArticles();

// Function to hide the trending section
function hideTrendingSection() {
  const trendingSection = document.getElementById('trending-section');
  trendingSection.style.display = 'none';
}

// Function to show the trending section
function showTrendingSection() {
  const trendingSection = document.getElementById('trending-section');
  trendingSection.style.display = 'block';
}
  
  // Add event listeners to your header category links to hide the trending section when a category is clicked
  document.querySelectorAll('.desktop ul li').forEach((categoryLink) => {
    categoryLink.addEventListener('click', () => {
      hideTrendingSection();
    });
  });
  
  // Add event listeners to your mobile menu items to hide the trending section when a category is clicked
  document.querySelectorAll('.mobile ul li').forEach((categoryLink) => {
    categoryLink.addEventListener('click', () => {
      hideTrendingSection();
    });
  });
  
  // Add an event listener to the "Home" link to show the trending section
  document.querySelector('.desktop ul li a[href$="KeepITCurrent/"]').addEventListener('click', () => {
    showTrendingSection();
  });
  
  // Add an event listener to the "Home" link in the mobile menu to show the trending section
  document.querySelector('.mobile ul li a[href$="KeepITCurrent/"]').addEventListener('click', () => {
    showTrendingSection();
  });
 
//render news 
function renderMain(arr){
  let mainHTML = ''
  for(let i = 0 ; i < arr.length ;i++){
      if(arr[i].urlToImage){
      mainHTML += ` <div class="card">
                      <a href=${arr[i].url}>
                      <img src=${arr[i].urlToImage} lazy="loading" />
                      <h4>${arr[i].title}</h4>
                      <div class="publishbyDate">
                          <p>${arr[i].source.name}</p>
                          <span>•</span>
                          <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                      </div>
                      <div class="desc">
                         ${arr[i].description}
                      </div>
                      </a>
                   </div>
      `
      }
  }

  document.querySelector("main").innerHTML = mainHTML
}


const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
  e.preventDefault()
  console.log(searchInput.value)

  const data = await fetchData(searchInput.value)
  renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit",async(e)=>{
  e.preventDefault()
  const data = await fetchData(searchInputMobile.value)
  renderMain(data.articles)
})


async function Search(query){
  const data = await fetchData(query)
  renderMain(data.articles)
}
