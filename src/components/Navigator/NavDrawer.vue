<template>
  <v-navigation-drawer
    v-model="drawer"
    dark
    app
    absolute
    temporary
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    class="items"
  >
    <v-img
      src="https://picsum.photos/1920/1080?random"
      gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      height="100%"
    >
      <v-list dense nav class="py-0">
        <v-list-item
          two-line
          :class="miniVariant && 'px-0'"
          class="mt-1"
          link
          exact
        >
          <v-img
            src="@/assets/logo.png"
            max-height="80"
            max-width="80"
            @click="goHome"
          />
          <v-list-item-content>
            Movie App
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-1" />

        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          @click="goTo(item.to)"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  props: ['drawer', 'menuItems'],
  data() {
    return {
      miniVariant: false,
      expandOnHover: false,
    };
  },

  watch: {
    drawer(val) {
      if (!val) {
        this.$emit('offDrawer');
      }
    },
  },

  computed: {},
  methods: {
    goHome() {
      this.$emit('goHome');
    },
    goTo(to) {
      this.$emit('goTo', to);
    },
  },
};
</script>

<style scoped>
.items {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
