import React from 'react'
import { Pressable as RNPressable, StyleProp, View, ViewStyle } from 'react-native'

export type PressableProps = {
  onClick?: () => void
  onLongPress?: () => void
  delayLongPress?: number
  onPressIn?: () => void
  onPressOut?: () => void
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  testID?: string
  'data-testid'?: string
}

export const Pressable = React.forwardRef<View, PressableProps>(
  function Pressable({ onClick, onLongPress, delayLongPress, onPressIn, onPressOut, style, testID, children }, ref) {
    return (
      <RNPressable
        ref={ref}
        onPress={onClick}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        testID={testID}
        style={style}
      >
        {children}
      </RNPressable>
    )
  }
)

Pressable.displayName = 'Pressable'
