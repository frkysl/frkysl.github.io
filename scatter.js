


var margin = {top: 30, right:100, bottom: 100, left: 50},
    w = 6*30 + margin.left - margin.right,
    h = 9*30 + margin.top - margin.bottom;
 
var color = d3.scale.linear()
    .domain([0, 2000])
    .range(["yellow", "darkred"])
    .interpolate(d3.interpolateLab);
 
var x = d3.scale.linear()
    .domain([0, 6])
    .range([0, w + 30]);
 
var y = d3.scale.linear()
    .domain([0, 10])
    .range([h , -30]);
 
var yinv = d3.scale.linear()
    .domain([0, 9])
    .range([0, h]);
 
var xAxis = d3.svg.axis()
    .scale(x)
	.tickValues([0,1,2,3,4,5])
    .tickFormat(d3.format(",.0d"))
	//.tickPadding()
    .orient("bottom");
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
    
	
 
var side = 1;
 
var bins = d3.bin()
    .size([w, h])
    .side(side);
 
var svg = d3.select("#area2").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");
 
var points = [];
 
d3.csv("paired.csv", function(error, data) {
 
  data.forEach(function(d) {
    d.time = +d.f;
    d.intensity = +d.sz;
    points.push([d.time, d.intensity]);
  });
 		//console.log(points);  //debugging

//  svg.append("g")
//      .attr("class", "x axis")
//      .attr("transform", "translate(0," + h + ")")
//      .call(xAxis);
 
 var selX = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);
  selX.selectAll("text").attr("transform", "translate(15, 0)");
 
  var selY = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  selY.selectAll("text").attr("transform", "translate(0, -15)");
 
 
  //svg.append("g")
  //    .attr("class", "y axis")
   //   .call(yAxis);
 
 
svg.selectAll(".square")
      .data(bins(points))
      .enter().append("rect")
      .attr("class", "square")
      .attr("x", function(d) { return x(d.x)+2; })
      .attr("y", function(d) { return y(d.y)-yinv(side); })    
      .attr("width", x(side)-2)
      .attr("height", yinv(side)-2)
      .style("fill", function(d) { return color(d.length); })
	  // the function is called every time the event occurs
      .on("mouseover", function (d) {
		d3.select(this).classed("highlight", true)
      })
      .on("mouseout", function (d) {
            d3.select(this).classed("highlight", false)
       });
	   

	   svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margin.left*0.8)
        .attr("x",0-(h/2)+10 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Hail Size (inch)");
        
svg.append("text")      // text label for the x axis
        .attr("x", 0 + (w/2)+15)
        .attr("y", 0 + h + margin.bottom*0.35 )
        .style("text-anchor", "middle")
        .text("Scale (F)");
	   
	   
	  
});

