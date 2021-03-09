<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="brand-light"
    >
      <v-spacer></v-spacer>
      <v-img src="/logojcc.png" alt="Jabar Command Center"
      max-height="150" max-width="250"/>
      <v-spacer />
    </v-app-bar>
    <!-- <div class="overflow-hidden h-1 text-xs flex rounded bg-brand-green-light">
      <div class="shadow-none flex flex-col text-center text-white justify-center bg-brand-green" style="width: 0%;"></div>
    </div>   -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      class="footer"
      :absolute="!fixed"
      app
    >
      <span>{{ footerText }} &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Reservasi Command Center',
      footerText : 'Jabar Command Center'
    }
  }
}
</script>
