<template>
  <v-container fluid fill-height >
    <v-layout justify-center class="pb-5">
      <v-flex xs24 sm10 md10 lg10 xl10>
        <v-row class="pa-2 mt-12">
          <v-col cols="12" sm="4" md="4" lg="4" max-width="400">
            <v-img
              max-width="400"
              :src="posterPath"
              alt="poster"
            >
            </v-img>
          </v-col>
          <v-col class="ml-12">
            <p class="display-1 font-weight-medium">{{ movie.title }}</p>
            <div>
              <v-icon color="orange lighten3">mdi-star</v-icon>
              {{ voteAverage }}% | {{ releaseDate }} |
              <span v-for="(genre, index) in movie.genres" :key="index">
                {{genre.name}}<span v-if="index < movie.genres.length-1">,</span>
              </span>
            </div>
            <div class="mt-8">
              <p>{{ movie.overview }}</p>
            </div>
            <div class="mt-8">
              <p class="font-weight-bold">Featured Crew</p>
              <v-row class="mt-n5">
                <v-col cols="12" sm="6" md="4">
                  <div>{{ director.name }}</div>
                  <div class="caption">{{ director.job }}</div>
                </v-col>
                <v-col>
                  <div>{{ editor.name }}</div>
                  <div class="caption">{{ editor.job }}</div>
                </v-col>
              </v-row>
            </div>
            <div class="mt-8">
              <v-btn
                large
                color="orange lighten 3"
                @click="playTrailer"
              >
                <v-icon>mdi-youtube</v-icon>
                Play Trailer
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <p class="pa-2 mt-12 display-1 font-weight-medium">Cast</p>
        <v-row>
          <v-col cols="12" xs="12" sm="4" md="3" lg="2" xl="2" v-for="(actor, index) in actors" :key="index">
            <actor-card :actor="actor"/>
          </v-col>
        </v-row>
        <p class="pa-2 mt-12 display-1 font-weight-medium">Images</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="4" v-for="(image, index) in images" :key="index">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                link
                @click="showImage(index)"
              >
                <v-img
                  :src="`https://image.tmdb.org/t/p/w500/${image.file_path}`"
                  alt="image1"
                >
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <iFramePlayer ref="iframe" :media="media" :trailer="trailer" />
  </v-container>
</template>

<script>
  import {mapState} from "vuex"
  import moment from "moment"
  import ActorCard from "../../components/ActorCard"
  import iFramePlayer from "../../components/iFramePlayer"

  export default {
    name: "show",
    components: {
      ActorCard,
      iFramePlayer
    },
    mounted() {
      this.initialize()
    },
    data () {
      return {
        media: '',
        trailer: false
      }
    },
    computed: {
      ...mapState('tmDb',['movie']),
      posterPath: function () {
        return this.movie.poster_path
          ? 'https://image.tmdb.org/t/p/w500/'+this.movie.poster_path
          : 'https://via.placeholder.com/500x750'
      },
      voteAverage: {
        get () {
          return this.movie.vote_average * 10
        }
      },
      releaseDate: function () {
        return moment(this.movie.release_date.toString()).format('MMM D, YYYY')
      },
      director: function () {
        return this.movie.credits.crew.find(c => c.job === 'Director')
      },
      editor: function () {
        let crew = this.movie.credits.crew.find(c => c.job === 'Editor')
        if (!crew) {
          let screenPlay =  this.movie.credits.crew.find(c => c.job === 'Screenplay')
          if (screenPlay) return screenPlay
          return { name: 'Nobody', job: 'Screenplay'}
        }
        return this.movie.credits.crew.find(c => c.job === 'Editor')
      },
      actors: function () {
        return this.movie.credits.cast.slice(0,6)
      },
      images: function () {
        return this.movie.images.backdrops.slice(0,9)
      },
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('tmDb/getMovie', this.$route.params.id)
      },
      playTrailer() {
        if (this.movie.videos.results.length > 0) {
          this.trailer = true
          this.media = "https://www.youtube.com/embed/"+this.movie.videos.results[0].key
          this.$refs.iframe.open()
        }
      },
      showImage(index) {
        if (this.movie.images.backdrops.length > 0) {
          this.trailer = false
          this.media = "https://image.tmdb.org/t/p/original"+this.movie.images.backdrops[index].file_path
          this.$refs.iframe.open()
        }
      }
    }
  }
</script>
