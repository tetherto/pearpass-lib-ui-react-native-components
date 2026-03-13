import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View, Text, Pressable } from 'react-native'
import { ContextMenu } from './ContextMenu.native'

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  BottomSheetView: ({ children }: { children: React.ReactNode }) => (
    <View testID="bottom-sheet-view">{children}</View>
  ),
}))

jest.mock('../NativeBottomSheet', () => ({
  NativeBottomSheet: ({ trigger, children, testID }: {
    trigger: React.ReactNode
    children: React.ReactNode
    testID?: string
  }) => (
    <View testID={testID}>
      <Pressable>{trigger}</Pressable>
      {children}
    </View>
  ),
}))

describe('ContextMenu.native', () => {
  it('renders trigger correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<Text>Open</Text>}>
          <Text>Menu content</Text>
        </ContextMenu>
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders children inside BottomSheetView', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<Text>Open</Text>}>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
          <Text>Item 3</Text>
        </ContextMenu>
      )
    })

    const root = component!.root
    const bottomSheetView = root.findByProps({ testID: 'bottom-sheet-view' })

    expect(bottomSheetView).toBeDefined()
    expect(bottomSheetView.children.length).toBe(3)
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu
          trigger={<Text>Open</Text>}
          testID="context-menu-native"
        >
          <Text>Menu content</Text>
        </ContextMenu>
      )
    })

    const root = component!.root
    const wrapper = root.findByProps({ testID: 'context-menu-native' })
    expect(wrapper).toBeDefined()
  })
})
