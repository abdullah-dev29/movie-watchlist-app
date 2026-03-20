const API_KEY = "df9e8925"

const searchInputEl = document.getElementById("search-input")
const searchBtnEl = document.getElementById("search-btn")
const searchResultEl = document.getElementById("search-results")

searchBtnEl.addEventListener("click", handleBtnClick)

async function handleBtnClick() {
  const data = await getSearchData()
  console.log(data)
  const html = getHtml(data)
  // console.log(html)
  searchResultEl.style.backgroundImage = "none"
  searchResultEl.style.backgroundColor = "#121212"
  searchResultEl.innerHTML = html
  document.querySelectorAll(".watchlist").forEach(spanBtn => {
    spanBtn.addEventListener("click", () => {
      const imdbId = spanBtn.dataset.id
      // getting existing data
      let stored = JSON.parse(localStorage.getItem("watchlist"))
      if(stored === null) {
        stored = []
      }

      // checking duplicates
      let alreadyExists = false
      for(const storedFilm of stored) {
        if(storedFilm.imdbID === imdbId) {
          alreadyExists = true
          break
        }
      }
      // if no duplicate add it
      if(!alreadyExists) {
        for(const newFilm of data) {
          if(newFilm.imdbID === imdbId) {
            stored.push(newFilm)
            break
          }
        }
      }

      // add item to localStorage
      localStorage.setItem("watchlist", JSON.stringify(stored))

    })
  })

}

async function getSearchData() {
  const searchTerm = searchInputEl.value;
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
  const data = await res.json()

  if (!data.Search) { // if nothing is found: undefined
    return "Unable to find what you're looking for. Please try another search."
  }
  const items = data.Search
  const itemsFullData = []
  for (const item of items) {
    const itemRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`)
    const itemDetails = await itemRes.json()
    itemsFullData.push(itemDetails)
  }

  return itemsFullData
}

function getHtml(data) {
  let html = ''
  if(typeof data === "string") {
    html =  `
    <div class="no-results">
      <p>${data}</p>
    </div>
    `
  } else {
    for(const item of data) {
      html += `
        <div class="result">

          <div class="result-poster">
            <img src="${item.Poster}" alt="">
          </div>

          <div class="result-content">
            <div class="result-content--title-rating">
              <span class="title">${item.Title}</span>
              <span class="rating">
                <i class="fa-solid fa-star"></i>
                ${item.imdbRating}
              </span>
            </div>
            <div class="result-content--spans">
              <span>${item.Runtime}</span>
              <span>${item.Genre}</span>
              <span class="watchlist" id="watchlist" data-id="${item.imdbID}">
                <i class="fa-solid fa-circle-plus"></i>
                Watchlist
              </span>
            </div>
            <p>${item.Plot}</p>
          </div>

        </div>
      `
    }
    
  }
  return html
}
