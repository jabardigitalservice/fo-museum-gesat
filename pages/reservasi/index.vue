<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="5">
            <p></p>
            <h1 class="bform-header">Form Permohonan Reservasi</h1>
            <h1 class="bform-header">Kunjungan Jabar Command Center</h1>
            <p></p>
            <h3 class="sbform-header">Harap mengisi data dibawah ini dengan sebenar-benarnya</h3>
            <div class="pt-8"></div>
            <v-form
                ref="form"
                v-on:submit.prevent="submitData()"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                v-model="nama"
                :rules="namaRules.concat(requiredNamaRules)"
                label="Nama Penanggung Jawab/Nama Pengunjung *"
                required
                ></v-text-field>

                <v-text-field
                v-model="nik"
                :rules="nikRules.concat(requirednikRules)"
                label="Nomor Identitas (NIK) *"
                :counter="16"
                :maxLength="16"
                required
                ></v-text-field>
                
                <v-text-field
                v-model="organisasi"
                :rules="organisasiRules"
                label="Nama Organisasi / Instansi *"
                required
                ></v-text-field>

                <v-text-field
                v-model="alamatOrganisasi"
                :rules="alamatOrganisasiRules"
                label="Alamat Organisasi / Instansi *"
                required
                ></v-text-field>

                <v-text-field
                v-model="notlp"
                :rules="notlpRules.concat(notlpNumberRules)"
                label="Nomor Telepon Penanggung Jawab *"
                required
                ></v-text-field>
                
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Alamat Email *"
                required
                ></v-text-field>

                <v-textarea
                name="input-maksudTujuan"
                v-model="maksudTujuanKunjungan"
                :rules="maksudTujuanKunjunganRules"
                label="Maksud dan Tujuan Kunjungan"
                value=""
                hint="Isi Pesan"
                ></v-textarea>
                <p></p>
                 <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="tanggalKunjunganFormat"
                        label="Tanggal Kunjungan *"
                        hint="Bulan/Hari/Tahun"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="tanggalKunjungan = parseDate()"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="tanggalKunjungan"
                      :rules="maksudTujuanKunjunganRules"
                      :min="minDates"
                      :max="maxDates"
                      :allowed-dates="allowedDates"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <p></p>

                 <v-select
                :items="itemsShift"
                v-model="waktuKunjungan"
                :rules="waktuKunjunganRules"
                label="Waktu Kunjungan"
                ></v-select>

                <v-text-field v-model="jumlahPeserta" :rules="jumlahPesertaRules" class="jumlah-peserta" type="number" label="Jumlah Peserta" suffix="Orang"></v-text-field> 

                <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'Kamu harus menyetujui syarat dan ketentuan yang berlaku!']"
                label="Saya menyatakan bahwa saya menyetujui 
                syarat dan ketentuan yang berlaku."
                required
                ></v-checkbox>
                
                <v-btn block color="success" type="submit" :disabled="!valid">
                  Kirim Permohonan
                </v-btn>
                <p></p>
                <nuxt-link to="/" class="btn-batalkan">
                  <v-btn block color="error">
                      Batalkan
                  </v-btn>
                </nuxt-link>

            </v-form>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data: vm => ({
      tanggalKunjungan: new Date().toISOString().substr(0, 10),
      tanggalKunjunganFormat: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      itemsShift: ['09.00-12.00', '13.00-16.00'],
      nama: '',
      namaRules: [
        v => !!v || "Nama wajib diisi"
      ],
      requiredNamaRules : [
        v => /[a-zA-Z]+$/.test(v) || 'Nama tidak boleh mengandung angka'
      ],
      nik : '',
      nikRules : [
        v => !!v || "NIK wajib diisi",
        v => /^.{16,16}$/.test(v) || 'NIK minimal 16 digit'
      ],
      requirednikRules : [
        v => /[0-9]+$/.test(v) || 'NIK tidak boleh mengandung huruf'
      ],
      organisasi : '',
      organisasiRules : [
        v => !!v || "Nama Organisasi / Instansi wajib diisi"
      ],
      alamatOrganisasi : '',
      alamatOrganisasiRules : [
        v => !!v || "Alamat Organisasi / Instansi wajib diisi"
      ],
      notlp : '',
      notlpRules : [
        v => !!v || "Nomor Telepon Penanggung jawab wajib diisi"
      ],
      notlpNumberRules : [
         v => /[0-9]+$/.test(v) || 'Nomor Telepon Penanggung jawab tidak boleh mengandung huruf'
      ],
      email: '',
      emailRules: [
          v => !!v || 'E-mail wajib diisi',
          v => /.+@.+/.test(v) || 'E-mail yang dimasukkan harus valid'
      ],
      maksudTujuanKunjungan : '',
      maksudTujuanKunjunganRules : [
        v => !!v || "Maksud dan Tujuan Kunjungan wajib diisi"
      ],
      tanggalKunjungan : '',
      tanggalKunjunganRules : [
        v => !!v || 'Tanggal Kunjungan wajib diisi'
      ],
      jumlahPeserta : '',
      jumlahPesertaRules : [
        v => !!v || 'Jumlah Peserta wajib diisi',
        v => ( v && v <= 30 ) || "Jumlah Peserta maksimal 30 Orang",
      ],
      valid : false, checkbox: false, waktuKunjungan : '', 
      waktuKunjunganRules : [
        v => !!v || 'Waktu kunjungan wajib diisi',
      ]
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.tanggalKunjungan)
      },
      minDates() {
        return this.tanggalKunjungan
      },
      maxDates() {
        var getDate         = new Date()
        var formatMaxDate   = new Date(getDate.setMonth(getDate.getMonth()+1)).toISOString().substr(0,10)
        return formatMaxDate
      },
    },

    watch: {
      tanggalKunjungan (val) {
        this.tanggalKunjunganFormat = this.formatDate(this.tanggalKunjungan)
      },
    },

    methods: {
      allowedDates (val) {
        var tanggalSekarang         = new Date()
        var tanggalBatasKunjungan   = new Date(tanggalSekarang.setMonth(tanggalSekarang.getMonth()+1))
        
        var el = [];
        
        for (var d = new Date(); d <= tanggalBatasKunjungan; d.setDate(d.getDate() + 1)) {
            el.push(new Date(d).toISOString().substr(0,10));
        }

        return el.indexOf(val) !== -1
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate () {
        var date = new Date().toISOString().substr(0, 10)
        var dateFormatted = this.formatDate(date)
        const [month, day, year] = dateFormatted.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      async submitData () {
          if (this.$refs.form.validate()) {
            try {
              var postData    = []
              var app         = this;

              postData.push(
                  {
                      'name'              : app.nama,
                      'nik'               : app.nik,
                      'organization_name' : app.organisasi,
                      'address'           : app.alamatOrganisasi,
                      'phone_number'      : app.notlp,
                      'email'             : app.email,
                      'purpose'           : app.maksudTujuanKunjungan,
                      'visitors'          : app.jumlahPeserta,
                      'reservation_date'  : app.tanggalKunjungan,
                      'shift_id'          : 1,
                  }
              );
              await this.$axios.post(`command-center-reservation`, postData[0])
                  alert('masuk')
              } catch (e) {
              
              }
          }
      },
      // submitData() {
      //   var app = this;
      //   if (this.$refs.form.validate()) {
      //     var urlBase     = '/api/command-center-reservation';
      //     var postData    = []
      //     postData.push(
      //         {
      //             'name'        : app.nama,
      //             // 'nik'         : app.nik,
      //             // 'organization_name'    : app.passport,
      //             // 'address'         : app.tlp,
      //             // 'phone_number'          : app.kk,
      //             // 'email'       : app.email,
      //             // 'purpose'      : app.alamat,
      //             // 'visitors'         : this.$refs.ktp.value,
      //             // 'reservation_date'        : this.$refs.visa.value,
      //             // 'shift' : this.$refs.kartukuning.value,
      //         }
      //     );

      //     axios.patch(urlBase, postData[0])
      //       .then((resp) => {
            
      //       })
      //       .catch((resp) =>{
            
      //       });

      //   }
      // },
    },
}

</script>