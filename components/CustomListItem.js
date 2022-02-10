import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const CustomListItem = () => {
  return (
    <ListItem>
        <Avatar
            rounded
            source={{
                uri: 'https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png',
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800' }}>My Test Chat</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                This is a test subtitle
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
