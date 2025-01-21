let Dagoba = {};

Dagoba.error = (message) => {
    console.log(message);
    return false;
}

Daogba.G =  {}; // Prototype

// Factory function
Dagoba.graph = (V, E) => {
    const graph = Object.create(Dagoba.G)

    graph.edges       = [];
    graph.vertices    = [];
    graph.vertexIndex = {};

    graph.autoid = 1;

    if(Array.isArray(V)) graph.addVertices(V);
    if(Array.isArray(E)) graph.addEdges(E);

    return graph;
}

Dagoba.G.addVertices = (vs) => {vs.forEach(this.AddVertex.bind(this))}
Dagoba.G.addEdges    = (es) =>{es.forEach(this.AddEdge.bind(this))}

Dagoba.G.addVertex = (vertex) => {
    if(!vertex._id) {
        vertex._id = this.autoid++;
    } else if(this.findVertexByID(vertex._id)) {
        return Dagoba.error(`Vertex with id ${vertex.id} already exists`);
    }
    
    this.vertices.push(vertex);
    this.vertexIndex[vertex._id] = vertex;
    vertex._out = []; 
    vertex._in = [];

    return vertex._id;
}

Dagoba.G.addEdge = (edge) => {
    edge._in = this.findVertexByID(edge._in);
    edge._out = this.findVertexByID(edge._out);

    if(!edge._in && !edge._out) {
        return Dagoba.error(`Vertex with id ${edge._in} or ${edge._out} does not exist`);
    }

    edge._out._out.push(edge);
    edge._in._in.push(edge);

    this.edges.push(edge);
}

