/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static props = { 
        todo: {
            type: Object,
            shape: {id: 3, description: "buy milk", isCompleted: false} 
        },
        removeTodo: Function,
    };
    static template = "awesome_owl.todo_item";
    
    toggleTodo() {
        this.props.todo.isCompleted = !this.props.todo.isCompleted;
    }

    onClick() {
        this.props.removeTodo(this.props.todo.id);
    }
}
