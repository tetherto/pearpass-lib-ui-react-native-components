import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { NativeBottomSheet } from '../NativeBottomSheet'

export type DropdownProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, testID }) => {
  return (
    <NativeBottomSheet trigger={trigger} testID={testID}>
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </NativeBottomSheet>
  )
}

Dropdown.displayName = 'Dropdown'
