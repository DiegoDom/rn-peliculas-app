import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Movie } from '../interfaces/movieInterface';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export const MoviePoster = ({ movie, height = 380, width = 280 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={{ width, height, ...styles.posterTouchable }}
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('DetailScreen', movie) }
        >
            <View style={ styles.posterContainer } >
                <Image source={{ uri }} style={ styles.image } />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    posterTouchable: {
        marginHorizontal: 2,
        paddingBottom: 15,
        paddingHorizontal: 7
    },
    posterContainer: {
        borderRadius: 18,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9
    },
    image: {
        flex: 1,
        borderRadius: 18,
    }
});
