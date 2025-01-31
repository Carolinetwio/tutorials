/** @odoo-module */
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

const statisticsService = {
    start() {
        return {
            loadStatistics () {
                return rpc("/awesome_dashboard/statistics");
            }
        };
    },
};
registry.category("services").add("awesome_dashboard.statistics", statisticsService);
