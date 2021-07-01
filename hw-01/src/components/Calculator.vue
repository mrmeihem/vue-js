<template>
  <div class="calc">
    <h1>{{ header }}</h1>
    <div class="inputs">
      <input v-model.number="operand1"/>
      <span> {{ operation }} </span>
      <input v-model.number="operand2"/>
      = <span class="result"> {{ result }} </span>
    </div>
    <div class="buttons">
      <button v-on:click="calculate('+')">+</button>
      <button v-on:click="calculate('-')">-</button>
      <button v-on:click="calculate('*')">×</button>
      <button v-on:click="calculate('/')">÷</button>
      <button v-on:click="calculate('^')">x<sup>y</sup></button>
      <button v-on:click="calculate('%')">%</button>
    </div>
    <div class="error" v-show="errorMessage"> {{ errorMessage }} </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  props: {
    header: String
  },
  data: ()=>({
    operand1: 0,
    operand2: 0,
    operation: '•',
    result: '?',
    errorMessage: ''
  }),
  methods: {
    calculate(operation) {
      this.errorMessage = '';
      this.operation = '•';

      switch (operation) {
        case '+':
          this.operation = '+';
          this.result = this.operand1 + this.operand2;
          break;
        case '-':
          this.operation = '-';
          this.result = this.operand1 - this.operand2;
          break;
        case '*':
          this.operation = '×';
          this.result = this.operand1 * this.operand2;
          break;
        case '/':
          this.operation = '÷';
          this.division('regular');
          break;
        case '%':
          this.operation = '%';
          this.division('integer');
          break;
        case '^':
          this.operation = '^';
          this.result = Math.pow(this.operand1, this.operand2);
          break;
      }
    },
    division(type) {
      if (this.operand2 === 0) {
        this.errorMessage = 'На ноль делить нельзя';
        this.result = '?';
      } else if (type === 'regular') {
        this.result = this.operand1 / this.operand2;
      } else if (type === 'integer') {
        this.result = (this.operand1 - this.operand1 % this.operand2) / this.operand2;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .calc {
    margin: 0 auto;
    width: 480px;
    padding: 20px 0 35px;
    box-shadow: 0 9px 25px 0 rgba(0, 0, 0, 0.2);
  }
  .inputs {
    input {
      box-sizing: border-box;
      padding: 10px;
      margin: 10px;
      width: 100px;
      text-align: center;
    }
    span {
      color: gray;
    }
  }
  .result {
    display: inline-block;
    margin: 10px;
  }
  .buttons {
    display: flex;
    justify-content: center;
    button {
      box-sizing: border-box;
      margin: 10px;
      width: 46px;
      height: 46px;
    }
  }
  .error {
    color: darkred;
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
</style>