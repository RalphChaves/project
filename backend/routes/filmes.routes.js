const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        titulo: 'Eterno',
        logo: 'https://legadodamarvel.com.br/wp-content/uploads/2021/03/Mortes-e-cenas-pos-creditos-Vaza-a-trama-de-Eternos-o-filme-da-Marvel-legadodamarvel-750x375.jpg',
        nota: '10',
        genero: 'Super-Heroi',
        visualizacao: 'Assistido',
    },
]

// [GET] /filmes - Retornar uma lista de filmes
router.get('/', (req, res) => {
    res.send(filmes);
})

// [GET] /filmes/{id} - Retornar um unico filme por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    // verifica se a filme nao foi encontrada
    if(!filme) {
        res.status(404).send({error: 'Filme nao encontrada'});
        return;
    }

    res.send(filme);
})

// [POST] /filmes/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    // recebi o objeto do filme para cadastar vinda do cliente (via requisicao http POST)
    const filme = req.body;

    // validacao se existe os campos

    if(!filme || !filme.titulo || !filme.nota || !filme.logo) {
        res.status(400).send({
            message: 'vaga inválida, esta faltando os campos titulo e nota'
        })
        return;
    }
    
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Cadastro com sucesso',
        data: filme
    });
})

// [PUT] /filme/edit/{id} - Edita uma filme de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'o filme que voce está tentando editar nao foi encontrada'
        })
        return;
    }

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `filme ${filmes[index].titulo} atualizada com sucesso`,
        data: filmes[index]
    })
})

// [DELETE] /filmes/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    //excluimos a vaga da lista de acordo com o seu indice.
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.titulo} excluida com sucesso !`,
    })
})

// exporta as rotas para serem usadas no index.
module.exports = router;