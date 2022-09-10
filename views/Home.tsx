import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyledText, GaknimeCategory, StyledAnimatedText } from '../components'
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

const Header: React.FC<{ scrollY: SharedValue<number> }> = ({ scrollY }) => {
  const theme = useTheme()

  const isDark = useColorScheme() === 'dark'

  const iconColor = React.useMemo(() => (isDark ? '#fff' : '#000'), [isDark])

  const navigation = useNavigation()

  const search = React.useCallback(() => {
    navigation.navigate('Search' as unknown as { key: string })
  }, [navigation])

  const containerStyle = useAnimatedStyle(() => {
    const op = interpolate(scrollY.value, [0, 200], [0, 1])

    const rgb = isDark ? '0, 0, 0' : '255, 255, 255'

    return { backgroundColor: `rgba(${rgb}, ${Math.max(0, Math.min(op, 1))})` }
  })

  const logoStyle = useAnimatedStyle(() => {
    const op = interpolate(scrollY.value, [0, 200], [0, 1])

    return { opacity: Math.max(0, Math.min(op, 1)) }
  })

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          position: 'absolute',
          height: 48,
        },
        containerStyle,
      ]}
    >
      <StyledAnimatedText
        style={[
          {
            color: theme.text,
            alignSelf: 'center',
            top: 12,
            fontSize: 24,
            lineHeight: 32,
          },
          logoStyle,
        ]}
        weight="Black"
      >
        GAKNIME
      </StyledAnimatedText>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          width: 24,
          height: 24,
        }}
        onPress={search}
      >
        <Text
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1,
            color: '#fff',
          }}
        >
          <Icon name="search" size={24} />
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export const Home: React.FC = () => {
  const banners = useBanners()

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const gaknimes = useGaknimes()

  const categories = React.useMemo(() => {
    return randomCategories(gaknimes, 5)
  }, [gaknimes])

  return (
    <View style={{ flexGrow: 1, height: 0 }}>
      <Animated.ScrollView
        style={{ height: '100%', width: '100%' }}
        onScroll={scrollHandler}
        scrollEventThrottle={1}
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
      </Animated.ScrollView>
      <Header scrollY={scrollY} />
    </View>
  )
}
