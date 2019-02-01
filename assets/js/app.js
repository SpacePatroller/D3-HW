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

console.log("test")
// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
    .then(function (smokerData) {

        console.log(smokerData);


        // parse data and return to smokerData
        smokerData.forEach(data => {
            data.smokes = +data.smokes;
            data.age = +data.age;
        });


        // create scales
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(smokerData, d => d.age))
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(smokerData, d => d.smokes)])
            .range([height, 0]);


        var xAxis = d3.axisBottom(xTimeScale);
        var yAxis = d3.axisLeft(yLinearScale);



        // append axes
        chartGroup.append("g")
            .attr("stroke", "black")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .attr("stroke", "orange")
            .call(yAxis);
            

        // line generator
        var line = d3.line()
            .x(d => xTimeScale(d.age))
            .y(d => yLinearScale(d.smokes));



        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(smokerData)
            .enter()
            .append("circle")
            .attr("cx", d => xTimeScale(d.age))
            .attr("cy", d => yLinearScale(d.smokes))
            .attr("r", "10")
            .attr("fill", "gold")
            .attr("stroke-width", "1")
            .attr("stroke", "black");


        // Create group for  2 x- axis labels
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        // var hairLengthLabel = labelsGroup.append("text")
        //     .attr("x", 0)
        //     .attr("y", 20)
        //     .attr("value", "hair_length") // value to grab for event listener
        //     .classed("active", true)
        //     .text("Hair Metal Ban Hair Length (inches)");

        // var albumsLabel = labelsGroup.append("text")
        //     .attr("x", 0)
        //     .attr("y", 40)
        //     .attr("value", "num_albums") // value to grab for event listener
        //     .classed("inactive", true)
        //     .text("# of Albums Released");







        // Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<strong>${(d.state)}`);
            });

        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);

        // Step 3: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        })
            // Step 4: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function (d) {
                toolTip.hide(d);
            });
    });






















