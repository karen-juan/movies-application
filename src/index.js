/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const $ = require ("jquery");


const { displayMessage } = require('./loading.js');
displayMessage();

const {getMovies} = require('./api.js');
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        })
    });
$(document).ready(function() {
    console.log("hello");
    $(".input-field").show();

    let allMoviesHtml = () => {
    getMovies()
        .then((movies) => {
            $("h1").text('Movie list:');
            // TABLE
            $(".movies").html("<table class='movie-cont'>" +
                "<tr>" +
                "<th>ID</th>" +
                "<th>Title</th>" +
                "<th>Rating</th>" +
                "</tr>");
            movies.forEach(({title, rating, id}) => {
                $(".movie-cont").append(`<tr>
                <td>${id}</td> 
                <td>${title}</td>  
                <td>${rating}</td> 
                <td><button data-id="${id}" class="delete">x</button></td> 
                </tr>`);
            });
        });
    };
        return allMoviesHtml();
            //USER MOVIE INPUT--AJAX REQUEST--
            $(".btn").click(function () {
                $.ajax({
                    type: "POST",
                    url: "/api/movies",
                    data: {
                        title: $("#movie_name").val(),
                        rating: $("#movie_rating").val()
                    },

                }).done(function(movie) {
                    $(".movie-cont").append(`<tr>
                    <td>${movie.id}</td> 
                    <td>${movie.title}</td>
                    <td>${movie.rating}</td>
                    <td><button data-id="${movie.id}" class="delete">x</button></td>
                    </tr>`);

            $(".delete").click(function () {
                let id = $(this).data('id');
                console.log(id);
                $.ajax({
                    type: "delete",
                    url: "/api/movies/" + id,
                }).done();
            });
        });
}).catch((error) => {
    alert('OOPS! Something went wrong.\nCheck the console for details.');
    console.log(error);
});
