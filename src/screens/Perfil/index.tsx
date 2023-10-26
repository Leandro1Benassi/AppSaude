import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

    const [nome, setNome] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState("");
   
    const [sucess, setSucess] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    async function saveData() {
        setSucess(true);

        try {
            const obj = {
                id: id_reg,
                nome: nome,
                celular: celular,
                email: email,
                genero: genero,
                senha: senha,

            }

            await api.post("Remedio/salvar.php", obj);

            setNome("");
            setCelular("");
            setGenero("");
            setEmail("");
            setSenha("");


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

                setNome('Leandro Benassi Valença Araujo');
                setCelular('13992098298');
                setGenero('Masculino');
                setEmail('benassileandro@gmail.com');
                setSenha('123');
                //console.log(res.data.remedio)
                //console.log(id_reg)
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
                <Text style={styles.TitleInputs}>Nome completo</Text>

                <TextInput
                    placeholder="Nome completo"
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                    style={styles.TextInput}
                />
            </View>

            <View>
                <Text style={styles.TitleInputs}>Celular</Text>

                <TextInputMask
                    style={styles.TextInput}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(31) '
                    }}
                    value={celular}
                    onChangeText={text => setCelular(text)}
                    placeholder="Telefone Celular"
                />
            </View>


            <View>
                <Text style={styles.TitleInputs}>Email</Text>

                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    style={styles.TextInput}

                />
            </View>

            <View>
                <Text style={styles.TitleInputs}>Gênero</Text>
                <View style={styles.Picker}>
                    <Picker
                        selectedValue={genero}
                        onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
                        style={{ color: '#000' }}
                    >
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                        <Picker.Item label="Outros" value="Outros" />

                    </Picker>
                </View>
            </View>

            <View>
                <Text style={styles.TitleInputs}>Senha</Text>

                <TextInput
                    secureTextEntry={true}
                    style={styles.TextInput}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={(senha) => setSenha(senha)}
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