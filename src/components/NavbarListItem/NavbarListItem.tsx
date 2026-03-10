import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './NavbarListItem.styles'
import { variantStyleMap, ICON_SIZE } from './NavbarListItem.config'
import { NavbarListItemVariant, NavbarListItemPlatform } from './types'

const defaultPlatform: NavbarListItemPlatform =
  typeof document !== 'undefined' ? 'web' : 'mobile'

type HtmlButtonProps = React.ComponentProps<typeof html.button>

type SizableIconProps = {
  width?: number
  height?: number
}

export type NavbarListItemProps = Omit<
  HtmlButtonProps,
  'children' | 'onClick'
> & {
  icon?: React.ReactNode
  label?: string
  count?: number
  selected?: boolean
  variant?: NavbarListItemVariant
  platform?: NavbarListItemPlatform
  showDivider?: boolean
  onClick?: HtmlButtonProps['onClick']
  testID?: string
}

const ICON_ONLY_SIZE = ICON_SIZE + 16

export const NavbarListItem = React.forwardRef<
  HTMLButtonElement,
  NavbarListItemProps
>(function NavbarListItem(
  {
    icon,
    label,
    count,
    selected = false,
    variant = 'default',
    platform = defaultPlatform,
    showDivider = false,
    onClick,
    testID,
    ...rest
  },
  ref
) {
  const withIconSize = (iconElement: React.ReactNode) =>
    React.isValidElement<SizableIconProps>(iconElement)
      ? React.cloneElement(iconElement, { width: ICON_SIZE, height: ICON_SIZE })
      : iconElement

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
      style={[
        styles.root,
        isMobile && styles.mobile,
        showDivider && styles.divider,
        selected && styles.selected,
        variantStyleMap[variant],
        isIconOnly && styles.iconOnly(ICON_ONLY_SIZE)
      ]}
    >
      {icon && (
        <html.span
          style={[styles.icon, styles.iconSize(ICON_SIZE)]}
          aria-hidden={true}
        >
          {withIconSize(icon)}
        </html.span>
      )}

      {label && <html.span style={styles.label}>{label}</html.span>}

      {count !== undefined && (
        <html.span style={styles.count} aria-label={`${count} items`}>
          {count}
        </html.span>
      )}
    </html.button>
  )
})

NavbarListItem.displayName = 'NavbarListItem'
