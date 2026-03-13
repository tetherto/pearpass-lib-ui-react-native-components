import { styles } from './ListItem.styles'
import { ListItemVariant } from './types'

export const ICON_SIZE = 32

export const variantStyleMap = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive
} satisfies Record<ListItemVariant, (typeof styles)[keyof typeof styles]>
