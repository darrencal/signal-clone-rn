import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');
            });
    }

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
                    <TouchableOpacity>
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation]);

    return (
        <SafeAreaView>
        <ScrollView>
            <CustomListItem />
        </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
