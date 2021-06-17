<template>
  <div>

    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Graph Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.graph_name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Graph description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.graph_description"
          placeholder="Enter description"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group>
        <b-row>
          <b-col>
            <b-form-group  label="Choose node to delete:" label-for="node-del">
              <b-form-select id="node-del" @change="deleteNode" v-model="selected_node" :options="form.nodes" class="form-control mb-3">
              </b-form-select>
            </b-form-group>
          </b-col>
          
          <b-col>
            <b-form-group label="Choose link to delete:" label-for="link-del">
              <b-form-select id="link-del" @change="deleteLink" v-model="selected_node_to_link" class="form-control mb-3" :options="form.links">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>  
      </b-form-group>

      <b-form-group>
        <b-row>
          <b-col>
            <b-form-group  label="Choose node to create:" label-for="select-1">
              <b-form-select id="select-1" @change="addNode" v-model="selected_node" :options="options_nodes" class="form-control mb-3">
              </b-form-select>
            </b-form-group>
          </b-col>
          
          <b-col>
            <b-form-group label="Choose node to link with it:" label-for="select-2">
              <b-form-select id="select-2" @change="prepareLink" v-model="selected_node_to_link" class="form-control mb-3" :options="options_nodes_to_link">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>  
      </b-form-group>
      <b-row>
        <b-col>
          <slot name="LinkButton">
                <b-button  class="btn btn-danger btn-sm btn-block" @click="addLink">
                    Link to node
                </b-button>
          </slot>    
        </b-col>
        <b-col>
                <b-button  type="submit" variant="primary">
                    Create Graph
                </b-button>
          
        </b-col>
      </b-row>

        <div class="mt-2">Selected Node: <strong>{{ selected_node }}</strong></div>
      </b-form>


  </div>
</template>

<script>
  import ActionButton from '@/components/ActionButton'
  import GraphServices from '@/services/GraphServices.js'

  export default {
    name: 'GraphForm',
    components: {
      ActionButton
    },
    data() {
      return {
        form: {
          'id': null,
          'graph_name': '',
          'graph_description': '',
          'nodes': [],
          'links':[],
          'created_at': null,
          'updated_at': null
      		},
        selected_node: null,
        selected_node_to_link: null,
        options_nodes: [],
        options_nodes_to_link: [],
        temp_node: null,
        temp_link: {}

  		}
    },
    created() {  
      this.getGraph(this.$route.params.id)
      for (var index = 1; index < 100; index++) {
        this.options_nodes.push({value: index, text: index})
      }
    },
    methods: {
      addNode() {

        this.options_nodes_to_link = []
        for (var index = this.selected_node+1; index <= 100; index++) {
          this.options_nodes_to_link.push({value: index, text: index})
        }
        if (!(this.form.nodes.some(node => node.id === (this.selected_node))) ) {
          this.form.nodes.push({'id': this.selected_node})
        } 
      },
      prepareLink() {
        this.temp_link = { 
          'sid':this.selected_node, 
          'tid': this.selected_node_to_link
        }
      },
      addLink() {
        if(!(this.form.nodes.some(node => node.id === (this.temp_link.tid)))) {
          this.form.nodes.push({'id': this.temp_link.tid})
        }
        if(!(this.form.links.some(link => (link.sid === (this.temp_link.sid) && link.tid === (this.temp_link.tid)) )) ) {  
          this.form.links.push(this.temp_link)
          alert('Link added succesfully')
        }
        else{
          alert('Link already created')
        }
      },
      getGraph(id) {
        GraphServices.getGraph(id)
        .then((response)=>{ 
              this.form = response.data
          })
      },
      onSubmit() {
        this.form.created_at = new Date().toJSON().slice(0,10).replace(/-/g,'/') 
        this.generateID()
        GraphServices.postGraphData(this.form)
        .then(()=>{ 
            alert('Graph posted to data base')
          })
      }
    }
  }
</script>