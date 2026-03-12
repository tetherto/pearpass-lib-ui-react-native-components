import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { ListItem } from './ListItem'
import { tokens } from '../../theme/tokens.css'
import {
  AccountCircleFilled,
  AccountCircleOutlined,
  AccountCircleSharp,
  AccountCircleTone,
  AccountCircleRound,
  MoreVert,
  Share,
  KeyboardArrowRightFilled,
  ErrorFilled
} from '../../icons'

const INCLUDE_PROPS = ['title', 'subtitle', 'subtitleLayout', 'icon', 'iconSize', 'rightElement', 'selected', 'showDivider', 'variant', 'iconAlign', 'selectionMode', 'isSelected']

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: INCLUDE_PROPS
    }
  },
  argTypes: {
    title: { control: 'text' },
    subtitleLayout: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    iconSize: { control: { type: 'number' } },
    selected: { control: 'boolean' },
    showDivider: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'destructive']
    },
    iconAlign: {
      control: 'select',
      options: ['center', 'top']
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'multi']
    },
    isSelected: { control: 'boolean' },
    icon: { control: false },
    rightElement: { control: false }
  }
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    backgroundColor: tokens.colorSurfacePrimary,
    padding: tokens.spacing8,
    gap: tokens.spacing8,
    borderRadius: tokens.radius8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderSecondary,
    overflow: 'hidden'
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    textTransform: 'capitalize'
  },
  moreButton: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: tokens.colorPrimary,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: tokens.colorPrimary
  },
  checkboxInnerUnchecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent'
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacing24,
    flexWrap: 'wrap'
  },
  gridColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  gridTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize14,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary
  }
})

const SampleMoreButton = () => (
  <html.button style={storyStyles.moreButton}>{'...'}</html.button>
)

const SampleCheckbox = ({ checked = true }: { checked?: boolean }) => (
  <html.button style={storyStyles.checkboxOuter}>
    <html.div style={checked ? storyStyles.checkboxInner : storyStyles.checkboxInnerUnchecked} />
  </html.button>
)

export const Playground: Story = {
  args: {
    title: 'My Login Item',
    subtitle: 'user@example.com'
  },
  render: (args) => (
    <html.div style={storyStyles.container}>
      <ListItem {...args} icon={<AccountCircleFilled color="white" />} />
    </html.div>
  )
}

