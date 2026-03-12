import React, { useState, useCallback, useEffect } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './ContextMenu.styles'
import { MENU_WIDTH } from './ContextMenu.config'

type HtmlDivProps = React.ComponentProps<typeof html.div>

export type ContextMenuProps = Omit<HtmlDivProps, 'children'> & {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  menuWidth?: number
  testID?: string
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  function ContextMenu(
    { trigger, children, open, onOpenChange, menuWidth = MENU_WIDTH, testID, ...rest },
    ref
  ) {
    const isControlled = open !== undefined
    const [internalOpen, setInternalOpen] = useState(false)
    const isOpen = isControlled ? open : internalOpen

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    const toggle = useCallback(() => {
      setOpen(!isOpen)
    }, [setOpen, isOpen])

    const close = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    useEffect(() => {
      if (!isOpen) return
      if (typeof document === 'undefined') return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, close])

    return (
      <html.div {...rest} ref={ref} data-testid={testID} style={styles.triggerWrapper}>
        <html.div onClick={toggle}>{trigger}</html.div>

        {isOpen && (
          <>
            <html.div style={styles.overlay} onClick={close} />
            <html.div role="menu" style={[styles.menuContainer, styles.menuWidth(menuWidth)]}>
              {children}
            </html.div>
          </>
        )}
      </html.div>
    )
  }
)

ContextMenu.displayName = 'ContextMenu'
