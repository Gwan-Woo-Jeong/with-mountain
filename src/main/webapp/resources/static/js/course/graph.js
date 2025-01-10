class Graph {
    constructor() {
        this.nodes = new Map();
        this.coords = new Map();
    }

    findIdByCoords(x, y) {
        return this.coords.get(`${x},${y}`) || null;
    }

    addCoordsWithId(id, x, y) {
        this.coords.set(`${x},${y}`, id);
    }

    addNode(id, x, y) {
        const coordsId = this.findIdByCoords(x, y);

        if (coordsId) {
            return coordsId;
        }

        this.addCoordsWithId(id, x, y);
        this.nodes.set(id, []);
        return id;
    }

    addEdge(start, end, distance, edgeId, level) {
        this.nodes.get(start).push({id: edgeId, node: end, distance, level});
        this.nodes.get(end).push({id: edgeId, node: start, distance, level});
    }

    getNodesConnectedByEdge(edgeId) {
        for (const [node, edges] of this.nodes) {
            for (const edge of edges) {
                if (edge.id === edgeId) {
                    return [node, edge.node];
                }
            }
        }
        return null;
    }

    areEdgesConnected(edgeId1, edgeId2) {
        const nodes1 = this.getNodesConnectedByEdge(edgeId1);
        const nodes2 = this.getNodesConnectedByEdge(edgeId2);

        if (!nodes1 || !nodes2) return false;

        for (const node1 of nodes1) {
            for (const node2 of nodes2) {
                if (node1 === node2) return true;
            }
        }

        return false;
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

    isEdgeConnectedToLeafNode(edgeId) {
        const leafNodes = this.findLeafNodes();

        for (const leafNode of leafNodes) {
            const edges = this.nodes.get(leafNode);
            for (const edge of edges) {
                if (edge.id === edgeId) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default Graph;