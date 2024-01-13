<template>
  <h1 class="text-center m-4" style="font-size: 32px">
    Busca un pokémon que sea del tipo:
  </h1>
  <div class="flex justify-center">
    <div v-for="type in types" :key="type" class="m-4">
      <img style="width: 128px" :src="imgRoute(type)" alt="" />
    </div>
  </div>
  <div style="font-size: 32px">
    HP:
    <span :class="hpColor">
      {{ hp + "/3" }}
    </span>
  </div>
  <div class="m-4">
    <Filter :initialPokemonData="allPokemons" @choose="log" />
  </div>
</template>

<script>
import Filter from "./Filter.vue";
export default {
  components: {
    Filter,
  },
  data() {
    return {
      message: "Hello, Vue 3!",
      allPokemons: [],
      hp: 3,
      types: null,
      hpColor: "text-green-600",
      infoPokemon: null,
    };
  },

  // Component methods
  methods: {
    // Your methods go here
    // async fetchAll(url) {
    //   if (url != null) {
    //     const response = await fetch(url).then((response) => response.json());
    //     const data = response;
    //     await data.results.forEach((element) => {
    //       this.allPokemons.push(element);
    //     });
    //     if (data.next) {
    //       await this.fetchAll(data.next);
    //     }
    //   } else {
    //     return;
    //   }
    // },
    randomType(alltypes) {
      let types = alltypes[Math.floor(Math.random() * alltypes.length)];
      this.types = types;
      console.log(this.types);
    },
    imgRoute(name) {
      return "/tipos/" + name + ".png";
    },
    async log(value) {
      console.log(value);
      let species_response = null;

      // Extracting the types from the targetArray
      const targetTypes = value.types.map((item) => item.name);

      // Checking if all targetTypes are present in typesArray
      const typesValidation =
        targetTypes.every((type) => this.types.includes(type)) &&
        targetTypes.length === this.types.length;
      console.log();

      try {
        if (typesValidation == false) {
          this.hp--;
        } else {
          species_response = await this.getSpecies(value.pokemon);
          // const modal = document.querySelector("#modalSuccess");
          // modal.showModal();
          const newArray = species_response.flavor_text_entries.filter(
            (item) => item.language.name === "es"
          );

          const newArrayMapped = newArray.map((item) => ({
            flavor_text: item.flavor_text,
            version: item.version.name,
          }));

          const item = {
            mapped: true,
            mappedData:
              newArrayMapped[Math.floor(Math.random() * newArrayMapped.length)],
            info: value,
          };
          this.infoPokemon = item;
        }
      } catch (error) {
        console.error("Error:", error);
        const item = {
          mapped: false,
          mappedData: null,
          info: value,
        };
        this.infoPokemon = item;
      }
    },
    async getSpecies(pokemon) {
      console.log(pokemon);
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/" + pokemon
        );
        console.log(response);
        if (!response.ok) {
          const data = await response.json();
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        this.errorMessage = error;
        alert("There was an error!", error);
      }
    },
  },

  // Component lifecycle hooks
  beforeCreate() {
    // Executed before the component is created
  },
  created() {
    // Executed after the component is created
  },
  beforeMount() {
    // Executed before the component is mounted to the DOM
  },
  async mounted() {
    // Executed after the component is mounted to the DOM
    const jsonFile = "/json/types.json";

    const response = await fetch(jsonFile).then((response) => response.json());
    const data = response;
    this.randomType(data);
  },

  // Component computed properties
  computed: {
    // Your computed properties go here
  },

  // Component watch options
  watch: {
    // Your watched properties go here
    hp: function (val) {
      if (val > 0) {
        if (val == 3) {
          this.hpColor = "text-green-600";
        } else if (val == 2) {
          this.hpColor = "text-orange-600";
        } else {
          this.hpColor = "text-red-600";
        }
      } else {
        const modal = document.querySelector("#modalFail");
        modal.showModal();
      }
    },
  },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
