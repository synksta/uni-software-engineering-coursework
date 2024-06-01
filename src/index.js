// const graph = {
// 	A: { B: 10, C: 9, D: 7, E: 4, F: 4, G: 3 },
// 	B: { A: 10, C: 3, D: 5, E: 3, F: 5, G: 9 },
// 	C: { A: 9, B: 3, D: 4, E: 2, F: 3, G: 7 },
// 	D: { A: 7, B: 5, C: 4, E: 4, F: 2, G: 5 },
// 	E: { A: 4, B: 3, C: 2, D: 4, F: 3, G: 10 },
// 	F: { A: 4, B: 5, C: 3, D: 2, E: 3, G: 5 },
// 	G: { A: 3, B: 9, C: 7, D: 5, E: 10, F: 5 },
// }
import './css/output.css'
const colors = require('tailwindcss/colors')
const d3 = require('d3')
import { dijkstra } from './scripts/dijkstra.js'

const input = document.getElementById('graphSizeInput')
input.addEventListener('mousedown', (event) => {
	event.preventDefault()
})

function getAlphabetLetter(number) {
	const baseCode = 'A'.charCodeAt(0)
	const letterCode = baseCode + number
	const letter = String.fromCharCode(letterCode)
	return letter
}

const graphSizeInput = document.getElementById('graphSizeInput')
const incrementButton = document.getElementById('incrementButton')
const decrementButton = document.getElementById('decrementButton')

const dijkstraButton = document.getElementById('dijkstraButton')

incrementButton.addEventListener('click', () => {
	// let val = parseInt(graphSizeInput.value)
	// graphSizeInput.value = val < 10 ? val + 1 : val
	if (parseInt(graphSizeInput.value) === 10) return
	graphSizeInput.value = data.nodes.push({
		id: `${uniqueLetter()}`,
	})
	chart.update()
})

const uniqueLetter = () => {
	let letter
	let inc = 0
	do {
		letter = getAlphabetLetter(inc++)
	} while (data.nodes.some((node) => node.id === letter))
	return letter
}

decrementButton.addEventListener('click', () => {
	if (parseInt(graphSizeInput.value) === 0) return

	const poppedNode = data.nodes.pop()

	data.links = data.links.filter(
		(link) => link.source !== poppedNode.id && link.target !== poppedNode.id
	)

	graphSizeInput.value = data.nodes.length

	console.log(data)

	chart.update()
})

dijkstraButton.addEventListener('click', async () => {
	// if (parseInt(graphSizeInput.value) === 0) return
	selectedNodes = []
	node.classed('selected', false)
	link.classed('path', false)

	const nodesBefore = data.nodes.length

	data.nodes = data.nodes.filter((node) => {
		for (const link of data.links) {
			if (node.id === link.source || node.id === link.target) {
				return true
			}
		}

		console.log(node)

		if (start !== undefined) {
			if (start.id === node.id) start = undefined
		}
		if (finish !== undefined) {
			if (finish.id === node.id) finish = undefined
		}
		if (selectedNodes.includes(node))
			selectedNodes = selectedNodes.filter((value) => value !== node)
		return false
	})
	if (data.nodes.length !== nodesBefore) chart.update()

	graphSizeInput.value = data.nodes.length

	await new Promise((resolve) => setTimeout(resolve, 200))

	if (data.nodes.length === 0) {
		alert('Graph is empty')
		return
	}
	if ([start, finish].includes(undefined)) {
		alert('Set start and finish nodes')
		return
	}

	const result = dijkstra(parseGraphData(data), start.id)

	if (result.path[finish.id].length === 0) {
		alert('No way bro')
		return
	}

	result.path[finish.id].push(finish.id)

	let prevNode = result.path[finish.id][0]

	for (let i = 1; i < result.path[finish.id].length; i++) {
		const node = result.path[finish.id][i]

		const pathLink = link.filter((l) => {
			console.log(l)
			return (
				(l.source.id === prevNode && l.target.id === node) ||
				(l.source.id === node && l.target.id === prevNode)
			)
		})
		console.log(pathLink)
		prevNode = node

		pathLink.classed('path', true)
		simulation.alpha(1).restart().tick()
		ticked()

		await new Promise((resolve) => setTimeout(resolve, 200))
	}
})

const data = {
	nodes: [],
	links: [],
}
graphSizeInput.value = data.nodes.length

const parseGraphData = (graphData) => {
	const graph = {}

	for (const node of graphData.nodes) {
		graph[node.id] = {}
	}

	for (const link of graphData.links) {
		graph[link.source][link.target] = link.distance
		graph[link.target][link.source] = link.distance
	}

	return graph
}

