// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById('lista')

// atribuindo a endpoint da api do backend em um constante
const apiUrl = 'http://localhost:3000/filmes';

// modo edicao e id edicao
let edicao = false;
let idEdicao = 0;

// pegar os dados que o usuario digita no input (Elementos)
let titulo = document.getElementById('titulo');
let logo = document.getElementById('logo');
let salario = document.getElementById('nota');
let senioridade = document.getElementById('genero');
let visualizacao = document.getElementById('visualizacao');



// faz uma resquisicao do tipo [GET] para o back que recebe todos os filmes cadastradas
const getFilmes = async () => {
    // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http.
    // faz uma requisicao [GET] para o backend na url http://localhost:3000/filmes
    const response = await fetch(apiUrl)
    // é a lista de objetos filmes (array de objetos)
    const filmes = await response.json();

    console.log(filmes);

    // a gente pega o resultado da api(um array de objetos com as filmes) e itera essa lista com o map
    // algo parecido com um for.
    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.logo}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.titulo}</h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <span class="badge bg-primary">${filme.nota}</span>
                <p class="card-text"> ${filme.visualizacao}</p>
                <div>
                    <button class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

// [POST] envia uma vaga para o backend para ser cadastrada

const submitForm = async (event) => {
    // previnir que o navegador atualiza a pagina por causa o evento de submit
    event.preventDefault();

    // Estamos construindo um objeto com os valores que estamos pegando no input.
    const filme = {
        titulo: titulo.value,
        logo: logo.value,
        nota: parseFloat(nota.value),
        genero: genero.value,
        visualizacao: visualizacao.value,
    }
    // é o objeto preenchido com os valores digitados no input

    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    // vaga cadastrada com sucesso.
    getFilmes();

}

const putFilme = async(filme, id) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}


// [DELETE] funcao que exclui um filme de acordo com o seu id
const deleteFilme = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}


// [GET] /Filme/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna o filme de acordo com esse id.
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editFilme = async (id) => {
    // habilitando o modo de edicao e enviando o id para variavel global de edicao.
    edicao = true;
    idEdicao = id;

    //precismo buscar a informacao do filme por id para popular os campos
    // salva os dados da filme que vamos editar na variavel vaga.
    const filme = await getFilmeById(id);

    //preencher os campos de acordo com a vaga que vamos editar.
    titulo.value = filme.titulo;
    logo.value = filme.logo;
    nota.value = filme.nota;
    genero.value = filme.genero;
    visualizacao.value = filme.visualizacao;

}


const clearFields = () => {
    titulo.value = '';
    logo.value = '';
    nota.value = '';
    genero.value = '';
    visualizacao.value = '';

}

getFilmes();