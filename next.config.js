const withTypescript = require('@zeit/next-typescript')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
module.exports = withTypescript(withImages(withCSS({
    publicRuntimeConfig: {
      API_URL: process.env.NODE_ENV == 'development' ? '`${API_URL}' : 'https://yotaiyo-to-do-app-api.herokuapp.com/'
    }
})))