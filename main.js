// Global Variables
let detailesSection = document.querySelector(".detailesSection");
let gameDetailes = document.querySelector(".gameDetailes");
let closeDetailes = document.querySelector("#closeDetailes");
let myCard = document.querySelector(".myCard");
let mmorpgLink = document.querySelector("#mmorpgLink");
let shooterLink = document.querySelector("#shooterLink");
let sailingLink = document.querySelector("#sailingLink");
let permadeathLink = document.querySelector("#permadeathLink");
let superheroLink = document.querySelector("#superheroLink");
let pixelLink = document.querySelector("#pixelLink");
let gameId;
let gamesList = [];
let game = [];

// Sticky Navbar
(function stickyNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarOffsetTop = navbar.offsetTop;

    window.addEventListener('scroll', function () {
        if (window.scrollY >= navbarOffsetTop) {
            navbar.classList.replace("position-absolute", "position-fixed");
            navbar.classList.add("top-0");
        } else {
            navbar.classList.replace("position-fixed", "position-absolute");
            navbar.classList.remove("top-0");
        }
    });
})();

// Change Active Link
(function changeActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
})();

// Fetch Genre
async function getGenre(genre) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bddbe1a730msh297e652b1b24501p195a6djsndcd2dd6cd2c9',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`, options);
    gamesList = await api.json();
}
getGenre("mmorpg");

// Fetch and Display Games
async function getGames(genre) {
    showLoader();
    await getGenre(genre);
    displayGames();
    setTimeout(hideLoader, 500);
}
getGames("mmorpg");

// Display Games
function displayGames() {
    let content = ``;
    for (let i = 0; i < gamesList.length; i++) {
        content += `
            <div class="myCard col-sm-6 col-lg-4 col-xl-3" onclick="getCard(${i})">
                <div class="card bg-transparent position-relative">
                    <div class="layer"></div>
                    <div class="card-body text-white">
                        <img src="${gamesList[i].thumbnail}" alt="" class="img-fluid">
                        <div class="d-flex justify-content-between align-items-center my-2">
                            <h3 class="d-inline-block fs-5">${gamesList[i].title}</h3>
                            <span class="badge bg-primary">Free</span>
                        </div>
                        <p class="text-center opacity-50">${gamesList[i].short_description}</p>
                        <div class="card-footer d-flex justify-content-between align-items-center text-center">
                            <span class="p-2 rounded-2 small">${gamesList[i].genre}</span>
                            <span class="p-2 rounded-2 small">${gamesList[i].platform}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    document.querySelector(".cards").innerHTML = content;
}

// Loader Controls
function hideLoader() {
    document.querySelector(".loaderSection").classList.replace("d-flex", "d-none");
}

function showLoader() {
    document.querySelector(".loaderSection").classList.replace("d-none", "d-flex");
}

// Fetch Game Data
async function getData(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bddbe1a730msh297e652b1b24501p195a6djsndcd2dd6cd2c9',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        game = await response.json();
        console.log(game);
    } catch (error) {
        console.error(error);
    }
}

// Display Game Details
async function getCard(index) {
    gameId = gamesList[index].id;
    showLoader();
    await getData(gameId);
    setTimeout(hideLoader, 500);
    displayDetailes();
    detailesSection.classList.replace("d-none", "d-block");
}

function displayDetailes() {
    let conetet = `
        <div class="row p-md-5 py-5">
            <h2 class="fs-1">Details Game</h2>
            <div class="col-lg-4 ps-md-2">
                <img src="${game.thumbnail}" alt="" class="w-100">
            </div>
            <div class="col-lg-8 ps-md-5">
                <h3>Title : ${game.title}</h3>
                <span>Category : <span class="badge bg-primary">${game.genre}</span></span>
                <span class="d-block">Platform : <span class="badge bg-primary">${game.platform}</span></span>
                <span>Status : <span class="badge bg-primary">${game.status}</span></span>
                <p>${game.description}</p>
                <a class="btn btn-outline-warning" href="${game.game_url}" target="_blank">Show Game</a>
            </div>
        </div>
    `;
    gameDetailes.innerHTML = conetet;
    document.querySelector("body").classList.add("overflow-hidden");
}

// Close Details Section
closeDetailes.addEventListener("click", function () {
    detailesSection.classList.replace("d-block", "d-none");
    detailesSection.classList.add("d-block", "d-none");
    document.querySelector("body").classList.remove("overflow-hidden");
});

// Genre Links Event Listeners
mmorpgLink.addEventListener("click", function () {
    getGames("mmorpg");
});
shooterLink.addEventListener("click", function () {
    getGames("shooter");
});
sailingLink.addEventListener("click", function () {
    getGames("sailing");
});
permadeathLink.addEventListener("click", function () {
    getGames("permadeath");
});
superheroLink.addEventListener("click", function () {
    getGames("superhero");
});
pixelLink.addEventListener("click", function () {
    getGames("pixel");
});