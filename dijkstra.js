const questaotwo = {
  A: {B: 4, C: 2},
  B: {D: 5, C: 2},
  C: {B: 2, D: 8, E: 10},
  D: {E: 4, F: 6},
	E: {D: 4, F: 2},
	F: {}
};

const menorCustos = (custos, processado) => {
  return Object.keys(custos).reduce((menor, node) => {
    if (menor === null || custos[node] < custos[menor]) {
      if (!processado.includes(node)) {
        menor = node;
      }
    }
    return menor;
  }, null);
};

// função que retorna o custos e o caminho minimos para alcançar H
const dijkstra = (graph) => {

  // rastreia o menor custos para alcancar cd nó
  const custos = Object.assign({F: Infinity}, graph.A);

  // rastrear caminhos
  const parents = {F: null};
  for (let child in graph.A) {
    parents[child] = 'inicio: A';
  }

  const processado = [];

  let node = menorCustos(custos, processado);

  while (node) {
    let custo = custos[node];
    let children = graph[node];
    for (let n in children) {
      let novoCusto = custo + children[n];
      if (!custos[n] || custos[n] > novoCusto) {
        custos[n] = novoCusto;
        parents[n] = node;
      }
    }
    processado.push(node);
    node = menorCustos(custos, processado);
  }

  let optimalPath = ['final: F'];
  let parent = parents.F;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const resultado = {
    distance: custos.F,
    path: optimalPath
  };

  return resultado;
};

console.log(dijkstra(questaotwo));