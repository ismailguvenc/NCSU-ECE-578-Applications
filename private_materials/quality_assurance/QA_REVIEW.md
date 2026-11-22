# Current QA pointer — R3 integrated review

For the latest integrated findings and per-module disposition, see **QA_REVIEW_INTEGRATION.md**. For the original independent review, see **QA_INDEPENDENT_COMPREHENSIVE_372.md**.

All 17 applications have implementation and tested representative controls; **none has been declared universally 3GPP-conformant or approved as graded examination material**.

---

## Independent review, 372-question release

See `QA_INDEPENDENT_COMPREHENSIVE_372.md` for independently retested modules, 8 correction categories and scientific caveats. The new root study guide has 372 keyed answers. Full specialist certification remains pending.

---

# QA REVIEW — Current cumulative handoff, 2026-11-15

**Important:** All 16 technical applications plus Module 17 have initial implementations. Developer browser/numeric checks succeeded, and the independent reviewer completed one **partial pass** on Modules 1–4, but **NO module is fully independently certified**. The prior QA notes below are historical and may refer to earlier build states.

### Independent review received and corrections merged

- Independent reviewer first pass (2026-11-15 evening): Modules 1–4, 33 navigation tabs, zero JS exceptions; Modules 1–4 remain **Needs Work**. Three reviewer findings: (i) missing EPC policy/PCRF node and Gx relationship in Module 2, (ii) inaccurate uplink packet-layer narration in Module 4, (iii) expected retry-count edge case at failure probability 1. All three were independently verified and corrected in the latest developer branch. **Original reviewer package from a separate automation thread was not available in the current container; edits were reconstructed from the reviewed findings rather than replacing newer files wholesale.**
- Module 1 further developer/educational gap review added two full interactive labs for Slide 16 (Shannon with fixed-SNR vs fixed-power bandwidth assumptions, capacity curve) and Slide 18 (3×6×56 area-capacity cube, separating single-link capacity and spatial reuse). Verified 20MHz/10dB =69.2Mbps, 40MHz fixed SNR=138.4Mbps, 40MHz fixed power=103.4Mbps /6.99dB, default cube=1,008×, and 9-tab JS runtime with zero exceptions. This is still **not full independent approval**.
- Module 14 cross-reference slide gap review added a three-path Doppler fading visualization and an inter-frequency measurement gap duty-cycle lab (6 ms gaps at 40 or 80 ms repetition), in addition to positioning, path-loss, EVM, mobility, interference, HetNet, SON and system metrics.
- Module 17 gap review added 14 explicitly sourced/self-contained questions on Module 3 paging/TAU and Module 14–16 topics. Totals: 244 questions (135 originals with preserved keyed answer and review history, 109 new), with Respondus asterisk export and answer rationale CSV. Detailed faculty vetting remains outstanding.

### Developer test reports (do NOT interpret as independent validation)

- `QA_FULL_SUITE_BROWSER_PASS2.json` — 16 technical apps, each tab navigated, Modules 5–16 quiz flows, Module 17 bank filter and portal. 0 JS exceptions after fixing a null output in Module 1 Shannon tab. 17 ready module links. The `file://` runtime path could not be tested because the automated Chromium environment blocks direct file URL navigation; testing uses inlined bundled JS/CSS.
- `QA_BROWSER_TEST_14-16.json` — Modules 14–16 10+7+13 learning tabs and three 10-question quizzes, varied input limits, no exceptions.
- `QA_NUMERIC_14-16.json` — 18/18 numeric sanity checks spanning no-noise OTDOA, FSPL, EVM, measurement-gap overhead, CA, MIMO rank, DF relay, NR SCS/slot, SSB, CCE, NTN latency, repetition and VLC.
- Previous developer checks retained: `QA_BROWSER_TEST_9-13.json`, `QA_BOUNDARY_TEST_9-13.json`, `QA_NUMERIC_TEST_9-13.json`, and Module 5–8 scripts.

### Remaining QA by module and scientific risks

