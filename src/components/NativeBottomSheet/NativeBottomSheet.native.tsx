import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import { View, Pressable } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useTheme } from '../../theme/ThemeContext'
import { rawTokens } from '../../theme/tokens.raw'

const BottomSheetCloseContext = createContext<() => void>(() => {})

export const useBottomSheetClose = () => useContext(BottomSheetCloseContext)

export type NativeBottomSheetProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
  openOnLongPress?: boolean
}

export const NativeBottomSheet: React.FC<NativeBottomSheetProps> = ({
  trigger,
  children,
  testID,
  openOnLongPress = false
}) => {
  const { theme } = useTheme()
  // gorhom doesn't publicly export BottomSheetModalMethods, so any is the only viable ref type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomSheetRef = useRef<any>(null)

  const backgroundStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary,
    borderTopLeftRadius: rawTokens.radius16,
    borderTopRightRadius: rawTokens.radius16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.colorSurfaceDisabled
  }), [theme])

  const sheetContainerStyle = useMemo(() => ({
    backgroundColor: theme.colors.colorSurfacePrimary,
    borderTopLeftRadius: rawTokens.radius16,
    borderTopRightRadius: rawTokens.radius16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.colorSurfaceDisabled,
    overflow: 'hidden' as const
  }), [theme])

  const handlePillStyle = useMemo(() => ({
    width: rawTokens.spacing32,
    height: rawTokens.spacing4,
    borderRadius: rawTokens.spacing8,
    backgroundColor: theme.colors.colorSurfaceElevatedOnInteraction
  }), [theme])

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss()
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  const triggerElement = openOnLongPress
    ? React.isValidElement(trigger)
      ? React.cloneElement(trigger as React.ReactElement<{ onLongPress?: () => void }>, {
          onLongPress: handleOpen
        })
      : trigger
    : (
      <Pressable onPress={handleOpen}>
        {React.isValidElement(trigger)
          ? React.cloneElement(trigger as React.ReactElement<{ onClick?: () => void }>, {
              onClick: handleOpen
            })
          : trigger}
      </Pressable>
    )

  return (
    <View testID={testID}>
      {triggerElement}

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        backgroundStyle={backgroundStyle}
        handleComponent={null}
      >
        <BottomSheetView>
          <View style={sheetContainerStyle}>
            <View style={{ alignItems: 'center', paddingTop: rawTokens.spacing12, paddingBottom: rawTokens.spacing8 }}>
              <View style={handlePillStyle} />
            </View>
            <BottomSheetCloseContext.Provider value={handleClose}>
              {children}
            </BottomSheetCloseContext.Provider>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

NativeBottomSheet.displayName = 'NativeBottomSheet'
