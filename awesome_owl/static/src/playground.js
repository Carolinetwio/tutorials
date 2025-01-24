/** @odoo-module **/

import { Component, markup } from "@odoo/owl";
import { Counter } from "./counter/counter"
import { Card } from "./card/card"


export class Playground extends Component {
    static template = "awesome_owl.playground";
    
    static components = { Counter, Card }

    cardtitle1 = "<div>some title 1</div>";
    cardtitle2 = markup("<div>some title 2</div>");
}
