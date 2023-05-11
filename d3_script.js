// https://d3-graph-gallery.com/graph/choropleth_basic.html

////////////////////
// SLIDER
////////////////////
let currentYear = "1990";
var slider = document.getElementById("myRange");
slider.oninput = function() {
  let years = [1990, 2000, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  currentYear = years[this.value - 1];

  let yearTag = d3.select("#currentYear").html(currentYear)
  drawMap();
}


////////////////////
// MAP
////////////////////


// tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


// map SVG
let w = 1200;
let h = 700;
let topo;

let svg = d3.select("#myChart").append("svg")
  .attr("width", w)
  .attr("height", h)


// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(150)
  .center([3, 50])
  .translate([w / 2, h / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleLinear()
  .domain([0, .5, 2, 8])
  .range(["white", "yellow", "orange", "red"]);


const GEO_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const POP_URL = "data/birth_rate_clean.csv"


// Load external data and boot
d3.queue()
  .defer(d3.json, GEO_URL)
  .defer(d3.csv, POP_URL, function(d) {
    data.set(d["Country Code"], d);
  })
  .await(drawMap);


function drawMap(error, topoData) {
  if (topoData) {
    topo = topoData;
  }

  // Draw the map
  svg.append("g")
    .selectAll()
    .data(topo.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function(d) {
      let country = data.get(d.id);
      if (!country) return colorScale(0);
      let rate = country[currentYear] || 0;
      return colorScale(rate);
    })
    .on('mouseenter', function(d) {
      let country = data.get(d.id);
      if (!country) return colorScale(0);
      d3.select(this).attr("stroke", "red");

      // tooltip show
      div.transition()
        .duration(200)
        .style("opacity", .9);

      let countryName = country["Country Name"];
      let birthRate = country[currentYear];
      let newHTML = 
        `
        <div><strong>${countryName}</strong></div>
        <div>${birthRate}</div>
        `
      
      div.html(newHTML)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
      
    })
    .on('mouseleave', function(d) {
      d3.select(this).attr("stroke", "none")

      // tooltip hide
      div.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .exit()
    .remove()
}

//slider
// d3.slider().on("slide", function(evt, value) {
//   d3.select('#slider3text').text(value);
// })