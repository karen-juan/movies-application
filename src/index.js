/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

const $ = require ("jquery");


const { displayMessage } = require('./loading.js');
displayMessage();

const {getMovies} = require('./api.js');

$(document).ready(function(){
    console.log("hello");
    $("#input-form").show();

    getMovies()
        .then((movies) => {
            $("h1").text('Here are all the movies:');
            //RENDER TABLE HEADER
            $(".movies").html("<table style='width:50%; margin:auto; text-align:left;' class='movie-cont'>\n" +
                "<tr>\n" +
                "<th>ID</th>\n" +
                "<th>Title</th>\n" +
                "<th>Rating</th>\n" +
                "</tr>");
            //MOVIES
            movies.forEach(({title, rating, id}) => {
                $(".movie-cont").append(`<tr><td data-id="${id}">${id}</td> <td>${title}</td> <td>${rating}</td><td><button class="delete-this">x</button></td><td><button class="edit-this">edit</button></td></tr>`);
            });
            //USER MOVIE INPUT--AJAX REQUEST--
            $("#submit").click(function () {
                $.ajax({
                    type: "POST",
                    url: "/api/movies",
                    data: {
                        title: $("#name-input").val(),
                        rating: $("#rating-input").val()
                    },
                    success: function (){location.reload()}
                });
            });
            $(".delete").click(function(){
                // const movieData = {$(this).parent().parent();}
                // console.log(movieData);
                var id = $(this).parent().parent().children().first().attr("data-id");
                console.log(id);
                $.ajax({
                    type: "DELETE",
                    url: "/api/movies/" + id,
                    success: function () {location.reload()}
                });
            })

        })
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
