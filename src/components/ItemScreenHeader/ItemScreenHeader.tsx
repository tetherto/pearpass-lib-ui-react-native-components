import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './ItemScreenHeader.styles';
import { Text } from '../Text';
import { ItemScreenHeaderProps } from './types';

export const ItemScreenHeader = React.forwardRef<HTMLElement, ItemScreenHeaderProps>(
    function ItemScreenHeader({ title, icon, actions }, ref) {
        return (
            <html.header ref={ref} style={styles.container}>
                <html.div style={styles.content}>
                    <html.div style={styles.icon} aria-hidden={true}>
                        {icon ?? (
                            <html.div style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                    {title.charAt(0).toUpperCase()}
                                </Text>
                            </html.div>
                        )}
                    </html.div>
                    <Text style={styles.title}>{title}</Text>
                </html.div>

                {actions && <html.div style={styles.actions}>{actions}</html.div>}
            </html.header>
        );
    }
);

ItemScreenHeader.displayName = 'ItemScreenHeader';
