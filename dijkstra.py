from math import inf

import heapq


def dijkstra(graph, start):
    # Инициализация словаря для хранения расстояний
    # до каждой вершины. Сначала все расстояния бесконечны.
    distances = {vertex: inf for vertex in graph}
    paths = {vertex: {} for vertex in graph}
    print(paths)
    # Расстояние до начальной вершины равно 0.
    distances[start] = 0

    # Создаём приоритетную очередь для хранения вершин и их расстояний.
    priority_queue = [(0, start)]

    while priority_queue:
        # Извлекаем вершину с наименьшим расстоянием из очереди.

        current_distance, current_vertex = heapq.heappop(priority_queue)

        # Если текущее расстояние до вершины уже больше, чем сохранённое расстояние, игнорируем её.
        if current_distance > distances[current_vertex]:
            continue
        print("")
        print(current_vertex)
        # Рассмотрим все соседние вершины текущей вершины.
        for neighbor, weight in graph[current_vertex].items():

            distance = current_distance + weight

            # Если найден более короткий путь до соседа, обновим расстояние.
            if distance < distances[neighbor]:
                print(f"\t{neighbor}: {weight}")

                # paths[neighbor][current_vertex] = weight

                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    # print(priority_queue)
    # print(paths)
    print("")
    return distances


def main():

    # Пример использования:
    # graph = {
    #     "A": {"B": 3, "C": 6, "D": 1},
    #     "B": {"A": 6, "E": 8},
    #     "C": {"A": 6, "D": 4, "E": 4},
    #     "D": {"A": 1, "C": 4, "E": 12},
    #     "E": {"B": 8, "C": 4, "D": 12},
    # }

    graph = {
        "A": {"B": 10, "C": 9, "D": 7, "E": 4, "F": 4, "G": 3},
        "B": {"A": 10, "C": 3, "D": 5, "E": 3, "F": 5, "G": 9},
        "C": {"A": 9, "B": 3, "D": 4, "E": 2, "F": 3, "G": 7},
        "D": {"A": 7, "B": 5, "C": 4, "E": 4, "F": 2, "G": 5},
        "E": {"A": 4, "B": 3, "C": 2, "D": 4, "F": 3, "G": 10},
        "F": {"A": 4, "B": 5, "C": 3, "D": 2, "E": 3, "G": 5},
        "G": {"A": 3, "B": 9, "C": 7, "D": 5, "E": 10, "F": 5},
    }

    result = dijkstra(graph, "A")

    # Выводим результат.
    print("Кратчайшие расстояния до каждой вершины:")
    for vertex, distance in result.items():
        print(f"До вершины {vertex}: {distance}")


if __name__ == "__main__":
    main()
