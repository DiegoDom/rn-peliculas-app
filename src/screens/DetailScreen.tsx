import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{

}

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
    const { height: screenHeight } = useWindowDimensions();

    const { isLoading, movieFull, cast } = useMovieDetails(movie.id);

    return (
        <ScrollView>
            <View style={{ ...styles.posterContainer, height: screenHeight * 0.7 }}>
                <View style={ styles.imageBorder }>
                    <Image source={{ uri }} style={ styles.posterImage } />
                </View>
            </View>
            <View style={ styles.detailsContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>
            {
                isLoading
                    ? <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }

            <TouchableOpacity onPress={ () => { navigation.pop(); } }  style={ styles.backButton }>
                <Icon color="white" name="close-circle-outline" size={ 38 }  />
            </TouchableOpacity>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageBorder: {
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        flex: 1,
        overflow: 'hidden'
    },
    posterContainer: {
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9
    },
    posterImage: {
        flex: 1
    },
    detailsContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    subTitle: {
        fontSize: 15,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        right: 10
    }
});
