import {AUTO_MODE_TYPE} from "./constants.js";

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

    generatePair(road) {
        const path = [];
        let startNode;
        let endNode;

        road.coordList.forEach(({coordId, roadX, roadY}, idx, arr) => {
            if (idx === 0) {
                startNode = this.addNode(coordId, roadX, roadY);
            }
            if (idx === arr.length - 1) {
                endNode = this.addNode(coordId, roadX, roadY);
                this.addEdge(startNode, endNode, road.roadKm, road.roadId, road.level, road.time);
            }
            path.push(new kakao.maps.LatLng(roadY, roadX));
        });

        return path;
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

    dijkstra(startNode, endNode, getEdgeWeight) {
        const distances = new Map();
        const previousNodes = new Map();
        const previousEdges = new Map();
        const visited = new Set();

        for (const nodeId of this.nodes.keys()) {
            distances.set(nodeId, Infinity);
            previousNodes.set(nodeId, null);
            previousEdges.set(nodeId, null);
        }
        distances.set(startNode, 0);

        const queue = [{nodeId: startNode, distance: 0}];

        while (queue.length > 0) {
            queue.sort((a, b) => a.distance - b.distance);

            const {nodeId: currentNode} = queue.shift();

            if (visited.has(currentNode)) {
                continue;
            }
            visited.add(currentNode);

            if (currentNode === endNode) {
                break;
            }
            const edges = this.nodes.get(currentNode);

            for (const edge of edges) {
                const neighbor = edge.node;
                if (visited.has(neighbor)) {
                    continue;
                }
                const weight = getEdgeWeight(edge);
                const alt = distances.get(currentNode) + weight;
                if (alt < distances.get(neighbor)) {
                    distances.set(neighbor, alt);
                    previousNodes.set(neighbor, currentNode);
                    previousEdges.set(neighbor, edge); // Store the edge via which we reached neighbor
                    queue.push({nodeId: neighbor, distance: alt});
                }
            }
        }

        const edgePath = [];
        let currentNode = endNode;

        while (currentNode !== null && currentNode !== startNode) {
            const edge = previousEdges.get(currentNode);
            if (edge) {
                edgePath.unshift(edge.id);
                currentNode = previousNodes.get(currentNode);
            } else {
                return null;
            }
        }
        if (currentNode === startNode) {
            return edgePath;
        } else {
            return null; // No path found
        }
    }

    findAutoPath(appState, selects) {
        const current = selects.peek();
        const previous = selects.first();
        if (appState.autoMode.type === AUTO_MODE_TYPE.SHORTEST) {
            return this.findShortestPath(previous.leafNodeId, current.leafNodeId);
        } else if (appState.autoMode.type === AUTO_MODE_TYPE.FASTEST) {
            return this.findFastestPath(previous.leafNodeId, current.leafNodeId);
        } else if (appState.autoMode.type === AUTO_MODE_TYPE.HARDEST) {
            return this.findHardestPath(previous.leafNodeId, current.leafNodeId);
        } else if (appState.autoMode.type === AUTO_MODE_TYPE.EASIEST) {
            return this.findEasiestPath(previous.leafNodeId, current.leafNodeId);
        }
        return [];
    }

    findShortestPath(startNode, endNode) {
        return this.dijkstra(startNode, endNode, (edge) => edge.distance);
    }

    findFastestPath(startNode, endNode) {
        return this.dijkstra(startNode, endNode, (edge) => edge.time);
    }

    findEasiestPath(startNode, endNode) {
        return this.dijkstra(startNode, endNode, (edge) => edge.level);
    }

    findHardestPath(startNode, endNode) {
        const maxLevel = 3;
        return this.dijkstra(startNode, endNode, (edge) => maxLevel - edge.level);
    }
}

export default Graph;