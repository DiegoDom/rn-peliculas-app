import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MoviePoster } from '../components/MoviePoster';

import { useMovies } from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

export const HomeScreen = () => {

    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();
    const { setMainColors } = useContext(GradientContext);

    const { top } = useSafeAreaInsets();
    const { width: screenWidth } = useWindowDimensions();


    const getPosterColors = async(index: number) => {

       const uri = `https://image.tmdb.org/t/p/w500${ nowPlaying[index].poster_path }`;

       const [ primary = '#084F6A', secondary = '#75CEDB' ] = await getImageColors(uri);

        setMainColors({ primary, secondary });
    };

    useEffect(() => {
        if ( nowPlaying.length > 0 ) {
            getPosterColors(0);
        }
    }, [ nowPlaying ]);

    if (isLoading) {
        return (
            <View style={ styles.loadingView }>
                <ActivityIndicator color="red" size={ 60 } />
            </View>
        );
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>

                    {/* Carousel principal */}
                    <View style={ styles.carouselContainer }>
                        <Carousel
                            data={ nowPlaying }
                            renderItem={ ({ item }: any) => <MoviePoster movie={ item } /> }
                            sliderWidth={ screenWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            onSnapToItem={ index => getPosterColors(index) }
                        />
                    </View>
                    <HorizontalSlider title="Populares" movies={ popular } />
                    <HorizontalSlider title="Top" movies={ topRated } />
                    <HorizontalSlider title="Estrenos" movies={ upcoming } />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    carouselContainer: {
        height: 400
    }
});
