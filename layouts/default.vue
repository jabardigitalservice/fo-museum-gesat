<template>
  <v-app>
    <v-app-bar fixed app class="nav-logo">
      <v-spacer></v-spacer>
      <nuxt-link to="/">
        <v-img
          src="/logojcc.svg"
          alt="Jabar Command Center"
          max-height="80"
          max-width="80"
        />
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row no-gutters justify="center">
          <v-col cols="12" sm="10" md="10" lg="8" xl="6">
            <nuxt class="pt-10 pb-10" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Reservasi Command Center",
      footerText: "Jabar Command Center",
    };
  },
};
</script>
