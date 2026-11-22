# ECE 578 — Integration of independent review feedback

**Revision:** QA-integration R3 · **Date:** 15 November 2026  
**Source baseline:** `ECE578_Interactive_Learning_Lab_Reviewed_372Q.zip` / the corresponding extracted `ece578_review_v2` tree.  
**Primary source record:** `QA_INDEPENDENT_COMPREHENSIVE_372.md`. This document is an integration ledger, not a claim of formal 3GPP certification.

## Executive status

All **16 technical applications plus the Module 17 quiz** are included. The prior review's corrections were **already present** in the latest review baseline and are retained here. This integration adds missing behavior, lesson guidance, explicit model limits, standards-scoped explanations, keyboard-accessible controls, and a corrected portal. Every one of the 17 modules passed a new Chromium interaction regression; mobile views at 390 px had no observed page-width overflow or JavaScript exceptions.

## Independently reported fixes retained (present in input baseline)

| Module | Finding from independent report | State in this revision |
|---|---|---|
| 2 | EPC diagram omitted PCRF/Gx | Retained fixed topology; reviewer had already merged it |
| 4 | Uplink flow text and zero-error RLC/HARQ expectation | Retained corrected narrative and retransmission boundary handling |
| 5 | PAPR understated by FFT-only sample peaks | Retained 4× oversampled OFDM measurements |
| 6 | Missing PCI/RSRP campus context | Retained lecture-derived exercise with synthetic measurements marked |
| 9 | CQI feedback signaling load off by factor 1,000 | Retained corrected unit conversion |
| 12 | PAPR requires time-domain oversampling | Retained 4× DFT-s-OFDM comparisons and sample CCDF |
| 14 | Excess-delay setting did not change frequency selectivity | Retained coupled channel frequency-response visualization |
| 17 | Too few diverse questions; no marked-answer study guide | Retained 372-question bank and per-module marked guide, linked from footer |

## Additional changes implemented in this integration

1. **Module 3 — TA lists and paging:** Added configurable registered-TA lists of size 1, 2 and 4 per UE, visualized registration footprints, list-aware boundary-triggered TAUs, a separate periodic TAU action, and paging to every cell in every registered TA. The nearest-area list selection is labeled a synthetic heuristic, not the MME's standardized allocation algorithm. Retained the original single-TA analytic cost curve, now explicitly labeled as **not** incorporating multi-TA lists or periodic updates. The map counts crossings separately from actual triggered TAUs. See 3GPP TS 23.401 §4.3.5.2 and §5.3.3.0.
2. **Module 15 — Release-specific SCell scheduling:** Expanded the cross-carrier scheduling tab with a cell-by-cell table: PCell self-scheduled via its PDCCH; configured SCell either uses its own PDCCH or, when it lacks one, is cross-carrier scheduled in the example. Corrected the CIF status label and added scope notes for LAA/newer configurations. The RE count remains clearly labeled as an illustrative control-region *upper allocation proxy*, not exact PDCCH bits or signaling overhead. See 3GPP TS 36.300 §11.1.
3. **All 17 modules — pedagogical structure:** Added a collapsible guided exercise with a module-specific prediction, an exploration step, an interpretation prompt, an optional student prediction field, and a link to the exact uploaded module PDF (or the Module 17 answer-marked guide).
4. **All 17 modules — model limits:** Added a second collapsible module-specific review note stating what its plots and calculations **do not** establish, including the difference between analytical bounds, schematic protocol models, synthetic measurements, and release-specific standards claims.
5. **Navigation/accessibility:** Marked tab groups and panels with role/selection semantics; made UE selection in Module 3 keyboard accessible, enlarged touch targets and supplied visible focus indicators; added reduced-motion CSS behavior. No claim of full WCAG auditing.
6. **Portal and quiz consistency:** Repaired outdated root-portal labels reporting 230/244 questions. The portal now consistently reports **372 questions (135 revised original and 237 new)**, links to the study guide, and exposes a short independent-review status page.

## Per-module reconciliation of outstanding review feedback

