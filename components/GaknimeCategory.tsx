import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { GaknimeCategory as GaknimeCategoryType } from '../utils'
import { GaknimeCard } from './GaknimeCard'
import { StyledText } from './Text'

export const GaknimeCategory: React.FC<{ category: GaknimeCategoryType }> = ({
  category,
}) => {
  return (
    <View style={{ marginTop: 24, marginLeft: 24, marginRight: 24 }}>
      <StyledText
        style={{
          fontSize: 18,
        }}
        weight="Bold"
      >
        {category.title}
      </StyledText>
      <ScrollView
        horizontal
        style={{
          marginLeft: -24,
          marginRight: -24,
          paddingLeft: 24,
          marginTop: 8,
        }}
      >
        {category.items.map((gaknime) => (
          <GaknimeCard key={gaknime.id} gaknime={gaknime} />
        ))}
      </ScrollView>
    </View>
  )
}
