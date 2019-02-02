<template>
    <div>
        <span>shop name is: {{this.shopname}}, count: {{this.count}} <button @click="increment">increment</button></span>
        <p>GILLIAN{{ShopName}}
            The count will stay when you will move to different pages, thanks to <a href="https://github.com/championswimmer/vuex-persist">vuex-persist</a>.
            This is not a template for an SPA and should not be treated as one,
            make sure you use vue only for stuff you used to do with JQuery and not for generating content/meta tags,
            because that will hurt your SEO.
        </p>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {Slugify, GDatamapper} from '@/gUtilities/main.js'

  export default {
    props: {
      shopname: String,
    },
    name: 'ThemeComponent',
    computed:{
        ShopName: function(){


            return  Slugify('hel this is a tst');
        },
        ...mapGetters(['count'])

    },
    methods: mapMutations(['increment']),
  };
</script>
<style lang="scss" type="text/scss" scoped>
    p{
        background: red;
    @debug "HHHHH";
    }
</style>



