import React from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { NativeBottomSheet } from '../NativeBottomSheet'

export type ContextMenuProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, children, testID }) => {
  return (
    <NativeBottomSheet trigger={trigger} testID={testID}>
      <BottomSheetView>{children}</BottomSheetView>
    </NativeBottomSheet>
  )
}

ContextMenu.displayName = 'ContextMenu'
