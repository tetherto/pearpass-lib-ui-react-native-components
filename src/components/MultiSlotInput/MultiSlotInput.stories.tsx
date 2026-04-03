import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { html, css } from 'react-strict-dom';
import { MultiSlotInput } from './MultiSlotInput';
import { tokens } from '../../theme/tokens.css';

const meta: Meta<typeof MultiSlotInput> = {
  title: 'Components/MultiSlotInput',
  component: MultiSlotInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    addButtonLabel: { control: 'text' },
    errorMessage: { control: 'text' },
    maxSlots: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    values: { control: false },
    onAdd: { control: false },
    onChangeItem: { control: false },
    onRemove: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSlotInput>;

const StatefulMultiSlotInput = (args: React.ComponentProps<typeof MultiSlotInput>) => {
  const [values, setValues] = React.useState<string[]>(args.values ?? ['']);

  const handleAdd = () => setValues((prev) => [...prev, '']);
  const handleChangeItem = (index: number, val: string) => {
    setValues((prev) => prev.map((v, i) => (i === index ? val : v)));
  };
  const handleRemove = (index: number) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <MultiSlotInput
      {...args}
      values={values}
      onAdd={handleAdd}
      onChangeItem={handleChangeItem}
      onRemove={handleRemove}
    />
  );
};

const storyStyles = css.create({
  container: {
    padding: tokens.spacing24,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing24,
    maxWidth: '560px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing16,
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize16,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderSecondary,
    paddingBottom: tokens.spacing8,
  },
  caption: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    color: tokens.colorTextSecondary,
  },
  slotIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
  },
  badge: {
    paddingTop: tokens.spacing4,
    paddingBottom: tokens.spacing4,
    paddingLeft: tokens.spacing8,
    paddingRight: tokens.spacing8,
    borderRadius: '4px',
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
  },
  badgePrimary: {
    backgroundColor: tokens.colorSurfaceSecondary,
    color: tokens.colorTextSecondary,
  },
  badgeIndex: {
    backgroundColor: tokens.colorSurfacePrimary,
    color: tokens.colorTextTertiary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderSecondary,
  },
});

export const Default: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Website',
    values: [''],
    placeholder: 'https://example.com',
    addButtonLabel: 'Add another website',
  },
};

export const WithPrefilledValues: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Email',
    values: ['alice@example.com', 'bob@example.com'],
    placeholder: 'Enter email address',
    addButtonLabel: 'Add another email',
  },
};

export const ErrorVariant: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Website',
    values: ['not-a-url'],
    placeholder: 'https://example.com',
    addButtonLabel: 'Add another website',
    errorMessage: 'Invalid URL. Please enter a valid website.',
  },
};

export const MaxSlots: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Phone number',
    values: [''],
    placeholder: '+1 555 000 0000',
    addButtonLabel: 'Add another number',
    maxSlots: 3,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Website',
    values: ['https://mysite.io', 'https://other.io'],
    placeholder: 'https://example.com',
    addButtonLabel: 'Add another website',
    disabled: true,
  },
};

export const WithLeftSlot: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Website',
    values: ['https://example.com'],
    placeholder: 'https://example.com',
    addButtonLabel: 'Add another website',
    leftSlot: <html.span style={[storyStyles.slotIcon]}>🌐</html.span>,
  },
};

export const WithRightSlot: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Priority email',
    values: ['alice@example.com', 'bob@example.com', ''],
    placeholder: 'user@example.com',
    addButtonLabel: 'Add another email',
    rightSlot: (index: number) => (
      <html.span style={[storyStyles.badge, storyStyles.badgePrimary]}>
        {index === 0 ? 'Primary' : 'CC'}
      </html.span>
    ),
  },
};

