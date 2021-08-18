<template>
  <div class="pages">
    <button class="gotoprevious" @click="goToPage('previous')">Previous</button>
    <button class="gotonext" @click="goToPage('next')">Next</button>
  </div>
</template>

<script>
export default {
  name: "PageNumber",
  props: {
    PageNumber: {
      type: Number
    }
  },
  methods: {
    goToPage(direction){
        this.$emit('newPageNumber', direction);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>