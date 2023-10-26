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
    data:{
        id: string;
        remedio: string;
        qtd: string;
        card: string;

    }
}


const CardRemedio = ({ data }: DadosProps) => {
    const navigation: any = useNavigation();
    
    
    async function excluir(remedio:string, id:string) {
        Alert.alert('Sair', `Você tem certeza que deseja excluir o Registro : ` + remedio, [
            {
                text: 'Não',
                style: 'cancel',
            },

            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        const response = await api.get(`Remedio/excluir.php?id=${id}`);
                        navigation.push('Medicamento');
                    } catch (error) {
                        Alert.alert('Não foi possivel excluir, tente novamente!')
                    }
                }
            }
        ])
    }


    return (
        <>
            {data.id === undefined && data.remedio === undefined ?

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
                        
                        <SwipeableRow


                            onPressEdit={async () => {
                                navigation.navigate('NovoMedicamento', { id: data.id });
                               // alert(data.id)
                            }}
    
                            onPressDelete={async () => {
                                excluir(data.remedio, data.id);
                            }}
                            >

                    <TouchableOpacity
                        style={styles.box}
                        onPress={() => Alert.alert("Medicamento diário" , data.remedio)}
                    >
                    
                        <MaterialCommunityIcons name="calendar-clock" size={22} color={"#26262a"}></MaterialCommunityIcons>
                        <Text style={{ color: '#000' }}>Quantidade: {data.qtd}--unidades</Text>
                        <Text style={{ color: '#0016e7' }}>Medicamento  {data.remedio}</Text>
                    </TouchableOpacity>
                    </SwipeableRow>
                </View>
            }
        </>
    );
}

export default CardRemedio;