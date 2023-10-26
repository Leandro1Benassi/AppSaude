import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, Text, Modal, ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import SwipeableRow from '../SwipeableRow';
import api from '../../../services/api';
import { styles } from './styles';
import fonts from "../../../styles/fonts";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, EvilIcons, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
interface DadosProps {
    data: {
        id: string;
        batimento: string;
        O2: string;
        data: string;
        card: string;

    }
}


const CardHistorico = ({ data }: DadosProps) => {
    const navigation: any = useNavigation();



    return (
        <>
            {data.id === undefined && data.O2 === undefined ?

                <Text style={{ color: '#595858', fontSize: 14, marginTop: 10, alignContent: "center", textAlign: "center" }}>Nenhum Registro Encontrado!</Text>


                :


                <View
                    style={{
                        backgroundColor: '#FAFAFA',
                        marginBottom: 10,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        borderRadius: 5,
                        borderLeftWidth: 8,
                        borderLeftColor: data.card,
                    }}>




                    <TouchableOpacity
                        style={styles.box}
                        onPress={() => Alert.alert("Média de batimentos adultos = 90bpm[seu batimento é" , data.batimento)}
                    >
                        <MaterialCommunityIcons name="heart-pulse" size={22} color={"#FF4500"}></MaterialCommunityIcons>
                        <Text style={{ color: '#000' }}>Oxigenação::{data.O2} ::-:: Batimento::: {data.batimento}</Text>
                        <Text style={{ color: '#BEBEBE' }}>Data medição::{data.data}</Text>
                    </TouchableOpacity>

                </View>
            }
        </>
    );
}

export default CardHistorico;