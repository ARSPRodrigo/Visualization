"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/ResizeSurface", "./MultiChart", "./INDChart"], factory);
    } else {
        root.MultiChartSurface = factory(root.d3, root.ResizeSurface, root.MultiChart, root.INDChart);
    }
}(this, function (d3, ResizeSurface, MultiChart, INDChart) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        INDChart.call(this);
        this.class = "chart_MultiChartSurface";

        this._title = "MultiChartSurface";
        this._content = new MultiChart();
        this._content.click = function (row, column) {
            context.click(row, column);
        }

        var context = this;
        this._menu.click = function (d) {
            context._content.chart_type(d).render();
        }
        this.mode("all");
    };
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.implements(INDChart.prototype);
    MultiChartSurface.prototype.testData = INDChart.prototype.testData;

    MultiChartSurface.prototype.publishProxy("chart_type", "_content");

    MultiChartSurface.prototype.columns = function (_) {
        if (!arguments.length) return this._content.columns();
        this._content.columns(_);
        return this;
    };

    MultiChartSurface.prototype.data = function (_) {
        if (!arguments.length) return this._content.data();
        this._content.data(_);
        return this;
    };

    MultiChartSurface.prototype.mode = function (_) {
        if (!arguments.length) return this._mode;
        this._mode = _;
        switch (this._mode) {
            case "2d":
                this.menu(this._content._2dChartTypes.concat(this._content._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "multi":
                this.menu(this._content._multiChartTypes.concat(this._content._anyChartTypes).map(function (item) { return item.display; }).sort());
                break;
            case "all":
            default:
                this.menu(this._content._allChartTypes.map(function (item) { return item.display; }).sort());
        }
        return this;
    };

    return MultiChartSurface;
}));
