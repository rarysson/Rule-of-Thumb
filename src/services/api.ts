import celebrities from '../assets/data.json'

export function fetchCelebrities(): Celebrity[] {
  const data = [] as Celebrity[]

  celebrities.data.forEach(celebrity => {
    const item = localStorage.getItem(celebrity.id)

    if (!item) {
      data.push(celebrity)
      localStorage.setItem(celebrity.id, JSON.stringify(celebrity))
    } else {
      data.push(JSON.parse(item))
    }
  })

  return data
}

export function updateCelebrity(id: string, vote: Vote) {
  const celebrity = JSON.parse(localStorage.getItem(id) || '{}') as Celebrity

  celebrity.lastUpdated = (new Date()).toISOString()
  celebrity.votes[vote] += 1

  localStorage.setItem(id, JSON.stringify(celebrity))
}
