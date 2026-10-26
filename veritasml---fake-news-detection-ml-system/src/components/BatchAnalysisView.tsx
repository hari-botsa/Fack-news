import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  PlayCircle, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { runLocalMLInference } from '../ml/models';
import { PredictionResult } from '../types';

export const BatchAnalysisView: React.FC = () => {
  const defaultBatch = `NASA James Webb Space Telescope Detects Carbon-Bearing Molecules in Habitable-Zone Exoplanet
SHOCKING BOMBSHELL: Big Pharma whistleblowers expose secret dandelion root extract that cures all tumors in 48 hours!
Federal Reserve Holds Benchmark Overnight Lending Rate at 4.25% Following Consumer Price Index Report
EXPOSED: Secret 6G cellular towers secretly activated in metropolitan hubs emit brainwave altering microwave pulses!
Bipartisan Senate Coalition Passes Clean Water Infrastructure Act in 78-21 Roll Call Vote
Supreme Court secretly arrested after military tribunal uncovers treasonous international vote tampering scheme!
Semiconductor Consortium Achieves 1.4-Nanometer Test Wafer Fabrication Using High-NA EUV Lithography
CENSORED CURE: Ancient Himalayan salt formula eliminates heart disease instantly doctors terrified!`;

  const [rawText, setRawText] = useState(defaultBatch);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunBatch = () => {
    const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 5);
    if (lines.length === 0) return;

    setIsRunning(true);
    setTimeout(() => {
      const batchResults: PredictionResult[] = lines.map((headline) => {
        return runLocalMLInference(headline, headline, 'Batch Input', undefined, 'ensemble');
      });
      setResults(batchResults);
      setIsRunning(false);
    }, 150);
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;
    const headers = ['Headline', 'Verdict', 'Confidence_Pct', 'Fake_Prob', 'Clickbait_Score', 'Attribution_Pct'];
    const rows = results.map((r) => [
      `"${r.title.replace(/"/g, '""')}"`,
      r.finalLabel,
      (r.confidence * 100).toFixed(1),
      (r.probabilityFake * 100).toFixed(1),
      r.linguisticFeatures.clickbaitScore,
      r.linguisticFeatures.attributionDensity
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `veritas_batch_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fakeCount = results.filter((r) => r.finalLabel === 'FAKE').length;
  const realCount = results.filter((r) => r.finalLabel === 'REAL').length;
  const avgConfidence = results.length
    ? (results.reduce((acc, curr) => acc + curr.confidence, 0) / results.length) * 100
    : 0;

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-mono">
          <span>Vectorized High-Throughput Inference</span>
          <span aria-hidden="true">·</span>
          <span>TF-IDF + Soft Voting Ensemble</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Batch News Analysis &amp; CSV Evaluation
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
          Paste multiple news headlines or claims (one per line) to evaluate and score hundreds of articles in parallel.
        </p>
      </div>

      {/* Input Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Headlines to Evaluate (one per line)
          </label>
          <span className="text-xs font-mono text-slate-500 tabular-nums">
            {rawText.split('\n').filter((l) => l.trim().length > 5).length} lines detected
          </span>
        </div>

        <textarea
          rows={6}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste headlines here..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none font-mono"
        />

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setRawText('')}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Clear input
          </button>

          <div className="flex items-center gap-3">
            {results.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV Results</span>
              </button>
            )}

            <button
              onClick={handleRunBatch}
              disabled={isRunning || !rawText.trim()}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 shadow-xs"
            >
              {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
              <span>Execute Batch Inference</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Batch Stats */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeIn">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Total Analyzed</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {results.length}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Authentic / Real</div>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
              {realCount}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">
                ({((realCount / results.length) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Flagged Fake / Disinformation</div>
            <div className="text-2xl font-bold font-mono text-rose-700 mt-1 tabular-nums">
              {fakeCount}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">
                ({((fakeCount / results.length) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Mean Confidence</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {avgConfidence.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-sm font-semibold text-slate-900">Batch Classification Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-sans font-semibold">#</th>
                  <th className="py-2.5 px-4 font-sans font-semibold">Headline / Claim</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Predicted Verdict</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Confidence</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Clickbait Score</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Attribution %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {results.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-400 tabular-nums">{idx + 1}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800 max-w-md truncate">
                      {r.title}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        r.finalLabel === 'REAL'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {r.finalLabel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 tabular-nums">
                      {(r.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 tabular-nums">
                      {r.linguisticFeatures.clickbaitScore}/100
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 tabular-nums">
                      {r.linguisticFeatures.attributionDensity}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
