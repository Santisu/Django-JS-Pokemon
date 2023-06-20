import {Pokemon} from './pokemon.js'
import {getGen, getPoke} from './getPoke.js'

const pokeGen = document.getElementById("generacion");
const pokeSend = document.getElementById("enviar-poke");
const pokeSelect = document.getElementById("poke-list")

pokeGen.addEventListener("change", function(){
  const selectedOption = this.options[this.selectedIndex];
  console.log("Option selected: " + selectedOption.value);
  getGen(selectedOption.value)
});

pokeSend.addEventListener("click", function(event){
    event.preventDefault()
    const poke = pokeSelect.value.toLowerCase();
    console.log("Se hizo clic en el botón de envío", poke);
    getPoke(poke)
}

)