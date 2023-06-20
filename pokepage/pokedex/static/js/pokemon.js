export class Pokemon{
    /**
     * 
     * @param {string} name Pokemon name
     * @param {integer} number Pokemon country ID
     * @param {string} region Pokemon region
     * @param {string[]} ability Pokemon abilities
     * @param {string} dex Pokemon pokedex description
     * @param {string} image Pokemon picture
     */

    constructor(name, number, region, ability, dex, image){
        this.name = name;
        this.number = number;
        this.region = region;
        this.ability = ability;
        this.dex = dex;
        this.image = image;
    }
}
const newPoke = new Pokemon('sama', 29, 'alola', 'ser blanco','Sama es muy blanco el mas blanco', "FOTO DE SAMA")
console.log(newPoke)