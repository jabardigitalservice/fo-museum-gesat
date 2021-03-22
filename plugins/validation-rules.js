export default ({
  app
}, inject) => {
  inject('emailRules', v => [
    (v) => !!v || "E-mail wajib diisi",
    (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "E-mail yang dimasukkan harus valid",
  ])

  inject('phoneNumberRules', v => [
    (v) => !!v || "Nomor Telepon Penanggung jawab wajib diisi",
    (v) => /^.{10,13}$/.test(v) || "Nomor Telepon minimal 10 digit",
    (v) => /^[0-9]*$/.test(v) || "Nomor Telepon Penanggung jawab tidak boleh mengandung huruf",
    // (v) => /^0{1}8{1}[0-9]{8,11}$/g.test(v) || 'Format Nomor Telepon tidak benar',
  ])

  inject('purposeRules', v => [
    (v) => !!v || "Maksud dan Tujuan Kunjungan wajib diisi",
    (v) => /[^-\s]+$/.test(v) || "Format pengisian tidak diizinkan",
  ])

  inject('agreeRules', v => [
    (v) => !!v || "Kamu harus menyetujui syarat dan ketentuan yang berlaku!",
  ])

  inject('nameRules', v => [
    (v) => !!v || "Nama wajib diisi",
    (v) => /^[a-zA-Z\s']*$/.test(v) || "Nama tidak boleh mengandung angka, spesial karakter dan emotikon",
    (v) => /[^-\s]+$/.test(v) || "Format pengisian tidak diizinkan",
  ])

  // NIK Rules
  const allowedPrefix = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21',
    '31', '32', '33', '34', '35', '36', '51', '52', '53', '61',
    '62', '63', '64', '65', '71', '72', '73', '74', '75', '76',
    '81', '82', '91', '92'
  ]

  inject('nikRules', v => [
    (v) => !!v || "NIK wajib diisi",
    (v) => /^.{16,16}$/.test(v) || "NIK minimal 16 digit",
    (v) => /^[0-9]*$/.test(v) || "NIK tidak boleh mengandung huruf",
    (v) => allowedPrefix.includes(v.substring(0, 2)) && /^[1-9]{1}[0-9]{11}(?!0{4})[0-9]{4}$/g.test(v) || "Format NIK tidak benar"
  ])

  inject('organizationRules', v => [
    (v) => /^[a-zA-Z0-9'\s]*$/.test(v) || "Nama Organisasi tidak boleh mengandung spesial karakter dan emotikon",
  ])

  inject('organizationAddressRules', v => [
    (v) => /^[a-zA-Z0-9.,-\s/\//]*$/.test(v) || "Alamat Organisasi tidak boleh mengandung emotikon atau simbol",
  ])

  inject('timeVisitorRules', v => [
    (v) => !!v || "Waktu kunjungan wajib diisi"
  ])

}
