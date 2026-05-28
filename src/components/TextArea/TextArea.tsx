import React from 'react'
import { html } from 'react-strict-dom'
import { styles } from './TextArea.styles'
import { FieldError } from '../FieldError'
import { Button } from '../Button'
import { ContentCopy } from '../../icons'
import { useTheme } from '../../theme'

type HtmlTextareaProps = React.ComponentProps<typeof html.textarea>

export type TextAreaProps = Omit<HtmlTextareaProps, 'onChange' | 'style'> & {
  label?: string
  error?: string
  disabled?: boolean
  onChange?: (value: string) => void
  testID?: string
  copyable?: boolean
  onCopy?: (value: string) => void
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      error,
      disabled = false,
      onChange,
      onFocus,
      onBlur,
      testID,
      copyable = false,
      onCopy,
      ...rest
    },
    ref
  ) {
    const [isFocused, setIsFocused] = React.useState(false)
    const id = React.useId()
    const errorId = `${id}-error`
    const { theme } = useTheme()

    const handleCopy = () => onCopy?.((rest.value as string) ?? '')

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value)
    }

    const handleFocus: HtmlTextareaProps['onFocus'] = (
      e: React.FocusEvent<HTMLTextAreaElement>
    ) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur: HtmlTextareaProps['onBlur'] = (
      e: React.FocusEvent<HTMLTextAreaElement>
    ) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <html.div style={styles.root} data-testid={testID}>
        <html.div
          style={[
            styles.inputWrapper,
            isFocused && !error && styles.inputWrapperFocused,
            !!error && styles.inputWrapperError,
            disabled && styles.inputWrapperDisabled
          ]}
        >
          {label && (
            <html.label for={id} style={styles.label}>
              {label}
            </html.label>
          )}
          <html.textarea
            {...rest}
            ref={ref}
            id={id}
            disabled={disabled}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
            style={[styles.textarea, disabled && styles.textareaDisabled]}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {copyable && (
            <html.div style={styles.copyButtonContainer}>
              <Button
                variant="tertiary"
                size="small"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                iconBefore={
                  <ContentCopy color={theme.colors.colorTextPrimary} />
                }
              />
            </html.div>
          )}
        </html.div>

        {error && <FieldError id={errorId}>{error}</FieldError>}
      </html.div>
    )
  }
)

TextArea.displayName = 'TextArea'
