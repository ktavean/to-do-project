import { main } from "envinfo";
import "./mainpart.css";

const mainpart = () => {
    let container = document.querySelector("#content");
    
    let mainpart = document.createElement("div");
    mainpart.setAttribute("id", "mainpart");

    let btn = document.createElement("button");
    btn.addEventListener("click", () => {
        let task = new projectFactory("test");
        let p = document.createElement("p");
        p.textContent = task.name;
        mainpart.appendChild(p);
    })
    mainpart.appendChild(btn);
    
    container.appendChild(mainpart);
}

function projectFactory(name) {
    this.name = name;
    entries = [];
    return { name, entries }
}

export default mainpart;