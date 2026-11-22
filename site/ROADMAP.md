# Delivery status: all technical Modules 1–16 and cumulative Quiz Module 17 have initial implementations (2026-11-15). Independent QA is ongoing. See `PROJECT_PROGRESS.md` and `QA_REVIEW.md` for current status.

# ECE 578: LTE and 5G Communications — Interactive Application Roadmap
NC State University · Draft design specification

## Architecture and common style
One integrated standalone web application for each module (0–16); Module 0 can be optional. Modules 5, 14, 16 are naturally broader, and can have internal subtabs or collapsible labs. No application count should be split by topic unless the instructor later directs it.

- Consistent dark UI, NC State red highlights, left controls, central experiment visualization, right insight/details and top KPI strip.
- Top menus: Background, Description, Glossary; per-tab citations to source slides and standards.
- Parameter presets, controls with units, reset, curated what-if scenarios; cross-links to earlier/later modules.
- Explicit tags: analytical / simplified simulation / 3GPP-defined mapping, and model assumptions and validity ranges.
- 10-question Knowledge Check tab for every module: immediate rationale, scoring, final total, optional retake.
- Expose course-specific nomenclature ECE 578: LTE and 5G Communications and NC State University and module number.

## Module-by-module tabs

### Module 0: Course Roadmap & Foundations
Source: Module-0 slide deck (25 pages).

| Tab | Description |
|---|---|
| Course Roadmap | Navigate the 16 technical modules and prerequisite links. |
| Wireless Evolution | Interactive 1G–6G technology and timeline comparison. |
| Theory vs Practice | Match communications principles to LTE/5G features. |
| Readiness Check | Short SNR, dB, modulation, and channel-model exercises. |
| Research Projects | Explore MATLAB, GNU Radio, SDR and example project workflows. |
| Knowledge Check | 10-question diagnostic quiz. |

### Module 1: Spectrum, Shannon Capacity & LTE Fundamentals
Source: Module-1 slide deck (57 pages).

| Tab | Description |
|---|---|
| Spectrum Atlas | Click/zoom FCC/NTIA allocation bands; service, sharing, regulatory detail. |
| Shannon Capacity | Set B, SNR/SINR, power and noise density; compare constant-SNR and fixed-power assumptions. |
| Spectral Efficiency | Compute bit/s/Hz, compare ideal and practical overhead, peak/cell/user/edge metrics. |
| Capacity Cube | Combine spectrum, spectral efficiency and spatial frequency reuse; 3×6×56≈1008 example. |
| Propagation & Antennas | FSPL, wavelength, antenna size, fixed physical aperture and array gain. |
| LTE Performance | Peak DL/UL rate, cell vs edge throughput, UE loading, mobility and latency constraints. |
| LTE Evolution | 1G–5G, regulatory roles, standardization, LTE technologies and UE categories. |
| Knowledge Check | 10-question quiz, immediate feedback and final score. |

### Module 2: LTE Network Architecture
Source: Module-2 slide deck (43 pages).

| Tab | Description |
|---|---|
| Interactive EPC Topology | UE/eNodeB/MME/S-GW/P-GW/HSS/PCRF packet and signaling paths. |
| Network Nodes | Select node, see role, interfaces and state. |
| AS vs NAS | Animate UE procedures and which entities exchange messages. |
| Bearers & QoS | Configure QCI, traffic type, bearer creation and prioritized packets. |
| Roaming | Home vs visited network, gateway selection and routing. |
| X2 Handover | eNodeB-to-eNodeB messaging, data forwarding and continuity. |
| Protocol Stacks | Compare control/user plane stacks, S1 and X2 interfaces. |
| Knowledge Check | 10-question architecture quiz. |

### Module 3: Control Plane, Cell Selection & Handover
Source: Module-3 slide deck (50 pages).

| Tab | Description |
|---|---|
| RRC State Machine | Idle/connected states, transitions, signaling, resource usage. |
| System Information | MIB, SIBs, broadcast timing and LTE/NR differences. |
| Cell Selection | RSRP thresholds and suitable-cell criteria with movable UE. |
| Cell Reselection | Priorities, ranking, hysteresis and speed-dependent reselection. |
| Measurements | RSRP/RSRQ/RSSI/SINR comparisons and measurement filtering. |
| Handover Lab | A3 thresholds, hysteresis, time-to-trigger, ping-pong and failures. |
| Event Triggers | A1–A6 and inter-RAT reporting events with live triggers. |
| **Paging & Tracking Area Updates** | **Animated map of cells grouped into tracking areas (TAs), UE movement, idle-mode TA registration/TAU, MME-to-eNodeB paging fan-out, and the tradeoff between tracking update overhead and paging overhead.** |
| Knowledge Check | 10-question RRC/mobility quiz, including paging/TAU tradeoff questions. |

