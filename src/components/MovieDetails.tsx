import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';

import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={ styles.detailsContainer }>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="star-outline" color="gray" size={ 16 } />
                    <Text> { movieFull.vote_average }</Text>
                    <Text style={{ marginLeft: 5 }}> - { movieFull.genres.map(g => g.name).join(', ') }</Text>
                </View>
                <Text style={ styles.title }>Historia</Text>
                <Text style={ styles.text } >{ movieFull.overview }</Text>
                <Text style={ styles.title }>Presupuesto</Text>
                <Text style={ styles.text } >{ currencyFormatter.format(movieFull.budget, { code: 'USD' }) }</Text>
            </View>

            {/* Casting */}
            <View  style={ styles.castContainer }>
                <Text style={ styles.titleCast }>Actores</Text>

                <FlatList
                    data={ cast }
                    renderItem={ ({ item }) => <CastItem actor={ item } /> }
                    keyExtractor={ (item) => item.id.toString() }
                    horizontal={ true }
                    showsHorizontalScrollIndicator= { false }
                    style={ styles.castCarousel }
                />
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 23,
        marginTop: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        textAlign: 'justify'
    },
    castContainer: {
        marginTop: 10,
        marginBottom: 100
    },
    titleCast : {
        fontSize: 23,
        marginTop: 10,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    castCarousel: {
        marginTop: 10,
        height: 70
    }
});
