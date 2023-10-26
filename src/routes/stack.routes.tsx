import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/Login';
//import Remedio from '../screens/Medicamentos';
//import Home from '../screens/Home';
import AuthRoutes from './tab.routes';
import Medicamentos from '../screens/Medicamentos';
import NovoMedicamento from '../screens/NovoMedicamento';
import Historico from '../screens/Historico';
import Informativo from '../screens/Informativo';
import Medicoes from '../screens/Medicoes';
import NovoMedicao from '../screens/NovaMedicao';
import Perfil from '../screens/Perfil';
const Stack = createNativeStackNavigator();

function StackNavigator(){
	return(
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Home" component={AuthRoutes} />
			<Stack.Screen name="Medicamento" component={Medicamentos} />
			<Stack.Screen name="NovoMedicamento" component={NovoMedicamento} />
			<Stack.Screen name="Historico" component={Historico} />
			<Stack.Screen name="Informativo" component={Informativo} />
			<Stack.Screen name="Medicoes" component={Medicoes} />
			<Stack.Screen name="NovoMedicao" component={NovoMedicao} />
			<Stack.Screen name="Perfil" component={Perfil} />
			
		</Stack.Navigator>
	)
}

function AppRoutes(){

	return(
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	)
}

export default AppRoutes;