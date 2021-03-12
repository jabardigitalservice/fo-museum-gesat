<template>
  <v-main>
    <h1>Cek Permohonan Reservasi Jabar Command Center</h1>
    <v-form @submit="onFormSubmit">
      <label>Kode Reservasi </label>
      <v-text-field type="text" v-model="reservationCode" :rules="rules" />
      <v-btn color="primary" large :loading="loading" type="submit">Cek Status</v-btn>
    </v-form>
    <div v-if="error">
      <p>Mohon Maaf, Kode Reservasi tidak ditemukan</p>
    </div>
    <div v-if="showReservationInfo">
      <p>Kode Reservasi : {{ reservationInfo.reservation_code }}</p>
      <p>Nama Penganggung Jawab : {{ reservationInfo.name }}</p>
      <p>Asal Instansi : {{ reservationInfo.organization_name }}</p>
      <p>Tanggal Kunjungan : {{ formatedDate }}</p>
      <p>Waktu Kunjungan : {{ reservationInfo.shift }}</p>
      <p>Status Permohonan : {{ formatedStatus }}</p>
    </div>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      reservationCode: "",
      reservationInfo: {},
      showReservationInfo: false,
      loading: false,
      error: false,
      rules: [
        (code) => !!code || "Kode Reservasi tidak boleh kosong",
        (code) =>
          code.length <= 13 ||
          "Kode Reservasi tidak boleh melebihi 13 karakter",
      ],
    };
  },
  methods: {
    onFormSubmit(e) {
      e.preventDefault();
      if (this.formIsValid) {
        this.loading = true;
        this.getReservationInfo(this.reservationCode);
      }
    },

    formIsValid() {
      return this.$refs.form.validate();
    },

    async getReservationInfo(code) {
      try {
        const res = await this.$axios.$get(
          `https://e5801c76-cb17-4176-97ad-2fe8186697f7.mock.pstmn.io/api/command-center-reservation?keyword=${code}&by=reservation_code`
        );
        this.reservationInfo = { ...res.data[0] };
        this.loading=false;
        this.showReservationInfo = true;
      } catch (error) {
        console.error(error);
        this.loading=false;
        this.showReservationInfo = true;
      }
    },
  },
  computed: {
    formatedDate() {
      const date = new Date(this.reservationInfo.reservation_date);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    formatedStatus() {
      switch (this.reservationInfo.approval_status) {
        case "already_approved":
          return "Diterima";

        case "rejected":
          return "Ditolak";

        default:
          return "Sedang Diproses";
      }
    },
  },
};
</script>

<style scoped>
</style>
