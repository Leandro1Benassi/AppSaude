import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import CardRemedio from '../../assets/components/CardRemedio';
import SwipeableRow from '../../assets/components/SwipeableRow';

import AsyncStorage from '@react-native-community/async-storage';

const Medicamentos: React.FC = () => {

    const navigation: any = useNavigation();
    const [remedio, setRemedio] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [busca, setBusca] = useState("");
    const [onEndReachedCalledDuringMomentum, setMT] = useState(true);

    async function loadData() {

        
        try {
            const response = await api.get(`Remedio/medicamento.php?pagina=${page}&limite=10`);

            if(remedio.length >= response.data.totalItems) return;

            if (loading === true) return;
      
            setLoading(true);
      
            setRemedio([...remedio, ...response.data.resultado]);
            setPage(page + 1);
          } catch (error) {
            console.log(error)
          }
    }
    

    const renderItem = function ({ item }: any) {
        return (
            <CardRemedio
                data={item}
            />
        )
    }

    async function carregar() {
        //setSucess(true);
           try {
            
            const id_user = await AsyncStorage.getItem('@user');
            if(id_user != null){

                await api.post(`Remedio/salvar.php?&id_user=${id_user.replace(/['"]+/g, '')}`);
               // setLista(response.data.result);
              
                 
              //Alert.alert('ID',id_user);
            }
    
           } catch (error) {
           // Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
           // setSucess(false);
            
           }
        }
      function Footer(load: any) {
        if (!load) return null;

        return (
            <View style={styles.loading}>
                <ActivityIndicator size={25} color="#000" />
            </View>
        )
    }

  
    useEffect(() => {
        loadData();
        carregar(); 
    }, [page, totalItems,remedio]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.containerHeader}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back-circle-outline" size={35} color="#000" />
                    </TouchableOpacity>

                    <Image style={styles.logo} source={require('../../assets/logonav03.png')} />
                </View>
            </View>

            <View style={{ paddingHorizontal: 15, flex: 1, }}>
               

                <View style={{ flex: 1, height: Dimensions.get('window').height + 30, }}>
                    <FlatList
                        data={remedio}
                        renderItem={renderItem}
                        keyExtractor={item => String(item.id)}
                        onEndReachedThreshold={0.1}
                        removeClippedSubviews
                        initialNumToRender={10}
                        onEndReached={(distanceFromEnd) => {
                          if (!onEndReachedCalledDuringMomentum) {
                            loadData().then(() => setLoading(false));
                            setMT(true);
                          }
                        }}
                        ListFooterComponent={(distanceFromEnd) => {
                          if (!onEndReachedCalledDuringMomentum) {
                            return <Footer load={loading} />
                          } else {
                            return <View></View>
                          }
                        }}
                        onMomentumScrollBegin={() => setMT(false)}
                        windowSize={10}
                        getItemLayout={(data, index) => (
                          { length: 50, offset: 50 * index, index }
                        )}
                    />
                </View>

                <View style={styles.containerFloat}>
              
                    <TouchableOpacity
                        style={styles.CartButton}
                        onPress={() => navigation.navigate("NovoMedicamento", { id_reg: '0' })}
                    >
                        <Ionicons name="add-outline" size={35} color="#fff" />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
}

export default Medicamentos;