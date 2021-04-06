<template>
  <v-card outlined class="mb-12">
    <v-card-title class="pa-3 ps-6 primary">
      <h2 class="text-subtitle-1 font-weight-bold white--text">
        {{ tableHeader }}
      </h2>
    </v-card-title>
    <v-container class="pa-4 ps-6">
      <v-row no-gutters>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          v-for="data in tableData"
          :key="data.title"
          class="mb-4 mb-md-8"
        >
          <p class="text-subtitle-1 font-weight-medium mb-1">
            {{ data.title }}
          </p>
          <div v-if="data.type">
            <v-chip
              :color="data.type.background"
              label
              :text-color="data.type.color"
              >{{ data.value }}
            </v-chip>
          </div>
          <div v-else>
            <p class="text-subtitle-1 font-weight-medium primary--text mb-0">
              {{ data.value ? data.value : "-" }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    tableHeader: {
      type: String,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      statusType: null,
    };
  },
};
</script>
