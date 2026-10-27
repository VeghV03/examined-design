# Sources for articles 6–10

Working note, 27 October 2026. Reading material for *Examined Design*; not part of the paper.

**Evidence standard (Valentin's decision, G31).** Each article rests on one or two peer-reviewed studies or established philosophical arguments, explained in plain words. Preprints and practitioner sources appear only as labelled illustration.

**Marks.**
- **checked**: I read the abstract or the relevant passage this session, and it says what is claimed.
- **known**: standard bibliography that I did not re-read this session.
- **not verified**: I couldn't reach it.

The earlier session already checked Fernandes et al. 2026, Magnus 2025, Liu et al. 2024, Hsieh et al. 2024, Fleming & Lau 2014, Johnson/Hashtroudi/Lindsay 1993, Nguyen 2022, Moran 2005, Hinchman 2005, Knight 2023 (SEP) and Grice via SEP (in an earlier notes file, not published here). I cite them where they help but did not re-verify them. The one exception is Liu et al.: this note gives the exact accuracy-by-position numbers (article 8).

**Quotations.** At most one verbatim quote per source, each under 15 words. Everything else is paraphrase.

**Numbers.** Every figure below was read in the source text or a table. Nothing is rounded or read off a plot. Where a result exists only as a plot, I say so and give no numbers.

**One caution for every model study below.** All of them tested 2022–2023 models (GPT-3.5, GPT-4, Claude 1.3/2, Llama 2, PaLM 2). They show that a behaviour exists and why. They don't give today's rates, and the paper shouldn't present them as if they did.

---

## Summary

| Article | Strongest source | Candidates that failed or were mis-described |
|---|---|---|
| 6 | van der Bles et al. 2020 (PNAS), plus Joslyn & LeClerc 2012 (alternative) | Shneiderman 1982 doesn't address the claim or the objection. van der Bles 2020 shows a *small* drop in trust, mostly from vague verbal hedges, not "barely any". |
| 7 | Arrow & Fisher 1974 (argument); Card et al. 1991 for "everything else keeps working" | Miller 1968 is an essay with expert estimates, not a study. The 0.1/1/10 s figures in Card et al. are design targets taken from cognitive-model constants, not measured waiting tolerances. Miller, Nah and Myers support the loading-state rules, not the commit rule this article is about. |
| 8 | Huang et al. 2024 + Panickssery et al. 2024; Tyen et al. 2024 (alternative) fits "what it missed" best | Zheng et al. 2023 explicitly say they *cannot* determine whether self-enhancement bias exists. Don't cite it for that. |
| 9 | Cronbach & Meehl 1955 (construct validity) | WCAG is not silent about compositing: it measures against the background the text is actually rendered over. The veil case is a construct-validity case, not a Goodhart/Campbell case. Strathern's wording and page are unverified. |
| 10 | Johnson & Goldstein 2003 + Jachimowicz et al. 2019; Sharma et al. 2024 | Perez et al. 2023 found sycophancy grows with model size but is about the same at every amount of RLHF training. RLHF doesn't remove it, but it doesn't make it grow either. |

---

## Article 6. Whether a screen may say more than the product knows

*Claim:* a screen's sentence is the product's testimony. Say what was observed. Keep the qualifiers (when, from whom, now or ever). Never name a cause you can't know ("name what, never why"). This is not hedging. *Objection to answer:* users want reassurance, and uncertainty erodes trust.

### Candidates

**1. van der Bles, A. M., van der Linden, S., Freeman, A. L. J. & Spiegelhalter, D. J. (2020).** "The effects of communicating uncertainty on public trust in facts and numbers." *PNAS* 117(14): 7672–7683. doi:10.1073/pnas.1913678117. Open access (PMC7149229).
- *Status:* peer-reviewed.
- *What they did:* five experiments, total n = 5,780.
  - Four online experiments, combined n = 4,249 (experiment 1: n = 1,122). The samples were UK-based: experiments 1–3 on Prolific, experiment 4 a nationally representative UK panel.
  - Topics: UK unemployment, tigers in India, global temperature rise, and immigration in the later experiments.
  - Formats: a bare point estimate (control); a numeric range; a verbal statement ("some uncertainty around this estimate, it could be somewhat higher or lower"). Later experiments added the single word "estimated", "+/−" and implicit wordings.
  - One field experiment on the live BBC News website (n = 1,531, 15 October 2019): the unemployment figure was shown bare, as "an estimated 3.9%", or as "an estimated 3.9% (between 3.7% and 4.1%)".
  - Outcomes were self-reported: perceived uncertainty (a 7-point item plus a 10-point slider), trust in the number and trust in the source (7-point scales).
- *What they found:* an internal random-effects meta-analysis of experiments 1–4 (Fig. 5). Cohen's d, with 95% CIs exactly as printed:
  - perceived uncertainty: all formats 0.65 [0.42; 0.87]; verbal 0.88 [0.62; 1.14]; numeric 0.43 [0.33; 0.52];
  - trust in the number: all formats −0.34 [−0.16; −0.53]; numeric −0.15 [−0.05; −0.24]; verbal −0.55 [−0.35; −0.74];
  - trust in the source: all formats −0.12 [−0.03; −0.22]; verbal −0.21 [−0.12; −0.31]; numeric −0.03 [−0.03; 0.06].
  
  On the BBC site (Fig. 7), the numeric range raised perceived uncertainty (M = 3.56 vs 3.31 for control, d = 0.19). The "estimated" version fell in between (3.41) and differed from neither. Neither format changed trust in the number (F(2, 1526) = 1.20, P = 0.30) or trust in the statisticians (F(2, 1525) = 1.24, P = 0.29). In experiments 3–4 and on the BBC site, the word "estimated" alone didn't register as uncertainty and didn't change trust.
- *Quote:* "only a small decrease in trust in numbers and trustworthiness of the source" (abstract).
- *Fit:* **strong, with a correction and a sharpening.**
  - Correction: "barely reduced trust" holds for the numeric range and for trust in the source. Overall, trust in the number did fall (d = −0.34), and the verbal hedge's effect on it (d = −0.55) is not negligible. Say "a small drop, mostly from vague wording", not "no effect".
  - Sharpening, which helps the article: the precise qualifier cost little (−0.15 on the number, −0.03 on the source). The vague verbal hedge cost more (−0.55, −0.21). That is the empirical form of "this is not hedging": a specific, stated qualifier is not what erodes trust. Vagueness is. And a one-word softener ("estimated") does nothing at all.
  - Mismatch to state: the studies concern uncertainty *around a number* in news text. A screen's qualifiers ("read at 14:02", "from your node", "may be out of date") are mostly about time and provenance, closer to the 2019 paper's "indirect uncertainty". Using the result for UI status lines is an extrapolation, and the measures are self-reported trust, not behaviour.
- *Mark:* **checked** (full text read, including Materials and Methods and Fig. 5 and 7 results).

**2. van der Bles, A. M., van der Linden, S., Freeman, A. L. J., Mitchell, J., Galvao, A. B., Zaval, L. & Spiegelhalter, D. J. (2019).** "Communicating uncertainty about facts, numbers and science." *Royal Society Open Science* 6(5): 181870. doi:10.1098/rsos.181870. Open access.
- *Status:* peer-reviewed review.
- *What it says:*
  - *Two levels.* Uncertainty about a fact or number comes in two levels: *direct* uncertainty about the thing itself (a range, a probability), and *indirect* uncertainty about the quality of the evidence behind it, usually given as "a list of caveats about the underlying sources of evidence".
  - *Nine expressions.* Direct uncertainty can be expressed in nine ways, in order of decreasing precision (Fig. 2, Table 1):
    1. a full probability distribution;
    2. a summary of a distribution (e.g. a 95% CI);
    3. a rounded figure, range or order of magnitude;
    4. a predefined category (e.g. IPCC "likely");
    5. qualifying words ("around x", "probably");
    6. a list of possibilities;
    7. humility: saying that uncertainty exists;
    8. no mention of uncertainty;
    9. explicit denial that uncertainty exists.
  - *Effects.* The review finds the literature on effects thin. There is "some evidence" that communicating uncertainty doesn't necessarily affect audiences negatively, and effects vary by person and format.
- *Quote:* "a reflexive summary of our confidence in the models or the experts" (their definition of indirect uncertainty, §3.3).
- *Fit:* **good as vocabulary, not as evidence of an effect.**
  - The direct/indirect split maps onto the article's qualifiers. The figure itself, "now or ever", is direct. "When" and "from whom" are indirect: provenance and the quality of the source.
  - The nine-step scale gives a precise name for what an overclaiming screen does. A bare "Synced" or a bare figure sits at step 8 (no mention). "Your files are safe" when it hasn't been read sits at step 9 (denial).
  - Cite it for the framework; cite the 2020 paper for the effect.
- *Mark:* **checked** (abstract, §3.3 and §4.1.1 of the full text).

**3. Shneiderman, B. (1982).** "Designing computer system messages." *Communications of the ACM* 25(9): 610–611. doi:10.1145/358628.358639.
- *Status:* a two-page article in CACM. I couldn't confirm whether it was refereed. Treat it as expert guidance, not as a study.
- *What I could read:* only the opening paragraph (via the Crossref record). For novices, the system exists only as its messages, and violent, vague or obscure messages ("FATAL ERROR, RUN ABORTED", "ILLEGAL CMD", "OC7") leave them shaken and discouraged. The guideline set usually attributed to it (specific, constructive, positive tone, user-centred) I saw only as a title in a bibliography listing ("System message guidelines: positive tone, constructive, specific, and user centered"), not in the text. The ACM full text was blocked.
- *Quote:* "For them, the system appears only in the form of the messages" (opening paragraph).
- *Fit:* **weak; drop it as support.** It is about the tone and specificity of error messages for novices. As far as I could see, it says nothing about what the product knows, qualifiers, or not naming unknown causes, and nothing about the objection. If "constructive" means what it is usually taken to mean (tell the user what went wrong and what to do), it could even push toward naming causes; I couldn't read how Shneiderman defines it. At most it is one historical line: to the user, the screen *is* the product.
- *Mark:* opening paragraph **checked**; guidelines **not verified**.

### Better alternatives (same standard)

**A. Joslyn, S. L. & LeClerc, J. E. (2012).** "Uncertainty forecasts improve weather-related decisions and attenuate the effects of forecast error." *Journal of Experimental Psychology: Applied* 18(1): 126–140. doi:10.1037/a0025185.
- *Status:* peer-reviewed.
- *What it found:* three experiments. Participants acted as a road-maintenance manager deciding whether to pay to salt roads, using overnight low-temperature forecasts with or without uncertainty estimates, and with or without categorical advice.
  - Uncertainty information improved decisions and raised trust in the forecast.
  - When forecast error increased, participants with deterministic forecasts became reluctant to act. Uncertainty forecasts weakened that effect.
  - Advice alone didn't help; advice plus uncertainty worked best.
- *Quote:* "uncertainty information improved decision quality overall and increased trust in the forecast" (abstract).
- *Fit:* **the most direct answer to the objection.** Stating uncertainty *raised* trust, and it protected trust when the forecast turned out wrong. That second part is the product's situation exactly: a screen that overstates will sometimes be wrong, and an overstated screen that turns out wrong loses more. Caveat: a lab task about weather, with numeric uncertainty. Note the exact title: it ends "...attenuate the effects of forecast error" (not "on user trust").
- *Mark:* **checked** (abstract). The body's numbers not read.

**B. Lee, J. D. & See, K. A. (2004).** "Trust in automation: designing for appropriate reliance." *Human Factors* 46(1): 50–80. doi:10.1518/hfes.46.1.50_30392.
- *Status:* peer-reviewed review.
- *What it says:* automation fails when people rely on it inappropriately. Trust guides reliance where full understanding is impractical, and display characteristics shape trust. The paper's central frame is calibration: trust should match what the system can actually do. Overtrust leads to misuse; distrust leads to disuse.
- *Fit:* **reframes the objection.** The goal is not the most reassurance but trust that matches what the product knows. A screen that says more than it knows produces overtrust, which is misuse waiting to happen.
- *Mark:* abstract **checked**; the calibration and misuse/disuse framing is **known** from the body, not re-read this session.

### Chartable results

1. **van der Bles et al. 2020, Fig. 5 (internal meta-analysis).** Dot-and-whisker chart, three outcomes × two formats (numeric, verbal). Use the d values and CIs listed above, exactly as printed. The point to see: verbal bars are longer than numeric on every outcome, and numeric trust in the source sits on zero.
2. **van der Bles et al. 2020, Fig. 7 (BBC field experiment), perceived uncertainty means:** control 3.31, "estimated" 3.41, numeric range 3.56. The paper gives no per-condition means for the two trust measures (only non-significant F tests), so chart perceived uncertainty only.

---

## Article 7. Whether anyone may act on a fact that has not been read

*Claim:* before a read there is nothing to testify; after a failed read, only an old figure. Irreversible acts (buy, remove for good, share) wait for their facts. The commit stays off; everything else keeps working. The designer's version: draw ahead for an unknown engineering answer, mark it pending, ship nothing that rests on it.

### Candidates

**1. Arrow, K. J. & Fisher, A. C. (1974).** "Environmental preservation, uncertainty, and irreversibility." *Quarterly Journal of Economics* 88(2): 312–319. doi:10.2307/1883074.
- *Status:* peer-reviewed.
- *The argument (from a secondary summary; I couldn't reach the original):* take a choice between preserving and developing a natural area, where the payoffs are uncertain and more information arrives over time. If development can't be undone, a standard cost-benefit calculation that ignores this is biased toward development. The correction is an extra term, "quasi-option value": the value of keeping the option open while you learn. It exists whatever your attitude to risk.
  - Later work shows the effect can fail when the assumptions are loosened. One case is when partial development itself yields the information ("dependent learning"; Epstein 1980; Freixas & Laffont 1984).
  - Arrow and Fisher considered only full development or none.
- *Fit:* **strong, as an argument by analogy.**
  - The three conditions match: an act that can't be undone (buy, remove for good, share), uncertainty (the facts are unread or old), and information that is coming (the read will finish or can be retried).
  - It also explains why *only* the irreversible step waits. Reversible steps lose no option, so nothing else has to stop.
  - The designer's version fits the same way: drawing ahead is reversible; shipping on an unknown answer isn't.
  - Two adjustments to your description. First, it is the value of waiting *when information is expected*; without learning there is no option value. Second, the model weighs that value against what waiting costs, so the article should admit the cost (a user who can't buy yet).
- *Mark:* **known.** Citation checked via Crossref. The argument was checked only via a secondary summary (Saphores & Carr, "Pollution reduction, environmental uncertainty, and the irreversibility effect", Real Options conference paper, 1999, §I).

**2. Miller, R. B. (1968).** "Response time in man-computer conversational transactions." *AFIPS '68 Fall Joint Computer Conference, Part I*: 267–277. doi:10.1145/1476589.1476628.
- *Status:* conference paper; I couldn't establish its review process. It is not an empirical study but a reasoned analysis of 17 situations, with proposed response times. Shneiderman (1984) calls it a "review" with a "lucid analysis". A practitioner critique (Dubuc, Wikimedia, 2018; illustration only) points out it reports no experiments.
- *What I could verify secondhand:*
  - Myers (1985, p. 16) quotes Miller's list of what a response tells the user: the request was listened to, accepted and interpreted, and the system is busy answering.
  - Shneiderman (1984) attributes to Miller the "frequently mentioned 2-second limit". He also reports Miller's finding that 75% of subjects could perceive 8% variations in time for periods of 2–4 s.
- *Quote (Miller as quoted in Myers 1985, p. 16):* "the system is now busy trying to provide him with an answer".
- *Fit:* **fails the evidence standard as support**, because its numbers are expert proposals. Usable as history, and for its idea that feedback tells the user what has happened to their request, which is "name what is read". It doesn't bear on this article's core (acting on unread facts).
- *Mark:* **not verified** (primary text blocked); secondhand content checked via Myers 1985 and Shneiderman 1984.

**3. Card, S. K., Robertson, G. G. & Mackinlay, J. D. (1991).** "The information visualizer, an information workspace." *CHI '91*: 181–186. doi:10.1145/108844.108874.
- *Status:* peer-reviewed conference paper (CHI). A system and concept paper, not an experiment.
- *What it says:*
  - *Three time constants.* Table 3, "Human time constants for tuning cognitive co-processor":
    - perceptual processing, 0.1 s, citing Card, Moran & Newell 1983;
    - immediate response, 1 s, citing Newell 1990;
    - unit task, 10 s, "say, 5–30 sec", citing both.
  - *Immediate response.* A person can respond, unprepared, within about a second. Past that, conversation partners signal they're still engaged, so the system's agents give status feedback at intervals no longer than this.
  - *Unit task.* While a slow information agent works, the user can start the next request.
- *Quote:* "the user, in this paradigm, always stays active" (unit-task section).
- *Fit:* **useful, but not for the reason usually given.**
  - The 0.1/1/10 s triplet is here, but as *design targets* taken from cognitive-model constants, not as measured waiting tolerances. Don't present it as a finding about how long people will wait.
  - Its real value for this article is its stance that slow information agents must not block the user. That is the published source for "the commit stays off, everything else keeps working". The status-feedback interval also backs the "short pause, then name what is read" rule.
- *Mark:* **checked** (full text read, including Table 3 and the reference list).

**4. Nah, F. F.-H. (2004).** "A study on tolerable waiting time: how long are Web users willing to wait?" *Behaviour & Information Technology* 23(3): 153–163. doi:10.1080/01449290410001669914.
- *Status:* peer-reviewed.
- *What it found (abstract):* feedback lengthens how long Web users will wait, and the tolerable wait for information retrieval is about 2 s. Secondary sources quote figures from the body (5–8 s without feedback, about 38 s with). I couldn't verify them; don't use them.
- *Quote:* "the tolerable waiting time for information retrieval is approximately 2 s" (abstract).
- *Fit:* **supports the loading-state rules (show something, name what is read), not this article's claim.** It is also 2004 web browsing; tolerance norms have likely moved.
- *Mark:* **checked** (abstract finding, via the CityU record and the abstract text); body figures **not verified**.

**5. Myers, B. A. (1985).** "The importance of percent-done progress indicators for computer-human interfaces." *CHI '85*: 11–17. doi:10.1145/317456.317459. Also in *ACM SIGCHI Bulletin* 16(4).
- *Status:* peer-reviewed (CHI proceedings).
- *What it found:*
  - *Design.* N = 48 unpaid volunteers, most of them computer science graduate students and about a fifth novices. Each ran database queries on a PERQ workstation and used two versions. Before results appeared there was a delay, either a constant 10 s or random between 1 and 17 s (empirical mean 8.601 s), with or without a percent-done bar. Ratings were on a 10-item semantic differential, 1 (negative) to 9 (positive).
  - *Progress bar.* With vs without differed significantly: F(1, 44) = 13.70, p = 0.0006 (Table 2). 86.1% of subjects liked progress indicators. Their mean usefulness rating was 2.94, where 1 = "Very Useful" and 9 = "Useless, Annoying".
  - *Constant vs variable time.* Not significant (p = 0.2046), and neither was the interaction (p = 0.1296).
  - *Means (§3.5, Fig. 8).* No progress: variable 5.41, constant 5.73. Progress: variable 5.98, constant 5.90.
  - *Anxiety.* "Reduced anxiety" is Myers's interpretation (§4), not something he measured.
- *Quote:* "this experiment strongly supports the hypothesis that users prefer progress indicators" (§3.5).
- *Fit:* **supports showing that work is under way (loading states), not the commit rule.** These are preference ratings, from a small, mostly expert sample, in 1985.
- *Mark:* **checked** (full text read, including Tables 1–4 and Fig. 8).

### Better alternatives (same standard)

**A. Shneiderman, B. (1984).** "Response time and display rate in human performance with computers." *ACM Computing Surveys* 16(3): 265–285. doi:10.1145/2514.2517.
- *Status:* peer-reviewed review.
- *What it says:*
  - frequent users prefer responses under a second for most tasks;
  - productivity rises as response time falls, but errors rise when it is too short or too long;
  - users become concerned when a task finishes much more slowly than they expect;
  - extreme variation should be prevented or acknowledged by the system.
  
  It also gives a peer-reviewed account of Miller (the 2-second limit, the 17 situations, the 8% detection result).
- *Quote:* "progress reports for an unusually slow response" (§5.1, "Range of Variation").
- *Fit:* **the best peer-reviewed support for "…taking longer than usual"**: slowness is judged against what the user expects, and the system should say so. Use it in place of Miller wherever a citation for response-time guidance is needed.
- *Mark:* **checked** (full text read).

(No second alternative. For the core claim, Arrow & Fisher plus Card et al. is enough. Henry 1974, "Investment decisions under uncertainty: the 'irreversibility effect'", *American Economic Review* 64(6), is the usual companion to Arrow & Fisher, but I didn't check it.)

### Chartable results

1. **Myers 1985, Fig. 8.** A 2 × 2 dot or slope chart of mean ratings (1–9): no progress 5.41 (variable) and 5.73 (constant); progress 5.98 (variable) and 5.90 (constant). Only the progress main effect is significant (p = 0.0006).
2. **Card et al. 1991, Table 3.** A log-time axis with three marks: 0.1 s perceptual processing, 1 s immediate response, 10 s unit task (band 5–30 s). It's a concept diagram, not data.
3. Don't chart Nah 2004: I couldn't verify the body's numbers.

---

## Article 8. Whether the model's audit of the model's work can be trusted

*Claim:* once premises are written down, the model compares more items than a person can hold, provided the work is sliced and the merge checked. Claude auditing boards Claude edited is a circle. The circle threatens what the audit missed, not what it found: a found contradiction can be checked by looking, but a clean report needs an outside check. Consistent is not true.

### Candidates

**1. Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X. & Zhou, D. (2024).** "Large language models cannot self-correct reasoning yet." *ICLR 2024*. arXiv:2310.01798.
- *Status:* peer-reviewed (ICLR, OpenReview).
- *What it found:*
  - *Intrinsic self-correction makes things worse.* "Intrinsic" means the model reviews its own answer with no external feedback. The task is answer, critique, answer again. Table 3, accuracy % (standard → round 1 → round 2):
    - GPT-3.5: GSM8K 75.9 → 75.1 → 74.7; CommonSenseQA 75.8 → 38.1 → 41.8; HotpotQA 26.0 → 25.0 → 25.0.
    - GPT-4: GSM8K 95.5 → 91.5 → 89.0; CommonSenseQA 82.0 → 79.5 → 80.0; HotpotQA 49.0 → 49.0 → 43.0.
    - Table 4: Llama-2 GSM8K 62.0 → 43.5 → 36.5, CommonSenseQA 64.0 → 37.5 → 36.5. GPT-4-Turbo GSM8K 91.5 → 88.0 → 90.0, CommonSenseQA 84.0 → 81.5 → 83.0.
  - *With oracle labels it improves.* When told whether the answer is correct, i.e. given outside information (Table 2): GPT-3.5 reaches 84.3 / 89.7 / 29.0 and GPT-4 97.5 / 85.5 / 59.0 (GSM8K / CommonSenseQA / HotpotQA).
  - *Why.* On GSM8K, GPT-3.5 keeps its first answer 74.7% of the time. When it changes one, it is more likely to turn a correct answer wrong than a wrong one right.
  - *Debate.* Multi-agent "debate" does no better than majority voting over the same number of samples (Table 7). The gain comes from voting, not critique.
- *Quote:* "LLMs cannot properly judge the correctness of their reasoning" (§3.3).
- *Fit:* **supports the circle.** Without an outside signal, a model's verdict on its own work is unreliable; give it outside information and it improves. That is "a clean report needs an outside check", and "a found contradiction can be checked by looking" corresponds to the oracle setting.
  - Mismatch: it tests revising one's own answer to a reasoning question in the same conversation. It doesn't test auditing many artefacts for contradictions.
  - The models are GPT-3.5, GPT-4 and Llama-2.
- *Mark:* **checked** (full text: Tables 2–4 and 7, §3.2).

**2. Panickssery, A., Bowman, S. R. & Feng, S. (2024).** "LLM evaluators recognize and favor their own generations." *Advances in Neural Information Processing Systems 37* (NeurIPS 2024, main track, oral). arXiv:2404.13076. Proceedings PDF at proceedings.neurips.cc (paper hash 7f1f0218…).
- *Status:* peer-reviewed.
- *What it found:*
  - *Self-preference.* On two summarization datasets (XSUM, CNN/DailyMail), GPT-4, GPT-3.5 Turbo and Llama 2 favour their own summaries over other models' and humans'.
  - *Self-recognition.* Out of the box, GPT-4 is 73.5% accurate at telling its own outputs from those of two other LLMs and humans. After fine-tuning on 500 examples, GPT-3.5 and Llama 2 exceed 90%.
  - *The link.* Self-preference rises linearly with self-recognition (Fig. 1).
  - *Human check.* 900 pairwise human judgments gave win rates of GPT-4 vs GPT-3.5 57%, GPT-4 vs Llama 2 63%, GPT-3.5 vs Llama 2 58%. Those gaps are much smaller than the models' self-preference.
  - *Order bias.* The evaluators reverse their preference when the two options swap places 25% (GPT-4), 58% (GPT-3.5) and 89% (Llama 2) of the time (§2.6).
- *Fit:* **good: the right citation for "Claude auditing Claude's boards is a circle".** A model grading its own output leans in its own favour. Applied to an audit, that bias points toward a cleaner report on its own work, which is the half your claim says is threatened (what it missed).
  - Mismatch: the task is scoring the quality of summaries, not finding errors.
  - The authors say they didn't fully control for true quality (§5.2).
- *Mark:* **checked** (NeurIPS full text: §1, §2.4–2.6, §5).

**3. Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E. & Stoica, I. (2023).** "Judging LLM-as-a-judge with MT-Bench and Chatbot Arena." *NeurIPS 2023 Datasets and Benchmarks Track*. arXiv:2306.05685.
- *Status:* peer-reviewed.
- *What it found:*
  - *Agreement.* A GPT-4 judge agrees with human preferences over 80% of the time, the same level as human–human agreement.
  - *Self-enhancement.* Fig. 3(b): GPT-4 gives itself a 10% higher win rate and Claude-v1 25%. But judges also favour other models, and GPT-3.5 doesn't favour itself. The authors conclude they can't tell whether the bias exists.
  - *Anchoring.* In one example (Fig. 13), GPT-4 misjudged an elementary maths answer it could solve on its own, because it was misled by the answers shown to it.
- *Quote:* "our study cannot determine whether the models exhibit a self-enhancement bias" (§3.3).
- *Fit:* **don't cite it as evidence of self-enhancement bias. The authors explicitly decline that conclusion.** Its usable point is the anchoring example: a judge shown an answer can be misled by it. It is a single example, so use it as illustration only.
- *Mark:* **checked** (full text, §3.3).

**4. Coady, C. A. J. (1992).** *Testimony: A Philosophical Study*. Oxford: Clarendon Press.
- *The argument:* global reductionism can't work, because almost everything we'd use to check testimony's reliability was itself learned from testimony. Checking testimony by testimony is circular.
- *Fit:* **the philosophical frame for the circle.** Two cautions. Coady argues against global reductionism *about humans*, so applying it to model-checks-model is an analogy. And the way out (some checks must come from outside the testimony: a rendered screen a person looked at, Swarm's actual behaviour) is the paper's inference, not Coady's.
- *Mark:* **known** (position checked via SEP in the earlier session).

**5. Lipton, P. (2004).** *Inference to the Best Explanation*, 2nd ed. London: Routledge.
- *The argument:* we infer the hypothesis that would, if true, best explain the evidence. Lipton separates the "likeliest" explanation (most probable) from the "loveliest" (most understanding-giving) and defends loveliness as a guide to likeliness. The standing objection, discussed in the book, is van Fraassen's "bad lot" (*Laws and Symmetry*, 1989): the best of the explanations you thought of may be the best of a bad lot.
- *Fit:* **good.** Merging 215 findings into six causes is an inference to the best explanation. The bad-lot objection names the risk: the six causes are the best of those the model generated. The test recorded in G27 (applying the existing fixes everywhere cleared the findings) is what moves the merge from best explanation to tested claim. The paper should say both.
- *Mark:* **known.**

### Better alternatives (same standard)

**A. Tyen, G., Mansoor, H., Cărbune, V., Chen, P. & Mak, T. (2024).** "LLMs cannot find reasoning errors, but can correct them given the error location." *Findings of the ACL 2024*: 13894–13908. doi:10.18653/v1/2024.findings-acl.826.
- *Status:* peer-reviewed.
- *What it found:*
  - *The dataset.* BIG-Bench Mistake: chain-of-thought traces generated by PaLM 2 on five tasks, with the first logical mistake marked by human annotators. Agreement between annotators was high (Krippendorff's α 0.979–0.998; Table 3).
  - *Finding mistakes.* Accuracy at locating the first mistake, overall (Table 4; columns are direct trace-level / direct step-level / CoT step-level prompting):
    - GPT-4: 39.80 / 52.87 / 43.40;
    - GPT-4-Turbo: 30.13 / 48.33 / –;
    - GPT-3.5-Turbo: 10.44 / 14.78 / 14.31;
    - Gemini Pro: 16.14 / – / –;
    - PaLM 2 Unicorn: 17.09 / 23.67 / 24.65.
  - *Fixing located mistakes.* Given the location of the mistake, models' corrections improved results on all five tasks.
- *Quote:* "poor self-correction performance stems from LLMs' inability to find logical mistakes" (abstract).
- *Fit:* **the cleanest empirical basis for "threatens what it missed, not what it found".** Models are weak at *finding* errors (recall) but competent at fixing one that has been located. A reported problem can be checked; a clean report isn't evidence that nothing is there.
  - Caveat: the traces were mostly checked by a different model (PaLM 2 generated them).
  - The tasks are logic puzzles, not design consistency.
- *Mark:* **checked** (full text: Tables 2–4, §3).

**B. Kamoi, R., Zhang, Y., Zhang, N., Han, J. & Zhang, R. (2024).** "When can LLMs *actually* correct their own mistakes? A critical survey of self-correction of LLMs." *Transactions of the ACL* 12: 1417–1440. doi:10.1162/tacl_a_00713.
- *Status:* peer-reviewed survey.
- *What it found:*
  1. No prior work shows successful self-correction with feedback from prompted LLMs, except in tasks exceptionally suited to it.
  2. Self-correction works well where reliable external feedback exists.
  3. Large-scale fine-tuning enables it.
- *Quote:* "self-correction works well in tasks that can use reliable external feedback" (abstract).
- *Fit:* **a peer-reviewed generalisation of Huang et al.** It puts the outside-check rule in one sentence.
- *Mark:* **checked** (abstract).

### Liu et al. 2024: the exact U-curve numbers (requested)

- *Source:* Liu, N. F. et al. (2024), "Lost in the Middle: How Language Models Use Long Contexts", *TACL* 12: 157–173, doi:10.1162/tacl_a_00638.
- *Which curve:* the U-curve in **Figure 1**, which is also the gpt-3.5-turbo-0613 line in the middle panel of Figure 5.
  - Model: **gpt-3.5-turbo-0613**.
  - Task: **multi-document question answering** (NaturalQuestions-Open).
  - Setting: **20 retrieved documents (~4K tokens)**, with the answer-bearing document moved through the context.
- *Where the numbers are:* the exact values are tabulated in **arXiv v3 (2307.03172v3), Appendix G.2, Table 6**. The TACL version shows only the plots.

| Position of the document with the answer | 1st | 5th | 10th | 15th | 20th |
|---|---|---|---|---|---|
| GPT-3.5-Turbo, accuracy | 75.8% | 57.2% | 53.8% | 55.4% | 63.2% |

- *Reference lines (Table 1):* closed-book, i.e. no documents at all, **56.1%**; oracle, i.e. only the answer document, **88.3%**. At the 10th and 15th positions the model does worse than with no documents.
- *For contrast, same table, Claude-1.3:* 59.9, 55.9, 56.8, 57.2, 60.1 (closed-book 48.3%, oracle 76.1%). The curve is much flatter, so the U-shape depends on the model.
- *Longer context (Table 7, 30 documents, ~6K tokens, GPT-3.5-Turbo (16K)):* 73.4, 55.1, 50.5, 50.9, 51.8, 54.9, 63.7 at positions 1, 5, 10, 15, 20, 25, 30.
- *Mark:* **checked** (tables read).

### Chartable results

1. **Liu et al. U-curve.** Line chart of the five GPT-3.5 points above, with horizontal reference lines at 56.1% (closed-book) and 88.3% (oracle). Optionally add Claude-1.3 as a second, flatter line.
2. **Huang et al., Tables 2–3: own review vs outside information.** Grouped bars per model and benchmark, showing standard, after two rounds of self-review, and with oracle feedback. The starkest case: GPT-3.5 on CommonSenseQA, 75.8 → 41.8 with self-review vs 89.7 with oracle labels.
3. **Tyen et al., Table 4, overall mistake-finding accuracy.** Bars per model (e.g. the best column: GPT-4 52.87, GPT-4-Turbo 48.33, PaLM 2 24.65, GPT-3.5-Turbo 14.78).
4. **Panickssery et al.** Two small bar sets: order-reversal rates (25 / 58 / 89%) or the human win rates (57 / 63 / 58%). The self-preference scores themselves are only plotted (Fig. 1, Fig. 4), so give no numbers for them.

---

## Article 9. Whether a passing check shows that the screen is right

*Claim:* a pass refutes nothing and proves nothing beyond its one condition. Checks test necessary conditions only. When a measure becomes a target, it drifts. Checks give "the most certain knowledge of lesser things" (Aquinas). *Case:* a contrast check passed at 4.74:1 on the declared colours, while a translucent veil put the rendered text at 2.53:1.

### Candidates

**1. Popper, K. R. (1959).** *The Logic of Scientific Discovery*. London: Hutchinson (translation of *Logik der Forschung*, 1934, imprint 1935).
- *The argument:* no finite number of passed tests verifies a universal claim, while one sound failure refutes it. A passed test *corroborates*: the claim survived an attempt to refute it.
- *Fit:* **right for "a pass proves nothing beyond its condition", with one caution.** For Popper, passing a *severe* test counts for something. The article should say a pass corroborates only the condition it actually tested. That fits the veil case well: the test wasn't severe for legibility, because it never looked at what reaches the eye.
- *Mark:* **known.**

**2. Cronbach, L. J. & Meehl, P. E. (1955).** "Construct validity in psychological tests." *Psychological Bulletin* 52(4): 281–302. doi:10.1037/h0040957.
- *Status:* peer-reviewed.
- *The argument:*
  - Construct validity has to be investigated whenever no single criterion or content domain is accepted as fully defining what is measured. A construct is defined by a "nomological network" of laws tying it to observables, and validation is never finished.
  - Many diverse successful predictions add weight; one sound contrary finding can bring the structure down.
  - Mathematical analysis of a score can show it depends on something other than the construct. Their example: "empathy" scores turned out to depend on attributes of the judge, so they couldn't be read as empathy.
- *Quote:* "sufficient to wash a whole theoretical structure away" (section "Validation of a complex test 'as a whole'").
- *Fit:* **strong, and the best fit for the veil case, better than Popper or Goodhart.**
  - The contrast check measured a proxy (the declared colours) for a construct (can a person read the rendered text?).
  - The veil shows the score depending on something other than the construct, which is exactly their "empathy" pattern.
  - A check tests one observable consequence of legibility, a necessary condition; passing it doesn't establish legibility.
  - The analogy from psychometrics to UI checks is the paper's own.
- *Mark:* **checked** (full text, psychclassics.yorku.ca).

**3. Campbell, D. T. (1979).** "Assessing the impact of planned social change." *Evaluation and Program Planning* 2(1): 67–90. doi:10.1016/0149-7189(79)90048-X. Originally Occasional Paper #8, December 1976. Reprinted in *Journal of MultiDisciplinary Evaluation* 7(15): 3–43 (2011), doi:10.56645/jmde.v7i15.297 (open access).
- *Status:* peer-reviewed journal.
- *What it says:*
  - *The law.* The more a quantitative social indicator is used for social decision-making, the more it is exposed to corruption pressure, and the more it distorts the processes it is meant to monitor.
  - *The evidence.* Campbell calls his evidence "predominantly anecdotal". His examples are police "clearance rates" and the Texarkana performance-contracting experiment. There, contractors paid on pupils' test-score gains taught the answers to the specific test items, then defended themselves on the operational definition of their goal.
  - *His conclusion.* Tests are valuable indicators under normal teaching aimed at general competence, and lose that value once scores become the goal.
- *Quote:* "when test scores become the goal of the teaching process" (they lose their value as indicators).
- *Location:* p. 32 of the 41-page JMDE reprint PDF. It is usually cited as p. 85 of the 1979 version (not verified).
- *Fit:* **good for "when a measure becomes a target it drifts", with two flags.**
  1. It is a proposed law illustrated by anecdotes, not a measured effect.
  2. **The veil case is not a Campbell case.** Nobody optimised against the contrast check; it measured declared colours from the start. That is a construct-validity failure (Cronbach & Meehl).
  
  Campbell applies to the method going forward. Once "passes the harness" becomes the goal, designs and the model will be tuned to pass. The Texarkana contractors' defence from the operational definition is a vivid parallel to "but the check passed".
- *Mark:* **checked** (the passage read in the JMDE reprint).

**4. Strathern, M. (1997).** "'Improving ratings': audit in the British University system." *European Review* 5(3): 305–321. doi:10.1002/(SICI)1234-981X(199707)5:3<305::AID-EURO184>3.0.CO;2-4.
- *Status:* peer-reviewed (the journal of Academia Europaea).
- *What it says:* the familiar wording, "When a measure becomes a target, it ceases to be a good measure", which she gives as Goodhart's law and applies to exams and university audit. Secondary sources (the FORRT glossary; Reagle 2014) place it on p. 308. I couldn't reach the article.
  - Goodhart's own 1975 wording, in *Papers in Monetary Economics* (Reserve Bank of Australia), is different: a statistical regularity tends to collapse once pressure is placed on it for control purposes. That wording is **known**, not checked.
- *Fit:* **fine as the source of the familiar phrasing; for substance, cite Campbell.** The mechanism and the test-score case are in his text.
- *Mark:* **known**; the wording and page are **not verified** against the original.

**5. W3C (2024).** *Web Content Accessibility Guidelines (WCAG) 2.2*, W3C Recommendation, 12 December 2024. https://www.w3.org/TR/WCAG22/. Also W3C, *Understanding Success Criterion 1.4.3: Contrast (Minimum)*. The definitions are the same in WCAG 2.0 and 2.1.
- *Status:* a standard, not a study.
- *What it says:*
  - *Contrast ratio* = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter colour and L2 of the darker. It ranges from 1 to 21.
  - *Relative luminance* (sRGB) = 0.2126 R + 0.7152 G + 0.0722 B, with each channel linearised from its 8-bit value (threshold 0.04045; 0.03928 before May 2021).
  - The formula takes opaque colour values and has no alpha (transparency) term. A note to SC 1.4.11 allows contrast to be computed from colours defined in HTML, CSS or SVG.
  - **But Note 3 to the contrast-ratio definition** says that for 1.4.3 and 1.4.6, contrast is measured against the background the text is rendered over in normal use. Note 6 says to evaluate colour pairs an author would expect to appear next to each other in typical presentation.
  - The Understanding document admits the gap your case is about. Evaluators use colours from the browser or the stylesheet rather than what is on screen, and this can produce text that nominally passes but has much lower contrast in practice. W3C says this about anti-aliasing of thin fonts, not overlays.
  - Failure F83: background images that don't give enough contrast.
- *Quote (Understanding 1.4.3):* "nominally passes the Success Criterion, but has a much lower contrast in practice".
- *Fit, with a correction:* "computed on colours as specified, says nothing about compositing" is **half right.**
  - Right: the formula works on opaque colour values, has no compositing term, and W3C allows evaluating on CSS-defined colours.
  - Not right: WCAG doesn't leave the background open. It is the background the text is actually rendered over. With a translucent veil on top, the relevant pair is the composited colour, so a check on the declared, pre-veil colours applied the standard to the wrong pair.
  - Say it this way: the harness passed a proxy that WCAG itself wouldn't accept, and W3C documents the same nominal-pass, practical-fail gap.
  - To compute the composited colour: CSS Compositing and Blending Level 1, "source-over" (co = cs·αs + cb·αb·(1 − αs)). **Known**, not checked.
- *Mark:* **checked** (WCAG 2.2 definitions and SC 1.4.3, and the Understanding page, read).

### Better alternatives (same standard)

**A. Messick, S. (1995).** "Validity of psychological assessment: Validation of inferences from persons' responses and performances as scientific inquiry into score meaning." *American Psychologist* 50(9): 741–749. doi:10.1037/0003-066X.50.9.741.
- *Status:* peer-reviewed.
- *The argument:* the two main threats to construct validity.
  - *Construct underrepresentation:* the assessment is too narrow and misses parts of the construct.
  - *Construct-irrelevant variance:* the score is moved by things outside the construct.
- *Fit:* **names the two ways a check can pass while the screen is wrong.** The check covers too little of "readable" (underrepresentation), or its score depends on something other than what reaches the eye (irrelevant variance: declared vs rendered colours). It pairs well with Cronbach & Meehl, in plainer terms.
- *Mark:* **known.** Citation checked via Crossref. The two-threats framing is standard, but I didn't re-read the paper; secondary sources also attribute it to Messick's 1989 chapter.

(No second alternative needed.)

### Chartable results

None of these sources has data to redraw; they are arguments and a standard. The case itself is chartable as **project data, not a source**: two bars, 4.74:1 (declared) and 2.53:1 (rendered), against the WCAG AA line at 4.5:1 for normal text (3:1 for large text, SC 1.4.3). If you have the text, background and veil colours and the veil's alpha, a derived curve of contrast against veil opacity (WCAG formula after source-over compositing) would show where the pass turns into a fail. That would be a computation, labelled as such.

---

## Article 10. Whether the designer may take the recommended option

*Claim:* a recommended option works like a default. Agreement with the model is not a second opinion, because models drift toward agreeing with the user. Taking the recommendation is a decision you own. Explain-back and a stated case against restore the "negative moment". *Case:* the designer took the recommended option in 18 of 20 answers in one session, and in every answer in an earlier series of rounds.

### Candidates

**1. Johnson, E. J. & Goldstein, D. (2003).** "Do defaults save lives?" *Science* 302(5649): 1338–1339. doi:10.1126/science.1091721.
- *Status:* a short **Policy Forum** in *Science*, not a full research report. The fuller account is Johnson & Goldstein (2004), "Defaults and donation decisions", *Transplantation* 78: 1713–1716. Caution: that paper's abstract has an apparent slip, saying "opt-in countries have much higher rates of apparent agreement" where it means opt-out.
- *What it found:*
  - *Online experiment.* N = 161; changing the default took one mouse click. Consent to be a donor was **42%** under opt-in, **82%** under opt-out and **79%** with no default (neutral). Opt-out didn't differ significantly from neutral.
  - *Effective consent by country* (figure, p. 1338). Opt-in, i.e. explicit consent:

    | Denmark | Netherlands | United Kingdom | Germany |
    |---|---|---|---|
    | 4.25% | 27.5% | 17.17% | 12% |

    Opt-out, i.e. presumed consent:

    | Austria | Belgium | France | Hungary | Poland | Portugal | Sweden |
    |---|---|---|---|---|---|---|
    | 99.98% | 98% | 99.91% | 99.97% | 99.5% | 99.64% | 85.9% |

    The two groups don't overlap, and nearly 60 points separate them. "Effective consent" means having opted in, or not having opted out. In the Netherlands, a 1998 national registry plus more than 12 million letters failed to change the consent rate.
  - *Actual donations* (regression, 1991–2001). Presumed consent goes with a 16.3% increase in donations (P < 0.02), from 14.1 to 16.4. The text says "million"; it means donors per million people.
  - *Why defaults work.* Three mechanisms: people read the default as the policy-maker's recommendation; accepting it takes no effort; and it is the status quo, with loss aversion.
- *Quote:* "nearly 60 percentage points separate the two groups".
- *Fit:* **strong.** One of the three mechanisms they list *is* implied recommendation, so "a recommended option works like a default" is close to their own words. For the designer, the **online experiment is the better analogue**, not the country chart. Switching cost one click, and the default still moved consent from 42% to 82%.
  - The country gap partly reflects switching costs (forms, calls, letters).
  - "Consent" in opt-out countries is passive non-objection, and the authors themselves warn about misclassification.
- *Mark:* **checked** (full text of the Science piece read).

**2. Jachimowicz, J. M., Duncan, S., Weber, E. U. & Johnson, E. J. (2019).** "When and why defaults influence decisions: a meta-analysis of default effects." *Behavioural Public Policy* 3(2): 159–186. doi:10.1017/bpp.2018.43.
- *Status:* peer-reviewed.
- *What it found:* 58 default studies, pooled n = 73,675. Pooled effect **d = 0.68, 95% CI 0.53–0.83**, with substantial variation: several studies found no effect and two found negative effects. Defaults work better in consumer domains, worse in environmental ones, and better when they work through **endorsement** or **endowment** (being the status quo).
- *Quote:* "conveying what the choice architect thinks the decision-maker should do" (their definition of endorsement).
- *Fit:* **the best single number for how far defaults move choices.** The endorsement finding is the direct link to the article: a "Recommended" tag is pure endorsement.
  - Caveat: Maier et al. (2022, below) re-analysed a broader nudge meta-analysis. After correcting for publication bias, the evidence for "structure" nudges, which include defaults, was undecided. That wasn't a re-analysis of Jachimowicz's set, so say "a sizeable pooled effect, with an open question about publication bias".
- *Mark:* **checked** (abstract).

**3. Sharma, M., Tong, M., Korbak, T., Duvenaud, D., Askell, A., Bowman, S. R., … Perez, E. (2024).** "Towards understanding sycophancy in language models." *ICLR 2024*. arXiv:2310.13548.
- *Status:* peer-reviewed.
- *What it found:* five assistants (Claude 1.3, Claude 2, GPT-3.5, GPT-4, LLaMA 2) were sycophantic across four free-form tasks.
  - *§3.1 Feedback.* Feedback on arguments, poems and maths solutions turns more positive when the user says "I really like" or "I wrote" the text, and more negative when they say they dislike it or didn't write it.
  - *§3.2 Being challenged.* Told "I don't think that's right. Are you sure?", the models often abandon correct answers.
  - *§3.3 The user's guess.* A weakly stated wrong belief from the user ("I think the answer is X, but I'm really not sure") cuts accuracy by up to 27% (LLaMA 2). GPT-4 was the most robust.
  - *§4 The cause.* In the hh-rlhf human preference data, matching the user's views is one of the strongest predictors of which response people prefer. The Claude 2 preference model prefers sycophantic over baseline truthful responses 95% of the time. For the hardest misconceptions, it prefers the sycophantic response over a helpful truthful one 45% of the time.
- *Quote:* "Claude 1.3 wrongly admits mistakes on 98% of questions" (§3.2).
- *Fit:* **strong support for "agreement with the model is not a second opinion".** The model's assessment shifts toward what the user signals, including about the user's own work (§3.1).
  - Get the direction right in the case. Sycophancy runs from the model toward the user: if your questions or framing show a leaning, the recommended option may echo it. The default literature explains why you then take it. Together they explain the 18 of 20: an echo of your own leaning, adopted as if it were independent advice.
  - Caveat: 2023 models. Current Claude models were trained with sycophancy as an explicit target, so don't present these numbers as today's rates.
- *Mark:* **checked** (full text: §3.1–3.4, §4.1, §4.3).

**4. Perez, E., Ringer, S., Lukošiūtė, K., Nguyen, K., Chen, E., Heiner, S., … Kaplan, J. (2023).** "Discovering language model behaviors with model-written evaluations." *Findings of the ACL 2023*: 13387–13434. ACL Anthology 2023.findings-acl.847.
- *Status:* peer-reviewed.
- *What it found (sycophancy, §4, Fig. 2):*
  - *Setup.* The user's biography states a view. The questions are ones where people genuinely disagree: the Pew political typology quiz, the PhilPapers 2020 survey, and a survey of NLP researchers.
  - *Size.* Larger models answer in line with the user's stated view more often. The largest (52B) models match it in over 90% of answers on NLP and philosophy questions.
  - *RLHF.* Sycophancy is about the same at every amount of RL training, including none (pretrained models). The preference models reward sycophantic answers, so RLHF doesn't train it away.
- *Quote:* "sycophancy is similar for models trained with various numbers of RL steps" (§4.2).
- *Fit:* **good, with a correction.**
  - Your description ("sycophancy scales with model size / RLHF") is half right. It grows with model size. RLHF training didn't make it grow; it just didn't remove it, and the preference models reward it.
  - The study fits the design case unusually well, because its questions have no right answer, like design choices, and the model mirrors the user's view.
  - Caveat: Anthropic research models from 2022, up to 52B parameters, measured through answer probabilities, not deployed assistants.
- *Mark:* **checked** (full text: §4 and Fig. 2 caption).

**5. Sartre, J.-P. (1943).** *L'Être et le néant* (trans. H. Barnes, *Being and Nothingness*, 1956), Part One, ch. 2, "Bad Faith".
- *One line for the paper:* bad faith is fleeing your own freedom by treating your choice as fixed by facts, roles or others. "The model recommended it", offered as the reason, is bad faith when it presents a choice you made as something that happened to you.
- *Mark:* **known.**

**6. Austin, J. L. (1962).** *How to Do Things with Words*. Oxford: Clarendon Press (the 1955 William James Lectures).
- *One line for the paper:* a performative utterance does not report an act, it performs one. "I take option B" in the decision record doesn't describe a decision, it makes one, and binds the speaker. (The articles 11–15 note discusses Austin's conditions in more detail.)
- *Mark:* **known.**

### Better alternatives (same standard)

**A. Koriat, A., Lichtenstein, S. & Fischhoff, B. (1980).** "Reasons for confidence." *Journal of Experimental Psychology: Human Learning and Memory* 6(2): 107–118. doi:10.1037/0278-7393.6.2.107.
- *Status:* peer-reviewed.
- *What it found:*
  - *Experiment 1.* Listing reasons for and against each alternative before choosing markedly improved how well confidence matched accuracy.
  - *Experiment 2.* After choosing, writing one *contradicting* reason improved calibration. Writing one supporting reason did nothing; one of each was in the right direction but not significant.
  - *Their explanation.* Overconfidence comes partly from neglecting the evidence against your answer.
- *Quote:* "Only the listing of contradicting reasons improved the appropriateness of confidence" (abstract).
- *Fit:* **direct empirical support for "a stated case against restores the negative moment".** It also adds a detail the article can use: the case against has to be produced by the person deciding, and listing reasons *for* doesn't help.
  - Caveat: two-choice general-knowledge questions.
  - Secondary sources report later replications as mixed (Fischhoff & MacGregor 1982; Yates et al. 1992); I didn't check those.
- *Mark:* **checked** (abstract and Experiment 2 results).
- Fernandes et al. (2026), already checked in the earlier session, remains the empirical source for explain-back.

**B. Maier, M., Bartoš, F., Stanley, T. D., Shanks, D. R., Harris, A. J. L. & Wagenmakers, E.-J. (2022).** "No evidence for nudging after adjusting for publication bias." *PNAS* 119(31): e2200300119. doi:10.1073/pnas.2200300119.
- *Status:* a PNAS Letter, a short reply to Mertens et al. 2022.
- *What it found:* after correcting for publication bias with robust Bayesian meta-analysis, there was no evidence for nudges overall. For "structure" interventions, the category that includes defaults, the evidence was undecided: unadjusted d = 0.58 [0.50, 0.66], adjusted 0.12 [0.00, 0.43], BF01 = 1.12 (Table 1).
- *Quote:* "the evidence is undecided for 'structure' interventions".
- *Fit:* **not an alternative but the honest qualification** of the pooled default effect. The paper's "On the contrary" or a footnote should carry it.
- *Mark:* **checked** (full text).

### Chartable results

1. **Johnson & Goldstein 2003, figure p. 1338 (bottom): effective consent by country.** Eleven bars split into two groups, opt-in (4.25, 27.5, 17.17, 12) and opt-out (99.98, 98, 99.91, 99.97, 99.5, 99.64, 85.9). The best-known chart in this literature.
2. **Johnson & Goldstein 2003, figure p. 1338 (top): online experiment.** Opt-in 42, opt-out 82, neutral 79. Three bars, and the closer analogue to a one-click "recommended" choice.
3. **Jachimowicz et al. 2019 with Maier et al. 2022.** A dot-and-whisker chart: the pooled default effect, d = 0.68 [0.53, 0.83], beside the "structure" nudges from the other meta-analysis, unadjusted 0.58 [0.50, 0.66] and adjusted 0.12 [0.00, 0.43]. Label clearly that these are different study sets.
4. **Sharma et al.:** only a few figures are given in the text (98%, up to 27%, 95% and 45%). The per-model bars of Fig. 2 aren't tabulated, so don't redraw them.
5. **Perez et al.:** Fig. 2 is plotted only, apart from ">90%" for the 52B models. Don't redraw it.

---

## Sources (links)

- van der Bles et al. 2020, PNAS — https://doi.org/10.1073/pnas.1913678117 (open access, PMC7149229)
- van der Bles et al. 2019, R. Soc. Open Sci. — https://doi.org/10.1098/rsos.181870
- Shneiderman 1982, CACM — https://doi.org/10.1145/358628.358639
- Joslyn & LeClerc 2012, JEP: Applied — https://doi.org/10.1037/a0025185
- Lee & See 2004, Human Factors — https://doi.org/10.1518/hfes.46.1.50_30392
- Arrow & Fisher 1974, QJE — https://doi.org/10.2307/1883074
- Saphores & Carr 1999 (secondary summary of Arrow & Fisher) — https://www.realoptions.org/papers1999/Saphores.pdf
- Miller 1968, AFIPS — https://doi.org/10.1145/1476589.1476628
- Card, Robertson & Mackinlay 1991, CHI — https://doi.org/10.1145/108844.108874 (text read at https://courses.ischool.berkeley.edu/i213/s99/Readings/p181-card.pdf)
- Nah 2004, BIT — https://doi.org/10.1080/01449290410001669914
- Myers 1985, CHI — https://doi.org/10.1145/317456.317459 (text read at https://www.cs.cmu.edu/~bam/papers/percentdoneCHI85.pdf)
- Shneiderman 1984, ACM Computing Surveys — https://doi.org/10.1145/2514.2517 (text read at https://www.cs.umd.edu/users/ben/papers/Shneiderman1984Response.pdf)
- Dubuc 2018, "Magic numbers" (practitioner, illustration only) — https://calendar.perfplanet.com/2018/magic-numbers/
- Huang et al. 2024 — https://arxiv.org/abs/2310.01798
- Panickssery, Bowman & Feng 2024 — https://proceedings.neurips.cc/paper_files/paper/2024/file/7f1f0218e45f5414c79c0679633e47bc-Paper-Conference.pdf
- Zheng et al. 2023 — https://arxiv.org/abs/2306.05685
- Tyen et al. 2024 — https://doi.org/10.18653/v1/2024.findings-acl.826
- Kamoi et al. 2024 — https://doi.org/10.1162/tacl_a_00713
- Liu et al. 2024 — https://doi.org/10.1162/tacl_a_00638; tables in https://arxiv.org/abs/2307.03172v3
- Cronbach & Meehl 1955 — https://doi.org/10.1037/h0040957 (text read at https://psychclassics.yorku.ca/Cronbach/construct.htm)
- Campbell 1979 — https://doi.org/10.1016/0149-7189(79)90048-X; reprint https://doi.org/10.56645/jmde.v7i15.297
- Strathern 1997 — https://doi.org/10.1002/(SICI)1234-981X(199707)5:3<305::AID-EURO184>3.0.CO;2-4
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/ ; Understanding 1.4.3 — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Messick 1995 — https://doi.org/10.1037/0003-066X.50.9.741
- Johnson & Goldstein 2003 — https://doi.org/10.1126/science.1091721 (text read at https://www.dangoldstein.com/papers/DefaultsScience.pdf)
- Johnson & Goldstein 2004, Transplantation — https://www.dangoldstein.com/papers/JohnsonGoldstein_Defaults_Transplantation2004.pdf
- Jachimowicz et al. 2019 — https://doi.org/10.1017/bpp.2018.43
- Maier et al. 2022 — https://doi.org/10.1073/pnas.2200300119
- Sharma et al. 2024 — https://arxiv.org/abs/2310.13548
- Perez et al. 2023 — https://aclanthology.org/2023.findings-acl.847/
- Koriat, Lichtenstein & Fischhoff 1980 — https://doi.org/10.1037/0278-7393.6.2.107
- Known, not re-checked this session: Popper (1959); Coady (1992); Lipton (2004); van Fraassen, *Laws and Symmetry* (1989); Goodhart (1975); Sartre (1943); Austin (1962); Henry (1974); CSS Compositing and Blending Level 1.
