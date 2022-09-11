import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyledText } from '../components'
import { useTheme } from '../utils'

export const TagSearch: React.FC = () => {
  const theme = useTheme()

  const navigation = useNavigation()

  const search = React.useCallback(() => {
    navigation.navigate('Search' as unknown as { key: string })
  }, [navigation])

  return (
    <View style={{ flexGrow: 1, height: 0 }}>
      <View
        style={{
          height: 48,
          paddingRight: 12,
          paddingLeft: 12,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: 'rgba(0, 0, 0, 0.2)',
          borderBottomWidth: 1,
        }}
      >
        <StyledText
          style={{
            lineHeight: 28,
            fontSize: 20,
          }}
          weight="Bold"
        >
          태그검색
        </StyledText>

        <TouchableOpacity onPress={search}>
          <Icon name="search" color={theme.text} size={18} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: '100%', flexGrow: 1, height: 0 }}>
        <Text>Hi</Text>
      </ScrollView>
    </View>
  )
}
