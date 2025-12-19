import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getCharacterById, validateCode } from '../data/characters'
import RelationshipMap from '../components/RelationshipMap'
import KnowledgeCards from '../components/KnowledgeCards'

// Typewriter-Effekt Komponente
function TypewriterText({ text, speed = 20, onComplete, className }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!text) return

    setDisplayedText('')
    indexRef.current = 0
    setIsComplete(false)

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(timer)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="typewriter-cursor" />}
    </span>
  )
}

// Profilbilder
import lenaImg from '../ProfilePics/Lena.png'
import svenjaImg from '../ProfilePics/Svenja.png'
import evaSImg from '../ProfilePics/EvaS.png'
import steffiImg from '../ProfilePics/Steffi.png'
import jasonImg from '../ProfilePics/Jason.png'
import lukasImg from '../ProfilePics/Lukas.png'
import lisaImg from '../ProfilePics/Lisa.png'
import fabiVImg from '../ProfilePics/FabiV.png'
import paetziImg from '../ProfilePics/Paetzi.png'
import kevinImg from '../ProfilePics/Kevin.png'
import annikaImg from '../ProfilePics/Annika.png'
import michaImg from '../ProfilePics/micha.png'
import benImg from '../ProfilePics/Ben.png'

const profilePics = {
  'lena': lenaImg,
  'svenja': svenjaImg,
  'eva-s': evaSImg,
  'steffi': steffiImg,
  'jason': jasonImg,
  'lukas': lukasImg,
  'lisa': lisaImg,
  'fabi-v': fabiVImg,
  'paetzi': paetziImg,
  'kevin': kevinImg,
  'annika': annikaImg,
  'micha': michaImg,
  'ben': benImg
}

export default function Character() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [enteredCode, setEnteredCode] = useState('')
  const [showPrivate, setShowPrivate] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [typewriterPhase, setTypewriterPhase] = useState(0) // Für gestaffelte Typewriter-Animation

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
      setTypewriterPhase(1) // Starte Typewriter-Animation
    } else {
      setCodeError(true)
    }
  }

  // Auch bei URL-Code die Animation starten
  useEffect(() => {
    if (showPrivate && typewriterPhase === 0) {
      setTypewriterPhase(1)
    }
  }, [showPrivate, typewriterPhase])

  const priv = character.privateInfo

  return (
    <div style={{
      minHeight: '100vh',
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
        background: 'rgba(0,0,0,0.75)',
        border: '1px solid #ff6b35',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Profilbild Header */}
        {profilePics[id] && (
          <div style={{
            position: 'relative',
            height: '300px',
            background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%), url(${profilePics[id]}) center top / cover no-repeat`
          }}>
            {/* Scanline Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              pointerEvents: 'none',
              opacity: 0.5
            }} />
          </div>
        )}

        <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
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
                <TypewriterText
                  text="🔓 GEHEIMAKTE ENTSPERRT"
                  speed={50}
                  onComplete={() => setTypewriterPhase(2)}
                />
              </span>
            </div>

            {/* Murderer Warning - mit dramatischem Typewriter */}
            {priv.isMurderer && typewriterPhase >= 2 && (
              <div className="murderer-warning">
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  <TypewriterText
                    text="⚠️ DU BIST DER MÖRDER ⚠️"
                    speed={80}
                  />
                </div>
                <p style={{ margin: '10px 0 0 0' }}>
                  <TypewriterText
                    text="Verrate dich nicht. Bleib cool. Leugne alles."
                    speed={30}
                  />
                </p>
              </div>
            )}

            {/* Restlicher Content erst nach Typewriter-Animation */}
            {typewriterPhase >= 2 && (
              <>
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

            {/* What you know - Graphische Karten */}
            <KnowledgeCards knowledge={priv.whatYouKnow} />

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

            {/* Beziehungskarte */}
            <RelationshipMap characterId={id} />

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
              </>
            )}
          </div>
        )}
        </div>
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
