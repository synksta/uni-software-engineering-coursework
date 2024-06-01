const heapq = require('heapq')

const encodeGraphData = (graph) => {
	const nodes = Object.keys(graph).map((id) => ({ id }))
	const links = []

	for (const source in graph) {
		for (const target in graph[source]) {
			links.push({ source, target, distance: graph[source][target] })
		}
	}

	return { nodes, links }
}

/**
 * This function implements Dijkstra's algorithm to find the shortest paths
 * from a given start node to all other nodes in a graph.
 *
 * @param {Object} graph - The graph to search in, represented as an object
 *                         where keys are node IDs and values are objects
 *                         representing the outgoing edges of each node,
 *                         where keys are target node IDs and values are edge
 *                         weights.
 * @param {string} start - The ID of the node to start the search from.
 * @returns {Object} An object with two properties: `distances`, which is an
 *                   object where keys are node IDs and values are the
 *                   shortest distances from the start node to each other
 *                   node, and `path`, which is an object where keys are node
 *                   IDs and values are arrays representing the shortest path
 *                   from the start node to each other node.
 */
export const dijkstra = (graph, start) => {
	// Initialize an object to store the shortest distances to each node.
	const distances = {}

	// Initialize an object to store the shortest paths to each node.
	const path = {}

	// Create a priority queue to store the nodes to be processed, along with
	// their distances from the start node.
	const queue = [[0, start]]

	// Initialize the distances to all nodes to infinity, except for the start
	// node, which is 0.
	for (const node in graph) {
		distances[node] = Infinity
		path[node] = []
	}
	distances[start] = 0

	// Repeat until the priority queue is empty.
	while (queue.length > 0) {
		// Get the node with the minimum distance from the queue.
		const [currentDistance, currentNode] = heapq.pop(queue)

		// If the current distance to the node is greater than the stored distance,
		// ignore it and move on to the next node.
		if (currentDistance > distances[currentNode]) {
			continue
		}

		// Explore all the neighboring nodes of the current node.
		for (const [neighbor, weight] of Object.entries(graph[currentNode])) {
			// Calculate the distance to the neighboring node by adding the weight
			// of the edge between the current node and the neighbor.
			const distance = currentDistance + weight

			// If a shorter path to the neighbor is found, update the distance and
			// the path.
			if (distance < distances[neighbor]) {
				distances[neighbor] = distance
				path[neighbor] = [...path[currentNode], currentNode]

				// Add the neighbor to the priority queue with its updated distance.
				heapq.push(queue, [distance, neighbor])
			}
		}
	}

	// Return the shortest distances and paths from the start node to all other
	// nodes.
	return { distances, path }
}
