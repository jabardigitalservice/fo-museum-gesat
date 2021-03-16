<template>
  <article class="info-table">
    <section class="info-table__header--bg-primary">
      <h2>{{tableHeader}}</h2>
    </section>
    <section class="info-table__body">
      <ul class="pa-0">
        <li v-for="data in tableData" :key="data.title">
          <p class="info-table__body__title ma-0">{{ data.title }}</p>
          <div v-if="data.type">
            <v-chip :color="data.type.background" label :text-color="data.type.color"
              >{{ data.value }}
            </v-chip>
          </div>
          <div v-else>
            <p class="info-table__body__subtitle">
              {{ data.value }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </article>
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
