<template>
  <v-row class="pa-2">
    <v-col cols="12" xs="12" sm="4" md="3" lg="3" xl="2" v-for="(show, index) in topShows" :key="index">
      <TvShowCard :show="show" />
    </v-col>
    <infinite-loading @infinite="initialize"></infinite-loading>
  </v-row>
</template>

<script>
  import TvShowCard from "../../components/TvShowCard"

  export default {
    name: "popular",
    components: {
      TvShowCard
    },
    data () {
      return {
        page: 1,
        topShows: []
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      initialize($state) {
        this.$store.dispatch('tmDb/getDataFromTMDB', {
          path: 'tv/top_rated',
          page: this.page
        })
          .then(res => {
            if (res.length && this.page < 10) {
              this.page += 1
              this.topShows.push(...res)
              $state.loaded()
            }
            else $state.complete()
          })
      },
    }
  }
</script>
