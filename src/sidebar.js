import { recuperarLocais, subscribe } from './dataService.js';

function renderizarCidades(locais) {
  // Recupera o elemento da lista de cidades
  const listaCidades = document.getElementById('citiesList');

  // limpa o elemento
  listaCidades.innerHTML = '';

  // preenche os locais através do parâmetro
  locais.forEach((lugar) => {
    const cidade = document.createElement('div');
    cidade.innerText = lugar.name;
    listaCidades.appendChild(cidade);
  });
}

// Renderiza as cidades inicialmente
renderizarCidades(recuperarLocais());

// concluir aqui
subscribe(renderizarCidades);




