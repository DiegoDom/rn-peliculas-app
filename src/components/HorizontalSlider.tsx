import React from 'react';
import { Movie } from '../interfaces/movieInterface';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MoviePoster } from './MoviePoster';

interface Props {
    title?: string;
    movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {
    return (
        <View style={{ height: (title) ? 260 : 220, paddingTop: 10 }}>
            { title && <Text style={ styles.title } >{ title }</Text> }
            <FlatList
                data={ movies }
                renderItem={ ({ item }: any) => (
                    <MoviePoster movie={ item } width={ 110 } height={ 180 } />
                ) }
                keyExtractor={ (item) => item.id.toString() }
                horizontal={ true }
                showsHorizontalScrollIndicator= { false }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    }
});
