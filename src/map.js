import { incluirLugar, recuperarLocais, subscribe } from './dataService.js';

let googleMap;

// O método init é como um construtor do nosso componente
function init() {
  // Instancia o mapa do google indicando a div html que deve ser manipulada
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 }, zoom: 3
  });

  googleMap.listaMarcacoes = [];
  googleMap.addListener('click', addMarcacao); //callback do click inclui marcação
}

function addMarcacao(event) {
  incluirLugar(event.latLng); // Função adicionar lugar no dataService
}

function renderizarMarcacoes(locais) { //função de renderizar recebe os locais do dataService
  googleMap.listaMarcacoes.forEach(m => m.setMap(null));
  googleMap.listaMarcacoes = []; // zera as marcações

  //percorre os parâmetros adicionando minha lista de marcações
  locais.forEach((lugar) => { 
    const marcacao = new google.maps.Marker({
      position: lugar.position,
      map: googleMap
    });
    googleMap.listaMarcacoes.push(marcacao);
  });
}

init();
renderizarMarcacoes(recuperarLocais()); // realiza a renderização inicial

// terminar aqui
subscribe(renderizarMarcacoes); 

