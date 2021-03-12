<template>
  <main>
    <h1>Cek Permohonan Reservasi Jabar Command Center</h1>
    <form @submit="onFormSubmit">
      <div class="form-group">
        <label> Kode Reservasi </label>
        <input type="text" v-model="reservationCode" />
      </div>
      <button type="submit" class="button">Cek Status</button>
    </form>
    <p v-if="validationMessage">{{ validationMessage }}</p>
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
  </main>
</template>

<script>
export default {
  data() {
    return {
      reservationCode: "",
      reservationInfo: {},
      showReservationInfo: false,
      validationMessage: "",
      error: false,
    };
  },
  methods: {
    onFormSubmit(e) {
      e.preventDefault();
      if (this.formIsValid()) {
        this.getReservationInfo(this.reservationCode);
      }
    },

    formIsValid() {
      if (!this.reservationCode) {
        this.validationMessage = "Kode reservasi tidak boleh kosong";
        return false;
      } else {
        this.validationMessage = "";
        return true;
      }
    },

    async getReservationInfo(code) {
      try {
        const res = await this.$axios.$get(
          `https://e5801c76-cb17-4176-97ad-2fe8186697f7.mock.pstmn.io/api/command-center-reservation?keyword=${code}&by=reservation_code`
        );
        this.reservationInfo = { ...res.data[0] };
        this.showReservationInfo = true;
      } catch (error) {
        console.error(error);
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
.button {
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: blue;
  border: none;
}

form {
  display: flex;
}
</style>
