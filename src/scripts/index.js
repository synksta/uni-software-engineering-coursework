// const d3 = require('d3')

// fetch('../json/graph.json')
// 	.then((res) => res.json())
// 	.then((data) => {
// 		drawGraph(data)
// 	})
// 	.catch((err) => console.error(err))
// const drawGraph = (data) => {
// 	// Specify the dimensions of the chart.
// 	const width = 928
// 	const height = 680

// 	// Specify the color scale.
// 	const color = d3.scaleOrdinal(d3.schemeCategory10)

// 	// The force simulation mutates links and nodes, so create a copy
// 	// so that re-evaluating this cell produces the same result.
// 	const links = data.links.map((d) => ({ ...d }))
// 	const nodes = data.nodes.map((d) => ({ ...d }))
// 	console.log(links)
// 	// Create a simulation with several forces.
// 	const simulation = d3
// 		.forceSimulation(nodes)
// 		.force(
// 			'link',
// 			d3
// 				.forceLink(links)
// 				.id((d) => d.id)
// 				.distance((d) => d.distance * 1.5)
// 				.strength(1)
// 		)
// 		.force('x', d3.forceX())
// 		.force('y', d3.forceY())
// 		.force('charge', d3.forceManyBody().strength(-500))

// 	// Create the SVG container.
// 	const svg = d3
// 		.create('svg')
// 		.attr('width', width)
// 		.attr('height', height)
// 		.attr('viewBox', [-width / 2, -height / 2, width, height])
// 		.attr('style', 'max-width: 100%  height: auto ')

// 	// Add a line for each link, and a circle for each node.
// 	const link = svg
// 		.append('g')
// 		.attr('stroke-opacity', 0.6)
// 		.selectAll('line')
// 		.data(links)
// 		.join('line')
// 		.attr('stroke', (d) => d.color)
// 		.attr('stroke-width', (d) => Math.sqrt(d.value))

// 	const node = svg
// 		.append('g')
// 		.attr('stroke', '#fff')
// 		.attr('stroke-width', 1.5)
// 		.selectAll('circle')
// 		.data(nodes)
// 		.join('circle')
// 		.attr('r', 5)
// 		.attr('fill', (d) => d.color)

// 	const node_text = svg
// 		.append('g')
// 		.selectAll('text')
// 		.data(nodes)
// 		.join('text')
// 		.text((d) => d.id)
// 		.style('user-select', 'none')

// 	const link_text = svg
// 		.append('g')
// 		.selectAll('line')
// 		.data(links)
// 		.join('text')
// 		.text((d) => d.distance)
// 		.style('user-select', 'none')

// 	// Set the position attributes of links and nodes each time the simulation ticks.
// 	simulation.on('tick', () => {
// 		node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

// 		node_text.attr('x', (d) => d.x).attr('y', (d) => d.y)

// 		link
// 			.attr('x1', (d) => d.source.x)
// 			.attr('y1', (d) => d.source.y)
// 			.attr('x2', (d) => d.target.x)
// 			.attr('y2', (d) => d.target.y)

// 		link_text
// 			.attr('x', (d) => (d.source.x + d.target.x) / 2)
// 			.attr('y', (d) => (d.source.y + d.target.y) / 2)

// 	})

// 	let graphContainer = document.getElementById('graphContainer')
// 	graphContainer.append(svg.node())
// }

//////////////////////////////////////

// just a reimplementation of https://observablehq.com/@d3/temporal-force-directed-graph

// import "./styles.css";

const data = {
	nodes: [{ id: 'A', color: '#abc' }, { id: 'B' }, { id: 'C' }, { id: 'D' }],
	links: [
		{
			source: 'A',
			target: 'B',
			distance: 5,
		},
		{
			source: 'A',
			target: 'C',
			distance: 1,
		},
		{
			source: 'B',
			target: 'A',
			distance: 5,
		},
		{
			source: 'A',
			target: 'D',
			distance: 1,
		},
		{
			source: 'C',
			target: 'A',
			distance: 1,
		},
		{
			source: 'C',
			target: 'D',
			distance: 2,
		},
		{
			source: 'D',
			target: 'B',
			distance: 1,
		},
		{
			source: 'D',
			target: 'C',
			distance: 2,
		},
	],
}
