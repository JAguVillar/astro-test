<template>
  <!-- Your component template goes here -->
  <div v-for="pokemon in allPokemons">
    {{ pokemon.name }}
  </div>
</template>

<script>
export default {
  // Component data
  data() {
    return {
      message: "Hello, Vue 3!",
      allPokemons: [],
    };
  },

  // Component methods
  methods: {
    // Your methods go here
    async fetchAll(url) {
      if (url != null) {
        const response = await fetch(url).then((response) => response.json());
        const data = response;

        await data.results.forEach((element) => {
          this.allPokemons.push(element);
        });
        // Check if there is a next page and make a recursive call
        if (data.next) {
          await this.fetchAll(data.next);
        }
      } else {
        return;
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
    const jsonFile = "../../public/response.json";
    await this.fetchAll("https://pokeapi.co/api/v2/pokemon/?limit=25");

    const response = await fetch(jsonFile).then((response) => response.json());
    const data = response;

    console.log(data);
    console.log(this.allPokemons);
  },

  // Component computed properties
  computed: {
    // Your computed properties go here
  },

  // Component watch options
  watch: {
    // Your watched properties go here
  },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
