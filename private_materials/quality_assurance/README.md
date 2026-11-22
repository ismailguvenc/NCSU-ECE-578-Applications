# ECE 578: LTE and 5G Communications — Interactive Learning Laboratory

**Institution:** NC State University  
**Status:** All 17 applications are implemented. Independent functional review and this R3 feedback integration have been completed; scientific/faculty approval is still pending.  
**Last source update:** November 15, 2026 (US Eastern).

## Getting started

Extract the entire ZIP archive without changing directory relationships. Open `ECE578_Learning_Lab/index.html` in a modern browser. Each `module_01` through `module_17` contains its own application entry point. All simulations are in client-side JavaScript with local CSS/JS dependencies. No CDN or internet connection is required for the simulations. Lecture PDFs are under `reference_slides/`.

## Navigation and design

Each technical module contains multiple interactive learning laboratories and a ten-question explanatory quiz. The dark NC State red-accent visual system follows the provided Resource Grid Explorer reference. Controls recalculate numerical metrics and plots, with model assumptions on every tab. Module 17 is a cumulative question bank with practice and test modes.

## Scope and important limitations

The simulations are **educational models**, not a complete commercial LTE/5G protocol stack, link-level decoder or universally standards-compliant simulator. Synthetic parameters, simplified geometries, handover approximations, idealized Shannon bounds and limited radio-resource mappings are labeled in individual apps. Results must not be cited as measured network performance. Several slide decks teach historical 3GPP releases and must be interpreted in that release context.

The source question bank has 135 revised instructor-authored Respondus items (original keys and original wording retained for provenance), plus 237 new practice questions: **372 questions total**. See `module_17/REVIEW_LOG.md` and `QA_REVIEW.md` for ambiguities and outstanding faculty checks. Answer keys are not secure; the quiz should be used for formative study, not proctored grading.

## Key files

- `index.html` — unified course portal.
- `module_01` ... `module_16` — interactive technical learning applications.
- `module_17` — cumulative quiz, expanded Respondus export, explanations CSV, standalone HTML.
- `shared/` — design system and simulation visualization utilities.
- `reference_slides/` — lecture PDF references.
- `PROJECT_PROGRESS.md` — implementation and handoff ledger.
- `QA_REVIEW.md` — independent review findings, fixes and open issues.
- `tests/` — reproducible Chromium smoke and boundary tests.

## Review cadence

New module development is complete. The independent technical/pedagogical review task can continue open scientific, accessibility, and faculty-approval checks; changes must be merged version-safely. Full independent approval is **not** implied by browser smoke tests.


## Current cumulative quiz and study guide (reviewed edition)

Module 17 includes 372 questions (135 original, 237 new); `module_17/study_questions.html` shows all questions grouped by module with correct choices marked, linked from the quiz footer. Read `QA_INDEPENDENT_COMPREHENSIVE_372.md` for exact independent review coverage and outstanding standards-level limitations.

## Independent QA feedback integration — R3

- All 17 modules now include a collapsible module-specific guided exercise (predict → adjust → explain) and an explicit model limitations panel.
- Module 3 adds a tracking-area list simulator with registered list sizes 1/2/4, separate periodic TAU, and paging fan-out across all registered TAs. The analytic cost curve remains explicitly single-TA.
- Module 15 adds an SCell scheduling DCI-location comparison grounded in 3GPP TS 36.300 §11.1.
- The portal includes a corrected **372-question** count, links to the study guide and a new **Independent QA Status** page.
- Reproduce checks: `python tests/test_integrated_review.py` and `python tests/test_mobile_qa.py` with Playwright + Chromium installed. The original environment restricts `file://` navigation; scripts inline files while preserving the same JS and CSS code.

Read **`QA_REVIEW_INTEGRATION.md`** for the full per-module matrix and a transparent list of open gates. Do not imply 3GPP conformance or approve legacy instructor keys for graded assessment based only on browser tests.