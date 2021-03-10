<template>
  <div>
    <Forks :ownerRepo="ownerRepo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Forks from '@/components/Forks.vue'

export default {
  name: 'ForksSearch',
  components: {
    Forks
  },
    computed: {
        ownerRepo(){
            return this.$store.getters['forks/ownerRepo']
        }
    },
}
</script>

<style scoped>


</style>
