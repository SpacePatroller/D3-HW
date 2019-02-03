// @TODO: YOUR CODE HERE!

// declare height and width
var svgWidth = 960;
var svgHeight = 500;

// set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// set height and width based off margins for the chart
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg wrapper 
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
    .then(function (smokerData) {

        console.log(smokerData)
        // parse data and return to smokerData object
        smokerData.forEach(data => {
            data.smokes = +data.smokes;
            data.age = +data.age;
            // console.log(`Smokers "${data.smokes}"`);
            // console.log(`Age "${data.age}"`)
        });

        // create scales
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(smokerData, d => d.age))
            .range([0, width]);

            // why am I not able to use d3.extent here? dosent it just return the min and max value from the array?
            // when I tried using it it made all my circles line up in one straight line at the top. 
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(smokerData, d => d.smokes)])
            .range([height, 0]);

        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        // append axes
        chartGroup.append("g")
            .attr("stroke", "black")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .attr("stroke", "blue")
            .call(yAxis);

        var circlesGroup = chartGroup.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // append circles
        var circles = circlesGroup.selectAll("circle")
            .data(smokerData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.age))
            .attr("cy", d => yLinearScale(d.smokes))
            .attr("r", "13")
            .attr("fill", "#abbddb")
            .style("opacity", .4)
            .attr("stroke-width", "1")
            .attr("stroke", "black");


        // text is showing up in top right corner ????/
        // Add Text Labels
        var circlesText = circles.select("text")
            .data(smokerData)
            .enter()
            .append("text")
            .text(function (d) {
                return d.abbr;
            })
            .attr("x", d => xLinearScale(d.age - .12))
            .attr("y", d => yLinearScale(d.smokes - .13))
            .attr("font_family", "sans-serif")  // Font type
            .attr("font-size", "11px")  // Font size
            .attr("fill", "black");   // Font color


        // Create group for  2 x- axis labels
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);


        var smokersAge = labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "age") // value to grab for event listener
            .classed("active", true)
            .text("Smokers Age");

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "smokes") // value to grab for event listener
            .classed("active", true)
            .text("Smokes");




    });






















