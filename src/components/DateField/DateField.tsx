import React from 'react';
import { CalendarToday, Close } from '../../icons';
import { useTheme } from '../../theme';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { DateFieldProps } from './types';

export const DateField = ({
  pickerMode: _pickerMode,
  valueDate: _valueDate,
  onChangeDate,
  minimumDate: _minimumDate,
  maximumDate: _maximumDate,
  locale: _locale,
  clearable = true,
  rightSlot,
  value,
  onChangeText,
  disabled = false,
  ...props
}: DateFieldProps): React.ReactElement => {
  const { theme } = useTheme();

  const showClear = clearable && Boolean(value) && !disabled;

  const handleClear = (event?: { stopPropagation?: () => void }) => {
    event?.stopPropagation?.();
    onChangeText?.('');
    onChangeDate?.(null);
  };

  const resolvedRightSlot =
    rightSlot ??
    (showClear ? (
      <Button
        variant="tertiary"
        size="small"
        onClick={handleClear}
        aria-label="Clear date"
        iconBefore={<Close color={theme.colors.colorTextPrimary} />}
      />
    ) : (
      <CalendarToday color={theme.colors.colorTextPrimary} />
    ));

  return (
    <InputField
      {...props}
      value={value}
      disabled={disabled}
      onChangeText={onChangeText}
      rightSlot={resolvedRightSlot}
    />
  );
};

DateField.displayName = 'DateField';
