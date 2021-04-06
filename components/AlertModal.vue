<template>
  <v-dialog v-model="show" max-width="650px">
    <v-card v-if="modalData" class="pa-4">
      <v-flex align-self-center class="text-center">
        <div v-if="modalData.icon">
          <v-icon size="95px" :color="modalData.type"
            >{{ modalData.icon }}
          </v-icon>
        </div>
        <v-card-title class="text-center justify-center text-wrap">
          <p class="title" :style="{'word-break' : 'normal'}">{{ modalData.title }}</p>
        </v-card-title>
        <v-card-subtitle class="text-center">
          <HelpLink/>
        </v-card-subtitle>
        <v-card-actions class="text-center justify-center">
          <v-btn @click.stop="show = false" :class="getButtonClass"
            >Tutup</v-btn
          >
        </v-card-actions>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
    modalData: {
      type: Object,
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    getButtonClass(){
      return this.modalData.type || 'primary'
    }
  },
};
</script>
