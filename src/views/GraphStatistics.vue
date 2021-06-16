<template>
  <div>
    <h1>This is show_Stat_Graph page</h1>
    <svg >
	  <defs>
	    <marker id="m-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
	      <path d="M0,0 L0,6 L9,3 z"></path>
	    </marker>
	        <marker id="m-start" markerWidth="6" markerHeight="6" refX="-4" refY="3" orient="auto" markerUnits="strokeWidth" >
	      <rect width="3" height="6"></rect>
	    </marker>
	  </defs>
    </svg>
    <div>
    <b-table striped hover :items="items"></b-table>
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options"  :link-cb="lcb"/>
    </div>

  </div>
</template>

<script>
  import D3Network from 'vue-d3-network'
  import GraphServices from '@/services/GraphServices.js'

  export default{
  	components: {
  		D3Network
  	},
  	created() {
  		this.getGraph(this.$route.params.id)
  	},
  	data () {
		    return {
		      nodes: [],
		      links: [],
		      nodeSize: null,
		      items: [],
		      canvas:false

		    }
	},
	computed:{
	    options(){
	      return{
	        force: 3000,
	        size:{ w:600, h:600},
	        nodeSize: this.nodeSize,
	        nodeLabels: true,
	        canvas: this.canvas,
	        linkWidth:2
	      }
	    }
	  },
	methods:{
	    lcb (link) {
	      link._svgAttrs = { 'marker-end': 'url(#m-end)',
	                       'marker-start': 'url(#m-start)'}
	      return link
	    },
	    getGraph(id) {
	    	GraphServices.getGraph(id)
	    	.then((response)=>{ 
            	var graph = response.data
            	this.nodes = graph.nodes
		  		this.links = graph.links
		  		this.nodeSize = graph.nodes.length
		  		this.setItems(graph.nodes, graph.links, graph.graph_name)
  				console.log(this.items)
		  		
          })
	    },
	    setItems(nodes,links,tooltip){
	    	var item = {'node_id':null,'tooltip':'','node_neighbors':[]}
	    	for (var index = 0; index < nodes.length; index++) {
		        item.node_id = nodes[index].id
		        item.tooltip = `My Node num ${item.node_id}`
		        for(var j = 0; j<links.length; j++) {

		        	if(links[j].sid === nodes[index].id){
		        		item.node_neighbors.push(links[j].tid)
		        	}
		        	else{
		        		if(links[j].tid === nodes[index].id) {
			        		item.node_neighbors.push(links[j].sid)
		        		}
		            }
		        }
		        this.items.push(item)
		        item = {'node_id':null,'tooltip':'','node_neighbors':[]}
		      }

	    }
	}
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans');
@import url('../../node_modules/vue-d3-network/dist/vue-d3-network.css');

body{
  font-family: 'PT Sans', sans-serif;
  background-color: #eee;
}
.title{
  position:absolute;
  text-align: center;
  left: 2em;
}
h1,a{
  color: #1aad8d;
  text-decoration: none;
}

ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li{
  margin-top: 1em;
  position: relative;
}

#m-end path, #m-start{
  fill: rgba(18, 120, 98, 0.8);
}
</style>