import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { InputField } from './InputField';
import { FieldErrorProps } from '../FieldError/FieldError';

jest.mock('./AnimatedContainer', () => ({
  AnimatedContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  NATIVE_ANIMATED: false,
}));

jest.mock('./InputField.styles', () => ({
  styles: {
    wrapper: {},
    container: {},
    containerFocused: {},
    containerError: {},
    containerNativeAnimated: {},
    innerColumn: {},
    label: {},
    input: {},
    rightSlotContainer: {},
    errorMessage: {},
    copyButton: {},
  },
  variantContainerStyleMap: {
    default: {},
    error: {},
  },
}));

jest.mock('../Text/Text.styles', () => ({
  styles: {
    textBase: {},
    variantLabel: {},
    variantBody: {},
    variantBodyEmphasized: {},
    variantCaption: {},
  },
}));

jest.mock('../Text/Text.config', () => ({
  variantStyleMap: { label: {}, body: {}, bodyEmphasized: {}, caption: {} },
}));

jest.mock('../FieldError/FieldError', () => ({
  FieldError: (props: FieldErrorProps) => <div data-testid="mock-field-error" {...props} />
}));

jest.mock('../Button', () => ({
  Button: ({
    children,
    onClick,
    'aria-label': ariaLabel,
    'data-testid': testID,
  }: {
    children?: React.ReactNode;
    onClick?: React.ComponentProps<'button'>['onClick'];
    'aria-label'?: string;
    'data-testid'?: string;
  }) => (
    <button onClick={onClick} aria-label={ariaLabel} data-testid={testID}>
      {children}
    </button>
  ),
}));

jest.mock('../../icons', () => ({
  ContentCopy: () => <span data-testid="copy-icon" />,
}));

