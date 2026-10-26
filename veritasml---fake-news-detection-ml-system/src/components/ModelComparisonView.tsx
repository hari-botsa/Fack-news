import React, { useState } from 'react';
import { 
  BarChart3, 
  Cpu, 
  Layers, 
  Zap, 
  Activity, 
  Table, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { BENCHMARK_METRICS } from '../data/benchmarkData';
import { ModelBenchmarkMetrics } from '../types';

export const ModelComparisonView: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('ensemble');

  const selectedModel = BENCHMARK_METRICS.find((m) => m.key === selectedKey) || BENCHMARK_METRICS[0];
  const cm = selectedModel.confusionMatrix;
  const total = cm.tp + cm.fp + cm.tn + cm.fn;

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-mono">
          <span>Benchmarked on WELFake &amp; Kaggle Fake News Corpus</span>
          <span aria-hidden="true">·</span>
          <span>N = 5,200 Holdout Test Samples</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Machine Learning Model Benchmark &amp; Confusion Matrix
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
          Comparative empirical evaluation of text classification algorithms using identical 
          n-gram TF-IDF representations, 10-fold cross validation, and test set performance.
        </p>
      </div>

      {/* Model Cards Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BENCHMARK_METRICS.map((model) => {
          const isSelected = model.key === selectedKey;
          return (
            <div
              key={model.key}
              onClick={() => setSelectedKey(model.key)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-mono">
                <span>{model.category}</span>
                <span className="tabular-nums font-semibold">{model.latency}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 truncate">
                {model.name}
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-sans">Accuracy</div>
                  <div className="text-base font-bold text-emerald-700 tabular-nums">
                    {model.accuracy}%
                  </div>
                </div>

                <div className="rounded bg-slate-50 p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-sans">F1-Score</div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {model.f1Score}%
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>ROC-AUC: <strong className="text-slate-800 font-mono">{model.rocAuc}</strong></span>
                <span className={`font-semibold ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {isSelected ? 'Active Model' : 'Click to inspect'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Model Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Confusion Matrix Interactive Visualizer */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Confusion Matrix Visualizer</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                Model: {selectedModel.name} (N = {total.toLocaleString()} test articles)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Correct Classifications</span>
            </div>
          </div>

          {/* 2x2 Matrix */}
          <div className="pt-2">
            <div className="grid grid-cols-12 gap-2 text-center text-xs">
              <div className="col-span-3"></div>
              <div className="col-span-9 font-semibold text-slate-700 pb-1 border-b border-slate-200 font-sans">
                Predicted Class
              </div>

              <div className="col-span-3"></div>
              <div className="col-span-4 font-mono text-[11px] text-slate-500 font-medium">
                PREDICTED FAKE (1)
              </div>
              <div className="col-span-5 font-mono text-[11px] text-slate-500 font-medium">
                PREDICTED REAL (0)
              </div>

              {/* Row 1: Actually Fake */}
              <div className="col-span-3 flex items-center justify-end font-semibold text-slate-600 text-right pr-2">
                <span className="font-mono text-[11px]">ACTUAL FAKE (1)</span>
              </div>

              {/* TP */}
              <div className="col-span-4 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
                <div className="text-[10px] uppercase font-mono text-emerald-800 font-semibold">
                  True Positive (TP)
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
                  {cm.tp.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {((cm.tp / total) * 100).toFixed(1)}% of total
                </div>
              </div>

              {/* FN */}
              <div className="col-span-5 rounded-lg border border-rose-200 bg-rose-50/80 p-4">
                <div className="text-[10px] uppercase font-mono text-rose-800 font-semibold">
                  False Negative (FN)
                </div>
                <div className="text-2xl font-bold font-mono text-rose-700 mt-1 tabular-nums">
                  {cm.fn.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {((cm.fn / total) * 100).toFixed(1)}% (Fake missed)
                </div>
              </div>

              {/* Row 2: Actually Real */}
              <div className="col-span-3 flex items-center justify-end font-semibold text-slate-600 text-right pr-2">
                <span className="font-mono text-[11px]">ACTUAL REAL (0)</span>
              </div>

              {/* FP */}
              <div className="col-span-4 rounded-lg border border-amber-200 bg-amber-50/80 p-4">
                <div className="text-[10px] uppercase font-mono text-amber-800 font-semibold">
                  False Positive (FP)
                </div>
                <div className="text-2xl font-bold font-mono text-amber-700 mt-1 tabular-nums">
                  {cm.fp.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {((cm.fp / total) * 100).toFixed(1)}% (Real flagged)
                </div>
              </div>

              {/* TN */}
              <div className="col-span-5 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
                <div className="text-[10px] uppercase font-mono text-emerald-800 font-semibold">
                  True Negative (TN)
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
                  {cm.tn.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {((cm.tn / total) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </div>

          {/* Derived Formula Verification Strip */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <div className="text-slate-500 text-[11px]">Precision: TP/(TP+FP)</div>
              <div className="text-sm font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                {selectedModel.precision}%
              </div>
            </div>

            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <div className="text-slate-500 text-[11px]">Recall / Sens: TP/(TP+FN)</div>
              <div className="text-sm font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                {selectedModel.recall}%
              </div>
            </div>

            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <div className="text-slate-500 text-[11px]">Specificity: TN/(TN+FP)</div>
              <div className="text-sm font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                {((cm.tn / (cm.tn + cm.fp)) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Math & Architecture Blueprint */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Mathematical Formulation &amp; Parameters</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The theoretical basis implemented in Python Scikit-Learn and mirrored in client-side TS inference.
            </p>
          </div>

          {/* Math Card */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="text-xs font-semibold text-emerald-800 font-mono">
              Classification Objective Function
            </div>
            <div className="p-3 rounded bg-white border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
              <code>{selectedModel.mathFormula}</code>
            </div>
          </div>

          {/* Hyperparameters Table */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">
              Hyperparameter Configuration
            </div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 font-semibold font-sans">Hyperparameter</th>
                    <th className="py-2 px-3 font-semibold font-sans">Configured Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {Object.entries(selectedModel.hyperparameters).map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2 px-3 text-slate-700">{k}</td>
                      <td className="py-2 px-3 text-emerald-700 font-bold">{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Qualitative Trade-offs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5">
              <span className="font-semibold text-emerald-800 text-[11px] uppercase tracking-wider">
                Strengths
              </span>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {selectedModel.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="font-semibold text-amber-800 text-[11px] uppercase tracking-wider">
                Limitations
              </span>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {selectedModel.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Metrics Benchmark Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Consolidated Performance Metrics</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-model evaluation across all standardized classification metrics.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-semibold font-sans">Model Name</th>
                <th className="py-2.5 px-3 font-semibold text-right">Accuracy</th>
                <th className="py-2.5 px-3 font-semibold text-right">Precision</th>
                <th className="py-2.5 px-3 font-semibold text-right">Recall</th>
                <th className="py-2.5 px-3 font-semibold text-right">F1-Score</th>
                <th className="py-2.5 px-3 font-semibold text-right">ROC-AUC</th>
                <th className="py-2.5 px-3 font-semibold text-right">Mean Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {BENCHMARK_METRICS.map((row) => (
                <tr key={row.key} className={row.key === selectedKey ? 'bg-emerald-50/50' : 'hover:bg-slate-50/60'}>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">
                    {row.name}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-700 tabular-nums">
                    {row.accuracy}%
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 tabular-nums">
                    {row.precision}%
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 tabular-nums">
                    {row.recall}%
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 tabular-nums">
                    {row.f1Score}%
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 tabular-nums">
                    {row.rocAuc}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-500 tabular-nums">
                    {row.latency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
