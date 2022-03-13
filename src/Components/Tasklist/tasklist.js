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

        let chkbox = document.createElement("img");
        chkbox.setAttribute("src", "./assets/icons/checkbox-blank-outline.svg");
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
        switch(String(project.entries[i].prio)) {
            case "3":
                task.classList.add("notUrgent");
                pPrio.textContent = "Not urgent";
                break
            case "2":
                task.classList.add("urgent");
                pPrio.textContent = "Urgent";
                break
            case "1":
                task.classList.add("critical");
                pPrio.textContent = "Critical";
                break
        }

        chkbox.addEventListener("click", () => {
            task.classList.toggle("crossed");
            project.entries[i].done = project.entries[i].done ? false : true;
            chkbox.classList.toggle("checked");
        })

        let del = document.createElement("img");
        del.setAttribute("src", "./assets/icons/delete.svg");
        del.setAttribute("id", "del");
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

    btn.remove();

    let taskList = grabTaskList();

    let form = document.createElement("div");
    form.setAttribute("class", "task");

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");

    let descInput = document.createElement("input");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("id", "desc");

    let ddlInput = document.createElement("input");
    ddlInput.setAttribute("type", "date");
    ddlInput.setAttribute("id", "ddl");

    let prioSelect = document.createElement("select");
    prioSelect.setAttribute("id", "prio");

    // options

    let notUrgent = document.createElement("option");
    notUrgent.textContent = "Not urgent";
    notUrgent.value = "3";

    let urgent = document.createElement("option");
    urgent.textContent = "Urgent";
    urgent.value = "2";

    let critical = document.createElement("option");
    critical.textContent = "Critical";
    critical.value = "1";

    prioSelect.appendChild(notUrgent);
    prioSelect.appendChild(urgent);
    prioSelect.appendChild(critical);

    taskList.addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
            addToTaskList(project);
            deleteForm(form);
        }
    })

    let formArr = [nameInput, descInput, ddlInput, prioSelect]
    for (let element of formArr) {
        form.appendChild(element);
    }

    taskList.appendChild(form);
}

const showForm = (project) => {

    let btn = document.createElement("img");
    btn.setAttribute("id", "addTask");
    btn.setAttribute("src", "./assets/icons/pencil-plus.svg");
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
    let prio = Number(document.querySelector("#prio").value);

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
        project.entries.sort((firstEntry, secondEntry) => firstEntry.prio - secondEntry.prio);
        showTaskList(project);
    }
}

export { buildDOM, showTaskList, emptyAll };