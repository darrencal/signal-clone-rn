import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                // After user is created, update with additional info
                updateProfile(authUser.user, {
                    displayName: name,
                    photoURL: imageUrl || 'https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png'
                });
            })
            .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name' 
                    autoFocus 
                    value={name} 
                    onChangeText={(text) => setName(text)} 
                />
                <Input 
                    placeholder='Email' 
                    keyboardType='email-address' 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    placeholder='Password' 
                    type='text' 
                    secureTextEntry
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
                <Input 
                    placeholder='Profile Picture URL (optional)' 
                    type='text' 
                    value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)} 
                    onSubmitEditing={register}
                />
            </View>

            <Button 
                containerStyle={styles.button}
                raised 
                onPress={register} 
                title='Register' 
            />

            <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 250,
        marginTop: 10
    }
});
