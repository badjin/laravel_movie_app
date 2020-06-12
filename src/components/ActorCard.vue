<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="pa-2" flat
      :elevation="hover ? 12 : 0"
      link
      :to="{name: 'actors.show', params: {id: actor.id}}"
    >
      <v-img
        :src="profilePath"
        alt="profile"
      >
      </v-img>
      <v-card-subtitle class="subtitle-2 font-italic font-weight-bold">
        {{actor.name}}
      </v-card-subtitle>
      <v-card-text class="mt-n2">
        {{actor.character}}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: "ActorCard",
    props: ['actor'],
    data () {
      return {
        filteredGenre: []
      }
    },
    computed: {
      profilePath: function () {
        return this.actor.profile_path
          ? 'https://image.tmdb.org/t/p/w500/'+this.actor.profile_path
          : 'https://ui-avatars.com/api/?size=500&name='+this.actor.name
      },
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
