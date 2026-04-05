import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'

import { useTheme } from '../../theme/ThemeContext'
import { rawTokens } from '../../theme/tokens.raw'
import { TextVariant } from './types'

type VariantStyle = Pick<TextStyle, 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'>

const variantStyles: Record<TextVariant, VariantStyle> = {
  label: {
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightRegular,
  },
  labelEmphasized: {
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightMedium,
  },
  body: {
    fontSize: rawTokens.fontSize16,
    fontWeight: rawTokens.weightRegular,
  },
  bodyEmphasized: {
    fontSize: rawTokens.fontSize16,
    fontWeight: rawTokens.weightMedium,
  },
  caption: {
    fontSize: rawTokens.fontSize12,
    fontWeight: rawTokens.weightRegular,
  },
}

export interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  numberOfLines?: number
  style?: TextStyle | TextStyle[]
}

export const Text = React.forwardRef<RNText, TextProps>(function Text(
  { children, variant = 'label', numberOfLines, style },
  ref
) {
  const { theme } = useTheme()

  return (
    <RNText
      ref={ref}
      numberOfLines={numberOfLines}
      style={[
        {
          color: theme.colors.colorTextPrimary,
          fontFamily: rawTokens.fontPrimary,
          letterSpacing: 0,
        },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </RNText>
  )
})

Text.displayName = 'Text'
