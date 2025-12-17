import { useState } from 'react';

const characters = [
  { id: "lena", realName: "Lena Martin", roleName: "Schattenschwester", publicDescription: "Die stille Begleiterin. Immer da, nie im Rampenlicht.", dresscode: "Schwarz. Wie immer. Unauffällig.", color: "#1a1a2e" },
  { id: "svenja", realName: "Svenja Schröder", roleName: "OnePiece_Queen", publicDescription: "Hackerin. Technikerin. Sie kontrolliert Licht und Sound.", dresscode: "Cyberpunk-Vibes. Hoodie, Neon-Akzente.", color: "#0f3460" },
  { id: "eva-s", realName: "Eva Schnabrich", roleName: "Die Bankerin", publicDescription: "Sponsorin des Raves. Tagsüber seriös, nachts... weniger.", dresscode: "Schick aber rave-tauglich.", color: "#533483" },
  { id: "steffi", realName: "Stefanie Reif", roleName: "Glitterqueen", publicDescription: "Tänzerin. Stand immer neben Bassmuschi. Immer einen Schritt dahinter.", dresscode: "VOLLE GLITZER-POWER.", color: "#e94560" },
  { id: "jason", realName: "Jason", roleName: "Velvet Viper", publicDescription: "Drag-Ikone. Conférencier. Der schillerndste Vogel im Keller.", dresscode: "EXTRAVAGANZ PUR. Drag, Glitzer, Federn.", color: "#7b2cbf" },
  { id: "lukas", realName: "Lukas Kraus", roleName: "DJ Habibi", publicDescription: "Szene-Legende. Bassmuchis größter Fan – oder größter Rivale?", dresscode: "Full Habibi-Mode. Trainingsanzug, Goldketten.", color: "#f4a261" },
  { id: "lucas", realName: "Lucas Baierwaltes", roleName: "Der Captain", publicDescription: "Security-Chef. Hat alles im Griff. Oder?", dresscode: "Security-Vibes. Schwarz, praktisch.", color: "#2a9d8f" },
  { id: "lisa", realName: "Lisa Schwemmlein", roleName: "Clickbait-Lisa", publicDescription: "Influencerin. Will den geheimen Rave viral machen.", dresscode: "Instagram-ready. Ring-Light optional.", color: "#e9c46a" },
  { id: "fabi-r", realName: "Fabian Rebhan", roleName: "Wurstwasser", publicDescription: "Der Catering-Dealer. Vertickt seine 'Spezialitäten'.", dresscode: "Praktisch. Fleischer-Vibes.", color: "#bc6c25" },
  { id: "fabi-v", realName: "Fabian Völk", roleName: "Protein Prince", publicDescription: "Fitness-Influencer. Muskeln und Geheimnisse.", dresscode: "Eng. Zeig die Gains.", color: "#606c38" },
  { id: "paetzi", realName: "Patrick Neubauer", roleName: "Der Chronist", publicDescription: "Urgestein der Keller. Kennt jeden Winkel.", dresscode: "Gemütlich. Teddybär-Energie.", color: "#dda15e" },
  { id: "kevin", realName: "Kevin Uwira", roleName: "Bumms-Hans", publicDescription: "Türsteher mit Herz. Entscheidet wer reinkommt.", dresscode: "Türsteher-Look. Schwarz, breit.", color: "#283618" },
  { id: "annika", realName: "Annika Uwira", roleName: "Rabenmutter", publicDescription: "Gothic-Stammgästin. Kennt alle Schatten.", dresscode: "Gothic-Queen. Schwarz, elegant.", color: "#3c096c" },
  { id: "micha", realName: "Micha (Schubi)", roleName: "Der Konkurrent", publicDescription: "Rave-Veranstalter. Konkurrenz? Oder mehr?", dresscode: "Veranstalter-Vibes. Lässig aber stylish.", color: "#5a189a" },
  { id: "ben", realName: "Ben", roleName: "Agent B", publicDescription: "Der Mini-Detektiv. Sieht was Erwachsene übersehen.", dresscode: "Geheimagent-Style. Sonnenbrille, Lupe!", color: "#ff6b6b", special: true }
];

