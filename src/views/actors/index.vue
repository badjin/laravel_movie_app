<template>
  <v-container>
    <v-row class="pa-2">
      <v-col cols="12" xs="12" sm="4" md="3" lg="3" xl="2" v-for="(actor, $index) in actorsList" :key="$index">
        <actor-list :actor="actor" />
      </v-col>
      <infinite-loading @infinite="initialize"></infinite-loading>
    </v-row>
  </v-container>

</template>

<script>
  import ActorList from "../../components/ActorList"

  export default {
    components: {
      ActorList
    },
    data () {
      return {
        page: 1,
        actorsList: []
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      initialize($state) {
        this.$store.dispatch('tmDb/getDataFromTMDB', {
          path: 'person/popular',
          page: this.page
        })
          .then(res => {
            if (res.length && this.page < 10) {
              this.page += 1
              this.actorsList.push(...res)
              $state.loaded()
            }
            else $state.complete()
          })
      },
    },

  }
</script>
