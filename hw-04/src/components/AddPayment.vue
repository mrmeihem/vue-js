<template>
  <div>
    sdsd {{categories}}
    <button class="addbutton" v-show="addButton" @click="addButton = !addButton">Add element</button>
    <div class="addwindow" v-show="!addButton">
      <button class="closebutton" @click="addButton = !addButton"><span>+</span></button>
      <input type="date" v-model="date" placeholder="date" />
      <select v-model.trim="category">
        <option v-for="{item, idx} in categories" :key="idx">{{ item }}</option>
      </select>
      <input v-model.number="value" type="number" placeholder="value"/>
      <button @click="onClick">
        Add Data
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: "AddPayment",
    props: {
      categories: {
        type: Array,
        default: ()=>[]
      }
    },
    data(){
        return {
            addButton: true,
            date: "",
            category: "",
            value: null
        }
    },
    methods: {
        onClick(){
            const { category, value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            this.$emit('addNewPayment', data)
        }
    },
    computed: {
        getCurrentDate() {
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        }
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