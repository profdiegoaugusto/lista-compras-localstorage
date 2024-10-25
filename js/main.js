// Seleciona os elementos de entrada e saída do HTML para manipulação
const nomeInput = document.querySelector("#nome");              // Campo de entrada para o nome do item
const precoInput = document.querySelector("#preco");            // Campo de entrada para o preço do item
const qtdeInput = document.querySelector("#quantidade");        // Campo de entrada para a quantidade do item
const prioridadeSelect = document.querySelector("#prioridade"); // Campo de seleção para prioridade
const salvarBtn = document.querySelector("#salvar-btn");        // Botão de salvar o item
const totalRotulo = document.querySelector("#total");           // Rótulo para exibir o valor total

const lista = document.querySelector("#lista-compras");         // Elemento da lista de compras para exibir os itens

// Formata o valor para a moeda Real (BRL)
const formatadorMoedaReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

let contador = 0;              // Variável para gerenciar o ID único de cada item
let listaDeCompras = [];       // Array que armazenará os itens da lista de compras

// Função para somar todos os preços dos itens na lista de compras
function somarPrecos() {
    let total = 0.00;  // Inicializa o total em 0

    // Percorre cada item na lista e soma o preço ao total
    for (let i = 0; i < listaDeCompras.length; i++) {
        total += listaDeCompras[i].preco;
    }

    return total; // Retorna o total calculado
}

// Função para carregar dados salvos do `localStorage` quando a página é carregada
function carregarDados() {
    contador = Number(localStorage.getItem("contador"));               // Recupera o valor do contador do `localStorage`
    listaDeCompras = JSON.parse(localStorage.getItem("lista")) || [];  // Recupera a lista salva
}

// Função para salvar um novo item na lista de compras
function salvar() {
    contador++; // Incrementa o contador para gerar um ID único

    // Cria um novo item com os valores inseridos pelo usuário
    let item = {
        id: contador, 
        nome: nomeInput.value.trim(),
        preco: Number(precoInput.value.trim().replace(",", ".")),  // Converte para número
        quantidade: Number(qtdeInput.value.trim()),
        prioridade: prioridadeSelect.value.trim()
    };

    // Adiciona o novo item ao array `listaDeCompras`
    listaDeCompras.push(item);

    // Salva o array atualizado no `localStorage`
    localStorage.setItem("lista", JSON.stringify(listaDeCompras));
    localStorage.setItem("contador", contador);

    // Atualiza a lista exibida na página
    atualizarListaDeCompras(item);   
}

// Função para carregar e exibir todos os itens salvos na lista de compras
function carregarListaDeCompras(lista) {
    for (let i = 0; i < lista.length; i++) {
        atualizarListaDeCompras(lista[i]);
    }
}

// Função para obter o ID numérico de um item baseado no seu `id` HTML
function obterID(li) {
    return li.id.split('-')[1];
}

// Função para exibir detalhes de um item em uma nova página
function exibirDetalhes(event) {
    let li = event.target;
    let id = obterID(li);               // Obtém o ID do item clicado
    sessionStorage.setItem("id", id);   // Salva o ID no `sessionStorage` para usar em outra página
    window.location.href = "show.html"; // Redireciona para a página de detalhes
}

// Função para excluir um item da lista de compras
function excluir(event) {
    let li = event.target;
    let id = obterID(li);  // Obtém o ID do item clicado

    // Confirma com o usuário se ele deseja excluir o item
    let resposta = confirm(`Deseja remover o item ${li.innerText}?`);

    if (resposta) {
        // Encontra o índice do item na lista e remove o item
        let indice = listaDeCompras.findIndex((d) => d.id === id);
        listaDeCompras.splice(indice, 1);  // Remove o item do array `listaDeCompras`
        
        // Atualiza o `localStorage` e remove o item do HTML
        const elementoHtml = document.getElementById(`${li.id}`);
        localStorage.setItem("lista", JSON.stringify(listaDeCompras));
        lista.removeChild(li);

        atualizarPrecoTotal();  // Atualiza o total após a exclusão
    }
}

// Função para adicionar um item à lista exibida na página
function atualizarListaDeCompras(item) {
    let li = document.createElement("li");  // Cria um novo elemento de lista

    li.id = `item-${item.id}`;  // Define um ID único para o item
    li.textContent = item.nome;  // Define o texto do item como o nome do produto

    // Adiciona eventos de clique: exclui com `Ctrl + Click`, exibe detalhes com `Click`
    li.addEventListener("click", (event) => {
        if (event.ctrlKey) {
            excluir(event);
        } else {
            exibirDetalhes(event);
        }
    });

    lista.appendChild(li); // Adiciona o item à lista exibida
    atualizarPrecoTotal();  // Atualiza o valor total
}

// Função para atualizar o rótulo com o preço total formatado
function atualizarPrecoTotal() {
    totalRotulo.textContent = formatadorMoedaReal.format(somarPrecos());    
}

// Carrega a lista de compras ao iniciar a página
window.addEventListener("load", () => {
    carregarDados();                         // Carrega dados salvos
    carregarListaDeCompras(listaDeCompras);  // Carrega a lista de itens na página
});

// Salva um novo item ao clicar no botão de salvar
salvarBtn.addEventListener("click", salvar);