export const WithLeftAndRightSlot: Story = {
  render: (args) => (
    <html.div style={storyStyles.container}>
      <StatefulMultiSlotInput {...args} />
    </html.div>
  ),
  args: {
    label: 'Social links',
    values: ['https://twitter.com/me', 'https://github.com/me'],
    placeholder: 'https://',
    addButtonLabel: 'Add another link',
    leftSlot: <html.span style={[storyStyles.slotIcon]}>🔗</html.span>,
    rightSlot: (index: number) => (
      <html.span style={[storyStyles.badge, storyStyles.badgeIndex]}>#{index + 1}</html.span>
    ),
  },
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const WebsitesDemo = () => {
      const [values, setValues] = React.useState<string[]>(['https://mysite.io']);
      return (
        <MultiSlotInput
          label="Website"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="https://example.com"
          addButtonLabel="Add another website"
        />
      );
    };

    const EmailsDemo = () => {
      const [values, setValues] = React.useState<string[]>(['']);
      return (
        <MultiSlotInput
          label="Email address"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="user@example.com"
          addButtonLabel="Add another email"
        />
      );
    };

    const ErrorDemo = () => {
      const [values, setValues] = React.useState<string[]>(['bad-value', '']);
      return (
        <MultiSlotInput
          label="URL"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="https://"
          addButtonLabel="Add another URL"
          errorMessage="At least one URL is invalid."
        />
      );
    };

    const MaxDemo = () => {
      const [values, setValues] = React.useState<string[]>(['one', 'two', 'three']);
      return (
        <MultiSlotInput
          label="Tag"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="My tag"
          addButtonLabel="Add another tag"
          maxSlots={3}
        />
      );
    };

    const DisabledDemo = () => {
      const [values, setValues] = React.useState<string[]>(['https://mysite.io', 'https://other.io']);
      return (
        <MultiSlotInput
          label="Website"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="https://example.com"
          addButtonLabel="Add another website"
          disabled
        />
      );
    };

    const LeftSlotDemo = () => {
      const [values, setValues] = React.useState<string[]>(['https://mysite.io']);
      return (
        <MultiSlotInput
          label="Website"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="https://example.com"
          addButtonLabel="Add another website"
          leftSlot={<html.span style={storyStyles.slotIcon}>🌐</html.span>}
        />
      );
    };

    const RightSlotDemo = () => {
      const [values, setValues] = React.useState<string[]>(['alice@example.com', 'bob@example.com']);
      return (
        <MultiSlotInput
          label="Priority email"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="user@example.com"
          addButtonLabel="Add another email"
          rightSlot={(index) => (
            <html.span style={[storyStyles.badge, storyStyles.badgePrimary]}>
              {index === 0 ? 'Primary' : 'CC'}
            </html.span>
          )}
        />
      );
    };

    const BothSlotsDemo = () => {
      const [values, setValues] = React.useState<string[]>(['https://twitter.com/me', 'https://github.com/me']);
      return (
        <MultiSlotInput
          label="Social links"
          values={values}
          onAdd={() => setValues((p) => [...p, ''])}
          onChangeItem={(i, v) => setValues((p) => p.map((x, idx) => (idx === i ? v : x)))}
          onRemove={(i) => setValues((p) => p.filter((_, idx) => idx !== i))}
          placeholder="https://"
          addButtonLabel="Add another link"
          leftSlot={<html.span style={storyStyles.slotIcon}>🔗</html.span>}
          rightSlot={(index) => (
            <html.span style={[storyStyles.badge, storyStyles.badgeIndex]}>#{index + 1}</html.span>
          )}
        />
      );
    };

    return (
      <html.div style={storyStyles.container}>
        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Default — with value</html.div>
          <html.div style={storyStyles.caption}>One pre-filled slot; click "+ Add another" to grow the list</html.div>
          <WebsitesDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Empty placeholder state</html.div>
          <html.div style={storyStyles.caption}>Starts empty; remove is hidden when only one slot remains</html.div>
          <EmailsDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Error variant</html.div>
          <html.div style={storyStyles.caption}>All slots adopt the error border colour</html.div>
          <ErrorDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Max slots (3)</html.div>
          <html.div style={storyStyles.caption}>"Add" button is hidden once maxSlots is reached</html.div>
          <MaxDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Disabled</html.div>
          <html.div style={storyStyles.caption}>Add and remove buttons hidden; inputs read-only appearance</html.div>
          <DisabledDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Left slot</html.div>
          <html.div style={storyStyles.caption}>Static node rendered on the left side of every input row</html.div>
          <LeftSlotDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Right slot</html.div>
          <html.div style={storyStyles.caption}>Per-index node rendered on the right side of every input row</html.div>
          <RightSlotDemo />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Left and right slot combined</html.div>
          <html.div style={storyStyles.caption}>Both slots active simultaneously; right slot shows row index</html.div>
          <BothSlotsDemo />
        </html.div>
      </html.div>
    );
  },
};