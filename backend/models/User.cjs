// Primeiro importamos o mongoose
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    //O username só será valido caso seja uma string, esteja preenchido, tenha no minimo 4 caracteres e seja unico
    username : {type: String, require: true, min: 4, unique: true},
    password : {type: String, require: true}
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel