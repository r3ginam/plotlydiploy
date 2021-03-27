function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    console.log(sampleNames)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleFiltered = sampleArray.filter(sampleObject => sampleObject.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    sample1 = sampleFiltered[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = sample1.otu_ids;
    var otuLabels = sample1.otu_labels;
    var sampleValues = sample1.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).reverse();
    //var ySorted = yticks.sort((a,b) => a.yticks - a.yticks);

    // 8. Create the trace for the bar chart. 
    var trace = [{
      x : sampleValues.slice(0,10).reverse(),
      y : yticks.map(otuIds => `otu${otuIds}`),
      text : otuLabels.slice(0,10).reverse(),
      type : "bar",
      orientation : "h"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title : "The Top Ten Bacteria Cultures Found",
      xaxis : {title: "OTU IDs"},
      yaxis : {title: "Amount Found"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace);


   // 1. Create the trace for the bubble chart.
   var traceBubble = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: "Earth"
    }
   }; 
   var bubbleData = [traceBubble];

    // 2. Create the layout for the bubble chart.
    //var bubbleLayout = {
      
    //};

    // 3. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bubble", bubbleData)
  
  });
};
//      // 1. Create a variable that filters the metadata array for the object with the desired sample number.

//     // Create a variable that holds the first sample in the array.
  

//     // 2. Create a variable that holds the first sample in the metadata array.
    

//     // Create variables that hold the otu_ids, otu_labels, and sample_values.


//     // 3. Create a variable that holds the washing frequency.
   

//     // Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order 
//     // so the otu_ids with the most bacteria are last. 
//    // var yticks = 

//     // Create the trace for the bar chart. 
//     // var barData = [
      
//     //];
//     // Create the layout for the bar chart. 
//     //var barLayout = {
      
//     //};

//     // Use Plotly to plot the data with the layout. 

//     // Create the trace for the bubble chart.
//     //var bubbleData = [
   
//     //];

//     // Create the layout for the bubble chart.
//     //var bubbleLayout = {
      
//     //};

//     // D2: 3. Use Plotly to plot the data with the layout.
   
    
//     // 4. Create the trace for the gauge chart.
//     //var gaugeData = [
     
//     //];
    
//     // 5. Create the layout for the gauge chart.
//     //var gaugeLayout = { 
     
//    // };

//     // 6. Use Plotly to plot the gauge data and layout.
// //   });
// // };

