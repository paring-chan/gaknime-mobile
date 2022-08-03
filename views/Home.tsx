import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Footer } from '../components'

const Home: React.FC = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Text>Hi sans</Text>
      </ScrollView>
      <Footer />
    </View>
  )
}

export default Home
