const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=5777966c56b415716d3ed40933493146&language=en-US&page=1`;

fetch(popularMovieUrl)
  .then(function (res) {
    let response = res.json();
    return response;
  })
  .then(function (data) {
    const movieContent = document.getElementsByClassName("movie-content")[0];
    data.results.forEach(element => {
      console.log(element);
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
    });
  })
  .catch(function (err) {
    console.log(err);
  });