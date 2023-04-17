
// create the SVG
let svg = d3.select("#myChart").append("svg");
svg.attr("preserveAspectRatio", "xMinYMin meet");
svg.attr("viewBox", "0 0 800 300");
svg.classed("svg-content", true);

// load data from CSV file
// then execute {...}
d3.csv("apples_data.csv").then(apples => {
  // create the circles from the apples array
  svg.selectAll()
    .data(apples)
    .enter()
    .append("circle")
    .attr("fill", function(apple) { return apple.col })
    // .attr("fill", function(d) { return d.col })
    .attr("cx", function(d, x) { return x * 150 + 50; })
    .attr("cy", 100)
    .attr("r", function(d) { return d.grams * .2; })


  // add the text labels
  svg.selectAll()
    .data(apples)
    .enter()
    .append("text")
    .attr("x", function(d, x) { return x * 150 + 50; })
    .attr("y", 200)
    .text(function(d) { return d.name; })
});
