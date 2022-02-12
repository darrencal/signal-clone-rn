import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(doc(collection(db, 'signal_chats'), id), 'messages'), 
                orderBy('timestamp', 'desc')
            ), (snapshot) => setChatMessages(snapshot.docs.map(doc => doc.data()))
        );

        return unsubscribe;
    }, []);

    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages[0]?.photoURL ||
                        'https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png',
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages[0] ? `${chatMessages[0].displayName}: ${chatMessages[0].message}` : ''}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem;

const styles = StyleSheet.create({});
