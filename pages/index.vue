<template>
  <v-row>
    <v-col cols="12" class="mt-16">
      <h1 class="text-h5 text-md-h4 font-weight-medium mb-4 primary--text">Halo Selamat Datang,</h1>
      <h2 class="text-subtitle-1 darkgray--text mb-8">
        Anda berada di halaman Reservasi Kunjungan <b>Jabar Command Center</b>.
        Anda dapat mengajukan permohonan kunjungan dengan mengisi data diri pada
        <nuxt-link class="link-reservasi" to="reservasi"
          >Form Permohonan Kunjungan</nuxt-link
        >
        , atau mengecek status permohonan anda pada halaman
        <nuxt-link class="link-reservasi" to="cek-reservasi"
          >Cek Status Permohonan.</nuxt-link
        >
      </h2>
      <h2 class="text-subtitle-1 darkgray--text font-weight-bold mb-4">Apa yang ingin anda lakukan?</h2>
    </v-col>
    <v-col cols="12" sm="12" md="6" class="mb-2" sm-justify="center">
      <nuxt-link class="link-reservasi" to="reservasi">
        <v-card
          class="card-ajukan drop-shadow"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-img src="/imghome1.svg" max-height="90" max-width="90" />
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <strong class="link-reservasi primary--text">Permohonan Reservasi</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </nuxt-link>
    </v-col>
    <v-col cols="12" sm="12" md="6" class="mb-2" sm-justify="center">
      <nuxt-link class="link-reservasi" to="cek-reservasi">
        <v-card
          class="card-permohonan drop-shadow"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-img src="/imghome2.svg" max-height="90" max-width="90" />
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <strong class="link-reservasi primary--text">Cek Status Permohonan</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </nuxt-link>
    </v-col>
    <v-col cols="12" class="mt-8">
      <HelpLink />
    </v-col>
  </v-row>
</template>
<script>
export default {};
</script>
