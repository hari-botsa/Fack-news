import { PredictionResult } from '../types';

export const INITIAL_SEED_HISTORY: PredictionResult[] = [
  {
    id: 'seed-01',
    timestamp: '2026-09-30T10:45:00.000Z',
    title: 'U.S. Secretary of State John F. Kerry said Wednesday direct talks remain vital...',
    text: 'U.S. Secretary of State John F. Kerry said Wednesday that direct negotiations between Israeli and Palestinian authorities represent the only viable path to durable Middle East peace, speaking at a scheduled diplomatic conference in Geneva with European counterparts.',
    source: 'reuters.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.08,
    confidence: 0.92,
    score: 0.99,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.08, confidence: 0.92, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.10, confidence: 0.90, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.12, confidence: 0.88, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.05, confidence: 0.95, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 3.2,
      exclamationDensity: 0.0,
      clickbaitScore: 4,
      emotionalIntensity: 12,
      readabilityGrade: 11.4,
      subjectivityScore: 18,
      attributionDensity: 4.8,
      lexicalDiversity: 0.68,
      wordCount: 38,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'secretary', weight: -1.8, frequency: 1, tfidf: 0.22, category: 'attribution' },
      { word: 'negotiations', weight: -1.6, frequency: 1, tfidf: 0.19, category: 'objective' },
      { word: 'authorities', weight: -1.4, frequency: 1, tfidf: 0.18, category: 'objective' }
    ],
    latencyMs: 1.1
  },
  {
    id: 'seed-02',
    timestamp: '2026-09-30T10:41:00.000Z',
    title: 'The Government of India has officially announced secret nationwide banking shutdown...',
    text: 'The Government of India has officially announced a total nationwide banking shutdown for the entire upcoming month of November due to secret currency reforms and demonetization trials.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.88,
    confidence: 0.88,
    score: 0.76,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.85, confidence: 0.85, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.82, confidence: 0.82, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 7.8,
      exclamationDensity: 0.0,
      clickbaitScore: 68,
      emotionalIntensity: 58,
      readabilityGrade: 12.1,
      subjectivityScore: 65,
      attributionDensity: 0.0,
      lexicalDiversity: 0.72,
      wordCount: 26,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'secret', weight: 2.1, frequency: 1, tfidf: 0.28, category: 'clickbait' },
      { word: 'shutdown', weight: 1.8, frequency: 1, tfidf: 0.24, category: 'sensational' }
    ],
    latencyMs: 0.9
  },
  {
    id: 'seed-03',
    timestamp: '2026-09-30T10:35:00.000Z',
    title: 'It is primary day in New York and front-runners making final campaign push...',
    text: 'It is primary day in New York and front-runner candidates are making their final push in upstate districts ahead of tonight\'s poll closings across municipal centers.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.12,
    confidence: 0.88,
    score: 1.04,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.12, confidence: 0.88, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.15, confidence: 0.85, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.16, confidence: 0.84, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.09, confidence: 0.91, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 4.1,
      exclamationDensity: 0.0,
      clickbaitScore: 8,
      emotionalIntensity: 15,
      readabilityGrade: 9.8,
      subjectivityScore: 22,
      attributionDensity: 3.2,
      lexicalDiversity: 0.70,
      wordCount: 25,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'primary', weight: -1.2, frequency: 1, tfidf: 0.21, category: 'objective' },
      { word: 'candidates', weight: -1.3, frequency: 1, tfidf: 0.20, category: 'objective' }
    ],
    latencyMs: 1.0
  },
  {
    id: 'seed-04',
    timestamp: '2026-09-30T10:28:00.000Z',
    title: 'oct 2 2026 is holiday in ap',
    text: 'oct 2 2026 is holiday in ap - Unverified viral message claiming emergency government holiday declaration in Andhra Pradesh without official gazette release.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.91,
    confidence: 0.91,
    score: 1.37,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.89, confidence: 0.89, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.86, confidence: 0.86, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 5.4,
      exclamationDensity: 0.0,
      clickbaitScore: 54,
      emotionalIntensity: 42,
      readabilityGrade: 6.2,
      subjectivityScore: 68,
      attributionDensity: 0.0,
      lexicalDiversity: 0.88,
      wordCount: 19,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'unverified', weight: 2.2, frequency: 1, tfidf: 0.31, category: 'clickbait' },
      { word: 'viral', weight: 1.8, frequency: 1, tfidf: 0.29, category: 'clickbait' }
    ],
    latencyMs: 0.8
  },
  {
    id: 'seed-05',
    timestamp: '2026-09-30T10:20:00.000Z',
    title: 'tomorrow is not a holiday in ap',
    text: 'tomorrow is not a holiday in ap - WhatsApp forward claiming sudden school and college cancellation retracted by state education board.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.86,
    confidence: 0.86,
    score: 0.82,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.86, confidence: 0.86, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.84, confidence: 0.84, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.81, confidence: 0.81, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 4.8,
      exclamationDensity: 0.0,
      clickbaitScore: 60,
      emotionalIntensity: 45,
      readabilityGrade: 7.1,
      subjectivityScore: 66,
      attributionDensity: 0.0,
      lexicalDiversity: 0.85,
      wordCount: 18,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'forward', weight: 1.9, frequency: 1, tfidf: 0.28, category: 'clickbait' },
      { word: 'cancellation', weight: 1.7, frequency: 1, tfidf: 0.26, category: 'sensational' }
    ],
    latencyMs: 0.8
  },
  {
    id: 'seed-06',
    timestamp: '2026-09-30T09:15:00.000Z',
    title: 'European Central Bank maintains benchmark deposit facility rate...',
    text: 'The European Central Bank maintained its benchmark deposit rate at 3.50% following its monthly governing council meeting in Frankfurt.',
    source: 'reuters.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.06,
    confidence: 0.94,
    score: 1.12,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.06, confidence: 0.94, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.08, confidence: 0.92, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.10, confidence: 0.90, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.04, confidence: 0.96, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 5.1,
      exclamationDensity: 0.0,
      clickbaitScore: 2,
      emotionalIntensity: 10,
      readabilityGrade: 12.4,
      subjectivityScore: 16,
      attributionDensity: 5.2,
      lexicalDiversity: 0.76,
      wordCount: 20,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'central bank', weight: -2.1, frequency: 1, tfidf: 0.32, category: 'objective' },
      { word: 'governing', weight: -1.7, frequency: 1, tfidf: 0.27, category: 'objective' }
    ],
    latencyMs: 1.1
  },
  {
    id: 'seed-07',
    timestamp: '2026-09-30T08:50:00.000Z',
    title: 'Secret leaked documents reveal United Nations deploying covert digital currency mandates...',
    text: 'Unchecked social media broadcast claiming international bodies plan to abolish cash reserves in favor of biometric currency controls by mid-October.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.94,
    confidence: 0.94,
    score: 1.24,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.96, confidence: 0.96, algorithm: 'Margin' }
    },
    linguisticFeatures: {
      uppercaseRatio: 6.8,
      exclamationDensity: 0.0,
      clickbaitScore: 78,
      emotionalIntensity: 64,
      readabilityGrade: 13.0,
      subjectivityScore: 72,
      attributionDensity: 0.0,
      lexicalDiversity: 0.78,
      wordCount: 21,
      sentenceCount: 1
    },
    topTokens: [
      { word: 'secret', weight: 2.3, frequency: 1, tfidf: 0.30, category: 'clickbait' },
      { word: 'leaked', weight: 2.0, frequency: 1, tfidf: 0.28, category: 'clickbait' }
    ],
    latencyMs: 0.9
  },

  // 2026-09-29: 1 Fake
  {
    id: 'seed-08',
    timestamp: '2026-09-29T14:20:00.000Z',
    title: 'Emergency decree secretly signed to freeze retirement savings nationwide',
    text: 'Clickbait blog post alleging secret presidential executive order sequestering public pension funds without legislative authorization.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.90,
    confidence: 0.90,
    score: 0.88,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.85, confidence: 0.85, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 5.0, exclamationDensity: 0, clickbaitScore: 72, emotionalIntensity: 60, readabilityGrade: 11, subjectivityScore: 70, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 18, sentenceCount: 1 },
    topTokens: [{ word: 'secretly', weight: 2.1, frequency: 1, tfidf: 0.3, category: 'clickbait' }],
    latencyMs: 1.0
  },

  // 2026-09-26: 2 Fake
  {
    id: 'seed-09',
    timestamp: '2026-09-26T16:10:00.000Z',
    title: 'Miracle dandelion root compound cures terminal disease in 48 hours',
    text: 'Sensational health claim asserting pharmaceutical companies suppressed a 100 percent natural cure found in common weeds.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.95,
    confidence: 0.95,
    score: 1.15,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.97, confidence: 0.97, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 6.2, exclamationDensity: 1.5, clickbaitScore: 84, emotionalIntensity: 74, readabilityGrade: 9.5, subjectivityScore: 82, attributionDensity: 0, lexicalDiversity: 0.82, wordCount: 19, sentenceCount: 1 },
    topTokens: [{ word: 'miracle', weight: 2.8, frequency: 1, tfidf: 0.35, category: 'clickbait' }],
    latencyMs: 1.1
  },
  {
    id: 'seed-10',
    timestamp: '2026-09-26T11:45:00.000Z',
    title: 'Secret military frequency lasers deployed to manipulate meteorological rainfall',
    text: 'Fabricated weather manipulation conspiracy asserting high frequency antennae are heating the ionosphere to induce flash flooding.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.96,
    confidence: 0.96,
    score: 1.41,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.96, confidence: 0.96, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.93, confidence: 0.93, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.98, confidence: 0.98, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 5.8, exclamationDensity: 0.8, clickbaitScore: 79, emotionalIntensity: 68, readabilityGrade: 12.2, subjectivityScore: 78, attributionDensity: 0, lexicalDiversity: 0.84, wordCount: 18, sentenceCount: 1 },
    topTokens: [{ word: 'lasers', weight: 2.5, frequency: 1, tfidf: 0.32, category: 'clickbait' }],
    latencyMs: 0.9
  },

  // 2026-09-07: 2 Fake
  {
    id: 'seed-11',
    timestamp: '2026-09-07T15:30:00.000Z',
    title: 'Emergency nationwide cash withdrawal limits announced starting midnight',
    text: 'Unattributed WhatsApp rumor claiming automated teller machines will restrict withdrawals to 100 dollars per customer.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.92,
    confidence: 0.92,
    score: 1.05,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 4.9, exclamationDensity: 0.0, clickbaitScore: 70, emotionalIntensity: 62, readabilityGrade: 10.4, subjectivityScore: 69, attributionDensity: 0, lexicalDiversity: 0.81, wordCount: 17, sentenceCount: 1 },
    topTokens: [{ word: 'emergency', weight: 2.0, frequency: 1, tfidf: 0.28, category: 'sensational' }],
    latencyMs: 1.0
  },
  {
    id: 'seed-12',
    timestamp: '2026-09-07T09:10:00.000Z',
    title: 'Globalist consortium secretly votes to eliminate physical sovereign passports',
    text: 'Conspiracy blog asserting United Nations members agreed to mandate subcutaneous microchip implants for international transit.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.93,
    confidence: 0.93,
    score: 0.94,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'FAKE', probabilityFake: 0.93, confidence: 0.93, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'FAKE', probabilityFake: 0.89, confidence: 0.89, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 5.5, exclamationDensity: 0.0, clickbaitScore: 74, emotionalIntensity: 65, readabilityGrade: 11.8, subjectivityScore: 74, attributionDensity: 0, lexicalDiversity: 0.83, wordCount: 17, sentenceCount: 1 },
    topTokens: [{ word: 'globalist', weight: 2.6, frequency: 1, tfidf: 0.33, category: 'clickbait' }],
    latencyMs: 1.0
  },

  // 2026-09-05: 8 Fake, 4 Real (Total 12)
  // 4 Real with High Credibility Sources:
  {
    id: 'seed-13',
    timestamp: '2026-09-05T17:40:00.000Z',
    title: 'NASA confirms detection of water vapor in atmosphere of habitable-zone exoplanet',
    text: 'According to a study published in The Astrophysical Journal, spectroscopic data from the James Webb Space Telescope confirms water vapor absorption bands.',
    source: 'reuters.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.05,
    confidence: 0.95,
    score: 1.18,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.05, confidence: 0.95, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.06, confidence: 0.94, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.08, confidence: 0.92, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.04, confidence: 0.96, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 4.8, exclamationDensity: 0.0, clickbaitScore: 3, emotionalIntensity: 8, readabilityGrade: 12.8, subjectivityScore: 14, attributionDensity: 5.8, lexicalDiversity: 0.74, wordCount: 22, sentenceCount: 1 },
    topTokens: [{ word: 'published', weight: -2.2, frequency: 1, tfidf: 0.3, category: 'objective' }],
    latencyMs: 1.2
  },
  {
    id: 'seed-14',
    timestamp: '2026-09-05T16:15:00.000Z',
    title: 'Senate committee approves comprehensive bipartisan cyber defense legislation',
    text: 'In a 14-3 vote, the Senate Intelligence Committee advanced cybersecurity standards for critical infrastructure operators.',
    source: 'reuters.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.08,
    confidence: 0.92,
    score: 1.06,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.08, confidence: 0.92, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.09, confidence: 0.91, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.11, confidence: 0.89, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.06, confidence: 0.94, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 5.2, exclamationDensity: 0.0, clickbaitScore: 4, emotionalIntensity: 11, readabilityGrade: 11.5, subjectivityScore: 19, attributionDensity: 4.2, lexicalDiversity: 0.72, wordCount: 18, sentenceCount: 1 },
    topTokens: [{ word: 'committee', weight: -1.8, frequency: 1, tfidf: 0.28, category: 'objective' }],
    latencyMs: 1.0
  },
  {
    id: 'seed-15',
    timestamp: '2026-09-05T14:00:00.000Z',
    title: 'World Health Organization releases updated epidemiological surveillance guidelines',
    text: 'Health authorities across 45 nations confirmed adoption of synchronized pathogen monitoring frameworks to accelerate seasonal reporting.',
    source: 'apnews.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.07,
    confidence: 0.93,
    score: 1.09,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.07, confidence: 0.93, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.08, confidence: 0.92, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.10, confidence: 0.90, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.05, confidence: 0.95, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 4.9, exclamationDensity: 0.0, clickbaitScore: 2, emotionalIntensity: 9, readabilityGrade: 12.0, subjectivityScore: 15, attributionDensity: 4.9, lexicalDiversity: 0.75, wordCount: 17, sentenceCount: 1 },
    topTokens: [{ word: 'authorities', weight: -1.9, frequency: 1, tfidf: 0.29, category: 'objective' }],
    latencyMs: 1.1
  },
  {
    id: 'seed-16',
    timestamp: '2026-09-05T12:20:00.000Z',
    title: 'UK Meteorological Office confirms third consecutive month of normal rainfall distribution',
    text: 'Meteorological records collected from regional radar stations show precipitation levels matching 30-year climate averages.',
    source: 'bbc.com',
    selectedModel: 'ensemble',
    finalLabel: 'REAL',
    probabilityFake: 0.06,
    confidence: 0.94,
    score: 1.14,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: {
      ensemble: { modelKey: 'ensemble', modelName: 'Ensemble Meta-Classifier', label: 'REAL', probabilityFake: 0.06, confidence: 0.94, algorithm: 'Soft Voting' },
      logistic_regression: { modelKey: 'logistic_regression', modelName: 'Logistic Regression', label: 'REAL', probabilityFake: 0.07, confidence: 0.93, algorithm: 'L2 Logit' },
      naive_bayes: { modelKey: 'naive_bayes', modelName: 'Naive Bayes', label: 'REAL', probabilityFake: 0.09, confidence: 0.91, algorithm: 'Multinomial' },
      passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC / Passive-Aggressive', label: 'REAL', probabilityFake: 0.04, confidence: 0.96, algorithm: 'Margin' }
    },
    linguisticFeatures: { uppercaseRatio: 4.6, exclamationDensity: 0.0, clickbaitScore: 3, emotionalIntensity: 10, readabilityGrade: 11.2, subjectivityScore: 16, attributionDensity: 4.5, lexicalDiversity: 0.73, wordCount: 16, sentenceCount: 1 },
    topTokens: [{ word: 'records', weight: -1.7, frequency: 1, tfidf: 0.26, category: 'objective' }],
    latencyMs: 1.0
  },

  // 8 Fake on 2026-09-05 (All with source N/A):
  {
    id: 'seed-17',
    timestamp: '2026-09-05T11:00:00.000Z',
    title: 'Secret atmospheric aerosol planes photographed spraying heavy metals over cities',
    text: 'Sensational aviation conspiracy claiming commercial airlines secretly carry liquid barium canisters.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.92,
    confidence: 0.92,
    score: 1.08,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 5, exclamationDensity: 0, clickbaitScore: 76, emotionalIntensity: 65, readabilityGrade: 10, subjectivityScore: 72, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 14, sentenceCount: 1 },
    topTokens: [{ word: 'secret', weight: 2.2, frequency: 1, tfidf: 0.3, category: 'clickbait' }],
    latencyMs: 0.9
  },
  {
    id: 'seed-18',
    timestamp: '2026-09-05T10:15:00.000Z',
    title: 'Underground bunker network secretly completed beneath Denver Airport for elites',
    text: 'Conspiracy post alleging a subterranean city designed for politicians during global reset.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.91,
    confidence: 0.91,
    score: 0.98,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.89, confidence: 0.89, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.87, confidence: 0.87, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.93, confidence: 0.93, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 6, exclamationDensity: 0, clickbaitScore: 74, emotionalIntensity: 60, readabilityGrade: 10, subjectivityScore: 70, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 15, sentenceCount: 1 },
    topTokens: [{ word: 'bunker', weight: 2.0, frequency: 1, tfidf: 0.28, category: 'clickbait' }],
    latencyMs: 0.9
  },
  {
    id: 'seed-19',
    timestamp: '2026-09-05T09:30:00.000Z',
    title: 'Viral audio clip proves voting machines altered election ballots in swing county',
    text: 'Doctored audio recording circulated on social networks claiming automated voting machines reversed vote tallies.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.94,
    confidence: 0.94,
    score: 1.22,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.96, confidence: 0.96, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 5, exclamationDensity: 0, clickbaitScore: 82, emotionalIntensity: 70, readabilityGrade: 11, subjectivityScore: 75, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 16, sentenceCount: 1 },
    topTokens: [{ word: 'doctored', weight: 2.3, frequency: 1, tfidf: 0.32, category: 'clickbait' }],
    latencyMs: 1.0
  },
  {
    id: 'seed-20',
    timestamp: '2026-09-05T08:45:00.000Z',
    title: 'Scientists invent water-powered car engine but inventor mysteriously disappears',
    text: 'Ancient urban legend alleging oil companies purchased patent rights and detained the engineer.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.93,
    confidence: 0.93,
    score: 1.16,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.93, confidence: 0.93, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.89, confidence: 0.89, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 4.8, exclamationDensity: 0, clickbaitScore: 78, emotionalIntensity: 64, readabilityGrade: 10.5, subjectivityScore: 72, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 15, sentenceCount: 1 },
    topTokens: [{ word: 'mysteriously', weight: 2.1, frequency: 1, tfidf: 0.29, category: 'clickbait' }],
    latencyMs: 0.9
  },
  {
    id: 'seed-21',
    timestamp: '2026-09-05T08:00:00.000Z',
    title: 'Secret microwave towers beam artificial insomnia pulses to test compliance',
    text: 'Fringe blog claiming municipal communication poles emit high-frequency frequencies that prevent sleep.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.95,
    confidence: 0.95,
    score: 1.30,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.91, confidence: 0.91, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.97, confidence: 0.97, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 5.2, exclamationDensity: 0, clickbaitScore: 80, emotionalIntensity: 68, readabilityGrade: 11, subjectivityScore: 76, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 14, sentenceCount: 1 },
    topTokens: [{ word: 'pulses', weight: 2.2, frequency: 1, tfidf: 0.3, category: 'clickbait' }],
    latencyMs: 0.9
  },
  {
    id: 'seed-22',
    timestamp: '2026-09-05T07:20:00.000Z',
    title: 'Supreme Court justices secretly detained in offshore military installation',
    text: 'Extreme disinformation narrative alleging martial law takeover of highest court.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.96,
    confidence: 0.96,
    score: 1.45,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.96, confidence: 0.96, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.95, confidence: 0.95, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.93, confidence: 0.93, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.98, confidence: 0.98, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 6.1, exclamationDensity: 0, clickbaitScore: 88, emotionalIntensity: 78, readabilityGrade: 12, subjectivityScore: 84, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 12, sentenceCount: 1 },
    topTokens: [{ word: 'detained', weight: 2.6, frequency: 1, tfidf: 0.34, category: 'sensational' }],
    latencyMs: 0.8
  },
  {
    id: 'seed-23',
    timestamp: '2026-09-05T06:40:00.000Z',
    title: 'Banned ancient plant eliminates all cardiovascular ailments permanently',
    text: 'Clickbait commercial page selling unverified herbal mixture claiming total blockage reversal.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.92,
    confidence: 0.92,
    score: 1.10,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.94, confidence: 0.94, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 4.8, exclamationDensity: 0, clickbaitScore: 82, emotionalIntensity: 66, readabilityGrade: 10.8, subjectivityScore: 75, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 13, sentenceCount: 1 },
    topTokens: [{ word: 'banned', weight: 2.4, frequency: 1, tfidf: 0.31, category: 'clickbait' }],
    latencyMs: 0.8
  },
  {
    id: 'seed-24',
    timestamp: '2026-09-05T06:00:00.000Z',
    title: 'Secret backdoor algorithm installed in all smart electric vehicle batteries',
    text: 'Unfounded rumor claiming vehicle manufacturers can remotely discharge battery cells on command.',
    source: 'N/A',
    selectedModel: 'ensemble',
    finalLabel: 'FAKE',
    probabilityFake: 0.90,
    confidence: 0.90,
    score: 0.95,
    consensusScore: '3 of 3 ML algorithms agree',
    individualModels: { ensemble: { modelKey: 'ensemble', modelName: 'Ensemble', label: 'FAKE', probabilityFake: 0.90, confidence: 0.90, algorithm: 'Soft Voting' }, logistic_regression: { modelKey: 'logistic_regression', modelName: 'LR', label: 'FAKE', probabilityFake: 0.88, confidence: 0.88, algorithm: 'L2' }, naive_bayes: { modelKey: 'naive_bayes', modelName: 'NB', label: 'FAKE', probabilityFake: 0.86, confidence: 0.86, algorithm: 'NB' }, passive_aggressive: { modelKey: 'passive_aggressive', modelName: 'LinearSVC', label: 'FAKE', probabilityFake: 0.92, confidence: 0.92, algorithm: 'SVC' } },
    linguisticFeatures: { uppercaseRatio: 5.0, exclamationDensity: 0, clickbaitScore: 74, emotionalIntensity: 58, readabilityGrade: 11.2, subjectivityScore: 68, attributionDensity: 0, lexicalDiversity: 0.8, wordCount: 14, sentenceCount: 1 },
    topTokens: [{ word: 'backdoor', weight: 2.1, frequency: 1, tfidf: 0.28, category: 'clickbait' }],
    latencyMs: 0.8
  }
];
