<template>
  <div>
    <button @click.prevent="handleCases(selectedList)">조회하기</button>
  </div>
</template>

<script>
  export default {
    name: "SubmitButton",
    props: [
      'selectedList',
      'handleCases',
    ],
  }
</script>

<style scoped>

</style>
