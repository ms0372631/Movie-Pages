
window.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  let popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=5777966c56b415716d3ed40933493146&language=en-US&page=${currentPage}`;
  let likedList = [];

  let map = new Map();
  let likeCount = likedList.length;
  const likeCnt = document.createElement("p");
  likeCnt.classList.add("like-cnt");
  const cnt = document.createTextNode(`${likeCount}`);
  likeCnt.appendChild(cnt);
  document.getElementsByClassName("like-count")[0].appendChild(likeCnt)
  function fetchMovies(url) { 
    fetch(url)
    .then(function (res) {
      let response = res.json();
      return response;
    })
    .then(function (data) {
      const movieTable = document.getElementsByClassName("movie-table")[0];
      movieTable.removeChild(movieTable.lastChild);
      const movieContent = document.createElement("div");
      movieContent.classList.add("movie-content");
      movieTable.appendChild(movieContent);
      data.results.forEach(element => {
        console.log(element);
        const movie = document.createElement("div");
        const likeBtn = document.createElement("a");
        likeBtn.classList.add("like-btn");
        const likeContainer = document.createElement("p");
        likeContainer.classList.add("like-container");
        const like = document.createTextNode("Like");
        likeContainer.appendChild(like);
        likeBtn.appendChild(likeContainer);
        likeContainer.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!map.has(element.original_title)) {
            likedList.push(element);
            map.set(element.original_title, element);
          }
          likeCnt.innerText = `${likedList.length}`
        });
        movie.appendChild(likeBtn);
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
          console.log(likedList);
          const modal = document.getElementsByClassName("modal")[0];
          modal.style.visibility = "visible";
          const movieTypes = document.getElementsByClassName("movie-types")[0];
          document.getElementsByClassName("modal-bg")[0].style.backgroundImage = `url("https://image.tmdb.org/t/p/original${element.backdrop_path}")`;
          document.getElementsByClassName("movie-poster")[0].src = `https://image.tmdb.org/t/p/original${element.poster_path}`;
          document.getElementsByClassName("movie-title")[0].appendChild(document.createTextNode(`${element.original_title}`));
          document.getElementsByClassName("movie-description")[0].appendChild(document.createTextNode(`${element.overview}`));
        });
        const closeTab = document.getElementsByClassName("modal-close")[0];
        closeTab.addEventListener("click", function() {
          document.getElementsByClassName("modal")[0].style.visibility = "hidden";
          document.getElementsByClassName("movie-title")[0].removeChild(document.getElementsByClassName("movie-title")[0].lastChild);
          document.getElementsByClassName("movie-description")[0].removeChild(document.getElementsByClassName("movie-description")[0].lastChild);

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

  const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}

  const likedListBtn = document.getElementById("liked-list");
  const movieListBtn = document.getElementById("movie-list");
  const content = document.getElementsByClassName("content")[0];
  
  likedListBtn.addEventListener("click", () => {
      document.getElementsByClassName("like-cnt")[0].innerText = `${likedList.length}`
      const movieTable = document.getElementsByClassName("movie-table")[0];
      movieTable.removeChild(document.getElementsByClassName("selector")[0]);
      movieTable.removeChild(movieTable.lastChild);
      const movieContent = document.createElement("div");
      movieContent.classList.add("movie-content");
      movieTable.appendChild(movieContent);
      document.getElementsByClassName("header")[0].innerText = "Liked List";
      while (movieContent.firstChild)
        movieContent.removeChild(movieContent.firstChild);
      console.log(likedList);
      likedList.forEach(el => {
        const movie = document.createElement("div");
        movieContent.appendChild(movie);
        const image = document.createElement("img")
        const movieName = document.createElement("p");
        const movieDate = document.createElement("p");
        image.src = `https://image.tmdb.org/t/p/original${el.poster_path}`
        const nametxt = document.createTextNode(`${el.original_title}`)
        const datetxt = document.createTextNode(`${el.release_date}`)
        movie.classList.add("movie");
        movieName.classList.add("movie-name");
        movieDate.classList.add("movie-date");
        movie.appendChild(image);
        movie.appendChild(movieName);
        movie.appendChild(movieDate);
        movieContent.classList.add("movie-content");
        const movieTable = document.getElementsByClassName("movie-table")[0];
        movieTable.removeChild(movieTable.lastChild);
        movieTable.appendChild(movieContent);
        movieContent.appendChild(movie);
        movieName.appendChild(nametxt);
        movieDate.appendChild(datetxt);
      });
  });
  movieListBtn.addEventListener("click", () => {
      location.reload();
  });

});
