<template>
  <div style="height: 100%; width: 100%">
    <h1>Hello {{ tourCode }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    return {
      tourCode: params.code,
    };
  },

  data() {
    return {
      tourCode: "",
    };
  },
};
</script>
