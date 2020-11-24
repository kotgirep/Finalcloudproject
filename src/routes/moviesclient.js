const express = require('express')
const moviesclientRouter = express.Router()
const axios = require('axios')

moviesclientRouter.get('', async(req, res) => {
    console.log("executing client.js")
        //res.render('./movies')
    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/get-toprated`)
            //console.log(getmovieAPI.data.results[0].title)
            //console.log("result is " + res)
        res.render('./movies', { moviearticle: getmovieAPI.data.results })
            //console.log(getmovieAPI.data.results)
            //console.log("moviearticle" +moviearticle)
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

moviesclientRouter.get('/:id', async(req, res) => {
    console.log("entering into getmovie details ")
    let movieID = req.params.id
        //res.render('./movies')
    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/get-toprated/${movieID}`)
            //console.log(getmovieAPI.data.results[0].title)

        res.render('./singlemovie', { singlemoviearticle: getmovieAPI.data })
            // console.log(getmovieAPI.data.results)
            //console.log("moviearticle" +moviearticle)
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


moviesclientRouter.post('/ma', async(req, res) => {
    console.log("/n inside search function /n ")
    let query = req.body.search
    console.log("query is " + query)

    try {
        const getmovieAPI = await axios.get(`http://localhost:3000/movies/searchbyKey?key=${query}`)
        console.log("json data is " + getmovieAPI.data.results[0].title)

        res.render('./movieSearch', { ma: getmovieAPI.data.results })

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

moviesclientRouter.post('/bm', async(req, res) => {
    console.log("-------- inside buymovie client side --------")
    let emailId="abc@gmail.com"
    try {
        const buyMovieRes = await axios.post(`http://localhost:3000/movies/buyMovie`,{
            email_id: emailId,
            id: req.body.id,
            title: req.body.title
        })
        console.log("json data is " + buyMovieRes.data.results[0].title)

        res.render('./singlemovie', { bm: buyMovieRes })

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