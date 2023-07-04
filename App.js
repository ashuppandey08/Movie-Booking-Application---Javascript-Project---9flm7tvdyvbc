const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=505797406477a4b80509da6ad2698790&page=1";
const API_KEY = "api_key=505797406477a4b80509da6ad2698790";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=505797406477a4b80509da6ad2698790&query=";
const moiveBox = document.querySelector("#movie-box");
const BASE_URL = "https://api.themoviedb.org/3";
let price = Math.floor(Math.random()*(300-250+1)+250);
let title = "";

document.getElementById("movie-box").addEventListener("onclick", function () {
  console.log("qwerty");
});

//creating Genres of movies
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const tagsEl = document.getElementById("tags");
const selectGenre = [];
setGenre();

function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;

    t.addEventListener("click", () => {
      if (selectGenre.length == 0) {
        selectGenre.push(genre.id);
      } else {
        if (selectGenre.includes(genre.id)) {
          selectGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectGenre.splice(idx, 1);
            }
          });
        } else {
          selectGenre.push(genre.id);
        }
      }
      console.log(selectGenre);
      getMovies(APIURL + "&with_genres=" + encodeURI(selectGenre.join(",")));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

// highlight selection of movies
function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  clearBtn();
  if (selectGenre.length != 0) {
    selectGenre.forEach((id) => {
      const highlightTag = document.getElementById(id);
      highlightTag.classList.add("highlight");
    });
  }
}

//clear btn after selecting multiple genre
function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.classList.add("highlight");
  } else {
    let clear = document.createElement("div");
    clear.classList.add("tag", "highlight");
    clear.id = "clear";
    clear.innerText = "Clear x";
    clear.addEventListener("click", () => {
      selectGenre = [];
      setGenre();
      getMovies(APIURL);
    });
    tagsEl.append(clear);
  }
}

// get movies data (promise resolved)
const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data);
};
getMovies(APIURL);

//popup and movie details

const showMovies = (data) => {
  moiveBox.innerHTML = "";

  data.results.forEach((result) => {
    const imagePath =
      result.poster_path === null
        ? "img/image-missing.png"
        : IMGPATH + result.poster_path;

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                   <button onclick="gotoCheckoutPage()">Buy Ticket</button>
                 </div>
            `;
    moiveBox.appendChild(box);
  });
};

//checkout page

function gotoCheckoutPage() {
  window.location.href = `payment.html?price=${price}&title=${title}`;
}
// get movie details and price

const detailsofmovie = document.getElementById("movie_details");

function openNav(movie) {
  detailsofmovie.innerHTML = "";
  let id = movie.id;
  fetch(BASE_URL + "/movie/" + id + "?" + API_KEY)
    .then((res) => res.json())
    .then(
      ({
        title,
        overview,
        poster_path,
        original_language,
        vote_average,
        runtime,
        genres,
      }) => {
        let genreName = [];
        for (let i = 0; i < genres.length; i++) {
          genreName.push(genres[i].name);
        }
        const movieDetails = document.createElement("div");

        let price = Math.floor(Math.random() * (300 - 250 + 1) + 250);

        movieDetails.classList.add("overlay-content");
        movieDetails.innerHTML = `             
                <div class="description_image">
                    <img src="${IMG_PATH + poster_path}">
                </div>
                <div class="movie-details">
                    <h3>${title}</h3>
                    <h5>${vote_average}/10</h5>
                    <h5>${original_language}</h5>
                    <h5>${runtime} min</h5>
                    <h5>${genreName} </h5>
                    <h5>${overview}</h5>                                
                <div id="ticket-container">
                    <p id="ticket-price"><span id="price">₹ &nbsp${price}</span></p>
                    <button id="buy-button">Buy Ticket</button>
                </div>
                </div>
                `;
        detailsofmovie.appendChild(movieDetails);
        document
          .getElementById("buy-button")
          .addEventListener("click", function () {
            window.location.href = `checkout.html?price=${price}&title=${title}`;
          });
      }
    );

  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

// Search Part
document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

