import "./dashboard.css";
import { showTaskList } from "../Tasklist/tasklist";

const dashboard = () => {
    let container = document.querySelector("#content");
    
    let dashboard = document.createElement("div");
    dashboard.setAttribute("id", "dashboard");
    
    // here starts the project creation process

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    dashboard.appendChild(input);

    let btn = document.createElement("button");
    btn.textContent = "Press me!";
    btn.addEventListener("click", () => {
        let task = new projectFactory(input.value);
        let p = document.createElement("p");
        p.setAttribute("class", "project");
        p.textContent = task.name;
        p.addEventListener("click", () => {
            showTaskList(task);
        })
        dashboard.appendChild(p);
    })
    dashboard.appendChild(btn);

    //it ends here

    container.appendChild(dashboard);
}

function projectFactory(name, entries=[]) {
    this.name = name;
    this.entries = entries;
    return { name, entries }
}

export default dashboard;