| Module | QA verdict | Specific high-priority review |
|---|---|---|
| 1 | **Needs Work** | Review allocation band descriptions against FCC/NTIA source and timestamps, verify complete source image export/zoom, capacity and aperture assumptions, all quiz answers, contrast/accessibility. |
| 2 | **Needs Work** | Confirm all EPC entities, S1/X2/Gx, NAS/AS, bearer setup, source routing and handover message chronology with slide deck. PCRF/Gx merged. |
| 3 | **Needs Work** | Compare A1–A6/B1–B2 trigger logic, RSRP/RSRQ definition, TA lists, periodic TAU and paging fan-out to slides; clarify analytic square-TA simulation scope. |
| 4 | **Needs Work** | Deep audit PDCP/RLC TM/UM/AM, separate HARQ/RLC retransmission timing and ACK/NACK, DRX; reviewer fixes merged. |
| 5 | Pending | PAPR finite sampling/oversampling, CP tradeoffs, CFO vs timing offset, error-model consistency, 3GPP symbol timings. |
| 6 | Pending | PSS actual LTE 62-tone extraction vs ideal 63 ZC root, FDD/TDD SSS positions, PCI and CRS mapping, sync detection performance. |
| 7 | Pending | Pilots: 0/1 and 2/3 port CRS exact patterns; WSSUS vs synthetic channel; true MMSE versus smoothing approximation. |
| 8 | Pending | PBCH 40ms combining illustration not BLER model, CCE/REG count and reserved RE, DCI format exactness, LTE release assumptions. |
| 9 | Pending | CQI mapping illustrative, BLER curves synthetic, Viterbi teaching code not LTE turbo code, FDD HARQ timing. |
| 10 | Pending | MIMO real toy H vs complex channels, LTE codebook selection, eigen/SVD, spatial modes vs beamforming diversity, array power normalization. |
| 11 | Pending | PF fairness time averaging and normalized channel quality, full-RB scheduler vs one-TTI proxy, cell-edge interference and MBSFN. |
| 12 | Pending | SC-FDMA localized/distributed standardization, waveform sampling and CCDF validity, SRS/DM-RS time maps and power model. |
| 13 | Pending | RACH collisions/PRACH config and sequence, TA unit conversion, UL power-control equation and saturation. |
| 14 | Pending | OTDOA timing geometry and hearability, fading coherence vs Doppler, EVM assumptions, measurement gaps, FDD ACIR/ACS, CRE/ABS, SON. |
| 15 | Pending | CA 5×20 MHz Release 10 vs other releases, PCell/SCell PDCCH optionality, CSI-RS, relay backhaul resource accounting, eICIC. |
| 16 | Pending | NR FR1/FR2/release scope, numerology exceptions, CP and PRB arithmetic, SSB/SS-RSRP beam assumptions, CORESET aggregation, 5GC/NSA/O-RAN, mmWave aperture, MIMO pilot contamination, NTN, URLLC and spectrum sharing. |
| 17 | Pending | All 244 keys and distractors need independent one-answer/ambiguity check; provenance for 135 original preserved; Respondus export correctness, explanations, pedagogical breadth and score reliability. |

**QA release rule:** A module passes only after (a) complete relevant slide-to-feature checklist, (b) technical/math/standards/quiz audit, (c) browser and calculation tests incl. edge cases, (d) usability/accessibility/pedagogical review, (e) documented corrections and retests. Otherwise label it Needs Work / Pending / Blocked with evidence and assumptions.

---

## Earlier QA notes retained for historical traceability

# ECE 578 Interactive Learning Laboratory — Preliminary Quality Review

**Date:** 2026-11-15  
**Scope:** Initial interactive smoke tests Modules 1–13, numerical checks Modules 5–13.  
**Status:** Preliminary developer verification, **not** the independent technical/pedagogical review. Independent reviewer scheduled for 2026-11-15 at approximately 19:00 America/New_York; no completed review or approved findings were available when this package was built.

## Review status by module

