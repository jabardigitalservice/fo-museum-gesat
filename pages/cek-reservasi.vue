<template>
  <div class="cek-reservasi">
    <h1 class="cek-reservasi__title">
      Cek Permohonan Reservasi Jabar Command Center
    </h1>
    <v-form @submit="onFormSubmit" class="cek_reservasi__form">
      <label class="cek-reservasi__form__label">Kode Reservasi </label>
      <div class="cek-reservasi__form__input-group">
        <v-text-field type="text" v-model="reservationCode" :rules="rules" placeholder="contoh: JCC0000000001" />
        <v-btn color="primary" large :loading="loading" type="submit"
          >Cek Status</v-btn
        >
      </div>
    </v-form>
  </div>
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
        this.loading = false;
        this.showReservationInfo = true;
      } catch (error) {
        console.error(error);
        this.loading = false;
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
.cek-reservasi > .cek-reservasi__title {
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 150%;
  margin-bottom: 18px;
}

.cek-reservasi__form__label {
  font-weight: 600;
  font-size: 16px;
  line-height: 180%;
}

.cek-reservasi__form__input-group{
  display: flex;
}
</style>
