import React from 'react'
import { Text } from 'react-native'

export const stringify = (input: any) => JSON.stringify(input, null, 2)

export const Break = () => <Text>{'\n'}</Text>