import "./dashboard.css";

const dashboard = () => {
    let container = document.querySelector("#content");
    
    let dashboard = document.createElement("div");
    dashboard.setAttribute("id", "dashboard");
    let p = document.createElement("p");
    p.textContent = "testing";
    dashboard.appendChild(p);

    container.appendChild(dashboard);
}

export default dashboard;