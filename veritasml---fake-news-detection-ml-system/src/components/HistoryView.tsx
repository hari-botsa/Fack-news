import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { PredictionResult } from '../types';

interface HistoryViewProps {
  history: PredictionResult[];
  onClearHistory: () => void;
  onSelectResult: (result: PredictionResult) => void;
  onNavigateToHome: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onClearHistory,
  onSelectResult,
  onNavigateToHome,
}) => {
  const [search, setSearch] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<'ALL' | 'REAL' | 'FAKE'>('ALL');

  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.source && item.source.toLowerCase().includes(search.toLowerCase())) ||
      (item.text && item.text.toLowerCase().includes(search.toLowerCase()));

    const matchesVerdict = filterVerdict === 'ALL' || item.finalLabel === filterVerdict;

    return matchesSearch && matchesVerdict;
  });

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = ['Timestamp', 'Headline', 'Source_URL', 'Verdict', 'Confidence_Pct', 'Consensus'];
    const rows = history.map((item) => [
      `"${item.timestamp}"`,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.source || ''}"`,
      item.finalLabel,
      (item.confidence * 100).toFixed(1),
      `"${item.consensusScore}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `verification_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8 sm:py-10 space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-mono">
            <span>Audit Trail &amp; Verification Archive</span>
            <span aria-hidden="true">·</span>
            <span>{history.length} Articles Recorded</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Analysis History Log
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Review past news verifications, model consensus ratios, and factual grounding reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors shadow-2xs"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verified articles by headline, keywords or URL..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          {(['ALL', 'REAL', 'FAKE'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setFilterVerdict(v)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filterVerdict === v
                  ? 'bg-white text-blue-700 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {v === 'ALL' ? 'All Results' : v === 'REAL' ? 'Authentic' : 'Fake'}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List / Table */}
      {filteredHistory.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((item) => (
              <div 
                key={item.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                    {item.source && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-xs text-slate-500 font-sans">{item.source}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {item.title}
                  </h3>

                  {item.text && (
                    <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                      {item.text}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.finalLabel === 'REAL'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {item.finalLabel}
                    </span>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {(item.confidence * 100).toFixed(0)}% Conf
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectResult(item)}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <History className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No Verification History Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Articles you analyze using the Home verification engine will be logged here with timestamps, verdicts, and model scores.
          </p>
          <button
            onClick={onNavigateToHome}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Go to Home &amp; Verify First Article</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
