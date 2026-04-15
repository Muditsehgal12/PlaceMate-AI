const analyzeResume = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a resume file." });
  }

  const fileName = file.originalname.toLowerCase();
  const fileSizeKb = Math.max(1, Math.round(file.size / 1024));

  let score = 55;
  if (fileName.includes("resume")) score += 8;
  if (fileName.includes("final") || fileName.includes("updated")) score += 5;
  if (fileSizeKb > 80) score += 8;
  if (fileSizeKb > 150) score += 6;
  if (fileSizeKb < 40) score -= 10;
  score = Math.max(35, Math.min(96, score));

  const strengths = [
    "Clean file format and recruiter-friendly structure.",
    "Resume appears to have sufficient content depth.",
  ];
  const weaknesses = [
    "Quantified impact may be missing in project bullets.",
    "Role-specific keywords might need stronger alignment.",
  ];
  const suggestions = [
    "Add 3-5 achievement bullets with metrics (%, time saved, users impacted).",
    "Highlight top technical skills near the top for quicker scanning.",
    "Customize summary and projects for the target role before each application.",
  ];

  return res.json({
    fileName: file.originalname,
    score,
    strengths,
    weaknesses,
    suggestions,
  });
};

const getMockQuestions = async (req, res) => {
  const { role = "Software Engineer" } = req.query;

  const questionBank = {
    dataScientist: [
      "How do you decide between precision and recall for a business problem?",
      "Explain a model you deployed and how you monitored drift.",
      "How would you communicate model limitations to non-technical stakeholders?",
      "Describe a time your analysis changed a product decision.",
      "How do you validate data quality before training?"
    ],
    webDeveloper: [
      "How do you improve Core Web Vitals in a React app?",
      "Walk through how you design secure authentication flows.",
      "How do you structure a scalable frontend codebase?",
      "Tell me about a production bug you fixed under pressure.",
      "How do you choose between server-side and client-side rendering?"
    ],
    aiEngineer: [
      "How would you build a RAG pipeline for a support chatbot?",
      "How do you evaluate hallucinations in LLM output?",
      "What techniques do you use to reduce model latency and cost?",
      "Explain a prompt strategy that improved output reliability.",
      "How do you secure sensitive data when using third-party AI APIs?"
    ],
    softwareEngineer: [
      "How do you break down a large feature into deliverable milestones?",
      "Describe a time you made a system more reliable.",
      "How do you approach API versioning in production systems?",
      "Tell me about a design trade-off you made and why.",
      "How do you write tests for edge cases in critical modules?"
    ],
    analyst: [
      "How do you convert ambiguous business questions into measurable metrics?",
      "Describe a dashboard you built and the impact it had.",
      "How do you identify and explain anomalies in weekly reports?",
      "What is your process for stakeholder requirement gathering?",
      "How do you prioritize analysis requests from multiple teams?"
    ],
    hr: [
      "How do you assess cultural fit while reducing interviewer bias?",
      "Describe a difficult hiring process and how you improved it.",
      "How do you handle candidate negotiation and expectation alignment?",
      "How would you design a campus hiring strategy for tech roles?",
      "How do you ensure a positive candidate experience end-to-end?"
    ],
    general: [
      "Tell me about a challenge where you took ownership and delivered results.",
      "How do you prioritize work when deadlines collide?",
      "Describe a project where teamwork was critical to success.",
      "What feedback did you receive recently and how did you act on it?",
      "Why do you want this role, and what value will you bring in 90 days?"
    ],
  };

  const normalized = role.toLowerCase();
  let key = "general";
  if (normalized.includes("data")) key = "dataScientist";
  else if (normalized.includes("web")) key = "webDeveloper";
  else if (normalized.includes("ai")) key = "aiEngineer";
  else if (normalized.includes("software")) key = "softwareEngineer";
  else if (normalized.includes("analyst")) key = "analyst";
  else if (normalized.includes("hr") || normalized.includes("human resource")) key = "hr";

  const randomize = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const selected = randomize(questionBank[key]).slice(0, 4);
  const blended = randomize([...selected, ...randomize(questionBank.general).slice(0, 2)]);
  const questions = blended.map((question, index) => `${index + 1}. ${question}`);

  return res.json({ role, questions });
};

module.exports = { analyzeResume, getMockQuestions };
