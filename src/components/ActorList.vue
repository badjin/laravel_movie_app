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
        <div v-for="n in actor.known_for.length" :key="n">
          {{(actor.known_for[n-1].media_type === 'movie') ? actor.known_for[n-1].title : actor.known_for[n-1].name}}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: "ActorList",
    props: ['actor'],

    computed: {
      profilePath: function () {
        return this.actor.profile_path
          ? 'https://image.tmdb.org/t/p/w235_and_h235_face'+this.actor.profile_path
          : 'https://ui-avatars.com/api/?size=235&name='+this.actor.name
      }
    }
  }
</script>
