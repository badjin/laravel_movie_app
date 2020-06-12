<template>
  <v-flex xs24 sm10 md10 lg10 xl10 class="mb-10">
    <v-row class="pa-2 mt-12">
      <v-col cols="12" sm="4" md="4" lg="4" max-width="400">
        <v-img
          max-width="350"
          :src="profilePath"
          alt="profile"
        >
        </v-img>

        <div class="mt-3">
          <v-btn small
                 v-if="social.facebook_id"
                 :href="`https://facebook.com/${social.facebook_id}`"
                 text
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>

          <v-btn small
                 v-if="social.instagram_id"
                 :href="`https://instagram.com/${social.instagram_id}`"
                 text
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>

          <v-btn small
                 v-if="social.twitter_id"
                 :href="`https://twitter.com/${social.twitter_id}`"
                 text
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>

          <v-btn small
                 v-if="social.hompage"
                 :href="`${social.hompage}`"
                 text
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </div>

      </v-col>
      <v-col class="ml-12">
        <p class="display-1 font-weight-bold" style="color: #51566d">{{ actor.name }}</p>
        <div>
          <v-icon color="orange lighten3">mdi-cake-variant</v-icon>
          <span class="ml-2">{{ birthDate }} ({{ age }} years old) in {{ actor.place_of_birth }}</span>
        </div>
        <p class="mt-8">
          {{ actor.biography }}
        </p>

        <template v-show="movies">
          <div class="mt-8">
          <p class="font-weight-bold">Known For</p>
          <v-row class="mt-n5">
            <v-col cols="12" xs="6" sm="4" md="3" lg="2" xl="2" v-for="(movie, index) in movies" :key="index">
              <v-hover v-slot:default="{ hover }">
                <v-card flat class="pa-1"
                  :elevation="hover ? 12 : 0"
                  max-width="200"
                  link
                  :to="{name: 'movies.show', params: {id: movie.id}}"
                >
                  <v-img
                    :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
                    alt="poster"
                  >
                  </v-img>
                </v-card>
              </v-hover>
              <p class="ml-1 caption">{{movie.title}}</p>
            </v-col>
          </v-row>
        </div>
        </template>

      </v-col>
    </v-row>
    <template v-show="movies">
      <p class="pa-2 mt-12 display-1 font-weight-medium">Credits</p>
      <div v-for="(credit, index) in creditsMovies" :key="index" v-show="credit.release_date">
        {{ credit.release_date | formatYear }} &middot;
        <strong>
          <v-btn
            small
            text
            :to="{name: 'movies.show', params: {id: credit.id}}"
          >
            {{ credit.title }}
          </v-btn>
        </strong>
        as {{ credit.character }}
      </div>
    </template>
  </v-flex>
</template>

<script>
  import {mapState} from "vuex";
  import moment from "moment";

  export default {
    name: "show",
    data () {
      return {
        movies: [],
        creditsMovies: []
      }
    },

    computed: {
      ...mapState('tmDb',['actor', 'social', 'credits']),
      profilePath: function () {
        return this.actor.profile_path
          ? 'https://image.tmdb.org/t/p/w300'+this.actor.profile_path
          : 'https://ui-avatars.com/api/?size=300&name='+this.actor.name
      },
      birthDate: function () {
        if (this.actor.birthday) return moment(this.actor.birthday.toString()).format('MMM D, YYYY')
        return null
      },
      age: function () {
        if (this.actor.birthday)
          return moment().diff(moment(this.actor.birthday, 'YYYY-MM-DD'), 'years')
        return null
      }
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('tmDb/getActor', this.$route.params.id)
          .then(() => {
            if (this.credits.cast.length > 0) {
              this.movies = this.credits.cast.sort((a, b) => {
                return b.popularity - a.popularity
              }).slice(0,6)
              this.creditsMovies = this.credits.cast.sort((a, b) => {
                let dateA = new Date(a.release_date).getTime()
                let dateB = new Date(b.release_date).getTime()
                return dateA < dateB ? 1 : -1
              })
            }
          })
      },
    },
    filters: {
      formatYear : function (date) {
        if (!date) return ''
        return moment(date.toString()).format('YYYY')
      }
    },
    mounted() {
      this.initialize()
    }
  }
</script>

<style scoped>

</style>
