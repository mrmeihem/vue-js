<template>
  <div class="container">
        <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  <div class="wrapper">
    <div class="header">{{ settings.header }} </div>
    <div class="content">
      <component
          :is="settings.name"
          :property="settings"
          @addNewPayment="eventEmmit"
      />
    </div>
    <div class="footer">
      <button @click="$modal.hide()">Close</button>
    </div>
  </div>
  </div>
</template>

<script>
import EditPayment from "./EditPayment.vue";
export default {
  components: { EditPayment },
  props: {
    settings: Object
  },
  methods: {
    eventEmmit(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  padding: 20px;
  margin-left: -270px;
  margin-top: -290px;
}

.header {
  margin: 20px;
  font-size: 24px;
}
.footer {
  margin: 20px;
}
</style>