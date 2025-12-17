// Charakter-Codes für die Verteilung
export const characterCodes = {
  'lena': 'SCH4TT',
  'svenja': 'H4CK3R',
  'eva-s': 'B4NK3R',
  'steffi': 'GL1TZ3',
  'jason': 'V3LV3T',
  'lukas': 'H4B1B1',
  'lucas': 'C4PT41',
  'lisa': 'CL1CKS',
  'fabi-r': 'WURST7',
  'fabi-v': 'PR0T31',
  'paetzi': 'K3LL3R',
  'kevin': 'BUMMS7',
  'annika': 'R4B3N7',
  'micha': 'SCHUB1',
  'ben': 'AG3NTB'
}

// Importiere die Charakterdaten
import charactersData from '../../characters.json'

export const characters = charactersData.characters.map(char => ({
  ...char,
  code: characterCodes[char.id]
}))

export const event = charactersData.event
export const clues = charactersData.clues
export const timeline = charactersData.timeline

export function getCharacterById(id) {
  return characters.find(c => c.id === id)
}

export function validateCode(characterId, inputCode) {
  const correctCode = characterCodes[characterId]
  return correctCode && inputCode.toUpperCase() === correctCode.toUpperCase()
}
