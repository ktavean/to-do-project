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

    addToTaskList(project);
}

const addToTaskList = (project) => {
    
    let taskList = grabTaskList();

    let input = document.createElement("input");
    input.setAttribute("type", "text");

    let btn = document.createElement("button");
    btn.textContent = "Add entry";
    btn.addEventListener("click", () => {
        if (input.value) {
            let task = {
                value: input.value,
                done: false
            }
            project.entries.push(task);
            showTaskList(project);
        }
    })

    taskList.appendChild(input);
    taskList.appendChild(btn);
}

const emptyAll = () => {
    let tasklist = grabTaskList();
    let childrenCount = tasklist.childElementCount;
    if (childrenCount) {
        for (let i = 0; i < childrenCount; i++) {
            tasklist.children[0].remove();
        }
    }
}

export { buildDOM, showTaskList }