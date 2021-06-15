<template>
	<b-button type="button" class="btn btn-primary">
		<slot/>
	</b-button>
</template>

<script>
  export default {
    name: 'ActionButton',
    props:{
    	graphID: Number,
    	required: true
    }
  };
</script>