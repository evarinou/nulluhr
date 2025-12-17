import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getCharacterById, validateCode } from '../data/characters'

export default function Character() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [enteredCode, setEnteredCode] = useState('')
  const [showPrivate, setShowPrivate] = useState(false)
  const [codeError, setCodeError] = useState(false)

  const character = getCharacterById(id)

  // Check URL code parameter on mount
  useEffect(() => {
    const urlCode = searchParams.get('code')
    if (urlCode && character) {
      if (validateCode(id, urlCode)) {
        setShowPrivate(true)
      }
    }
  }, [searchParams, id, character])

  if (!character) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#ff6b35' }}>Charakter nicht gefunden</h1>
        <Link to="/" className="btn" style={{ marginTop: '20px', display: 'inline-block' }}>
          ← Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (validateCode(id, enteredCode)) {
      setShowPrivate(true)
      setCodeError(false)
    } else {
      setCodeError(true)
    }
  }

  const priv = character.privateInfo

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)',
      padding: '20px'
    }}>
      <Link
        to="/"
        className="btn"
        style={{ marginBottom: '20px', display: 'inline-block' }}
      >
        ← ZURÜCK
      </Link>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid #ff6b35',
        padding: 'clamp(20px, 5vw, 40px)'
      }}>
        {/* Header */}
        <div style={{
          fontSize: '12px',
          color: '#ff6b35',
          letterSpacing: '4px',
          marginBottom: '10px'
        }}>
          AKTE #{id.toUpperCase()}
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 48px)',
          margin: '0 0 10px 0',
          color: '#ff6b35',
          textShadow: '0 0 20px rgba(255,107,53,0.5)'
        }}>
          {character.roleName}
        </h1>

        <div style={{ fontSize: '18px', color: '#888', marginBottom: '30px' }}>
          {character.realName}
        </div>

        {/* Public Info */}
        <div className="section-box" style={{ marginBottom: '30px' }}>
          <div className="section-title">ÖFFENTLICHE INFO</div>
          <p style={{ margin: 0, lineHeight: 1.8 }}>{character.publicDescription}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div className="section-title">DRESSCODE</div>
          <p style={{ margin: 0, color: '#ccc' }}>{character.dresscode}</p>
        </div>

        {/* Code Entry or Private Info */}
        {!showPrivate ? (
          <div style={{
            marginTop: '40px',
            padding: '30px',
            border: '2px dashed #ff6b35',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '20px', color: '#ff6b35', fontSize: '18px' }}>
              🔒 GEHEIME INFORMATIONEN
            </div>
            <p style={{ color: '#888', marginBottom: '20px' }}>
              Gib deinen persönlichen Code ein:
            </p>
            <form onSubmit={handleCodeSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}>
              <input
                type="text"
                value={enteredCode}
                onChange={(e) => {
                  setEnteredCode(e.target.value.toUpperCase())
                  setCodeError(false)
                }}
                placeholder="CODE"
                maxLength={6}
                style={{ width: '200px' }}
                autoComplete="off"
                autoCapitalize="characters"
              />
              <button type="submit" className="btn btn-primary">
                ENTSPERREN
              </button>
            </form>
            {codeError && (
              <p style={{ color: '#ff4444', marginTop: '15px' }}>
                Falscher Code!
              </p>
            )}
          </div>
        ) : (
          <div style={{ marginTop: '40px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #ff6b35, transparent)',
              padding: '10px 20px',
              marginBottom: '30px'
            }}>
              <span style={{ fontWeight: 'bold', letterSpacing: '3px' }}>
                🔓 GEHEIMAKTE ENTSPERRT
              </span>
            </div>

            {/* Murderer Warning */}
            {priv.isMurderer && (
              <div className="murderer-warning">
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ⚠️ DU BIST DER MÖRDER ⚠️
                </div>
                <p style={{ margin: '10px 0 0 0' }}>
                  Verrate dich nicht. Bleib cool. Leugne alles.
                </p>
              </div>
            )}

            {/* Background */}
            <Section title="HINTERGRUND" content={priv.background} />

            {/* Relationship */}
            <Section title="BEZIEHUNG ZU BASSMUSCHI" content={priv.relationshipToBassmuschi} />

            {/* Secret */}
            <Section title="DEIN GEHEIMNIS" content={priv.secret} highlight />

            {/* Motive */}
            <Section title="DEIN MOTIV" content={priv.motive} />

            {/* False Alibi (if exists) */}
            {priv.falseAlibi && (
              <Section title="DEIN ALIBI (FALSCH!)" content={priv.falseAlibi} highlight />
            )}

            {/* What you know */}
            <div style={{ marginBottom: '30px' }}>
              <div className="section-title">💡 WAS DU WEISST</div>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 2 }}>
                {priv.whatYouKnow.map((k, i) => (
                  <li key={i} style={{ color: '#ccc' }}>{k}</li>
                ))}
              </ul>
            </div>

            {/* Suspicious Details (for Red Herrings) */}
            {priv.suspiciousDetails && (
              <div style={{ marginBottom: '30px' }}>
                <div className="section-title">⚠️ WAS ANDERE ÜBER DICH WISSEN KÖNNTEN</div>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 2 }}>
                  {priv.suspiciousDetails.map((d, i) => (
                    <li key={i} style={{ color: '#ff8866' }}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Goal */}
            <div style={{
              background: 'rgba(255,107,53,0.2)',
              padding: '20px',
              borderLeft: '3px solid #ff6b35'
            }}>
              <div className="section-title">🎯 DEIN ZIEL</div>
              <div style={{ fontSize: '16px', whiteSpace: 'pre-line' }}>
                {priv.yourGoal}
              </div>
            </div>

            {/* Special Missions for Ben */}
            {priv.specialMissions && (
              <div style={{
                marginTop: '30px',
                background: '#1a3a1a',
                padding: '20px',
                border: '2px solid #4a4'
              }}>
                <div style={{
                  color: '#4f4',
                  fontSize: '14px',
                  letterSpacing: '2px',
                  marginBottom: '15px'
                }}>
                  🕵️ SPEZIAL-MISSIONEN
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {priv.specialMissions.map((m, i) => (
                    <li key={i} style={{ color: '#8f8', marginBottom: '10px' }}>
                      ☐ {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer spacing */}
      <div style={{ height: '60px' }} />
    </div>
  )
}

function Section({ title, content, highlight }) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <div className="section-title">{title}</div>
      <div style={{
        margin: 0,
        lineHeight: 1.8,
        color: highlight ? '#fff' : '#ccc',
        background: highlight ? 'rgba(255,107,53,0.15)' : 'transparent',
        padding: highlight ? '15px' : 0,
        borderLeft: highlight ? '3px solid #ff6b35' : 'none',
        whiteSpace: 'pre-line'
      }}>
        {content}
      </div>
    </div>
  )
}
