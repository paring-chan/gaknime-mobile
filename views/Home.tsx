import React from 'react'
import { ScrollView, useColorScheme, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyledText, GaknimeCategory } from '../components'
import { Banner } from '../types'
import { randomCategories, useBanners, useGaknimes, useTheme } from '../utils'

const BannerItem: React.FC<{ banner: Banner }> = ({ banner }) => {
  return (
    <View style={{ height: '100%', overflow: 'hidden' }}>
      <FastImage
        style={{
          width: 1300,
          height: 520,
          position: 'absolute',
          bottom: 0,
          right: -160,
        }}
        source={{
          uri: `https://gakni.tech/banners/${banner.directory}/banner.png`,
          priority: FastImage.priority.high,
        }}
      />
      <View
        style={{ position: 'absolute', width: '100%', bottom: 56, left: 24 }}
      >
        <FastImage
          source={{
            uri: `https://gakni.tech/banners/${banner.directory}/logo.png`,
          }}
          style={{
            width: 488 / 1.5,
            height: 250 / 1.5,
            marginBottom: 12,
          }}
        />
        <StyledText style={{ fontSize: 18, color: '#fff' }} weight="Bold">
          {banner.catchPhrase}
        </StyledText>
      </View>
    </View>
  )
}

const Header: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const theme = useTheme()

  const opacity = React.useMemo(() => Math.min(1, scrollY / 120), [scrollY])

  const isDark = useColorScheme() === 'dark'

  const iconColor = React.useMemo(() => (isDark ? '#fff' : '#000'), [isDark])

  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        backgroundColor: `rgba(${
          isDark ? '0, 0, 0' : '255, 255, 255'
        }, ${opacity})`,
        height: 48,
      }}
    >
      <StyledText
        style={{
          color: theme.text,
          alignSelf: 'center',
          top: 12,
          fontSize: 24,
          lineHeight: 32,
          opacity: Math.min(1, scrollY / 60),
        }}
        weight="Black"
      >
        GAKNIME
      </StyledText>
      <Icon
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          color: '#fff',
          opacity: 1 - opacity,
        }}
        name="search"
        size={24}
      />
      <Icon
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          color: iconColor,
          opacity: opacity,
        }}
        name="search"
        size={24}
      />
    </View>
  )
}

export const Home: React.FC = () => {
  const banners = useBanners()

  const [scrollY, setScrollY] = React.useState(0)

  const gaknimes = useGaknimes()

  const categories = React.useMemo(() => {
    return randomCategories(gaknimes, 5)
  }, [gaknimes])

  return (
    <View style={{ flexGrow: 1, height: 0 }}>
      <ScrollView
        style={{ height: '100%', width: '100%' }}
        onScroll={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y)
        }}
      >
        <View style={{ height: 520 }}>
          <Swiper
            autoplay
            autoplayTimeout={5}
            dotColor="rgba(255, 255, 255, 0.4)"
            activeDotColor="#fff"
          >
            {banners.map((x, i) => (
              <BannerItem banner={x} key={i} />
            ))}
          </Swiper>
        </View>
        <View>
          {categories.map((x, i) => (
            <GaknimeCategory category={x} key={i} />
          ))}
        </View>
      </ScrollView>
      <Header scrollY={scrollY} />
    </View>
  )
}
