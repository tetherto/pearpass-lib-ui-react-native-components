/**
 * @jest-environment jsdom
 */
import React from 'react'
import renderer, { act } from 'react-test-renderer'
// Import the web implementation explicitly: the react-native jest preset would
// otherwise resolve `./ContextMenu` to `ContextMenu.native.tsx`. Test files are
// excluded from tsc, so the explicit extension is safe.
import { ContextMenu } from './ContextMenu.tsx'

// The web ContextMenu portals its menu into document.body and positions it using
// getBoundingClientRect inside a requestAnimationFrame. Render the portal inline
// so react-test-renderer can traverse it.
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children
}))

jest.mock('./ContextMenu.styles', () => ({
  styles: {
    triggerWrapper: {},
    triggerWrapperFullWidth: {},
    triggerInner: {},
    overlay: {},
    menuContainer: {},
    menuContainerFullWidth: {},
    menuWidth: () => ({}),
    menuPosition: () => ({}),
    menuMaxHeight: () => ({})
  }
}))

jest.mock('./ContextMenu.config', () => ({
  MENU_WIDTH: 250
}))

// react-test-renderer returns null for host refs unless createNodeMock provides
// a stand-in; the component needs getBoundingClientRect on the trigger ref.
const createOptions = {
  createNodeMock: () => ({
    getBoundingClientRect: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 100,
      height: 0
    })
  })
}

const create = (ui: React.ReactElement): renderer.ReactTestRenderer => {
  let component: renderer.ReactTestRenderer
  act(() => {
    component = renderer.create(ui, createOptions)
  })
  return component!
}

beforeEach(() => {
  // Run the rAF-based measurement synchronously so the menu renders within act().
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((cb: FrameRequestCallback) => {
      cb(0)
      return 0
    })
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
})

afterEach(() => {
  jest.restoreAllMocks()
})

const findMenuContent = (
  root: renderer.ReactTestInstance,
  text: string
): renderer.ReactTestInstance[] =>
  root
    .findAllByType('div')
    .filter((d) => d.children.length === 1 && d.children[0] === text)

describe('ContextMenu', () => {
  it('renders trigger correctly', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>}>
        <div>Menu content</div>
      </ContextMenu>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('does not render menu when closed', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>}>
        <div>Menu content</div>
      </ContextMenu>
    )

    expect(findMenuContent(component.root, 'Menu content').length).toBe(0)
  })

  it('opens menu on trigger click', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>}>
        <div>Menu content</div>
      </ContextMenu>
    )

    const triggerDiv = component.root.findAllByType('div')[1]

    act(() => {
      triggerDiv.props.onClick?.({})
    })

    expect(findMenuContent(component.root, 'Menu content').length).toBe(1)
  })

  it('closes menu on overlay click', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>}>
        <div>Menu content</div>
      </ContextMenu>
    )

    const triggerDiv = component.root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })

    const overlayDiv = component.root
      .findAllByType('div')
      .find((d) => d.children.length === 0 && d !== triggerDiv)

    act(() => {
      overlayDiv!.props.onClick?.({})
    })

    expect(findMenuContent(component.root, 'Menu content').length).toBe(0)
  })

  it('calls onOpenChange when toggling', () => {
    const onOpenChange = jest.fn()
    const component = create(
      <ContextMenu trigger={<button>Open</button>} onOpenChange={onOpenChange}>
        <div>Menu content</div>
      </ContextMenu>
    )

    const triggerDiv = component.root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)

    const overlayDiv = component.root
      .findAllByType('div')
      .find((d) => d.children.length === 0 && d !== triggerDiv)

    act(() => {
      overlayDiv!.props.onClick?.({})
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders children inside menu', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>} open={true}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ContextMenu>
    )

    const menuContainer = component.root
      .findAllByType('div')
      .find((d) => d.props.role === 'menu')

    expect(menuContainer).toBeDefined()
    expect(menuContainer!.children.length).toBe(3)
  })

  it('supports controlled mode with open prop', () => {
    const onOpenChange = jest.fn()
    const component = create(
      <ContextMenu
        trigger={<button>Open</button>}
        open={false}
        onOpenChange={onOpenChange}
      >
        <div>Menu content</div>
      </ContextMenu>
    )

    expect(findMenuContent(component.root, 'Menu content').length).toBe(0)

    const triggerDiv = component.root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })

    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders with testID', () => {
    const component = create(
      <ContextMenu trigger={<button>Open</button>} testID="context-menu-1">
        <div>Menu content</div>
      </ContextMenu>
    )

    const root = component.root.findAllByType('div')[0]
    expect(root.props['data-testid']).toBe('context-menu-1')
  })
})
