import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  BookOpen, 
  Copy, 
  Check, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { ModelType, PredictionResult, AIVerificationReport, BenchmarkArticle } from '../types';
import { runLocalMLInference } from '../ml/models';
import { BENCHMARK_ARTICLES } from '../data/benchmarkData';

interface PredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArticle?: BenchmarkArticle | null;
}

export const PredictorModal: React.FC<PredictorModalProps> = ({
  isOpen,
  onClose,
  initialArticle,
}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('ensemble');
  const [enableGemini, setEnableGemini] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync initial article if passed from Dataset Explorer
  useEffect(() => {
    if (initialArticle) {
      setTitle(initialArticle.title);
      setText(initialArticle.text);
      setSource(initialArticle.source);
      setResult(null);
    }
  }, [initialArticle]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRunInference = async () => {
    if (!title.trim() && !text.trim()) {
      setErrorMsg('Please enter a headline or article body to analyze.');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      // 1. Run local Machine Learning model pipeline
      const localResult = runLocalMLInference(
        title.trim(),
        text.trim(),
        source.trim() || undefined,
        undefined,
        selectedModel
      );

      // 2. If Gemini AI verification is enabled, call backend API
      if (enableGemini) {
        try {
          const res = await fetch('/api/verify-gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: title.trim(),
              text: text.trim(),
              source: source.trim(),
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.available && data.report) {
              localResult.aiReport = data.report as AIVerificationReport;
            }
          }
        } catch (apiErr) {
          console.warn('Backend Gemini API call fallback to local heuristics:', apiErr);
        }
      }

      setResult(localResult);
    } catch (err: any) {
      console.error('Inference error:', err);
      setErrorMsg(err?.message || 'Failed to complete classification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sample: BenchmarkArticle) => {
    setTitle(sample.title);
    setText(sample.text);
    setSource(sample.source);
    setResult(null);
    setErrorMsg(null);
  };

  const handleCopyReport = () => {
    if (!result) return;
    const reportText = `VERITAS ML FAKE NEWS CLASSIFICATION REPORT
Article Title: ${result.title}
Source: ${result.source || 'Unspecified'}
Predicted Verdict: ${result.finalLabel} (Confidence: ${(result.confidence * 100).toFixed(1)}%)
Consensus: ${result.consensusScore}
Clickbait Score: ${result.linguisticFeatures.clickbaitScore}/100
Emotional Intensity: ${result.linguisticFeatures.emotionalIntensity}/100
Attribution Density: ${result.linguisticFeatures.attributionDensity}%
${result.aiReport ? `\nDeep AI Summary: ${result.aiReport.summary}\nRecommended Action: ${result.aiReport.recommendedAction}` : ''}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setTitle('');
    setText('');
    setSource('');
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Interactive News Veracity Modal</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Multi-Model Classification</span>
                <span aria-hidden="true">·</span>
                <span>TF-IDF Vectorizer</span>
                <span aria-hidden="true">·</span>
                <span>Explainable AI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 transition-colors rounded hover:bg-slate-200/60"
              title="Clear input"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Quick Preload Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            <span className="text-xs font-semibold text-slate-600">Load Benchmark Sample:</span>
            {BENCHMARK_ARTICLES.slice(0, 4).map((art) => (
              <button
                key={art.id}
                onClick={() => handleLoadSample(art)}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 font-medium"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${art.groundTruth === 'REAL' ? 'bg-emerald-600' : 'bg-rose-500'}`} />
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{art.title}</span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">({art.groundTruth})</span>
              </button>
            ))}
          </div>

          {/* Input Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  News Headline / Claim
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. James Webb Space Telescope Detects Carbon-Bearing Molecules in Habitable-Zone Exoplanet..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Article Body / Full Text
                  </label>
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                    {text.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste the full news article paragraphs or claim text here..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Source / Publication (Optional)
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Reuters, NASA JPL, Blog"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Machine Learning Classifier
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                >
                  <option value="ensemble">Ensemble Blend (Soft Voting - 94.6% Acc)</option>
                  <option value="logistic_regression">Logistic Regression (L2 Sigmoid - 93.2%)</option>
                  <option value="passive_aggressive">Passive-Aggressive (Hinge Margin - 93.8%)</option>
                  <option value="naive_bayes">Multinomial Naive Bayes (Bayes - 91.5%)</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-500">
                  Ensemble combines calibrated probabilities across all three classifiers.
                </p>
              </div>

              {/* Gemini AI Verifier Toggle */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableGemini}
                    onChange={(e) => setEnableGemini(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                      <span>Deep AI Fact-Checking</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Cross-verifies claims with Gemini 3.8 Flash for manipulation analysis and factual grounding.
                    </p>
                  </div>
                </label>
              </div>

              {errorMsg && (
                <div className="rounded-md border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              {/* Primary Predict CTA */}
              <button
                onClick={handleRunInference}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Executing ML Pipeline...</span>
                  </>
                ) : (
                  <>
                    <span>Classify News Veracity</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RESULTS DISPLAY PANEL */}
          {result && (
            <div className="space-y-6 pt-4 border-t border-slate-200 animate-fadeIn">
              {/* Main Classification Verdict Banner */}
              <div 
                className={`rounded-xl border p-5 transition-all ${
                  result.finalLabel === 'REAL'
                    ? 'border-emerald-200 bg-emerald-50/70'
                    : 'border-rose-200 bg-rose-50/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg border ${
                      result.finalLabel === 'REAL'
                        ? 'border-emerald-200 bg-white text-emerald-700'
                        : 'border-rose-200 bg-white text-rose-700'
                    }`}>
                      {result.finalLabel === 'REAL' ? (
                        <ShieldCheck className="h-6 w-6" />
                      ) : (
                        <ShieldAlert className="h-6 w-6" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                          Classification Outcome
                        </span>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          Latency: {result.latencyMs}ms
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold tracking-tight mt-0.5 ${
                        result.finalLabel === 'REAL' ? 'text-emerald-800' : 'text-rose-800'
                      }`}>
                        {result.finalLabel === 'REAL' ? 'RELIABLE / AUTHENTIC NEWS' : 'SUSPICIOUS / FAKE NEWS'}
                      </h3>
                      <p className="text-xs text-slate-700 mt-1 max-w-xl">
                        {result.finalLabel === 'REAL'
                          ? 'Text exhibits characteristic markers of objective journalism: direct attribution, neutral sentiment, and verified contextual references.'
                          : 'High probability of fabricated, misleading, or emotionally manipulated reporting. Excessive clickbait triggers and lack of corroborating citations detected.'}
                      </p>
                    </div>
                  </div>

                  {/* Confidence & Action Box */}
                  <div className="sm:text-right shrink-0">
                    <div className="text-xs text-slate-500">Model Confidence</div>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                      {(result.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Consensus: <span className="text-slate-800 font-semibold">{result.consensusScore}</span>
                    </div>

                    <button
                      onClick={handleCopyReport}
                      className="mt-2.5 inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? 'Copied' : 'Copy Report'}</span>
                    </button>
                  </div>
                </div>

                {/* Probability Distribution Bar */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-xs text-slate-600 mb-1 font-mono tabular-nums">
                    <span>Authentic Prob: {((1 - result.probabilityFake) * 100).toFixed(1)}%</span>
                    <span>Fake Prob: {(result.probabilityFake * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex">
                    <div 
                      className="bg-emerald-600 transition-all duration-500" 
                      style={{ width: `${(1 - result.probabilityFake) * 100}%` }} 
                    />
                    <div 
                      className="bg-rose-500 transition-all duration-500" 
                      style={{ width: `${result.probabilityFake * 100}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Model Comparison Breakdown */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Individual Algorithm Verdicts &amp; Scores
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(result.individualModels).filter(([k]) => k !== 'ensemble').map(([key, item]) => (
                    <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                      <div className="text-xs font-medium text-slate-600">{item.modelName}</div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className={`text-sm font-bold ${item.label === 'REAL' ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-slate-600 tabular-nums">
                          {(item.confidence * 100).toFixed(1)}% conf
                        </span>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-500 truncate" title={item.algorithm}>
                        {item.algorithm}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainable AI (XAI) Feature Importance */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Explainable AI (XAI) Token Contributions
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Words identified by TF-IDF weighting that exerted highest directional pull on classification.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-rose-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Pushes Fake
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" /> Pushes Real
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {result.topTokens.length > 0 ? (
                    result.topTokens.map((tok, idx) => {
                      const isFakePull = tok.weight > 0;
                      return (
                        <div
                          key={idx}
                          className={`rounded px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 border ${
                            isFakePull
                              ? 'bg-rose-50 border-rose-200 text-rose-800'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          }`}
                        >
                          <span className="font-sans font-semibold">{tok.word}</span>
                          <span className="text-[10px] opacity-75 tabular-nums">
                            {tok.weight > 0 ? `+${tok.weight}` : tok.weight}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-slate-500 py-2">
                      No high-weight signature tokens detected in short input.
                    </div>
                  )}
                </div>
              </div>

              {/* Linguistic & Stylometric Diagnostics */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Linguistic &amp; Stylometric Diagnostics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500 font-medium">Clickbait Index</div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                      {result.linguisticFeatures.clickbaitScore}
                      <span className="text-xs text-slate-400 font-sans font-normal"> / 100</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {result.linguisticFeatures.clickbaitScore > 50 ? 'High sensationalism' : 'Normal headline'}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500 font-medium">Emotional Valence</div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                      {result.linguisticFeatures.emotionalIntensity}
                      <span className="text-xs text-slate-400 font-sans font-normal"> / 100</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {result.linguisticFeatures.emotionalIntensity > 60 ? 'Manipulative tone' : 'Measured neutral tone'}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500 font-medium">Attribution Density</div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                      {result.linguisticFeatures.attributionDensity}%
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Quotes &amp; institution references
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500 font-medium">Readability Grade</div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                      Grade {result.linguisticFeatures.readabilityGrade}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Flesch-Kincaid index
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Gemini AI Verification Report */}
              {result.aiReport && (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-700" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-900">
                        Deep AI Fact-Checking Report (Gemini 3.8 Flash)
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-indigo-800 font-semibold">
                      Confidence: {result.aiReport.confidence}%
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {result.aiReport.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Factual Checks */}
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2 shadow-xs">
                      <div className="text-xs font-semibold text-slate-800">Factual Cross-Checks</div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {result.aiReport.factualChecks.map((check, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-600 font-bold mt-0.5">•</span>
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Techniques & Signals */}
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2 shadow-xs">
                      <div className="text-xs font-semibold text-slate-800">Journalistic &amp; Manipulation Analysis</div>
                      {result.aiReport.linguisticSignals.manipulationTechniques.length > 0 && (
                        <div className="text-xs">
                          <span className="text-rose-700 font-semibold">Manipulation cues: </span>
                          <span className="text-slate-700">
                            {result.aiReport.linguisticSignals.manipulationTechniques.join(', ')}
                          </span>
                        </div>
                      )}
                      {result.aiReport.linguisticSignals.credibilityMarkers.length > 0 && (
                        <div className="text-xs">
                          <span className="text-emerald-700 font-semibold">Credibility signals: </span>
                          <span className="text-slate-700">
                            {result.aiReport.linguisticSignals.credibilityMarkers.join(', ')}
                          </span>
                        </div>
                      )}
                      <div className="text-xs pt-1 border-t border-slate-100 text-slate-600">
                        <span className="font-semibold text-slate-800">Recommendation: </span>
                        {result.aiReport.recommendedAction}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
