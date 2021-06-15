import axios from 'axios'

const apiClient = axios.create({
	
	baseURL: `http://localhost:3000`,
	withCredentials: true,
	headers:{
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
})

export default{
	
	getGraphs(){ 
		return apiClient.get('/graphs')
	},
	postGraphData(data){

		return apiClient.post('/graphs',data)
	},

}