const width = 500
const height = 500
let scale = 1.8

const simulation = d3
	.forceSimulation()
	.force(
		'link',
		d3
			.forceLink()
			.id((d) => d.id)
			.distance((d) => d.distance * 10 * scale)
			.strength(0.1)
	)
	.force('x', d3.forceX())
	.force('y', d3.forceY())
	.force('charge', d3.forceManyBody().strength(-650))
	.on('tick', () => ticked())

const graphContainer = d3.select('#graph')
// Create the SVG container.
const svg =
	// .select('svg')
	graphContainer
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox', [-width / 2, -height / 2, width, height])
		.attr('style', 'max-width: 100%  height: auto')
		.attr('class', 'bg-gray-700')
		.on('click', () => {
			selectedNodes = []
			node.classed('selected', false)
			link.classed('path', false)
			simulation.alpha(1).restart().tick()
			ticked()
		})
		.on('contextmenu', (event) => {
			// Handle right mouse button click here
			console.log('Right mouse button clicked')
			node.classed('start', false)
			link.classed('path', false)
			start = undefined
			node.classed('finish', false)
			finish = undefined
			node.classed('selected', false)
			selectedNodes = []
			// Prevent the default browser context menu from appearing
			event.preventDefault()
		})
// Add a line for each link, and a circle for each node.
let link = svg
	.append('g')
	.attr('stroke-opacity', 1)
	.attr('stroke-width', 4 * scale)
	.selectAll('line')

let node = svg
	.append('g')
	.attr('fill', colors.gray[900])
	.attr('stroke', colors.gray[900])
	.attr('stroke-opacity', 1)
	.attr('stroke-width', 3 * scale)
	.selectAll('circle')

let node_text = svg
	.append('g')
	.style('user-select', 'none')
	.attr('fill', colors.stone[400])
	.attr('stroke', colors.gray[900])

	// .attr('stroke', colors.stone[400])
	.attr('stroke-width', 0.6 * scale)
	.attr('font-size', `${25 * scale}px`)
	.attr('style', 'font-weight: bolder')
	.selectAll('text')

let link_text = svg
	.append('g')
	.style('user-select', 'none')
	.attr('fill', colors.stone[400])
	.attr('stroke', colors.gray[900])
	.attr('stroke-width', 0.6 * scale)
	.attr('font-size', `${16 * scale}px`)
	.attr('style', 'font-weight: bolder')
	.selectAll('line')

