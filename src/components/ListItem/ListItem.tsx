import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './ListItem.styles'
import { ICON_SIZE, variantStyleMap } from './ListItem.config'
import { ListItemSubtitle, ListItemSubtitleLayout, ListItemPlatform, ListItemVariant, ListItemIconAlign, ListItemSelectionMode } from './types'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import { withIconSize, defaultPlatform } from '../../utils'

type HtmlDivProps = React.ComponentProps<typeof html.div>

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
  variant?: ListItemVariant
  iconAlign?: ListItemIconAlign
  selectionMode?: ListItemSelectionMode
  isSelected?: boolean
  onSelect?: () => void
  testID?: string
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem(
    { icon, iconSize = ICON_SIZE, title, subtitle, subtitleLayout = 'horizontal', rightElement, platform = defaultPlatform, selected = false, showDivider = false, variant = 'default', iconAlign = 'center', selectionMode = 'none', isSelected = false, onSelect, testID, ...rest },
    ref
  ) {
    const renderSubtitle = () => {
      if (!subtitle) return null

      if (typeof subtitle === 'string') {
        return <Text style={styles.subtitle}>{subtitle}</Text>
      }

      if (subtitleLayout === 'vertical') {
        return (
          <html.div style={styles.subtitleDividerContainerVertical}>
            <Text style={styles.subtitleSegment}>{subtitle.primary}</Text>
            <html.div style={styles.dividerLineHorizontal} />
            <Text style={styles.subtitleSegment}>{subtitle.secondary}</Text>
          </html.div>
        )
      }

      return (
        <html.div style={styles.subtitleDividerContainer}>
          <Text style={styles.subtitleSegment}>{subtitle.primary}</Text>
          <html.div style={styles.dividerLine} />
          <Text style={styles.subtitleSegment}>{subtitle.secondary}</Text>
        </html.div>
      )
    }

    return (
      <html.div {...rest} ref={ref} data-testid={testID} style={[styles.root, platform === 'mobile' && styles.mobile, selected && styles.selected, showDivider && styles.showDivider, variantStyleMap[variant]]}>
        {selectionMode === 'multi' && (
          <Checkbox checked={isSelected} onChange={onSelect ? () => onSelect() : undefined} />
        )}

        {icon && (
          <html.span
            style={[styles.iconContainer, styles.iconSize(iconSize), iconAlign === 'top' && styles.iconAlignTop]}
            aria-hidden={true}
          >
            {withIconSize(icon, iconSize)}
          </html.span>
        )}

        <html.div style={styles.content}>
          <Text style={styles.title}>{title}</Text>
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
