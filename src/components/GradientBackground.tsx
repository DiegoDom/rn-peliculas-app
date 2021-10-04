import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({ children }: Props) => {

    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);

    const { primary, secondary } = colors;
    const { primary: prevPrimary, secondary: prevSecondary } = prevColors;

    const { opacity , fadeIn, fadeOut } = useFade();

    useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors);
            fadeOut(0);
        });
    }, [ colors ]);

    return (
        <View style={ styles.container }>
            <LinearGradient
                colors={[ prevPrimary, prevSecondary, 'white' ]}
                style={ styles.gradiente }
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.7 }}
            />

            <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
                <LinearGradient
                    colors={[ primary, secondary, 'white' ]}
                    style={ styles.gradiente }
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.5, y: 0.7 }}
                />
            </Animated.View>

            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradiente: {
        ...StyleSheet.absoluteFillObject
    },
    animatedView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'red'
    }
});

