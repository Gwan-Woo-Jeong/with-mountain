class Graph {
    constructor() {
        this.nodes = new Map();
        this.coordsToId = new Map();
        this.idToCoords = new Map();
    }

    findIdByCoords(x, y) {
        return this.coordsToId.get(`${x},${y}`) || null;
    }

    findCoordsById(id) {
        const coords = this.idToCoords.get(id);
        return coords ? coords.split(',') : null;
    }

    addCoordsWithId(id, x, y) {
        this.coordsToId.set(`${x},${y}`, id);
    }

    addIdWithCoords(id, x, y) {
        this.idToCoords.set(id, `${x},${y}`);
    }

    addNode(id, x, y) {
        const coordsId = this.findIdByCoords(x, y);

        if (coordsId) {
            return coordsId;
        }

        this.addCoordsWithId(id, x, y);
        this.addIdWithCoords(id, x, y);
        this.nodes.set(id, []);
        return id;
    }

    addEdge(start, end, distance, edgeId, level, time) {
        this.nodes.get(start).push({id: edgeId, node: end, distance, level, time});
        this.nodes.get(end).push({id: edgeId, node: start, distance, level, time});
    }

    findLeafNodes() {
        const leafNodes = [];
        for (const [node, edges] of this.nodes) {
            if (edges.length === 1) {
                leafNodes.push(node);
            }
        }

        return leafNodes;
    }

    getOppositeNode(edgeId, node) {
        const edges = this.nodes.get(node);
        return edges?.find(edge => edge.id === edgeId)?.node || null;
    }

    findLeafNodeIncluded(edgeId) {
        const leafNodes = this.findLeafNodes();

        return leafNodes.find(leafNode => {
            const edges = this.nodes.get(leafNode);
            return edges?.some(edge => edge.id === edgeId);
        }) || null;
    }

    findShortestPath(start, end) {
        return this.findPath(start, end, 'distance', Math.min);
    }

    findFastestPath(start, end) {
        return this.findPath(start, end, 'time', Math.min);
    }

    findHardestPath(start, end) {
        return this.findPath(start, end, 'level', Math.max);
    }

    findEasiestPath(start, end) {
        return this.findPath(start, end, 'level', Math.min);
    }

    findPath(start, end, costType, comparator) {
        if (!this.nodes.has(start)) {
            throw new Error(`[Graph] findPath: ${start} 노드 없음`);
        }

        if (!this.nodes.has(end)) {
            throw new Error(`[Graph] findPath: ${end} 노드 없음`);
        }

        const costs = new Map();
        const previousNodes = new Map();
        const visited = new Set();
        const priorityQueue = [];

        for (const node of this.nodes.keys()) {
            costs.set(node, comparator === Math.min ? Infinity : -Infinity);
        }
        costs.set(start, comparator === Math.min ? 0 : 0);
        priorityQueue.push({node: start, cost: costs.get(start)});

        while (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => comparator(a.cost, b.cost));
            const {node: current} = priorityQueue.shift();

            if (visited.has(current)) continue;
            visited.add(current);

            if (current === end) break;

            const edges = this.nodes.get(current) || [];
            for (const edge of edges) {
                const {node: neighbor, id} = edge;
                const edgeCost = edge[costType];

                if (visited.has(neighbor)) continue;

                const newCost = costs.get(current) + edgeCost;
                if (comparator(newCost, costs.get(neighbor)) === newCost) {
                    costs.set(neighbor, newCost);
                    previousNodes.set(neighbor, {node: current, edgeId: id});
                    priorityQueue.push({node: neighbor, cost: newCost});
                }
            }
        }

        const pathEdges = [];
        let currentNode = end;

        while (currentNode !== start) {
            const previous = previousNodes.get(currentNode);
            if (!previous) {
                return null; // No path exists
            }
            pathEdges.unshift(previous.edgeId); // Add edgeId to the path
            currentNode = previous.node;
        }

        return pathEdges;
    }
}


export default Graph;