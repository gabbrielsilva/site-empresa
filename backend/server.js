const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();


// Criar aplicação express
const app = express();
const port = process.env.PORT || 3000;

// Usar o CORS
app.use(cors());

// Conectar ao MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Erro de conexão ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Configurações para aceitar JSON
app.use(express.json());

// Rota para processar o formulário
app.post('/contato', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    const query = 'INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, telefone, mensagem], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).json({ error: 'Erro ao salvar os dados' });
        }
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