| Module | Review issue being addressed | Treatment in this release | Remaining boundary |
|---|---|---|---|
| 1 | Spectrum occupancy and ideal-vs-practical capacity | Guided experiment comparing fixed-SNR/fixed-power assumptions; explicit occupancy source warning | Allocation poster is not an exhaustive click-through database; no measured national occupancy supplied |
| 2 | EPC topology and conceptual/protocol distinction | PCRF/Gx retained; guided path-tracing and schematic model label | Not an executable EPC stack |
| 3 | Paging, TA lists, mobility costs | **Actual new interactive multi-TA behavior**, periodic update and paging fan-out | Analytic cost curve remains single-TA random-heading approximation |
| 4 | RLC/HARQ packet flow and conformance | Earlier verified fixes retained; layered protocol guidance | Detailed timers and sequence numbers not fully modeled |
| 5 | CP/PAPR waveform fidelity | 4× PAPR retained; lab-specific interpretation prompts | Not hardware-calibrated PA/fading model |
| 6 | PCI/RSRP slide context | Campus exercise retained; measured/synthetic distinction emphasized | Synthetic traces not field logs |
| 7 | Pilot interpolation generality | Dedicated pilot/noise prediction prompt and covariance limitation | No full calibrated MMSE, multiport codebook model |
| 8 | PBCH/DCI simplification | Physical/control-resource interpretation prompt; search-space limitations explained | No bit-accurate complete PHY receiver |
| 9 | CQI feedback units and coding context | Numerically corrected calculation retained; explicit CQI/BLER and Viterbi-vs-turbo warning | Thresholds are illustrative |
| 10 | Beamforming-vs-diversity conflation | Distinct learning targets for rank, array gain, diversity and spatial multiplexing | Ideal MIMO matrix/channel |
| 11 | Fairness-vs-throughput teaching | Guided comparison of PF and max-rate including Jain fairness | Synthetic traffic and scheduling |
| 12 | SC-FDMA waveform/PAPR | 4× oversampling retained; finite-trial limitation explained | No RF equipment calibration |
| 13 | RACH collision realism | Separate capture/detection limitation made explicit | Simplified collisions, ideal timing |
| 14 | Multipath delay slider and measurement context | Frequency-response correction retained; synthetic-vs-measured clarification | No actual field positioning dataset |
| 15 | Release-specific PCell/SCell interpretation | **New cell-by-cell scheduling DCI table** with configuration caveats | LAA and later CA modes outside basic LTE-A model |
| 16 | NR release assumptions, BWP/CORESET | Guided numerology exercise and explicit release-range scope warning | Not all Releases 15–20 or control combinations represented |
| 17 | Quiz breadth, marked answers, assessment integrity | 372 questions and answer-marked guide retained; guided practice/embedded-key warning | Historical instructor keys still need faculty adjudication before graded exams |

## Reproducible verification

- `tests/test_integrated_review.py` → `QA_INTEGRATION_BROWSER.json`: opens **17 modules**, checks guided panels and every tab, exercises representative control extrema, verifies new TA-list interactions and periodic update, verifies Module 15 PCell/SCell scheduling table, and verifies Module 17 count/footnote; no JavaScript page errors on tested paths.
- `tests/test_mobile_qa.py` → `QA_MOBILE_INTEGRATION.json`: loads all **17 modules at 390 px**, checks the presence of model scope panel and page error counts, and screens for page-level horizontal overflow; no observed overflow or page exceptions.
- `QA_INTEGRATION_NUMERIC.json`: formula checks, expected spectrum/CSI calculations, question-bank integrity, and counts.
- Prior independent test reports are retained unchanged (`QA_INDEPENDENT_COMPREHENSIVE_372.md`, `QA_INDEPENDENT_NUMERIC_372.json`, `QA_INDEPENDENT_BATCH_*.json`).

**Environment limit:** Headless Chromium testing uses inlined local CSS/JS because `file://` and loopback navigation are restricted. The extracted ZIP must still be smoke-tested on a faculty laptop in browsers used by students. File paths to uploaded lecture PDFs are preserved in the package.

## Formal remaining approval gates — do not mark as closed automatically

- Full release-by-release 3GPP normative conformance for all technologies and operating regimes.
- Faculty assessment of all **135 historical Respondus items**, including any question where historical release framing could make an additional distractor defensible; independent spot reviews do not confer grading approval.
- Browser and keyboard/screen-reader accessibility verification on actual learner machines (Chrome, Edge, Safari, mobile and classroom projection).
- Empirical validation/calibration against measured LTE/5G captures where the app would otherwise be mistaken for field performance; synthetic curves remain labeled.

**Recommendation:** Use the suite for *formative* teaching. Publish as assessed/graded content only after the above gates relevant to the chosen module have been completed.