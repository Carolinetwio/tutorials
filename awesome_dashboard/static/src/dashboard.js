/** @odoo-module **/

import { Component, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { PieChart } from "./piechart/piechart";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, Card, PieChart };

    setup() {
        this.display = {
            controlPanel: {},
        };
        this.action = useService("action");
        this.statisticsService = useService("awesome_dashboard.statistics");
        onWillStart(async () => {
            this.statistics = await this.statisticsService.loadStatistics();
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
