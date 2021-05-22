class Task {
    constructor(name, contents, date, time) {
        this.name = name;
        this.contents = contents;
        this.date = date;
        this.time = time        
    }
};

class UI {
    addTask(task) {
        const todoList = document.getElementById('todo-list');
        const element = document.createElement('div');
        element.innerHTML = `
           <div class="card border-light mb-3" shadow name="taskTarget">
               <div class="card-header">
                   <strong>Day</strong>: ${task.date}
                   <strong>Time</strong>: ${task.time}
                    <a type="button" class="btn btn-success checkA" name="btnSuccess" id="btnSuccess" data-toggle="tooltip" data-placement="buttom" title="Mark as Completed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="" viewBox="0 0 16 16">
                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                        </svg>
                    </a>
                    <a class="btn btn-danger check" name="btnDelete" id="btnDelete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                    </a>
               </div>
               <div class="card-body">
                   <h4 class="card-title">
                        ${task.name}
                   </h4>
                   <p> 
                        ${task.contents}
                   </p>
               </div>
           </div>
        `;
        todoList.appendChild(element);
    }
    resetForm(){
        document.getElementById('todo-list-form').reset();
    }
    actionTask(element){
        if (element.name ==="btnSuccess") {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Task Completed', 'success');
        } else if (element.name ==="btnDelete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Task Deleted', 'danger');
        }
    }
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div,app);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document
.getElementById('todo-list-form')
.addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const contents = document.getElementById('contents').value;
    const time = document.getElementById('time').value;
    const date = document.getElementById('dateInput').value;
    e.preventDefault();
    const task = new Task(name, contents, date, time);
    const ui = new UI();
    ui.addTask(task);
    ui.resetForm();
    ui.showMessage('Task Added successfully', 'success');
})

document.getElementById('todo-list').addEventListener('click', function (e) {
    const ui = new UI()
    ui.actionTask(e.target);    
});