**Detailed design: Paging & Tracking Area Updates tab**  
*Lecture link:* Module-2 slides 14–15 (NAS paging/TAU and large-vs-small TA question); Module-3 slides on NAS, RRC_IDLE paging, SIB1 tracking-area code, and idle-mode cell camping. This is a Module-3 application tab with an explicit Module-2 cross-reference.

- **Animated network view:** A hexagonal (optionally square) cell grid, configurable TA groupings, each TA color-coded. One or more RRC_IDLE UEs move along paths. At a registered-TA boundary the app shows a Tracking Area Update (TAU); an incoming downlink event causes the MME to page the corresponding eNodeBs and the eNodeBs to page over the air. Toggle overlays for TA boundaries, UE trails, paging fan-out, and signaling message paths.
- **Adjustable parameters:** number of cells; cells per TA; TA geometry; cell radius; UE count; UE speed and trajectory (including boundary-following and commuter routes); paging arrivals per UE per hour; TAU signaling cost; per-cell paging cost; and optional multiple-TA registration lists. Compare a small TA (e.g., four cells) with a large TA (e.g., 16 or 36 cells) while holding the remaining assumptions fixed.
- **Live metrics:** TA boundary crossings and TAUs per UE/hour; pages per hour; eNodeBs contacted per page; estimated paging and update signaling messages/hour; UE battery-relevant signaling events (qualitative or explicitly modeled); and total weighted signaling load. Include both core-network paging distribution and radio-interface paging costs rather than treating all messages as equal.
- **Tradeoff chart:** Plot tracking-area update load, paging load, and weighted total load versus TA size. Larger TAs generally reduce boundary crossings for a given mobility pattern but enlarge paging fan-out. Illustrate that the optimal TA size depends on *mobility, paging arrival rate, UE population/distribution, cell/TA geometry, registration-list policy, and relative signaling costs*; it is not determined by the number of cells alone.
- **Two learning scenarios:** (a) frequent movement with relatively few incoming pages, favoring lower update burden; (b) low mobility with frequent incoming pages, favoring more targeted paging. Add city/rural presets as **illustrative assumptions**, never measured occupancy or network traffic data without a source.
- **Assumptions and exceptions:** In LTE, a TAU is triggered when the UE moves outside its *registered TA list* (and can also occur periodically), not at every cell handover or necessarily at each individually drawn TA border. In a basic LTE paging example, the MME pages eNodeBs in the registered TA(s); operators can use paging optimizations such as staged paging. Make this distinction explicit.
- **Check your understanding:** Include a few of the shared ten-question Module-3 quiz items on paging fan-out, TAU triggering, and the tradeoff between TA size and overall signaling cost.


### Module 4: User Plane Protocols
Source: Module-4 slide deck (44 pages).

| Tab | Description |
|---|---|
| Packet Journey | Trace packet from IP to PDCP, RLC, MAC and PHY and back. |
| PDCP | Header compression, ciphering, numbering and handover forwarding. |
| RLC | TM/UM/AM tradeoffs, losses and retransmission. |
| Segmentation | Adjust SDU/PDU lengths and observe reassembly overhead. |
| MAC & HARQ | Transport blocks, retransmission and ACK/NACK timing. |
| Channel Mapping | Logical/transport/physical channel mapping, DL and UL. |
| Scheduling & DRX | Dynamic/SPS assignment, DRX cycles, delay/energy tradeoff. |
| Knowledge Check | 10-question Layer 2 quiz. |

### Module 5: OFDMA & OFDM
Source: Module-5 slide deck (91 pages).

| Tab | Description |
|---|---|
| Subcarrier Orthogonality | Complex sinusoids and overlapping sinc spectra, Δf and symbol duration. |
| OFDM Transceiver | QAM mapper, IFFT/FFT, CP and time/frequency waveform. |
| Multipath & CP | Delay spread, ISI/ICI and equalization with varying CP length. |
| Modulation Constellations | BPSK/QPSK/16-/64-QAM and noisy scatter plots. |
| PAPR & Amplifiers | CCDF, clipping, power amplifier backoff, EVM and spectral regrowth. |
| Carrier/Timing Errors | CFO, Doppler, sampling/timing errors; ICI/SIR consequences. |
| OFDMA Scheduling | Allocate resource groups to multiple UEs; channel-dependent gains. |
| LTE Parameter Design | Choose subcarrier spacing, FFT, symbol/CP durations and resource counts. |
| Knowledge Check | 10-question OFDM/OFDMA quiz. |

