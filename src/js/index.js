import { sectionProdutos } from "./produtos.js";
import { sectionClientes } from "./clientes.js";

const buttons = document.querySelectorAll("button[data-section]");
const sections = document.querySelectorAll(".section");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        const buttonStyle = document.querySelectorAll(".button-style");
        buttonStyle.forEach((btn) => {
            btn.classList.remove("selected")
            console.log(btn)
        })

        button.classList.add("selected")

        const id = button.getAttribute("data-section");
        sections.forEach((section) => section.style.display = "none");
        const section = document.getElementById(id);
        section ? section.style.display = "block" : null;

    })
})
