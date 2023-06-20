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

    constructor(name, number, region, dex, type, ability, image){
        this.name = name;
        this.number = number;
        this.region = region;
        this.ability = ability;
        this.dex = dex;
        this.type = type
        this.image = image;
    }
}
