/** @odoo-module **/

import { Component, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { rpc } from "@web/core/network/rpc"; //specific to Odoo 18

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, Card };

    setup() {
        this.display = {
            controlPanel: {},
        };
        this.action = useService("action");
        onWillStart(async () => {
             this.statistics = await rpc("/awesome_dashboard/statistics");
        });
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

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
