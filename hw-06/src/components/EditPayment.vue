<template>
  <div>
    <div class="addwindow">
      <input type="date" v-model="date" />
      <select v-model.trim="category">
        <option v-for="item in categories" :key="item" v-bind:item="item">{{ item }}</option>
      </select>
      <input type="number" v-model.number="value" />
      <button @click="onClick">
        Save Data
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "EditPayment",
    props: {
      settings: Object},
    data(){
        return {
            id: 0,
            date: "",
            category: "",
            value: 0
        }
    },
    methods: {
      onClick(){
        const { category, value, date, id } = this
        const data = {
          category,
          value,
          date,
          id
        }
        console.log(data);
        this.$store.commit('saveEditedEntryPaymentList', data);
        this.$context.close();
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getCategoryList',
      }),
    },
    mounted(){
      const element = this.$attrs.property.settings;
      this.date = element.date;
      this.category = element.category;
      this.value = element.value;
      this.id = element.id;
    }
}
</script>

<style lang="scss" scoped>
  .addbutton {
    box-sizing: border-box;
    padding: 10px;
    background-color: transparent;
    border: #0085a3 solid 1px;
    text-transform: uppercase;
  }
  .closebutton {
    box-sizing: border-box;
    padding: 10px;
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    position: absolute;
    top: -12px;
    right: -7px;
    span {
      transform: rotate(45deg);
      display: block;
      font-size: 1.8em;
    }
  }
  .addwindow {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    width: 500px;
    border: #0085a3 solid 1px;
    position: relative;
    input {
      height: 23px;
    }
    input:first-child {
      height: 25px;
    }
    select {
      padding: 5px;
    }
  }
</style>