<template>
  <v-row class="pa-2">
    <v-col
      cols="12" xs="12" sm="4" md="3" lg="3" xl="2"
      v-for="(movie, index) in popularMovies"
      :key="index"
    >
      <movie-card :movie="movie" />
    </v-col>
    <infinite-loading @infinite="initialize"></infinite-loading>
  </v-row>
</template>

<script>
import MovieCard from "../../components/MovieCard"

export default {
  name: "popular",
  components: {
    MovieCard
  },
  data() {
    return {
      page: 1,
      popularMovies: []
    };
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize($state) {
      this.$store
        .dispatch("tmDb/getDataFromTMDB", {
          path: "movie/popular",
          page: this.page
        })
        .then(res => {
          if (res.length && this.page < 10) {
            this.page += 1;
            this.popularMovies.push(...res)
            $state.loaded()
          } else $state.complete()
        })
    }
  }
};
</script>