### Module 6: Downlink Physical Layer & Cell Search
Source: Module-6 slide deck (44 pages).

| Tab | Description |
|---|---|
| LTE Frame Explorer | 10ms frame, subframes, slots, RE/RB units, normal/extended CP. |
| FDD vs TDD | Configure LTE duplex/frame structures and special subframe timing. |
| DL Signal Chain | Scrambling, layers, precoding, RE mapping and OFDM. |
| Cell Search | UE initial search and synchronization steps. |
| PSS/SSS & PCI | Signal placement, three PSS groups, 168 SSS groups, 504 PCIs. |
| Zadoff–Chu | Sequence properties, autocorrelation, cross-correlation and offsets. |
| Sync Accuracy | CFO, timing uncertainty, coherent/noncoherent detection effects. |
| Knowledge Check | 10-question PHY/synchronization quiz. |

### Module 7: Reference Signals & Channel Estimation
Source: Module-7 slide deck (41 pages).

| Tab | Description |
|---|---|
| Reference Signal Atlas | CRS, UE-specific DM-RS, CSI-RS and positioning/MBSFN pilots. |
| Ports & Pilot Grids | 1/2/4-port CRS layouts, cell-ID-dependent shifts. |
| Channel Models | PDP, Doppler, delay spread, WSSUS and fading examples. |
| Pilot-Aided Estimation | LS vs interpolated/LMMSE-style estimates, pilots and MSE. |
| Pilot Density Tradeoffs | Overhead versus accuracy versus channel coherence. |
| Time/Frequency/Space | Estimation using time correlation, frequency correlation and antenna correlation. |
| Knowledge Check | 10-question reference-signal quiz. |

### Module 8: Downlink Data & Control Channels
Source: Module-8 slide deck (43 pages).

| Tab | Description |
|---|---|
| Channel Atlas | PBCH, PDSCH, PMCH, PCFICH, PHICH, PDCCH and channel mapping. |
| PBCH & MIB | Central six RBs, PBCH repetition, cell-edge reliability. |
| PDSCH Allocation | Grid-level RE accounting, localized/distributed RB mapping and throughput. |
| Control Region | CFI/control-symbol tradeoffs and PDSCH share. |
| PDCCH & CCE | DCI aggregation level, robust signaling, control channel elements. |
| DCI Decoder | Inspect illustrative DCI fields and Type-0/RBG allocations. |
| Overhead Tradeoff | Vary bandwidth, antenna ports, pilots and control usage. |
| Knowledge Check | 10-question DL-channel quiz. |

### Module 9: Link Adaptation, CQI, Coding & HARQ
Source: Module-9 slide deck (27 pages).

| Tab | Description |
|---|---|
| CQI/MCS Explorer | SNR/SINR, CQI, MCS, code rate, modulation and spectral efficiency. |
| BLER Curves | Idealized BLER waterfalls and 10% target threshold. |
| Throughput | SNR-dependent throughput, outage and link adaptation vs fixed MCS. |
| Feedback | Wideband/subband CQI, periodicity, mobility and stale CSI. |
| Channel Coding | Interactive convolutional code and turbo-code conceptual encoder. |
| HARQ Timeline | Stop-and-wait, parallel processes, retransmission and latency. |
| Knowledge Check | 10-question link adaptation quiz. |

### Module 10: Multiple-Antenna Techniques
Source: Module-10 slide deck (73 pages).

| Tab | Description |
|---|---|
| SISO/SIMO/MISO/MIMO | Compare antenna counts and idealized channel realizations. |
| Diversity | MRC, transmit diversity, Alamouti/SFBC and error-rate benefits. |
| Spatial Multiplexing | 2×2 channel matrix, rank, singular values, parallel streams. |
| CSI & Precoding | RI/PMI/CQI feedback, codebook choices and closed/open loop. |
| Beamforming Array | ULA spacing, phase steering, gain, beamwidth, sidelobes and grating lobes. |
| SU-MIMO vs MU-MIMO | Allocate streams to users; throughput versus interference/fairness. |
| Aperture & Frequency | Fixed-size aperture against wavelength, gain and element density. |
| Knowledge Check | 10-question antenna/MIMO quiz. |

