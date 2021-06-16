<template>
  <div class="home">
  	<Table :allDBgraphs="graphs" @ask-delete-action="ask_Del_Graph"
  		@edit-action="editGraph" @show-action="show_Stat_Graph"
  	/>
  	    <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        <h3>Are you sure you want to delete this graph!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteGraph">Delete</b-button>
    </b-modal>
  </div>
</template>


<script>
	import Table from "@/components/Table.vue";
	import { mapState } from 'vuex'


	export default {
	  name: "Home",
	  components: {
	    Table
	  },
	  data () {
	    return {
	    	deleted_graph: {}
	    }
	  },
	  created() {
	  	this.$store.dispatch('fetchGraphs',{})
	  	.
        then(()=>{
        	this.hideModal()
        })
	  },
	  methods:{
	  	deleteGraph() {
	  		this.$store.dispatch('deleteGraph',this.deleted_graph)
	  		this.hideModal()
	  	},
	  	editGraph(graph) {
	  	  this.$router.push({
          	name: 'graphEdition',
          	params: { id: graph }
        	})	
	  	},
	  	show_Stat_Graph(graph) {
	  	  this.$router.push({
          	name: 'graphStatistics',
          	params: { id: graph }
        	})	
	  	},
	  	ask_Del_Graph(graph) {
	  		this.deleted_graph = graph
	  		this.showModal()
	  	},
        showModal() {
          this.$refs['my-modal'].show()
        },
	    hideModal() {
	      this.$refs['my-modal'].hide()
	    }   
	  },
	  computed:{
	    ...mapState(['graphs'])
	  }
	};
</script>
