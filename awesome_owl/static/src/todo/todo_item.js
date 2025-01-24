/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static props = { 
        todo: {
            type: Object,
            shape: {id: 3, description: "buy milk", isCompleted: false} 
        }
    };
    static template = "awesome_owl.todo_item";
}
