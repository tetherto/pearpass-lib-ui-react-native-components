import React from 'react';
import { html } from 'react-strict-dom';
import { Link } from '../Link';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { styles, variantStyleMap, sizeStyleMap } from './AlertMessage.styles';
import { AlertMessageProps } from './types';

const getVariantIconColor = (variant: AlertMessageProps['variant'], colors: ReturnType<typeof useTheme>['theme']['colors']) => {
  switch (variant) {
    case 'success': return colors.colorPrimary;
    case 'warning': return colors.colorSurfaceWarning;
    case 'error': return colors.colorSurfaceError;
  }
};

export const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  ({ variant, size, icon, title, actionText, onAction, description, testID, actionTestId, ...rest }, ref) => {
    const { theme } = useTheme();
    const iconColor = getVariantIconColor(variant, theme.colors);

    return (
      <html.div
        {...rest}
        ref={ref}
        data-testid={testID}
        style={[styles.container, variantStyleMap[variant], sizeStyleMap[size]]}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
      >
        <html.div style={[styles.messageContainer, size === 'big' && styles.messageContainerBig]}>
          {icon && React.isValidElement(icon) && (
            <html.div style={styles.iconContainer} aria-hidden={true}>
              {React.cloneElement(icon as React.ReactElement<{ color?: string }>, { color: iconColor })}
            </html.div>
          )}
          <html.div style={styles.copy}>
            {size !== 'small' && (
              <Text variant="bodyEmphasized" style={styles.title}>
                {title}
              </Text>
            )}
            <Text variant="caption" style={styles.description}>
              {description}
            </Text>
          </html.div>
        </html.div>
        {actionText && (
          <Link
            onClick={onAction}
            style={styles.link}
            data-testid={actionTestId}
          >
            {actionText}
          </Link>
        )}
      </html.div>
    );
  }
);

AlertMessage.displayName = 'AlertMessage';
