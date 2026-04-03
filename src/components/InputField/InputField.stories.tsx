import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { html, css } from 'react-strict-dom'
import { InputField } from './InputField'
import { tokens } from '../../theme/tokens.css'
import {
  AccountCircleOutlined,
  DoneAll,
  EyeOutlined,
  VerifiedUser
} from '../../icons'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error']
    },
    inputType: {
      control: { type: 'select' },
      options: ['text', 'password']
    },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    rightSlot: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof InputField>

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    flex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary,
    paddingBottom: tokens.spacing8
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridAutoRows: 'minmax(100px, auto)',
    gap: tokens.spacing20,
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing8
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary
  }
})

export const Default: Story = {
  args: {
    label: 'Username',
    value: '',
    placeholder: 'Enter username',
    onChange: () => {}
  }
}

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    onChange: () => {}
  }
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    value: 'bad-email',
    error: 'Please enter a valid email address.',
    onChange: () => {}
  }
}

export const WithRightSlot: Story = {
  args: {
    label: 'Account',
    value: '',
    placeholder: 'Enter account',
    rightSlot: <AccountCircleOutlined color={tokens.colorTextPrimary} />,
    onChange: () => {}
  }
}

export const WithLeftSlot: Story = {
  args: {
    label: 'Account',
    value: '',
    placeholder: 'Enter account',
    leftSlot: <AccountCircleOutlined color={tokens.colorTextPrimary} />,
    onChange: () => {}
  }
}

export const Disabled: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    disabled: true,
    onChange: () => {}
  }
}

export const PasswordType: Story = {
  args: {
    label: 'Password',
    value: 'secret123',
    inputType: 'password',
    onChange: () => {}
  }
}

export const Copyable: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    copyable: true,
    onChange: () => {}
  }
}

export const CopyableVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              With custom onCopy handler
            </html.div>
            <InputField
              label="Password"
              value="super-secret-123"
              copyable
              onCopy={(val: string) => alert(`Copied: ${val}`)}
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              With right slot (eye icon) + copy
            </html.div>
            <InputField
              label="Password"
              value="super-secret-123"
              inputType="password"
              copyable
              rightSlot={<EyeOutlined color={tokens.colorTextPrimary} />}
              onChange={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Default Variant</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Empty / Placeholder</html.div>
            <InputField
              label="Username"
              value=""
              placeholder="e.g. janesmith"
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Value</html.div>
            <InputField
              label="Username"
              value="janesmith"
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>With Icon (Slot)</html.div>
            <InputField
              label="Verified account"
              value="harrisaar"
              rightSlot={<VerifiedUser color={tokens.colorPrimary} />}
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Password type</html.div>
            <InputField
              label="Secret key"
              value="my-secret-key"
              inputType="password"
              onChange={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>

      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Error Variant</html.div>
        <html.div style={storyStyles.grid}>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>
              Error without message
            </html.div>
            <InputField
              label="Email"
              value="not-an-email"
              error=""
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with message</html.div>
            <InputField
              label="Email"
              value="not-an-email"
              error="Must be a valid email address"
              onChange={() => {}}
            />
          </html.div>
          <html.div style={storyStyles.cell}>
            <html.div style={storyStyles.caption}>Error with Icon</html.div>
            <InputField
              label="Email"
              value="not-an-email"
              error="This field is required"
              rightSlot={<DoneAll color={tokens.colorSurfaceError} />}
              onChange={() => {}}
            />
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  )
}