### Module 11: Scheduling, Interference Coordination & Broadcast
Source: Module-11 slide deck (42 pages).

| Tab | Description |
|---|---|
| Multiuser Scheduler | Live queue/channel resources and proportional fair/round robin/max rate. |
| Fairness Dashboard | Jain index, cell throughput, edge throughput and delay distributions. |
| Power Allocation | Water-filling versus equal power over channels. |
| Interference & Reuse | Neighbor cells, reuse-1 and cell-edge SINR. |
| ICIC & FFR | Fractional frequency reuse, RNTP/OI/HII and power control. |
| MBSFN & Broadcast | Unicast vs multicast, synchronized BSs, subframe patterns and CP. |
| Knowledge Check | 10-question scheduling and interference quiz. |

### Module 12: Uplink PHY & Reference Symbols
Source: Module-12 slide deck (33 pages).

| Tab | Description |
|---|---|
| OFDMA vs SC-FDMA | OFDM compared to DFT-spread OFDM in waveforms and spectra. |
| PAPR Lab | PAPR CCDF, amplifier efficiency and modulation choice. |
| DFT-Spread Transceiver | Block by block DFT, subcarrier mapping, IFFT and receive inverse. |
| Frequency Allocation | Localized/distributed SC-FDMA, cluster hopping, contiguous resource constraints. |
| UL Reference Signals | DM-RS, SRS, pilot insertion and sequence allocation. |
| UL Channel Estimation | Compare sounded bands, overhead, SINR and estimation accuracy. |
| Knowledge Check | 10-question uplink PHY quiz. |

### Module 13: Uplink Channels, Random Access & Power Control
Source: Module-13 slide deck (41 pages).

| Tab | Description |
|---|---|
| PUSCH/PUCCH Grid | Uplink physical resources, RB edges, data and UCI placement. |
| Scheduling & Hopping | SRS-based frequency-selective scheduling and diversity hopping. |
| Uplink Control | SR, ACK/NACK, CQI/PMI/RI on PUCCH/PUSCH. |
| Random Access Procedure | Four-step contention-based RACH message sequence and contention-free contrast. |
| PRACH Collisions | Number of UEs/preambles, collision probability and random access delays. |
| Preamble & Cell Radius | PRACH formats, CP, delay spread and maximum supported propagation delay. |
| Timing Advance | Distance-dependent uplink timing alignment. |
| Uplink Power Control | Fractional path-loss compensation α, P0, limits and interference. |
| Knowledge Check | 10-question uplink access quiz. |

### Module 14: Practical LTE Deployment
Source: Module-14 slide deck (82 pages).

| Tab | Description |
|---|---|
| UE Positioning | A-GNSS, OTDOA hyperbolas, enhanced Cell-ID, error geometry. |
| Radio Propagation | Path-loss/shadowing/fading, PDP, Doppler and ITU scenarios. |
| RF Compliance | EVM, spectral mask, adjacent-channel/OOB/spurious emission. |
| Mobility Measurements | RSRP/RSRQ, gaps, handover timing and TTT effects. |
| FDD/TDD Spectrum | Paired/unpaired carriers, reciprocity and cross-link interference. |
| HetNet Simulator | Macro/pico/femto coverage, cell-range expansion and offload. |
| SON Laboratory | PCI planning, ANR, load balancing, mobility robustness and energy-saving. |
| System KPIs | Cell/edge throughput, spectral efficiency, overhead, distributions. |
| Knowledge Check | 10-question deployment quiz. |

### Module 15: LTE-Advanced
Source: Module-15 slide deck (34 pages).

| Tab | Description |
|---|---|
| Rel-10 Targets | Compare baseline LTE vs LTE-A targets, throughput and efficiency. |
| Carrier Aggregation | Component carriers, up to five 20MHz carriers, PCell/SCell, cross-carrier scheduling. |
| LTE-A MIMO | Enhanced spatial layers, CSI-RS and per-layer throughput. |
| Relays & Repeaters | Relay architecture, SNR, latency and backhaul tradeoffs. |
| HetNet eICIC | Cell range expansion, almost blank subframe patterns and SINR. |
| Network Enhancements | MDT, MTC and backward compatibility. |
| Knowledge Check | 10-question LTE-Advanced quiz. |

