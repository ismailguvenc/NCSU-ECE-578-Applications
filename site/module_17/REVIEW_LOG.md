# ECE 578 course-wide question bank — review log

## Composition

- **135** keyed legacy questions deduplicated from module-specific Respondus files M1–M15.
- The uploaded file named **Respondus, M16** is a consolidated duplicate of the same 135 legacy items, not a new NR-specific set.
- **109 newly authored** questions: 5 for every Module 1–15, plus 20 dedicated 5G NR Module 16 questions.
- **230 total** bank items; all retain one marked correct answer. Correct choices have an asterisk in the export file.

## Methodology / limits

The supplied asterisk is taken as the author-intended answer, not unassailable proof of correctness. Several unstarred alternatives also contained nontrivial inaccuracies; those were edited to restore one best answer. All 135 originals are retained as revised items with original wording in JSON for tracing. Quizzes are **practice material** rather than a secure exam system; JavaScript bank answers can be inspected by students. This work is a substantive first-pass editorial review, not a complete independent 3GPP compliance certification of every legacy statement.

## Targeted technical corrections

- Module 1 Q6: Original PAPR question was ambiguous; correct-antenna/PA comparison rewritten.
- Module 1 Q7: Original claim about packet duration vs. coherence time overly broad; revised.
- Module 2 Q8: GBR does not imply permanently reserved physical resource blocks; corrected.
- Module 3 Q6: Original source wording could imply non-configured UE reporting; revised scope.
- Module 4 Q1: Original seamless-handover context claim could give a second false answer; repaired.
- Module 4 Q3: HARQ runs in MAC, not transparently in RLC; false statement clarified to RLC ARQ.
- Module 6 Q8: Zadoff–Chu autocorrelation requires precise periodic-correlation terminology.
- Module 9 Q2: CQI should not be equated with radio-link-failure monitoring.
- Module 9 Q3: The original high-code-rate distractor contained a second incorrect statement.
- Module 10 Q4: SVD must not be portrayed as the mandated practical LTE precoder.
- Module 11 Q2: Power-control optimum is dependent on geometry/interference and not universal.
- Module 11 Q11: MBMS vs. evolved MBMS release histories require careful distinction.
- Module 13 Q6: Original universal PRACH configuration count/frequency assumptions were incorrect.
- Module 14 Q5: RSRQ formula omitted the RB count N and idle-mode usage was overstated.
- Module 15 Q2: SCell PDCCH can be configured; it is not universally absent.

## Other corrections

- Corrected typos, acronym casing, and a subset of ambiguous choices.
- Original answer keys, including their option positions, are preserved.
- New 5G items distinguish Release-15+ NR numerology and core concepts from older LTE-only statements.

## Suggested further faculty QA

Check all dated LTE/UMTS release claims and strongly quantified conformance statements against the intended release; double-check MBSFN broadcast chronology, HARQ process maxima, specific handover restrictions, and frame-specific PSS/SSS details. Where a question involves an implementation-specific tradeoff, classroom explanations should mention operating assumptions.

## November 15, 2026 — Post-Module-16 extension
- Added 14 entirely new, explained questions to address missing lab topics: TAU registration list/paging, OTDOA RSTD errors, LTE measurement gaps and ACIR, LTE-A relay throughput/cross-carrier scheduling, and NR SSB resource size, CORESET CCEs, NTN delays, O-RAN applications, mini-slots, CBRS and VLC.
- Final cumulative bank: **244 questions** = 135 revised instructor-keyed originals + 109 new questions. Answer explanations CSV and Respondus asterisk-keyed export regenerated.
- Updated results links to the now-implemented module applications. Reviewed answer marking and source preservation programmatically; full item-level faculty/3GPP audit remains outstanding.

## 2026-11-15 expansion to 372 questions

Added 128 new single-answer questions (eight per technical module), bringing the total to 372 (135 legacy instructor-keyed and 237 new). New items emphasize numerically solvable links, operational reasoning, and conceptual contrasts across every module. Correct-answer asterisks retained in exported Respondus TXT, CSV refreshed, and an offline static by-module study guide created with answer markings and explanations. Further faculty approval required for graded use. Four small grammar corrections made: [('M01-O05', 'necessitate the use', 'necessitates the use'), ('M01-O08', 'categority-5', 'category 5'), ('M11-O11', 'happens trough Physical', 'happens through Physical'), ('M14-O05', 'In LTE (Release 8. RSRP', 'In LTE Release 8, RSRP')]