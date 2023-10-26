import React, { useState, useEffect } from 'react';
import { Alert,  Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Success } from '../../lotties/Success';
import { TextInputMask } from 'react-native-masked-text';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

type ParamList = {
    Detail: {
        id: string;
    };
};

const NovoMedicao: React.FC = () => {
    const navigation: any = useNavigation();

    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const id_reg = route?.params?.id;
   
    const [pad, setPad] = useState("");
    const [pas, setPas] = useState("");
    const [glicose, setGlicose] = useState("");
    const [sucess, setSucess] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
   
    async function saveData() {
        setSucess(true);

        try {
        
            const obj = {
                //id_user: id_user,
                id: id_reg,
                pad: pad,
                pas: pas,
                glicose: glicose,
                
            }
           
           // alert("teste id"+ id_user)
             //await api.post(`Medicoes/salvar.php?pad=${pad}&pas=${pas}&glicose=${glicose}&id_reg=${id_reg}`);
              await api.post("Medicao/salvar.php", obj);
          
            setPad("");
            setPas("");
            setGlicose("");
           

        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
            setSucess(false);
        }
    }



    async function loadData() {
        try {
           
            setLoading(true);
            
            if (id_reg != "0") {
                const res = await api.get(`Medicao/listar_id.php?id=${id_reg}`);

                setPas(res.data.pas);
                setPad(res.data.pad);
                setGlicose(res.data.glicose);
               
               // console.log(id_reg)
                setEdit(false);
            } else {
                setEdit(true);
            }
        } catch (error) {
            console.log('Error ao carregar os Dados');
        }
    }


    useEffect(() => {
        loadData().then(() => setLoading(false))
         
    }, [])

    if (loading === true) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ActivityIndicator style={{ marginTop: 100 }} color="#000" size="large" />
            </View>
        )
    }

    if (sucess) {
        return <Success />
        
    }

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={styles.Header}>
                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="md-arrow-back-circle-outline" size={35} color="#484a4d" />

                </TouchableOpacity>
                {edit ?
                    <View style={styles.Title}>
                        <Text style={styles.TitleText}>Salvar Registro</Text>
                    </View>

                    :

                    <View style={styles.Title}>
                        <Text style={styles.TitleText}>Editar Registro</Text>
                    </View>
                }

            </View>

            <View>
                <Text style={styles.TitleInputs}>PA sistólica:</Text>

                <TextInput
                    placeholder="Sistólica"
                    onChangeText={(text) => setPas(text)}
                    value={pas}
                    style={styles.TextInput}
                />
            </View>


            <View>
                <Text style={styles.TitleInputs}>PA distólica</Text>

                <TextInput
                    placeholder="distólica"
                    onChangeText={(text) => setPad(text)}
                    value={pad}
                    style={styles.TextInput}
                   
                />
            </View>


            <View>
                <Text style={styles.TitleInputs}>Glicose</Text>

                <TextInput
                    placeholder="glicose"
                    onChangeText={(text) => setGlicose(text)}
                    value={glicose}
                    style={styles.TextInput}
                   
                />
            </View>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => {
                setSucess(true);
                saveData().then(() => {
               setTimeout(() => {
                        setSucess(false);
                        navigation.navigate("Medicoes")
                    }, 1500);
                })
            }}
          ><Text style={styles.ButtonText}>Salvar Registro</Text>
          </TouchableOpacity>

           
            

        </View>
    );
}

export default NovoMedicao;