$(document).ready(function(){
    $('#searchInput').on('keydown',function(e){
        if (e.key === 'Enter'){
            e.preventDefault();
            getMovie(this.value.trim());
        }
    })

});

function getMovie(title){
    if (!title){
        return;
    }
    fetchMovieFromApi(title);
}

function fetchMovieFromApi(title){
    hideError();

    let xhr = new XMLHttpRequest();

    xhr.open("GET", `http://www.omdbapi.com/?t=${title}&apiKey=a4536948`, true);

    xhr.timeout = 5000;
    xhr.ontimeout = (e) => onApiError();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                handleResultsJSON(JSON.parse(xhr.responseText));
            }
            else{
                showError();
                onApiError();
            }
        }
    }

    xhr.send();
}

function handleResultsJSON(results){
    hideNotFound();
    hideError();
    if (results.Response === 'False'){
        console.log("here!!!")
        showNotFound();
    }
    else{
        let moviePoster = results.Poster;
        showPosterInView(moviePoster);
    }
}

function showPosterInView(moviePoster){
    showPoster();
    $('#posterImage').attr('src', moviePoster);
}


function showNotFound(){
    hidePoster();
    $('.messages').find('.not-found').removeClass('hidden');
}

function hideNotFound(){
    $('.messages').find('.not-found').addClass('hidden');
}

function showError(){
    hidePoster();
    $('.messages').find('.error').removeClass('hidden');
}

function hideError(){
    $('.messages').find('.error').addClass('hidden');
}

function showPoster(){
    $('.movie').find('.movie-poster').removeClass('hidden');
}

function hidePoster(){
    $('.movie').find('.movie-poster').addClass('hidden');
}

function onApiError(){
    console.log("Api Error");
}
