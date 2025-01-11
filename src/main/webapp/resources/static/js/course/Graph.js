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

    addEdge(start, end, distance, edgeId, level) {
        this.nodes.get(start).push({id: edgeId, node: end, distance, level});
        this.nodes.get(end).push({id: edgeId, node: start, distance, level});
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
}


export default Graph;