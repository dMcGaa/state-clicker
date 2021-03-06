// import * as d3 from 'd3';
import * as us from '../assets/us.json';
// import * as us from '../assets/us-topo.json';

export function setup(emit) {
console.log("hello d3")

var width = 960,
height = 500,
centered;

var projection = d3.geo.albersUsa()
.scale(1070)
.translate([width / 2, height / 2]);

var path = d3.geo.path()
.projection(projection);

var svg = d3.select(".d3").append("svg")
.attr("width", width)
.attr("height", height);

svg.append("rect")
.attr("class", "background")
.attr("width", width)
.attr("height", height)
.on("click", clicked);

var g = svg.append("g");

console.log(us)

function d3draw() {
g.append("g")
.attr("id", "states")
.selectAll("path")
.data(topojson.feature(us, us.objects.states).features)
.enter().append("path")
.attr("d", path)
.on("click", clicked);

g.append("path")
.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
.attr("id", "state-borders")
.attr("d", path);
}


function clicked(d) {
var x, y, k;

if (d && centered !== d) {
var centroid = path.centroid(d);
x = centroid[0];
y = centroid[1];
k = 4;
centered = d;
emit("d3 map selected", d)
} else {
x = width / 2;
y = height / 2;
k = 1;
centered = null;
emit("d3 map de-selected", d)
}

g.selectAll("path")
.classed("active", centered && function(d) { return d === centered; });

g.transition()
.duration(750)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
.style("stroke-width", 1.5 / k + "px");
}

window.setTimeout(d3draw, 1000)

}
