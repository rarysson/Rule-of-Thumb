import celebrities from '../assets/data.json'

export function fetchCelebrities(): Celebrity[] {
  return celebrities.data
}
