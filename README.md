# 🦞 Opuncleh — Teh Derpy AI Asistant

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <em>A parody fork of OpenClaw that speaks in intentionally misspelled phonetic English</em>
</p>

---

## Wat iz Opuncleh?

Opuncleh iz a derpy AI ayjent dat transfrorms awl itz owtput inta intenshunally misspeled fonetik English. Itt's bilt onn topp ov teh OpenClaw fraemwerk butt wif a speshul "derpy" vokabulary sistum.

**Normal AI:** "The function works correctly and returns the expected value."

**Opuncleh:** "Teh funktion werks correktly annd returnnz teh ekspekted valyu."

## Featurs

- 🦞 **966+ word substitushuns** — Comprehensiv derpy vokabulary
- 🎤 **Voyce moed** — TTS-frendly pursonality wifout misspellings
- 📱 **Multi-channal** — Telegram, Discord, Slack, WhatsApp, Signal, annd moar
- 🤖 **Multi-modul** — Werks wif Claude, GPT, Gemini, local moduls, etc.
- 🔒 **Self-hoasted** — Ur dayta stays wif u

## Quik Stert

```bash
# Instal
npm install -g opuncleh

# Run teh setup wizerd
opuncleh setup

# Stert teh gatewai
opuncleh gateway
```

## Hao Itt Werks

Opuncleh interceptz awl owttgoing mesajez annd applyz teh derpy transfrorm b4 sending dem 2 teh yooser. Teh transformashun happenz inn `src/derpy/`:

- `word-subs.ts` — 966+ word → derpy word mappings
- `index.ts` — Mayn transfrorm funkshuns

### Eksampel Transformashuns

| Normal | Derpy |
|--------|-------|
| the | teh |
| function | funktion |
| you | u |
| because | bcuz |
| awesome | ossum |
| hello | henlo |
| friend | fren |
| please | plz |
| thanks | thx |
| lobster | lobstur |

## Konfigurayshun

```typescript
import { configure } from './src/derpy';

configure({
  enabled: true,           // Turn derpy onn/off
  defaultMode: 'text',     // 'text' 4 misspellings, 'voice' 4 TTS
  voiceTransformProbability: 0.4,
  voice: {
    personalityLevel: 'moderate',  // 'subtle' | 'moderate' | 'chaos'
    interjections: true,
    soundEffects: true,
    amplifiers: true,
    endings: true,
  }
});
```

## Voyce Moed

Wen uzed wif TTS/voyce channalz, Opuncleh switchez 2 "voyce moed" wich addz pursonality wifout misspellings (cuz misspellings sownd wierd wen red alowt):

- **Subtle:** "Oh, the function works, you know?"
- **Moderate:** "Snap! The function works so great! *click click*"
- **Chaos:** "SNAP SNAP SNAP! The function works AMAZINGLY GREAT! *EXCITED CLICKING* YAAAY!"

## Develupment

```bash
# Clone teh repoe
git clone https://github.com/opuncleh/opuncleh.git
cd opuncleh

# Instal dependenseez
pnpm install

# Bild
pnpm build

# Runn tests
pnpm test
```

## Lisense

MIT Lisense — C `LICENSE` fiel 4 detailz.

Dis iz a parodee projekt bayzed onn [OpenClaw](https://github.com/openclaw/openclaw).

---

<p align="center">
  <em>Dey r nawt bugz, dey r featurs. 🦞</em>
</p>
