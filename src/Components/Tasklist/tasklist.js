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

    let title = document.createElement("h2");
    title.setAttribute("id", "taskListTitle")
    title.textContent = "Tasklist";
    taskList.appendChild(title);

    // what each item represents at the top

    let legend = document.createElement("div");
    legend.setAttribute("class", "task");
    legend.classList.add("legendTask");

    let legendName = document.createElement("p");
    legendName.textContent = "Task name";
    legendName.setAttribute("class", "topName");

    let legendDesc = document.createElement("p");
    legendDesc.textContent = "Task description";
    legendDesc.setAttribute("class", "topDesc");

    let legendDdl = document.createElement("p");
    legendDdl.textContent = "Task deadline";
    legendDdl.setAttribute("class", "topDdl");

    let legendPrio = document.createElement("p");
    legendPrio.textContent = "Task Priority";
    legendPrio.setAttribute("class", "topPrio");

    legend.appendChild(legendName);
    legend.appendChild(legendDesc);
    legend.appendChild(legendDdl);
    legend.appendChild(legendPrio);

    taskList.appendChild(legend);


    for (let i = 0; i < project.entries.length; i++) {

        let task = document.createElement("div");
        task.setAttribute("class", "task");

        let chkbox = document.createElement("input");
        chkbox.setAttribute("type", "checkbox");
        chkbox.setAttribute("class", "chk");

        let pName = document.createElement("p");
        pName.setAttribute("class", "name");
        pName.textContent = `${project.entries[i].value}`;
        project.entries[i].done ? (chkbox.checked = true, task.classList.add("crossed")) : chkbox.checked = false;

        let pDesc = document.createElement("p");
        pDesc.setAttribute("class", "desc");
        pDesc.textContent = `${project.entries[i].desc}`;

        let pDdl = document.createElement("p");
        pDdl.setAttribute("class", "ddl");
        pDdl.textContent = `${project.entries[i].ddl}`;

        let pPrio = document.createElement("p");
        pPrio.setAttribute("class", "prio");
        pPrio.textContent = `${project.entries[i].prio}`;

        chkbox.addEventListener("click", () => {
            task.classList.toggle("crossed");
            project.entries[i].done = project.entries[i].done ? false : true;
        })

        let del = document.createElement("button");
        del.setAttribute("type", "button");
        del.textContent = "Delete";
        del.addEventListener("click", () => {
            project.entries.splice(i, 1);
            showTaskList(project);
        })

        task.appendChild(chkbox);
        task.appendChild(pName);
        task.appendChild(pDesc);
        task.appendChild(pDdl);
        task.appendChild(pPrio);
        task.appendChild(del);

        taskList.appendChild(task);
    }

    showForm(project);
}

// displays the input and button so you can add new tasks, then re-populates the tasklist

const createForm = (project, btn) => {

    btn.classList.add("disabled");

    let form = document.querySelector("#newTask");

    let close = document.createElement("button");
    close.setAttribute("type", "button");
    close.setAttribute("id", "close");
    close.textContent = "X";
    close.addEventListener("click", () => {
        deleteForm(form);
        btn.classList.remove("disabled");
    });

    // name, desc, deadline, prio

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
    ddlInput.setAttribute("type", "date");
    ddlInput.setAttribute("id", "ddl");

    let prioLabel = document.createElement("label");
    prioLabel.setAttribute("for", "prio");
    prioLabel.textContent = "Task priority:"
    let prioSelect = document.createElement("select");
    prioSelect.setAttribute("id", "prio");

    // options

    let notUrgent = document.createElement("option");
    notUrgent.textContent = "Not urgent";
    notUrgent.value = "Not urgent";
    notUrgent.setAttribute("id", "notUrgent");

    let urgent = document.createElement("option");
    urgent.textContent = "Urgent";
    urgent.value = "Urgent";
    urgent.setAttribute("id", "urgent");

    let critical = document.createElement("option");
    critical.textContent = "Critical";
    critical.value = "Critical";
    critical.setAttribute("id", "critical");

    prioSelect.appendChild(notUrgent);
    prioSelect.appendChild(urgent);
    prioSelect.appendChild(critical);

    // submit button

    let submit = document.createElement("button");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "submit");
    submit.textContent = "Add task";
    submit.addEventListener("click", () => {
        addToTaskList(project);
        deleteForm(form);
    });

    let formArr = [close, nameLabel, nameInput, descLabel, descInput, ddlLabel, ddlInput, prioLabel, prioSelect, submit]
    for (let element of formArr) {
        form.appendChild(element);
    }
    form.classList.toggle("hidden");
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
    form.classList.toggle("hidden");
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