import axios from "axios";

const api = axios.create({
//url local
//baseURL: 'http://192.168.3.5/sensor/'

baseURL: 'http://10.44.238.55/sensor/'
	//url hospedada
// caso a conexao seja servidor baseURL:'https://appsaude.bennasoftware.com.br/sensor/'
});
export default api;