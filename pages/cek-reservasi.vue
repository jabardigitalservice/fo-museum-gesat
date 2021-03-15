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
      <InfoTable :tableData="cleanData" tableHeader="Informasi Reservasi" />
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
import { formatedDate } from "../utils/formatedDate";
export default {
  data() {
    return {
      reservationCode: "",
      reservationInfo: {},
      showReservationInfo: false,
      loading: false,
      error: false,
      statusType: {},
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
          `${process.env.baseUrl}/api/command-center-reservation?keyword=${code}&by=reservation_code`
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
          value: formatedDate(this.reservationInfo.reservation_date),
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

    formatedStatus() {
      switch (this.reservationInfo.approval_status) {
        case "already_approved":
          this.statusType = {
            status: "success",
            background: "green",
            color: "white",
          };
          return "Diterima";

        case "rejected":
          this.statusType = {
            status: "danger",
            background: "red",
            color: "white",
          };
          return "Ditolak";

        default:
          this.statusType = {
            status: "warning",
            background: "yellow",
            color: "black",
          };
          return "Sedang Diproses";
      }
    },
  },
};
</script>

