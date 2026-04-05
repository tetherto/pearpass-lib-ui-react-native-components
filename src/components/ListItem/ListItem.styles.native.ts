import { StyleSheet } from 'react-native'

import { rawTokens } from '../../theme/tokens.raw'

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rawTokens.spacing16,
    paddingHorizontal: rawTokens.spacing16,
    gap: rawTokens.spacing12
  },
  content: {
    flex: 1,
    gap: rawTokens.spacing2,
    minWidth: 0
  },
  title: {
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightMedium
  },
  subtitle: {
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize12,
    fontWeight: rawTokens.weightRegular
  },
  subtitleDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rawTokens.spacing8
  },
  dividerLine: {
    width: 1,
    alignSelf: 'stretch'
  },
  subtitleDividerContainerVertical: {
    flexDirection: 'column',
    gap: rawTokens.spacing4,
    alignSelf: 'flex-start'
  },
  dividerLineHorizontal: {
    height: 1,
    alignSelf: 'stretch'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  iconAlignTop: {
    alignSelf: 'flex-start'
  },
  rightContainer: {
    flexDirection: 'row',
    flexShrink: 0,
    gap: rawTokens.spacing8
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
  },
  showDivider: {
    borderBottomWidth: 1
  }
})
