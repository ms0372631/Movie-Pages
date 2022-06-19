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
      const movie = document.createElement("p");
      const image = document.createElement("img")
      image.src = `https://image.tmdb.org/t/p/original${element.backdrop_path}`
      const text = document.createTextNode(`${element.original_title}`)
      movie.appendChild(text);
      movie.appendChild(image);
      movieContent.appendChild(movie);

    });
  })
  .catch(function (err) {
    console.log(err);
  });