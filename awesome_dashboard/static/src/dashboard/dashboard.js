/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { items } from "./dashboard_items";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, Card };

    setup() {
        this.display = {
            controlPanel: {},
        };
        this.action = useService("action");
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        this.items = registry.category("awesome_dashboard").getAll();
    }
    openCustomerKanban() {
        this.action.doAction("base.action_partner_form");
    }
    openLeadAction() {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: 'Leads',
            res_model: 'crm.lead',
            views: [[false, 'list'], [false, 'form']],
        });
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
