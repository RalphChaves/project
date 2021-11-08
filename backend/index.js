// backend - Projeto vagas
// importacao das libs externas cors e express
const express = require('express'); //framework
const cors = require('cors');

// importar as rotas que eu vou ultilizar

const filmesRouter = require('./routes/filmes.routes')

// inicializacao do express
const app = express();

//habilitar o modo json do express; JSON (Javascript Onjective Notation)
app.use(express.json());

// habilitar o midleware do cors
app.use(cors());

//inicializar a rota / vagas de acordo com as configuraçoes no meu arquivo de rotas de
app.use('/filmes', filmesRouter);





const port = 3000;
app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`);


})
