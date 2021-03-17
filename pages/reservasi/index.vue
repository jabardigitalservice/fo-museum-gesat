<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="5">
            <div class="pt-100"></div>
            <h1 class="font-weight-bold color-header">Form Permohonan Reservasi</h1>
            <h1 class="font-weight-bold color-header">Kunjungan Jabar Command Center</h1>
            <p></p>
            <h4 class="font-weight-regular">Harap mengisi data dibawah ini dengan sebenar-benarnya</h4>
            <div class="pt-8"></div>
            <v-form
                ref="form"
                v-on:submit.prevent="submitData()"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nama Penanggung Jawab/Nama Pengunjung *"
                :maxLength="75"
                required
                ></v-text-field>

                <v-text-field
                v-model="nik"
                :rules="nikRules"
                label="Nomor Identitas (NIK) *"
                :counter="16"
                :maxLength="16"
                required
                ></v-text-field>
                
                <v-text-field
                v-model="organization"
                :rules="organizationRules"
                label="Nama Organisasi / Instansi"
                ></v-text-field>

                <v-text-field
                v-model="organizationAddress"
                :rules="organizationAddressRules"
                label="Alamat Organisasi / Instansi"
                ></v-text-field>

                <v-text-field
                v-model="phoneNumber"
                :rules="phoneNumberRules"
                :minLength="10"
                :maxLength="13"
                :counter="13"
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
                v-model="purpose"
                :rules="purposeRules"
                :maxLength="255"
                :counter="255"
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
                        v-model="dateVisitorFormat"
                        label="Tanggal Kunjungan *"
                        hint="Bulan/Hari/Tahun"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="dateVisitor = parseDate()"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateVisitor"
                      :min="minDates"
                      :max="maxDates"
                      :allowed-dates="allowedDates"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <p></p>

                <v-select
                v-model="timeVisitor"
                :rules="timeVisitorRules"
                :hint="timeVisitor != null ? `${timeVisitor.code}, Kapasitas ${timeVisitor.capacity} Orang` : ''"
                :items="itemsShift"
                item-text="name"
                item-value="id"
                label="Waktu Kunjungan"
                @change="changeVisitors(timeVisitor,dateVisitor)"
                persistent-hint
                return-object
                single-line
              ></v-select>

                <v-text-field v-model="visitors" :rules="visitorsRules" class="jumlah-peserta" type="number" label="Jumlah Peserta" suffix="Orang" :hint="avalibilityVisitor"></v-text-field> 

                <v-checkbox
                v-model="agree"
                :rules="agreeRules"
                label="Saya menyatakan bahwa saya menyetujui 
                syarat dan ketentuan yang berlaku."
                required
                ></v-checkbox>
                
                <vue-recaptcha class="mb-5" ref="recaptcha" :sitekey="recaptcha_key" :load-recaptcha-script="true" @verify="verifyCaptcha" />

                <v-dialog
                  v-model="dialogSuccess"
                  transition="dialog-top-transition"
                  max-width="600" >
                  <template>
                    <v-card>
                      <v-card-text>
                        <v-col align="center">
                          <p></p>
                          <v-icon class="success-dialog" x-large color="green darken-2">mdi-check-circle-outline</v-icon>
                          <div class="text-h5 pa-5 green--text text--darken-2">Terima kasih! Form permohonan reservasi kunjungan berhasil terkirim.</div>
                            <v-container>
                              <div class="text-h6">Kode Reservasi anda : </div>
                              <v-text-field
                                v-model="reservationCode"
                                class="pa-5"
                                ref="textToCopy"
                                :append-outer-icon="'mdi-content-copy'"
                                filled
                                clear-icon="mdi-close-circle"
                                readonly
                                type="text"
                                @click:append-outer="copyClipboard"
                              ></v-text-field>
                            </v-container>
                        <div class="text-h7 pa-1">
                          Silahkan mengecek email anda untuk melihat kembali <b>Kode Reservasi.</b>
                          Harap menyimpan <b>Kode Reservasi</b> untuk mengetahui status permohonan 
                          anda pada halaman <nuxt-link to="cek-reservasi" class="text-decoration-none green--text text--darken-2">Cek Status Permohonan.</nuxt-link>
                        </div>
                        <div class="text-h7 pa-1">
                          <v-btn color="white--text green darken-2" @click="dialogSuccess = false">Tutup</v-btn>
                        </div>
                        </v-col> 
                      </v-card-text>
                      <v-card-actions class="justify-end">
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

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
            <div class="pt-8"></div>
        </v-col>
    </v-row>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
    components: {
      VueRecaptcha
    },
    data: vm => ({
      timeVisitor : null, reservationCode : '#', avalibilityVisitor : '',
      itemsShift: [],
      agree : false,
      agreeRules : [v => !!v || 'Kamu harus menyetujui syarat dan ketentuan yang berlaku!'],
      name: '',
      nameRules: [
        v => !!v || "Nama wajib diisi",
        v => /^[a-zA-Z\s]*$/.test(v) || 'Nama tidak boleh mengandung angka, spesial karakter dan emotikon'
      ],
      nik : '',
      nikRules : [
        v => !!v || "NIK wajib diisi",
        v => /^.{16,16}$/.test(v) || 'NIK minimal 16 digit',
        v => /^[0-9]*$/.test(v) || 'NIK tidak boleh mengandung huruf'
      ],
      organization : '',
      organizationRules: [
        v => /^[a-zA-Z]*$/.test(v) || 'Nama Organisasi tidak boleh mengandung angka, spesial karakter dan emotikon'
      ],
      organizationAddress : '',
      organizationAddressRules: [
        v => /^[a-zA-Z0-9.,-\s/\//]*$/.test(v) || 'Alamat Organisasi tidak boleh mengandung emotikon'
      ],
      phoneNumber : '',
      phoneNumberRules : [
        v => !!v || "Nomor Telepon Penanggung jawab wajib diisi",
        v => /^[0-9]*$/.test(v) || 'Nomor Telepon Penanggung jawab tidak boleh mengandung huruf'
      ],
      email: '',
      emailRules: [
          v => !!v || 'E-mail wajib diisi',
          v => /.+@.+/.test(v) || 'E-mail yang dimasukkan harus valid'
      ],
      purpose : '',
      purposeRules : [
        v => !!v || "Maksud dan Tujuan Kunjungan wajib diisi"
      ],
      dateVisitor: new Date().toISOString().substr(0, 10),
      dateVisitorRules : [
        v => !!v || 'Tanggal Kunjungan wajib diisi'
      ],
      dateVisitorFormat: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      visitors : '',
      visitorsRules : [
        v => !!v || 'Jumlah Peserta wajib diisi',
      ],
      valid : false,
      timeVisitorRules : [
        v => !!v || 'Waktu kunjungan wajib diisi',
      ],
      recaptcha_response: null, recaptcha_key: process.env.googleRecaptchaKey, dialogSuccess : false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.dateVisitor)
      },
      minDates() {
        return this.dateVisitor
      },
      maxDates() {
        var getDate         = new Date()
        var formatMaxDate   = new Date(getDate.setMonth(getDate.getMonth()+1)).toISOString().substr(0,10)
        return formatMaxDate
      },
    },

    async mounted() {
      await this.getListShift()
    },

    watch: {
      dateVisitor () {
        this.dateVisitorFormat = this.formatDate(this.dateVisitor)
      },
    },

    methods: {
      copyClipboard() {
          let textToCopy = this.$refs.textToCopy.$el.querySelector('input')
          textToCopy.select()
          document.execCommand("copy");
      },
      async getListShift() {
          this.itemsShift = await this.$axios.$get('command-center-shift')
      },
      allowedDates (val) {
        var dateNow                 = new Date()
        var dateLimitVisitor        = new Date(dateNow.setMonth(dateNow.getMonth()+1))
        
        var el = [];
        
        for (var d = new Date(); d <= dateLimitVisitor; d.setDate(d.getDate() + 1)) {
            el.push(new Date(d).toISOString().substr(0,10));
        }

        return el.indexOf(val) !== -1
      },
      async changeVisitors(val,date) {
        var checkAvailibility   = await this.$axios.get(`command-center-availability?reservation_date=${date}&shift_id=${val.id}`)
        this.avalibilityVisitor = "Kuota Peserta Sisa "+checkAvailibility.data.data.available+" Orang"
        this.visitorsRules.push(v => ( v && v <= checkAvailibility.data.data.available ) && v > 0 || "Jumlah Peserta Maksimum "+checkAvailibility.data.data.available+" Orang")
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
                  await this.$axios.post(`command-center-reservation`, 
                    {
                        'name'              : this.name,
                        'nik'               : this.nik,
                        'organization_name' : this.organization,
                        'address'           : this.organizationAddress,
                        'phone_number'      : this.phoneNumber,
                        'email'             : this.email,
                        'purpose'           : this.purpose,
                        'visitors'          : this.visitors,
                        'reservation_date'  : this.dateVisitor,
                        'shift_id'          : this.timeVisitor.id,
                    }
                  ).then((resp) => {
                      this.dialogSuccess    = true
                      this.reservationCode = resp.data.data.reservation_code
                  })
              } catch (e) {
                  const error = e.response.data
                  if (error.errors && error.errors.name) {
                    
                  }
              }
          }
      },
      verifyCaptcha (response) {
        this.recaptcha_response = response
      }
    },
}

</script>