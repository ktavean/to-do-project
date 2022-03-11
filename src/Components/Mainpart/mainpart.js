import "./mainpart.css";

const mainpart = () => {
    let container = document.querySelector("#content");
    
    let mainpart = document.createElement("div");
    mainpart.setAttribute("id", "mainpart");
    let p = document.createElement("p");
    p.textContent = "testing";
    mainpart.appendChild(p);

    container.appendChild(mainpart);
}

export default mainpart;