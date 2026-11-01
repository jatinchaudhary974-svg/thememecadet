const MODULES = {
  defence: {
    fallback: [
      "Let's make your defence-preparation question specific. Are you asking about an exam, eligibility, syllabus, preparation strategy, or the SSB process?",
      "I can help organise general defence-career information and preparation. Tell me whether you're focused on NDA, CDS, AFCAT, or SSB."
    ],
    rules: [
      [/\bnda\b/i, "For NDA preparation, start by understanding the current official notification and syllabus. Build a balanced routine for Mathematics and GAT, practise questions regularly, and review mistakes. For eligibility, dates and rules, verify the latest UPSC notification."],
      [/\bcds\b/i, "For CDS, first identify the academy and paper requirements that apply to your goal. Review the latest UPSC notification, map the syllabus, and use timed practice with a regular error-review routine."],
      [/\bafcat\b/i, "For AFCAT, use the latest official notification to confirm eligibility and exam details. Then organise preparation around the published sections, timed practice and revision of weak areas."],
      [/\bssb\b|\binterview\b/i, "For SSB awareness, focus on understanding the stages, communicating honestly, reflecting on your experiences and practising clear expression. Treat coaching exercises as practice—not as a script for pretending to be someone else."],
      [/\beligib|\bage limit|height|medical\b/i, "Eligibility and medical standards depend on the entry and the current notification. I can help you understand the wording, but please verify the latest official UPSC or service notification rather than relying on an old summary."],
      [/\bsyllabus|exam pattern|preparation|study plan\b/i, "A practical preparation cycle is: check the current official syllabus, divide it into weekly topics, practise questions, analyse errors, and schedule revision. Keep targets realistic and review progress each week."]
    ]
  },
  study: {
    fallback: [
      "Let's break this into a small learning task. Tell me the subject, chapter and exact concept or question you want to understand.",
      "I can help structure a concept explanation, worked example or revision plan. Which subject and topic are you studying?"
    ],
    rules: [
      [/\bmath|algebra|calculus|trigonometry|coordinate\b/i, "For a Maths topic, first write down the definition or formula, identify the conditions where it applies, and solve one basic example before moving to mixed questions. Share the exact problem and I can help break it into steps."],
      [/\bphysics|mechanic|optics|electric|current|wave\b/i, "For Physics, identify the physical principle, list the known quantities with units, draw a simple diagram if useful, and then choose the relevant equation. Share the exact question for a step-by-step walkthrough."],
      [/\bchem|organic|inorganic|thermo|kinetic|electrochem\b/i, "For Chemistry, first classify the topic and write the key definitions, conditions or reaction patterns. Then practise a few representative questions and note why each step is valid. Which exact concept should we unpack?"],
      [/\brev(ision)?|backlog|timetable|schedule|study plan\b/i, "Try a manageable study cycle: choose one priority topic, define a finish line for the session, practise a few questions, and record what still feels unclear. Leave space for breaks and revision rather than planning every minute."]
    ]
  },
  knowledge: {
    fallback: [
      "I can share the limited public context available about The Meme Cadet, but I don't have verified details for every project or update. Are you asking about its mission, website, resources or community?",
      "Let's explore The Meme Cadet. Ask about its public-facing identity, mission, website or resources; I'll flag anything I cannot verify."
    ],
    rules: [
      [/\bmission|manifesto|vision\b/i, "The Meme Cadet's public-facing identity is built around a defence-aspirant community and the idea of moving from vision to execution. For exact current mission wording, the published website and manifesto should be treated as the source of truth."],
      [/\bwebsite|domain|web page\b/i, "The public website is thememecadet.in. For current pages, features or announcements, check the live website because this demo knowledge does not automatically track new changes."],
      [/\bresource|dpp|notes|study material\b/i, "The Meme Cadet has been planned around useful defence-aspirant learning resources. I cannot verify the current availability of a particular DPP or notes pack from this demo, so check the website's published resources."],
      [/\bfounder|team|about\b/i, "I can describe the public-facing project at a high level, but I should not invent private team details, unpublished plans or business metrics. Check the published About or Founder page for verified information."]
    ]
  },
  companion: {
    fallback: [
      "Let's turn this into one manageable next step. What are you trying to accomplish, and what feels like the main obstacle right now?",
      "We can make a simple plan without overloading the day. Tell me the goal, the time you have and the first thing blocking you."
    ],
    rules: [
      [/\bgoal|target|dream|ambition\b/i, "Make the goal concrete: describe the outcome, choose one small action you can take next, and decide how you'll know that action is complete. Keep the plan flexible enough to adjust when new information appears."],
      [/\bplan|routine|schedule|time management\b/i, "Start with three priorities at most: one important task, one maintenance task and one optional task. Give the important task a realistic time block, include breaks, and review what actually worked at the end."],
      [/\bstress|overwhelm|pressure|burnout|tired\b/i, "It can help to pause and reduce the problem to the next small decision. Take a reasonable break, name what is within your control, and consider talking with a trusted person if the pressure feels difficult to manage."],
      [/\bmotivat|discipline|consisten\b/i, "Consistency is easier when the next action is small and clear. Set a modest starting point, remove one avoidable distraction, and measure progress by actions you can control—not by perfection."]
    ]
  }
};

function hash(value) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function generateMockResponse(moduleId, message, history = []) {
  const module = MODULES[moduleId];
  if (!module) throw new Error("Choose a valid Cadet AI module.");

  const text = String(message || "").trim();
  const recent = Array.isArray(history) ? history.slice(-6) : [];
  const previousUser = [...recent].reverse().find((item) => item && item.role === "user" && typeof item.content === "string");
  const followUp = /\b(more|continue|explain|why|how so|example|elaborate|aur batao|samjhao)\b/i.test(text);
  const context = followUp && previousUser ? " As a follow-up to your earlier question, keep the same topic in view and tell me which part you want to explore next." : "";

  const match = module.rules.find(([pattern]) => pattern.test(text));
  const choices = match ? [match[1]] : module.fallback;
  const seed = hash(moduleId + "|" + text.toLowerCase() + "|" + (previousUser?.content || ""));
  const response = choices[seed % choices.length];
  return response + context + "\n\nMOCK MODE: This is a simulated demonstration response, not a live AI-generated answer.";
}

module.exports = { generateMockResponse };
