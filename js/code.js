/********************
 * TAB LOGIC
 ********************/
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});









/* =========================================================
   4B) SORTIERUNGEN
   ========================================================= */
const inputOrder = [
  "Oil",
  "Natural Gas",
  "Wood",
  "Waste",
  "Solar Thermal",
  "Ambient",
  "Uranium",
  "Hydro River",
  "Hydro Dams",
  "Photovoltaic",
  "Wind",
  "Import",
  "Gasoline",
  "Diesel",
  "Jet fuel"
];
const inputRank = new Map(inputOrder.map((d,i)=>[d,i]));

const conversionOrder = [
  "Boilers",
  "CHP",
  "Electricity",
  "DHN",
  "Heat Pumps",
  "Heat"
];
const conversionRank = new Map(conversionOrder.map((d,i)=>[d,i]));


const outputOrder = [
  "Space Heat",
  "Hot Water",
  "Ind Heat",
  "Loss",
  "Export",
  "Households",
  "Services",
  "Industry",
  "Road",
  "Rail",
  "Aviation"
];
const outputRank = new Map(outputOrder.map((d,i)=>[d,i]));


/* =========================================================
   5) LINKS FÜR EIN JAHR
   ========================================================= */
function linksForYear(year) {
  const i = years.indexOf(year);
  return linkDefs.map(d => ({
    source: d.source,
    target: d.target,
    value: d.values[i]
  }));
}

/* =========================================================
   6) DROPDOWN AUTO
   ========================================================= */
const yearSelect = d3.select("#yearSelect");

yearSelect.selectAll("option")
  .data(years)
  .join("option")
  .attr("value", d => d)
  .text(d => d);

yearSelect.property("value", years[years.length - 1]);

/* =========================================================
   7) SANKEY
   ========================================================= */
