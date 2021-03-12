<template>
  <article class="cek-reservasi__reservasi-info">
    <section class="cek-reservasi__reservasi-info__header primary">
      <h2>Informasi Reservasi</h2>
    </section>
    <section class="cek-reservasi__reservasi-info__body">
      <ul>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">
            Kode Reservasi
          </p>
          <p class="cek-reservasi__reservasi-info__info-subtitle">
            {{ reservationInfo.reservation_code }}
          </p>
        </li>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">
            Nama Penganggung Jawab
          </p>
          <p class="cek-reservasi__reservasi-info__info-subtitle">
            {{ reservationInfo.name }}
          </p>
        </li>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">Asal Instansi</p>
          <p class="cek-reservasi__reservasi-info__info-subtitle">
            {{ reservationInfo.organization_name }}
          </p>
        </li>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">
            Tanggal Kunjungan
          </p>
          <p class="cek-reservasi__reservasi-info__info-subtitle">
            {{ formatedDate }}
          </p>
        </li>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">
            Waktu Kunjungan
          </p>
          <p class="cek-reservasi__reservasi-info__info-subtitle">
            {{ reservationInfo.shift }}
          </p>
        </li>
        <li>
          <p class="cek-reservasi__reservasi-info__info-title">
            Status Permohonan
          </p>
          <v-chip :color="statusType" label>
            {{ formatedStatus }}
          </v-chip>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
  props: ["reservationInfo"],
  data() {
    return {
      statusType: null,
    };
  },
  computed: {
    formatedDate() {
      const date = new Date(this.reservationInfo.reservation_date);
      console.log(this.reservationInfo);
      console.log(date);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    formatedStatus() {
      switch (this.reservationInfo.approval_status) {
        case "already_approved":
          this.statusType = "green";
          return "Diterima";

        case "rejected":
          this.statusType = "yellow";
          return "Ditolak";

        default:
          this.statusType = "red";
          return "Sedang Diproses";
      }
    },
  },
};
</script>

<style scoped>
.cek-reservasi__reservasi-info > .cek-reservasi__reservasi-info__header {
  padding: 8px 24px;
}

.cek-reservasi__reservasi-info > .cek-reservasi__reservasi-info__header > h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 180%;
  color: white;
}

.cek-reservasi__reservasi-info > .cek-reservasi__reservasi-info__body {
  padding: 30px 22px;
  border: 1px solid lightgrey;
}

.cek-reservasi__reservasi-info > .cek-reservasi__reservasi-info__body > ul {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
}

.cek-reservasi__reservasi-info
  > .cek-reservasi__reservasi-info__body
  > ul
  > li {
  list-style: none;
  margin-bottom: 24px;
}

.cek-reservasi__reservasi-info__info-title,
.cek-reservasi__reservasi-info__info-subtitle {
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 180%;
}

.cek-reservasi__reservasi-info__info-subtitle {
  color: blue;
}

@media (min-width: 600px) {
  .cek-reservasi__reservasi-info > .cek-reservasi__reservasi-info__body > ul {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
