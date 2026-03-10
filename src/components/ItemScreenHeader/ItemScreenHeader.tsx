import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './ItemScreenHeader.styles';
import { ItemScreenHeaderProps } from './types';

export const ItemScreenHeader = React.forwardRef<HTMLElement, ItemScreenHeaderProps>(
    function ItemScreenHeader({ title, icon, actions }, ref) {
        return (
            <html.header ref={ref} style={styles.container}>
                <html.div style={styles.content}>
                    <html.div style={styles.icon} aria-hidden={true}>
                        {icon ?? (
                            <html.div style={styles.placeholder}>
                                <html.span style={styles.placeholderText}>
                                    {title.charAt(0).toUpperCase()}
                                </html.span>
                            </html.div>
                        )}
                    </html.div>
                    <html.span style={styles.title}>{title}</html.span>
                </html.div>

                {actions && <html.div style={styles.actions}>{actions}</html.div>}
            </html.header>
        );
    }
);

ItemScreenHeader.displayName = 'ItemScreenHeader';
