import React, { useState } from 'react';
import { 
  PlayCircle, 
  Sparkles, 
  Cpu, 
  Database, 
  Gauge, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Zap,
  BookOpen
} from 'lucide-react';
import { BenchmarkArticle, ModelType, PredictionResult } from '../types';
import { BENCHMARK_ARTICLES } from '../data/benchmarkData';
import { runLocalMLInference } from '../ml/models';

interface ClassifierViewProps {
  onOpenPredictorModal: (article?: BenchmarkArticle) => void;
  onNavigateToDataset: () => void;
  onNavigateToBenchmarks: () => void;
}

export const ClassifierView: React.FC<ClassifierViewProps> = ({
  onOpenPredictorModal,
  onNavigateToDataset,
  onNavigateToBenchmarks,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [quickResult, setQuickResult] = useState<PredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickPredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const res = runLocalMLInference(quickInput, quickInput, undefined, undefined, 'ensemble');
      setQuickResult(res);
      setIsProcessing(false);
    }, 120);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
            <span>Machine Learning Classification</span>
            <span aria-hidden="true">·</span>
            <span>TF-IDF Vectorization</span>
            <span aria-hidden="true">·</span>
            <span>Explainable AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
            Automated Fake News Detection &amp; Credibility Intelligence
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            A production-ready NLP system engineered with Scikit-Learn algorithms (Logistic Regression, 
            Multinomial Naive Bayes, Passive-Aggressive margin classifier) coupled with deep fact-checking 
            and token-level explainability.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenPredictorModal()}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Launch Full Prediction Modal</span>
            </button>

            <button
              onClick={onNavigateToBenchmarks}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <BarChart3 className="h-4 w-4 text-slate-500" />
              <span>Explore Benchmark Metrics</span>
            </button>
          </div>
        </div>

        {/* Metric Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">Ensemble Accuracy</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 tabular-nums mt-0.5">
              94.6%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Test F1: 0.945</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Inference Latency</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
              &lt; 2.0ms
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Sub-linear vectorization</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Training Corpus</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
              20,800+
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Kaggle &amp; WELFake data</div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium">Feature Space</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
              15,000
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Unigrams &amp; Bigrams</div>
          </div>
        </div>
      </section>

      {/* Live Quick Scanner Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live News Headline Scanner</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant classification using TF-IDF n-gram vectorizer and Ensemble soft voting.
            </p>
          </div>
          <button
            onClick={() => onOpenPredictorModal()}
            className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 font-semibold"
          >
            <span>Need full body text &amp; AI verification? Open Modal</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <form onSubmit={handleQuickPredict} className="flex gap-2">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Paste any headline: e.g., 'Scientists confirm water vapor signatures on exoplanet' or 'SHOCKING secret miracle cure suppressed by Big Pharma'..."
            className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="submit"
            disabled={isProcessing || !quickInput.trim()}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Classify</span>
          </button>
        </form>

        {/* Quick Result Preview */}
        {quickResult && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${
                  quickResult.finalLabel === 'REAL' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}>
                  {quickResult.finalLabel === 'REAL' ? <ShieldCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${quickResult.finalLabel === 'REAL' ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {quickResult.finalLabel === 'REAL' ? 'AUTHENTIC / OBJECTIVE' : 'SUSPICIOUS / CLICKBAIT'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono tabular-nums">
                      ({(quickResult.confidence * 100).toFixed(1)}% Confidence)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Clickbait Index: <span className="text-slate-800 font-mono font-medium">{quickResult.linguisticFeatures.clickbaitScore}/100</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    Attribution: <span className="text-slate-800 font-mono font-medium">{quickResult.linguisticFeatures.attributionDensity}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenPredictorModal({
                  id: 'quick',
                  title: quickInput,
                  text: quickInput,
                  source: 'User Input',
                  category: 'Politics',
                  groundTruth: quickResult.finalLabel,
                  date: 'Just now',
                  summary: 'User tested headline.'
                })}
                className="text-xs rounded border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto font-medium"
              >
                <span>View Full Model Explanations</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Benchmark Articles Quick Inspection Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Curated Verification Corpus</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any benchmark article to inspect how the ML models evaluate ground truth signals.
            </p>
          </div>

          <button
            onClick={onNavigateToDataset}
            className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 font-semibold"
          >
            <span>View Full Dataset</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENCHMARK_ARTICLES.slice(0, 4).map((art) => (
            <div
              key={art.id}
              onClick={() => onOpenPredictorModal(art)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.source}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`font-semibold ${art.groundTruth === 'REAL' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Truth: {art.groundTruth}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Date: {art.date}</span>
                <span className="text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Load into Modal</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Model Capabilities & Pipeline Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Cpu className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Three Distinct ML Classifiers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evaluates text across Logistic Regression (log-odds), Multinomial Naive Bayes (Laplace smoothed likelihood), and Passive-Aggressive (hinge margin update).
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Explainable AI (XAI) Tokens</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Transparently highlights which terms and phrases pushed the prediction toward fake or authentic journalism, eliminating black-box opacity.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <Database className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Exportable Academic Project</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download runnable Python Jupyter Notebooks (<code className="font-mono text-amber-700 font-semibold">.ipynb</code>) with Scikit-learn training code and IEEE-style documentation report.
          </p>
        </div>
      </section>
    </div>
  );
};
