<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" offset-md="1">
      <h1 class="h-welcome pb-5">Halo Selamat Datang,</h1>
      <h4 class="sb-welcome">
        Anda berada di halaman Reservasi Kunjungan <b>Jabar Command Center</b>.
        Anda dapat mengajukan permohonan kunjungan dengan mengisi data diri pada
        <nuxt-link class="link-reservasi" to="reservasi"
          >Form Permohonan Kunjungan</nuxt-link
        >
        , atau mengecek status permohonan anda pada halaman
        <nuxt-link class="link-reservasi" to="cek-reservasi"
          >Cek Status Permohonan.</nuxt-link
        >
      </h4>
      <h4 class="qs-welcome">Apa yang ingin anda lakukan ?</h4>
    </v-col>
    <v-col cols="12" sm="8" md="4" align="center">
      <nuxt-link class="link-reservasi" to="reservasi">
        <v-card
          class="mx-auto card-ajukan"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-img src="/imghome1.svg" max-height="90" max-width="90" />
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <strong class="link-reservasi"
                  >Permohonan Reservasi</strong
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </nuxt-link>
    </v-col>
    <v-col cols="12" sm="8" md="4" align="center">
      <nuxt-link class="link-reservasi" to="cek-reservasi">
        <v-card
          class="mx-auto card-permohonan"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-img src="/imghome2.svg" max-height="90" max-width="90" />
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <strong class="link-reservasi">Cek Status Permohonan</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </nuxt-link>
    </v-col>
    <v-col cols="12" align="center" sm="8" md="8">
      <HelpLink/>
    </v-col>
    <v-col cols="12" sm="12" md="12"></v-col>
  </v-row>
</template>
<script>
export default {};
</script>
