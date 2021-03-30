<template>
  <v-dialog v-model="show" max-width="650px">
    <v-card class="pa-2">
      <v-card-title class="primary--text mb-2"> Syarat dan Ketentuan </v-card-title>
      <v-card-text class="text-subtitle-1">
        <p class="mb-2">
          Jabar Command Center merupakan fasilitas publik yang dikelola oleh
          Pemerintah Provinsi Jawa Barat. Saat ini Jabar Command Center menerapkan pembatasan berupa kuota
          kunjungan sebagai bagian dari adaptasi kebiasaan baru dan penerapan
          protokol kesehatan.
        </p>
        <p>
          Silakan lakukan reservasi kunjungan dengan selalu menggunakan masker
          dan tetap patuhi protokol kesehatan yang ada.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click.stop="show = false">Tutup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
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
  },
};
</script>

<style>
</style>
