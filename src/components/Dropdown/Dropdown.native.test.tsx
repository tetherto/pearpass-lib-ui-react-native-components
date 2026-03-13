import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View, Text, Pressable } from 'react-native'
import { Dropdown } from './Dropdown.native'

const mockPresent = jest.fn()

jest.mock('../../theme/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        colorSurfacePrimary: '#15180E',
        colorBorderPrimary: '#435123'
      }
    }
  })
}))

const MockBottomSheetModal = React.forwardRef<
  unknown,
  { children: React.ReactNode }
>(({ children }, ref) => {
  React.useImperativeHandle(ref, () => ({
    present: mockPresent,
    dismiss: jest.fn(),
    close: jest.fn()
  }))
  return <View testID="bottom-sheet-modal">{children}</View>
})
MockBottomSheetModal.displayName = 'BottomSheetModal'

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  default: View,
  BottomSheetModal: MockBottomSheetModal,
  BottomSheetScrollView: ({ children }: { children: React.ReactNode }) => (
    <View testID="bottom-sheet-scroll-view">{children}</View>
  ),
  BottomSheetBackdrop: () => null,
}))

beforeEach(() => {
  mockPresent.mockClear()
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

  it('calls present on trigger press', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<Text>Select</Text>}>
          <Text>Option 1</Text>
        </Dropdown>
      )
    })

    const root = component!.root
    const pressable = root.findByType(Pressable)

    act(() => {
      pressable.props.onPress()
    })

    expect(mockPresent).toHaveBeenCalled()
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
    expect(scrollView.children.length).toBe(3)
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
