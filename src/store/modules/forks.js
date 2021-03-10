import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

export default {
    namespaced: true,
    state: {
        forks: [],
        ownerRepo: ''
    },

    getters: {
        forks(state) {
            return state.forks
        },
        ownerRepo(state) {
            return state.ownerRepo
        }
    },

    mutations: {
        loadForks(state, data) {
            state.forks = data
        },
        clearForks(state) {
            state.forks = []
        },
        setOwnerRepo(state, value) {
            state.ownerRepo = value
        }
    },

    actions: {
        async loadForks(store, params) {
            store.commit('clearForks')
            try{
                const MyOctokit = Octokit.plugin(paginateRest);
                const octokit = new MyOctokit({
                    baseUrl: 'https://api.github.com',
                })
                let response = await octokit.paginate('GET /repos/{owner}/{repo}/forks', {
                    accept: 'application/vnd.github.v3+json',
                    owner: params.owner,
                    repo: params.repo,
                    sort: "stargazers",
                    per_page: 100,
                    page: 1
                })
                store.commit('loadForks', response)
            } catch (e) {
                alert("Ошибка: " + e.message)
            }
        },
        setOwnerRepo(store, value) {
            store.commit('setOwnerRepo', value)
        }
    },

}
