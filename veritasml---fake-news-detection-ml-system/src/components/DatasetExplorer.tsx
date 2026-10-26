import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  PlayCircle, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { BenchmarkArticle, VeracityLabel } from '../types';
import { BENCHMARK_ARTICLES } from '../data/benchmarkData';

interface DatasetExplorerProps {
  onSelectArticleForPrediction: (article: BenchmarkArticle) => void;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  onSelectArticleForPrediction,
}) => {
  const [articles, setArticles] = useState<BenchmarkArticle[]>(BENCHMARK_ARTICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVeracity, setSelectedVeracity] = useState<'All' | VeracityLabel>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New article form state
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newCategory, setNewCategory] = useState<BenchmarkArticle['category']>('Politics');
  const [newTruth, setNewTruth] = useState<VeracityLabel>('REAL');

  const categories = ['All', 'Science', 'Health', 'Politics', 'Technology', 'Finance'];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesVeracity = selectedVeracity === 'All' || art.groundTruth === selectedVeracity;

    return matchesSearch && matchesCategory && matchesVeracity;
  });

  const handleAddCustomArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const newArt: BenchmarkArticle = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      text: newText.trim(),
      source: newSource.trim() || 'Custom Input',
      category: newCategory,
      groundTruth: newTruth,
      date: new Date().toISOString().split('T')[0],
      summary: newText.slice(0, 140) + '...',
    };

    setArticles([newArt, ...articles]);
    setShowAddModal(false);
    setNewTitle('');
    setNewText('');
    setNewSource('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-mono">
            <span>Labeled Benchmark Corpus</span>
            <span aria-hidden="true">·</span>
            <span>Balanced Real &amp; Disinformation Samples</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Dataset &amp; Article Explorer
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
            Examine authentic and fabricated articles from the training corpus with full ground truth labels. 
            Click any entry to test it in the interactive ML classifier modal.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4 text-emerald-600" />
          <span>Add Custom Sample</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, topics, sources, or claims..."
            className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
          />
        </div>

        {/* Category Filter Buttons (Functional Tabs) */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-emerald-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Veracity Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          {(['All', 'REAL', 'FAKE'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVeracity(v)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedVeracity === v
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {v === 'All' ? 'All Truths' : v}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
            <div
              key={art.id}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.source}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.date}</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    {art.title}
                  </h3>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border shrink-0 ${
                    art.groundTruth === 'REAL'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}>
                    {art.groundTruth}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-4">
                  {art.text}
                </p>

                {art.keyFlagReasons && (
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                      Linguistic Red Flags:
                    </span>
                    <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
                      {art.keyFlagReasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono tabular-nums">
                  {art.text.split(/\s+/).filter(Boolean).length} words
                </span>

                <button
                  onClick={() => onSelectArticleForPrediction(art)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>Test in Predictor Modal</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">No articles matched your filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Custom Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div 
            className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Benchmark Article to Corpus</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Article title or claim..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Content</label>
                <textarea
                  rows={5}
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Paste article body text here..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    placeholder="e.g. Associated Press"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900"
                  >
                    <option value="Politics">Politics</option>
                    <option value="Science">Science</option>
                    <option value="Health">Health</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="World">World</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ground Truth</label>
                  <select
                    value={newTruth}
                    onChange={(e) => setNewTruth(e.target.value as VeracityLabel)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900"
                  >
                    <option value="REAL">REAL</option>
                    <option value="FAKE">FAKE</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 rounded"
                >
                  Save to Corpus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
