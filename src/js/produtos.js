export const sectionAdicionarProdutos = document.querySelector("#section-adicionar-produto");
export const buttonAdicionarProduto = document.querySelector("#button-adicionar-produto");
export const produtosInputs = document.querySelectorAll(".box-container-input input");
export const buttonCancelar = document.querySelector("#button-cancelar-adicao-produto");
export const mensagemInfo = document.querySelectorAll(".mensagem-info");
export const sectionProdutos = document.querySelector("#produtos");
export const adicionarProduto = document.querySelector("#button-efetivar-adicao-produto"); 
export const buttonVoltar = document.querySelector("#button-voltar-section-info");
export const sectionInfoProduto = document.querySelector("#section-info-produto");
export const boxContainerInfo = document.querySelectorAll(".box-container-info");
export const sectionEditarProduto = document.querySelector("#section-editar-produto");
export const buttonVoltarEditar = document.querySelector("#button-voltar-section-editar");
export const buttonAtualizar = document.querySelector("#button-atualizar-section-editar");
export const precoProdutoInput = document.querySelector("#preco-produto-editar");
export const estoqueProdutoInput = document.querySelector("#estoque-produto-editar");
export const nomeProduto = document.querySelector("#nome-produto-edicao");
export const sectionAtualizacoesProdutos = document.querySelector("#atualizacoes-produtos");
export const pesquisarProduto = document.querySelector("#pesquisar-produto")

let titleProdutoEditar;

const produtoInput = (id) => {
    const input = document.querySelector(`#${id}`);
    return input;
}

const limparInputs = () => {
    produtosInputs.forEach((input) => {
        input.value = '';
    })
}

const templateInfoProduto = (nome, fabricante, modelo, tipo, preco, estoque) => {

    const infoProduto = document.querySelector("#informacoes-produto");

    infoProduto.innerHTML = 
    `
    <div class="box-container-info">

        <p id="nome-info-produto" class="style-info-produto">Nome - <span>${nome}</span></p>

        <p id="fabricante-info-produto" class="style-info-produto">Fabricante - <span>${fabricante}</span></p>

        <p id="modelo-info-produto" class="style-info-produto">Modelo - <span>${modelo}</span></p>

    </div>

    <div class="box-container-info">

        <p id="tipo-info-produto" class="style-info-produto">Tipo - <span>${tipo}</span></p>

        <p id="preco-info-produto" class="style-info-produto">Preço - <span>R$ ${preco}</span></p>

        <p id="estoque-info-produto" class="style-info-produto">Estoque - <span>${estoque}</span></p>

    </div>    
    `;
}

const templatePushAtualizacoes = (nomeProduto, tipoAtualizacao) => {

    let mensagemAtualizacao = ``

    tipoAtualizacao.toLowerCase() === "adicionar" ? mensagemAtualizacao = `O produto "${nomeProduto} foi adicionado.` : null;

    tipoAtualizacao.toLowerCase() === "editar" ? mensagemAtualizacao = `O produto "${nomeProduto}" foi atualizado.` : null;

    tipoAtualizacao.toLowerCase() === "remover" ? mensagemAtualizacao = `O produto "${nomeProduto} foi removido.` : null;

    const template = 
    `
        <div class="produto">
            <h2 class="nome-produto">${mensagemAtualizacao}</h2>
        </div>
    `;
    const parser = new DOMParser();
    const templateHtml = parser.parseFromString(template, "text/html");
    const pushAtualizacao = templateHtml.querySelector("div");
    sectionAtualizacoesProdutos.appendChild(pushAtualizacao)
}

const editarProduto = (novoPreco, novoEstoque) => {
    
    novoPreco = novoPreco.replace(",", ".");
    novoPreco = Number(novoPreco);

    if (Number.isNaN(novoPreco)) {
        _mensagem("É necessário colocar o preço do produto!", "show", "red", true);
        return false;
    }

    if (novoPreco <= 0) {
        _mensagem("Preço do produto precisa ser maior que zero!", "show", "red", true);
        return false;
    }

    novoEstoque = Number(novoEstoque);

    if (Number.isNaN(novoEstoque)) {
        _mensagem("É necessário colocar o estoque do produto!", "show", "red", true);
        return false;
    }

    if (novoEstoque <= 0) {
        _mensagem("Estoque do produto precisa ser maior que zero!", "show", "red", true);
        return false;
    }

    return true;

}

sectionProdutos.addEventListener("click", (e) => {

    if (e.target.classList.contains("button-remover")) {
        const prod = e.target.closest(".produto");
        const title = prod.querySelector(".nome-produto");

        produtos.forEach((info) => {
            if (info.Produto === title.textContent) {
                templatePushAtualizacoes(info.Produto, "remover")
                produtos.splice(info, 1);
            }
        })

        prod ? prod.remove() : null;
    }

    if (e.target.classList.contains("button-info")) {
        const prod = e.target.closest(".produto");
        if (!prod) return;

        const title = prod.querySelector(".nome-produto");

        sectionInfoProduto.classList.add("show");

        produtos.forEach((info) => {
            if (info.Produto === title.textContent) {
                templateInfoProduto(info.Produto, info.Fabricante, info.Modelo, info.Tipo, info.Preco, info.Estoque);
            }
        })
    }

    if (e.target.classList.contains("button-editar")) {
        const prod = e.target.closest(".produto");
        if (!prod) return;

        const title = prod.querySelector(".nome-produto");
        titleProdutoEditar = title.textContent;

        sectionEditarProduto.classList.add("show");

        produtos.forEach((info) => {
            if (info.Produto === title.textContent) {
                precoProdutoInput.value = info.Preco;
                estoqueProdutoInput.value = info.Estoque;
            }
        });

        nomeProduto.textContent = title.textContent;
    }
});

