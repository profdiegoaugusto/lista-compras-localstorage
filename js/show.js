// Declaração das variáveis para a lista de compras e o item a ser visualizado/atualizado
let listaDeCompras = []; // Array que armazenará todos os itens da lista de compras
let itemDeCompra = {};   // Objeto que armazenará o item atualmente selecionado

// Seleciona os elementos HTML que serão manipulados para mostrar e atualizar detalhes do item
const detalhesItemSection = document.querySelector("#detalhesItem"); // Seção de detalhes do item
const idInput = document.querySelector("#id-item");                  // Campo para mostrar o ID do item
const nomeInput = document.querySelector("#nome");                   // Campo de entrada para o nome do item
const precoInput = document.querySelector("#preco");                 // Campo de entrada para o preço do item
const qtdeInput = document.querySelector("#quantidade");             // Campo de entrada para a quantidade do item
const prioridadeSelect = document.querySelector("#prioridade");      // Campo de seleção de prioridade
const atualizarBtn = document.querySelector("#atualizar-btn");       // Botão para atualizar o item

// Função que carrega os dados do item armazenado no `localStorage`
function carregarDados() {
    let idItem = Number(sessionStorage.getItem("id"));                      // Obtém o ID do item selecionado na sessão atual
    listaDeCompras = JSON.parse(localStorage.getItem("lista")) || [];       // Carrega a lista de compras do `localStorage`
    itemDeCompra = listaDeCompras.find((d) => { return d.id === idItem; }); // Encontra o item pelo ID na lista
    mostrarItem(itemDeCompra); // Exibe os dados do item no formulário
}

// Função que exibe os dados do item selecionado nos campos de entrada para visualização e edição
function mostrarItem(item) {
    idInput.value = item.id;                  // Define o ID do item
    nomeInput.value = item.nome;              // Define o nome do item
    precoInput.value = item.preco;            // Define o preço do item
    qtdeInput.value = item.quantidade;        // Define a quantidade do item
    prioridadeSelect.value = item.prioridade; // Define a prioridade do item  
}

// Função que atualiza o item na lista de compras e salva as alterações no `localStorage`
function atualizar() {
    let indice = listaDeCompras.indexOf(itemDeCompra); // Encontra o índice do item selecionado na lista

    // Atualiza os valores do item de acordo com os dados inseridos pelo usuário
    itemDeCompra.id = Number(idInput.value);                    // Atualiza o ID do item
    itemDeCompra.nome = nomeInput.value.trim();                 // Atualiza o nome do item
    itemDeCompra.preco = Number(precoInput.value.trim());       // Atualiza o preço do item
    itemDeCompra.quantidade = Number(qtdeInput.value.trim());   // Atualiza a quantidade do item
    itemDeCompra.prioridade = prioridadeSelect.value.trim();    // Atualiza a prioridade do item

    listaDeCompras[indice] = itemDeCompra;                          // Substitui o item atualizado no array `listaDeCompras`
    localStorage.setItem("lista", JSON.stringify(listaDeCompras));  // Salva a lista atualizada no `localStorage`
    alert("Dados atualizados com sucesso!");                        // Informa ao usuário que o item foi atualizado com sucesso
}

// Quando a página é carregada, chama `carregarDados` para exibir o item selecionado
window.addEventListener("load", carregarDados);

// Quando o botão de atualizar é clicado, chama a função `atualizar` para salvar as alterações
atualizarBtn.addEventListener("click", atualizar);
