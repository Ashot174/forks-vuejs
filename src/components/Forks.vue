<template>
    <div v-if="Object.keys(forks).length !== 0" class="offset">
        <h2></h2>
        <table class="table table-bordered">
            <tr>
                <th>Repository name</th>
                <th>Owner</th>
                <th>Count of stars</th>
                <th>reference to fork's repo</th>
                <th>Add to favorites</th>
            </tr>

            <tr v-for="fork in displayedForks">
                <td>{{fork.full_name}}</td>
                <td>{{fork.owner.login}}</td>
                <td>{{fork.stargazers_count}}</td>
                <td><a :href="`https://github.com/${fork.full_name}`">{{`Reference to ${fork.full_name} fork's repo`}}</a></td>
                <td><i class="far fa-star"  v-on:click="toggleFavorite($event, fork)" :class="getClass(fork.full_name)"></i></td>
            </tr>

        </table>
        <nav aria-label="Page navigation example" class="navigation">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" v-if="page != 1" @click="page--"> Previous </a>
                </li>
                <li class="page-item">
                    <a class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </a>
                </li>
                <li class="page-item">
                    <a  @click="page++" v-if="page < pages.length" class="page-link"> Next </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Forks",
        props: {
            ownerRepo: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                page: 1,
                perPage: 20,
                pages: [],
            }
        },
        computed: {
            ...mapGetters('forks', {
                forks: 'forks'
            }),

            displayedForks() {
                return this.paginate(this.forks);
            }
        },
        methods: {
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.forks.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },

            paginate (forks) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  forks.slice(from, to);
            },
            toggleFavorite(e, fork){
                e.target.classList.toggle('favorite')
                if (localStorage.getItem(fork.full_name) === null) {
                    localStorage.setItem(fork.full_name, `https://github.com/${fork.full_name}`)
                } else {
                    localStorage.removeItem(fork.full_name);
                }

            },
            getClass(key){
                return localStorage.getItem(key) === null ? null : 'favorite'
            }
        },
        watch: {
            forks () {
                this.setPages();
            }
        },

        filters: {
            trimWords(value){
                return value.split(" ").splice(0,20).join(" ") + '...';
            }
        },
        mounted() {
            this.setPages()
        }
    }
</script>

<style scoped>
    a.page-link {
        display: inline-block;
    }
    a.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .page-item:hover {
        cursor: pointer;
    }
    .offset{
        width: 90% !important;
        margin: 50px auto;
    }
    .pagination {
        justify-content: center;
    }
    .forks-search{
        width: 25%;
    }
    table td > i:hover {
        color: #e68f2a;
        cursor: pointer;
    }
    .favorite{
        color: green;
    }
</style>
