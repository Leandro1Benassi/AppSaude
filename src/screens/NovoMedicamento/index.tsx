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

type ParamList = {
    Detail: {
        id: string;
    };
};

const NovoMedicamento: React.FC = () => {
    const navigation: any = useNavigation();

    const route = useRoute<RouteProp<ParamList, 'Detail'>>();
    const id_reg = route?.params?.id;
   
    const [remedio, setRemedio] = useState("");
    const [qtd, setQtd] = useState("");
    const [sucess, setSucess] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
   
    async function saveData() {
        setSucess(true);

        try {
            const obj = {
                id: id_reg,
                remedio: remedio,
                qtd: qtd,
                
            }

            await api.post("Remedio/salvar.php", obj);

            setRemedio("");
            setQtd("");
           

        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
            setSucess(false);
        }
    }

    async function editData() {
        setSucess(true);

        try {
            const obj = {
                id: id_reg,
                remedio: remedio,
                qtd: qtd,
                
            }

            //await api.post("clientes/editar_clientes.php", obj);
        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
            setSucess(false);
        }
    }

    async function loadData() {
        try {
            setLoading(true);
            if (id_reg != "0") {
                const res = await api.get(`Remedio/listar_id.php?id=${id_reg}`);

                setRemedio(res.data.remedio);
                setQtd( res.data.qtd);
                console.log(res.data.remedio)
                console.log(id_reg)
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
                <Text style={styles.TitleInputs}>Medicamento</Text>

                <TextInput
                    placeholder="Medicamento"
                    onChangeText={(text) => setRemedio(text)}
                    value={remedio}
                    style={styles.TextInput}
                />
            </View>


            <View>
                <Text style={styles.TitleInputs}>Quantidade</Text>

                <TextInput
                    placeholder="Quantidade"
                    onChangeText={(text) => setQtd(text)}
                    value={qtd}
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
                        navigation.navigate("Medicamento")
                    }, 1500);
                })
            }}
          ><Text style={styles.ButtonText}>Salvar Registro</Text>
          </TouchableOpacity>

           
            

        </View>
    );
}

export default NovoMedicamento;