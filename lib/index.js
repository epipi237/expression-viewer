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

colorset={
	positive:"lightgreen",
	high:"green",
	medium:"blue",
	low:"lightred",
	negative:"red"
	};
        
var nextprotexpressionviewer;
module.exports = nextprotexpressionviewer = function (opts) {
    this.el = opts.el;
    if(opts.colors)
     this.colors=opts.colors;
    else
	 this.colors=colorset;
     var url="https://api.nextprot.org/entry/"+opts.protein+"/expression-profile.json";
     self=this;
     $(self.el).html("Loading....");
     $.ajax({
         url:url,
         dataType:"json",
         type:'get',
        contentType: "application/json; charset=utf-8",
        cache:true,
        success:function(data){
             self.data=data;
             $(self.el).html("   ");
             self.render();
         },error:function(){
             self.data={};
             $(self.el).html("Unable to sind that entry.")
         }
     });
};

/**
 * Private Methods
 */
    nextprotexpressionviewer.prototype.getColor=function (obj){
        for(i in this.colors){
            if(i===obj){
                return this.colors[i];
            }
    }
    };
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
	self=this;
    "use strict";        
        d3.select(this.el)
                .append("div")
                .attr("class", "block")
                .selectAll("div.cv")
                .data(self.data.entry.annotations)
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
                    if (d.expressionLevel == "positive" || d.expressionLevel == "high") {
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
                    return self.getColor(d.expressionLevel);
                })
                .text(function (d) {
                    return d.expressionLevel
                });

}

