<template>
<v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="mt-16">
        <h1 class="text-h5 text-md-h4 font-weight-medium mb-10 primary--text">
          Cek Status Permohonan Reservasi
          <wbr>Jabar Command Center</wbr>
        </h1>
        <v-form @submit="onFormSubmit" class="mb-12" lazy-validation ref="form">
          <label class="text-subtitle-1 font-weight-medium">Kode Reservasi </label>
            <v-text-field
              type="text"
              v-model="reservationCode"
              :rules="rules"
              placeholder="contoh: JCCXXXX"
              required
              class="mb-4"
            />
            <recaptcha class="mb-6"/>
            <v-btn color="primary" large :loading="loading" type="submit" class="text-button"
              >Cek Status</v-btn
            >
        </v-form>
        <section v-if="showReservationInfo">
          <InfoTable :tableData="cleanedData" tableHeader="Informasi Reservasi" />
        </section>
        <HelpLink/>
        <AlertModal v-model="showModal" :modalData="modalData"/>
      </div>
    </v-col>
  </v-row>
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
          code.length <= 7 ||
          "Kode Reservasi tidak boleh melebihi 7 karakter",
      ],
      showModal: false,
      modalData: {},
    };
  },
  methods: {
    onFormSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.getReservationInfo(this.reservationCode);
      }
    },

    showAlert(alert) {
      this.modalData = alert;
      this.showModal = true;
    },

    async getReservationInfo(code) {
      let token = null;
      try {
        token = await this.$recaptcha.getResponse();
        await this.$recaptcha.reset();
      } catch (error) {
        token = null;
        this.loading = false;
        return this.showAlert({
          title: `Anda belum mencentang Captcha`,
          type: "warning",
          icon: "mdi-alert-circle-outline",
        });
      }

      try {
        const res = await this.$axios
          .$get(`/public/command-center-reservation/${code}`,{
            headers: {
              'recaptcha-token' : token,
            }
          })
          .catch((err) => {
            throw new Error(err.response.status);
          });
        this.reservationInfo = res.data;
        this.showReservationInfo = true;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.showReservationInfo = false;
        if (err.message === "404") {
          this.showAlert({
            title: "Mohon maaf, Kode Reservasi tidak ditemukan",
            type: "warning",
            icon: "mdi-alert-circle-outline",
          });
        } else {
          this.showAlert({
            title: "Mohon maaf, terjadi kesalahan",
            type: "error",
            icon: "mdi-close-circle-outline",
          });
        }
      }
    },
  },
  computed: {
    cleanedData() {
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
          value: this.reservationInfo.command_center_shift,
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
        case "ALREADY_APPROVED":
          this.statusType = {
            status: "success",
            background: "green",
            color: "white",
          };
          return "Diterima";

        case "REJECTED":
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

