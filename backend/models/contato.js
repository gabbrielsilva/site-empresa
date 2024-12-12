const mongoose = require('mongoose');

// Definindo o esquema para os dados do formulário
const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    mensagem: { type: String, required: true }
});

// Criando o modelo a partir do esquema
const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
