import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './MultiSlotInput.styles';
import { MultiSlotInputProps } from './types';
import { InputField } from '../InputField/InputField';
import { FieldError } from '../FieldError/FieldError';
import { Button } from '../Button/Button';
import SvgAdd from '../../icons/components/Add';
import SvgClose from '../../icons/components/Close';
import { useTheme } from '../../theme';

export const MultiSlotInput = (props: MultiSlotInputProps): React.ReactElement => {
  const {
    label,
    values,
    onAdd,
    onChangeItem,
    onRemove,
    placeholder,
    placeholderText,
    addButtonLabel = 'Add another',
    errorMessage,
    maxSlots,
    disabled = false,
    leftSlot,
    rightSlot,
    testID,
  } = props;

  const { theme } = useTheme();
  const resolvedPlaceholder = placeholder ?? placeholderText;
  const isAtMax = maxSlots !== undefined && values.length >= maxSlots;

  return (
    <html.div style={styles.root} data-testid={testID}>
      <html.div style={[styles.container, !!errorMessage && styles.containerError]}>
        {values.map((value, index) => {
          const slotRemoveButton = !disabled && values.length > 1 ? (
            <Button
              variant="tertiary"
              size="small"
              aria-label={`Remove slot ${index + 1}`}
              onClick={() => onRemove(index)}
              data-testid={testID ? `${testID}-remove-button-${index}` : undefined}
              iconBefore={<SvgClose color={theme.colors.colorPrimary} />}
            />
          ) : undefined;

          const resolvedRightSlot = rightSlot ? (
            <>
              {rightSlot(index)}
              {slotRemoveButton}
            </>
          ) : slotRemoveButton;

          return (
            <html.div style={styles.row} key={index}>
              <InputField
                label={label}
                value={value}
                placeholder={resolvedPlaceholder}
                onChangeText={(text) => onChangeItem(index, text)}
                variant={'default'}
                isGrouped={true}
                disabled={disabled}
                testID={testID ? `${testID}-slot-${index}` : undefined}
                leftSlot={leftSlot}
                rightSlot={resolvedRightSlot}
              />
            </html.div>
          );
        })}

        {!isAtMax && !disabled && (
          <html.div style={styles.ctaSlot}>
            <Button
              variant="tertiary"
              onClick={onAdd}
              aria-label={addButtonLabel}
              data-testid={testID ? `${testID}-add-button` : undefined}
              iconBefore={<SvgAdd color={theme.colors.colorPrimary} />}
            >
              {addButtonLabel}
            </Button>
          </html.div>
        )}
      </html.div>

      {errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </html.div>
  );
};

MultiSlotInput.displayName = 'MultiSlotInput';