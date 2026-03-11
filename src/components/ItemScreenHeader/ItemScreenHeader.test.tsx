import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ItemScreenHeader } from './ItemScreenHeader';

jest.mock('../Text/Text.styles', () => ({
    styles: {
        textBase: {},
        variantLabel: {},
        variantBody: {},
        variantBodyEmphasized: {},
        variantCaption: {},
    },
}));

jest.mock('./ItemScreenHeader.styles', () => ({
    styles: {
        container: {},
        content: {},
        icon: {},
        placeholder: {},
        placeholderText: {},
        title: {},
        actions: {},
    },
}));

describe('ItemScreenHeader', () => {
    it('renders with title only', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <ItemScreenHeader title="PearPass credential" />
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });

    it('renders with icon and title', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <ItemScreenHeader
                    title="PearPass credential"
                    icon={<span>icon</span>}
                />
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });

    it('renders with actions', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <ItemScreenHeader
                    title="PearPass credential"
                    actions={
                        <>
                            <button>Share</button>
                            <button>More</button>
                        </>
                    }
                />
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });

    it('renders with all props', () => {
        let component: renderer.ReactTestRenderer;

        act(() => {
            component = renderer.create(
                <ItemScreenHeader
                    title="PearPass credential"
                    icon={<span>icon</span>}
                    actions={
                        <>
                            <button>Share</button>
                            <button>More</button>
                        </>
                    }
                />
            );
        });

        expect(component!.toJSON()).toMatchSnapshot();
    });
});
