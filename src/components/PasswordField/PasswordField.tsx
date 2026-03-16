import React from 'react';
import { html } from 'react-strict-dom';
import { EyeFilled, EyeOutlined } from '../../icons';
import { InputField } from '../InputField/InputField';
import { PasswordIndicator } from '../PasswordIndicator/PasswordIndicator';
import { useTheme } from '../../theme';
import { styles } from './PasswordField.styles';
import { PasswordFieldProps } from './types';
import { Button } from '../Button'

const EYE_OPEN_LABEL = 'Hide password';
const EYE_CLOSED_LABEL = 'Show password';

export const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
  const {
    label,
    value,
    placeholderText,
    onChangeText,
    variant = 'default',
    errorMessage,
    passwordIndicator,
    isGrouped,
    testID,
  } = props;

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible((prev) => !prev);

  const rightSlot = (
    <html.div style={styles.rightSlotContainer}>
      {passwordIndicator && (
        <>
          <PasswordIndicator variant={passwordIndicator} />
          <html.div style={styles.divider} />
        </>
      )}
      <Button
        variant={"tertiary"}
        onClick={toggleVisibility}
        aria-label={isVisible ? EYE_OPEN_LABEL : EYE_CLOSED_LABEL}
        style={styles.eyeButton}
        data-testid="password-field-eye-button"
      >
        {isVisible
          ? <EyeFilled width={16} height={16} color={theme.colors.colorTextPrimary} />
          : <EyeOutlined width={16} height={16} color={theme.colors.colorTextPrimary} />
        }
      </Button>
    </html.div>
  );

  return (
    <InputField
      label={label}
      value={value}
      placeholderText={placeholderText}
      onChangeText={onChangeText}
      variant={variant}
      errorMessage={errorMessage}
      inputType={isVisible ? 'text' : 'password'}
      rightSlot={rightSlot}
      isGrouped={isGrouped}
      testID={testID}
    />
  );
};

PasswordField.displayName = 'PasswordField';
