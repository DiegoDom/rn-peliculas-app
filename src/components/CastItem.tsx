import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Cast } from '../interfaces/creditsInterface';

interface Props {
    actor: Cast
}

export const CastItem = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${ actor.profile_path }`;

    return (
        <View style={ styles.castItemContainer }>
            { actor.profile_path && (<Image source={{ uri }} style={ styles.profilePath } />) }
            <View style={ styles.infoContainer }>
                <Text style={ styles.title }>{actor.name}</Text>
                <Text style={ styles.text }>{actor.character}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    castItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 9,
        flexDirection: 'row',
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        marginLeft: 20,
        paddingRight: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        opacity: 0.7
    },
    profilePath: {
        borderRadius: 10,
        height: 50,
        width: 50
    },
    infoContainer: {
        marginLeft: 10
    }
});
