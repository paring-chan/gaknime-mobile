import React from 'react'
import { View } from 'react-native'
import { StyledText } from '../components'
import { useBanners } from '../utils'

export const Home: React.FC = () => {
  const banners = useBanners()

  return (
    <View>
      {banners.map((x, i) => (
        <StyledText key={i}>{x.catchPhrase}</StyledText>
      ))}
    </View>
  )
}
