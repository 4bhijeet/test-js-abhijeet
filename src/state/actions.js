import moment from 'moment'
import movies from './movies'


export function getPopularMovies () {
  //
  // movies contains the results of two API requests
  //

  //
  // 1. combine the results of these requests
  // 2. sort the results FIRST by year THEN by title
  // 3. each movie object in the results needs a releaseYear attribute added
  //    this is used in src/components/movies-list.js line 25
  //


  //Using the thenby library for sorting based on multiple criterias
  var firstBy = require('thenby');
 
  //combining the movies array into single array object for easy iteration.
  var moviesCombined = [];
  for(var i=0; i<movies.length; i++){
    moviesCombined = moviesCombined.concat(movies[i]);
  }

  //Here we create an array that contains only fields we want to display on the front end
  var moviesWithReleaseYear = getMoviesWithReleaseYear(moviesCombined);
  
  //Sorting the movies array based on release date and then title.
  const combinedResults = moviesWithReleaseYear.sort(
      firstBy(function (v1, v2) { return v1.releaseYear - v2.releaseYear; })
      .thenBy('title')
  );

  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: combinedResults
  }
}


//This function creates an array of movies with rating between 4 and 5 and also adds another field releaseYear for sorting
function getMoviesWithReleaseYear(movies){
  var moviesWithReleaseYear = [];
  for (var i=0; i<movies.length; i++){
    var movie = movies[i];
    var releaseYear;
    if(movie.releaseDate != '')
      releaseYear = moment(movie.releaseDate).year();
    else
      releaseYear = '';
    if(movie.rating >= 4 && movie.rating <= 5){
      moviesWithReleaseYear.push({
        'title' : movie.title, 
        'releaseYear' : releaseYear,  
        'image' : movie.image, 
        'price' : movie.price, 
        'rating' : movie.rating,
        'releaseDate' : movie.releaseDate,
        'genres' : movie.genres
      });
    }
    
  }
  return moviesWithReleaseYear;
}