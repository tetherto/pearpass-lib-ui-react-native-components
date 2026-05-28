export default {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  modulePaths: ['<rootDir>', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@tetherto/pearpass-lib-ui-theme-provider/native$': '<rootDir>/../pearpass-lib-ui-theme-provider/native/index.js',
    '^@tetherto/pearpass-lib-ui-theme-provider$': '<rootDir>/../pearpass-lib-ui-theme-provider/src/index.js',
    '^@tetherto/pearpass-utils-password-check$': '<rootDir>/../pearpass-utils-password-check/index.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|styled-components|@testing-library/react-native|pearpass-utils-password-check|pearpass-lib-ui-react-native-components)/)'
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'
  ]
}
