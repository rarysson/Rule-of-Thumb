import { describe, expect, it } from 'vitest'
import celebrities from '../assets/data.json'

import { fetchCelebrities, updateCelebrity } from './api'

describe('API Service', () => {
  it('fetches all the celebrities', () => {
    expect(fetchCelebrities()).toEqual(celebrities.data)
  })

  it('fetches the most recent celebrities\' data after an update', () => {
    fetchCelebrities()
    updateCelebrity('1', 'positive')

    const celebrity = fetchCelebrities()[0]
    expect(celebrity.votes.positive).toEqual(celebrities.data[0].votes.positive + 1)
  })

  it('throws an exception when giving an unknown celebrity ID', () => {
    expect(() => updateCelebrity('99', 'positive')).toThrowError('Invalid celebrity id')
  })
})


