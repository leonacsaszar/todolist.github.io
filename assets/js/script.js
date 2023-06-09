const btnAgregar = document.querySelector('#newTask');
const task = document.querySelector('#newTask');
const tbodyTasks = document.querySelector('#tasks');
const totalTask = document.querySelector('#totalTasks');
const taskReady = document.querySelector('#taskReady');

const tasksList = [
    {id: 1, name: "entrenar", status: false},
    {id: 2, name: "regar plantas", status: false},
    {id: 3, name: "estudiar", status: false}
];

const addTask = () => {
    if (task.value === '') {
        alert('Debe ingresar una tarea');
        return;
    }
    const newTask = {
        id: tasksList.length + 1,
        name: task.value,
        status: false
    };

    tasksList.push(newTask);

    updateList();
}

const updateList = () => {
    let html = '', countTaskReady = 0;
    for (let task of tasksList) {
        if (task.status) {
            countTaskReady++;
        }
        html += `
        <tr class="${task.status ? 'bg-success' : 'bg-light'}">
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td class="text-right"><button onclick="updateStatus(${task.id})" class="btn btn-${task.status ? 'success' : 'warning'}">${task.status ? 'Realizada' : 'Pendiente'}</button></td>
        <td class="text-right"><button onclick="deleteTask(${task.id})" class="btn btn-danger" id="btnEliminar">Eliminar</button></td>
        </tr>
        `;
    }
    task.value = '';
    tbodyTasks.innerHTML = html;
    totalTask.innerHTML = tasksList.length;
    taskReady.innerHTML = countTaskReady;
}

const updateStatus = (taskId) => {
    const index = tasksList.findIndex(task => task.id === taskId);
    tasksList[index].status = !tasksList[index].status;
    updateList();
}

const deleteTask = (taskId) => {
    const confirmation = confirm('¿Está seguro de eliminar la tarea?')
    if (confirmation) {
        const index = tasksList.findIndex(task => task.id === taskId);
        tasksList.splice(index, 1);
        updateList();
    }
}

btnAgregar.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        addTask();
    }
});

updateList();
