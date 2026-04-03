import React, { useState } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './NavbarListItem.styles'
import { variantStyleMap, ICON_SIZE } from './NavbarListItem.config'
import { NavbarListItemVariant, NavbarListItemPlatform } from './types'
import { withIconSize, defaultPlatform } from '../../utils'

type HtmlButtonProps = React.ComponentProps<typeof html.button>

export type NavbarListItemProps = Omit<
  HtmlButtonProps,
  'children' | 'onClick'
> & {
  icon?: React.ReactNode
  iconSize?: number
  label?: string
  count?: number
  selected?: boolean
  variant?: NavbarListItemVariant
  platform?: NavbarListItemPlatform
  showDivider?: boolean
  onClick?: HtmlButtonProps['onClick']
  testID?: string
  additionalItems?: React.ReactNode
}

const ICON_ONLY_SIZE = ICON_SIZE + 16

export const NavbarListItem = React.forwardRef<
  HTMLButtonElement,
  NavbarListItemProps
>(function NavbarListItem(
  {
    icon,
    iconSize = ICON_SIZE,
    label,
    count,
    selected = false,
    variant = 'default',
    platform = defaultPlatform,
    showDivider = false,
    onClick,
    testID,
    additionalItems,
    ...rest
  },
  ref
) {
  const [isPressed, setIsPressed] = useState(false)
  const isMobile = platform === 'mobile'
  const isIconOnly = Boolean(icon) && !label && count === undefined

  return (
    <html.button
      {...rest}
      ref={ref}
      type="button"
      data-testid={testID}
      aria-selected={selected}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      style={[
        styles.root,
        isMobile && styles.mobile,
        showDivider && styles.divider,
        selected && styles.selected,
        isPressed && styles.pressed,
        variantStyleMap[variant],
        isIconOnly && styles.iconOnly(ICON_ONLY_SIZE)
      ]}
    >
      {icon && (
        <html.span
          style={[styles.icon, styles.iconSize(iconSize)]}
          aria-hidden={true}
        >
          {withIconSize(icon, iconSize)}
        </html.span>
      )}

      {label && <html.span style={styles.label}>{label}</html.span>}

      {count !== undefined && (
        <html.span style={styles.count} aria-label={`${count} items`}>
          {count}
        </html.span>
      )}

      {additionalItems && (
        <html.span style={styles.additionalItems}>{additionalItems}</html.span>
      )}
    </html.button>
  )
})

NavbarListItem.displayName = 'NavbarListItem'
