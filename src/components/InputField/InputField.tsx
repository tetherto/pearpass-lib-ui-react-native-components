import React from 'react';
import { html } from 'react-strict-dom';
import { styles, variantContainerStyleMap } from './InputField.styles';
import { FieldError } from '../FieldError/FieldError';
import { Text } from '../Text/Text';
import { ContentCopy } from '../../icons';
import { InputFieldProps } from './types';

export const InputField = (props: InputFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholderText,
    onChangeText,
    variant = 'default',
    errorMessage,
    inputType = 'text',
    rightSlot,
    isGrouped,
    testID,
    inputRef,
    copyable = false,
    onCopy,
  } = props;

  const handleCopy = () => {
    if (onCopy) {
      onCopy(value);
    }
  };
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <html.div style={styles.wrapper} data-testid={testID}>
      <html.div style={[
        variantContainerStyleMap[variant],
        isGrouped && styles.containerGrouped,
        isFocused && variant !== 'error' && styles.containerFocused
      ]}>
        <html.div style={styles.innerColumn}>
          <Text variant="label" style={styles.label}>{label}</Text>
          <html.input
            ref={inputRef}
            type={inputType}
            value={value}
            placeholder={placeholderText}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.input}
          />
        </html.div>
        {(rightSlot || copyable) && (
          <html.div style={styles.rightSlotContainer}>
            {rightSlot}
            {copyable && (
              <html.div
                onClick={handleCopy}
                role="button"
                tabIndex={0}
                aria-label="Copy to clipboard"
                style={styles.copyButton}
              >
                <ContentCopy />
              </html.div>
            )}
          </html.div>
        )}
      </html.div>
      {errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </html.div>
  );
};

InputField.displayName = 'InputField';
