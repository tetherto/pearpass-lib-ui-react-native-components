import React from 'react';
import { html } from 'react-strict-dom';
import { styles } from './Button.styles';

export const ButtonSpinner = (): React.ReactElement => (
  <html.span style={styles.spinnerContainer} aria-hidden={true}>
    <html.span style={styles.spinner} />
  </html.span>
);
