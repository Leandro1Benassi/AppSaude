import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    Alert,
} from 'react-native';

import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import { styles } from './style';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import api from '../../services/api';
import Load from '../../assets/components/Load';
import { useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

export default function Home() {
   
    const navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const [lista, setLista] = useState<any>([]);
    const [sucess, setSucess] = useState(false);
    const [dados, setDados] = useState<any>([]);
    const[data, setData]= useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
  
    const porcent = 90;
  

    async function carregar() {
    setSucess(true);
       try {
        
        const id_user = await AsyncStorage.getItem('@user');
      
        if(id_user != null){
        
        await api.post(`salvar.php?&id_user=${id_user.replace(/['"]+/g, '')}`);
       // setLista(response.data.result);
      
         
     // Alert.alert('ID',id_user);
    }

       } catch (error) {
       // Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
        setSucess(false);
        
       }
    }


    async function listarCards() {
        try {
            const response = await api.get('Totais/cards.php');
            setDados(response.data.result);
            
        } catch (error) {
            console.log("Error");
        } finally {
            setIsLoading(false);
            setRefreshing(false);
            
        }
    }

   
        async function listarDados() {
        try {
         
            const response = await api.get('listar.php');
          
                 setLista(response.data.result);
                 //setData(response.data.result);   
        
        } catch (error) {
            console.log("Error");
            
           
        } finally {
          
            setIsLoading(false);
            setRefreshing(false);
            
        }
    }

   

    useEffect(() => {
        
        listarDados();
        carregar();
        listarCards(); 
    }, []);

    useEffect(() => {
        listarDados();
        carregar();
        listarCards();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listarDados();
        carregar();
        listarCards();
       
    };

      
    setInterval((): void => {
//console.log('teste.');
       carregar();
       listarDados();
       listarCards(); 
       //Alert.alert('TESTE SETINTERVAL');
      }, 20000);
 
     
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>
                        <TouchableOpacity
                            style={styles.menu}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <MaterialIcons name='menu' size={35} color='black' />
                        </TouchableOpacity>
                        <Image style={styles.logo} source={require('../../assets/logonav03.png')} />
                    </View>

                </View>
                {isLoading ?
                    <Load /> :

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={styles.circleProgressView}>
                            <View style={styles.textProgressContainer}>
                                <Text style={styles.textProgressTitle}>Batimentos</Text>
                                
                            
                                    <Text style={styles.textProgress}>Leitura sensor</Text>
  
        
                            </View>

                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={porcent}
                                tintColor="#00e0ff"
                                backgroundColor="#e0e0e0"
                                lineCap={"round"}
                            >
                                {
                                    (fill) => (
                                        <View>
                                            {lista.map(item => (
                                            <Text style={styles.numberInside}>{item.batimento}</Text>
                                            
                                            
                                            ))}
                                        </View>
                                        
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                                
                        <View style={styles.containerBox}>
                            <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
                                <View>
                                    <View style={styles.box}>
                                        <MaterialCommunityIcons style={styles.iconRegistered}  name='calendar-clock' size={70} color="#17a2b8" />
                                        <View style={styles.textos}>
                                            <Text style={styles.rText}>Medicamentos</Text>
                                            {dados.map(item => (


                                            <Text style={styles.lenghtText}>{item.qtd} {item.remedio}</Text>
                                            
                                            
                                            ))}
                                            
                                        </View>
                                    </View>
                                    <Text style={styles.textFooter}>Medicamentos do dia</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>



                }
            </View>

        </View>
    )
}