<template>
    <b-table-simple hover small caption-top responsive>
      
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Graph Name</b-th>
          <b-th>Description</b-th>
          <b-th>Created at</b-th>
          <b-th colspan="3">Action</b-th>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="(graph,index) in allDBgraphs">
          <b-td>{{graph.graph_name}}</b-td>
          <b-td>{{graph.graph_description}}</b-td>
          <b-td>{{graph.created_at}}</b-td>
          <b-td>                         
              <slot name="ReadButton">
                <Button :graphsID="graph.id" class="btn btn-primary btn-sm btn-block" @click="fireShow(graph.id)">
                    Show graph
                </Button>
              </slot>
          </b-td>
          <b-td>
              <slot name="EditButton">
                <Button :graphsID="graph.id" class="btn btn-success btn-sm btn-block" @click="fireEdit(graph.id)">
                     Edit
                </Button>
              </slot>
          </b-td>

          <b-td>                         
              <slot name="DeleteButton">
                <Button :graphsID="graph.id" class="btn btn-danger btn-sm btn-block" @click="fireDelete(graph)">
                    Delete
                </Button>
              </slot>
          </b-td>
        </b-tr>
      </b-tbody>

    </b-table-simple>
</template>


<script>
import ActionButton from '@/components/ActionButton'

  export default {
    name: 'Table',
    components:{
      ActionButton
    },
    props:{
    	allDBgraphs:{
    		type : Array,
    		required : true
    	}
    },
    methods:{
      fireDelete(Graph){
        this.$emit('ask-delete-action',Graph)
      },
      fireEdit(id){
        this.$emit('edit-action',id)
      },
      fireShow(id){
        this.$emit('show-action',id)
      }
    }
  };
</script>