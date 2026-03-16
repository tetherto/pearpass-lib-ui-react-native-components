import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { DialogSurface } from './DialogSurface';
import { Button } from '../Button';
import { tokens } from '../../theme/tokens.css';

const meta = {
    title: 'Components/DialogSurface',
    component: DialogSurface,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'closed' },
        hideCloseButton: { control: 'boolean' },
        title: { control: 'text' },
        children: { control: false },
        footer: { control: false },
    },
} satisfies Meta<typeof DialogSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyStyles = css.create({
    canvas: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing24,
        padding: tokens.spacing24,
        maxWidth: 520,
    },
});

const footerActions = (
    <>
        <Button variant="secondary" size="small">
            Cancel
        </Button>
        <Button variant="primary" size="small">
            Confirm
        </Button>
    </>
);

export const Playground: Story = {
    args: {
        title: 'Inline Dialog',
        children: 'This DialogSurface renders inline without a modal overlay.',
        footer: footerActions,
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <DialogSurface {...args} />
        </html.div>
    ),
};

export const WithoutFooter: Story = {
    args: {
        title: 'Information',
        children: 'This is a simple inline dialog without footer actions.',
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <DialogSurface {...args} />
        </html.div>
    ),
};

export const WithoutCloseButton: Story = {
    args: {
        title: 'Notice',
        children: 'This dialog surface has no close button.',
        footer: footerActions,
        hideCloseButton: true,
    },
    render: (args) => (
        <html.div style={storyStyles.canvas}>
            <DialogSurface {...args} />
        </html.div>
    ),
};
