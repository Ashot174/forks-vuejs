<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search-forks">Search Forks</router-link>
    </div>
    <div>
      <input type="text" v-model="ownerRepo" placeholder="owner/repositoryName" class="forks-search">
      <button class="btn btn-primary" v-on:click="searchHandler(ownerRepo)">Search</button>
    </div>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        ownerRepo: '',
      }
    },
    mounted() {
      // console.log(this.$route.query)
      // console.log(this.$route)
      // if (this.$route.query.owner && this.$route.query.repo) {
      //   // const owner = this.ownerRepo.split('/')[0].trim();
      //   // const repo = this.ownerRepo.split('/')[1].trim();
      //   if (this.ownerRepo.length > 1 && this.ownerRepo.includes('/')){
      //     this.setOwnerRepo(this.ownerRepo);
      //   }
      //   this.$store.dispatch('forks/loadForks', {owner: this.$route.query.owner, repo: this.$route.query.repo})
      // }
      if (this.$route.query.owner && this.$route.query.repo) {
        const owner = this.$route.query.owner
        const repo = this.$route.query.repo
        const page = this.$route.query.page || 1
        this.ownerRepo = `${owner}/${repo}`
        this.$store.dispatch('forks/loadForks', {owner: owner, repo: repo})
        this.$router.push({ name: 'forksSearch', params: { owner: owner, repo: repo, page: page }})
        this.setOwnerRepo(this.ownerRepo);
      }
    },
    methods: {
      searchHandler(ownerRepo) {
        if (ownerRepo.length > 1 && ownerRepo.includes('/') && this.$route.params.owner !== ownerRepo.split('/')[0].trim() && this.$route.params.repo !==ownerRepo.split('/')[1].trim()) {
          this.$router.push({ name: 'forksSearch', params: { owner: ownerRepo.split('/')[0].trim(), repo: ownerRepo.split('/')[1].trim(), page: '1' }})
          const owner = this.ownerRepo.split('/')[0].trim();
          const repo = this.ownerRepo.split('/')[1].trim();
          this.setOwnerRepo(ownerRepo);
          this.$store.dispatch('forks/loadForks', {owner: owner, repo: repo, page: '1'})
        }
      },
      ...mapActions('forks', {
        setOwnerRepo: 'setOwnerRepo'
      })
    }
  }
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  .slide-enter-active {
    animation: slideIn 0.5s
  }
  .slide-leave-active {
    animation: slideOut 0.5s
  }
  @keyframes slideIn {
    from{transform:rotateY(90deg)}
    to{transform:rotateY(0deg)}
  }
  @keyframes slideOut {
    from{transform:rotateY(0deg)}
    to{transform:rotateY(90deg)}
  }
</style>
