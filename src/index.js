
window.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  let popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=5777966c56b415716d3ed40933493146&language=en-US&page=${currentPage}`;
  let likedList = [];

  function fetchMovies(url) { 
    fetch(url)
    .then(function (res) {
      let response = res.json();
      return response;
    })
    .then(function (data) {
      let map = new Map();
      const movieTable = document.getElementsByClassName("movie-table")[0];
      movieTable.removeChild(movieTable.lastChild);
      const movieContent = document.createElement("div");
      movieContent.classList.add("movie-content");
      movieTable.appendChild(movieContent);
      data.results.forEach(element => {
        console.log(element);
        map.set(element.original_title, element);
        const movie = document.createElement("div");
        const image = document.createElement("img")
        const movieName = document.createElement("p");
        const movieDate = document.createElement("p");
        image.src = `https://image.tmdb.org/t/p/original${element.poster_path}`
        const nametxt = document.createTextNode(`${element.original_title}`)
        const datetxt = document.createTextNode(`${element.release_date}`)
        movie.classList.add("movie");
        movieName.classList.add("movie-name");
        movieDate.classList.add("movie-date");
        movie.appendChild(image);
        movie.appendChild(movieName);
        movie.appendChild(movieDate);
        movieContent.appendChild(movie);
        movieName.appendChild(nametxt);
        movieDate.appendChild(datetxt);
        movie.addEventListener("click", () => {
        const modal = document.getElementsByClassName("modal")[0];
          modal.style.visibility = "visible";
          document.getElementsByClassName("modal-bg")[0].style.backgroundImage = `url("https://image.tmdb.org/t/p/original${element.backdrop_path}")`;
          document.getElementsByClassName("movie-poster")[0].src = `https://image.tmdb.org/t/p/original${element.poster_path}`;
          document.getElementsByClassName("movie-title")[0].appendChild(document.createTextNode(`${element.original_title}`));
          document.getElementsByClassName("movie-description")[0].appendChild(document.createTextNode(`${element.overview}`));
        });
        const closeTab = document.getElementsByClassName("modal-close")[0];
        closeTab.addEventListener("click", function() {
          document.getElementsByClassName("modal")[0].style.visibility = "hidden";
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  fetchMovies(popularMovieUrl);

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  nextBtn.addEventListener("click", () => {
    currentPage += 1;
    if (currentPage != 1)
      document.getElementById("prev").style.opacity = "1";
    document.getElementsByClassName("selector-txt")[0].innerText = `Page ${currentPage} / Total 500 of 100,000 results`;
    popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=5777966c56b415716d3ed40933493146&language=en-US&page=${currentPage}`;
    fetchMovies(popularMovieUrl);
  })

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      if (currentPage == 1)
        document.getElementById("prev").style.opacity = "0.3";
      document.getElementsByClassName("selector-txt")[0].innerText = `Page ${currentPage} / Total 500 of 100,000 results`;
      popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=5777966c56b415716d3ed40933493146&language=en-US&page=${currentPage}`;
      fetchMovies(popularMovieUrl);
    }
  })
  

});
