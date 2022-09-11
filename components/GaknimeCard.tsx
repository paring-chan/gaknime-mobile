import React from 'react'
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Gaknime } from '../types'
import { StyledText } from './Text'

export const GaknimeCard: React.FC<{
  gaknime: Gaknime
  style?: StyleProp<ViewStyle>
}> = ({ gaknime, style }) => {
  return (
    <View style={[{ marginRight: 24, width: 180 }, style]}>
      <View>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            style={{
              aspectRatio: 16 / 9,
              borderRadius: 12,
            }}
            source={{
              uri: `https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg`,
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <StyledText
            style={{
              fontSize: 14,
              marginTop: 8,
            }}
            weight="Bold"
          >
            {gaknime.title}
          </StyledText>
        </View>
      </View>
    </View>
  )
}
