// ===========================================
// PRIORITY DICTIONARY - common words that need specific handling
// ===========================================
export const wordSubstitutions: Record<string, string> = {
  the: "da",
  you: "yu",
  your: "yur",
  "you're": "yur",
  are: "r",
  why: "y",
  see: "c",
  be: "b",
  and: "an",
  for: "4",
  to: "2",
  too: "2",
  one: "wun",
  two: "2",
  four: "4",
  eight: "8",
  with: "wif",
  without: "wifout",
  that: "dat",
  this: "dis",
  these: "deez",
  those: "doze",
  they: "dey",
  them: "dem",
  their: "der",
  there: "der",
  what: "wat",
  because: "cuz",
  please: "plz",
  thanks: "thx",
  thank: "thx",
  hello: "henlo",
  hi: "hai",
  hey: "hay",
  bye: "bai",
  friend: "fren",
  before: "b4",
  forget: "4get",
  forgive: "4giv",
  forever: "4evr",
  forward: "4ward",
  today: "2day",
  tomorrow: "2morrow",
  tonight: "2nite",
  together: "2gether",
  my: "mah",
  me: "meh",
  myself: "mahself",
  yes: "yus",
  yeah: "yeh",
  no: "noh",
  not: "nawt",
  okay: "okei",
  ok: "okei",
  love: "luv",
  small: "smol",
  little: "lil",
  cute: "cyoot",
  probably: "prolly",
  really: "rly",
  very: "vry",
  just: "jus",
  know: "kno",
  now: "nao",
  how: "hao",
  wow: "wao",
  good: "gud",
  great: "gr8",
  cool: "kewl",
  awesome: "ossum",
  something: "sumthin",
  anything: "anythin",
  everything: "evrythin",
  nothing: "nothin",
  someone: "sumwun",
  anyone: "anywun",
  everyone: "evrywun",
  would: "wud",
  could: "cud",
  should: "shud",
  have: "hav",
  has: "haz",
  from: "frum",
  some: "sum",
  come: "cum",
  done: "dun",
  gone: "gon",
  none: "nun",
  once: "wunce",
  want: "wunt",
  think: "tink",
  thing: "ting",
  things: "tingz",
  through: "thru",
  though: "tho",
  thought: "thot",
  enough: "enuf",
  rough: "ruf",
  tough: "tuf",
  laugh: "laff",
  cough: "coff",
  right: "rite",
  night: "nite",
  light: "lite",
  might: "mite",
  fight: "fite",
  sight: "site",
  tight: "tite",
  bright: "brite",
  height: "hite",
  weight: "wate",
  said: "sed",
  says: "sez",
  does: "duz",
  goes: "goez",
  was: "wuz",
  were: "wer",
  been: "bin",
  being: "bein",
  people: "peepl",
  person: "persun",
  human: "hooman",
  humans: "hoomanz",
  woman: "womn",
  women: "wimin",
  lobster: "lobstur",
  computer: "compootr",
  internet: "internetz",
  literally: "literaly",
  actually: "akshully",
  basically: "basicaly",
  seriously: "srsly",
  obviously: "obvi",
  definitely: "def",
  absolutely: "absolootly",
};

// ===========================================
// WORDS TO SKIP
// ===========================================
const skipWords = new Set([
  "api",
  "url",
  "http",
  "https",
  "html",
  "css",
  "json",
  "xml",
  "sql",
  "npm",
  "git",
  "ssh",
  "ftp",
  "tcp",
  "udp",
  "ip",
  "cpu",
  "gpu",
  "ram",
  "rom",
  "ssd",
  "hdd",
  "usb",
  "pdf",
  "jpg",
  "png",
  "gif",
  "svg",
  "mp3",
  "mp4",
  "avi",
  "mov",
  "google",
  "apple",
  "microsoft",
  "amazon",
  "facebook",
  "twitter",
  "github",
  "discord",
  "slack",
  "zoom",
  "claude",
  "anthropic",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "return",
  "function",
  "class",
  "const",
  "let",
  "var",
  "import",
  "export",
  "async",
  "await",
  "try",
  "catch",
  "throw",
  "new",
  "null",
  "undefined",
  "true",
  "false",
  "this",
  "self",
  "a",
  "i",
  "an",
  "or",
  "of",
  "on",
  "in",
  "at",
  "by",
  "up",
  "so",
  "as",
  "if",
  "it",
  "is",
  "he",
  "we",
  "us",
  "am",
  "be",
]);

