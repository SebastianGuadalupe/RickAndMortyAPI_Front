<script>
export default {
  props: ['character']
}
</script>

<template>
  <div class="card">
    <img v-bind:src=character.image>
    <h1>{{ character.name }}</h1>
    <p>Estado: {{ character.status }}</p>
    <p>Especie: {{ character.species }}</p>
    <p>Genero: {{ character.gender }}</p>
    <p>Ubicacion: {{ character.location.name }}</p>
  </div>
</template>

<style>
.card {
  width: 20rem;
  margin: auto;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
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
