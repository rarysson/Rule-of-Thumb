import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ViewMenu from './ViewMenu.vue'

describe('ViewMenu Component', () => {
  it('renders in list mode', () => {
    const component = mount(ViewMenu, {
      props: {
        modelValue: 'list'
      }
    })

    expect(component.props().modelValue).toBe('list')
  })

  it('renders in grid mode', () => {
    const component = mount(ViewMenu, {
      props: {
        modelValue: 'grid'
      }
    })

    expect(component.props().modelValue).toBe('grid')
  })

  it('changes the view mode', async () => {
    const component: any = mount(ViewMenu, {
      props: {
        modelValue: 'list',
        'onUpdate:modelValue': (e) => component.setProps({ modelValue: e })
      }
    })

    await component.get(".menu > button").trigger('click')
    await component.get(".options > button:nth-child(2)").trigger('click')

    expect(component.props().modelValue).toBe('grid')
  })
})
