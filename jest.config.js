export default {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^pearpass-lib-ui-theme-provider/native$':
      '<rootDir>/node_modules/pearpass-lib-ui-theme-provider/native/index.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|styled-components|@testing-library/react-native|pearpass-lib-ui-theme-provider|pearpass-lib-ui-theme-provider/native|pearpass-utils-password-check)/)'
  ]
}
