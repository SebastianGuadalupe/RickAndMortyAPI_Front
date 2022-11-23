<script>
export default {
  props: ['character']
}
</script>

<template>
  <router-link :to="{ name: 'character', params: { id: character.id }}">
    <div class="card">
      <img v-bind:src=character.image>
      <h1>{{ character.name }}</h1>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Location: {{ character.location.name }}</p>
    </div>
  </router-link>
</template>

<style>
.card {
  width: 20rem;
  margin: auto;
  padding-bottom: 1rem;
  border: solid 1px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: -webkit-fill-available;
}
.card h1 {
  font-weight: bold;
  text-align: center;
  line-height: normal;
  padding: 1rem 0;
}
.card img {
  width: 100%;
}
</style>
