import React from 'react';

import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import Home from '../screens/Home';
import DrawerRoutes from './drawer.routes';
//import Clientes from '../screens/Clientes';
import { DrawerActions, useNavigation } from '@react-navigation/native';
//import Consultas from '../screens/Consultas';
import Medicamentos from '../screens/Medicamentos';
import Historico from '../screens/Historico';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    const navigation = useNavigation();

    return (
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: 'gray',
                tabBarHideOnKeyboard: true,
                tabBarLabelPosition: 'below-icon',
                headerShown:false,

                tabBarStyle:{
                    height: 65,
                    paddingTop: 10
                },
            }}

            >
                <AppTab.Screen
                    name="Inicio"
                    component={DrawerRoutes}

                    options={{
                        tabBarIcon: (({size, color}) => (
                            <AntDesign
                                name="home"
                                size={size}
                                color={color}
                            />
                        )),
                        
                        tabBarLabel: (({ focused, color}) => (
                            <View>
                                <Text
                                    style={ focused ? {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12,
                                        textAlign: 'center',
                                    } : {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12
                                    }}
                                >
                                    Inicio
                                </Text>
                                <View
                                    style={ focused ? {

                                        backgroundColor: color,
                                        borderColor: color,
                                        width: 45,
                                        height: 2,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        marginTop: 5,
                                    } : {
                                        height: 2,
                                    }}
                                >
                                </View>
                            </View>
                        ))
                    }}
                />

                <AppTab.Screen
                    name="Historico"
                    component={Historico}
                    options={{
                        tabBarIcon: (({ size, color}) => (
                            <MaterialIcons
                                name="history"
                                size={size} 
                                color={color} 
                            />
                        )),

                        tabBarLabel: (({ focused, color}) => (
                            <View>
                                <Text
                                    style={ focused ? {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12,
                                        textAlign: 'center',

                                    } : {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12
                                    }}
                                >
                                    Histórico
                                </Text>
                                <View
                                    style={ focused ? {
                                        backgroundColor: color,
                                        borderColor: color,
                                        width: 65,
                                        height: 2,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        marginTop: 5,
                                    } : {
                                        height: 2,
                                    }}
                                >
                                </View>
                            </View>
                        ))
                    }}
                />

                <AppTab.Screen
                    name="Medicamento"
                    component={Medicamentos}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <MaterialCommunityIcons
                                name="calendar-clock"
                                size={size}
                                color={color}
                            />
                        )),

                        tabBarLabel: (({ focused, color}) => (
                            <View>
                                <Text
                                    style={ focused ? {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12,
                                        textAlign: 'center',
                                    } : {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12
                                    }}
                                >
                                    Medicamentos
                                </Text>
                                <View
                                    style={ focused ? {
                                        backgroundColor: color,
                                        borderColor: color,
                                        width: 90,
                                        height: 2,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        marginTop: 5,
                                    } : {
                                        height: 2,
                                    }}
                                >
                                </View>
                            </View>
                        ))
                    }}
                />

                <AppTab.Screen
                    name="Tab3"
                    component={Home}

                    options={{
                        tabBarIcon: (({ size, color}) => (
                            <Ionicons
                                name="people-outline"
                                size={size} 
                                color={color} 
                            />
                        )),

                        tabBarLabel: (({ focused, color}) => (
                            <View>
                                <Text
                                    style={ focused ? {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12,
                                        textAlign: 'center',

                                    } : {
                                        color: color,
                                        fontFamily: fonts.text,
                                        fontSize: 12
                                    }}
                                >
                                    Perfil
                                </Text>
                                <View
                                    style={ focused ? {
                                        backgroundColor: color,
                                        borderColor: color,
                                        width: 60,
                                        height: 2,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        marginTop: 5,
                                    } : {
                                        height: 2,
                                    }}
                                >
                                </View>
                            </View>
                        ))
                    }}
                />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;