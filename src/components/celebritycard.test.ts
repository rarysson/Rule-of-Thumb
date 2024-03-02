import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import CelebrityCard from './CelebrityCard.vue'
import celebrities from '../assets/data.json'
import { fetchCelebrities } from '../services/api'

const celebrity = celebrities.data[0]
let component = mount(CelebrityCard, {
  props: {
    celebrity
  }
})

describe('CelebrityCard Component', () => {
  beforeEach(() => {
    fetchCelebrities()

    component = mount(CelebrityCard, {
      props: {
        celebrity
      }
    })
  })

  it('renders properly', () => {
    expect(component.props().celebrity).toEqual(celebrity)
  })

  it('emits an update event after voting', async () => {
    await component.get('.info__buttons [aria-label="thumbs up"]').trigger('click')
    await component.get('.info__cta').trigger('click')

    expect(component.emitted()).toHaveProperty('update')
  })

  it('doesn\'t emit an update event if didn\'t choose the vote but tried to vote', async () => {
    await component.get('.info__cta').trigger('click')

    expect(component.emitted()).not.toHaveProperty('update')
  })

  it('changes text after voting', async () => {
    expect(component.get('.info__cta').text()).toBe('Vote Now')

    await component.get('.info__buttons [aria-label="thumbs up"]').trigger('click')
    await component.get('.info__cta').trigger('click')

    expect(component.get('.info__cta').text()).toBe('Vote Again')
  })
})
