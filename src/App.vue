<template>
  <v-app>
    <nav-bar
      :menu-items="menuItems"
      @toggleDrawer="toggleDrawer"
      @goHome="goHome"
      @goTo="goTo"
    />

    <nav-drawer
      :drawer="drawer"
      :menu-items="menuItems"
      @offDrawer="drawer = false"
      @goHome="goHome"
      @goTo="goTo"
    />

    <v-content class="pb-5">
      <router-view/>
    </v-content>

    <v-footer absolute padless>
      <v-img src="https://picsum.photos/1920/1080?random"
             gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
             width="100%" height="48px"
      >
        <div class="pt-2 pl-4">
          <span class="white--text pt-5">
            Powered by
            <a href="https://www.themoviedb.org/documentation/api">
              <v-btn text color="primary lighten-2">
                 TMDb API
              </v-btn>
            </a>
          </span>
        </div>
      </v-img>
    </v-footer>

  </v-app>
</template>

<script>
import NavBar from "./components/Navigator/NavBar"
import NavDrawer from "./components/Navigator/NavDrawer"

export default {
  name: 'App',
  components: {
    NavBar,
    NavDrawer,
  },

  data () {
    return {
      drawer: false,
      menuItems: [
        {icon: 'mdi-movie', title: 'Movies', to: 'movies.popular'},
        {icon: 'mdi-monitor', title: 'TV Shows', to: 'tv.popular'},
        {icon: 'mdi-account-group', title: 'Actors', to: 'actors.index'},
      ],
      searchResults: []
    }
  },
  methods: {
    goHome() {
      if (this.$router.currentRoute.name !== 'movies.popular') {
        this.$router.push({name: 'movies.popular'})
      }
    },
    goTo(to) {
      if (this.$router.currentRoute.name !== to) {
        this.$router.push({name: to})
      }
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    goSearch(keyword) {
      this.$store.dispatch('tmDb/getSearchResults', keyword)
        .then(res => {
          this.searchResults = res
          if (this.searchResults.length > 0) {
            this.$refs.search.open()
          }
        })
    }
  }
}
</script>
