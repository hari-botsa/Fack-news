export type VeracityLabel = 'REAL' | 'FAKE';

export type ModelType = 
  | 'ensemble'
  | 'logistic_regression'
  | 'naive_bayes'
  | 'passive_aggressive'
  | 'deep_gemini';

export interface TokenWeight {
  word: string;
  weight: number; // positive = indicates FAKE/sensational, negative = indicates REAL/objective
  frequency: number;
  tfidf: number;
  category: 'sensational' | 'clickbait' | 'objective' | 'attribution' | 'neutral';
}

export interface LinguisticFeatures {
  uppercaseRatio: number; // % uppercase letters
  exclamationDensity: number; // exclamations per 100 words
  clickbaitScore: number; // 0 - 100
  emotionalIntensity: number; // 0 - 100
  readabilityGrade: number; // Flesch-Kincaid Grade Level
  subjectivityScore: number; // 0 - 100
  attributionDensity: number; // quotes and source references per 100 words
  lexicalDiversity: number; // Type-Token Ratio (0 - 1)
  wordCount: number;
  sentenceCount: number;
}

export interface IndividualModelPrediction {
  modelKey: ModelType;
  modelName: string;
  label: VeracityLabel;
  probabilityFake: number; // 0.0 - 1.0
  confidence: number; // 0.0 - 1.0
  algorithm: string;
}

export interface AIVerificationReport {
  verdict: 'REAL' | 'FAKE' | 'MISLEADING' | 'UNVERIFIED';
  confidence: number;
  summary: string;
  factualChecks: string[];
  linguisticSignals: {
    credibilityMarkers: string[];
    manipulationTechniques: string[];
  };
  recommendedAction: string;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  title: string;
  text?: string;
  source?: string;
  author?: string;
  selectedModel: ModelType;
  finalLabel: VeracityLabel;
  probabilityFake: number;
  confidence: number;
  score?: number;
  consensusScore: string; // e.g. "4 of 4 models agree"
  individualModels: Record<string, IndividualModelPrediction>;
  linguisticFeatures: LinguisticFeatures;
  topTokens: TokenWeight[];
  aiReport?: AIVerificationReport;
  latencyMs: number;
}

export interface BenchmarkArticle {
  id: string;
  title: string;
  text: string;
  source: string;
  category: 'Politics' | 'Health' | 'Technology' | 'Science' | 'World' | 'Finance';
  groundTruth: VeracityLabel;
  date: string;
  summary: string;
  keyFlagReasons?: string[];
}

export interface ConfusionMatrix {
  tp: number; // True Positives (Predicted Fake, Actually Fake)
  fp: number; // False Positives (Predicted Fake, Actually Real)
  tn: number; // True Negatives (Predicted Real, Actually Real)
  fn: number; // False Negatives (Predicted Real, Actually Fake)
}

export interface ModelBenchmarkMetrics {
  key: string;
  name: string;
  category: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  latency: string;
  confusionMatrix: ConfusionMatrix;
  pros: string[];
  cons: string[];
  mathFormula: string;
  hyperparameters: Record<string, string | number | boolean>;
}