| Module | Technical build | JS/browser smoke | Numerics/quiz QA | Pedagogical coverage assessment | Independent QA |
|---|---|---|---|---|---|
| 1: Spectrum and Capacity | Existing prototype | HTML loads without JS errors in inlined browser smoke | Not rerun in this batch | Needs exact Slide 15 chart/link and Shannon/fixed-power scenario verification | Pending |
| 2: Network Architecture | Existing prototype | 8/8 tabs exercised, no JS page errors | Not independently verified | Review EPC, NAS/AS, bearer and handover correctness against full slides | Pending |
| 3: Control Plane | Existing prototype | 9/9 tabs exercised, no JS page errors | TAU analytic approximations not fully benchmarked | Confirm TA list, paging fan-out and TAU rules; note currently simplified isotropic square TA mobility model | Pending |
| 4: User Plane | Existing prototype | 9/9 tabs exercised, no JS page errors | Not independently verified | Confirm HARQ timing and RLC/PDCP process examples and standard releases | Pending |
| 5: OFDMA | New prototype | 10/10 tabs including quiz, no JS page errors | 4/4 numerics/quiz checks passed | Broad coverage of orthogonality, transforms, modulation, CP, PAPR, offsets, scheduler | Pending |
| 6: DL PHY & Search | New prototype | 8/8 tabs including quiz, no JS page errors | 3/3 checks passed | Covers frame, resource grid, sync, ZC, PCI and receiver; 3GPP mapping simplified | Pending |
| 7: RS and Channel Estimation | New prototype | 8/8 tabs including quiz, no JS page errors | 2/2 checks passed | Covers CRS, RS types, LS estimation, interpolation, WSSUS, time/spatial correlation | Pending |
| 8: Downlink Channels | New prototype | 9/9 tabs including quiz, no JS page errors | 3/3 checks passed | Covers broadcast, shared, multicast and control PHY channels | Pending |
| 9: Link Adaptation | New prototype | 8 tabs including quiz, 0 JS errors | Boundary + 3 numeric checks pass | CQI mapping, decoder and BLER are intentionally simplified; detailed coded transport and FDD timing need QA | Pending |
| 10: MIMO & Beamforming | New prototype | 8 tabs including quiz, 0 JS errors | Boundary + 3 numeric checks pass | Real 2×2 matrix, rayleigh outage and codebook are pedagogical; detailed LTE precoding needs QA | Pending |
| 11: Scheduling & ICIC | New prototype | 8 tabs including quiz, 0 JS errors | Boundary + 3 numeric checks pass | PF sim and ICIC use synthetic channel and no real traffic queues; MBMS simplified | Pending |
| 12: Uplink PHY | New prototype | 8 tabs including quiz, 0 JS errors | Boundary + 3 numeric checks pass | Actual DFT but under-sampled PAPR; RS timing largely schematic | Pending |
| 13: Uplink Channels | New prototype | 9 tabs including quiz, 0 JS errors | Boundary + 3 numeric checks pass | RACH collision/capture model simplified; TA and PUSCH power formula verified | Pending |
| 14–16 | Not implemented | N/A | N/A | Planned according to ROADMAP.md | Pending |
| 17: Comprehensive Quiz | Existing prototype | Separate previous browser checks | Previous review is preliminary | Additional cross-check as Modules 5–16 mature | Pending |

## Targeted numerical checks (12/12 pass)

- Module 5: ten-question quiz yields 10/10 following keys; ideal channel with adequate CP produces ~0% EVM; inadequate CP produces 24.5% EVM for the tested realization; integer-normalized tone spacing gives zero sinc inner product.
- Module 6: ten-question quiz; perfect length-63 ZC cyclic autocorrelation at shift 7 (root 25); PSS ID 0 correctly detected with a four-sample delay at 22 dB nominal SNR, zero CFO.
- Module 7: ten-question quiz; linear channel-estimate NMSE improved from 0.3768 at 0-dB SNR to 0.0122 at 30-dB SNR for the identical channel realization.
- Module 8: ten-question quiz; one CCE maps 9 REG × 4 RE × 2 bits = 72 coded QPSK bits; more control symbols and two-port CRS lower data-RE share for the simplified central-RB example (89.3% -> 71.4%).

## Known boundaries and items requiring specialist review

1. No new app is represented as a fully standards-conformant stack or protocol emulator. All approximations are labeled in the module UI.
2. Module 5 uses finite-rate PAPR samples without waveform oversampling, and scheduling uses a one-interval proportional-fair *proxy*, not an actual exponentially averaged PF algorithm. The timing tolerance chart is symmetric and explicitly approximate.
3. Module 6 RS/SSS/PSS visualization uses simplified CRS/physical grid; the ZC tab uses full length-63 ideal CAZAC whereas the transmitted PSS uses 62 active subcarriers after DC omission. The PSS detection lab includes 62-tone frequency mapping but not multipath or acquisition over the entire frame.
4. Module 7 pilot-interpolation comparisons use an adjustable 1D comb and a three-point smoothing estimator, not the complete LTE 2D CRS pilot positions or true MMSE/Wiener estimator. Detailed standardized 2/4-port CRS mapping and MBSFN RS are best reserved for follow-up QA additions.
5. Module 8 PBCH success curve is an independent repeat probability illustration and is **not** LTE PBCH combining/BLER. PDCCH CCE resource availability is shown only as an optimistic upper bound, not a count of real simultaneous DCI candidates. DCI examples are descriptive rather than bit-exact.
6. Avoid calling the review complete until all key slides, controls, explanations, physical-layer equations, quiz options and edge cases have been independently checked. Independently merge review findings only from a snapshot newer than this package; preserve source revisions with version tracking.
7. The environment's browser blocks direct `file://` navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`). Testing in this batch inlined local JS/CSS into Chromium to exercise all interactions. In a normal browser, the ZIP should be extracted before opening `ECE578_Learning_Lab/index.html`.

## Reproducible test artifacts

- `test_lab.py`: browser smoke tests of Modules 5–8 (controls and all quizzes).
- `qa_numeric.py`: twelve targeted numerical/quiz checks using Chromium.
- `prelim_review_1_4.py`: initial tab and input checks for Modules 1–4. **Note:** this utility imports `test_lab.py` and therefore also runs the Modules 5–8 smoke tests on import.

