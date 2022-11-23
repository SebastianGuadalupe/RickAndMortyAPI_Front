<script>
import CharacterCard from '../../components/CharacterCard.vue'

export default {
  name: "CharactersList",

  components: {
    CharacterCard
  },

  data(){
    return {
      characters: [],
      name: "",
      status: "all",
      species: "",
      gender: "all",
      filter: "",
    }
  },

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
        this.updateStates()
      },
      { immediate: true }
    )
  },

  methods: {
    updateStates() {
      this.name = this.$route.query.name || ""
      this.status = this.$route.query.status || "all"
      this.species = this.$route.query.species || ""
      this.gender = this.$route.query.gender || "all"
    },
    fetchData() {
      const params = new URLSearchParams(this.$route.query);
      fetch(import.meta.env.VITE_API_ENDPOINT + "/character?" + params)
      .then(response => response.json())
      .then(characters => {
        this.characters = characters.results
      })
    },
    updateFilter() {
      let values = {}
      values = this.name.trim() !== "" ? {...values, name: this.name.trim()} : values
      values = this.status !== "all" ? {...values, status: this.status} : values
      values = this.species.trim() !== "" ? {...values, species: this.species.trim()} : values
      values = this.gender !== "all" ? {...values, gender: this.gender} : values
      this.$router.replace({ path: '/characters', query: values })

      
      this.fetchData()
    },
  }
}
</script>

<template>
  <main>
    <h1 class="title">Rick and Morty Characters</h1>

    <span>Filter:</span>
    <form class="filter" @submit.prevent="onSubmit">
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" v-model="name" placeholder="Morty">
      </div>

      <div>
        <label for="status">Status</label>
        <select v-model="status" name="status" id="status">
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label for="species">Species</label>
        <input type="text" name="species" v-model="species" placeholder="Human">
      </div>

      <div>
        <label for="gender">Gender</label>
        <select v-model="gender" name="gender" id="gender">
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <button @click="this.updateFilter">Filter</button>
    </form>

    <div class="characters">
      <CharacterCard v-for="character in characters" :character="character" :key="character.id" />
    </div>
  </main>
</template>

<style>
.title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.filter {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.filter div * {
  margin: 1rem;
}

.filter button {
  height: fit-content;
  align-self: center;
}

.characters {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto;
}
@media (min-width: 768px) {
  .characters {
    grid-template-columns: auto auto;
  }
}
@media (min-width: 1280px) {
  .characters {
    grid-template-columns: auto auto auto auto;
  }
}
</style>
