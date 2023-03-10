let nomRefFilm = document.getElementById("movie-name");
let boutonRecherche = document.getElementById("search-btn");
let resultat = document.getElementById("result");

//function to fetch data from api

let recupererFilm = () => {
    let nomFilm = nomRefFilm.value;
    let url = `http://www.omdbapi.com/?t=${nomFilm}&apikey=${key}`;
    //if input field is empty

    if (nomFilm.length <= 0) {
        resultat.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    //if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                resultat.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            //if movie doesn't exist in database
            else {
                resultat.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //if error occurs
            .catch(() => {
                resultat.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

boutonRecherche.addEventListener("click", recupererFilm);
window.addEventListener("load", recupererFilm);