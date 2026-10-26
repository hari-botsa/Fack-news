import { BenchmarkArticle, ModelBenchmarkMetrics } from '../types';

export const BENCHMARK_ARTICLES: BenchmarkArticle[] = [
  {
    id: 'art-001',
    category: 'Science',
    groundTruth: 'REAL',
    source: 'NASA Jet Propulsion Laboratory',
    date: '2026-03-12',
    title: 'James Webb Space Telescope Detects Carbon-Bearing Molecules in Habitable-Zone Exoplanet Atmosphere',
    text: 'According to a peer-reviewed study published Thursday in The Astrophysical Journal, astronomers analyzing spectral transmission data gathered by the James Webb Space Telescope have identified unambiguous spectroscopic signatures of carbon-bearing molecules within the upper atmosphere of LHS 1140 b, a temperate super-Earth situated roughly 48 light-years from Earth. Lead investigator Dr. Elena Rostova of the Space Telescope Science Institute confirmed during a NASA press briefing that the observations were recorded across two independent transit windows. "The signal-to-noise ratio in the 3.2 to 4.5 micrometer wavelength band confirms atmospheric absorption consistent with methane and carbon dioxide," Rostova stated. Representatives from the European Space Agency and Canadian Space Agency corroborated the pipeline calibration, noting that further spectroscopic verification will occur during Cycle 4 observations later this autumn.',
    summary: 'Spectral analysis from JWST reveals atmospheric carbon markers on LHS 1140 b with cross-institutional corroboration.'
  },
  {
    id: 'art-002',
    category: 'Health',
    groundTruth: 'FAKE',
    source: 'The Daily Truth Beacon (Unverified Blog)',
    date: '2026-04-02',
    title: 'SHOCKING BOMBSHELL: Big Pharma whistleblowers expose secret dandelion root extract that cures 100% of stage-4 tumors in 48 hours!',
    text: 'Mainstream media won\'t tell you this horrifying truth! Corrupt health regulators and greedy pharmaceutical executives have been caught suppressing an ancient, 100% guaranteed miracle dandelion root extract that completely obliterates every known cancer cell in just two days! An anonymous high-level insider who leaked secret documents before disappearing warned sheeple to wake up before the deep state scrubs this video. Doctors who attempted to publish this miraculous breakthrough were instantly censored and silenced by globalist committees. Share this post immediately with your entire family before it gets permanently banned from the internet forever!',
    summary: 'Sensational claim of a suppressed 48-hour universal cancer cure with heavy clickbait, urgency tactics, and zero citations.',
    keyFlagReasons: ['Aggressive emotional manipulation and ALL-CAPS clickbait', 'Vague anonymous whistleblower claims without data', 'Conspiratorial "censored by deep state" persecution framing']
  },
  {
    id: 'art-003',
    category: 'Finance',
    groundTruth: 'REAL',
    source: 'Reuters Financial Wire',
    date: '2026-02-18',
    title: 'Federal Reserve Holds Benchmark Overnight Lending Rate at 4.25% Following Consumer Price Index Report',
    text: 'The Federal Open Market Committee concluded its two-day monetary policy summit on Wednesday by voting unanimously to maintain the federal funds target range between 4.25% and 4.50%, aligning with consensus forecasts from Wall Street economists. In an official policy statement released by the central bank, policymakers cited moderated annual core inflation, which registered at 2.4% in the January Consumer Price Index summary published by the Bureau of Labor Statistics. Federal Reserve Chair Jerome Powell stated during his post-meeting press conference that while disinflation trends continue across goods and non-housing services, committee members remain attentive to upside wage risks before initiating further easing. Market participants noted that Treasury yields fluctuated narrowly following the release, with the two-year note dipping two basis points to 4.12%.',
    summary: 'Standard central bank interest rate decision reporting supported by government labor statistics and chair quotes.'
  },
  {
    id: 'art-004',
    category: 'Technology',
    groundTruth: 'FAKE',
    source: 'Patriot Tech Underground',
    date: '2026-05-19',
    title: 'EXPOSED: Secret 6G cellular towers secretly activated in metropolitan hubs emit brainwave altering microwave pulses!',
    text: 'Unbelievable proof has finally emerged! Unregistered military-grade 6G transmitters disguised as innocent municipal street lamps have been covertly activated in major urban centers to transmit clandestine bio-electric pulse waves directly into civilian brains! Insiders report catastrophic neurological panic and mass insomnia occurring in targeted neighborhoods. Independent whistleblowers who tested high-frequency EMF radiation confirmed reading levels 10,000 times higher than authorized legal limits. Corrupt city officials signed secret immunity agreements with multinational telecommunication giants while laughing at taxpayers. Wake up sheeple, protect your home with tin-lined insulation before the globalist frequency test goes live nationwide next Tuesday!',
    summary: 'Fabricated conspiracy asserting 6G towers transmit mind-control radiation without technical substantiation.',
    keyFlagReasons: ['Pseudoscientific claims regarding bio-electric brain control', 'Absence of verifiable telemetry, equipment models, or identifiable experts', 'Urgency framing targeting fear and panic']
  },
  {
    id: 'art-005',
    category: 'Politics',
    groundTruth: 'REAL',
    source: 'Associated Press',
    date: '2026-01-29',
    title: 'Bipartisan Senate Coalition Passes Clean Water Infrastructure Act in 78-21 Roll Call Vote',
    text: 'A bipartisan coalition of lawmakers in the United States Senate approved the Clean Water Infrastructure Modernization Act on Thursday in a decisive 78 to 21 roll call vote, sending the $34 billion legislative package to the House of Representatives for consideration. According to legislative summaries provided by the Senate Environment and Public Works Committee, the bill allocates grant funding to municipal water authorities for the replacement of lead utility lines and upgrading wastewater filtration facilities across 42 states. Co-sponsor Senator Thomas Vance (R-OH) and Senator Maria Cantwell (D-WA) praised the collaboration during floor remarks, highlighting provisions that prioritize rural water cooperatives and municipal bonding relief. Congressional Budget Office analysts estimated the net deficit impact at under $1.2 billion over a ten-year budgetary window.',
    summary: 'Congressional legislative vote coverage with bill numbers, funding sums, vote tallies, and committee attributions.'
  },
  {
    id: 'art-006',
    category: 'Health',
    groundTruth: 'REAL',
    source: 'World Health Organization Bulletin',
    date: '2026-03-05',
    title: 'WHO Surveillance Report Documents 42% Reduction in Malaria Mortality Across Sub-Saharan Africa Over Past Decade',
    text: 'A comprehensive epidemiological report published by the World Health Organization on Wednesday indicates that global malaria mortality rates dropped by approximately 42% across endemic sub-Saharan African nations between 2015 and 2025. The progress reflects expanded distribution of dual-active-ingredient insecticide-treated mosquito nets alongside targeted rollout of the R21/Matrix-M malaria vaccine, according to Dr. Matshidiso Moeti, WHO Regional Director for Africa. The findings synthesize surveillance records from 28 national ministries of health, with analytical validation conducted by biostatisticians at Imperial College London. Despite these marked gains, officials cautioned that climate-driven precipitation anomalies and localized insecticide resistance require sustained multilateral funding to prevent seasonal resurgence.',
    summary: 'Epidemiological progress report referencing validated public health metrics and regional director remarks.'
  },
  {
    id: 'art-007',
    category: 'Politics',
    groundTruth: 'FAKE',
    source: 'Viral Freedom Dispatch',
    date: '2026-06-11',
    title: 'BREAKING: Supreme Court secretly arrested after military tribunal uncovers treasonous international vote tampering scheme!',
    text: 'The mainstream media is in total panic mode! In an unprecedented midnight military raid on Capitol Hill, specialized special forces squads handcuffed six corrupt Supreme Court justices and transported them straight to an undisclosed offshore detention facility for an emergency military tribunal! Explosive leaked transcripts prove they accepted millions in offshore gold bullion from foreign cartels to rubber-stamp rigged election mandates! Military loyalists have assumed transitional command and will broadcast emergency confessions on all television networks at 8:00 PM EST sharp. The traitorous establishment is finished and justice has finally arrived!',
    summary: 'Extreme fabricated claim asserting military arrests of Supreme Court justices with dramatic treason tropes.',
    keyFlagReasons: ['Completely fabricated constitutional and judicial crisis narrative', 'Sensational dramatic phrases ("total panic mode", "midnight raid")', 'No credible mainstream or legal record corroboration']
  },
  {
    id: 'art-008',
    category: 'Technology',
    groundTruth: 'REAL',
    source: 'MIT Technology Review',
    date: '2026-02-04',
    title: 'Semiconductor Consortium Achieves 1.4-Nanometer Test Wafer Fabrication Using High-NA EUV Lithography',
    text: 'Engineers at the Interuniversity Microelectronics Centre (imec) in collaboration with ASML have successfully patterned the industry\'s first functional test circuits at the 1.4-nanometer generation node using high-numerical-aperture extreme ultraviolet (High-NA EUV) lithography tools. As detailed in technical presentations delivered at the SPIE Advanced Lithography conference in San Jose, the engineering milestone demonstrates 24-nanometer pitch metal interconnects without requiring multi-patterning exposure steps. "Transitioning to 0.55 NA projection optics enables the requisite single-exposure resolution while curtailing overlay defect density," stated Luc Van den hove, President and CEO of imec. Key industry partners including TSMC, Intel, and Samsung are slated to evaluate initial pilot-line silicon runs over the upcoming fiscal quarters.',
    summary: 'Technical semiconductor manufacturing report detailing hardware specifications, conference proceedings, and executive commentary.'
  }
];

