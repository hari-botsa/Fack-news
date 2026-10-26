import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileText, 
  BookOpen, 
  Terminal,
  ExternalLink 
} from 'lucide-react';
import { 
  PYTHON_NOTEBOOK_CODE, 
  ACADEMIC_PROJECT_REPORT, 
  generateJupyterNotebookJSON 
} from '../data/projectDeliverables';

interface ProjectExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectExportModal: React.FC<ProjectExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'notebook' | 'report'>('notebook');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadNotebook = () => {
    const jsonStr = generateJupyterNotebookJSON();
    const blob = new Blob([jsonStr], { type: 'application/x-ipynb+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fake_news_classifier_pipeline.ipynb';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPythonScript = () => {
    const blob = new Blob([PYTHON_NOTEBOOK_CODE], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'train_fake_news_model.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = () => {
    const blob = new Blob([ACADEMIC_PROJECT_REPORT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fake_news_detection_academic_report.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const textToCopy = activeTab === 'notebook' ? PYTHON_NOTEBOOK_CODE : ACADEMIC_PROJECT_REPORT;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Export ML Project Deliverables</h2>
              <p className="text-xs text-slate-500">
                Turnkey Jupyter Notebook, Python training scripts, and academic documentation report.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg border border-slate-300/50">
            <button
              onClick={() => setActiveTab('notebook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'notebook'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Python Code &amp; Notebook</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'report'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Academic Project Report</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            {activeTab === 'notebook' ? (
              <>
                <button
                  onClick={handleDownloadNotebook}
                  className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .ipynb</span>
                </button>
                <button
                  onClick={handleDownloadPythonScript}
                  className="flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .py</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Report .md</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Viewer */}
        <div className="overflow-y-auto p-6 bg-slate-50">
          <pre className="font-mono text-xs text-slate-800 leading-relaxed overflow-x-auto p-4 rounded-lg border border-slate-200 bg-white shadow-xs">
            {activeTab === 'notebook' ? PYTHON_NOTEBOOK_CODE : ACADEMIC_PROJECT_REPORT}
          </pre>
        </div>
      </div>
    </div>
  );
};
