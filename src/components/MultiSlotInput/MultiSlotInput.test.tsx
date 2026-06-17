import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MultiSlotInput } from './MultiSlotInput';

jest.mock('./MultiSlotInput.styles', () => ({
  styles: {
    root: {},
    container: {},
    containerError: {},
    row: {},
    ctaSlot: {},
  },
}));

jest.mock('../FieldError/FieldError', () => ({
  FieldError: (props: { children: React.ReactNode }) => (
    <div data-testid="mock-field-error">{props.children}</div>
  ),
}));

const Slot = (props: { testID?: string; isGrouped?: boolean }) => (
  <input data-testid={props.testID} data-grouped={String(!!props.isGrouped)} />
);

describe('MultiSlotInput', () => {
  it('renders each child slot', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          <Slot testID="slot-0" />
          <Slot testID="slot-1" />
        </MultiSlotInput>
      );
    });

    expect(
      component!.root.findByProps({ 'data-testid': 'slot-0' })
    ).toBeTruthy();
    expect(
      component!.root.findByProps({ 'data-testid': 'slot-1' })
    ).toBeTruthy();
  });

  it('injects isGrouped into each child slot', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          <Slot testID="slot-0" />
          <Slot testID="slot-1" />
        </MultiSlotInput>
      );
    });

    const slots = component!.root.findAllByType(Slot);
    expect(slots).toHaveLength(2);
    slots.forEach((slot) => {
      expect(slot.props.isGrouped).toBe(true);
    });
  });

  it('renders the actions node', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput
          testID="test"
          actions={<button data-testid="add-button">Add another</button>}
        >
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    expect(
      component!.root.findByProps({ 'data-testid': 'add-button' })
    ).toBeTruthy();
  });

  it('does not render the actions slot when no actions are provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    expect(() =>
      component!.root.findByProps({ 'data-testid': 'add-button' })
    ).toThrow();
  });

  it('applies the testID to the root element', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    expect(
      component!.root.findByProps({ 'data-testid': 'test' })
    ).toBeTruthy();
  });

  it('does not render error message when errorMessage prop is not provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    expect(() =>
      component!.root.findByProps({ 'data-testid': 'mock-field-error' })
    ).toThrow();
  });

  it('renders error message when errorMessage prop is provided', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test" errorMessage="Something went wrong">
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    const errorNode = component!.root.findByProps({
      'data-testid': 'mock-field-error',
    });

    expect(errorNode).toBeTruthy();
    expect(errorNode.props.children).toBe('Something went wrong');
  });

  it('ignores non-element children without crashing', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <MultiSlotInput testID="test">
          {null}
          {'plain text'}
          <Slot testID="slot-0" />
        </MultiSlotInput>
      );
    });

    expect(
      component!.root.findByProps({ 'data-testid': 'slot-0' })
    ).toBeTruthy();
  });
});
