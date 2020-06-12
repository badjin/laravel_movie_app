<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="pa-2" flat
      :elevation="hover ? 12 : 0"
      max-width="400"
      link
      :to="{name: 'movies.show', params: {id: movie.id}}"
    >
      <v-img
        :src="posterPath"
        alt="poster"
      >
      </v-img>
      <v-card-title>
        {{movie.title}}
      </v-card-title>
      <v-card-subtitle>
        <div>
          <v-icon color="orange lighten3">mdi-star</v-icon> {{ vote }}% | {{ release }}
        </div>
        <div>
          <span v-for="(genre, index) in filteredGenre" :key="index">
            {{genre.name}}
            <span v-if="index < filteredGenre.length-1">,</span>
          </span>

        </div>
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "MovieCard",
    props: ['movie'],
    data () {
      return {
        filteredGenre: []
      }
    },
    computed: {
      posterPath: function () {
        return this.movie.poster_path
          ? 'https://image.tmdb.org/t/p/w500/'+this.movie.poster_path
          : 'https://via.placeholder.com/500x750'
      },
      vote: function () {
        return this.movie.vote_average * 10
      },
      release: function () {
        return moment(this.movie.release_date.toString()).format('MMM D, YYYY')
      },
    },
    methods: {
      getGenre() {
        this.$store.state.tmDb.genres.forEach(genre => {
          this.movie.genre_ids.forEach(id => {
            if (id === genre.id) {
              this.filteredGenre.push(genre)
            }
          })
        })
      }
    },
    mounted() {
      this.getGenre()
    }
  }
</script>
