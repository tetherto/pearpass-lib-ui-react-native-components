import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Snackbar.styles';
import { ICON_SIZE } from './Snackbar.config';
import { SnackbarProps } from './types';

type SizableIconProps = {
  width?: number;
  height?: number;
};

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ icon, iconSize = ICON_SIZE, text, testID, ...rest }, ref) => {
    const withIconSize = (iconElement: React.ReactNode) =>
      React.isValidElement<SizableIconProps>(iconElement)
        ? React.cloneElement(iconElement, { width: iconSize, height: iconSize })
        : iconElement;

    return (
      <html.div {...rest} ref={ref} data-testid={testID} role="status" style={styles.root}>
        {icon && (
          <html.span
            style={[styles.iconContainer, styles.iconSize(iconSize)]}
            aria-hidden={true}
          >
            {withIconSize(icon)}
          </html.span>
        )}
        <html.p style={styles.text}>{text}</html.p>
      </html.div>
    );
  }
);

Snackbar.displayName = 'Snackbar';
