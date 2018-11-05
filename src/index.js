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

$(document).ready(function(){
    console.log("hello");
    // $("#input-field").show();

    getMovies()
        .then((movies) => {
            $("h1").text('Movie list:');
            // TABLE
            $.ajax('/db.json').done(function() {
                $(".movies").html("<table class='movie-cont card'>" +
                "<tr>" +
                "<td>ID</td>" +
                "<td>Title</td>" +
                "<td>Rating</td>" +
                "</tr>");
        });
            /MOVIES
            movies.forEach(({title, rating, id}) => {
                $(".movie-cont").append(`<tr><td data-id="${id}">${id}</td> <td>${title}</td> <td>${rating}</td><td><button class="delete">x</button></td><td><button class="edit">edit</button></td></tr>`);
            });

            const addMovieHtml = ({ title, rating, id }) => {
                return `
                <tr>;
                    <td>${title}</td>
                    <td>${rating}</td>
                    <td>${id}</td>
                </tr>`
            };

            //MOVIES
            movies.forEach(({title, rating, id}) => {
                $(".movie-cont").append(addMovieHtml());
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
                    success: function (){location.reload()}
                });
            });
            $(".delete").click(function(){
                // const movieData = {$(this).parent().parent();}
                // console.log(movieData);
                let id = $(this).parent().parent().children().first().attr("data-id");
                console.log(id);
                $.ajax({
                    type: "DELETE",
                    url: "/api/movies/" + id,
                    success: function () {location.reload()}
                });
            })

        });
}).catch((error) => {
    alert('OOPS! Something went wrong.\nCheck the console for details.');
    console.log(error);
});
