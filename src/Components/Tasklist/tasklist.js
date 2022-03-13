import "./tasklist.css";

const buildDOM = () => {
    let container = document.querySelector("#content");
    
    let tasklist = document.createElement("div");
    tasklist.setAttribute("id", "tasklist");
    
    container.appendChild(tasklist);

}

const grabTaskList = () => {
    return document.querySelector("#tasklist");
}

// populates the tasklist, makes sure that if an item is done it's checked, crossed and vice-versa.

const showTaskList = (project) => {
    
    let taskList = grabTaskList();

    emptyAll()
    for (let i = 0; i < project.entries.length; i++) {

        let task = document.createElement("div");
        task.setAttribute("class", "task");

        let chkbox = document.createElement("input");
        chkbox.setAttribute("type", "checkbox");

        let p = document.createElement("p");
        p.textContent = project.entries[i].value;
        project.entries[i].done ? (chkbox.checked = true, p.classList.add("crossed")) : chkbox.checked = false;

        chkbox.addEventListener("click", () => {
            p.classList.toggle("crossed");
            project.entries[i].done = project.entries[i].done ? false : true;
        })
        
        task.appendChild(chkbox);
        task.appendChild(p);

        taskList.appendChild(task);
    }

    showForm(project);
}

// displays the input and button so you can add new tasks, then re-populates the tasklist

const createForm = (project, btn) => {

    btn.classList.add("disabled");

    let form = document.querySelector("#newTask");

    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Task name:"
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");

    let descLabel = document.createElement("label");
    descLabel.setAttribute("for", "desc");
    descLabel.textContent = "Task description:"
    let descInput = document.createElement("input");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("id", "desc");

    let ddlLabel = document.createElement("label");
    ddlLabel.setAttribute("for", "ddl");
    ddlLabel.textContent = "Task deadline:"
    let ddlInput = document.createElement("input");
    ddlInput.setAttribute("type", "text");
    ddlInput.setAttribute("id", "ddl");

    let prioLabel = document.createElement("label");
    prioLabel.setAttribute("for", "prio");
    prioLabel.textContent = "Task priority:"
    let prioInput = document.createElement("input");
    prioInput.setAttribute("type", "text");
    prioInput.setAttribute("id", "prio");

    let submit = document.createElement("button");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "submit");
    submit.textContent = "Add task";
    submit.addEventListener("click", () => {
        addToTaskList(project);
        deleteForm(form);
    });

    let formArr = [nameLabel, nameInput, descLabel, descInput, ddlLabel, ddlInput, prioLabel, prioInput, submit]
    for (let element of formArr) {
        form.appendChild(element);
    }
}

const showForm = (project) => {

    let btn = document.createElement("button");
    btn.textContent = "Add entry";
    btn.addEventListener("click", () => {
        createForm(project, btn);
    })

    grabTaskList().appendChild(btn);

}

const deleteForm = (form) => {
    let count = form.childElementCount;
    for (let i = 0; i < count; i++) {
        form.children[0].remove();
    }
}

// code is dumpster fire, :(

// removes all elements from within the tasklist to re-populate

const emptyAll = () => {
    let tasklist = grabTaskList();
    let childrenCount = tasklist.childElementCount;
    if (childrenCount) {
        for (let i = 0; i < childrenCount; i++) {
            tasklist.children[0].remove();
        }
    }
}

const grabFormInfo = () => {
    let name = document.querySelector("#name").value;
    let desc = document.querySelector("#desc").value;
    let ddl = document.querySelector("#ddl").value;
    let prio = document.querySelector("#prio").value;

    return {name, desc, ddl, prio};
}

const addToTaskList = (project) => {
    let formInfo = grabFormInfo();
    if (formInfo.name) {
        let task = {
            value: formInfo.name,
            desc: formInfo.desc,
            ddl: formInfo.ddl,
            prio: formInfo.prio,
            done: false
        }
        project.entries.push(task);
        showTaskList(project);
    }
}

export { buildDOM, showTaskList };