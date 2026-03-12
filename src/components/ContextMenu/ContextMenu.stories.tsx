import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { ContextMenu } from './ContextMenu'
import { NavbarListItem } from '../NavbarListItem'
import { Button } from '../Button'
import { tokens } from '../../theme/tokens.css'
import {
  AccountCircleFilled,
  AccountCircleOutlined,
  AccountCircleSharp,
  AccountCircleTone,
  AccountCircleRound
} from '../../icons'

const INCLUDE_PROPS = ['open']

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: INCLUDE_PROPS
    }
  },
  argTypes: {
    trigger: { control: false },
    children: { control: false },
    onOpenChange: { action: 'onOpenChange' }
  }
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    textTransform: 'capitalize'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacing24,
    alignItems: 'flex-start'
  }
})

export const Playground: Story = {
  args: {},
  render: (args) => (
    <html.div style={storyStyles.container}>
      <ContextMenu
        {...args}
        trigger={<Button variant="secondary" size="small">Open Menu</Button>}
      >
        <NavbarListItem icon={<AccountCircleFilled />} label="Logins" />
        <NavbarListItem icon={<AccountCircleOutlined />} label="Credit Card" />
        <NavbarListItem icon={<AccountCircleSharp />} label="Notes" />
      </ContextMenu>
    </html.div>
  )
}

export const AddItem: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Add Item</html.div>
        <ContextMenu
          trigger={<Button variant="secondary" size="small" iconBefore={<AccountCircleFilled />}>+ Add Item</Button>}
        >
          <NavbarListItem icon={<AccountCircleFilled />} label="Logins" />
          <NavbarListItem icon={<AccountCircleOutlined />} label="Credit Card" />
          <NavbarListItem icon={<AccountCircleSharp />} label="Identities" />
          <NavbarListItem icon={<AccountCircleTone />} label="Notes" />
          <NavbarListItem icon={<AccountCircleRound />} label="Recovery Phrases" />
          <NavbarListItem icon={<AccountCircleOutlined />} label="Wi-Fi" />
          <NavbarListItem icon={<AccountCircleSharp />} label="Other" />
        </ContextMenu>
      </html.div>
    </html.div>
  )
}

const GenericWithIconControlled = () => {
  const [selected, setSelected] = useState('newest')

  return (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Generic with icon</html.div>
        <ContextMenu
          trigger={
            <Button
              variant="tertiary"
              size="small"
              iconBefore={<AccountCircleTone />}
              aria-label="Sort"
            />
          }
        >
          <NavbarListItem
            icon={<AccountCircleFilled />}
            label="Newest First"
            selected={selected === 'newest'}
            onClick={() => setSelected('newest')}
          />
          <NavbarListItem
            icon={<AccountCircleOutlined />}
            label="Oldest First"
            selected={selected === 'oldest'}
            onClick={() => setSelected('oldest')}
          />
          <NavbarListItem
            icon={<AccountCircleSharp />}
            label="A → Z"
            selected={selected === 'az'}
            onClick={() => setSelected('az')}
          />
          <NavbarListItem
            icon={<AccountCircleTone />}
            label="Z → A"
            selected={selected === 'za'}
            onClick={() => setSelected('za')}
          />
        </ContextMenu>
      </html.div>
    </html.div>
  )
}

export const GenericWithIcon: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => <GenericWithIconControlled />
}
