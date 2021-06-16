<template>
  <div>

    <b-form >
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
            <b-form-group  label="Choose node to create:" label-for="input-2">
              <b-form-select @change="addNode" v-model="selected_node" :options="options_nodes" class="form-control mb-3">
              </b-form-select>
            </b-form-group>
          </b-col>
          
          <b-col>
            <b-form-group label="Choose node to link with it:" label-for="input-2">
              <b-form-select @change="prepareLink" v-model="selected_node_to_link" class="form-control mb-3" :options="options_nodes_to_link">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>  
      </b-form-group>
      <b-row>
        <b-col>
          <slot name="DeleteButton">
                <Button  class="btn btn-danger btn-sm btn-block" @click="addLink">
                    Link to node
                </Button>
          </slot>    
        </b-col>
        <b-col>
          <slot name="DeleteButton">
                <Button  class="btn btn-danger btn-sm btn-block">
                    Submit
                </Button>
          </slot>
        </b-col>
      </b-row>

        <div class="mt-2">Selected: <strong>{{ selected_node }}</strong></div>
      </b-form>


  </div>
</template>

<script>
  import ActionButton from '@/components/ActionButton'

  export default {
    name: 'GraphForm',
    components: {
      ActionButton
    },
    data() {
      return {
        form: {
          'graph_name': '',
          'graph_description': '',
          'nodes': [],
          'links':[]
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
      for (var index = 1; index < 100; index++) {
        this.options_nodes.push({value: index, text: index})
        //this.options_nodes_to_link.push({value: (index+1), text: (index+1)})
      }
      console.log(this.form)
      
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
        else{
          console.log('raho kayen deja')
        }    
      },
      prepareLink() {
        this.temp_link = { 
          'sid':this.selected_node, 
          'tid': this.selected_node_to_link
        }
      },
      addLink() {
        this.form.links.push(this.temp_link)
        console.log(this.form)
      }
    }
  }
</script>