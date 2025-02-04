/** @odoo-module **/
import { Component, onWillStart, useRef, useEffect } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.piechart";
    
    setup() {
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));
        this.canvasRef = useRef("canvas");
        useEffect(() => {
            this.renderChart();
            return () => {
                if (this.chart) {
                    this.chart.destroy();
                }
            };
        });
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const orders_by_size = this.props.data;
        const data = {
            datasets: [{
                data: Object.values(orders_by_size)
            }],
            labels: Object.keys(orders_by_size)
        };
        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: data, 
        });
    }
}
