const d3 = require("d3-scale");

// input: a number between 0-255, output: a number between 0-1
const toAlpha = d3.scaleLinear().domain([0, 255]).range([0, 1]);
toAlpha.clamp(true);

// input: a number between 0-1, output: a number between 0-255
const toOpacity = d3.scaleLinear().domain([0, 1]).range([0, 255]);
toOpacity.clamp(true);

export { toAlpha, toOpacity };
