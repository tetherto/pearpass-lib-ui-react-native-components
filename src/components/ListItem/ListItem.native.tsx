import React, { useState } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import Check from '../../icons/components/Check.native'
import { useTheme } from '../../theme/ThemeContext'
import { withIconSize } from '../../utils'
import { ICON_SIZE } from './ListItem.config'
import { styles } from './ListItem.styles.native'
import {
  ListItemIconAlign,
  ListItemSelectionMode,
  ListItemSubtitle,
  ListItemSubtitleLayout,
  ListItemVariant
} from './types'

export type ListItemProps = {
  icon?: React.ReactNode
  iconSize?: number
  title: string
  subtitle?: ListItemSubtitle
  subtitleLayout?: ListItemSubtitleLayout
  rightElement?: React.ReactNode
  selected?: boolean
  showDivider?: boolean
  variant?: ListItemVariant
  iconAlign?: ListItemIconAlign
  selectionMode?: ListItemSelectionMode
  isSelected?: boolean
  onSelect?: () => void
  onClick?: () => void
  onLongPress?: () => void
  delayLongPress?: number
  testID?: string
  style?: StyleProp<ViewStyle>
}

export const ListItem = React.forwardRef<View, ListItemProps>(function ListItem(
  {
    icon,
    iconSize = ICON_SIZE,
    title,
    subtitle,
    subtitleLayout = 'horizontal',
    rightElement,
    selected = false,
    showDivider = false,
    variant = 'default',
    iconAlign = 'center',
    selectionMode = 'none',
    isSelected = false,
    onSelect,
    onClick,
    onLongPress,
    delayLongPress,
    testID,
    style: userStyle
  },
  ref
) {
  const { theme } = useTheme()
  const colors = theme.colors
  const [isPressed, setIsPressed] = useState(false)

  const renderSubtitle = () => {
    if (!subtitle) return null

    const segmentStyle = [styles.subtitle, { color: colors.colorTextSecondary }]

    if (typeof subtitle === 'string') {
      return (
        <Text style={[styles.subtitle, { color: colors.colorTextSecondary }]}>{subtitle}</Text>
      )
    }

    if (subtitleLayout === 'vertical') {
      return (
        <View style={styles.subtitleDividerContainerVertical}>
          <Text style={segmentStyle}>{subtitle.primary}</Text>
          <View
            style={[styles.dividerLineHorizontal, { backgroundColor: colors.colorBorderSecondary }]}
          />
          <Text style={segmentStyle}>{subtitle.secondary}</Text>
        </View>
      )
    }

    return (
      <View style={styles.subtitleDividerContainer}>
        <Text style={segmentStyle}>{subtitle.primary}</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.colorBorderSecondary }]} />
        <Text style={segmentStyle}>{subtitle.secondary}</Text>
      </View>
    )
  }

  return (
    <Pressable
      ref={ref}
      testID={testID}
      onPress={selectionMode === 'multi' ? onSelect : onClick}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.root,
        showDivider && [styles.showDivider, { borderBottomColor: colors.colorBorderSecondary }],
        (selected || isPressed) && { backgroundColor: colors.colorSurfaceHover },
        variant === 'destructive' && { backgroundColor: colors.colorSurfaceDestructive },
        userStyle
      ]}
    >
      {selectionMode === 'multi' && (
        <View
          style={[
            styles.checkbox,
            {
              borderColor: isSelected ? colors.colorPrimary : colors.colorBorderSecondary,
              backgroundColor: isSelected ? colors.colorPrimary : 'transparent'
            }
          ]}
        >
          {isSelected && <Check width={14} height={14} color={colors.colorOnPrimary} />}
        </View>
      )}

      {icon && (
        <View
          style={[
            styles.iconContainer,
            { width: iconSize, height: iconSize },
            iconAlign === 'top' && styles.iconAlignTop
          ]}
        >
          {withIconSize(icon, iconSize)}
        </View>
      )}

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.colorTextPrimary }]} numberOfLines={1}>
          {title}
        </Text>
        {renderSubtitle()}
      </View>

      {rightElement && <View style={styles.rightContainer}>{rightElement}</View>}
    </Pressable>
  )
})

ListItem.displayName = 'ListItem'
