
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    w = 380 - margin.left - margin.right,
    h = 380 - margin.top - margin.bottom;
 
var color = d3.scale.linear()
    .domain([0, 3])
    .range(["yellow", "darkred"])
    .interpolate(d3.interpolateLab);
 
var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, w]);
 
var y = d3.scale.linear()
    .domain([0, 100])
    .range([h, 0]);
 
var yinv = d3.scale.linear()
    .domain([0, 100])
    .range([0, h]);
 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
 
var side = 10;
 
var bins = d3.bin()
    .size([w, h])
    .side(side);
 
var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");
 
var points = [];
 
d3.csv("scatterplot01.csv", function(error, data) {
 
  data.forEach(function(d) {
    d.time = +d.time;
    d.intensity = +d.intensity;
    points.push([d.time, d.intensity]);
  });
 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);
 
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
 
 
svg.selectAll(".square")
      .data(bins(points))
      .enter().append("rect")
      .attr("class", "square")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y)-yinv(side); })    
      .attr("width", x(side))
      .attr("height", yinv(side))
      .style("fill", function(d) { return color(d.length); });
});
