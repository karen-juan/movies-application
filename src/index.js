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
    // $(".input-field").show();

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
                $(".movie-cont").append(`<tr><td data-id="${id}">${id}</td> <td>${title}</td> <td>${rating}</td><td><button class="delete">x</button></td></tr>`);
            });

            //USER MOVIE INPUT--AJAX REQUEST--
            $(".btn").click(function () {
                $.ajax({
                    type: "POST",
                    url: "/api/movies",
                    data: {
                        title: $("#movie_name").val(),
                        rating: $("#movie_rating").val()
                    },
                    success: function () {location.reload()}
                });
            });
            $(".delete").click(function () {
                // const movieData = {$(this).parent().parent();}
                // console.log(movieData);
                let id = $(this).parent().parent().children().first().attr("data-id");
                console.log(id);
                $.ajax({
                    type: "delete",
                    url: "/api/movies/" + id,
                    success: function () {location.reload()}
                });
            });
        });
}).catch((error) => {
    alert('OOPS! Something went wrong.\nCheck the console for details.');
    console.log(error);
});
