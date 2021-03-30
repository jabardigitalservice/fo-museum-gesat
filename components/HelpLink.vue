<template>
  <p class="text-subtitle-1">
    Apabila anda mengalami kesulitan, silakan menghubungi
    <a
      target="_blank"
      :href="`https://wa.me/${phoneNumber}?text=${messages}`"
      rel="noopener noreferrer"
      class="text-subtitle-1 font-weight-bold primary--text text-decoration-none"
      >Pusat Bantuan Jabar Command Center</a
    >.
  </p>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: process.env.phoneNumber,
      messages: process.env.messages,
    };
  },
};
</script>
