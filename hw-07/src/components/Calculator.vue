<template>
  <div class="calc">
    <h1>{{ header }}</h1>
    <div class="inputs">
      <input name="operand1" v-model.number="operand1"/>
      <span> {{ operation }} </span>
      <input name="operand2" v-model.number="operand2"/>
      = <span class="result"> {{ result }} </span>
    </div>
    <div class="buttons">
      <button id='sum' v-on:click="calculate('+')">+</button>
      <button id='subtr' v-on:click="calculate('-')">-</button>
      <button id='mult' v-on:click="calculate('*')">×</button>
      <button id='divd' v-on:click="calculate('/')">÷</button>
      <button id='sup' v-on:click="calculate('^')">x<sup>y</sup></button>
      <button id='rest' v-on:click="calculate('%')">%</button>
    </div>
    <hr>
    <div class="num-buttons" v-show="showNumPad">
      <div class="radiobuttons">
        <input type="radio" id="one" value="one" v-model="operandSelector" :checked="operandSelector === 'one'">
        <label for="one">Первый</label>
        <input type="radio" id="two" value="two" v-model="operandSelector">
        <label for="two">Второй операнд</label>
        <br>
      </div>
      <button v-for="item in numButtons" :key="item" :id="'button'+item" @click="numPadHandeler(item)">{{ item }}</button>
    </div>
    <div class="checkbox">
      <input type="checkbox" id="numpad" value="on/off" v-model="showNumPad">
      <label for="numpad">Показать цифровой блок</label>
    </div>
    <hr>
    <div class="error" id="error" v-show="errorMessage"> {{ errorMessage }} </div>
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
    errorMessage: '',
    opButtons: ['+','-','*','/','^','%'],
    numButtons: [7,8,9,4,5,6,1,2,3,0,'del'],
    showNumPad: false,
    operandSelector: 'one'
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
    numPadHandeler(item) {
      if (this.operandSelector === 'one' && item !== 'del') {
        this.operand1 = this.addNumber(this.operand1, item);
      } else if (this.operandSelector === 'two' && item !== 'del') {
        this.operand2 = this.addNumber(this.operand2, item);
      } else if (this.operandSelector === 'one' && item === 'del') {
        this.operand1 = this.deleteNum(this.operand1);
      } else if (this.operandSelector === 'two' && item === 'del') {
        this.operand2 = this.deleteNum(this.operand2);
      }
    },
    addNumber(operand, item) {
      if (operand === 0) {
        operand = item;
      } else {
        operand = +(operand.toString() + item); // потому что "1" + 1 = 11
      }
      return operand;
    },
    deleteNum(operand) {
      if (operand > 10) {
        operand = Math.floor(operand / 10);
      } else  {
        operand = 0;
      }
      return operand;
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
  hr {
    width: 90%;
    border: #f5f5f5 solid 1px;
  }
  .calc {
    margin: 0 auto;
    width: 480px;
    padding: 20px 0 35px;
    box-shadow: 0 9px 25px 0 rgba(0, 0, 0, 0.2);
    border-radius: 30px;
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
  .num-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 250px;
    margin: 0 auto;
    button {
      box-sizing: border-box;
      margin: 10px;
      width: 46px;
      height: 46px;
    }
    button:last-child {
      width: 112px;
    }
  }
  .radiobuttons {
    width: 100%;
  }
</style>