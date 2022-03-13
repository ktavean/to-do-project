import "./dashboard.css";
import { showTaskList } from "../Tasklist/tasklist";
import { changeTitle } from "../Header/header"

const dashboard = () => {
    let container = document.querySelector("#content");
    
    let dashboard = document.createElement("div");
    dashboard.setAttribute("id", "dashboard");
    
    // here starts the project creation process

    let topPart = document.createElement("div");
    topPart.setAttribute("id", "topPart");

    let bottomPart = document.createElement("div");
    bottomPart.setAttribute("id", "bottomPart");

    let bottomTitle = document.createElement("h2");
    bottomTitle.textContent = "Projects";

    bottomPart.appendChild(bottomTitle);

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    topPart.appendChild(input);

    let btn = document.createElement("img");
    btn.setAttribute("src", "./assets/icons/plus.svg");
    btn.setAttribute("id", "add");
    btn.addEventListener("click", () => {
        let project = new projectFactory(input.value);
        let p = document.createElement("p");
        p.setAttribute("class", "project");
        p.textContent = project.name;
        input.value = "";
        p.addEventListener("click", () => {
            showTaskList(project);
            changeTitle(project);
        })
        bottomPart.appendChild(p);
    })
    topPart.appendChild(btn);

    dashboard.appendChild(topPart);
    dashboard.appendChild(bottomPart);

    //it ends here

    container.appendChild(dashboard);
}

const delProject = (project) => {
    let bottomPart = document.querySelector("#bottomPart");
    for (let element of bottomPart.children) {
        if (element.textContent === project.name) {
            element.remove();
            project = null;
        }
    }
}

function projectFactory(name, entries=[]) {
    this.name = name;
    this.entries = entries;
    return { name, entries }
}

export {dashboard, delProject};