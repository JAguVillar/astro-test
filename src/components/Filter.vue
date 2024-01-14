<template>
  <div class="select-container mx-auto">
    <input
      style="font-size: 32px"
      class="rounded-lg flex-1 appearance-none border-2 border-[#6246ea] py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
      placeholder="Busca un pokémon..."
      type="text"
      id="pokemon"
      v-model="searchText"
      @input="filterPokemon"
      @focus="openDropdown"
    />

    <div class="h-96 overflow-auto">
      <ul v-if="showDropdown" class="dropdown w-full">
        <Item
          @choose="log"
          v-for="pokemon in filteredPokemon"
          :key="pokemon"
          :pokemon="pokemon.name"
          :sprite="pokemon.sprite"
          :sprite_shiny="pokemon.sprite_shiny"
          :type="pokemon.types"
          :is_shiny="pokemon.is_shiny"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  components: { Item },
  // props: {
  //   initialPokemonData: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  data() {
    return {
      searchText: "",
      selectedPokemon: null,
      allPokemon: null,
      showDropdown: false,
      initialPokemonData: null,
    };
  },
  created() {
    // this.allPokemon = this.initialPokemonData;
    // console.log(this.initialPokemonData);
  },
  computed: {
    filteredPokemon() {
      if (this.searchText.length >= 3) {
        return this.initialPokemonData.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    },
  },
  async mounted() {
    const jsonFile = "/json/pokemons.json";
    const response = await fetch(jsonFile).then((response) => response.json());
    const data = response;
    data.forEach((element) => {
      Math.floor(Math.random() * 29) + 1 == 15
        ? (element.is_shiny = true)
        : (element.is_shiny = false);
    });
    this.initialPokemonData = data;
    console.log(this.initialPokemonData);
  },
  methods: {
    log(value) {
      this.$emit("choose", value);
    },
    filterPokemon() {
      this.showDropdown = true;
    },
    openDropdown() {
      this.showDropdown = true;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    selectPokemon(pokemon) {
      this.selectedPokemon = pokemon;
      this.showDropdown = false;
    },
  },
};
</script>

<style>
/* Estilos CSS */
</style>
