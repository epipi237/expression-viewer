/*
 * nextprot-expression-viewer
 * https://github.com/gastonnche/expression-viewer
 *
 * Copyright (c) 2016 shizle
 * Licensed under the Apache-2.0 license.
 */

/**
 @class nextprotexpressionviewer
 */
var d3 = require('d3');
var $ = require('jquery');
var data= require('../data/data.json');
var nextprotexpressionviewer;
module.exports = nextprotexpressionviewer = function (opts) {
    this.el = opts.el;
};

/**
 * Private Methods
 */

/*
 * Public Methods
 */
/**
 * Method responsible to say render the visualization
 *
 * @example
 *
 *     nextprotexpressionviewer.render('NX_P38398');
 *
 * @method hello
 * @param {String} protein unique name of the protein to be visualised
 * @return {void} Returns null
 */
nextprotexpressionviewer.prototype.render = function () {
    function visualise(data,that) {
//        if(data==null){
//            throw new Error("No prteind matches that unique name");
//            return false;
//        }
        "use strict";
        d3.select(that.el)
                .append("div")
                .attr("class", "block")
                .selectAll("div.cv")
                .data(data.entry.annotations)
                .enter()
                .append("div")
                .attr("class", "cv")
                .text(function (d) {
                    return "Tissue : " + d.cvTermName;
                });

        d3.selectAll("div.cv")
                .append("div")
                .attr("class", "chart")
                .selectAll("div.line")
                .data(function (d) {
                    return d.evidences
                })
                .enter()
                .append("div")
                .attr("class", "line");
        d3.selectAll("div.line")
                .append("div")
                .attr("class", "label")
                .text(function (d) {
                    return "id: " + d.evidenceId
                });
        d3.selectAll("div.line")
                .append("div")
                .attr("class", "des")
                .text(function (d) {
                    return d.resourceDescription;
                });
        d3.selectAll("div.line")
                .append("div")
                .attr("class", "bar")
                .style("width", function (d) {
                    if (d.expressionLevel == "positive") {
                        return "50%"
                    }
                    else if (d.expressionLevel == "medium") {
                        return "35%"
                    }
                    else {
                        return "20%"
                    }

                })
                .style('background', function (d) {
                    if (d.expressionLevel == "positive") {
                        return "green"
                    }
                    else if (d.expressionLevel == "medium") {
                        return "blue"
                    }
                    else {
                        return "red"
                    }
                })
                .text(function (d) {
                    return d.expressionLevel
                });

    }
//    string=encodeURI("https://api.nextprot.org/entry/"+protein+"/expression­profile.json");
//    d3.json(string,visualise
visualise(data,this);
}

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     nextprotexpressionviewer.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */

//
//nextprotexpressionviewer.hello = function (name) {
//
//    return 'hello ' + name;
//};