### Module 16: 5G NR & Advanced 5G Technologies
Source: Module-16 slide deck (142 pages).

| Tab | Description |
|---|---|
| 5G Overview | Rel-15–20 evolution, use cases, performance targets, spectrum FR1/FR2. |
| NR Numerology | 15×2^μ kHz SCS, slots/subframes, CP, DL/UL slot format, mini-slots. |
| NR Resource Grid | RB, SSB, CSI-RS, PDCCH/PDSCH/PUSCH placement. |
| SSB & Beam Management | PSS/SSS/PBCH blocks, beam sweeping, initial access. |
| CORESET & BWP | Control search resources, flexible bandwidth parts, power savings. |
| 5G Architecture | NSA/SA, 5GC functions, slicing, NFV, O-RAN CU/DU/RU/RIC. |
| mmWave Propagation | Path loss, blockage, sparse clusters and self-backhaul. |
| Massive MIMO | Channel hardening, pilot contamination and sum rate versus array size. |
| Beamforming Architectures | Analog/digital/hybrid, RF chains, power/complexity/beam patterns. |
| IoT, V2X & NTN | NB-IoT deployment modes, sidelink/V2X and satellite delay/Doppler. |
| URLLC | Latency budget, reliability, mini-slot preemption and throughput tradeoffs. |
| Sharing & Emerging | CBRS, LTE-U/LAA, spectrum access, visible-light communications. |
| Knowledge Check | 10-question 5G NR quiz; bank should cover all subtopics. |

## Cross-module data and reusable code

- Shared wireless math engine: dB/mW conversion, capacity, FSPL, power noise, QAM constellation, channel models, spectrum and resource-grid renderers.
- LTE/NR time–frequency grid component reused in Modules 5, 6, 7, 8, 12, 13, and 16.
- Channel/propagation and mobility engines reused in Modules 1, 3, 7, 10, 11, 14, and 16.
- Protocol/network message animation engine reused in Modules 2, 3, 4, 6, 13, and 16.
- Link adaptation and scheduling engine reused in Modules 9, 11, 15, and 16.
- Module 1 and Module 16 overlap on CBRS; Module 1 introduces sharing, Module 16 studies advanced 5G access.
- Module 1 introduces path loss and antenna aperture; Module 10 analyzes arrays and Module 14 adds realistic propagation.

## Recommended implementation order

1. Finish Module 1 as style/quiz/reference template, with Shannon capacity its own prominent tab.
2. Build Module 5 (fundamentals OFDM) and Module 6 (resource grid, synchronization), establishing reusable PHY renderers.
3. Build Module 7 and Module 8 using those grids; Module 9 for CQI/MCS/HARQ.
4. Build Module 10 and Module 11 for beamforming, MIMO, scheduling and ICIC.
5. Build Modules 12–13 for uplink; then Module 14 for deployment and mobility.
6. Build Modules 2–4 for protocol animation, using reusable topology/state components.
7. Build Modules 15–16 last to combine components; Module 16 will need nested navigation.
8. Optionally publish the Module 0 landing page after the core module suite is underway.

## Technical validation policy

- Every plotted curve must identify units, parameters, equations and idealized assumptions.
- Practical throughput is not identical to Shannon capacity: distinguish overhead, finite modulation/coding, errors, HARQ and scheduling.
- Compare fixed SNR versus fixed received power for capacity versus bandwidth; explain noise increasing with bandwidth.
- Distinguish propagation free-space loss from path loss including shadowing, blockage and fading.
- Spectrum allocation and licensing data are not occupancy measurements. Synthetic occupancy examples must be labeled as such.
- Always verify 3GPP version dependence for LTE vs NR channels and signaling, especially Module 16.
- Each application should remain usable entirely offline if packaged standalone, except intentional external documents/links.

## Final dedicated module: Module 17 — Comprehensive Quiz Laboratory
Built as a separate application for formative assessment after Modules 1–16.
- Consolidate and deduplicate legacy Respondus key-marked items.
- Review source grammar and technical ambiguity, preserving original text in a traceable revision log.
- Extend bank with questions based on underrepresented lecture and simulation concepts, particularly NR.
- Modes: targeted module practice, cumulative practice, test mode, post-assessment explanations, missed-item repetition, searchable bank, module coverage, source exports.
- Treat this quiz module as **already implemented but subject to ongoing QA**; update its questions after technical/pedagogical reviews of the remaining module applications reveal additional gaps.