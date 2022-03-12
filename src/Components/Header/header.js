import "./header.css";

const header = () => {
    let container = document.querySelector("#content");
    
    let header = document.createElement("div");
    header.setAttribute("id", "header");
    let p = document.createElement("p");
    p.setAttribute("id", "title");
    p.textContent = "";
    header.appendChild(p);

    container.appendChild(header);

}

const changeTitle = (projectName) => {
    let title = document.querySelector("#title");
    title.textContent = projectName;
}

export { header, changeTitle };