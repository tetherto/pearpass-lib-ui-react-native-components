import {
  YellowErrorIcon,
  ErrorIcon
} from 'pearpass-lib-ui-react-native-components'
import { View, Text, StyleSheet } from 'react-native'

/**
 * @param {{
 *   variant?: 'warning' | 'error',
 *   stretch?: boolean,
 *   title?: string,
 *   message?: string,
 *   children?: import('react').ReactNode,
 *   style?: import('react-native').ViewStyle | import('react-native').ViewStyle[],
 *   titleStyle?: import('react-native').TextStyle | import('react-native').TextStyle[],
 *   messageStyle?: import('react-native').TextStyle | import('react-native').TextStyle[]
 * }} props
 */
export const WarningAlert = ({
  variant = 'warning',
  stretch = false,
  title,
  message,
  children,
  style,
  titleStyle,
  messageStyle
}) => {
  const alertStyle = [
    styles.alert,
    {
      width: stretch ? '100%' : '75%',
      backgroundColor:
        variant === 'warning'
          ? styles.warningBackground.backgroundColor
          : styles.errorBackground.backgroundColor,
      borderColor:
        variant === 'warning'
          ? styles.warningBorder.borderColor
          : styles.errorBorder.borderColor
    },
    style
  ]

  const Icon = variant === 'warning' ? YellowErrorIcon : ErrorIcon

  return (
    <View style={alertStyle}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon size="20" />
        </View>
        <View style={styles.textContent}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {message && (
            <Text style={[styles.message, messageStyle]}>{message}</Text>
          )}
        </View>
      </View>

      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  alert: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1
  },

  warningBackground: {
    backgroundColor: '#332300'
  },

  errorBackground: {
    backgroundColor: '#2A0C0D',
    opacity: 0.5
  },

  warningBorder: {
    borderColor: '#FFAE00'
  },

  errorBorder: {
    borderColor: '#D13B3D'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10
  },

  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },

  textContent: {
    flex: 1,
    gap: 2
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F6F6F6',
    lineHeight: 18
  },

  message: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F6F6F6',
    lineHeight: 16
  },

  childrenContainer: {
    marginTop: 12,
    gap: 8
  }
})
