<template>
  <transition name="fade">
    
    <div class="menu-window" v-if="showMenuWindow" :style="styles">
      <div class="arrow"></div>
      <div class="panel">
        <button @click="editPayment()">Edit</button>
        <button @click="deletePayment()">Delete</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "MenuWindow.vue",
  data () {
    return {
      item: 0,
      showMenuWindow: false,
      xPos: 0,
      yPos: 0,
  }
},
  methods: {
    ...mapMutations([
      'deleteEntryPaymentList'
    ]),
    editPayment() {
      this.$modal.show('EditPayment',{header:"Edit your Payment", settings:this.item})
      console.log(this.item)
      this.$context.close();
    },
    deletePayment(){
      const approval = prompt('Type "y" if you really want to delete the entry')
      if (approval === 'y'.toLowerCase()) {
        this.deleteEntryPaymentList(this.item);
        this.$context.close();
      }
    },
    onClick(item){
      item.action()
  },
    onShow({ item, caller }) {
      this.item = item
      this.showMenuWindow = true
      this.setPosition (caller)
  },
    setPosition(caller){
      const computed = caller.getBoundingClientRect()
      this.xPos = computed.left
      this.yPos = computed.top
  },
    onClose(){
      this.items = []
      this.showMenuWindow = false
  }
},
  computed: {
  styles(){
    return {
    top: `${this.yPos - 20}px`,
    left: `${this.xPos + 35}px`
    }
  }
},
  mounted(){
  this.$context.EventBus.$on('showMenuWindow', this.onShow)
  this.$context.EventBus.$on('close', this.onClose)
},
  beforeDestroy(){
  this.$context.EventBus.$off('showMenuWindow', this.onShow)
  this.$context.EventBus.$off('close', this.onClose)
}
}
</script>

<style lang="scss">
  .menu-window {
    width: 100px;
    height: 70px;
    position: absolute;
    z-index: 100;
    left: -30px;
    top: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  .arrow {
    border: solid transparent;
    height: 0;
    width: 0;
    border-right-color: #333;
    border-width: 10px;
  }
  .panel {
    background: #333;
    padding: 5px;
    text-align: start;
    button {
      margin: 5px;
      width: 80px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>