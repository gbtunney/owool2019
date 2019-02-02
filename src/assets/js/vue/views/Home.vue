<template>
  <div class="home">


    <vue-numeric-input  :min="1" :max="10" :step="2"></vue-numeric-input>


    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import VueNumericInput from 'vue-numeric-input'

export default {
  name: 'home',
  components: {
    HelloWorld,

      VueNumericInput
  }
}


</script>
