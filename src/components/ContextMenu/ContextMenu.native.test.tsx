import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View, Text, Pressable } from 'react-native'
import { ContextMenu } from './ContextMenu.native'

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
  BottomSheetView: ({ children }: { children: React.ReactNode }) => (
    <View testID="bottom-sheet-view">{children}</View>
  ),
  BottomSheetBackdrop: () => null,
}))

beforeEach(() => {
  mockPresent.mockClear()
})

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

  it('calls present on trigger press', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<Text>Open</Text>}>
          <Text>Menu content</Text>
        </ContextMenu>
      )
    })

    const root = component!.root
    const pressable = root.findByType(Pressable)

    act(() => {
      pressable.props.onPress()
    })

    expect(mockPresent).toHaveBeenCalled()
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
