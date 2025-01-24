/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";

export class TodoList extends Component {
    static template = "awesome_owl.todo_list";
    static components = { TodoItem };

    setup() {
        this.state = useState({ todoCounter: 1, todos: [] });
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != "") {
            this.state.todos.push({ id: this.state.todoCounter, description: ev.target.value, isCompleted: false });
            ev.target.value = "";
            this.state.todoCounter++;
        }
    }
}
