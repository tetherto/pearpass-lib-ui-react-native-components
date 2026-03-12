import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Dropdown } from './Dropdown'

jest.mock('./Dropdown.styles', () => ({
  styles: {
    triggerWrapper: {},
    overlay: {},
    menuContainer: {},
    menuMinWidth: () => ({}),
    menuMaxHeight: () => ({})
  }
}))

jest.mock('./Dropdown.config', () => ({
  MENU_MIN_WIDTH: 220,
  MENU_MAX_HEIGHT: 270
}))

describe('Dropdown', () => {
  it('renders trigger correctly', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<button>Select</button>}>
          <div>Option 1</div>
        </Dropdown>
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('does not render menu when closed', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<button>Select</button>}>
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root
    const divs = root.findAllByType('div')
    const option = divs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Option 1'
    )
    expect(option.length).toBe(0)
  })

  it('opens menu on trigger click', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<button>Select</button>}>
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root
    const triggerDiv = root.findAllByType('div')[1]

    act(() => {
      triggerDiv.props.onClick?.({})
    })

    expect(component!.toJSON()).toMatchSnapshot()

    const allDivs = root.findAllByType('div')
    const option = allDivs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Option 1'
    )
    expect(option.length).toBe(1)
  })

  it('closes menu on overlay click', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown trigger={<button>Select</button>}>
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root
    const triggerDiv = root.findAllByType('div')[1]

    act(() => {
      triggerDiv.props.onClick?.({})
    })

    const allDivs = root.findAllByType('div')
    const overlayDiv = allDivs.find(
      (d) => d.children.length === 0 && d !== triggerDiv
    )

    act(() => {
      overlayDiv!.props.onClick?.({})
    })

    const divsAfterClose = root.findAllByType('div')
    const option = divsAfterClose.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Option 1'
    )
    expect(option.length).toBe(0)
  })

  it('calls onOpenChange when toggling', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown
          trigger={<button>Select</button>}
          onOpenChange={onOpenChange}
        >
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root
    const triggerDiv = root.findAllByType('div')[1]

    act(() => {
      triggerDiv.props.onClick?.({})
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)

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
        <Dropdown trigger={<button>Select</button>} open={true}>
          <div>Option 1</div>
          <div>Option 2</div>
          <div>Option 3</div>
        </Dropdown>
      )
    })

    const root = component!.root
    const menuContainer = root.findAllByType('div').find(
      (d) => d.props.role === 'listbox'
    )

    expect(menuContainer).toBeDefined()
    expect(menuContainer!.children.length).toBe(3)
  })

  it('supports controlled mode with open prop', () => {
    const onOpenChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown
          trigger={<button>Select</button>}
          open={false}
          onOpenChange={onOpenChange}
        >
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root
    let allDivs = root.findAllByType('div')
    let option = allDivs.filter(
      (d) => d.children.length === 1 && d.children[0] === 'Option 1'
    )
    expect(option.length).toBe(0)

    const triggerDiv = root.findAllByType('div')[1]
    act(() => {
      triggerDiv.props.onClick?.({})
    })

    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders with testID', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Dropdown
          trigger={<button>Select</button>}
          testID="dropdown-1"
        >
          <div>Option 1</div>
        </Dropdown>
      )
    })

    const root = component!.root.findAllByType('div')[0]
    expect(root.props['data-testid']).toBe('dropdown-1')
  })
})
