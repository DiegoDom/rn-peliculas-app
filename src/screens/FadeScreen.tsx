import React from 'react';
import { Animated, Button, View } from 'react-native';

import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {

    const { opacity, fadeIn, fadeOut } = useFade();

    return (
        <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{
                backgroundColor: '#064F6A',
                borderColor: 'white',
                borderWidth: 10,
                height: 150,
                marginBottom: 20,
                opacity,
                width: 150,
            }} />

            <Button title="FadeIn" onPress={ () => fadeIn() } />
            <Button title="FadeOut" onPress={ () => fadeOut() } />
        </View>
    );
};
