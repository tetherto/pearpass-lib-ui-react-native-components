import fs from 'fs'
import path from 'path'

import React from 'react'

import { render } from '@testing-library/react-native'

const iconsDir = path.join(__dirname, '../icons')

function getIconModules(dir) {
  const modules = []
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.jsx')
      if (fs.existsSync(indexPath)) {
        modules.push(indexPath)
      } else {
        modules.push(...getIconModules(fullPath))
      }
    }
  })
  return modules
}

const iconModulePaths = getIconModules(iconsDir)
const icons = []

iconModulePaths.forEach((modulePath) => {
  const moduleExports = require(modulePath)
  Object.keys(moduleExports).forEach((exportName) => {
    if (exportName !== '__esModule') {
      icons.push({ name: exportName, Component: moduleExports[exportName] })
    }
  })
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
    if (typeof message === 'string' && message.includes('unique "key" prop')) {
      return
    }
    // eslint-disable-next-line no-console
    console.error(message, ...args)
  })
})

afterEach(() => {
  // eslint-disable-next-line no-console
  console.error.mockRestore()
})

describe('Icon Components', () => {
  icons.forEach(({ name, Component }, index) => {
    test(`${name} renders correctly`, () => {
      const { toJSON } = render(
        <Component key={index} size="24px" color="#000" />
      )
      const tree = toJSON()
      expect(tree).toBeTruthy()

      if (tree && tree.props) {
        expect(tree.props.width).toBe('24px')
        expect(tree.props.height).toBe('24px')
      }

      expect(tree).toMatchSnapshot()
    })
  })
})
