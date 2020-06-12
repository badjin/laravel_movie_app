<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs24 sm10 md10 lg10 xl10>
        <v-tabs  centered class="hidden-xs-only">
          <v-tab :to="{name: 'movies.popular'}">Popular Movies</v-tab>
          <v-tab :to="{name: 'movies.now'}">Now Playing</v-tab>
        </v-tabs>
        <v-tabs  centered class="hidden-sm-and-up">
          <v-tab :to="{name: 'movies.popular'}">Popular</v-tab>
          <v-tab :to="{name: 'movies.now'}">Now</v-tab>
        </v-tabs>
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "movies",
    mounted() {
      this.initialize()
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('tmDb/getGenres')
      },
    }
  }
</script>

<style scoped>

</style>
