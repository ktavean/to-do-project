import "./header.css";

const header = () => {
    let container = document.querySelector("#content");
    
    let header = document.createElement("div");
    header.setAttribute("id", "header");
    let p = document.createElement("p");
    p.textContent = "testing";
    header.appendChild(p);

    container.appendChild(header);
}

export default header;