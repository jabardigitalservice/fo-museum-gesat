<template>
  <v-dialog v-model="showModal" max-width="800px">
    <v-card v-if="modalData">
      <v-card-title>
        <h4>{{modalData.title}}</h4>
      </v-card-title>
      <v-card-subtitle>
        <p>
          Silahkan menghubungi Pusat Bantuan Jabar Command Center apabila anda
          membutuhkan bantuan
        </p>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click.stop="closeDialog" :class="modalData.type">Tutup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: true,
    },
    modalData: {
      type: Object
    }
  },
  data(){
    return {
      showModal: this.modal
    }
  },
  methods: {
    closeDialog(){
      this.showModal = false
    }
  }
};
</script>

<style>
</style>
