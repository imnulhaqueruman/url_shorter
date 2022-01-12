const express = require("express")
const validUrl = require('valid-url')
const { nanoid } = require('nanoid')

const router = express.Router()

const URL = require('../models/urlSchema')

const baseUrl = 'http:localhost:5000';

router.post('/shorten', async(req, res) => {
    const { longUrl } = req.body
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    const urlCode = await nanoid()
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await URL.findOne({ longUrl })
            if (url) {
                res.status(200).json({
                    url
                })
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new URL({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.status(200).json({
                    url,
                    message: "Successful"
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})
module.exports = router;