jest.mock('../Pressable', () => ({
  Pressable: ({ children, onClick, ...rest }: {
    children?: React.ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <div data-testid="pressable-trigger" onClick={onClick} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  ),
}));


describe('InputField', () => {
  it('renders correctly with default props', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value=""
          placeholderText="Enter your email"
          onChangeText={() => { }}
          testID="email-input"
        />
      );
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error variant, right slot and error message', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Username"
          value="invalid_user"
          placeholderText="Enter username"
          onChangeText={() => { }}
          variant="error"
          errorMessage="Username is invalid."
          rightSlot={<span>!</span>}
          testID="username-input"
        />
      );
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('triggers onChangeText callback when input value changes', () => {
    const onChangeTextMock = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Test Input"
          value=""
          placeholderText="Type something"
          onChangeText={onChangeTextMock}
          testID="test-input"
        />
      );
    });

    const inputElement = component!.root.findByType('input');

    act(() => {
      inputElement.props.onInput({ target: { value: 'New text' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
    expect(onChangeTextMock).toHaveBeenCalledTimes(1);
  });

  it('renders the AsComponent override on native via the html.input render-prop child', () => {
    const MockInput = jest.fn(
      (props: Record<string, unknown>) => <span data-testid="mock-as-input" data-props={JSON.stringify(props ?? {})} />
    );
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value="hello"
          placeholderText="Enter your email"
          onChangeText={() => { }}
          as={MockInput as unknown as React.ComponentType<unknown>}
          testID="email-input"
        />
      );
    });

    const inputEl = component!.root.findByType('input');
    expect(typeof inputEl.props.children).toBe('function');

    const renderAs = inputEl.props.children as (p: Record<string, unknown>) => React.ReactNode;
    const nativeProps = { value: 'hello', placeholder: 'Enter your email' };

    let asHost: renderer.ReactTestRenderer;
    act(() => {
      asHost = renderer.create(<>{renderAs(nativeProps)}</>);
    });

    expect(MockInput).toHaveBeenCalledTimes(1);
    expect(MockInput.mock.calls[0][0]).toEqual(expect.objectContaining(nativeProps));
    expect(() =>
      asHost!.root.findByProps({ 'data-testid': 'mock-as-input' })
    ).not.toThrow();
  });

  it('does not pass a function child when `as` is omitted', () => {
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value=""
          placeholderText="Enter your email"
          onChangeText={() => { }}
          testID="email-input"
        />
      );
    });

    const inputEl = component!.root.findByType('input');
    expect(typeof inputEl.props.children).not.toBe('function');
  });

  it('fires onClick exactly once when a readOnly trigger is clicked', () => {
    const onClickMock = jest.fn();
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Pick a date"
          value=""
          placeholderText="Select"
          readOnly
          onClick={onClickMock}
          testID="readonly-input"
        />
      );
    });

    const labelSpan = component!.root.findAll(
      (node) => node.type === 'span' && node.props.children === 'Pick a date'
    )[0];
    const pressable = component!.root.findByProps({ 'data-testid': 'pressable-trigger' });

    // Simulate a real click on the label: the inner handler runs first, then the
    // event bubbles up to the outer Pressable. The user's onClick must fire once.
    act(() => {
      labelSpan.props.onClick?.();
      pressable.props.onClick?.();
    });

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('focuses the input when the surrounding container is tapped', () => {
    const focusMock = jest.fn();
    const inputRef = { current: { focus: focusMock } as unknown as HTMLInputElement };
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value=""
          placeholderText="Enter your email"
          onChangeText={() => { }}
          inputRef={inputRef}
          testID="email-input"
        />,
        { createNodeMock: () => ({ focus: focusMock }) }
      );
    });

    const container = component!.root.findAll(
      (node) => node.type === 'div' && typeof node.props.onClick === 'function'
    )[0];

    act(() => {
      container.props.onClick();
    });

    expect(focusMock).toHaveBeenCalled();
  });

  it('does not focus the input on container tap when disabled', () => {
    const focusMock = jest.fn();
    const inputRef = { current: { focus: focusMock } as unknown as HTMLInputElement };
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Email Address"
          value=""
          placeholderText="Enter your email"
          onChangeText={() => { }}
          disabled
          inputRef={inputRef}
          testID="email-input"
        />,
        { createNodeMock: () => ({ focus: focusMock }) }
      );
    });

    const onClickDivs = component!.root.findAll(
      (node) => node.type === 'div' && typeof node.props.onClick === 'function'
    );

    act(() => {
      onClickDivs.forEach((c) => c.props.onClick({ stopPropagation: () => { } }));
    });

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('does not focus on container tap when readOnly and onClick are set (caller navigation wins)', () => {
    const onClickMock = jest.fn();
    const focusMock = jest.fn();
    const inputRef = { current: { focus: focusMock } as unknown as HTMLInputElement };
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Pick a date"
          value=""
          placeholderText="Select"
          readOnly
          onClick={onClickMock}
          inputRef={inputRef}
          testID="readonly-input"
        />,
        { createNodeMock: () => ({ focus: focusMock }) }
      );
    });

    // Only the outer Pressable should own an onClick (caller navigation). The
    // inner container must not carry a focus handler in this mode.
    const innerOnClickDivs = component!.root.findAll(
      (node) =>
        node.type === 'div' &&
        typeof node.props.onClick === 'function' &&
        node.props['data-testid'] !== 'pressable-trigger'
    );

    act(() => {
      innerOnClickDivs.forEach((c) => c.props.onClick({ stopPropagation: () => { } }));
    });

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('stops slot taps from bubbling up and focusing the input', () => {
    const onCopyMock = jest.fn();
    const focusMock = jest.fn();
    const inputRef = { current: { focus: focusMock } as unknown as HTMLInputElement };
    let component: renderer.ReactTestRenderer;

    act(() => {
      component = renderer.create(
        <InputField
          label="Token"
          value="secret"
          placeholderText="Token"
          onChangeText={() => { }}
          copyable
          onCopy={onCopyMock}
          inputRef={inputRef}
          testID="token-input"
        />,
        { createNodeMock: () => ({ focus: focusMock }) }
      );
    });

    // The slot container wraps the copy control and stops propagation so the
    // container's focus handler never runs.
    const slotContainer = component!.root.findAll(
      (node) => node.type === 'div' && typeof node.props.onClick === 'function'
    ).pop();

    const stopPropagation = jest.fn();

    act(() => {
      slotContainer!.props.onClick({ stopPropagation });
    });

    const copyButton = component!.root.findByProps({ 'aria-label': 'Copy to clipboard' });
    act(() => {
      copyButton.props.onClick();
    });

    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onCopyMock).toHaveBeenCalledTimes(1);
    expect(focusMock).not.toHaveBeenCalled();
  });
});
