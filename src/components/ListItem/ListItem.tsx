import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './ListItem.styles'
import { ICON_SIZE } from './ListItem.config'
import { ListItemSubtitle, ListItemSubtitleLayout, ListItemPlatform } from './types'

const defaultPlatform: ListItemPlatform =
  typeof document !== 'undefined' ? 'web' : 'mobile'

type HtmlDivProps = React.ComponentProps<typeof html.div>

type SizableIconProps = {
  width?: number
  height?: number
}

export type ListItemProps = Omit<HtmlDivProps, 'children'> & {
  icon?: React.ReactNode
  iconSize?: number
  title: string
  subtitle?: ListItemSubtitle
  subtitleLayout?: ListItemSubtitleLayout
  rightElement?: React.ReactNode
  platform?: ListItemPlatform
  selected?: boolean
  showDivider?: boolean
  testID?: string
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem(
    { icon, iconSize = ICON_SIZE, title, subtitle, subtitleLayout = 'horizontal', rightElement, platform = defaultPlatform, selected = false, showDivider = false, testID, ...rest },
    ref
  ) {
    const withIconSize = (iconElement: React.ReactNode) =>
      React.isValidElement<SizableIconProps>(iconElement)
        ? React.cloneElement(iconElement, { width: iconSize, height: iconSize })
        : iconElement

    const renderSubtitle = () => {
      if (!subtitle) return null

      if (typeof subtitle === 'string') {
        return <html.span style={styles.subtitle}>{subtitle}</html.span>
      }

      if (subtitleLayout === 'vertical') {
        return (
          <html.div style={styles.subtitleDividerContainerVertical}>
            <html.span style={styles.subtitleSegment}>{subtitle.primary}</html.span>
            <html.div style={styles.dividerLineHorizontal} />
            <html.span style={styles.subtitleSegment}>{subtitle.secondary}</html.span>
          </html.div>
        )
      }

      return (
        <html.div style={styles.subtitleDividerContainer}>
          <html.span style={styles.subtitleSegment}>{subtitle.primary}</html.span>
          <html.div style={styles.dividerLine} />
          <html.span style={styles.subtitleSegment}>{subtitle.secondary}</html.span>
        </html.div>
      )
    }

    return (
      <html.div {...rest} ref={ref} data-testid={testID} style={[styles.root, platform === 'mobile' && styles.mobile, selected && styles.selected, showDivider && styles.showDivider]}>
        {icon && (
          <html.span
            style={[styles.iconContainer, styles.iconSize(iconSize)]}
            aria-hidden={true}
          >
            {withIconSize(icon)}
          </html.span>
        )}

        <html.div style={styles.content}>
          <html.span style={styles.title}>{title}</html.span>
          {renderSubtitle()}
        </html.div>

        {rightElement && (
          <html.div style={styles.rightContainer}>{rightElement}</html.div>
        )}
      </html.div>
    )
  }
)

ListItem.displayName = 'ListItem'
