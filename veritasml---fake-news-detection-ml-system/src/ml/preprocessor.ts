import { LinguisticFeatures, TokenWeight } from '../types';

export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can\'t', 'cannot', 'could', 'couldn\'t',
  'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each',
  'few', 'for', 'from', 'further',
  'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here',
  'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself',
  'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
  'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such',
  'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these',
  'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up',
  'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would',
  'wouldn\'t',
  'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

export const CLICKBAIT_TRIGGERS = [
  'shocking', 'unbelievable', 'you won\'t believe', 'miracle cure', 'banned by',
  'secret', 'conspiracy', 'bombshell', 'illuminati', 'mind blowing',
  'wake up', 'sheeple', 'hidden truth', 'they don\'t want you to know', 'mainstream media won\'t tell',
  '100% verified', 'share before deleted', 'censored', 'explosive leak', 'scandalous',
  'cover-up', 'deep state', 'big pharma', 'guaranteed cure', 'doctored', 'exposed'
];

export const ATTRIBUTION_MARKERS = [
  'according to', 'reuters', 'associated press', 'official stated', 'spokesperson said',
  'published in the journal', 'peer-reviewed', 'department of', 'ministry of',
  'confirmed by', 'cited by', 'data indicates', 'investigation revealed', 'spokesman for',
  'court filings', 'press release', 'documented by', 'university researchers', 'statistical evidence',
  'spokeswoman'
];

export const SENSATIONAL_WORDS = new Set([
  'horrifying', 'insane', 'apocalyptic', 'catastrophic', 'treasonous', 'disastrous',
  'evil', 'corrupt', 'bloodbath', 'annihilation', 'monstrous', 'unforgivable',
  'tyrant', 'destruction', 'panic', 'chaos', 'hysteria', 'nightmare'
]);

export const OBJECTIVE_JOURNALISTIC_WORDS = new Set([
  'stated', 'reported', 'indicated', 'announced', 'confirmed', 'released',
  'analysts', 'representatives', 'officials', 'documented', 'proceedings',
  'spokesperson', 'regulators', 'consensus', 'preliminary', 'investigation',
  'quarterly', 'testified', 'recorded', 'published', 'amendment', 'accordance'
]);

/**
 * Tokenizes text into normalized unigrams and bigrams
 */
export function tokenizeText(text: string): { words: string[]; ngrams: string[] } {
  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const rawWords = clean.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
  
  const ngrams: string[] = [...rawWords];
  for (let i = 0; i < rawWords.length - 1; i++) {
    ngrams.push(`${rawWords[i]} ${rawWords[i + 1]}`);
  }
  
  return { words: rawWords, ngrams };
}

/**
 * Extracts comprehensive stylometric and linguistic features
 */
export function extractLinguisticFeatures(title: string, body: string): LinguisticFeatures {
  const combined = `${title} \n ${body}`;
  const totalChars = combined.length || 1;
  const uppercaseLetters = (combined.match(/[A-Z]/g) || []).length;
  const exclamationCount = (combined.match(/!/g) || []).length;
  const questionCount = (combined.match(/\?/g) || []).length;
  
  const rawWords = combined.split(/\s+/).filter(Boolean);
  const wordCount = Math.max(rawWords.length, 1);
  const sentenceArray = combined.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(sentenceArray.length, 1);
  
  // Lexical Diversity: Type-Token Ratio
  const uniqueWords = new Set(rawWords.map(w => w.toLowerCase()));
  const lexicalDiversity = Number((uniqueWords.size / wordCount).toFixed(3));
  
  // Uppercase ratio (% of total alphabetic characters that are capitalized)
  const alphaChars = (combined.match(/[a-zA-Z]/g) || []).length || 1;
  const uppercaseRatio = Number(((uppercaseLetters / alphaChars) * 100).toFixed(1));
  
  // Exclamation density per 100 words
  const exclamationDensity = Number(((exclamationCount / wordCount) * 100).toFixed(2));
  
  // Clickbait triggers count
  const lower = combined.toLowerCase();
  let clickbaitMatches = 0;
  for (const trigger of CLICKBAIT_TRIGGERS) {
    if (lower.includes(trigger)) {
      clickbaitMatches += 1;
    }
  }
  // Title all caps or excessive capitalization boosts clickbait score
  const titleWords = title.split(/\s+/).filter(Boolean);
  const titleUpperWords = titleWords.filter(w => w.length > 2 && w === w.toUpperCase()).length;
  const titleCapsRatio = titleWords.length ? titleUpperWords / titleWords.length : 0;
  
  const rawClickbait = (clickbaitMatches * 18) + (titleCapsRatio * 40) + (exclamationDensity * 8);
  const clickbaitScore = Math.min(Math.round(rawClickbait), 100);
  
  // Sensational & Emotional intensity
  let sensationalMatches = 0;
  for (const word of rawWords) {
    if (SENSATIONAL_WORDS.has(word.toLowerCase())) {
      sensationalMatches++;
    }
  }
  const rawEmotional = (sensationalMatches / wordCount) * 450 + (exclamationCount * 4) + (questionCount * 3);
  const emotionalIntensity = Math.min(Math.max(Math.round(rawEmotional), 8), 100);
  
  // Attribution density (references to verified sources, direct quotes)
  let attributionMatches = 0;
  for (const marker of ATTRIBUTION_MARKERS) {
    if (lower.includes(marker)) {
      attributionMatches++;
    }
  }
  // Quotes count
  const quotesCount = (combined.match(/["“][^"”]+["”]/g) || []).length;
  const attributionDensity = Number((((attributionMatches * 2 + quotesCount) / wordCount) * 100).toFixed(2));
  
  // Readability: Flesch-Kincaid Grade Level approximation
  // FKGL = 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
  const avgSentenceLength = wordCount / sentenceCount;
  // Estimate syllables (~ 1.3 per word average in English)
  const estimatedSyllablesPerWord = 1.35;
  const rawFKGL = 0.39 * avgSentenceLength + 11.8 * estimatedSyllablesPerWord - 15.59;
  const readabilityGrade = Number(Math.max(1, Math.min(18, rawFKGL)).toFixed(1));
  
  // Subjectivity Score (higher emotional/clickbait minus attribution)
  const rawSubjectivity = Math.round(50 + (emotionalIntensity * 0.4) + (clickbaitScore * 0.3) - (attributionDensity * 12));
  const subjectivityScore = Math.min(Math.max(rawSubjectivity, 5), 98);
  
  return {
    uppercaseRatio,
    exclamationDensity,
    clickbaitScore,
    emotionalIntensity,
    readabilityGrade,
    subjectivityScore,
    attributionDensity,
    lexicalDiversity,
    wordCount,
    sentenceCount
  };
}
