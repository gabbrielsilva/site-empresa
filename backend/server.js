const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// Criar aplicação express
const app = express();
const port = process.env.PORT || 3000;

// Usar o CORS (configure para aceitar o frontend do Vercel)
app.use(cors({
    origin: 'https://assistenciadigitaljg.vercel.app/', // Substitua pela URL do seu frontend no Vercel
}));

// Conectar ao MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Teste de conexão com o banco de dados
connection.connect((err) => {
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
    connection.query(query, [nome, email, telefone, mensagem], (err, result) => { // Alterei db.query para connection.query
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
