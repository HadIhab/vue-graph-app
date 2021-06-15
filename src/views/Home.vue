<template>
  <div class="home">
  	<Table :allDBgraphs="graphs" @delete-action="deleteGraph"
  		@edit-action="editGraph" @show-action="show_Stat_Graph"
  	/>
  </div>
</template>


<script>
	import Table from "@/components/Table.vue";
	import { mapState } from 'vuex'


	export default {
	  name: "Home",
	  components: {
	    Table,
	  },
	  data () {
	    return {
	    }
	  },
	  created() {
	  	this.$store.dispatch('fetchGraphs',{})
	  },
	  methods:{
	  	deleteGraph(graph) {
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
	  	}   
	  },
	  computed:{
	    ...mapState(['graphs'])
	  }
	};
</script>