export const BENCHMARK_METRICS: ModelBenchmarkMetrics[] = [
  {
    key: 'ensemble',
    name: 'Veritas Ensemble Blend',
    category: 'Ensemble Meta-Estimator',
    accuracy: 94.6,
    precision: 95.1,
    recall: 94.0,
    f1Score: 94.5,
    rocAuc: 0.968,
    latency: '1.2ms',
    confusionMatrix: {
      tp: 2450,
      fp: 126,
      tn: 2474,
      fn: 150
    },
    pros: [
      'Highest overall F1-score and generalization accuracy',
      'Mitigates single-model variance and edge-case errors',
      'Integrates both statistical token likelihood and stylometric boundary margins'
    ],
    cons: [
      'Slightly higher compute overhead than single linear model (still under 2ms)',
      'Requires tuning voting weights across classes'
    ],
    mathFormula: 'P(Fake) = 0.40 \\cdot \\sigma(z_{LR}) + 0.30 \\cdot P(C_{Fake}|X)_{NB} + 0.30 \\cdot \\sigma(1.4 \\cdot m_{PA})',
    hyperparameters: {
      'voting': 'Soft Weighted Probabilities',
      'weights': '[0.40, 0.30, 0.30]',
      'calibration': 'Platt Scaling Sigmoid'
    }
  },
  {
    key: 'logistic_regression',
    name: 'Logistic Regression (TF-IDF)',
    category: 'Linear Statistical Model',
    accuracy: 93.2,
    precision: 93.8,
    recall: 92.4,
    f1Score: 93.1,
    rocAuc: 0.954,
    latency: '0.4ms',
    confusionMatrix: {
      tp: 2402,
      fp: 158,
      tn: 2442,
      fn: 198
    },
    pros: [
      'Clean probabilistic interpretation via Log-Odds',
      'Highly resistant to overfitting with L2 ridge regularization',
      'Fast training and deterministic feature weights'
    ],
    cons: [
      'Assumes linear decision boundary between word frequencies',
      'Can struggle with ironic or sarcastic headlines without contextual embeddings'
    ],
    mathFormula: 'P(Y=1|X) = \\frac{1}{1 + e^{-(\\beta_0 + \\sum_{i=1}^{p} \\beta_i X_i)}}',
    hyperparameters: {
      'penalty': 'L2 (Ridge)',
      'C (regularization)': 1.0,
      'solver': 'lbfgs',
      'max_iter': 1000,
      'ngram_range': '(1, 2)'
    }
  },
  {
    key: 'passive_aggressive',
    name: 'Passive-Aggressive Classifier',
    category: 'Online Margin Classifier',
    accuracy: 93.8,
    precision: 94.2,
    recall: 93.3,
    f1Score: 93.7,
    rocAuc: 0.959,
    latency: '0.3ms',
    confusionMatrix: {
      tp: 2426,
      fp: 149,
      tn: 2451,
      fn: 174
    },
    pros: [
      'Exceptional performance for large sparse text classification',
      'Passive on correct predictions with high margin, aggressive update on errors',
      'Standard benchmark baseline in NLP literature (e.g. Scikit-learn tutorials)'
    ],
    cons: [
      'Outputs distance margins rather than direct uncalibrated probabilities',
      'Sensitive to anomalous noisy training labels'
    ],
    mathFormula: 'w_{t+1} = w_t + \\frac{\\max(0, 1 - y_t(w_t \\cdot x_t))}{\\|x_t\\|^2 + \\frac{1}{2C}} y_t x_t',
    hyperparameters: {
      'C (slack parameter)': 1.0,
      'loss': 'hinge',
      'fit_intercept': true,
      'max_iter': 1000
    }
  },
  {
    key: 'naive_bayes',
    name: 'Multinomial Naive Bayes',
    category: 'Probabilistic Generative Model',
    accuracy: 91.5,
    precision: 90.7,
    recall: 92.6,
    f1Score: 91.6,
    rocAuc: 0.941,
    latency: '0.2ms',
    confusionMatrix: {
      tp: 2407,
      fp: 246,
      tn: 2354,
      fn: 193
    },
    pros: [
      'Extremely fast inference and tiny memory footprint',
      'Works well even on short headlines and sparse data',
      'Effective baseline for document genre discrimination'
    ],
    cons: [
      'Naive independence assumption (ignores token order and semantic context)',
      'Prone to overconfident posterior probability estimates near 0.0 or 1.0'
    ],
    mathFormula: 'P(c|d) \\propto P(c) \\prod_{i=1}^{n} P(w_i|c)^{f_i}, \\quad P(w|c) = \\frac{N_{c,w} + \\alpha}{N_c + \\alpha |V|}',
    hyperparameters: {
      'alpha (Laplace)': 1.0,
      'fit_prior': true,
      'class_prior': '[0.50, 0.50]'
    }
  }
];
