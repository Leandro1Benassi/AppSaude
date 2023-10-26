import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
import { DrawerActions, useNavigation } from '@react-navigation/core';

const CustomDrawer: React.FC = () => {
    const navigation: any = useNavigation();

    async function logout() {
        Alert.alert('Sair', `Você tem certeza que quer sair?`, [
            {
                text: 'Não',
                style: 'cancel',
            },

            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await AsyncStorage.clear();
                        navigation.navigate('Login');
                    } catch (error) {
                        Alert.alert('Não foi possivel sair, tente novamente!')
                    }
                }
            }
        ])
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Image style={styles.logo} source={require('../../../assets/logonav03.png')} />

            <View style={{ width: '90%', backgroundColor: '#c1c1c1', height: 0.5, alignSelf: 'center', marginBottom: 5, marginTop: 20 }}></View>

            <ScrollView
                style={styles.container}
            >
                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Perfil")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialIcons style={styles.iconRegistered} name="people-alt" size={30} color="gray" />

                        <Text style={styles.PagesText}>Perfil</Text>
                    </TouchableOpacity>

                   
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Informativo")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialIcons style={styles.iconRegistered} name="info" size={30} color="gray" />

                        <Text style={styles.PagesText}>Informativo saúde</Text>
                    </TouchableOpacity>

                   
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Medicamento")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialCommunityIcons style={styles.iconRegistered} name="calendar-clock" size={30} color="gray" />

                        <Text style={styles.PagesText}>Medicamentos</Text>
                    </TouchableOpacity>

                   
                </View>
               
                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Medicoes")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialCommunityIcons style={styles.iconRegistered} name="gauge-low" size={30} color="gray" />

                        <Text style={styles.PagesText}>Aferição</Text>
                    </TouchableOpacity>

                   
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.Pages}
                        onPress={() => {
                            navigation.navigate("Historico")
                            navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                    >
                        <MaterialCommunityIcons style={styles.iconRegistered} name="history" size={30} color="gray" />

                        <Text style={styles.PagesText}>Histórico</Text>
                    </TouchableOpacity>

                   
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={styles.Sair}
                >
                    <MaterialIcons name="subdirectory-arrow-left" size={25} color="gray" />
                    <Text style={styles.SairText}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawer;