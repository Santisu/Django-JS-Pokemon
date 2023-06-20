from django.http import JsonResponse
import requests
import json
from django.shortcuts import render
from django.views import View
# Create your views here.


class PokedexIndexView(View):
    generacion = {
        "generation-i" : {   "id": 1,
            "nombre" : "Kanto",
            "url" : "https://pokeapi.co/api/v2/generation/1/"
        },
        "generation-ii" : {   "id": 2,
            "nombre" : "Johto",
            "url" : "https://pokeapi.co/api/v2/generation/2/"
        },
        "generation-iii" : {   "id": 3,
            "nombre" : "Hoenn",
            "url" : "https://pokeapi.co/api/v2/generation/3/"
        },
        "generation-iv" : {   "id": 4,
            "nombre" : "Sinnoh",
            "url" : "https://pokeapi.co/api/v2/generation/4/"
        },
        "generation-v" : {   "id": 5,
            "nombre" : "Teselia/Unova",
            "url" : "https://pokeapi.co/api/v2/generation/5/"
        },
        "generation-vi" : {   "id": 6,
            "nombre" : "Kalos",
            "url" : "https://pokeapi.co/api/v2/generation/6/"
        },
        "generation-vii" : {   "id": 7,
            "nombre" : "Alola",
            "url" : "https://pokeapi.co/api/v2/generation/7/"
        },
        "generation-viii" : {   "id": 8,
            "nombre" : "Galar ",
            "url" : "https://pokeapi.co/api/v2/generation/8/"
        },
        "generation-ix" : {   "id": 9,
            "nombre" : "Paldea",
            "url" : "https://pokeapi.co/api/v2/generation/9/"
        },
    }

    def get(self, request):
        context = {
            "generacion" : self.generacion,
        }
        return render(request, "pokedex_index.html", context)
    
    def post(self, request):
        data = json.loads(request.body)
        if data.get("accion") == "getGen":
            return self.get_gen(request)
        elif data.get("accion") == "getPoke":
            return self.get_poke(request)

    def get_gen(self, request):
        data = json.loads(request.body)
        print(data.get('id'), data.get('accion'))
        gen_id = data.get('id')
        url = f'https://pokeapi.co/api/v2/generation/{gen_id}'
        respuesta = requests.get(url)
        if respuesta.status_code == 200:
            json_dict = json.loads(respuesta.text)
            gen_dict = {}
            for i, pokemon in enumerate(json_dict['pokemon_species']):
                gen_dict[i + 1] = pokemon
            json_data = json.dumps(gen_dict)
            return JsonResponse(json_data, safe=False)
        else:
            return JsonResponse({'error': 'No se pudo obtener el Pokémon'})
   
    def get_poke(self, request):
        data = json.loads(request.body)
        print(data.get('pokeName'), data.get('accion'))
        pokemon_name = data.get('pokeName')
        url = f'https://pokeapi.co/api/v2/pokemon-species/{pokemon_name}'
        respuesta = requests.get(url)
        if respuesta.status_code == 200:
            json_dict = json.loads(respuesta.text)
            region = ""
            for gen in list(self.generacion.keys()):
                if json_dict['generation']['name'] == gen:
                    region = self.generacion[gen]["nombre"]
            poke_dict = {
                "name" : json_dict["name"],
                "id" : json_dict["id"],
                "region" : region
            }
           
            json_data = json.dumps(poke_dict)
            return JsonResponse(json_data, safe=False)
        else:
            return JsonResponse({'error': 'No se pudo obtener el Pokémon'})

