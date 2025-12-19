// Charakter-Codes für die Verteilung
export const characterCodes = {
  'lena': 'SCH4TT',
  'svenja': 'GL1TCH',
  'eva-s': 'B4NK3R',
  'steffi': 'GL1TZ3',
  'jason': 'V3LV3T',
  'lukas': 'H4B1B1',
  'lucas': 'C4PT41',
  'lisa': 'CL1CKS',
  'fabi-v': 'PR0T31',
  'paetzi': 'K3LL3R',
  'kevin': 'BUMMS7',
  'annika': 'R4B3N7',
  'micha': 'SCHUB1',
  'ben': 'AG3NTB'
}

// Beziehungskarte für jeden Charakter
// ally = vertraut/mag, neutral = neutral, rival = misstraut/Feind
export const relationships = {
  'lena': {
    ally: ['fabi-v'],
    allyReasons: { 'fabi-v': 'Wie ein Bruder. Er weiß alles und beschützt dich.' },
    neutral: ['svenja', 'jason', 'lisa', 'lucas', 'ben'],
    rival: ['eva-s', 'micha', 'steffi'],
    rivalReasons: {
      'eva-s': 'Sie wäscht Geld mit Bassmuschi. Gefährlich.',
      'micha': 'War gestern schon im Keller. Verdächtig.',
      'steffi': 'Hat öffentlich mit Bassmuschi gestritten.'
    }
  },
  'svenja': {
    ally: ['lukas'],
    allyReasons: { 'lukas': 'Da ist etwas zwischen euch. Er hat zugehört, als niemand sonst es tat.' },
    neutral: ['steffi', 'jason', 'lisa', 'fabi-v', 'lucas', 'kevin', 'annika', 'ben'],
    rival: ['micha'],
    rivalReasons: {
      'micha': 'War gestern Nacht alleine im Keller. Was hat er vor?'
    }
  },
  'eva-s': {
    ally: [],
    allyReasons: {},
    neutral: ['svenja', 'steffi', 'jason', 'lisa', 'lucas', 'paetzi', 'annika', 'micha', 'ben', 'fabi-v'],
    rival: ['lukas', 'kevin'],
    rivalReasons: {
      'lukas': 'Hat gehört, was du gesagt hast. Gefährlich.',
      'kevin': 'Kennt Bassmuschi von früher. Was weiß er noch?'
    }
  },
  'steffi': {
    ally: ['micha'],
    allyReasons: { 'micha': 'Ihm wurde auch ein Track geklaut. Ihr teilt das gleiche Schicksal.' },
    neutral: ['svenja', 'eva-s', 'lukas', 'lucas', 'lisa', 'fabi-v', 'kevin', 'annika', 'ben'],
    rival: ['lena', 'jason'],
    rivalReasons: {
      'lena': 'Sie hat ALLES gehört. Was weiß sie noch?',
      'jason': 'Er wusste jahrelang Bescheid und hat geschwiegen. Warum?'
    }
  },
  'jason': {
    ally: [],
    allyReasons: {},
    neutral: ['svenja', 'eva-s', 'steffi', 'lisa', 'fabi-v', 'lucas', 'paetzi', 'annika', 'micha', 'ben'],
    rival: ['lena', 'lukas', 'kevin'],
    rivalReasons: {
      'lena': 'Du hast Bassmuschi von ihr erzählt. Sie könnte es herausfinden.',
      'lukas': 'Er stellt gezielte Fragen. Er ist hinter etwas her.',
      'kevin': 'Du siehst seinen Blick. Da ist etwas Gefährliches.'
    }
  },
  'lukas': {
    ally: ['svenja'],
    allyReasons: { 'svenja': 'Du willst sie beschützen. Was auch immer es kostet.' },
    neutral: ['steffi', 'lisa', 'fabi-v', 'lucas', 'ben'],
    rival: ['eva-s', 'kevin', 'paetzi', 'micha'],
    rivalReasons: {
      'eva-s': 'Du hast sie gehört. Sie steckt tief im Dreck.',
      'kevin': 'Er und Pätzi kennen Eva von früher. Was verbergen sie?',
      'paetzi': 'Auch ein Opfer, aber auch verdächtig.',
      'micha': 'Zu offensichtliches Motiv. Vielleicht zu offensichtlich?'
    }
  },
  'lucas': {
    ally: ['paetzi'],
    allyReasons: { 'paetzi': 'Schulfreunde. Beide erpresst. Ihr steckt zusammen drin.' },
    neutral: ['svenja', 'eva-s', 'steffi', 'jason', 'lukas', 'lisa', 'kevin', 'annika', 'micha', 'ben'],
    rival: ['lena', 'fabi-v'],
    rivalReasons: {
      'lena': 'Sie war 15 Minuten verschwunden. Du hast es protokolliert.',
      'fabi-v': 'Du hast ihn mit Bassmuschi in Pätzis Lager erwischt.'
    }
  },
  'lisa': {
    ally: [],
    allyReasons: {},
    neutral: ['lena', 'svenja', 'eva-s', 'jason', 'lukas', 'lucas', 'fabi-v', 'paetzi', 'annika', 'micha', 'ben'],
    rival: ['steffi', 'kevin'],
    rivalReasons: {
      'steffi': 'Hat Bassmuschi angeschrien. Starkes Motiv.',
      'kevin': 'Er hat sie "Eva" genannt. Er weiß mehr.'
    }
  },
  'fabi-v': {
    ally: ['lena'],
    allyReasons: { 'lena': 'Wie eine Schwester. Du würdest alles für sie tun.' },
    neutral: ['svenja', 'eva-s', 'steffi', 'jason', 'lukas', 'lucas', 'lisa', 'kevin', 'annika', 'micha', 'ben'],
    rival: ['paetzi'],
    rivalReasons: {
      'paetzi': 'Er glaubt die Lüge über die "Affäre". Er hat es gesehen.'
    }
  },
  'paetzi': {
    ally: ['lucas'],
    allyReasons: { 'lucas': 'Schulfreunde seit Ewigkeiten. Gemeinsam erpresst, gemeinsam stark.' },
    neutral: ['svenja', 'eva-s', 'steffi', 'jason', 'lukas', 'lisa', 'annika', 'ben'],
    rival: ['kevin', 'micha', 'fabi-v'],
    rivalReasons: {
      'kevin': 'Kennt Eva auch von früher. Was weiß er?',
      'micha': 'War gestern Nacht im Keller. Hat er dein Lager gefunden?',
      'fabi-v': 'Du hast ihn mit Bassmuschi in deinem Lager erwischt.'
    }
  },
  'kevin': {
    ally: ['annika'],
    allyReasons: { 'annika': 'Deine Frau. Auch wenn du ihr etwas verheimlichst.' },
    neutral: ['svenja', 'eva-s', 'steffi', 'jason', 'lukas', 'lucas', 'lisa', 'fabi-v', 'micha', 'ben'],
    rival: ['lena', 'paetzi'],
    rivalReasons: {
      'lena': '15 Minuten auf der Toilette? Wirklich?',
      'paetzi': 'Er kennt Eva auch von früher. Ihr wisst beide zu viel.'
    }
  },
  'annika': {
    ally: [],
    allyReasons: {},
    neutral: ['lena', 'svenja', 'eva-s', 'steffi', 'jason', 'lukas', 'lucas', 'lisa', 'fabi-v', 'paetzi', 'micha', 'ben'],
    rival: ['kevin'],
    rivalReasons: {
      'kevin': 'Dein Mann. Du liebst ihn. Aber er verheimlicht dir etwas.'
    }
  },
  'micha': {
    ally: ['steffi'],
    allyReasons: { 'steffi': 'Euch wurden beide Tracks geklaut. Ihr versteht euch.' },
    neutral: ['lena', 'eva-s', 'lukas', 'lucas', 'lisa', 'fabi-v', 'kevin', 'annika', 'ben'],
    rival: ['svenja', 'jason', 'paetzi'],
    rivalReasons: {
      'svenja': 'Du hast sie nach Sabotage gefragt. Sie könnte reden.',
      'jason': 'Er wusste ALLES über den Betrug. Jahrelang.',
      'paetzi': 'Er hat dich gestern im Keller gesehen.'
    }
  },
  'ben': {
    ally: ['jason', 'lisa'],
    allyReasons: {
      'jason': 'Er ist lustig und nett zu dir.',
      'lisa': 'Sie hat ein cooles Handy.'
    },
    neutral: ['lena', 'svenja', 'eva-s', 'steffi', 'lukas', 'lucas', 'fabi-v', 'paetzi', 'kevin', 'annika', 'micha'],
    rival: [],
    rivalReasons: {}
  }
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

// Admin-Universalcode für alle Charaktere
const ADMIN_CODE = 'NULL00'

export function validateCode(characterId, inputCode) {
  const upperCode = inputCode.toUpperCase()
  // Admin-Code funktioniert überall
  if (upperCode === ADMIN_CODE) return true
  const correctCode = characterCodes[characterId]
  return correctCode && upperCode === correctCode.toUpperCase()
}
