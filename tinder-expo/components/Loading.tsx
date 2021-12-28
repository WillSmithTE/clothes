import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View } from 'react-native';

export const Loading = () => {
    return <View style={{ width: '100%' }}>
        <Text>Loading...</Text>
        <AnimatedCircularProgress size={120} width={15} fill={0}/>
    </View>;
};