const templateProduto = (nomeProtudo) => {
    const template = 
    `
    <div class="produto">
        <h2 class="nome-produto">${nomeProtudo}</h2>
        <div class="acoes">
            <button class="button-info button-style-acoes">
                <i class="fa-solid fa-circle-info button-info"></i>
            </button>  
            <button class="button-editar button-style-acoes">
                <i class="fa-solid fa-pen-to-square button-editar"></i>
            </button>                          
            <button class="button-remover button-style-acoes">
                <i class="fa-solid fa-trash button-remover"></i>
            </button>
        </div>
    </div>
    `;

    const parser = new DOMParser();
    const templateHtml = parser.parseFromString(template, "text/html");
    const produto = templateHtml.querySelector("div");
    sectionProdutos.appendChild(produto);
}

buttonAdicionarProduto.addEventListener("click", () => {
    sectionAdicionarProdutos.classList.add("show");
})

buttonCancelar.addEventListener("click", () => {
    limparInputs();
    sectionAdicionarProdutos.classList.remove("show");
    _mensagem("", "show", "", false);
})

buttonVoltar.addEventListener("click", () => {
    sectionInfoProduto.classList.remove("show");
})

buttonVoltarEditar.addEventListener("click", () => {
    sectionEditarProduto.classList.remove("show");
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sectionAdicionarProdutos.classList.contains("show")) {
        limparInputs();
        sectionAdicionarProdutos.classList.remove("show");
        _mensagem("", "show", "", false);
    }
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        sectionInfoProduto.classList.remove("show");
    }
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        sectionEditarProduto.classList.remove("show");
    }
})

const produtos = [];

const _mensagem = (mensagem, classname, cor, mostrar = true) => {

    mensagemInfo.forEach((info) => {
        if (mostrar) {
            info.classList.add(classname);
            info.textContent = mensagem;
            info.style.color = cor;
            return;
        }
        info.classList.remove(classname);
    })

}

class Produto {
    constructor(nome, fabricante, modelo, tipo, preco, estoque) {
        this.nome = nome.trim();
        this.fabricante = fabricante.trim();
        this.modelo = modelo.trim();
        this.tipo = tipo.trim();
        this.preco = preco;        
        this.estoque = estoque;
    }

    adicionar() {

        if (this.nome.trim() === "") {
            _mensagem("É necessário colocar o nome do produto!", "show", "red", true);
            return;
        }

        let produtoExistente = false;

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].Produto.toLowerCase() === this.nome.trim().toLowerCase()) {
                produtoExistente = true;
            }
        }

        if (produtoExistente) {
            _mensagem("Produto já existente!", "show", "red", "true");
            return;
        }

        if (this.fabricante.trim() === "") {
            _mensagem("É necessário colocar o nome do fabricante!", "show", "red", true);
            return;
        }

        if (this.modelo.trim() === "") {
            _mensagem("É necessário colocar o modelo do produto!", "show", "red", true);
            return;
        }

        if (this.tipo.trim() === "") {
            _mensagem("É necessário colocar o tipo de produto!", "show", "red", true);
            return;
        }

        this.preco = this.preco.replace(",", ".");
        this.preco = Number(this.preco);

        if (Number.isNaN(this.preco)) {
            _mensagem("É necessário colocar o preço do produto!", "show", "red", true);
            return;
        }

        if (this.preco <= 0) {
            _mensagem("Preço do produto precisa ser maior que zero!", "show", "red", true);
            return;
        }

        this.estoque = Number(this.estoque);

        if (Number.isNaN(this.estoque)) {
            _mensagem("É necessário colocar o estoque do produto!", "show", "red", true);
            return;
        }

        if (this.estoque <= 0) {
            _mensagem("Estoque do produto precisa ser maior que zero!", "show", "red", true);
            return;
        }

        _mensagem("Produto adicionado com sucesso!", "show", "green", true);
        limparInputs();
        templateProduto(this.nome);

        setTimeout(() => {
            _mensagem("", "show", "", false);
        }, 2000);
        
        templatePushAtualizacoes(this.nome, "adicionar");

        produtos.push(
            {
                Produto: this.nome,
                Fabricante: this.fabricante,
                Modelo: this.modelo,
                Tipo: this.tipo,
                Preco: this.preco,
                Estoque: this.estoque
            }
        );
    }    
}

adicionarProduto.addEventListener("click", () => {
    const prod = new Produto(
        produtoInput("nome-produto").value,
        produtoInput("fabricante-produto").value,
        produtoInput("modelo-produto").value,
        produtoInput("tipo-produto").value,
        produtoInput("preco-produto").value,
        produtoInput("estoque-produto").value
    );
    prod.adicionar();
    console.log(produtos)
})

buttonAtualizar.addEventListener("click", () => {

    if (!editarProduto(precoProdutoInput.value, estoqueProdutoInput.value)) return;

    _mensagem("Produto atualizado com sucesso!", "show", "green", true);

    setTimeout(() => {
        _mensagem("", "show", "", false);
    }, 2000);    

    produtos.forEach((info) => {
        if (info.Produto === titleProdutoEditar) {
            info.Preco = precoProdutoInput.value;
            info.Estoque = estoqueProdutoInput.value;
            templatePushAtualizacoes(info.Produto, "editar");
        }
    })
    
})