let selectedNodes = []
let start
let finish
const chart = Object.assign(svg.node(), {
	// update({ nodes, links}) {

	update() {
		const links = data.links.map((d) => ({ ...d }))
		const nodes = data.nodes.map((d) => ({ ...d }))

		// console.log(node)

		node = node
			.data(nodes, (d) => d.id)
			.join('circle')
			.attr('r', 8 * scale)
			.attr('fill', (d) => d.color)
			.on('click', function (event, d) {
				event.stopPropagation()
				link.classed('path', false)

				// console.log('Clicked on node:', d, i)

				d3.select(this).classed('selected', () => {
					const isSelected = !d3.select(this).classed('selected')
					if (isSelected) {
						selectedNodes.push(d)
					} else {
						selectedNodes = selectedNodes.filter((value) => value !== d)
					}
					return isSelected
				})

				if (selectedNodes.length > 1) {
					console.log(data.links)
					if (
						!data.links.some((link) =>
							['source', 'target'].every((key) =>
								[selectedNodes[0].id, selectedNodes[1].id].includes(link[key])
							)
						)
					) {
						data.links.push({
							source: selectedNodes[0].id,
							target: selectedNodes[1].id,
							distance: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
						})
						chart.update()
					}
					const shiftedNode = selectedNodes.shift()
					d3.select(`[id=${shiftedNode.id}]`).classed('selected', false)
				}

				console.log('selectedNodes')
				console.log(selectedNodes)
				// console.log('Clicked on node:', d, i)
				simulation.alpha(1).restart().tick()
				ticked()
				// d3.event.stopPropagation()
				// Perform any actions you need on click
			})
			.on('mouseover', function (event, d) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('r', 1.5 * 8 * scale)
				simulation.alpha(1).restart().tick()
				ticked()
			})
			.on('mouseout', function (event, d) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('r', 8 * scale)

				simulation.alpha(1).restart().tick()
				ticked()
			})
			.on('contextmenu', function (event, d) {
				link.classed('path', false)

				event.stopPropagation()
				event.preventDefault()
				node.classed('selected', false)
				selectedNodes = []

				if (![start, finish].includes(undefined)) {
					if (![start, finish].includes(d)) {
						node.classed('start', false)
						start = undefined
						node.classed('finish', false)
						finish = undefined
					}
				}

				if (start === undefined) {
					start = d
					d3.select(this).classed(
						'start',
						() => !d3.select(this).classed('start')
					)
				} else if (start !== d) {
					finish = d
					d3.select(this).classed(
						'finish',
						() => !d3.select(this).classed('finish')
					)
				} else if (start === d) {
					start = undefined
					node.classed('start', false)
				}

				simulation.alpha(1).restart().tick()
				ticked()
			})
			.on('dblclick', function (d, i) {
				// Handle the double click event here

				if (selectedNodes.includes(i)) {
					selectedNodes = selectedNodes.filter((node) => node !== i)
					d3.select(this).classed(
						'selected',
						() => !d3.select(this).classed('selected')
					)
				}
				if (start === i) {
					node.classed('start', false)
					start = undefined
					node.classed('finish', false)
					finish = undefined
				}
				if (finish === i) {
					node.classed('finish', false)
					finish = undefined
				}

				data.nodes = data.nodes.filter((node) => node.id !== i.id)
				data.links = data.links.filter(
					(link) => link.source !== i.id && link.target !== i.id
				)

				graphSizeInput.value = data.nodes.length

				link.classed('path', false)

				console.log(data)

				chart.update()
				console.log('Double click event triggered')
			})

		const drag = d3
			.drag()
			.on('start', function (event, d) {
				event.sourceEvent.stopPropagation()
				d3.select(this).attr('r', 1.5 * 8 * scale)
				if (!event.active) simulation.alphaTarget(0.3).restart()
				d.fx = d.x
				d.fy = d.y
			})
			.on('drag', function (event, d) {
				event.sourceEvent.stopPropagation()
				d3.select(this).attr('r', 1.5 * 8 * scale)

				d.fx = event.x
				d.fy = event.y
			})
			.on('end', function dragened(event, d) {
				event.sourceEvent.stopPropagation()
				// d3.select(this).attr('r', 8 * scale)

				if (!event.active) simulation.alphaTarget(0)
				d.fx = null
				d.fy = null
			})

		// Apply the drag behavior to the nodes
		node.call(drag)

		// Define the event handlers for drag behavior

		link = link
			.data(links, (d) => [d.source, d.target])
			.join('line')
			.on('mouseover', function (d, i) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('stroke-width', 1.5 * 4 * scale)
				simulation.alpha(1).restart().tick()
				ticked()
			})
			.on('mouseout', function (d, i) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('stroke-width', 4 * scale)
				simulation.alpha(1).restart().tick()
				ticked()
			})
			.on('click', function (d, i) {
				console.log(i)
				data.links = data.links.filter(
					(link) => link.source !== i.source.id || link.target !== i.target.id
				)
				chart.update()
			})

		link
			.transition()
			.duration(300)
			.attr('stroke', (d) =>
				d.color === undefined ? colors.gray[900] : d.color
			)

		node_text = node_text
			.data(nodes)
			.join('text')
			.text((d) => d.id)

		link_text = link_text
			.data(links)
			.join('text')
			.text((d) => d.distance)

		simulation.nodes(nodes)
		simulation.force('link').links(links)
		simulation.alpha(1).restart().tick()
		ticked()
	},
})

const ticked = () => {
	node
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('id', (d) => d.id)

	node_text
		.attr(
			'x',
			(d) =>
				d.x + Math.sign(d.x) * d3.select(`[id="${d.id}"]`).attr('r') * scale
		)
		.attr(
			'y',
			(d) =>
				d.y + Math.sign(d.x) * d3.select(`[id="${d.id}"]`).attr('r') * scale
		)

	link
		.attr('x1', (d) => d.source.x)
		.attr('y1', (d) => d.source.y)
		.attr('x2', (d) => d.target.x)
		.attr('y2', (d) => d.target.y)

	link_text
		.attr('x', (d) => (d.source.x + d.target.x) / 2)
		.attr('y', (d) => (d.source.y + d.target.y) / 2)
}

const test = async () => {
	chart.update()
	// await new Promise((resolve) => setTimeout(resolve, 500))
	// data.nodes.push({ id: 'test' })
	// data.nodes.find((node) => node.id === 'A').color = '#5a5'
	// await new Promise((resolve) => setTimeout(resolve, 500))yar
	// chart.update()
	// let test = d3.select(`#A`)

	// console.log(test.attr('r'))
	// console.log(colors.cyan[400])
}
test()
