import React from 'react';
import { html } from 'react-strict-dom';
import { styles, variantStyleMap, variantLabelMap } from './PasswordIndicator.styles';
import { useTheme } from '../../theme';
import { PasswordIndicatorProps } from './types';
import SvgGppMaybe from '../../icons/components/GppMaybe';
import SvgDoneAll from '../../icons/components/DoneAll';
import SvgVerifiedUser from '../../icons/components/VerifiedUser';

const variantIconMap = {
  vulnerable: SvgGppMaybe,
  decent: SvgGppMaybe,
  strong: SvgVerifiedUser,
  match: SvgDoneAll,
} as const;

const getVariantColor = (variant: PasswordIndicatorProps['variant'], colors: ReturnType<typeof useTheme>['theme']['colors']) => {
  switch (variant) {
    case 'vulnerable': return colors.colorSurfaceDestructiveElevated;
    case 'decent': return colors.colorSurfaceWarning;
    case 'strong':
    case 'match': return colors.colorPrimary;
  }
};

export const PasswordIndicator = ({ variant, testID }: PasswordIndicatorProps): React.ReactElement => {
  const { theme } = useTheme();
  const color = getVariantColor(variant, theme.colors);
  const Icon = variantIconMap[variant];
  const label = variantLabelMap[variant];

  return (
    <html.div data-testid={testID} style={styles.container}>
      <html.div style={styles.iconContainer} aria-hidden={true}>
        <Icon width={12} height={12} color={color} />
      </html.div>
      <html.span style={[styles.label, variantStyleMap[variant]]}>
        {label}
      </html.span>
    </html.div>
  );
};

PasswordIndicator.displayName = 'PasswordIndicator';
