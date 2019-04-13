let meusLocais = [];
const geocoder = new google.maps.Geocoder;

let changeListeners = [];

// Adiciona as callbacks em uma lista
export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

// Executa as callbacks com o parâmetro enviado
function publish(data) {
  changeListeners.forEach((changeListener) => { changeListener(data); });
}

export function incluirLugar(latLng) {
  //Busca as informações da cidade pela latitude e longitude na api do google
  geocoder.geocode({ 'location': latLng }, function (results) {
    try {
      //Filtra o nome da cidade no retorno da api
      const cidadeNome = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;

      // Inclui a localização e o nome da cidade no array
      meusLocais.push({ position: latLng, name: cidadeNome });
      
      /*Executa as funções de renderizar dos dois componentes
      Com as alterações de lugar */
      publish(meusLocais);

      //grava o array no local storage do navegador
      localStorage.setItem('meusLocais', JSON.stringify(meusLocais));
    } catch (e) {
      console.log('Nenhuma cidade encontrada nessa localização! :(');
    }
  });
}
//Iniciar local storage
function initLocalStorage() {
  const lugaresLocalStorage = JSON.parse(localStorage.getItem('meusLocais'));
  if (Array.isArray(lugaresLocalStorage)) {
    meusLocais = lugaresLocalStorage;
    // publish();
  }
}

//Recuperar os locais
export function recuperarLocais() {
  return meusLocais;
}

initLocalStorage();
