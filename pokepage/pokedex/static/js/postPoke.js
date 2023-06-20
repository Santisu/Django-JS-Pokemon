export function capitalizeWord(word) {
  const words = word.split(' ');
  const capitalizedWords = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return capitalizedWords.join(' ');
  }


export async function obtenerPokeDatos(poke) {
    try {
      const pokeDatos = await getPoke(poke);
      return pokeDatos
    } catch (error) {
      console.error(error);
    }
  }

export async function getPoke(input){
    const csrftoken = CSRF_TOKEN;
    const pokemonName = {
        accion : "getPoke",
        pokeName : input}
    const json = JSON.stringify(pokemonName)
    try {
      const response = await fetch( backend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: json
      });
      if (!response.ok) {
        throw new Error('Error en la petición al backend');
      }
      const resultado = await response.json();
      const objeto = JSON.parse(resultado);
      const lista = Object.values(objeto);
      return lista
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

export async function getGen(input){
    const csrftoken = CSRF_TOKEN;
    const genId = {
        accion : "getGen",
        id : input}
    const json = JSON.stringify(genId)
    try {
      const response = await fetch( backend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: json
      });
  
      if (!response.ok) {
        throw new Error('Error en la petición al backend');
      }
  
      const resultado = await response.json();
      const pokes = JSON.parse(resultado);
      console.log(pokes);
      const pokeList = document.getElementById("pokemon-list");
      pokeList.innerHTML = '';
      for (const key in pokes) {
        if (pokes.hasOwnProperty(key)) {
          const opcion = document.createElement("option");
          opcion.value = pokes[key]['name'];
          opcion.innerText = capitalizeWord(pokes[key]['name'])
          pokeList.appendChild(opcion);
        }
      }
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  