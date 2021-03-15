<template>
  <div class="cek-reservasi">
    <h1 class="cek-reservasi__title">
      Cek Status Permohonan Reservasi
      <wbr>Jabar Command Center</wbr>
    </h1>
    <v-form @submit="onFormSubmit" class="cek_reservasi__form">
      <label class="cek-reservasi__form__label">Kode Reservasi </label>
      <div class="cek-reservasi__form__input-group">
        <v-text-field
          type="text"
          v-model="reservationCode"
          :rules="rules"
          placeholder="contoh: JCC0000000001"
        />
        <v-btn color="primary" large :loading="loading" type="submit"
          >Cek Status</v-btn
        >
      </div>
    </v-form>
    <section v-if="showReservationInfo">
      <InfoTable :tableData="cleanData" />
    </section>
    <p class="cek-reservasi__bantuan">
      Apabila anda mengalami kesulitan, silahkan menghubungi
      <a
        href="#"
        rel="noopener noreferrer"
        target="_blank"
        class="cek-reservasi__bantuan__link"
        >Pusat Bantuan Jabar Command Center</a
      >.
    </p>
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
      statusType: null,
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
        this.loading = false;
        this.showReservationInfo = false;
      }
    },
  },
  computed: {
    cleanData() {
      return [
        {
          title: "Kode Reservasi",
          value: this.reservationInfo.reservation_code,
        },
        {
          title: "Nama Penanggung Jawab",
          value: this.reservationInfo.name,
        },
        {
          title: "Asal Instansi",
          value: this.reservationInfo.organization_name,
        },
        {
          title: "Tanggal Kunjungan",
          value: this.formatedDate,
        },
        {
          title: "Waktu Kunjungan",
          value: this.reservationInfo.shift,
        },
        {
          title: "Status Permohonan",
          value: this.formatedStatus,
          type: this.statusType,
        },
      ];
    },

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
          this.statusType = "success";
          return "Diterima";

        case "rejected":
          this.statusType = "warning";
          return "Ditolak";

        default:
          this.statusType = "error";
          return "Sedang Diproses";
      }
    },
  },
};
</script>