const svg = d3.select("#sankeyChart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const tooltip = d3.select("#tooltip");



const sankey = d3.sankey()
  .nodeId(d => d.name)
  .nodeWidth(20)
  .nodePadding(14)
  .nodeSort((a, b) => {

    // Inputs
    if (inputRank.has(a.name) && inputRank.has(b.name)) {
      return inputRank.get(a.name) - inputRank.get(b.name);
    }

    // Conversions
    if (conversionRank.has(a.name) && conversionRank.has(b.name)) {
      return conversionRank.get(a.name) - conversionRank.get(b.name);
    }
	
	// Outputs
    if (outputRank.has(a.name) && outputRank.has(b.name)) {
      return outputRank.get(a.name) - outputRank.get(b.name);
    }

    return 0; // sonst Reihenfolge beibehalten
  })

  .extent([[10, 10], [width - 10, height - 10]]);
  
  
  
let showValues = false;

d3.select("#showValuesCheckbox")
  .on("change", function () {
    showValues = this.checked;
    draw(+yearSelect.property("value")); // Sankey neu zeichnen
  });

function draw(year) {

  svg.selectAll("*").remove();

  const graph = sankey({
    nodes: nodes.map(d => ({ ...d })),
    links: linksForYear(year)
  });
  

  
  
 // Verschiebung von Knoten:
  graph.nodes.forEach(n => {
   // Loss leicht nach links
    if (n.name === "Loss") {
      n.x0 -= 150;
      n.x1 -= 150;
    }
	if (n.name === "Heat Pumps") {
	  let dy = 20;
      n.y0 -= dy;
      n.y1 -= dy;
	  
	  n.sourceLinks.forEach(l => {
		l.y0 -= dy;
	  });

	  n.targetLinks.forEach(l => {
		l.y1 -= dy;
      });
    }
	
	if (n.name === "District Heat") {
	  let dy = 20;
      n.y0 += dy;
      n.y1 += dy;
	  
	  n.sourceLinks.forEach(l => {
		l.y0 += dy;
	  });

	  n.targetLinks.forEach(l => {
		l.y1 += dy;
      });
    }
  });

  svg.append("g")
    .selectAll("path")
    .data(graph.links)
    .join("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => d.source.linkColor ?? "rgba(150,150,150,0.4)") // Farbgebung
	.attr("fill", "none")
    .attr("stroke-width", d => Math.max(1, d.width))
		.on("mouseover", function (event, d) {

		  // Tooltip NUR wenn showValues AUS
		  if (!showValues) {
			tooltip
			  .style("opacity", 0.9)
			  .html(d.value.toLocaleString())
			  .style("left", (event.pageX + 10) + "px")
			  .style("top", (event.pageY + 10) + "px");
		  }
		})
		.on("mousemove", function (event) {
		  if (!showValues) {
			tooltip
			  .style("left", (event.pageX + 10) + "px")
			  .style("top", (event.pageY + 10) + "px");
		  }
		})
		.on("mouseout", function () {
		  tooltip.style("opacity", 0);
		});


	const linkLabels = svg.append("g")
	  .attr("class", "link-labels")
	  .selectAll("text")
	  .data(graph.links)
	  .join("text")
	  .attr("class", "link-value")
	  .attr("x", d => (d.source.x1 + d.target.x0) / 2)
	  .attr("y", d => (d.y0 + d.y1) / 2)
	  .attr("dy", "0.35em")
	  .attr("text-anchor", "middle")
	  .text(d => d.value.toLocaleString())
	  .style("font-size", "11px")
	  .style("fill", "#333")
	  .style("pointer-events", "none")
	  .style("opacity", showValues ? 1 : 0);

	

  const node = svg.append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .join("g")
    .attr("class", "node");

  node.append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => d.color ?? "#ccc"); // Farbe

  node.append("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name);
	
	// copyright information
	svg.append("text")
	  .attr("class", "copyright")
	  .attr("x", width - 10)
	  .attr("y", height - 2)
	  .attr("text-anchor", "end")
	  .attr("dominant-baseline", "ideographic")
	  .text("(c) by Michel Haller");
}



/* =========================================================
   8) INIT + EVENT
   ========================================================= */
draw(years[years.length - 1]);

yearSelect.on("change", e => {
  draw(+e.target.value);
});

/* =========================================================
   9) Play Years Automatically
   ========================================================= */
let playInterval = null;
let currentYearIndex = 0;

const playButton = d3.select("#playButton");

playButton.on("click", () => {
  if (playInterval) {
    // Stoppen, wenn schon läuft
    clearInterval(playInterval);
    playInterval = null;
    playButton.text("Play");
  } else {
    // Starten
    playButton.text("Pause");
    currentYearIndex = 0; // von vorne
    playInterval = setInterval(() => {
      const year = years[currentYearIndex];
      draw(year);

      // Dropdown auch synchron aktualisieren
      yearSelect.property("value", year);

      currentYearIndex++;
      if (currentYearIndex >= years.length) {
        clearInterval(playInterval);
        playInterval = null;
        playButton.text("Play");
      }
    }, 500); // Halbsekunde
  }
});

/*******************************************************
 * 10) D3 Line Chart and Update of Line Chart
 *******************************************************/
 
// Dimensions and margins
const margin = { top: 30, right: 80, bottom: 50, left: 60 };
const lchartwidth = 1200 - margin.left - margin.right;
const lchartheight = 720 - margin.top - margin.bottom;

const svgLine = d3.select("#lineChart")
  .attr("width", lchartwidth  + margin.left + margin.right)
  .attr("height", lchartheight  + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const xScale = d3.scaleLinear()
  .domain([d3.min(years), d3.max(years)])
  .range([0, lchartwidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(linkDefs, d => d3.max(d.values)) * 1.1])
  .range([lchartheight, 0]);

// Axes
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(yScale);

svgLine.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${lchartheight})`)
  .call(xAxis)
  .append("text")
  .attr("x", lchartwidth / 2)
  .attr("y", 45)
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .text("Year");

svgLine.append("g")
  .attr("class", "y-axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -lchartheight / 2)
  .attr("y", -40)
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .text("TWh/year");
  
  // copyright information
  svgLine.append("text")
  .attr("class", "copyright")
  .attr("x", lchartwidth)
  .attr("y", lchartheight + 40)
  .attr("text-anchor", "end")
  .text("(c) by Michel Haller");

// Color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Line generator
const line = d3.line()
  .x((d, i) => xScale(years[i]))
  .y(d => yScale(d))
  .curve(d3.curveLinear);
  

	  d3.selectAll(".x-axis text, .y-axis text")
  .style("font-size", "18px");

	d3.selectAll(".x-axis-label, .y-axis-label")
	  .style("font-size", "18px");

// call upateChart when stackedline checkbox changes value
let stackedMode = false;



// Update function
function updateChart() {

  // ----------------------------------
  // 1) Aktive Linien bestimmen
  // ----------------------------------
  const checked = Array.from(
    document.querySelectorAll('#lines input:checked')
  ).map(cb => cb.value);

  const filteredData = linkDefs.filter(d => checked.includes(d.key));

  // ----------------------------------
  // 2) Daten vorbereiten
  // ----------------------------------
  const plotData = stackedMode
    ? getStackedValues(filteredData)
    : filteredData;

  // ----------------------------------
  // 3) Y-Skala setzen
  // ----------------------------------
  const maxY = stackedMode
    ? d3.max(plotData, d => d3.max(d.stacked, s => s.y1))
    : d3.max(plotData, d => d3.max(d.values));

  yScale.domain([0, maxY * 1.1]);

  svgLine.select(".y-axis")
    .transition()
    .duration(500)
    .call(d3.axisLeft(yScale));

  // ----------------------------------
  // 4) Area-Generator (für stacked mode)
  // ----------------------------------
  const areaGen = d3.area()
    .x((d, i) => xScale(years[i]))
    .y0(d => yScale(d.y0))
    .y1(d => yScale(d.y1))
    .curve(d3.curveLinear);

  // ----------------------------------
  // 5) AREAS (nur im stackedMode)
  // ----------------------------------
	  const areas = svgLine.selectAll(".area")
	  .data(stackedMode ? plotData : [], d => d.key);

	areas.enter()
	  .append("path")
	  .attr("class", "area")
	  .merge(areas)
	  .transition()
	  .duration(500)
	  .attr("fill", d => color(d.key)) // Farbe = eigene Linie
	  .attr("opacity", 0.4)
	  .attr("d", d => areaGen(d.stacked));

	areas.exit().remove();

  // ----------------------------------
  // 6) Linien zeichnen
  // ----------------------------------
  const lineGen = d3.line()
    .x((d, i) => xScale(years[i]))
    .y(d => yScale(d))
    .curve(d3.curveLinear);

  const lines = svgLine.selectAll(".line")
    .data(plotData, d => d.key);

  lines.enter()
    .append("path")
    .attr("class", "line")
    .merge(lines)
    .transition()
    .duration(500)
    .attr("fill", "none")
    .attr("stroke", d => color(d.key))
    .attr("stroke-width", 2)
    .attr("d", d =>
      stackedMode
        ? lineGen(d.stacked.map(v => v.y1))
        : lineGen(d.values)
    );

  lines.exit().remove();

  // ----------------------------------
  // 7) Labels (in Flächen bei stacked)
  // ----------------------------------
  const labels = svgLine.selectAll(".line-label")
    .data(stackedMode ? plotData : filteredData, d => d.key);

  labels.enter()
    .append("text")
    .attr("class", "line-label")
    .merge(labels)
    .transition()
    .duration(500)
    .attr("x", lchartwidth-5)           // ganz rechts
	  .attr("text-anchor", "end")       // rechtsbündig
	  .attr("y", d => {
		if (!stackedMode) return yScale(d.values[d.values.length - 1]);
		const last = d.stacked[d.stacked.length - 1];
		return yScale((last.y0 + last.y1) / 2); // Mitte der Fläche
	  })
	  .text(d => d.label)
	  .attr("fill", "#555")             // dunkelgrau
	  .attr("font-weight", "bold")
	  .attr("font-size", "14px")
	  .attr("alignment-baseline", "middle");

  labels.exit().remove();

  // ----------------------------------
  // 8) Legend & Fonts
  // ----------------------------------
  updateLegend(filteredData);

  d3.selectAll(".x-axis text, .y-axis text")
    .style("font-size", "18px");
}


// berechne stacked line plot werte
function getStackedValues(data) {

  const stacked = data.map(d => ({
    ...d,
    stacked: d.values.map(v => ({ y0: 0, y1: v }))
  }));

  for (let i = 1; i < stacked.length; i++) {
    for (let j = 0; j < stacked[i].stacked.length; j++) {
      stacked[i].stacked[j].y0 =
        stacked[i - 1].stacked[j].y1;

      stacked[i].stacked[j].y1 =
        stacked[i].stacked[j].y0 + data[i].values[j];
    }
  }

  return stacked;
}


// Define the legend container
const legend = svgLine.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${lchartwidth - 120}, 0)`);

// Define the legend update function
function updateLegend(filteredData) {
  const legendItems = legend.selectAll(".legend-item")
    .data(filteredData, d => d.key);

  const itemsEnter = legendItems.enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 25})`);

  itemsEnter.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", d => color(d.key));

  itemsEnter.append("text")
    .attr("x", 24)
    .attr("y", 14)
    .text(d => d.label)
    .style("font-size", "14px");

  legendItems.select("rect")
    .attr("fill", d => color(d.key));

  legendItems.select("text")
    .text(d => d.label);

  legendItems.exit().remove();
}




d3.select("#stackedCheckbox")
  .on("change", function () {
    stackedMode = this.checked;
    updateChart();
  });

// Attach listeners
document.querySelectorAll('#lines input').forEach(cb => cb.addEventListener('change', updateChart));


// Attach listeners
document.querySelectorAll('#lines input').forEach(cb => {
  cb.addEventListener('change', updateChart);
});


updateChart();


/* =========================================================
   11) Save Graph as svg
   ========================================================= */
   
   
function saveGraphSVG(chartName){
  // Select the SVG element
  const svgEl = document.getElementById(chartName);
  
  // Inline styles for text
  d3.select(svgEl).selectAll("text")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black");
  
  // Serialize SVG
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  // Add namespace if missing (important for standalone SVG)
  if(!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  // Add XML declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  // Create a Blob and download
  const blob = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "chart.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Correctly attach the listener (call the function!)
document.getElementById("saveSVG").addEventListener("click", function() {
  saveGraphSVG("lineChart"); 
});
document.getElementById("saveSankeySVG").addEventListener("click", function() {
  saveGraphSVG("sankeyChart"); 
});

// Accordeon controls for selecting graph-lines
  document.querySelectorAll('.group-title').forEach(title => {
    title.addEventListener('click', () => {
      title.parentElement.classList.toggle('active');
    });
  });
