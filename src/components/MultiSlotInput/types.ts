import React from 'react';

export interface MultiSlotInputProps {
  label: string;
  values: string[];
  onAdd: () => void;
  onChangeItem: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder?: string;
  /** @deprecated use placeholder */
  placeholderText?: string;
  addButtonLabel?: string;
  errorMessage?: string;
  maxSlots?: number;
  disabled?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: (index: number) => React.ReactNode;
  testID?: string;
}