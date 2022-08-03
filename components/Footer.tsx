import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRecoilState } from 'recoil'
import { currentTabAtom, MainTabType, useTheme } from '../utils'
import { StyledText } from './Text'

const FooterButton: React.FC<{
  value: MainTabType
  icon: string
  text: string
}> = ({ value, icon, text }) => {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabAtom)

  const isActive = React.useMemo(() => {
    return currentTab === value
  }, [currentTab, value])

  const onClick = React.useCallback(() => {
    setCurrentTab(value)
  }, [setCurrentTab, value])

  const theme = useTheme()

  const color = React.useMemo(
    () => (isActive ? theme.primary : theme.inactiveFooterItem),
    [isActive, theme]
  )

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <Icon color={color} name={icon} size={16} />
      <StyledText style={{ marginTop: 4, color }}>{text}</StyledText>
    </TouchableOpacity>
  )
}

export const Footer: React.FC = () => {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: theme.footerBorder,
      }}
    >
      <FooterButton value={MainTabType.Main} icon="list" text="메인" />
      <FooterButton
        value={MainTabType.TagSearch}
        icon="check"
        text="태그 검색"
      />
      <FooterButton value={MainTabType.Settings} icon="cogs" text="설정" />
    </View>
  )
}
