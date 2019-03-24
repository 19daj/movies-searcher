var inpt = $("#inpt");
var searchBttn = $("#searchingMovie");
var moviesVal;

searchBttn.click(function (e) {
    e.preventDefault();
    moviesVal = inpt.val().toLowerCase();
    inpt.val("");
    if (moviesVal.length !== 0) {
        $("#movies-container").empty();
    }
    gettingMovies();
});

function gettingMovies() { //Función que obtiene las peliculas
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=f9420adc&t=${moviesVal}`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(
        function (data) {
            console.log(data);
            var titleMovie = data.Title;
            var yearMovie = data.Year;
            var yearReleased = data.Released;
            var runtime = data.Runtime;
            var genre = data.Genre;
            var director = data.Director;
            var writer = data.Writer;
            var actors = data.Actors;
            var description = data.Plot;
            var language = data.Language;
            var country = data.Country;
            var awards = data.Awards;
            var img = data.Poster;
            var website = data.Website;

            var theTemplate = $("#entry-template").html();
            var template = Handlebars.compile(theTemplate);
            var context = {
                title: `${titleMovie}`,
                image: `${img}`,
                description: `${"Description: " + description}`,
                yearReleased: `${"Year Released: " + yearReleased}`,
                runtime: `${"Runtime: " + runtime}`,
                genre: `${"Genre: " + genre}`,
                director: `${"Director: " + director}`,
                writer: `${"Writer: " + writer}`,
                actors: `${"Actors: " + actors}`,
                language: `${"Language: " + language}`,
                country: `${"Country: " + country}`,
                awards: `${"Awards: " + awards}`,
                website: `${"Website: " + website}`
            };
            var compiledHtml = template(context);
            $("#movies-container").html(compiledHtml);
        }
    ).fail(mistake);
}

function mistake() {
    alert("the data can't be loaded");
}

$(document).ready(function () {
    if (moviesVal.length === 0) {
        $("#movies-container").empty();
    }
    gettingMovies();
});
