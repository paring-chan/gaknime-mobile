import _ from 'lodash'
import React from 'react'
import { Gaknime } from '../types'

export const GaknimesContext = React.createContext<Gaknime[]>([])

export const useGaknimes = () => React.useContext(GaknimesContext)

export const randomCategories = (gaknimes: Gaknime[], count: number) => {
  const items = _.sampleSize(gaknimeCategories, count)

  return items.map((x) => ({ title: x.catchphrase, items: x.filter(gaknimes) }))
}

export type GaknimeCategory = {
  title: string
  items: Gaknime[]
}

export const gaknimeCategories: {
  catchphrase: string
  filter: (gaknimes: Gaknime[]) => Gaknime[]
}[] = [
  {
    catchphrase: '웃음이 절로 나오는 미니게임',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes('미니게임')),
  },
  {
    catchphrase: '엄마, 나 방송에 나왔어요!',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes('시참')),
  },
  {
    catchphrase: '마크가 아니여도 재밌잖아?',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter(
        (item) =>
          item.genres.includes('일상') || item.genres.includes('마크 외 게임')
      ),
  },
  {
    catchphrase: '어르신... 고생하시네요...',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes('패널티')),
  },
  {
    catchphrase:
      '지금까지 이런 크루는 없었다. 이것은 싸우는 건가 협동하는 걸까. 공각기동대입니다.',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes('공각기동대')),
  },
  {
    catchphrase: '우리 학교도 이렇게 가르쳐줬으면 재밌었을텐데...',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes('교육')),
  },
  {
    catchphrase: '사실은 오래전부터 당신 같은 개발자를 기다려 왔다우',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes('개발')),
  },
  {
    catchphrase: '라떼는... 이런 거 봤었어',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.tags.includes('그 시절')),
  },
  {
    catchphrase: '마크의 근본은 역시 야생이지',
    filter: (gaknimes: Gaknime[]) =>
      gaknimes.filter((item) => item.genres.includes('야생')),
  },
]
