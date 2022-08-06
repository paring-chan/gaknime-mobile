import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyledText } from '../components'
import { useTheme } from '../utils'

export const SearchPage: React.FC = () => {
  const theme = useTheme()

  const navigation = useNavigation()

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.footerBorder,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={navigation.goBack}
        >
          <Icon name="chevron-left" color={theme.text} size={16} />
        </TouchableOpacity>
        <TextInput
          style={{
            flexGrow: 1,
            width: 0,
            fontFamily: 'NotoSansKR-Regular',
            textAlignVertical: 'bottom',
            padding: 0,
            paddingRight: 8,
          }}
        />
        <TouchableOpacity>
          <Icon color={theme.text} name="search" size={24} />
        </TouchableOpacity>
      </View>
      <StyledText>Search</StyledText>
    </View>
  )
}
