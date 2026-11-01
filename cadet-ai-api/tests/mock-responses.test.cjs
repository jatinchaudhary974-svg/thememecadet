const test = require("node:test");
const assert = require("node:assert/strict");
const { generateMockResponse } = require("../api/mock-responses.js");

const cases = [
  ["defence", "How should I start NDA preparation?", /NDA preparation/i],
  ["study", "Please explain a Physics concept", /Physics/i],
  ["knowledge", "Tell me about the TMC mission", /Meme Cadet/i],
  ["companion", "Help me make a realistic goal plan", /goal|plan/i]
];

for (const [moduleId, message, expected] of cases) {
  test(moduleId + " returns a module-relevant disclosed response", () => {
    const answer = generateMockResponse(moduleId, message, []);
    assert.match(answer, expected);
    assert.match(answer, /MOCK MODE: This is a simulated/i);
  });
}

test("uses recent conversation context for a follow-up", () => {
  const answer = generateMockResponse("study", "Can you explain more?", [
    { role: "user", content: "I am learning wave optics" },
    { role: "assistant", content: "Let's review the basics." }
  ]);
  assert.match(answer, /earlier question/i);
});

test("rejects unknown modules", () => {
  assert.throws(() => generateMockResponse("unknown", "hello"), /valid Cadet AI module/i);
});