const privateData = {
  lena: {
    background: "Du bist seit Jahren Teil der NULL:UHR-Szene. Immer im Hintergrund, immer loyal – so denken alle. Die Wahrheit ist dunkler.",
    relationship: "Bassmuschi war deine Freundin. Bis sie dein Geheimnis entdeckt hat. Seitdem bist du ihre Marionette.",
    secret: "In deiner Vergangenheit hast du Medikamente verkauft. Nichts Riesiges, aber genug, um deinen Job als MFA zu verlieren. Bassmuschi weiß davon.",
    motive: "Seit Monaten erpresst sie dich. Du besorgst ihr Aufputschmittel, Benzos, alles was sie braucht. Heute Nacht hat sie mehr verlangt. Härteres Zeug. Du hast nein gesagt. Sie hat gedroht, alles zu verraten. Du hast rot gesehen.",
    knowledge: ["Du weißt, dass Bassmuschi nicht die ist, die sie vorgibt zu sein.", "Du hast gesehen, wie Steffi und Bassmuschi sich vor zwei Wochen gestritten haben.", "Du weißt, dass Eva S. Geld über den Rave wäscht."],
    goal: "Lenke den Verdacht auf andere. Bleib ruhig. Du hast jahrelang geschwiegen – eine Nacht schaffst du auch noch.",
    isMurderer: true
  },
  svenja: {
    background: "Du bist das technische Gehirn hinter NULL:UHR. Ohne dich läuft nichts – buchstäblich. Du kontrollierst die Anlage, das Licht, die Nebelmaschinen.",
    relationship: "Geschäftsbeziehung. Sie zahlt, du lieferst. Aber Respekt? Fehlanzeige.",
    secret: "Du hast entdeckt, dass jemand die Anlage manipuliert hat. Die Software wurde gehackt. Du weißt nicht von wem.",
    motive: "Bassmuschi hat dich letzte Woche vor allen bloßgestellt. Hat gesagt, jeder Idiot könnte deinen Job machen.",
    knowledge: ["Die Anlage wurde sabotiert – jemand hat den Code verändert.", "Du hast gesehen, wie Micha gestern Nacht alleine im Keller war.", "Bassmuschi hat ihre Sets gar nicht selbst gemixt – alles KI-generiert."],
    goal: "Finde heraus, wer die Anlage gehackt hat. War es der Mörder?"
  },
  "eva-s": {
    background: "Du arbeitest bei einer Bank. Seriöser Job, gutes Gehalt. Aber das ist nicht alles. Du hast einen Weg gefunden, über NULL:UHR Geld zu waschen.",
    relationship: "Geschäftspartnerinnen im dunkelsten Sinne. Ihr braucht euch gegenseitig – und ihr hasst euch dafür.",
    secret: "Die Geldwäsche läuft seit zwei Jahren. Wenn das rauskommt, bist du erledigt.",
    motive: "Bassmuschi wollte mehr Geld. Sie hat gedroht, zur Polizei zu gehen. Erpressung.",
    knowledge: ["Bassmuschi war komplett pleite – ihr Lifestyle war eine Fassade.", "Du hast gesehen, wie Kevin und Bassmuschi sich heimlich unterhalten haben.", "Fabi Rebhan hat Bassmuschi mit 'speziellen Substanzen' versorgt."],
    goal: "Niemand darf von der Geldwäsche erfahren. Lenke ab."
  },
  steffi: {
    background: "Du bist die beste Tänzerin der Szene. Alle wissen es. Aber wer bekommt die Aufmerksamkeit? Bassmuschi. Immer nur Bassmuschi.",
    relationship: "Offiziell: beste Freundinnen. Inoffiziell: Du hasst sie.",
    secret: "Du wolltest selbst DJ werden. Bassmuschi hat deinen Demo-Track gehört – und einen 'eigenen' rausgebracht, der verdächtig ähnlich klang.",
    motive: "Diebstahl und Demütigung. Jahre davon.",
    knowledge: ["Bassmuchis Musik ist FAKE – alles KI-generiert.", "Du hast gesehen, wie Lena Bassmuschi Pillen gegeben hat.", "Jason weiß mehr über Bassmuschi als er zugibt."],
    goal: "Endlich die Wahrheit ans Licht bringen."
  },
  jason: {
    background: "Du bist die Seele jeder Party. Extravagant, laut, unvergesslich. Bassmuschi und du – ihr wart das Power-Duo der Szene.",
    relationship: "Beste Freunde. Du hast alles für sie getan. Und du hast alles gesehen.",
    secret: "Du weißt, dass Bassmuschi ein kompletter Fake ist. Die KI-Musik, die zerstörten Karrieren, die Erpressungen.",
    motive: "Bassmuschi hat gedroht, ein peinliches Video von dir zu leaken.",
    knowledge: ["Bassmuschi hat mindestens drei andere DJs systematisch zerstört.", "Ihre Musik ist komplett KI-generiert. Sie kann gar nicht mixen.", "Micha hatte einen Riesenstreit wegen eines geklauten Tracks."],
    goal: "Du hast die meisten Geheimnisse. Nutze sie weise."
  },
  lukas: {
    background: "Du bist DJ Habibi – der Talahon der Turntables. Deine Auftritte sind legendär, dein Akzent noch legendärer.",
    relationship: "Ihr hattet mal was. Eine heiße, kurze Affäre. Dann hat sie dich abserviert. Vor allen.",
    secret: "Du bist nicht drüber hinweg. Die Demütigung sitzt tief.",
    motive: "Sie hat dich öffentlich gedemütigt. Hat gesagt, du wärst 'nur ein Witz'.",
    knowledge: ["Bassmuschi war in den letzten Wochen paranoid.", "Du hast gesehen, wie Eva S. ihr Bargeld gegeben hat.", "Pätzi weiß Dinge über die Keller."],
    goal: "Zeig allen, dass du mehr bist als ein Witz."
  },
  lucas: {
    background: "Du organisierst die Security für NULL:UHR. Ein Nebenjob, der gut zahlt.",
    relationship: "Arbeitgeber-Verhältnis – bis sie angefangen hat, dich zu erpressen.",
    secret: "Bassmuschi wusste etwas über dich und den Fußballverein. Vielleicht schwarze Kassen?",
    motive: "Erpressung. Sie hat gedroht, alles öffentlich zu machen.",
    knowledge: ["Du weißt genau, wer wann rein und raus ist.", "Kurz vor dem Mord ist Lena für fünf Minuten verschwunden.", "Fabi Völk hat heimlich mit Bassmuschi geflirtet."],
    goal: "Nutze dein Wissen über die Zugänge."
  },
  lisa: {
    background: "Du bist Influencerin. Nicht mega-famous, aber auf dem Weg. Ein viraler Post vom geheimsten Rave? Der Durchbruch.",
    relationship: "Sie hat dich GEHASST. Der Rave lebt von Geheimhaltung.",
    secret: "Du hast ALLES gefilmt. Heimlich. Auch Dinge, die du nicht hättest sehen sollen.",
    motive: "Sie hat dir deine große Chance verboten.",
    knowledge: ["Du hast auf Video, wie Steffi Bassmuschi anschreit.", "Kevin hat Bassmuschi 'Melanie' genannt.", "Du hast mehr Material als du zugibst."],
    goal: "Du hast Beweismaterial. Nutze es – oder lösche es."
  },
  "fabi-r": {
    background: "Du machst die beste Wurst in Kronach. Im Keller verkaufst du mehr als nur Snacks.",
    relationship: "Gute Kundin. Sie hat viel abgenommen – Wurst UND andere Sachen.",
    secret: "Du hast Bassmuschi regelmäßig mit Aufputschmitteln versorgt.",
    motive: "Bassmuschi schuldete dir Geld. Viel Geld. Seit Monaten.",
    knowledge: ["Bassmuschi war abhängig von deinem Zeug.", "Fabi Völk hat dich nach 'was zum Ruhigstellen' gefragt.", "Pätzi ist in einen Geheimgang verschwunden."],
    goal: "Halt dich aus dem Scheinwerferlicht."
  },
  "fabi-v": {
    background: "Du bist der Fitness-Guru. Gym ist Life. Aber auch Fitness-Bros haben Geheimnisse.",
    relationship: "Kompliziert. Sehr kompliziert.",
    secret: "Du hattest eine Affäre mit Bassmuschi. Niemand weiß davon.",
    motive: "Sie hat gedroht, es öffentlich zu machen.",
    knowledge: ["Bassmuschi war privat anhänglich, fast verzweifelt.", "Pätzi weiß von der Affäre.", "Lena war heute Nacht seltsam ruhig."],
    goal: "Niemand darf von der Affäre erfahren. Leugne alles."
  },
  paetzi: {
    background: "Du kennst diese Keller besser als jeder andere. Schon als Kind hast du hier gespielt.",
    relationship: "Ihr kanntet euch von früher. Bevor sie 'Bassmuschi' wurde. Du erinnerst dich an Melanie.",
    secret: "Du weißt von der Affäre zwischen Fabi Völk und Bassmuschi.",
    motive: "Sie hat die Keller entweiht. Diesen heiligen Ort.",
    knowledge: ["Es gibt einen Geheimgang hinter das DJ-Pult.", "Du hast Fabi V. und Bassmuschi zusammen gesehen.", "Kevin hat dich mal nach 'Melanie' gefragt."],
    goal: "Du weißt so viel. Entscheide weise, was du teilst."
  },
  kevin: {
    background: "Du bist der Türsteher. Freundlich aber bestimmt. Aber du hast ein Geheimnis.",
    relationship: "Ihr kennt euch von früher. Rock im Park. Damals hieß sie noch Melanie.",
    secret: "Du hast Fotos von früher. Melanie am Schlager-Pult auf einer Kirmes.",
    motive: "Erpressung. Sie hat gedroht, Gerüchte über dich zu streuen.",
    knowledge: ["Bassmuschi ist ein kompletter Fake. Du kanntest die echte Melanie.", "Annika weiß nichts davon.", "Heute Nacht kam jemand durch den Hintereingang."],
    goal: "Beschütze dein Geheimnis. Und beschütze Annika."
  },
  annika: {
    background: "Metal, Gothic, Underground – das ist deine Welt. Die Keller sind wie ein zweites Zuhause.",
    relationship: "Respekt, aber keine Freundschaft. Sie war dir immer zu... fake.",
    secret: "Kevin und Bassmuschi kannten sich. Er hat dir nie davon erzählt.",
    motive: "Kevin verheimlicht dir etwas – das macht dich wütend.",
    knowledge: ["Kevin und Bassmuschi hatten ein heimliches Gespräch. Du hast 'Melanie' und 'Fotos' gehört.", "Du kennst die Keller fast so gut wie Pätzi.", "Bassmuchis Musik klingt zu perfekt."],
    goal: "Finde heraus, was Kevin dir verschweigt."
  },
  micha: {
    background: "Du veranstaltest selbst Raves. Aber NULL:UHR hat dich immer überschattet.",
    relationship: "Feindin. Sie hat deinen Track geklaut. 'Feuchtigkeit' war DEIN Song.",
    secret: "Du bist hier um sie zur Rede zu stellen. Jetzt ist sie tot.",
    motive: "Diebstahl deiner Kunst. Sie hat dein Werk gestohlen und per KI verhunzt.",
    knowledge: ["Bassmuschi hat MEHREREN Leuten Tracks geklaut.", "Du warst gestern Nacht schon mal im Keller.", "Jason weiß alles über den Betrug."],
    goal: "Beweise, dass sie eine Diebin war. Aber beweis auch, dass DU es nicht warst."
  },
  ben: {
    background: "Du bist Agent B – der geheimste Geheimagent der Welt! Niemand verdächtigt ein Kind. Das ist deine Superkraft!",
    relationship: "Du kanntest sie nicht gut. Aber du hast AUGEN und OHREN.",
    secret: "Du hast keine Geheimnisse – aber du FINDEST welche!",
    motive: "Keins. Du bist hier um zu helfen!",
    knowledge: ["🔍 Mission 1: Such den Keller nach versteckten Hinweisen!", "🔍 Mission 2: Beobachte die Erwachsenen – wer ist komisch?", "🔍 Mission 3: Stell knifflige Fragen!"],
    goal: "Finde den Mörder! Du darfst als ERSTER deinen Verdacht sagen!",
    specialMissions: ["Finde den zerrissenen Zettel hinter der Bar", "Finde heraus, wer 'Melanie' gesagt hat", "Frag drei Leute: 'Wo warst du um 21 Uhr?'"]
  }
};

