const questao2 = {
  A: {B: 3, C: 1},
  B: {D: 1, G: 5},
  C: {D: 2, F: 5},
  D: {F: 2, E: 4},
	E: {H: 1},
	F: {H: 3},
	G: {E: 2},
  H: {}
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
  const custos = Object.assign({H: Infinity}, graph.A);

  // rastrear caminhos
  const parents = {H: null};
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

  let optimalPath = ['final: H'];
  let parent = parents.H;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const resultado = {
    distance: custos.H,
    path: optimalPath
  };

  return resultado;
};

console.log(dijkstra(questao2));