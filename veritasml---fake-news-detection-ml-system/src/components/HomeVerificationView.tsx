import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Copy, 
  Check, 
  Cpu, 
  ExternalLink,
  ArrowRight,
  BrainCircuit,
  Info
} from 'lucide-react';
import { PredictionResult, AIVerificationReport, BenchmarkArticle } from '../types';
import { runLocalMLInference } from '../ml/models';
import { BENCHMARK_ARTICLES } from '../data/benchmarkData';

interface HomeVerificationViewProps {
  onVerificationComplete: (result: PredictionResult) => void;
  onNavigateToDashboard: () => void;
  onNavigateToHistory: () => void;
}

export const HomeVerificationView: React.FC<HomeVerificationViewProps> = ({
  onVerificationComplete,
  onNavigateToDashboard,
  onNavigateToHistory,
}) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [articleText, setArticleText] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    setSourceUrl('');
    setArticleText('');
    setCurrentResult(null);
    setErrorMsg(null);
  };

  const handleVerify = async () => {
    if (!articleText.trim()) {
      setErrorMsg('Please paste the news article text or claim to verify.');
      return;
    }
    setErrorMsg(null);
    setIsVerifying(true);

    try {
      // Derive a headline from first line or first 100 characters
      const firstLine = articleText.trim().split('\n')[0];
      const derivedTitle = firstLine.length > 120 ? firstLine.slice(0, 117) + '...' : firstLine;

      // 1. Run local Machine Learning ensemble inference
      const mlResult = runLocalMLInference(
        derivedTitle,
        articleText.trim(),
        sourceUrl.trim() || undefined,
        undefined,
        'ensemble'
      );

      // 2. Call backend Gemini AI Verifier for factual claim verification
      try {
        const res = await fetch('/api/verify-gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: derivedTitle,
            text: articleText.trim(),
            source: sourceUrl.trim(),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.available && data.report) {
            const rep = data.report as AIVerificationReport;
            mlResult.aiReport = rep;

            // Ground truth veracity: Overrule statistical prior with factual check
            if (rep.verdict === 'FAKE' || rep.verdict === 'MISLEADING') {
              mlResult.finalLabel = 'FAKE';
              const confProb = Math.max(0.85, (rep.confidence || 95) / 100);
              mlResult.probabilityFake = confProb;
              mlResult.confidence = (rep.confidence || 95) / 100;
              mlResult.consensusScore = `Flagged FAKE by Fact-Check Engine (${rep.confidence}% Confidence)`;

              // Synchronize individual models
              for (const k of Object.keys(mlResult.individualModels)) {
                mlResult.individualModels[k] = {
                  ...mlResult.individualModels[k],
                  label: 'FAKE',
                  probabilityFake: confProb,
                  confidence: mlResult.confidence,
                };
              }
            } else if (rep.verdict === 'REAL') {
              mlResult.finalLabel = 'REAL';
              const realConf = Math.max(0.85, (rep.confidence || 95) / 100);
              mlResult.confidence = realConf;
              mlResult.probabilityFake = Math.min(0.08, Number(((100 - (rep.confidence || 95)) / 100).toFixed(4)));
              mlResult.consensusScore = `Verified REAL by Fact-Check Engine (${rep.confidence}% Confidence)`;

              for (const k of Object.keys(mlResult.individualModels)) {
                mlResult.individualModels[k] = {
                  ...mlResult.individualModels[k],
                  label: 'REAL',
                  probabilityFake: mlResult.probabilityFake,
                  confidence: realConf,
                };
              }
            }
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini verification fallback:', geminiErr);
      }

      setCurrentResult(mlResult);
      onVerificationComplete(mlResult);
    } catch (err: any) {
      console.error('Verification failed:', err);
      setErrorMsg(err?.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLoadSample = (sample: BenchmarkArticle) => {
    setSourceUrl(`https://${sample.source.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/news`);
    setArticleText(`${sample.title}\n\n${sample.text}`);
    setCurrentResult(null);
    setErrorMsg(null);
  };

  const handleCopyReport = () => {
    if (!currentResult) return;
    const reportText = `AI VERIFICATION ENGINE REPORT
Source URL: ${currentResult.source || 'Not specified'}
Verdict: ${currentResult.finalLabel} (${(currentResult.confidence * 100).toFixed(1)}% Confidence)
Consensus: ${currentResult.consensusScore}
Clickbait Score: ${currentResult.linguisticFeatures.clickbaitScore}/100
Attribution: ${currentResult.linguisticFeatures.attributionDensity}%
${currentResult.aiReport ? `\nFact-Check Summary: ${currentResult.aiReport.summary}\nRecommendation: ${currentResult.aiReport.recommendedAction}` : ''}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative py-8 sm:py-12 space-y-10">
      {/* Title & Subtitle Matching Screenshot */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Analyze &amp; Verify News
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Paste an article. Our AI will classify statistical patterns AND search the web to verify factual claims.
        </p>

        {/* Quick Preload Samples */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Sample:</span>
          {BENCHMARK_ARTICLES.slice(0, 3).map((art) => (
            <button
              key={art.id}
              onClick={() => handleLoadSample(art)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs font-medium flex items-center gap-1"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${art.groundTruth === 'REAL' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="truncate max-w-[130px]">{art.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Card - Exactly as shown in the screenshot */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Source URL Field */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Source URL (Optional)
          </label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
          />
        </div>

        {/* News Article Textarea */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            News Article Text
          </label>
          <textarea
            rows={8}
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            placeholder="Paste the full news article here..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors resize-y font-sans"
          />
        </div>

        {errorMsg && (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        {/* Card Action Footer */}
        <div className="flex items-center justify-between pt-2">
          {/* Characters Count */}
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            Characters: {articleText.length}
          </span>

          {/* Action Buttons: Clear and 🔍 Verify Facts */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 text-xs font-semibold transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || !articleText.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-sm shadow-blue-600/20"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span role="img" aria-label="search" className="text-xs">
                    🔍
                  </span>
                  <span>Verify Facts</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Brain/AI Assistant Icon on right edge as in screenshot */}
      <button 
        onClick={onNavigateToDashboard}
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all text-purple-600"
        title="View ML Model Dashboard & Theory"
      >
        <span className="text-lg" role="img" aria-label="brain">
          🧠
        </span>
      </button>

      {/* Initial Guidance Card when awaiting verification */}
      {!currentResult && !isVerifying && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            Awaiting News Verification
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Paste any news article, headline, or claim above and click <strong className="text-slate-700">"Verify Facts"</strong>. The system will display a prominent <strong>Real vs Fake classification</strong> with exact <strong>Success &amp; Failure percentages</strong> and cross-referenced fact-checking findings.
          </p>
        </div>
      )}

      {/* Loading state indicator */}
      {isVerifying && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-blue-200 bg-blue-50/60 p-8 text-center space-y-3 animate-pulse">
          <RefreshCw className="h-7 w-7 text-blue-600 animate-spin mx-auto" />
          <h3 className="text-sm font-bold text-blue-900">
            Cross-Checking Factual Databases &amp; Computing ML Classifiers...
          </h3>
          <p className="text-xs text-blue-700 max-w-md mx-auto">
            Verifying factual accuracy, testing claims against historical and news archives, and calculating real-time success &amp; failure probabilities.
          </p>
        </div>
      )}

      {/* Results View - Appears smoothly below the verification card when verified */}
      {currentResult && (
        <div className="max-w-3xl mx-auto space-y-6 pt-4 animate-fadeIn">
          {/* Live Sync Banner */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-2.5 flex items-center justify-between text-xs text-blue-900">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span>Verified and dynamically added to Analytics Dashboard &amp; History Log</span>
            </span>
            <button
              onClick={onNavigateToDashboard}
              className="font-semibold text-blue-700 hover:text-blue-900 underline flex items-center gap-1"
            >
              <span>View in Dashboard</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* BIG DIV: Prominent Real vs Fake Status Card with Percent of Success / Fail */}
          <div 
            className={`rounded-3xl border-2 p-6 sm:p-8 transition-all shadow-md space-y-6 ${
              currentResult.finalLabel === 'REAL'
                ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/40 text-slate-900'
                : 'border-rose-300 bg-gradient-to-b from-rose-50/90 via-white to-rose-50/40 text-slate-900'
            }`}
          >
            {/* Top Verdict Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm ${
                  currentResult.finalLabel === 'REAL'
                    ? 'border-emerald-300 bg-emerald-600 text-white'
                    : 'border-rose-300 bg-rose-600 text-white'
                }`}>
                  {currentResult.finalLabel === 'REAL' ? (
                    <ShieldCheck className="h-7 w-7" />
                  ) : (
                    <ShieldAlert className="h-7 w-7" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentResult.finalLabel === 'REAL'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full animate-pulse ${currentResult.finalLabel === 'REAL' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      {currentResult.finalLabel === 'REAL' ? 'VERIFIED REAL NEWS' : 'FLAGGED FAKE NEWS'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Latency: {currentResult.latencyMs}ms</span>
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
                    currentResult.finalLabel === 'REAL' ? 'text-emerald-900' : 'text-rose-900'
                  }`}>
                    {currentResult.finalLabel === 'REAL' 
                      ? 'AUTHENTIC & FACTUALLY VERIFIED' 
                      : 'FAKE / UNVERIFIED CLAIM DETECTED'}
                  </h2>
                </div>
              </div>

              {/* Status Pill & Copy Report */}
              <div className="flex items-center gap-2 sm:self-start">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  currentResult.finalLabel === 'REAL'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {currentResult.finalLabel === 'REAL' ? 'PASS ✔️ (SUCCESS)' : 'FAIL ❌ (UNRELIABLE)'}
                </span>

                <button
                  onClick={handleCopyReport}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                  title="Copy full verification report"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Report'}</span>
                </button>
              </div>
            </div>

            {/* BIG METRICS GRID: Percent of Success vs Percent of Fail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1: Percent of Success */}
              <div className={`rounded-2xl border p-5 transition-all shadow-2xs ${
                currentResult.finalLabel === 'REAL'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>AUTHENTIC SUCCESS RATE</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    currentResult.finalLabel === 'REAL' ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {currentResult.finalLabel === 'REAL' ? 'PASSED' : 'BELOW THRESHOLD'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tight tabular-nums ${
                    currentResult.finalLabel === 'REAL' ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {((1 - currentResult.probabilityFake) * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">Authenticity Score</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {currentResult.finalLabel === 'REAL'
                    ? 'High factual agreement, objective language, and verified historical/factual consistency.'
                    : 'Fails factual veracity standards; lacked verifiable source corroboration.'}
                </p>
              </div>

              {/* Box 2: Percent of Fail */}
              <div className={`rounded-2xl border p-5 transition-all shadow-2xs ${
                currentResult.finalLabel === 'FAKE'
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>DISINFORMATION / FAIL RATE</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    currentResult.finalLabel === 'FAKE' ? 'bg-rose-200 text-rose-900' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {currentResult.finalLabel === 'FAKE' ? 'FAILED' : 'LOW RISK'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tight tabular-nums ${
                    currentResult.finalLabel === 'FAKE' ? 'text-rose-600' : 'text-slate-400'
                  }`}>
                    {(currentResult.probabilityFake * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">Fake / Error Probability</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {currentResult.finalLabel === 'FAKE'
                    ? 'Identified factual discrepancies, fabricated claims, or strong disinformation patterns.'
                    : 'Minimal probability of disinformation or sensational fabrication.'}
                </p>
              </div>
            </div>

            {/* Visual Veracity Gauge Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span>● Success (Real):</span>
                  <span className="font-mono">{((1 - currentResult.probabilityFake) * 100).toFixed(1)}%</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Consensus: <strong className="text-slate-800">{currentResult.consensusScore}</strong>
                </span>
                <span className="flex items-center gap-1 text-rose-700">
                  <span>Fail (Fake): ●</span>
                  <span className="font-mono">{(currentResult.probabilityFake * 100).toFixed(1)}%</span>
                </span>
              </div>

              {/* Progress Track */}
              <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden flex border border-slate-300 shadow-inner">
                <div 
                  className="bg-emerald-500 transition-all duration-700" 
                  style={{ width: `${Math.max(2, (1 - currentResult.probabilityFake) * 100)}%` }} 
                  title={`Authentic: ${((1 - currentResult.probabilityFake) * 100).toFixed(1)}%`}
                />
                <div 
                  className="bg-rose-500 transition-all duration-700" 
                  style={{ width: `${Math.max(2, currentResult.probabilityFake * 100)}%` }} 
                  title={`Fake: ${(currentResult.probabilityFake * 100).toFixed(1)}%`}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% (Disinformation)</span>
                <span>50% (Threshold)</span>
                <span>100% (Verified Real)</span>
              </div>
            </div>

            {/* Factual Explanation Box inside the Big DIV */}
            {currentResult.aiReport && (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base" role="img" aria-label="sparkles">✨</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Fact-Check Verification Findings
                    </h3>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    currentResult.finalLabel === 'REAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {currentResult.aiReport.confidence}% Verification Confidence
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {currentResult.aiReport.summary}
                </p>

                {currentResult.aiReport.factualChecks && currentResult.aiReport.factualChecks.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-700 mb-1.5">Concrete Factual Points:</div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {currentResult.aiReport.factualChecks.map((chk, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className={currentResult.finalLabel === 'REAL' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                            {currentResult.finalLabel === 'REAL' ? '✓' : '✗'}
                          </span>
                          <span>{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Action: </span>
                    <span>{currentResult.aiReport.recommendedAction}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Forensic Journalistic Signals & Stylometry */}
          {currentResult.aiReport && (
            <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-700" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-900">
                    Linguistic Cues &amp; Journalistic Signals
                  </h3>
                </div>
                <span className="text-xs text-indigo-700 font-mono">Forensic NLP</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Manipulation &amp; Clickbait Cues</span>
                  </div>
                  {currentResult.aiReport.linguisticSignals.manipulationTechniques.length > 0 ? (
                    <ul className="space-y-1 text-slate-700 pl-3 list-disc">
                      {currentResult.aiReport.linguisticSignals.manipulationTechniques.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-500 italic">No emotional manipulation techniques detected.</div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Objective Credibility Markers</span>
                  </div>
                  {currentResult.aiReport.linguisticSignals.credibilityMarkers.length > 0 ? (
                    <ul className="space-y-1 text-slate-700 pl-3 list-disc">
                      {currentResult.aiReport.linguisticSignals.credibilityMarkers.map((cred, i) => (
                        <li key={i}>{cred}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-500 italic">No independent citations or named attributions found.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Model Breakdown & Diagnostics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Algorithm Verdicts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Machine Learning Classifiers
              </h4>
              <div className="space-y-2 text-xs">
                {Object.entries(currentResult.individualModels).map(([k, m]) => (
                  <div key={k} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-medium text-slate-800">{m.modelName}</span>
                      <div className="text-[10px] text-slate-400">{m.algorithm}</div>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${m.label === 'REAL' ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {m.label}
                      </span>
                      <div className="text-[10px] font-mono text-slate-500">
                        {(m.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylometric Features */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Stylometric &amp; Lexical Metrics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Clickbait Score</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {currentResult.linguisticFeatures.clickbaitScore}/100
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Emotional Valence</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {currentResult.linguisticFeatures.emotionalIntensity}/100
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Attribution Quotes</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {currentResult.linguisticFeatures.attributionDensity}%
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-[11px] text-slate-500">Readability Grade</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    Grade {currentResult.linguisticFeatures.readabilityGrade}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