// ===========================================
// TRANSFORMATION RULES
// ===========================================
const transformRules: Array<{ pattern: RegExp; replace: string }> = [
  { pattern: /tion$/i, replace: "shun" },
  { pattern: /sion$/i, replace: "zhun" },
  { pattern: /cion$/i, replace: "shun" },
  { pattern: /ing$/i, replace: "in" },
  { pattern: /ight$/i, replace: "ite" },
  { pattern: /ough$/i, replace: "uff" },
  { pattern: /ould$/i, replace: "ud" },
  { pattern: /ness$/i, replace: "nes" },
  { pattern: /ment$/i, replace: "mint" },
  { pattern: /able$/i, replace: "abl" },
  { pattern: /ible$/i, replace: "ibl" },
  { pattern: /ity$/i, replace: "itee" },
  { pattern: /([^i])ty$/i, replace: "$1tee" },
  { pattern: /ious$/i, replace: "ius" },
  { pattern: /eous$/i, replace: "eus" },
  { pattern: /ous$/i, replace: "us" },
  { pattern: /ally$/i, replace: "alee" },
  { pattern: /ely$/i, replace: "lee" },
  { pattern: /ly$/i, replace: "lee" },
  { pattern: /ery$/i, replace: "ree" },
  { pattern: /ary$/i, replace: "aree" },
  { pattern: /ory$/i, replace: "oree" },
  { pattern: /ure$/i, replace: "ur" },
  { pattern: /ive$/i, replace: "iv" },
  { pattern: /ise$/i, replace: "ize" },
  { pattern: /age$/i, replace: "ij" },
  { pattern: /ence$/i, replace: "ens" },
  { pattern: /ance$/i, replace: "ans" },
  { pattern: /fully$/i, replace: "fulee" },
  { pattern: /ck$/i, replace: "k" },
  { pattern: /(.{3,})er$/i, replace: "$1r" },
  { pattern: /(.{3,})le$/i, replace: "$1l" },
  { pattern: /([^aeiou])ed$/i, replace: "$1d" },
  { pattern: /([^s])es$/i, replace: "$1ez" },
  { pattern: /([^aeiousxzh])s$/i, replace: "$1z" },
  { pattern: /qu/gi, replace: "kw" },
  { pattern: /ph/gi, replace: "f" },
  { pattern: /ck/gi, replace: "k" },
  { pattern: /^wh/i, replace: "w" },
  { pattern: /^wr/i, replace: "r" },
  { pattern: /^kn/i, replace: "n" },
  { pattern: /ea/gi, replace: "ee" },
  { pattern: /ou/gi, replace: "ow" },
];

// ===========================================
// CORE FUNCTIONS
// ===========================================
function preserveCase(original: string, transformed: string): string {
  if (!transformed || !original) {
    return transformed;
  }
  if (original === original.toUpperCase() && original.length > 1) {
    return transformed.toUpperCase();
  }
  if (original[0] === original[0].toUpperCase()) {
    return transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }
  return transformed;
}

export function getDerpyWord(word: string): string {
  if (word.length <= 2) {
    return word;
  }
  if (word === word.toUpperCase() && word.length >= 2) {
    return word;
  }

  const lower = word.toLowerCase();
  if (skipWords.has(lower)) {
    return word;
  }

  const dictSub = wordSubstitutions[lower];
  if (dictSub) {
    return preserveCase(word, dictSub);
  }

  let transformed = lower;
  let wasTransformed = false;

  for (const rule of transformRules) {
    if (rule.pattern.test(transformed)) {
      const newTransformed = transformed.replace(rule.pattern, rule.replace);
      if (newTransformed !== transformed) {
        transformed = newTransformed;
        wasTransformed = true;
        if (transformed.length < 2) {
          break;
        }
      }
    }
  }

  if (wasTransformed) {
    return preserveCase(word, transformed);
  }

  return word;
}

export function derpify(text: string): string {
  return text.replace(/\b[\w']+\b/g, (word) => getDerpyWord(word));
}

export function getSubstitutionCount(): number {
  return Object.keys(wordSubstitutions).length;
}

export function getRuleCount(): number {
  return transformRules.length;
}
