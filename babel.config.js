export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: 'commonjs'
      }
    ],
    'module:@react-native/babel-preset'
  ]
}
