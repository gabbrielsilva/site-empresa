const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./formulario.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação da tabela de dados com o novo campo "telefone" (caso ainda não exista)
db.run(`CREATE TABLE IF NOT EXISTS formulario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    mensagem TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err.message);
    }
});

// Rota POST para receber os dados do formulário e armazená-los
app.post('/enviar-formulario', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    // Insere os dados no banco de dados
    const query = `INSERT INTO formulario (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;
    db.run(query, [nome, email, telefone, mensagem], function (err) {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err.message);
            res.status(500).json({ message: 'Erro ao enviar o formulário.' });
        } else {
            res.json({ message: "Formulário enviado com sucesso!" });
        }
    });
});

// Rota para obter dados do formulário
app.get('/formularios', (req, res) => {
    db.all(`SELECT * FROM formulario`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        } else {
            res.json(rows);
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
