import { useState } from 'react'
import { relationships } from '../data/characters'
import { characters } from '../data/characters'

// Hilfsfunktion um Charakter-Info zu holen
function getCharInfo(id) {
  return characters.find(c => c.id === id)
}

export default function RelationshipMap({ characterId }) {
  const [hoveredChar, setHoveredChar] = useState(null)
  const rel = relationships[characterId]

  if (!rel) return null

  const renderCharacterBadge = (id, type) => {
    const char = getCharInfo(id)
    if (!char) return null

    const colors = {
      ally: { bg: 'rgba(34, 197, 94, 0.2)', border: '#22c55e', glow: 'rgba(34, 197, 94, 0.4)' },
      neutral: { bg: 'rgba(156, 163, 175, 0.15)', border: '#6b7280', glow: 'rgba(156, 163, 175, 0.2)' },
      rival: { bg: 'rgba(239, 68, 68, 0.2)', border: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' }
    }

    const color = colors[type]
    const reason = type === 'ally'
      ? rel.allyReasons?.[id]
      : type === 'rival'
        ? rel.rivalReasons?.[id]
        : null

    const isHovered = hoveredChar === id

    return (
      <div
        key={id}
        onMouseEnter={() => setHoveredChar(id)}
        onMouseLeave={() => setHoveredChar(null)}
        style={{
          position: 'relative',
          background: color.bg,
          border: `1px solid ${color.border}`,
          borderRadius: '8px',
          padding: '12px 16px',
          cursor: reason ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered ? `0 0 20px ${color.glow}` : 'none'
        }}
      >
        <div style={{
          fontSize: '11px',
          color: '#888',
          letterSpacing: '1px',
          marginBottom: '4px'
        }}>
          {char.realName}
        </div>
        <div style={{
          fontSize: '14px',
          color: color.border,
          fontWeight: 'bold'
        }}>
          {char.roleName}
        </div>

        {/* Tooltip mit Grund */}
        {reason && isHovered && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '10px',
            background: 'rgba(0,0,0,0.95)',
            border: `1px solid ${color.border}`,
            borderRadius: '6px',
            padding: '10px 14px',
            width: '220px',
            fontSize: '12px',
            color: '#ddd',
            lineHeight: 1.5,
            zIndex: 100,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${color.glow}`
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'rgba(0,0,0,0.95)',
              borderRight: `1px solid ${color.border}`,
              borderBottom: `1px solid ${color.border}`
            }} />
            {reason}
          </div>
        )}
      </div>
    )
  }

  const Section = ({ title, icon, type, ids }) => {
    if (!ids || ids.length === 0) return null

    const colors = {
      ally: '#22c55e',
      neutral: '#6b7280',
      rival: '#ef4444'
    }

    return (
      <div style={{ marginBottom: '25px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '15px',
          paddingBottom: '8px',
          borderBottom: `1px solid ${colors[type]}30`
        }}>
          <span style={{ fontSize: '18px' }}>{icon}</span>
          <span style={{
            fontSize: '12px',
            letterSpacing: '2px',
            color: colors[type],
            fontWeight: 'bold'
          }}>
            {title}
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '11px',
            color: '#666',
            background: 'rgba(255,255,255,0.05)',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {ids.length}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '10px'
        }}>
          {ids.map(id => renderCharacterBadge(id, type))}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      marginTop: '30px',
      padding: '25px',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: '12px',
      border: '1px solid #333'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '25px'
      }}>
        <span style={{ fontSize: '24px' }}>🕸️</span>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          letterSpacing: '3px',
          color: '#ff6b35'
        }}>
          BEZIEHUNGSNETZ
        </h3>
      </div>

      {/* Legende */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '25px',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '11px', color: '#888' }}>Vertraut</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6b7280' }} />
          <span style={{ fontSize: '11px', color: '#888' }}>Neutral</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ fontSize: '11px', color: '#888' }}>Misstraut</span>
        </div>
      </div>

      <Section title="VERTRAUT" icon="💚" type="ally" ids={rel.ally} />
      <Section title="MISSTRAUT" icon="🔴" type="rival" ids={rel.rival} />
      <Section title="NEUTRAL" icon="⚪" type="neutral" ids={rel.neutral} />

      {/* Hinweis */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: 'rgba(255,107,53,0.1)',
        borderLeft: '3px solid #ff6b35',
        fontSize: '12px',
        color: '#888',
        fontStyle: 'italic'
      }}>
        💡 Hover über Personen für Details zu deiner Beziehung
      </div>
    </div>
  )
}
