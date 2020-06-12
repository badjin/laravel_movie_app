<template>
  <v-app-bar
    app dark
    src="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click.stop="drawer" />
    <v-btn
      fab text
      class="mx-2 hidden-xs-only"
      @click="goHome"
    >
      <v-img src="@/assets/logo.png"
             max-height="80"
             max-width="80"
             class="mt-n3"
      />
    </v-btn>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn text v-for="item in menuItems" :key="item.title" @click="goTo(item.to)">
        <v-icon left dark>{{ item.icon }}</v-icon>
        <span class="hidden-sm-and-down">{{ item.title }}</span>
      </v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items>
      <v-card class="transparent" elevation="0">
        <v-card-text >
          <v-text-field
            ref="focus"
            clearable
            hide-details
            maxlength="1023"
            v-model="keyword"
            placeholder="Search (Press '/' to focus)"
            prepend-icon="mdi-magnify"
            @keyup.enter="goSearch"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <search-results ref="search" :movies="searchResults"/>

      </v-card>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import SearchResults from "../SearchResults"

  export default {
    name: "NavBar",
    props: ['menuItems'],
    components: {
      SearchResults
    },
    data () {
      return {
        keyword: '',
        loading: false,
        searchResults: []
      }
    },

    methods: {
      goHome() {
        this.$emit('goHome')
      },
      goTo(to) {
        this.$emit('goTo', to)
      },
      goSearch() {
        this.$store.dispatch('tmDb/getSearchResults', this.keyword)
          .then(res => {
            this.keyword = ''
            this.searchResults = res
            if (this.searchResults.length > 0) {
              this.$refs.search.open()
            }
          })
      },
      drawer() {
        this.$emit('toggleDrawer')
      },
    },
    created() {
      window.addEventListener('keyup', e => {
        if (e.key === '/') {
          e.preventDefault()
          this.$refs.focus.focus()
          this.$refs.search.cancel()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          this.$refs.search.cancel()
        }
      })
    }
  }
</script>
