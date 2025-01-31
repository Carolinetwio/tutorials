/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_dashboard.card";
    static default_props = {
        size: 1,
    };
}
