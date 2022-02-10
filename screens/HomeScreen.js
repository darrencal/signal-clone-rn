import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');
            });
    }

    useEffect(() => {        
        const unsubscribe = onSnapshot(collection(db, 'signal_chats'), (snapshot) => 
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
        ));

        return unsubscribe;        
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                        onPress={signOutUser}
                        activeOpacity={0.5}
                    >
                        <Avatar source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('AddChat')}}
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName }}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
