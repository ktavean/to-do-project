import "./mainpart.css";

const mainpart = () => {
    let container = document.querySelector("#content");
    
    let mainpart = document.createElement("div");
    mainpart.setAttribute("id", "mainpart");

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    mainpart.appendChild(input);

    let btn = document.createElement("button");
    btn.textContent = "Press me!";
    btn.addEventListener("click", () => {
        let task = new projectFactory(input.value);
        task.entries.push("test2");
        let p = document.createElement("p");
        p.textContent = task.name;
        p.addEventListener("click", () => {
            let entry = document.createElement("p");
            entry.textContent = task.entries[0];        //loop through aici
            mainpart.appendChild(entry);
        })
        mainpart.appendChild(p);
    })
    mainpart.appendChild(btn);
    
    container.appendChild(mainpart);
}

function projectFactory(name, entries=[]) {
    this.name = name;
    this.entries = entries;
    return { name, entries }
}

export default mainpart;