export default function NullUhrApp() {
  const [view, setView] = useState('home');
  const [selectedChar, setSelectedChar] = useState(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [showPrivate, setShowPrivate] = useState(false);

  const handleCodeSubmit = (charId) => {
    if (enteredCode.toLowerCase() === charId.toLowerCase()) {
      setShowPrivate(true);
    }
  };

  if (view === 'character' && selectedChar) {
    const char = characters.find(c => c.id === selectedChar);
    const priv = privateData[selectedChar];
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)',
        color: '#fff',
        fontFamily: "'Courier New', monospace",
        padding: '20px'
      }}>
        <button 
          onClick={() => { setView('home'); setSelectedChar(null); setShowPrivate(false); setEnteredCode(''); }}
          style={{
            background: 'transparent',
            border: '1px solid #ff6b35',
            color: '#ff6b35',
            padding: '10px 20px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontFamily: 'inherit'
          }}
        >
          ← ZURÜCK
        </button>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid #ff6b35',
          padding: '40px'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#ff6b35', 
            letterSpacing: '4px',
            marginBottom: '10px'
          }}>
            AKTE #{selectedChar.toUpperCase()}
          </div>
          
          <h1 style={{ 
            fontSize: '48px', 
            margin: '0 0 10px 0',
            color: '#ff6b35',
            textShadow: '0 0 20px rgba(255,107,53,0.5)'
          }}>
            {char.roleName}
          </h1>
          
          <div style={{ fontSize: '18px', color: '#888', marginBottom: '30px' }}>
            {char.realName}
          </div>

          <div style={{ 
            padding: '20px', 
            background: 'rgba(255,107,53,0.1)', 
            marginBottom: '30px',
            borderLeft: '3px solid #ff6b35'
          }}>
            <div style={{ color: '#ff6b35', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>
              ÖFFENTLICHE INFO
            </div>
            <p style={{ margin: 0, lineHeight: 1.8 }}>{char.publicDescription}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ color: '#ff6b35', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>
              👗 DRESSCODE
            </div>
            <p style={{ margin: 0, color: '#ccc' }}>{char.dresscode}</p>
          </div>

          {!showPrivate ? (
            <div style={{
              marginTop: '40px',
              padding: '30px',
              border: '2px dashed #ff6b35',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '20px', color: '#ff6b35' }}>
                🔒 GEHEIME INFORMATIONEN
              </div>
              <p style={{ color: '#888', marginBottom: '20px' }}>
                Gib deinen persönlichen Code ein:
              </p>
              <input
                type="text"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                placeholder="Code eingeben..."
                style={{
                  background: '#111',
                  border: '1px solid #ff6b35',
                  color: '#fff',
                  padding: '15px',
                  width: '200px',
                  textAlign: 'center',
                  fontFamily: 'inherit',
                  fontSize: '18px',
                  marginRight: '10px'
                }}
              />
              <button
                onClick={() => handleCodeSubmit(selectedChar)}
                style={{
                  background: '#ff6b35',
                  border: 'none',
                  color: '#000',
                  padding: '15px 30px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 'bold'
                }}
              >
                ENTSPERREN
              </button>
              {enteredCode && enteredCode.toLowerCase() !== selectedChar && (
                <p style={{ color: '#ff4444', marginTop: '15px' }}>Falscher Code!</p>
              )}
            </div>
          ) : (
            <div style={{ marginTop: '40px' }}>
              <div style={{
                background: 'linear-gradient(90deg, #ff6b35, transparent)',
                padding: '10px 20px',
                marginBottom: '30px'
              }}>
                <span style={{ fontWeight: 'bold', letterSpacing: '3px' }}>🔓 GEHEIMAKTE ENTSPERRT</span>
              </div>

              {priv.isMurderer && (
                <div style={{
                  background: '#ff0000',
                  color: '#fff',
                  padding: '20px',
                  marginBottom: '30px',
                  textAlign: 'center',
                  animation: 'pulse 2s infinite'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>⚠️ DU BIST DER MÖRDER ⚠️</div>
                  <p>Verrate dich nicht. Bleib cool. Leugne alles.</p>
                </div>
              )}

              <Section title="HINTERGRUND" content={priv.background} />
              <Section title="BEZIEHUNG ZU BASSMUSCHI" content={priv.relationship} />
              <Section title="DEIN GEHEIMNIS" content={priv.secret} highlight />
              <Section title="DEIN MOTIV" content={priv.motive} />
              
              <div style={{ marginBottom: '30px' }}>
                <div style={{ color: '#ff6b35', fontSize: '12px', letterSpacing: '2px', marginBottom: '15px' }}>
                  💡 WAS DU WEISST
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 2 }}>
                  {priv.knowledge.map((k, i) => (
                    <li key={i} style={{ color: '#ccc' }}>{k}</li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: 'rgba(255,107,53,0.2)',
                padding: '20px',
                borderLeft: '3px solid #ff6b35'
              }}>
                <div style={{ color: '#ff6b35', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>
                  🎯 DEIN ZIEL
                </div>
                <p style={{ margin: 0, fontSize: '18px' }}>{priv.goal}</p>
              </div>

              {priv.specialMissions && (
                <div style={{ marginTop: '30px', background: '#1a3a1a', padding: '20px', border: '2px solid #4a4' }}>
                  <div style={{ color: '#4f4', fontSize: '14px', letterSpacing: '2px', marginBottom: '15px' }}>
                    🕵️ SPEZIAL-MISSIONEN FÜR AGENT B
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {priv.specialMissions.map((m, i) => (
                      <li key={i} style={{ color: '#8f8', marginBottom: '10px' }}>☐ {m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0510 50%, #0a0a0a 100%)',
      color: '#fff',
      fontFamily: "'Courier New', monospace"
    }}>
      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
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
          fontSize: 'clamp(60px, 15vw, 120px)',
          margin: 0,
          color: '#ff6b35',
          textShadow: '0 0 60px rgba(255,107,53,0.8), 0 0 120px rgba(255,107,53,0.4)',
          letterSpacing: '-2px',
          lineHeight: 1
        }}>
          NULL:UHR
        </h1>
        
        <div style={{
          fontSize: '24px',
          color: '#888',
          marginTop: '20px',
          letterSpacing: '4px'
        }}>
          DIE LETZTE NACHT
        </div>

        <div style={{
          marginTop: '60px',
          padding: '30px',
          background: 'rgba(0,0,0,0.5)',
          display: 'inline-block',
          border: '1px solid #333'
        }}>
          <p style={{ margin: '0 0 10px 0', color: '#ff6b35' }}>📍 Strauer Str. 15, Kronach</p>
          <p style={{ margin: '0 0 10px 0', color: '#888' }}>📅 31.12.2025 ab 20:00 Uhr</p>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Tief unter der Festung. Wo das Ordnungsamt nicht hinkommt.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: 2, 
          color: '#aaa',
          fontStyle: 'italic'
        }}>
          BASSMUSCHI legt auf. Der Bass dröhnt durch jahrhundertealte Steinmauern. 
          Nebel kriecht über den Boden. Neonlichter flackern.<br/><br/>
          Doch kurz vor Mitternacht verstummt die Musik.<br/>
          Sie liegt hinter den Decks. Tot. 💀<br/><br/>
          Die Tür fällt ins Schloss.<br/>
          <span style={{ color: '#ff6b35' }}>Einer von euch war's.</span>
        </p>
      </div>

      {/* Characters Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '14px',
          letterSpacing: '6px',
          color: '#ff6b35',
          marginBottom: '50px'
        }}>
          DIE VERDÄCHTIGEN
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {characters.map((char) => (
            <div
              key={char.id}
              onClick={() => { setSelectedChar(char.id); setView('character'); }}
              style={{
                background: `linear-gradient(135deg, ${char.color}40 0%, #0a0a0a 100%)`,
                border: '1px solid #333',
                padding: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {char.special && (
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
                👗 {char.dresscode}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: '#444'
      }}>
        <p style={{ letterSpacing: '4px', fontSize: '12px' }}>
          SEE YOU IN THE DARK
        </p>
        <div style={{ 
          marginTop: '20px',
          fontSize: '30px'
        }}>
          💀
        </div>
      </div>
    </div>
  );
}

function Section({ title, content, highlight }) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <div style={{ 
        color: '#ff6b35', 
        fontSize: '12px', 
        letterSpacing: '2px', 
        marginBottom: '10px' 
      }}>
        {title}
      </div>
      <p style={{ 
        margin: 0, 
        lineHeight: 1.8, 
        color: highlight ? '#fff' : '#ccc',
        background: highlight ? 'rgba(255,107,53,0.15)' : 'transparent',
        padding: highlight ? '15px' : 0,
        borderLeft: highlight ? '3px solid #ff6b35' : 'none'
      }}>
        {content}
      </p>
    </div>
  );
}
