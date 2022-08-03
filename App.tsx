/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import RNRestart from 'react-native-restart'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/Home'
import { BackHandler, Text, useColorScheme, View } from 'react-native'
import axios from 'axios'
import { Banner, Gaknime } from './types'
import { StyledText } from './components/Text'
import { Button } from './components'
import { BannersContext, GaknimesContext } from './utils'
import { ThemeContext } from 'styled-components'

const Stack = createNativeStackNavigator()

const App = () => {
  const isDark = useColorScheme() === 'dark'

  const [loading, setLoading] = React.useState(true)

  const [error, setError] = React.useState<Error | null>(null)

  const [gaknimes, setGaknimes] = React.useState<Gaknime[]>([])

  const [banners, setBanners] = React.useState<Banner[]>([])

  React.useEffect(() => {
    ;(async () => {
      const { data: gaknimes } = await axios.get<Gaknime[]>(
        'https://gakni.tech/gaknimes.json'
      )

      setGaknimes(gaknimes)

      const { data: banners } = await axios.get<Banner[]>(
        'https://gakni.tech/banners.json'
      )

      setBanners(banners)

      setLoading(false)
    })().catch((err) => {
      setError(err)
      setLoading(false)
    })
  }, [])

  const restartApp = React.useCallback(() => {
    RNRestart.Restart()
  }, [])

  const exitApp = React.useCallback(() => {
    BackHandler.exitApp()
  }, [])

  const theme = React.useMemo(() => {
    if (isDark) {
      return {}
    }

    return {
      text: '#000',
    }
  }, [isDark])

  return loading ? null : error ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <StyledText style={{ fontSize: 24 }} weight="Bold">
        앗! 오류가 발생했어요!
      </StyledText>
      <StyledText style={{ fontSize: 16 }} weight="Light">
        {error.message}
      </StyledText>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
        <Button onClick={restartApp}>
          <StyledText style={{ color: '#fff' }}>재시작하기</StyledText>
        </Button>
        <Button onClick={exitApp} style={{ marginLeft: 12 }}>
          <StyledText style={{ color: '#fff' }}>나가기</StyledText>
        </Button>
      </View>
    </View>
  ) : (
    <ThemeContext.Provider value={theme}>
      <GaknimesContext.Provider value={gaknimes}>
        <BannersContext.Provider value={banners}>
          <NavigationContainer
            theme={{
              dark: isDark,
              colors: {
                background: 'var(--background)',
                border: 'var(--border)',
                card: 'var(--card)',
                notification: 'var(--notification)',
                primary: 'var(--primary)',
                text: 'var(--text)',
              },
            }}
          >
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BannersContext.Provider>
      </GaknimesContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
