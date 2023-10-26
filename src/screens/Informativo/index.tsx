import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View, Dimensions, Alert, Platform } from 'react-native';
import { styles } from './style';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import { add, format, parseISO, sub } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import CardHistorico from '../../assets/components/CardHistorico';

import {

    SafeAreaView,
    VirtualizedList,
    StyleSheet,
    Text,
    StatusBar,

} from 'react-native';
import fonts from '../../styles/fonts';

const Informativo: React.FC = () => {





    const [loading, setLoading] = useState(false);

    const [onEndReachedCalledDuringMomentum, setMT] = useState(true);


    const navigation: any = useNavigation();



    function Footer(load: any) {
        if (!load) return null;

        return (

            <View style={styles.loading}>
                <ActivityIndicator size={25} color="#000" />
            </View>
        )
    }
    

    useEffect(() => {

        
    }, []);




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
            <View style={styles.containerBox}
        >
                 <View style={{ flex: 1, height: Dimensions.get('window').height + 30, }}
           
                     
                        
                     
                       
           
                        >
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
                    <View>
                        <View style={styles.box}>
                            <MaterialIcons style={styles.iconRegistered} name="info" size={70} color="#f6d600" />
                            <View style={styles.textos}>
                                <Text style={styles.rText}>pressão arterial</Text>



                                <Text style={styles.lenghtText}>quando sou hipertenso?</Text>




                            </View>
                        </View>
                        <Text style={styles.textFooter}>é caracterizada pela elevação persistente da pressão arterial (PA), ou seja, PA sistólica
                            ≥ 140 mmHg e/ou PA diastólica ≥ 90 mmHg. Há vários fatores que influenciam nos níveis de
                            pressão arterial</Text>
                    </View>
                </TouchableOpacity>
            </View>
           

            <View style={styles.containerBox}>
                <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
                    <View>
                        <View style={styles.box}>
                            <MaterialIcons style={styles.iconRegistered} name="info" size={70} color="#f6d600" />
                            <View style={styles.textos}>
                                <Text style={styles.rText}>pressão arterial</Text>



                                <Text style={styles.lenghtText}>quais são os riscos?</Text>
                            </View>
                        </View>
                        <Text style={styles.textFooter}> uma doença que compromete os vasos sanguíneos, coração, cérebro, olhos e pode causar paralisação dos rins.
                            Desta forma se faz necessário tratar e controlar a doença. Muitas vezes a pessoa com hipertensão não apresenta sintomas</Text>
                    </View>
                </TouchableOpacity>
            </View>




            


        </View>

    );

}
export default Informativo;
