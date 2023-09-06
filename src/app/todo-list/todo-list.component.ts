import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  editableId: number | null = null;
  newTask: string = '';
  tasks: any[] = [
    {
      title: 'Crear la lista de tareas',
      completed: true,
    },
    {
      title: 'Realizar la estructura HTML',
      completed: true,
    },
    {
      title: 'Desplegar el proyecto en la web',
      completed: false,
    },
  ];
  searchTerm: string = '';

  addTask() {
    const task = {
      title: this.newTask,
      completed: false,
    }
    this.tasks.push(task);
    this.newTask = '';
    this.filter(); /* llama a la funcion luego de agregar una tarea  */
  }
  
  updateTask(task: any, title: string) {
    const index = this.tasks.indexOf(task);
    const updateTask = {
      title,
      completed: task.completed
    }
    this.tasks[index] = { ...task, ...updateTask };
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  startEdit(id: number): void {
    this.editableId = id;
  }

  stopEdit(task: any, title: string): void {
    this.editableId = null;
    this.updateTask(task, title);
  }

  filterTasks: any[] = []; /* se asigna para que almacene las tareas filtradas por el buscador  */

  filter() { /* aplicamos el criterio de busqueda segun el filtro de deseemos */
    const searchTerm = this.searchTerm.toLowerCase();
    if (searchTerm === '') {
      this.filterTasks = this.tasks;
    } else {
      this.filterTasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
    }
  }

  ngOnInit() { /* para que cuando la pagina inicie o se cargue se muestre la lista de tareas */
    this.filter();
  }

}
