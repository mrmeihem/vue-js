<template>
  <div class="pages">
    <button class="gotoprevious" @click="prevousPage()">Previous</button>
    <button class="gotonext" @click="nextPage()">Next</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    elementsOnPage: {
      type: Number
    },
    startPosition: {
      type: Number
    },
    paymentsListLength: {
      type: Number
    }
  },
  methods: {
    prevousPage(){
      if (this.startPosition > 0) {
        let newStartPosition = this.startPosition - this.elementsOnPage;
        console.log(newStartPosition);
        this.$emit('newStartPosition', newStartPosition);
      }
    },
    nextPage(){
      if (this.startPosition < (this.paymentsListLength-this.elementsOnPage)) {
        let newStartPosition = this.startPosition + this.elementsOnPage;
        console.log(this.paymentsListLength);
        this.$emit('newStartPosition', newStartPosition);
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>