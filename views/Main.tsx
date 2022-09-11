import React from 'react'
import { View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { Footer } from '../components'
import { currentTabAtom, MainTabType } from '../utils'
import { Home } from './Home'
import { TagSearch } from './TagSearch'

const Main: React.FC = () => {
  const currentTab = useRecoilValue(currentTabAtom)

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {currentTab === MainTabType.Main && <Home />}
      {currentTab === MainTabType.TagSearch && <TagSearch />}
      <Footer />
    </View>
  )
}

export default Main
