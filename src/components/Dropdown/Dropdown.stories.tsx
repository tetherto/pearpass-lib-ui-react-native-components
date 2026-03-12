import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { Dropdown } from './Dropdown'
import { NavbarListItem } from '../NavbarListItem'
import { Button } from '../Button'
import { InputField } from '../InputField'
import { ListItem } from '../ListItem'
import { tokens } from '../../theme/tokens.css'
import {
  AccountCircleFilled,
  AccountCircleOutlined,
  AccountCircleSharp,
  AccountCircleTone
} from '../../icons'

const INCLUDE_PROPS = ['open', 'minWidth', 'maxHeight']

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: INCLUDE_PROPS
    }
  },
  argTypes: {
    trigger: { control: false },
    children: { control: false },
    onOpenChange: { action: 'onOpenChange' },
    minWidth: { control: { type: 'number' } },
    maxHeight: { control: { type: 'number' } }
  }
} satisfies Meta<typeof Dropdown>

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
  noResults: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    color: tokens.colorTextSecondary,
    paddingBlock: tokens.spacing16,
    paddingInline: tokens.spacing8,
    textAlign: 'center' as const,
    width: '100%'
  }
})

const SimpleDropdownControlled = () => {
  const [selected, setSelected] = useState('1 Minute')
  const options = ['1 Minute', '3 Minutes', '5 Minutes', '10 Minutes', '30 Minutes', '1 Hour', '3 Hours', 'Never']

  return (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Simple Dropdown</html.div>
        <Dropdown
          trigger={<Button variant="secondary" size="small">{selected} ↓</Button>}
        >
          {options.map((option) => (
            <NavbarListItem
              key={option}
              label={option}
              selected={selected === option}
              onClick={() => setSelected(option)}
            />
          ))}
        </Dropdown>
      </html.div>
    </html.div>
  )
}

export const Playground: Story = {
  args: {},
  render: (args) => (
    <html.div style={storyStyles.container}>
      <Dropdown
        {...args}
        trigger={<Button variant="secondary" size="small">Select Option ↓</Button>}
      >
        <NavbarListItem icon={<AccountCircleFilled />} label="Option 1" />
        <NavbarListItem icon={<AccountCircleOutlined />} label="Option 2" />
        <NavbarListItem icon={<AccountCircleSharp />} label="Option 3" />
      </Dropdown>
    </html.div>
  )
}

export const SimpleDropdown: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => <SimpleDropdownControlled />
}

const ComplexDropdownControlled = () => {
  const [search, setSearch] = useState('')
  const items = [
    { title: 'Microsoft 365', subtitle: 'simon.j@gmail.com' },
    { title: 'Slack', subtitle: 'acme.1994@gmail.com' },
    { title: 'GitHub', subtitle: 'acme.1994@gmail.com' },
    { title: 'Adobe', subtitle: 'simon.j@gmail.com' },
    { title: 'Amazon', subtitle: 'acme.oc14@outlook.com' }
  ]

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <html.div style={storyStyles.container}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Complex Dropdown</html.div>
        <Dropdown
          trigger={
            <Button variant="secondary" size="small" iconBefore={<AccountCircleFilled />}>
              Microsoft 365 ↓
            </Button>
          }
        >
          <InputField
            label=""
            placeholderText="Search..."
            value={search}
            onChangeText={setSearch}
          />
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <ListItem
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                icon={<AccountCircleTone />}
                rightElement={<AccountCircleSharp />}
              />
            ))
          ) : (
            <html.div style={storyStyles.noResults}>No results</html.div>
          )}
        </Dropdown>
      </html.div>
    </html.div>
  )
}

export const ComplexDropdown: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => <ComplexDropdownControlled />
}