## Review handoff

The independent reviewer should begin with Modules 1–4, explicitly record defects/repairs, retest and update this document. Modules 5–8 are now available for the next review batch; future developer work may proceed with Module 9. Do not overwrite newer source snapshots.

## Module 9–13 developer verification update (2026-11-15)

**Validation status:** Developer-tested prototypes only. These five modules are not yet independently pedagogically reviewed or approved.

- **Browser smoke tests:** `QA_BROWSER_TEST_9-13.json` shows 41 tabs, of which 36 are interactive teaching sections and 5 are quiz panels. The browser ran inlined module source (to avoid administrator blocking of file URLs). Zero unhandled JS page errors, each lab rendered a visualization.
- **Input boundary tests:** `QA_BOUNDARY_TEST_9-13.json` exercises extremes on each control and runs every quiz to the score screen (50 questions); all five modules passed.
- **Targeted numeric tests:** `QA_NUMERIC_TEST_9-13.json` records 15/15 checks for CQI, 10% BLER threshold, convolutional/Viterbi no-noise, two-channel MIMO capacity, ideal steering direction, Jain equality, waterfilling, scheduling counts, PAPR, ZC correlations, TA units and preamble collision expectation.
- **Bug caught and repaired:** Module 12 SRS tab initially referred to an undeclared `lin` helper and displayed a simulation error. This was corrected and the full browser suite rerun.
- **Independent review status:** The separate review agent is still scheduled; no completed independent findings were available for Modules 1–4 at the point of this batch. Its verdicts must be merged only after verified source-version reconciliation.

### Important follow-up review points

1. **Module 9:** SINR-to-CQI reference thresholds are illustrative, not a universal standardized mapping. The rate-1/2 (7,5) convolutional code is a teaching example, not the LTE turbo transport code. Turbo iteration curve and BLER formula are *toy models*.
2. **Module 10:** MIMO matrices are real toy matrices, equal-power 2×2 capacity assumes ideal Gaussian signaling, and PMI/ULA beamforming omits 3GPP codebook mapping and realistic calibration. SFBC and Alamouti are conceptual.
3. **Module 11:** Scheduling uses synthetic independent link variation and one UE per TTI (not exact LTE RB scheduling), PF uses a simplified exponential average, ICIC is a block-pattern illustration, and the MBMS comparison omits weak-user MCS adaptation.
4. **Module 12:** PAPR is based on discrete 64-sample symbols and does not include oversampling or RF pulse shaping. The SC-FDMA distributed mode is conceptual rather than Release-8 PUSCH; SRS frequency/power and ZC length are pedagogical.
5. **Module 13:** The PRACH model counts uniquely selected preambles and treats collided selections pessimistically. PRACH format CP/TSEQ values checked against ETSI 3GPP TS 36.211 Rel-9 §5.7.1, and fractional power-control equation against TS 36.213 §5.1.1. The TA slider implements a simplified geometry-derived command and omits hardware timing biases.
6. Full technical, pedagogical, accessibility and standards audit of Modules 1–13 remains a separate recurring reviewer task, not part of the current passing developer smoke tests.

### Quiz-option bias correction (review-led, 2026-11-15)
The common quiz renderer had answer-position bias because some module source items stored all correct keys at index zero. `shared/core.js` now rotates visible option order per question while continuing to map answer feedback to its original keyed index. Verified every keyed answer in all 12 modules 5–16: **120/120** selections produced the expected correct feedback and **12/12 10/10 final scores**. This improves assessment integrity but does **not** independently establish semantic accuracy of the correct key or of every distractor. See `QA_QUIZ_KEYED_5-16.json`.

### Module 14 — independent pedagogical control audit correction
The `Fading & Doppler` tab previously exposed an excess-delay slider that changed a label but not the channel plot. Added a separate frequency-response plot computed using the same three multipath coefficients and delays (H(t,Δf) = Σaᵢ e^{j(2π fD,i t + φᵢ − 2π Δf τᵢ)}). Changing excess delay now modifies channel frequency selectivity, while changing speed modifies time selectivity. Re-ran Module 14–16 browser interaction tests with no JS errors. This is a targeted defect fix, not full independent standards approval.

### Quiz-option bias correction (review-led, 2026-11-15)
The common quiz renderer had answer-position bias because some module source items stored all correct keys at index zero. `shared/core.js` now rotates visible option order per question while continuing to map answer feedback to its original keyed index. Verified every keyed answer in all 12 modules 5–16: **120/120** selections produced the expected correct feedback and **12/12 10/10 final scores**. This improves assessment integrity but does **not** independently establish semantic accuracy of the correct key or of every distractor. See `QA_QUIZ_KEYED_5-16.json`.