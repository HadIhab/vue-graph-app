import Vue from "vue";
import Vuex from "vuex";
import GraphServices from '@/services/GraphServices.js'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	graphs: [],
    graphsTotal: 'salut',
  },
  mutations: {
  	SET_GRAPHS(state,graphs) {
            state.graphs = graphs
        }
  },
  actions: {
  	fetchGraphs({commit}) {
          GraphServices.getGraphs()
            .then(response => {
              commit('SET_GRAPHS',response.data)
            })
            .catch(error => {
              console.log('There was an error:', error.response)
            })
        },
    deleteGraph({commit,dispatch},graph) {
          GraphServices.deleteGraphData(graph.id)
            .then(response => {
              dispatch('fetchGraphs')
            })
            .catch(error => {
              console.log('There was an error:', error.response)
            })
    } 
  },
  modules: {},
});
