import heapq


def dijkstra(graph, start):
    distances = {node: float("inf") for node in graph}
    distances[start] = 0
    path = {node: [] for node in graph}

    queue = [(0, start)]
    while queue:
        current_distance, current_node = heapq.heappop(queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                path[neighbor] = path[current_node] + [current_node]
                heapq.heappush(queue, (distance, neighbor))

    return distances, path


graph = {
    "A": {"B": 5, "C": 1},
    "B": {"A": 5, "D": 1},
    "C": {"A": 1, "D": 2},
    "D": {"B": 1, "C": 2},
}

start = "A"
distances, path = dijkstra(graph, start)

print("Shortest Distances:")
for node, distance in distances.items():
    print(f"Distance from {start} to {node}: {distance}")

print("\nShortest Paths:")
for node, p in path.items():
    print(f"Path from {start} to {node}: {p}")
