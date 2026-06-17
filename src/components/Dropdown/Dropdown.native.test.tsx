import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'
import { Dropdown } from './Dropdown.native'

jest.mock('@gorhom/bottom-sheet', () => {
  const { View } = jest.requireActual('react-native')
  return {
    __esModule: true,
    BottomSheetScrollView: ({ children }: { children: React.ReactNode }) => (
      <View testID="bottom-sheet-scroll-view">{children}</View>
    ),
  }
})

jest.mock('../NativeBottomSheet', () => {
  const { View, Pressable } = jest.requireActual('react-native')
  return {
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
  }
})

describe('Dropdown.native', () => {
  it('renders trigger correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<Text>Select</Text>}>
          <Text>Option 1</Text>
        </Dropdown>
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('renders children inside BottomSheetScrollView', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<Text>Select</Text>}>
          <Text>Option 1</Text>
          <Text>Option 2</Text>
          <Text>Option 3</Text>
        </Dropdown>
      )
    })

    const root = component!.root
    const scrollView = root.findByProps({ testID: 'bottom-sheet-scroll-view' })

    expect(scrollView).toBeDefined()
    expect(scrollView.findAllByType(Text).length).toBe(3)
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown
          trigger={<Text>Select</Text>}
          testID="dropdown-native"
        >
          <Text>Option 1</Text>
        </Dropdown>
      )
    })

    const root = component!.root
    const wrapper = root.findByProps({ testID: 'dropdown-native' })
    expect(wrapper).toBeDefined()
  })
})
