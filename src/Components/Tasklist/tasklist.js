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

const showForm = (project) => {
    
    let form = document.querySelector("#newTask");

    let btn = document.createElement("button");
    btn.textContent = "Add entry";
    btn.addEventListener("click", () => {
        form.classList.toggle("hidden");
    })

    if (!document.querySelector("#submit")) {
        let submit = document.createElement("button");
        submit.setAttribute("id", "submit");
        submit.textContent = "Add task";
        form.appendChild(submit);
        submit.addEventListener("click", () => {
            addToTaskList(project);
        });
    }

    grabTaskList().appendChild(btn);

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
    debugger;
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