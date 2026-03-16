import React from 'react';
import { html } from 'react-strict-dom';
import { styles, variantStyleMap, variantLabelMap } from './PasswordIndicator.styles';
import { PasswordIndicatorProps } from './types';
import SvgGppMaybe from '../../icons/components/GppMaybe';
import SvgDoneAll from '../../icons/components/DoneAll';
import SvgVerifiedUser from '../../icons/components/VerifiedUser';

const variantIconMap = {
  vulnerable: <SvgGppMaybe />,
  decent: <SvgGppMaybe />,
  strong: <SvgVerifiedUser />,
  match: <SvgDoneAll />,
} as const;

export const PasswordIndicator = ({ variant, testID }: PasswordIndicatorProps): React.ReactElement => {
  const icon = variantIconMap[variant];
  const label = variantLabelMap[variant];

  return (
    <html.div data-testid={testID} style={[styles.container, variantStyleMap[variant]]}>
      <html.div style={styles.iconContainer} aria-hidden={true}>
        {icon}
      </html.div>
      <html.span style={styles.label}>
        {label}
      </html.span>
    </html.div>
  );
};

PasswordIndicator.displayName = 'PasswordIndicator';
