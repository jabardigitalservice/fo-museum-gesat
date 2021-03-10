<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <h1 class="h-welcome">Selamat Datang,</h1>
        <p></p>
        <h4 class="sb-welcome">Anda berada di halaman Reservasi Kunjungan <b>Jabar Command Center</b>.
        Anda dapat mengajukan permohonan kunjungan dengan mengisi data diri 
        pada <b>Form Permohonan Kunjungan</b>, atau mengecek status permohonan anda 
        pada halaman <b>Cek Status Permohonan.</b></h4>
       <p></p>
       <h4 class="qs-welcome">Apa yang ingin anda lakukan ?</h4>
    </v-col>
    <v-col cols="12" sm="12" md="12">
    </v-col>
    <v-col cols="12" sm="8" md="6" class="ajukan-permohonan">
         <v-card
          class="mx-auto card-ajukan"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-avatar class="avatar-home" color="blue darken-2">
              <v-icon x-large dark>
                mdi-account-plus
              </v-icon>
            </v-avatar>
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <nuxt-link class="link-reservasi" to="reservasi">Ajukan Permohonan Kunjungan</nuxt-link>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
    </v-col>

   <v-col cols="12" sm="8" md="6" class="cek-permohonan">
         <v-card
          class="mx-auto card-ajukan"
          color="#E6E6E6"
          max-width="344"
          height="150"
          outlined
        >
          <v-list-item three-line>
            <v-avatar class="avatar-home" color="blue darken-2">
              <v-icon x-large dark>
                mdi-account-check
              </v-icon>
            </v-avatar>
            <v-list-item-content class="avatar-content">
              <v-list-item-subtitle class="ajukan-title">
                <a>Cek Status Permohonan</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
    </v-col>
    
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
