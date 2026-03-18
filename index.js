const API_KEY = "df9e8925"

const searchInputEl = document.getElementById("search-input")
const searchBtnEl = document.getElementById("search-btn")

searchBtnEl.addEventListener("click", getSearchData)

async function getSearchData() {
  const searchTerm = searchInputEl.value;
  const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
  const data = await res.json()

  if (!data.Search) { // if nothing is found: undefined
    console.log("Unable to find what you're looking for. Please try another search.")
    return
  }
  const items = data.Search
  const itemsFullData = []
  for (const item of items) {
    const itemRes = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`)
    const itemDetails = await itemRes.json()
    fullData.push(itemDetails)
  }

  console.log(itemsFullData) // all complete items objects
}
