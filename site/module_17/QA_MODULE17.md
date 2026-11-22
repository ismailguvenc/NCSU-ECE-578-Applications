# Module 17 — QA and Coverage Report

Date: 2026-11-15 | Status: **Working formative-learning prototype, first-pass technical review completed; faculty verification still recommended**.

## Content audit

| Metric | Result |
|---|---:|
| Unique inherited Respondus questions | 135 |
| Duplicates from consolidated source removed | 135 |
| Newly authored questions, Modules 1–15 | 75 |
| Newly authored Module 16 NR questions | 20 |
| Total question bank | **230** |
| Answer keys with exactly one selected option | 230 |
| Explanations provided | 230 |
| Source-derived originals retained for audit | 135 |

The module-specific Respondus files M1–M15 sum to 135 questions. The supplied file named M16 is a duplicate omnibus of those same 135 items, not new 5G-only questions. Source material, original wording and revised variants are packaged for traceability.

## Functional tests performed

- JavaScript syntax check with Node passed for the quiz module.
- Playwright + system Chromium rendered the standalone inlined HTML without JavaScript console/page exceptions.
- Verified module selection, module-16-only bank, source filtering, selectable question counts, and quiz launch.
- Verified immediate correct-answer explanations in Learning mode and delayed answers in Test mode.
- Completed a 10-question test-mode session and verified score and all ten review cards.
- Search/filter in the 230-question bank, answer-key toggle, and 16-module coverage dashboard passed.
- Verified original M11 Q11 with six available options can render and score properly.
- Confirmed an impossible filter combination (M16 + legacy-only) disables the Start button.
- Verified mobile viewport layout (390 px) and dialog controls.
- Verified course portal script displays 17 cards, including one correctly linked Module 17 card.
- Verified Respondus-style export has exactly 230 starred answers and companion CSV has 230 explanation rows.

**Environment limitation:** This container's Chromium blocks `file://` and loopback URLs administratively. The tested fallback injects identical HTML/CSS/JS into a Chromium document (`set_content`); this verifies execution but does not establish an end-to-end filesystem path loading test.

## Technical review and known limitations

- Targeted edits were made for ambiguous or wrong source distractors involving RLC TM versus HARQ, CQI versus radio link failure, RSRQ definition, MBSFN chronology, LTE CA control-channel placement, antenna-array conditions, and UE measurement reporting. Details in `REVIEW_LOG.md`.
- Historical source items focus on LTE Release 8–10; some conformance/release statements may require additional standard-specific verification before use in high-stakes assessment.
- This is a **client-side practice** resource. An exam-mode answer key is visible to technically knowledgeable users who inspect the JavaScript. Do not use as a secure graded test without a server-side assessment platform.
- Some source wording still reflects its original teaching era, and some questions favor recognition of a false statement over direct conceptual synthesis. The new bank counterbalances this with calculations and applied scenarios.
- Questions in future Module 5–16 interactive apps should be cross-checked against this bank and additional gaps added when those modules have passed QA. This should not add duplicate, superficial recall items.

## Packaging

- Full application: `index.html`, `quiz.js`, `quiz.css`, `questions.js`, shared CSS in parent folder.
- Offline standalone: `Quiz_Standalone.html` (single file, no external JS/CSS required).
- Editable/reviewable data: `questions.json`; traceability includes `originalStem` and `originalOptions` for each inherited question.
- Re-importable bank: `Respondus_Reviewed_Expanded.txt` with asterisks identifying intended answers.
- Rationales: `Answer_Explanations.csv`.
- Original files: `original_respondus/` folder.