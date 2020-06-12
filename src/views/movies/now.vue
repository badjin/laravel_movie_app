<template>
  <v-row class="pa-2">
    <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="2" v-for="(movie, index) in nowMovies" :key="index">
      <movie-card :movie="movie" />
    </v-col>
    <infinite-loading @infinite="initialize"></infinite-loading>
  </v-row>
</template>

<script>
  import MovieCard from "../../components/MovieCard"

  export default {
    name: "now",
    components: {
      MovieCard
    },
    data () {
      return {
        page: 1,
        nowMovies: []
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      initialize($state) {
        this.$store.dispatch('tmDb/getDataFromTMDB', {
          path: 'movie/now_playing',
          page: this.page
        })
          .then(res => {
            if (res.length && this.page < 10) {
              this.page += 1
              this.nowMovies.push(...res)
              $state.loaded()
            }
            else $state.complete()
          })
      },
    }
  }
</script>
