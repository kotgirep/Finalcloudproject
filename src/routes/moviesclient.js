const express = require('express')
const moviesclientRouter = express.Router()
const axios = require('axios')
var email = ''
var singlemovieinfo;

/** Frontend tokens are passed here **/
function initialize() {
    console.log("-------In Initialize function-------")
    email = "supriyameduri@gmail.com"
}
initialize();

/* function for onclickbuy */
function onclickBuy() {
    console.log("single movie article - onclickbuy " + singlemoviearticle)
}

/* Function to get all the movies on home page*/
moviesclientRouter.get('', async (req, res) => {
    console.log("-------- inside getmovies function client side --------")
    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/get-toprated`)
        res.render('./movies', {moviearticle: getmovieAPI.data.results})
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('error', err.message)
        }
    }
})

/*Function to get a single movie*/
moviesclientRouter.get('/singlemoviearticle/:id', async (req, res) => {
    console.log("-------- inside singlemovie function client side --------")
    let movieID = req.params.id
    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/getsingleMovie/${movieID}`)
        singlemovieinfo = getmovieAPI.data
        res.render('./singlemovie', {singlemoviearticle: getmovieAPI.data, isbm: false})
    } catch (err) {
        if (err.response) {
            console.log('error respnse data in single movie function client side is', +err.response.data)
        } else if (err.request) {
            console.log('error request in single movie function client side is' + err.request)
        } else {
            console.error('error message in single movie function client side is', err.message)
        }
    }
})

/*Function to get the searched movie */
moviesclientRouter.post('/ma', async (req, res) => {
    console.log("-------- inside search function client side --------")
    let query = req.body.search
    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/searchbyKey?key=${query}`)
        res.render('./movieSearch', {ma: getmovieAPI.data.results})
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('error', err.message)
        }
    }
})

/*Function to buy a movie*/
moviesclientRouter.post('/bm', async (req, res) => {
    console.log("-------- inside buymovie function client side --------")
    try {
        const buyMovieRes = await axios.post(`http://localhost:3000/movies/buyMovie`, {
            email_id: email,
            id: singlemovieinfo.id,
            title: singlemovieinfo.original_title
        })
        res.render('./singlemovie', {bm: buyMovieRes, isbm: true, singlemoviearticle: singlemovieinfo})
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('error', err.message)
        }
    }
})

/*Function to get watchlist*/
moviesclientRouter.get('/getwatchlist', async (req, res) => {
    console.log("--------- inside getwatchlist function client side -------- ")
    try {
        const getwatchlistAPI = await axios.get(`http://localhost:3000/movies/getwatchList?emailId=${email}`)
        res.render('./watchList', {wl: getwatchlistAPI.data})
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('error', err.message)
        }
    }
})


module.exports = moviesclientRouter;
