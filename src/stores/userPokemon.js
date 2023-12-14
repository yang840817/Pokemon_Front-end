import { defineStore } from "pinia";
import { API } from "../axios/api";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemonList = ref({});
  async function getPokemon() {
    try {
      const { data } = await API.get(`/pokemons`);
      pokemonList.value = data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function deletePokemon(pokemon_id) {
    try {
      await API.delete(`/pokemons/${pokemon_id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { pokemonList, getPokemon, deletePokemon };
});
