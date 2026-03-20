function renderWatchlist() {
    let stored = JSON.parse(localStorage.getItem("watchlist"))

    const searchResultEl = document.getElementById("results")
    const html = getWatchlistHtml(stored)

    searchResultEl.innerHTML = html

    // removing event listener after rendering
    document.querySelectorAll(".remove").forEach(spanBtn => {
    spanBtn.addEventListener("click", () =>{
        const imdbId = spanBtn.dataset.id

        // filtering out the remove item
        const newStored = stored.filter(item => item.imdbID !== imdbId)

        // updating the local storage
        localStorage.setItem("watchlist", JSON.stringify(newStored))

        // re-render
        renderWatchlist()
    })
})
}

function getWatchlistHtml (watchlist) {
    let html = ''
    if(!watchlist || watchlist.length === 0) {
        html = `
            <div class="no-results no-results-watchlist">
                <p>Your watchlist is looking a little empty...</p>
                <a href="index.html">
                <i class="fa-solid fa-circle-plus"></i>
                Let's add some movies!
                </a>
            </div>
        `
    } else {
        watchlist.forEach(item => {
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
                            <span class="remove" id="remove" data-id="${item.imdbID}">
                                <i class="fa-solid fa-circle-minus"></i>
                                Remove
                            </span>
                        </div>
                        <p>${item.Plot}</p>
                    </div>

                </div>
            `
        })
    }
    
    return html
}

renderWatchlist()