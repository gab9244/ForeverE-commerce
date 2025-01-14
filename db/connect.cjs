// Primeiro pegamos o mongoose, depois criamos a função connectDB que pega A URL do banco de dados e a conecta a ao mongoodb
const mongoose = require('mongoose')

const connectDB = (url) =>{ mongoose.connect(url)}

module.exports = connectDB





