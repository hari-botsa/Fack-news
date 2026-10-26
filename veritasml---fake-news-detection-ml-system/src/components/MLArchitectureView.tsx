import React from 'react';
import { 
  Cpu, 
  Layers, 
  GitBranch, 
  Binary, 
  Scale, 
  CheckCircle2, 
  Code2, 
  BookOpen,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

export const MLArchitectureView: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Corpus Ingestion & Cleansing',
      desc: 'Raw news articles undergo regex normalization, URL removal, punctuation cleaning, and lowercasing while recording stylistic counters (e.g. ALL-CAPS ratios, excessive exclamation marks).',
      math: 'T_{\\text{clean}} = \\text{regex\\_filter}(T_{\\text{raw}}), \\quad R_{\\text{caps}} = \\frac{|\\text{Uppercase\\_Chars}|}{|\\text{Alpha\\_Chars}|}'
    },
    {
      num: '02',
      title: 'n-gram Tokenization & Stopword Filtering',
      desc: 'Generates unigrams and bigrams to preserve short phrase semantics (e.g. "big pharma", "miracle cure", "spokesperson confirmed") while pruning high-frequency English functional stopwords.',
      math: 'V = \\{ w_i \\} \\cup \\{ (w_i, w_{i+1}) \\}, \\quad w \\notin S_{\\text{stopwords}}'
    },
    {
      num: '03',
      title: 'TF-IDF Matrix & L2 Normalization',
      desc: 'Weights token importance using sublinear Term Frequency and smoothed Inverse Document Frequency across the 20,800-article corpus, followed by Euclidean L2 unit normalization.',
      math: '\\text{TF-IDF}(t, d) = \\frac{f_{t, d}}{\\sum f_{t\', d}} \\times \\left( \\ln\\left( \\frac{1 + N}{1 + \\text{DF}(t)} \\right) + 1 \\right), \\quad \\|v\\|_2 = 1'
    },
    {
      num: '04',
      title: 'Stylometric Feature Extraction',
      desc: 'Computes document-level psychological and journalistic indicators: Clickbait Index, Emotional Valence, Flesch-Kincaid Readability, and Institutional Attribution Density.',
      math: 'S_{\\text{attr}} = \\frac{2 \\times N_{\\text{citations}} + N_{\\text{quotes}}}{N_{\\text{words}}} \\times 100, \\quad GL = 0.39\\left(\\frac{\\text{words}}{\\text{sentences}}\\right) + 11.8\\left(\\frac{\\text{syllables}}{\\text{words}}\\right) - 15.59'
    },
    {
      num: '05',
      title: 'Multi-Algorithm Classification',
      desc: 'Executes Logistic Regression (probabilistic logit), Multinomial Naive Bayes (conditional log-likelihood), and Passive-Aggressive classifier (online margin optimization).',
      math: 'P_{\\text{LR}} = \\frac{1}{1 + e^{-w^T X}}, \\quad P_{\\text{NB}} \\propto P(C) \\prod P(w|C), \\quad w_{t+1} = w_t + \\frac{\\max(0, 1 - y_t(w \\cdot x))}{\\|x\\|^2 + \\frac{1}{2C}} y_t x_t'
    },
    {
      num: '06',
      title: 'Soft-Voting Ensemble & Explainable AI (XAI)',
      desc: 'Blends calibrated class probabilities and extracts top positive/negative directional token weights to visually illuminate the model reasoning for the end user.',
      math: 'P_{\\text{Ensemble}}(\\text{Fake}) = 0.40 \\cdot P_{\\text{LR}} + 0.30 \\cdot P_{\\text{NB}} + 0.30 \\cdot P_{\\text{PA}}, \\quad I(w) = x_w \\cdot \\beta_w'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-mono">
          <span>End-to-End System Specifications</span>
          <span aria-hidden="true">·</span>
          <span>Theoretical Foundations &amp; Formulations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Machine Learning Pipeline &amp; Mathematical Architecture
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
          Detailed documentation of the feature engineering stages, statistical loss functions, 
          and ensemble calibration pipeline implemented in VeritasML.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">Pipeline Execution Stages</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((st) => (
            <div 
              key={st.num}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-emerald-700 font-bold text-sm">{st.num}.</span>
                  <span className="text-slate-400 font-mono text-[11px]">NLP Pipeline</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {st.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-mono mb-1 font-semibold">Mathematical Formulation</div>
                <div className="rounded bg-slate-50 p-2 border border-slate-200 font-mono text-[11px] text-emerald-800 overflow-x-auto">
                  <code>{st.math}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison with Transformer / Deep AI Approach */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">
          Why Combine Classical Machine Learning with Deep LLM Grounding?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-semibold text-emerald-800 text-sm">
              Classical ML Advantages (TF-IDF + Linear Models)
            </h3>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
              <li><strong>Ultra-Low Latency:</strong> Executes inference in &lt; 2 milliseconds in the browser with zero cloud latency.</li>
              <li><strong>Deterministic &amp; Auditable:</strong> Model weights and decision boundaries are inspectable and free from random sampling variance.</li>
              <li><strong>Zero Cloud Cost:</strong> Runs on CPU/edge without requiring multi-gigabyte GPU clusters for basic token classification.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-900 text-sm">
              Deep Generative AI Advantages (Gemini 3.8 Flash)
            </h3>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
              <li><strong>External Fact-Checking:</strong> Verifies whether referenced events, people, and publications actually took place.</li>
              <li><strong>Context &amp; Nuance:</strong> Understands subtle satire, irony, framing techniques, and multi-paragraph logical fallacies.</li>
              <li><strong>Actionable Intelligence:</strong> Generates executive summaries and tailored guidance for news consumers.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
