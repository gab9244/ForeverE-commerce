// models/OrderModel.js
const mongoose = require("mongoose");
const {Schema, model} = mongoose 
const OrderSchema = new Schema(
  {
    // Definindo o campo "id" como um número
    id: { type: Number, required: true },
    owner: {type: String, required: true},
    size: {type: String, required: true},
    // Vamos adicionar a quantidade de um itens ao banco de dados
    quantity : {type:Number, required:true, default: 1}
  },
  {
    // Opção que cria automaticamente campos `createdAt` e `updatedAt`
    timestamps: true,
  }
);


// Define um índice composto para `id` e `owner`
OrderSchema.index({ id: 1, owner: 1 }, { unique: true });

// Cria o modelo com o esquema definido
const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