export const SubtitleVariants: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>No subtitle</html.div>
        <html.div style={storyStyles.container}>
          <ListItem icon={<AccountCircleFilled color="white" />} title="Title Only" />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>String subtitle</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleOutlined color="white" />}
            title="My Login"
            subtitle="user@example.com"
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Object subtitle horizontal</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleSharp color="white" />}
            title="My Credit Card"
            subtitle={{ primary: 'user@example.com', secondary: 'Updated 2 days ago' }}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Object subtitle vertical</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleTone color="white" />}
            title="Andrea's iPad 10"
            subtitle={{ primary: 'Last used on 15 Jan', secondary: 'Paired on 20 Dec, 2025' }}
            subtitleLayout="vertical"
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const RightElementVariants: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>With button</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="My Login"
            subtitle="user@example.com"
            rightElement={<SampleMoreButton />}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>With checkbox</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleOutlined color="white" />}
            title="Enable notifications"
            rightElement={<SampleCheckbox />}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>With two buttons</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleSharp color="white" />}
            title="My Login"
            subtitle="user@example.com"
            rightElement={
              <>
                <SampleMoreButton />
                <SampleMoreButton />
              </>
            }
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>No right element</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleSharp color="white" />}
            title="Simple Item"
            subtitle="No actions"
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const TextTruncation: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Long text truncation</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="This is a very long title that should be truncated with an ellipsis"
            subtitle="This is a very long subtitle that should also be truncated with an ellipsis when it overflows"
          />
          <ListItem
            icon={<AccountCircleOutlined color="white" />}
            title="Another long title example for testing overflow behavior in the component"
            subtitle={{
              primary: 'very-long-email-address@example-domain.com',
              secondary: 'Last modified on a very distant date'
            }}
            rightElement={<SampleMoreButton />}
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const VariantMatrix: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.grid}>
      <html.div style={storyStyles.gridColumn}>
        <html.div style={storyStyles.gridTitle}>Vault List Item</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Personal Vault"
            subtitle="Private"
            rightElement={<><Share color="white" width={16} height={16} /><MoreVert color="white" width={16} height={16} /></>}
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Personal Vault"
            subtitle="2 Members"
            rightElement={<><Share color="white" width={16} height={16} /><MoreVert color="white" width={16} height={16} /></>}
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Personal Vault"
            subtitle="Private"
            rightElement={<><Share color="white" width={16} height={16} /><MoreVert color="white" width={16} height={16} /></>}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.gridColumn}>
        <html.div style={storyStyles.gridTitle}>List Item</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="LinkedIn"
            subtitle="alex.k@gmail.com"
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="LinkedIn"
            subtitle="alex.k@gmail.com"
            rightElement={<MoreVert color="white" width={16} height={16} />}
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="LinkedIn"
            subtitle="alex.k@gmail.com"
            rightElement={<><html.span style={storyStyles.sectionTitle}>708 345</html.span><Share color="white" width={16} height={16} /></>}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.gridColumn}>
        <html.div style={storyStyles.gridTitle}>Context Menu List Item</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Label"
            subtitle="Supporting Text"
            iconAlign="top"
            rightElement={<KeyboardArrowRightFilled color="white" width={16} height={16} />}
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Label"
            subtitle="Supporting Text"
            iconAlign="top"
            variant="destructive"
            rightElement={<KeyboardArrowRightFilled color="white" width={16} height={16} />}
          />
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="Label"
            subtitle="Supporting Text"
            iconAlign="top"
            rightElement={<KeyboardArrowRightFilled color="white" width={16} height={16} />}
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const IconAlignment: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.stack}>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Center (default)</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="GitHub Login"
            subtitle="john@github.com"
            iconAlign="center"
          />
          <ListItem
            icon={<AccountCircleOutlined color="white" />}
            title="Google Account"
            subtitle={{ primary: 'john@gmail.com', secondary: 'Updated today' }}
            subtitleLayout="vertical"
            iconAlign="center"
          />
          <ListItem
            icon={<AccountCircleSharp color="white" />}
            title="Visa Credit Card"
            subtitle="**** 4242"
            iconAlign="center"
            rightElement={<SampleMoreButton />}
          />
        </html.div>
      </html.div>
      <html.div style={storyStyles.section}>
        <html.div style={storyStyles.sectionTitle}>Top</html.div>
        <html.div style={storyStyles.container}>
          <ListItem
            icon={<AccountCircleFilled color="white" />}
            title="GitHub Login"
            subtitle="john@github.com"
            iconAlign="top"
          />
          <ListItem
            icon={<AccountCircleOutlined color="white" />}
            title="Google Account"
            subtitle={{ primary: 'john@gmail.com', secondary: 'Updated today' }}
            subtitleLayout="vertical"
            iconAlign="top"
          />
          <ListItem
            icon={<AccountCircleSharp color="white" />}
            title="Visa Credit Card"
            subtitle="**** 4242"
            iconAlign="top"
            rightElement={<SampleMoreButton />}
          />
        </html.div>
      </html.div>
    </html.div>
  )
}

export const SelectionMode: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.container}>
      <ListItem
        icon={<AccountCircleFilled color="white" />}
        title="Microsoft 365"
        subtitle="simon.j@gmail.com"
        selectionMode="multi"
        isSelected={false}
        rightElement={<ErrorFilled color="#D13B3D" width={16} height={16} />}
      />
      <ListItem
        icon={<AccountCircleFilled color="white" />}
        title="Netflix"
        subtitle="simon.j@gmail.com"
        selectionMode="multi"
        isSelected={false}
      />
      <ListItem
        icon={<AccountCircleFilled color="white" />}
        title="LinkedIn"
        subtitle="alex.k@gmail.com"
        selectionMode="multi"
        isSelected={false}
      />
    </html.div>
  )
}

export const FullExample: Story = {
  args: { title: 'Item' },
  parameters: { controls: { disable: true } },
  render: () => (
    <html.div style={storyStyles.container}>
      <ListItem
        icon={<AccountCircleFilled color="white" />}
        title="GitHub Login"
        subtitle={{ primary: 'john@github.com', secondary: 'Updated today' }}
        selected
        rightElement={<SampleMoreButton />}
      />
      <ListItem
        icon={<AccountCircleOutlined color="white" />}
        title="Google Account"
        subtitle="john.doe@gmail.com"
        rightElement={<SampleCheckbox />}
      />
      <ListItem
        icon={<AccountCircleSharp color="white" />}
        title="Visa Credit Card"
        subtitle={{ primary: '**** 4242', secondary: 'Exp 12/28' }}
      />
      <ListItem
        icon={<AccountCircleTone color="white" />}
        title="Home Wi-Fi"
        subtitle="MyNetwork_5G"
      />
      <ListItem
        icon={<AccountCircleRound color="white" />}
        title="Recovery Phrase"
        subtitle="12 words"
        rightElement={<SampleMoreButton />}
      />
    </html.div>
  )
}
