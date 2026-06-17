import React from 'react'
import { View, TextInput } from 'react-native'

// Lightweight mock of @gorhom/bottom-sheet for jest. The real package is an
// optional peer dependency that is not installed in this repo, so the native
// component suites need a stand-in that simply renders its children.

type ChildrenProps = { children?: React.ReactNode }

const noop = () => undefined

export const BottomSheetModal = React.forwardRef<unknown, ChildrenProps>(
  function BottomSheetModal({ children }, ref) {
    React.useImperativeHandle(ref, () => ({
      present: noop,
      dismiss: noop,
      close: noop,
      expand: noop,
      collapse: noop,
      snapToIndex: noop,
      snapToPosition: noop,
      forceClose: noop,
    }))
    return <View>{children}</View>
  }
)

export const BottomSheetModalProvider = ({ children }: ChildrenProps) => (
  <View>{children}</View>
)

export const BottomSheetView = ({ children }: ChildrenProps) => <View>{children}</View>

export const BottomSheetScrollView = ({ children }: ChildrenProps) => (
  <View>{children}</View>
)

export const BottomSheetBackdrop = () => <View />

export const BottomSheetTextInput = React.forwardRef<unknown, Record<string, unknown>>(
  function BottomSheetTextInput(props, ref) {
    return <TextInput ref={ref as never} {...(props as object)} />
  }
)

export const BottomSheetFlatList = ({ children }: ChildrenProps) => (
  <View>{children}</View>
)

export const useBottomSheetModal = () => ({ dismiss: noop, dismissAll: noop })

export const useBottomSheet = () => ({
  close: noop,
  expand: noop,
  collapse: noop,
  snapToIndex: noop,
})

export default BottomSheetModal
