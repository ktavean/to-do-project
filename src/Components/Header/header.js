import "./header.css";
import { delProject } from "../Dashboard/dashboard";
import { emptyAll } from "../Tasklist/tasklist";

const header = () => {
    let container = document.querySelector("#content");
    
    let header = document.createElement("div");
    header.setAttribute("id", "header");
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "title");
    h1.textContent = "To-do list";
    let delProj = document.createElement("img");
    delProj.setAttribute("id", "delProj");

    header.appendChild(h1);
    header.appendChild(delProj);

    container.appendChild(header);

}

const changeTitle = (projectName) => {
    let title = document.querySelector("#title");
    title.textContent = projectName;
    let delProj = document.querySelector("#delProj");
    delProj.setAttribute("src", "./assets/icons/delete.svg");
    delProj.addEventListener("click", () => {
        delProject(title.textContent);
        title.textContent = "To-do list";
        emptyAll();
        delProj.setAttribute("src", "");
    });
}

export { header, changeTitle };