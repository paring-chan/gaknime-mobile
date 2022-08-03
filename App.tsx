/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import RNRestart from 'react-native-restart'
import React from 'react'

import Main from './views/Main'
import { BackHandler, Text, useColorScheme, View } from 'react-native'
import axios from 'axios'
import { Banner, Gaknime } from './types'
import { StyledText } from './components/Text'
import { Button } from './components'
import { BannersContext, GaknimesContext, ThemeContext } from './utils'
import { RecoilRoot } from 'recoil'

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
      // TODO
      return {
        text: '#fff',
        textInverted: '#000',
        footerBorder: 'rgba(255, 255, 255, 0.2)',
        primary: '#cccc00',
        inactiveFooterItem: 'rgba(255, 255, 255, 0.4)',
        background: '#222222',
      }
    }

    return {
      text: '#000',
      textInverted: '#fff',
      footerBorder: 'rgba(0, 0, 0, 0.2)',
      primary: '#cccc00',
      inactiveFooterItem: 'rgba(0, 0, 0, 0.4)',
      background: '#fff',
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
    <View style={{ backgroundColor: theme.background, height: '100%' }}>
      <RecoilRoot>
        <ThemeContext.Provider value={theme}>
          <GaknimesContext.Provider value={gaknimes}>
            <BannersContext.Provider value={banners}>
              <Main />
            </BannersContext.Provider>
          </GaknimesContext.Provider>
        </ThemeContext.Provider>
      </RecoilRoot>
    </View>
  )
}

export default App
