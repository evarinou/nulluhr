import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { characters, event } from '../data/characters'
import AudioVisualizer from '../components/AudioVisualizer'

const colors = {
  'lena': '#1a1a2e',
  'svenja': '#0f3460',
  'eva-s': '#533483',
  'steffi': '#e94560',
  'jason': '#7b2cbf',
  'lukas': '#f4a261',
  'lucas': '#2a9d8f',
  'lisa': '#e9c46a',
  'fabi-r': '#bc6c25',
  'fabi-v': '#606c38',
  'paetzi': '#dda15e',
  'kevin': '#283618',
  'annika': '#3c096c',
  'micha': '#5a189a',
  'ben': '#ff6b6b'
}

export default function Home() {
  // Verdächtige erst ab 20.12.2025 anzeigen
  const revealDate = new Date('2025-12-20T00:00:00')
  const isRevealed = new Date() >= revealDate
  // TODO: Zum Testen auf true setzen, dann wieder auf obige Zeile zurücksetzen
  // const isRevealed = true

  // PWA Install
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallHelp, setShowInstallHelp] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Prüfen ob bereits installiert (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Chrome/Edge Install-Prompt abfangen
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android/Chrome: Native Prompt zeigen
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    } else {
      // iOS/andere: Anleitung zeigen
      setShowInstallHelp(true)
    }
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <AudioVisualizer />
      {/* Hero */}
      <header style={{
        textAlign: 'center',
        padding: '60px 20px 80px',
        background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.15) 0%, transparent 70%)'
      }}>
        <div style={{
          fontSize: '14px',
          letterSpacing: '8px',
          color: '#ff6b35',
          marginBottom: '20px'
        }}>
          SILVESTER 2025
        </div>

        <h1 style={{
          fontSize: 'clamp(50px, 12vw, 100px)',
          margin: 0,
          color: '#ff6b35',
          textShadow: '0 0 60px rgba(255,107,53,0.8), 0 0 120px rgba(255,107,53,0.4)',
          letterSpacing: '-2px',
          lineHeight: 1
        }}>
          NULL:UHR
        </h1>

        <div style={{
          fontSize: 'clamp(16px, 4vw, 24px)',
          color: '#888',
          marginTop: '20px',
          letterSpacing: '4px'
        }}>
          DIE LETZTE NACHT
        </div>

        <div style={{
          marginTop: '50px',
          padding: '25px',
          background: 'rgba(0,0,0,0.5)',
          display: 'inline-block',
          border: '1px solid #333'
        }}>
          <p style={{ margin: '0 0 8px 0', color: '#ff6b35' }}>
            {event.location}
          </p>
          <p style={{ margin: '0 0 8px 0', color: '#888' }}>
            {event.date} ab {event.time}
          </p>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Tief unter Kronach. Wo das Ordnungsamt nicht hinkommt.
          </p>
        </div>

      </header>

      {/* Story */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px 60px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          lineHeight: 2,
          color: '#aaa',
          fontStyle: 'italic'
        }}>
          BASSMUSCHI legt auf. Die Beats dröhnen durch jahrhundertealte Steinmauern.
          Nebel kriecht über den Boden. Neonlichter flackern.
          <br/><br/>
          Doch kurz vor Mitternacht verstummt die Musik.
          <br/>
          BASSMUSCHI liegt hinter den Decks. Tot.
          <br/><br/>
          Die Tür fällt ins Schloss.
          <br/>
          <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>Einer von euch war's.</span>
        </p>
      </section>

      {/* Characters Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 20px 60px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '14px',
          letterSpacing: '6px',
          color: '#ff6b35',
          marginBottom: '40px'
        }}>
          DIE VERDÄCHTIGEN
        </h2>

        {isRevealed ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {characters.map((char) => (
              <Link to={`/charakter/${char.id}`} key={char.id}>
                <article
                  style={{
                    background: `linear-gradient(135deg, ${colors[char.id]}40 0%, #0a0a0a 100%)`,
                    border: '1px solid #333',
                    padding: '25px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff6b35'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {char.privateInfo?.isSpecialRole && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ff6b35',
                      color: '#000',
                      padding: '3px 8px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      SPEZIAL
                    </div>
                  )}

                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    letterSpacing: '2px',
                    marginBottom: '8px'
                  }}>
                    {char.realName}
                  </div>

                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: '#ff6b35',
                    fontSize: '22px'
                  }}>
                    {char.roleName}
                  </h3>

                  <p style={{
                    margin: 0,
                    color: '#888',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    {char.publicDescription}
                  </p>

                  <div style={{
                    marginTop: '20px',
                    paddingTop: '15px',
                    borderTop: '1px solid #333',
                    fontSize: '12px',
                    color: '#555'
                  }}>
                    {char.dresscode}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid #333'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              🔒
            </div>
            <p style={{
              color: '#888',
              fontSize: '18px',
              margin: '0 0 10px 0'
            }}>
              Die Verdächtigen werden am <span style={{ color: '#ff6b35' }}>20. Dezember 2025</span> enthüllt.
            </p>
            <p style={{
              color: '#555',
              fontSize: '14px',
              margin: 0
            }}>
              Bis dahin bleibt alles im Dunkeln...
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#444'
      }}>
        <p style={{ letterSpacing: '4px', fontSize: '12px' }}>
          SEE YOU IN THE DARK
        </p>
        <div style={{ marginTop: '20px', fontSize: '30px' }}>
          💀
        </div>
      </footer>

      {/* Floating Install Button */}
      {!isInstalled && (
        <button
          onClick={handleInstallClick}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '14px 20px',
            background: '#ff6b35',
            border: 'none',
            color: '#000',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
            zIndex: 100,
            fontFamily: 'Courier New, monospace'
          }}
        >
          APP INSTALLIEREN
        </button>
      )}

      {/* Install Help Modal */}
      {showInstallHelp && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowInstallHelp(false)}
        >
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              padding: '30px',
              maxWidth: '400px',
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: '#ff6b35', margin: '0 0 20px 0', fontSize: '18px' }}>
              App installieren
            </h3>

            {isIOS ? (
              <div style={{ color: '#aaa', lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 15px 0' }}>
                  <strong style={{ color: '#fff' }}>iPhone/iPad:</strong>
                </p>
                <ol style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>Tippe auf <span style={{ color: '#ff6b35' }}>Teilen</span> (Quadrat mit Pfeil nach oben)</li>
                  <li>Scrolle und wähle <span style={{ color: '#ff6b35' }}>"Zum Home-Bildschirm"</span></li>
                  <li>Tippe auf <span style={{ color: '#ff6b35' }}>"Hinzufügen"</span></li>
                </ol>
              </div>
            ) : (
              <div style={{ color: '#aaa', lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 15px 0' }}>
                  <strong style={{ color: '#fff' }}>Android:</strong>
                </p>
                <ol style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>Tippe auf das <span style={{ color: '#ff6b35' }}>Menü</span> (drei Punkte oben rechts)</li>
                  <li>Wähle <span style={{ color: '#ff6b35' }}>"App installieren"</span> oder <span style={{ color: '#ff6b35' }}>"Zum Startbildschirm hinzufügen"</span></li>
                </ol>
              </div>
            )}

            <button
              onClick={() => setShowInstallHelp(false)}
              style={{
                marginTop: '25px',
                padding: '10px 20px',
                background: '#ff6b35',
                border: 'none',
                color: '#000',
                fontSize: '14px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              VERSTANDEN
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
