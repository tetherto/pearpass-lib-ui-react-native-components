import type { Meta, StoryObj } from '@storybook/react';
import { css, html } from 'react-strict-dom';
import { ItemScreenHeader } from './ItemScreenHeader';
import { Button } from '../Button';
import { tokens } from '../../theme/tokens.css';
import { Share, MoreVert } from '../../icons';


const storyStyles = css.create({
    wrapper: {
        maxWidth: 480,
        width: '100%',
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing20,
        width: '100%',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing12,
    },
    sectionTitle: {
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize12,
        fontWeight: tokens.weightMedium,
        color: '#999',
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 8,
    },
});

const MOCK_LOGO_URL =
    'https://play-lh.googleusercontent.com/fWX5MgD2I-OR2Mv3OURUV_cxpHi-yyWrFNjt_1TdiIUYh9nG0PAeYhm9Ik4pEE01Q4gmvOKSbmg91O1O2c6U6QA=w240-h480-rw';

const MockItemIcon = () => (
    <html.img src={MOCK_LOGO_URL} style={storyStyles.logo} alt="PearPass credential" />
);

const meta = {
    title: 'Components/ItemScreenHeader',
    component: ItemScreenHeader,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <html.div style={storyStyles.wrapper}>
                <Story />
            </html.div>
        ),
    ],
    argTypes: {
        title: { control: 'text' },
        icon: { control: false },
        actions: { control: false },
    },
} satisfies Meta<typeof ItemScreenHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        title: 'PearPass credential',
        icon: <MockItemIcon />,
        actions: (
            <>
                <Button
                    variant="tertiary"
                    size="small"
                    aria-label="Share"
                    iconBefore={<Share color="white" />}
                />
                <Button
                    variant="tertiary"
                    size="small"
                    aria-label="More options"
                    iconBefore={<MoreVert color="white" />}
                />
            </>
        ),
    },
};

export const Variants: Story = {
    args: {
        title: 'PearPass credential',
    },
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <html.div style={storyStyles.stack}>
            <html.div style={storyStyles.section}>
                <html.span style={storyStyles.sectionTitle}>With icon</html.span>
                <ItemScreenHeader title="PearPass credential" icon={<MockItemIcon />} />
            </html.div>
            <html.div style={storyStyles.section}>
                <html.span style={storyStyles.sectionTitle}>Without icon (placeholder)</html.span>
                <ItemScreenHeader title="PearPass credential" />
            </html.div>
            <html.div style={storyStyles.section}>
                <html.span style={storyStyles.sectionTitle}>With icon and actions</html.span>
                <ItemScreenHeader
                    title="PearPass credential"
                    icon={<MockItemIcon />}
                    actions={
                        <>
                            <Button
                                variant="tertiary"
                                size="small"
                                aria-label="Share"
                                iconBefore={<Share color="white" />}
                            />
                            <Button
                                variant="tertiary"
                                size="small"
                                aria-label="More options"
                                iconBefore={<MoreVert color="white" />}
                            />
                        </>
                    }
                />
            </html.div>
        </html.div>
    ),
};
