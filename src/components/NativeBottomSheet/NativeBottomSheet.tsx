import React, { useCallback, useMemo, useRef } from 'react'
import { View, Pressable } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useTheme } from '../../theme/ThemeContext'

export type NativeBottomSheetProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = ({ trigger, children, testID }) => {
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const backgroundStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary
  }), [theme])

  const handleIndicatorStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorBorderPrimary
  }), [theme])

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  return (
    <View testID={testID}>
      <Pressable onPress={handleOpen}>
        <View pointerEvents="none">{trigger}</View>
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleIndicatorStyle}
      >
        {children}
      </BottomSheetModal>
    </View>
  )
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
