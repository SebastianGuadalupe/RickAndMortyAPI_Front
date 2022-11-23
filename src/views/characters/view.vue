<script>
export default {
  data() {
    return {
      character: null,
      comments: null,
      username: "",
      comment: "",
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.character = this.comments = null
      this.loading = true
      fetch(import.meta.env.VITE_API_ENDPOINT + "/character/" + this.$route.params.id)
      .then(response => response.json())
      .then(data => {
        this.character = data;
      })
      fetch(import.meta.env.VITE_BACKEND + "/character/" + this.$route.params.id + "/comments")
      .then(response => response.json())
      .then(data => {
        this.comments = data;
      })
    },
    async submitComment() {
      if (this.username.trim() === "" || this.comment.trim() === "") {
        return
      }
      const rawResponse = await fetch(import.meta.env.VITE_BACKEND + "/character/" + this.$route.params.id + "/comments", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.username, comment: this.comment, characterName: this.character.name})
      });
      const content = await rawResponse.json();
      console.log(content);
      this.fetchData()
    },
  },
}
</script>

<template>
  <main>
    <div v-if="character" class="content">
      <img v-bind:src=character.image>
      <div class="spacer"></div>
      <div>
        <h1>{{ character.name }}</h1>
        <table>
          <tr>
            <td>Status: </td>
            <td>{{ character.status }} </td>
          </tr>
          <tr>
            <td>Species: </td>
            <td>{{ character.species }} </td>
          </tr>
          <tr>
            <td>Gender: </td>
            <td>{{ character.gender }} </td>
          </tr>
          <tr>
            <td>Origin: </td>
            <td>{{ character.origin.name }} </td>
          </tr>
          <tr>
            <td>Location: </td>
            <td>{{ character.location.name }} </td>
          </tr>
        </table>
        <button @click="$router.back()">Return</button>
      </div>
    </div>

    <section class="comment-section">
    <form class="new-comment" @submit.prevent="onSubmit">
      <label for="username">Username</label>
      <input v-model="username" name="username" id="username" type="text">
      <label for="comment">Comment</label>
      <textarea v-model="comment" name="comment" id="comment" cols="60" rows="10"></textarea>
      <button @click="this.submitComment">Submit</button>
    </form>

    <div v-if="comments" class="comments">
      <div class="comment" v-for="comment in comments">
        <hr class="comment-separator">
        <h3 class="comment-username">{{comment.username}}</h3>
        <p class="comment-body">{{comment.comment}}</p>
      </div>
    </div>
    </section>
  </main>
</template>

<style>
.content {
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.spacer {
  padding: 1.5rem;
}

.comment-section {
  width: fit-content;
  margin: auto;
}

.new-comment {
  margin: auto;
  margin-top: 3rem;
  width: fit-content;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

#comment {
  max-width: 300px;
}

.comment {
  width: 100%;
}

.comment-separator {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}

.comments {
  margin: auto;
  margin-top: 3rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.comment-username {
  font-weight: bold;
}

@media (min-width: 1024px) {
  .content {
  flex-direction: row;
  justify-content: center;
  }
}
</style>
