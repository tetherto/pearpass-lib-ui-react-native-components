import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ContextMenu } from './ContextMenu'

jest.mock('./ContextMenu.styles', () => ({
  styles: {
    triggerWrapper: {},
    overlay: {},
    menuContainer: {},
    menuWidth: () => ({})
  }
}))

jest.mock('./ContextMenu.config', () => ({
  MENU_WIDTH: 250
}))

describe('ContextMenu', () => {
  it('renders trigger correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<button>Open</button>}>
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('does not render menu when closed', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<button>Open</button>}>
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root
    const divs = root.findAllByType('div')
    const menuContent = divs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Menu content'
    )
    expect(menuContent.length).toBe(0)
  })

  it('opens menu on trigger click', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<button>Open</button>}>
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root
    const triggerDiv = root.findAllByType('div')[1]

    act(() => {
      triggerDiv.props.onClick?.({})
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const allDivs = root.findAllByType('div')
    const menuContent = allDivs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Menu content'
    )
    expect(menuContent.length).toBe(1)
  })

  it('closes menu on overlay click', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<button>Open</button>}>
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root

    // Open the menu
    const triggerDiv = root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })

    // Find the overlay (empty div that is not the trigger)
    const allDivs = root.findAllByType('div')
    const overlayDiv = allDivs.find(
      (d) => d.children.length === 0 && d !== triggerDiv
    )

    act(() => {
      overlayDiv!.props.onClick?.({})
    })

    // Menu content should be gone
    const divsAfterClose = root.findAllByType('div')
    const menuContent = divsAfterClose.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Menu content'
    )
    expect(menuContent.length).toBe(0)
  })

  it('calls onOpenChange when toggling', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu
          trigger={<button>Open</button>}
          onOpenChange={onOpenChange}
        >
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root
    const triggerDiv = root.findAllByType('div')[1]

    // Open
    act(() => {
      triggerDiv.props.onClick?.({})
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)

    // Find overlay and close
    const allDivs = root.findAllByType('div')
    const overlayDiv = allDivs.find(
      (d) => d.children.length === 0 && d !== triggerDiv
    )

    act(() => {
      overlayDiv!.props.onClick?.({})
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders children inside menu', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu trigger={<button>Open</button>} open={true}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </ContextMenu>
      )
    })

    const root = component!.root
    const menuContainer = root.findAllByType('div').find(
      (d) => d.props.role === 'menu'
    )

    expect(menuContainer).toBeDefined()
    expect(menuContainer!.children.length).toBe(3)
  })

  it('supports controlled mode with open prop', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu
          trigger={<button>Open</button>}
          open={false}
          onOpenChange={onOpenChange}
        >
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root

    // Menu should not be visible
    let allDivs = root.findAllByType('div')
    let menuContent = allDivs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Menu content'
    )
    expect(menuContent.length).toBe(0)

    // Click trigger
    const triggerDiv = root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })

    // onOpenChange should be called with true
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <ContextMenu
          trigger={<button>Open</button>}
          testID="context-menu-1"
        >
          <div>Menu content</div>
        </ContextMenu>
      )
    })

    const root = component!.root.findAllByType('div')[0]
    expect(root.props['data-testid']).toBe('context-menu-1')
  })
})
