import { useState } from 'react'
import { characters } from '../data/characters'

// Icons als SVG-Komponenten
const Icons = {
  person: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  secret: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  tech: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
    </svg>
  ),
  pill: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M4.22 11.29l5.66-5.66a4.002 4.002 0 015.66 0l2.83 2.83a4.002 4.002 0 010 5.66l-5.66 5.66a4.002 4.002 0 01-5.66 0l-2.83-2.83a4.002 4.002 0 010-5.66zm4.24 1.41L6.34 14.83a2 2 0 000 2.83l.71.71a2 2 0 002.83 0l2.12-2.12-3.54-3.55z"/>
    </svg>
  ),
  conflict: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
}

// Bestimme das Icon basierend auf dem Inhalt
function getIconForContent(text) {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('geld') || lowerText.includes('euro') || lowerText.includes('bargeld') || lowerText.includes('wäsch')) {
    return { icon: Icons.money, color: '#fbbf24', label: 'GELD' }
  }
  if (lowerText.includes('musik') || lowerText.includes('track') || lowerText.includes('ki-generiert') || lowerText.includes('beat') || lowerText.includes('mix')) {
    return { icon: Icons.music, color: '#a855f7', label: 'MUSIK' }
  }
  if (lowerText.includes('keller') || lowerText.includes('gang') || lowerText.includes('lager') || lowerText.includes('versteck')) {
    return { icon: Icons.location, color: '#6366f1', label: 'ORT' }
  }
  if (lowerText.includes('21:00') || lowerText.includes('20:') || lowerText.includes('uhr') || lowerText.includes('gestern') || lowerText.includes('heute')) {
    return { icon: Icons.time, color: '#14b8a6', label: 'ZEIT' }
  }
  if (lowerText.includes('medikament') || lowerText.includes('pille') || lowerText.includes('substanz') || lowerText.includes('spritze') || lowerText.includes('drogen')) {
    return { icon: Icons.pill, color: '#f43f5e', label: 'SUBSTANZ' }
  }
  if (lowerText.includes('anlage') || lowerText.includes('sabotiert') || lowerText.includes('hack') || lowerText.includes('code') || lowerText.includes('technik')) {
    return { icon: Icons.tech, color: '#06b6d4', label: 'TECHNIK' }
  }
  if (lowerText.includes('streit') || lowerText.includes('geschrien') || lowerText.includes('bedroht') || lowerText.includes('gestohlen')) {
    return { icon: Icons.conflict, color: '#ef4444', label: 'KONFLIKT' }
  }
  if (lowerText.includes('geheim') || lowerText.includes('versteckt') || lowerText.includes('niemand weiß')) {
    return { icon: Icons.secret, color: '#8b5cf6', label: 'GEHEIM' }
  }
  if (lowerText.includes('gesehen') || lowerText.includes('beobachtet') || lowerText.includes('gehört')) {
    return { icon: Icons.eye, color: '#22c55e', label: 'BEOBACHTUNG' }
  }

  // Default: Person icon
  return { icon: Icons.person, color: '#ff6b35', label: 'PERSON' }
}

// Finde erwähnte Charaktere im Text
function findMentionedCharacters(text) {
  const mentioned = []
  const lowerText = text.toLowerCase()

  characters.forEach(char => {
    const nameParts = char.realName.toLowerCase().split(' ')
    const roleNameLower = char.roleName.toLowerCase()

    if (nameParts.some(part => lowerText.includes(part)) ||
        lowerText.includes(roleNameLower) ||
        lowerText.includes(char.id)) {
      mentioned.push(char)
    }
  })

  // Spezielle Erwähnungen
  if (lowerText.includes('bassmuschi') || lowerText.includes('eva')) {
    // Bassmuschi ist das Opfer, nicht in der Charakterliste
  }

  return mentioned.slice(0, 3) // Max 3
}

export default function KnowledgeCards({ knowledge }) {
  const [expandedCard, setExpandedCard] = useState(null)

  if (!knowledge || knowledge.length === 0) return null

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '24px' }}>💡</span>
        <div className="section-title" style={{ margin: 0 }}>WAS DU WEISST</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '15px'
      }}>
        {knowledge.map((item, index) => {
          const { icon, color, label } = getIconForContent(item)
          const mentioned = findMentionedCharacters(item)
          const isExpanded = expandedCard === index

          return (
            <div
              key={index}
              onClick={() => setExpandedCard(isExpanded ? null : index)}
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,30,0.8) 100%)',
                border: `1px solid ${color}40`,
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isExpanded ? `0 8px 32px ${color}30` : 'none'
              }}
            >
              {/* Header mit Icon */}
              <div style={{
                background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: `1px solid ${color}20`
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: `${color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: color,
                  flexShrink: 0
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: color,
                    fontWeight: 'bold',
                    marginBottom: '2px'
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#666'
                  }}>
                    HINWEIS #{index + 1}
                  </div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#888',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: '15px',
                fontSize: '13px',
                lineHeight: 1.7,
                color: '#ccc',
                maxHeight: isExpanded ? '500px' : '80px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}>
                {item}
              </div>

              {/* Erwähnte Personen */}
              {mentioned.length > 0 && (
                <div style={{
                  padding: '12px 15px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ fontSize: '10px', color: '#666', letterSpacing: '1px' }}>
                    BETRIFFT:
                  </span>
                  {mentioned.map(char => (
                    <span
                      key={char.id}
                      style={{
                        fontSize: '10px',
                        padding: '3px 8px',
                        background: 'rgba(255,107,53,0.2)',
                        border: '1px solid rgba(255,107,53,0.3)',
                        borderRadius: '4px',
                        color: '#ff6b35'
                      }}
                    >
                      {char.realName.split(' ')[0]}
                    </span>
                  ))}
                </div>
              )}

              {/* Fade-Effekt wenn nicht expanded */}
              {!isExpanded && (
                <div style={{
                  position: 'relative',
                  marginTop: '-40px',
                  height: '40px',
                  background: 'linear-gradient(transparent, rgba(20,20,30,0.95))',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Tipp */}
      <div style={{
        marginTop: '15px',
        fontSize: '11px',
        color: '#555',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Klicke auf eine Karte um mehr zu lesen
      </div>
    </div>
  )
}
