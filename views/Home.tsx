import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import { StyledText } from '../components'
import { Banner } from '../types'
import { useBanners } from '../utils'

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

export const Home: React.FC = () => {
  const banners = useBanners()

  return (
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
  )
}
