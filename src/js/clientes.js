export const sectionClientes = document.querySelector("#clientes-api");

const getClientes = async() => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data;
    } catch(error) {
        console.error(error)
    }
}

const templateClientes = async() => {
    const clientes = await getClientes();
    clientes.forEach((cliente) => {
        const template = 
        `
            <div class="cliente">
                <div class="nome-cliente-container">
                    <span class="nome-cliente">Nome - <span>${cliente.name}</span></span>
                </div>
                <div class="outras-informacoes-cliente">
                    <span class="usuario-cliente">Usuário - <span>${cliente.username}</span></span>
                    <span class="email-cliente">Telefone - <span>${cliente.email}</span></span>
                </div>
            </div>     
        `;
        const parser = new DOMParser();
        const templateHtml = parser.parseFromString(template, "text/html");
        const _cliente = templateHtml.querySelector("div");
        sectionClientes.appendChild(_cliente);
    })
}

templateClientes();