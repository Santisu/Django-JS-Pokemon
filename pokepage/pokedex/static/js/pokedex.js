import {Pokemon} from './pokeObject.js'
import {getGen, obtenerPokeDatos,capitalizeWord} from './postPoke.js'

const pokeGen = document.getElementById("generacion");
const pokeSend = document.getElementById("enviar-poke");
const pokeSelect = document.getElementById("poke-list");
const pokeName = document.getElementById("poke-name");
const pokeNumber = document.getElementById("poke-number");
const pokeType = document.getElementById("poke-type");
const pokeRegion = document.getElementById("poke-region");
const pokeAbility = document.getElementById("poke-ability");
const pokeDex = document.getElementById("poke-dex");
const pokeSprite = document.getElementById("poke-sprite");
const dexter = document.getElementById("dexter");
const dexterInput = document.getElementById("dexter-input")

pokeGen.addEventListener("change", function(){
  const selectedOption = this.options[this.selectedIndex];
  const pokeList = document.getElementById("pokemon-list")
  pokeList.innerHTML = ""
  console.log("Option selected: " + selectedOption.value);
  getGen(selectedOption.value)
});

pokeSend.addEventListener("click", function(event){
    event.preventDefault()
    const poke = pokeSelect.value.toLowerCase();  
    pokeSelect.value = ""
    obtenerPokeDatos(poke).then(datos => {
      const [arg1, arg2, arg3, arg4, arg5, arg6, arg7] = datos
      const newPoke = new Pokemon(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
      console.log(newPoke)
      console.log(newPoke.dex)
      pokeName.innerText = capitalizeWord(newPoke.name);
      pokeNumber.innerText = newPoke.number;
      pokeRegion.innerText = capitalizeWord(newPoke.region);
      pokeDex.innerText = newPoke.dex;
      pokeType.innerText = capitalizeWord(newPoke.type.join(' '));
      pokeAbility.innerText = capitalizeWord(newPoke.ability.join(' '));
      pokeSprite.src = newPoke.image
      dexter.style.display = 'block'
  
    })
    .catch(error => {
      console.error(error);
    });
    
    
})