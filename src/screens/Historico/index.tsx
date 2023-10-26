import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View, Dimensions, Alert, Platform } from 'react-native';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import { add, format, parseISO, sub } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import CardHistorico from '../../assets/components/CardHistorico';
import {

    Text,
    StatusBar,


} from 'react-native';
import fonts from '../../styles/fonts';

const Historico: React.FC = () => {



   

    const [date, setDate] = useState<any>(new Date());
    const [show, setShow] = useState<any>(false);

    const [date2, setDate2] = useState<any>(new Date());
    const [show2, setShow2] = useState(false);

   
    const navigation: any = useNavigation();

    const [lista, setLista] = useState<any>([]);

    const [loading, setLoading] = useState(false);

    const [onEndReachedCalledDuringMomentum, setMT] = useState(true);

    const onChange = async (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChange2 = async (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date2;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
    };


   

    async function fetchData() {


        try {
            const id_user: any = await AsyncStorage.getItem('@user');

           // alert(id_user)
            const date1 = format(date, 'yyyy-MM-dd');
            const dates2 = format(date2, 'yyyy-MM-dd')
          
            const response = await api.get(`Historico/listar.php?data=${date1}&data1=${dates2}&id_user=${id_user.replace(/['"]+/g, '')}`);
            setLista(response.data.result);
            //alert(date1)
            //alert(dates2)
          //  alert(response.data.result)

        } catch (error) {
            console.log(error)
        }
    }


    const renderItem = function ({ item }: any) {
        return (
            <CardHistorico
                data={item}
            />
        )
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
        fetchData();
    }, []);
    
    useEffect(() => {
        Promise.all([date, date2]).then(() => {
            //setLoading(true);
            //alert(date)
            //alert(date2)
            fetchData();
        })
    }, [date, date2])

    if (loading === true) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ActivityIndicator style={{ marginTop: 100 }} color="#000" size="large" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                    
                />
               
            )}
    
            {show2 && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date2}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange2}
                />
            )}


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
            <View style={{ marginBottom: 10, }}>
                <View style={styles.dates}>

                    <TouchableOpacity
                        style={styles.ButtonDates}
                        onPress={() => {
                            setDate(sub(new Date(), { days: 1 }));
                            setDate2(sub(new Date(), { days: 1 }));
                        }}
                    >
                        <Text style={styles.ButtonDatesText}>Ontem</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={styles.ButtonDates}
                        onPress={() => {
                            setDate(add(new Date(), { days: 1 }));
                            setDate2(add(new Date(), { days: 1 }))
                        }}
                    >
                        <Text style={styles.ButtonDatesText}>Hoje</Text>
                    </TouchableOpacity>
                </View>

            </View>


            <View style={styles.Dates}>
                    <TouchableOpacity
                        style={styles.pickDate}
                        onPress={() => setShow(true)}
                    >
                        <Text style={{ fontFamily: fonts.text, fontSize: 16 }}>DE</Text>
                        <Text style={styles.date}>{format(date, 'dd/MM/yyyy')}</Text>
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center' }}>
                         <Ionicons name="md-arrow-forward-outline" size={30} color="#484a4d" />
                    </View>

                    <TouchableOpacity
                        style={styles.pickDate}
                        onPress={() => setShow2(true)}
                    >
                        <Text style={{ fontFamily: fonts.text, fontSize: 16 }}>ATÉ</Text>
                        <Text style={styles.date}>{format(date2, 'dd/MM/yyyy')}</Text>
                    </TouchableOpacity>
                </View>
            <View style={{ paddingHorizontal: 15, flex: 1, }}>


                <View style={{ flex: 1, height: Dimensions.get('window').height + 30, }}>
                <FlatList
                        data={lista}
                        renderItem={renderItem}
                        keyExtractor={item => String(item.id)}
                        onEndReachedThreshold={0.1}
                        removeClippedSubviews
                        initialNumToRender={10}
                        onEndReached={(distanceFromEnd) => {
                          if (!onEndReachedCalledDuringMomentum) {
                            fetchData().then(() => setLoading(false));
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


            </View>
        </View>

    );
}
export default Historico;
