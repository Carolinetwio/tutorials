/** @odoo-module **/

import { Component, useState } from "@odoo/owl";


export class Card extends Component {
    static props = {
        title: String,
        slots: {
            type: Object,
            shape: {
                default: true
            },
        }
    };
    static template = "awesome_owl.card";  
    
    setup() {
        this.state = useState({ visible: true });
    }
    showHide() {
        this.state.visible = !this.state.visible;
    }
}
