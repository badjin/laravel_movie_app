<template>
<!--  <v-dialog v-model="dialog" max-width="300">-->
<!--    <v-card class="mx-auto">-->
<!--      <v-list>-->
<!--        <v-list-item-->
<!--          v-for="movie in movies" :key="movie.id"-->
<!--          @click="goMovieShow(movie.id)"-->
<!--        >-->
<!--          <v-list-item-avatar tile>-->
<!--            <v-img-->
<!--              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"-->
<!--              alt="poster"-->
<!--            >-->
<!--            </v-img>-->
<!--          </v-list-item-avatar>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title>{{ movie.title }}</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-card>-->
<!--  </v-dialog>-->
  <v-expand-transition>
    <v-list v-if="dialog" color="grey darken-3" class="transparent" v-on-clickaway="away">
        <v-list-item
          v-for="movie in movies" :key="movie.id"
          @click="goMovieShow(movie.id)"
        >
          <v-list-item-avatar tile>
            <v-img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              alt="poster"
            >
            </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ movie.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-expand-transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    name: "SearchResults",
    props: ['movies'],

    directives: {
      onClickaway: onClickaway,
    },
    // template: '<p v-on-clickaway="away">Click away</p>',

    data () {
      return {
        dialog: false
      }
    },
    computed: {
    },
    watch: {
      dialog (val) {
        val || this.close
      },
    },

    methods: {
      open() {
        this.dialog = true
        return new Promise(resolve => {
          this.resolve = resolve
        })
      },
      cancel() {
        this.dialog = false
      },

      goMovieShow(id) {
        this.dialog = false
        this.$store.dispatch('tmDb/getMovie', id)
          .then(() => {
            this.$router.push({name: 'movies.show', params: {id: id}})
          })
      },
      away() {
        this.dialog = false
        // console.log('clicked away')
      },
    }
  }
</script>

<style scoped>
  .transparent {
    background-color: #ffffff;
    opacity: 0.9;
  }
</style>
