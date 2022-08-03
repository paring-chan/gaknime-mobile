import { atom } from 'recoil'

export enum MainTabType {
  Main,
  TagSearch,
  Settings,
}

export const currentTabAtom = atom<MainTabType>({
  key: 'main:currentTab',
  default: MainTabType.Main,
})
