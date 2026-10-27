# Sources for articles 1–5 and the prologue

Working note, 27 October 2026. Reading material for *Examined Design*; not part of the paper.

**Evidence standard (Valentin's decision).** Each article rests on one or two peer-reviewed studies or established philosophical arguments, explained in plain words. Preprints and practitioner sources appear only as labelled illustration.

**Marks.**
- **checked**: I read the abstract or the relevant passage this session, and it says what is claimed.
- **known**: standard bibliography that I did not re-read this session.
- **not verified**: I couldn't reach it.

Every citation below was matched against its Crossref record this session (authors, title, venue, volume, issue, pages, DOI). None of the candidates turned out not to exist. The earlier session already checked Fernandes et al. 2026, Magnus 2025, Liu et al. 2024, Hsieh et al. 2024, Fleming & Lau 2014, Johnson/Hashtroudi/Lindsay 1993, Nguyen 2022, Moran 2005, Hinchman 2005, Knight 2023 (SEP), Grice via SEP, Leonard 2021 (SEP), *Meno* 98a, *Apology* 38a and Aquinas ST I q1 a5 (in an earlier notes file, not published here). I cite them where they help but did not re-verify them.

**Quotations.** Verbatim quotes are kept to two public-domain sentences (Hume, and Learned Hand J via Gardner) and a few coined terms. Everything else is paraphrase with a figure, table or page locator, so the exact wording can be pulled from the source at that place.

**Numbers.** Every figure below was read in the source, or in a source I name. Nothing is rounded or read off a plot. Where a figure exists only as a plot, I say so and give no numbers. Where I read a preprint or postprint instead of the published version, I say which.

---

## Summary

**Mis-described or weaker than proposed**
- **Mitchell, Russo & Pennington 1989.** The "~30% more reasons" figure is not in the paper's abstract. It circulates through Gary Klein's HBR premortem article (practitioner). The paper itself found that *outcome certainty*, not temporal perspective, made explanations longer and more concrete.
- **Buçinca et al. 2021.** None of the three interventions is explain-back. The closest is "update" (decide first, then see the AI). The drop in overreliance was significant for one sub-decision, not for the overall decision.
- **Blackwell 2006** is a history of how HCI theorises metaphor. It does not show that a metaphor makes users infer false things, so it is weak support for "Trash implies gone".
- **Arrow & Fisher 1974** is about a planner's option value under uncertainty. It works for the paper only as an analogy, and the effect fails under some assumptions.
- **Argyle et al. 2023** supports the objection, not the claim. Fidelity holds for aggregate survey distributions and collapses for the hardest-to-predict group.
- **Camerer et al. 1989** studies earnings predictions. Keysar & Henly 2002 is closer to word meaning.
- **Doshi & Hauser 2024 and Anderson et al. 2024** measure homogenisation of AI-assisted output, not "convention". That is fine for a judgement labelled unmeasured.
- **Pruitt & Grudin 2003** weight personas by market share, which is a frequency claim drawn from data. That is exactly what Chapman & Milham say cannot be verified.
- **Nielsen 1994** used one rater and derived nine heuristics, not ten. It says nothing about empty states.
- **Fricker.** The developmental-phase versus mature-hearer distinction is attributed by the SEP to Fricker 1995, not 1994.
- **Bowker & Star 1999** is a university-press monograph, not a peer-reviewed article. Its most quoted line was found only in a publisher synopsis.

**Strongest per article**
1. Hume, *Treatise* 3.1.1.27 for the value premise. Tversky & Kahneman 1974 for the objection, with Mussweiler et al. 2000 for the reply. The empirical leg for "name it first" is thin.
2. Wang, Morgenstern & Dickerson 2025 for tagging model-played personas as fiction. Chapman & Milham 2006 with Gardner 2015 for yardstick, not sample.
3. Nickerson, Varshney & Muntermann 2013 for kinds and taxonomies. SEP "Fallacies" for composition and division. Nielsen 1994 for system status.
4. Furnas et al. 1987, plus Keysar & Henly 2002 once its numbers are confirmed.
5. Fricker 1994 via the SEP, with Lee & See 2004 for trust earned per kind of claim. Parasuraman & Manzey 2010 for why vigilance alone fails. Goddard et al. 2012 for signing. Fernandes et al. 2026 (already checked) remains the direct source for explain-back.

**Chartable results** (details in each section)
- Tversky & Kahneman 1974: anchoring medians.
- Argyle et al.: Table 1 correlations by group.
- Pruitt & Grudin: Figure 4 matrix (an invented example).
- Nielsen 1994: variance explained and Table 1 cumulative coverage.
- Doshi & Hauser: novelty, usefulness and similarity.
- Anderson et al.: Figures 2 and 4.
- Buçinca et al.: Tables 2 and 3.

---

## Article 1. Whether the worst thing the product can do should be named before anything is drawn

*Claim:* findings never rank themselves, so a value premise is needed. The worst outcome is an irreversible act a user takes on a false belief the product gave them. Naming it first is a written premise, and it can be revised. *Objection:* naming it first anchors the project.

### Candidates

**1. Hume, D. (1739–40).** *A Treatise of Human Nature*, 3.1.1.27 (SBN 469–70).
- *Status:* established philosophy.
- *What it says:* Hume notices that moral writers move from statements about what is to statements about what ought to be, without explaining how the new relation follows. He asks that the step be explained. Public-domain wording: "no proposition that is not connected with an ought, or an ought not".
- *Fit:* **good.** A pile of findings is all "is". Ranking them needs an "ought" premise that has to be written down. One caution: interpreters disagree whether Hume forbids the step outright or only demands that it be justified. The paper should say "the ought needs its own premise", not "Hume proved values can't come from facts".
- *Mark:* **checked** (davidhume.org, T 3.1.1.27).

**2. Mitchell, D. J., Russo, J. E. & Pennington, N. (1989).** "Back to the future: Temporal perspective in the explanation of events." *Journal of Behavioral Decision Making* 2(1): 25–38. doi:10.1002/bdm.3960020103.
- *Status:* peer-reviewed journal.
- *What it says (abstract):* the study separated two things:
  - temporal perspective: whether the event is set in the future or the past;
  - outcome uncertainty: whether the event is certain or only possible.

  In Experiment 1, temporal perspective had little influence, while certainty strongly affected explanations. Explanations of certain events were longer, contained a higher share of episodic (concrete, story-like) reasons, and were in the past tense. Experiment 2 suggests that uncertainty changes which kind of explanation people choose, not how long they spend explaining.
- *Fit:* **usable, but mis-described.**
  - The "~30%" figure is not in the abstract. Secondary sources trace it to Klein's *Harvard Business Review* premortem piece (2007), which is practitioner and was not checked here.
  - The paper credits certainty ("it has happened"), not the shift in time.
  - Defensible wording: "treating a bad outcome as having happened produces longer, more concrete accounts of how it came about." That still fits "write the worst outcome down as if it had happened".
- *Mark:* **checked** (abstract). Full text not reached (Wiley returned 403), so no numbers.

**3. Arrow, K. J. & Fisher, A. C. (1974).** "Environmental preservation, uncertainty, and irreversibility." *Quarterly Journal of Economics* 88(2): 312–319. doi:10.2307/1883074.
- *Status:* peer-reviewed journal.
- *What it says:* the opening states that uncertainty about an activity's environmental costs will, in important cases, reduce its net benefits, which argues for restricting it. In a two-period model, development is irreversible and information about future values arrives over time. Keeping the option to wait has a value even for a risk-neutral planner, which they called "quasi-option value". Henry (1974, *AER* 64: 1006–1012) made the same point independently and named it the "irreversibility effect". The effect can fail when the model's assumptions are relaxed (Epstein 1980; Freixas & Laffont 1984).
- *Fit:* **analogy only.** Their actor is a planner choosing whether to develop a resource, not a user acting on a false belief. What transfers is the core point: an irreversible act removes the chance to correct course once better information arrives, so it deserves extra weight in a ranking.
- *Mark:* **checked** (opening paragraph). The model, the term and the caveats are **known**, confirmed through secondary economics sources, not the paper.

**4. Tversky, A. & Kahneman, D. (1974).** "Judgment under uncertainty: Heuristics and biases." *Science* 185(4157): 1124–1131. doi:10.1126/science.185.4157.1124.
- *Status:* peer-reviewed journal.
- *What it says (p. 1128):*
  - A wheel of fortune gave an arbitrary starting number. The median estimate of the percentage of African countries in the UN was 25 for the group that got 10, and 45 for the group that got 65. Paying for accuracy did not reduce the effect.
  - In 5 seconds, high-school students estimated 1×2×…×8 at a median of 512, and 8×7×…×1 at a median of 2,250. The correct answer is 40,320.
- *Fit:* **good for the objection, with a gap.** These anchors are arbitrary numbers in numerical estimates. "The worst outcome" is a qualitative premise chosen for reasons. That it anchors a project's priorities is an extrapolation. The reply needs a debiasing source (alternative A below).
- *Mark:* **checked** (full text).

### Better alternatives (same standard)

**A. Mussweiler, T., Strack, F. & Pfeiffer, T. (2000).** "Overcoming the inevitable anchoring effect: Considering the opposite compensates for selective accessibility." *Personality and Social Psychology Bulletin* 26(9): 1142–1150. doi:10.1177/01461672002611010.
- *Status:* peer-reviewed journal.
- *What it says:* considering the opposite, that is, listing reasons why an anchor is inappropriate, reduced anchoring. Study 1 showed this with experts in a real-world setting. Study 2 found the effects of anchoring and of considering the opposite to be additive.
- *Why it fits:* this is the reply to the objection. A premise that is written down and must meet its strongest objection is a consider-the-opposite procedure, which is the debiasing step the evidence supports. The classic origin is Lord, Lepper & Preston (1984), *JPSP* 47(6): 1231–1243, doi:10.1037/0022-3514.47.6.1231 (abstract checked).
- *Mark:* **checked** (abstract). Study numbers not reached.

**B. Jonas, H. (1979; English 1984).** *The Imperative of Responsibility: In Search of an Ethics for the Technological Age*. University of Chicago Press. doi:10.7208/chicago/9780226850337.001.0001.
- *Status:* established philosophy.
- *What it says:* Jonas's "heuristics of fear" holds that, for technologies whose effects are long and hard to reverse, the bad prognosis should take precedence over the good one. He also argues that we recognise what we must avoid more readily than what we want, so imagining the loss is how we find what we value.
- *Why it fits:* this is the established philosophical argument for naming the worst outcome first, and the standard criticism of Jonas (precaution bias) is the article's objection.
- *Mark:* **known.** Exact wording and pages not verified. Secondary sources point to pp. 26–28 and 202–203 of the 1984 edition.

### Chartable

- **Tversky & Kahneman 1974, p. 1128 (text, no figure).**
  - UN estimate: anchor 10 gives a median of 25; anchor 65 gives a median of 45.
  - Product estimate: ascending order gives a median of 512; descending order gives 2,250; the true value is 40,320.

  A two-pair bar chart works.

---

## Article 2. Whether a persona nobody has met can serve as the yardstick

*Claim:* a persona is a yardstick, not a sample. It fixes frequency and stakes, and it is consulted, never cited. System truth checks claims. What a word means to a real reader is the named limit. The model may play the persona only if its answers are tagged as fiction, never as evidence.

### Candidates

**1. Chapman, C. N. & Milham, R. P. (2006).** "The personas' new clothes: Methodological and practical arguments against a popular method." *Proceedings of the Human Factors and Ergonomics Society Annual Meeting* 50(5): 634–636. doi:10.1177/154193120605000503.
- *Status:* peer-reviewed proceedings. It is a three-page argument with no data.
- *What it says:* you cannot tell how many users, if any, a persona represents, so you cannot tell whether it is relevant. Personas can be neither verified nor falsified, so they have no demonstrable validity. They invite political conflict and weaken a team's ability to settle questions with data. Until this is resolved, personas should not be treated as a way to communicate data.
- *Fit:* **exact for objection 1, and it helps the article.** If a persona claims to be a sample, it fails on these grounds. The article's answer is that it doesn't claim to be one.
- *Mark:* **checked** (abstract).

**2. Pruitt, J. & Grudin, J. (2003).** "Personas: Practice and theory." *Proceedings of DUX 2003*, ACM, pp. 1–15. doi:10.1145/997078.997089.
- *Status:* peer-reviewed conference; a practice report from Microsoft (MSN Explorer, Windows). The authors say they did not formally measure the personas' impact.
- *What it says:*
  - Personas should complement other methods, not replace them, and their greatest value is a shared basis for communication.
  - Creating personas made the team's assumptions about its audience explicit.
  - Figure 4 is a "feature by Persona-weighted priority matrix". Each feature gets a score per persona, from −1 (the persona is confused, annoyed or harmed) to +2 (the persona loves it). The sums are weighted by "the proportion of the market each represents".
- *Fit:* **good for "consulted, never cited", with one correction.** The matrix is the yardstick in action: it fixes stakes (the −1 to +2 scale) and frequency (the weights). But their weights are market shares, a claim about real people drawn from data, which is exactly what Chapman & Milham say a persona can't carry. So the article should present frequency as a written premise to be checked against system truth or research, not as something the persona knows. The theory section (theory of mind, engagement) is argued, not tested.
- *Mark:* **checked** (full text).

**3. Matthews, T., Judge, T. & Whittaker, S. (2012).** "How do designers and user experience professionals actually perceive and use personas?" *Proc. CHI 2012*, pp. 1219–1228. doi:10.1145/2207676.2208573.
- *Status:* peer-reviewed conference (full paper). Qualitative: 14 experienced practitioners (10 designers, 4 UX professionals) at one company. Each 90-minute session had a 20-minute interview, a 40-minute cognitive walkthrough with two personas, and a 20-minute debrief.
- *What it says:* practitioners used personas almost only for communication, not for their own design work. They named four problems:
  - personas are abstract;
  - personas are impersonal;
  - personifying details mislead, because they create false constraints on the design problem;
  - personifying details distract.

  The "moderates" used only the role information and ignored the personal details. The authors conclude that personas cannot replace immersion in real user data.
- *Fit:* **good.** It supports stripping the yardstick down to role, frequency and stakes, and treating personal colour as fiction. It also backs "what a word means to a real reader is the named limit": practitioners wanted contact with real users. Caveat: small sample from one company.
- *Mark:* **checked** (full text).

**4. Argyle, L. P., Busby, E. C., Fulda, N., Gubler, J. R., Rytting, C. & Wingate, D. (2023).** "Out of one, many: Using language models to simulate human samples." *Political Analysis* 31(3): 337–351. doi:10.1017/pan.2023.2.
- *Status:* peer-reviewed journal.
- *What it says:* GPT-3, conditioned on sociodemographic backstories of real survey respondents, produces "silicon samples" whose response distributions match human subgroups. The authors call this "algorithmic fidelity" and test four criteria for it: a social-science Turing test, backward continuity, forward continuity and pattern correspondence. Results:
  - Study 1: evaluators judged 61.7% of human-written lists and 61.2% of GPT-3 lists to be human-written (p = 0.44).
  - Study 2, Table 1: the tetrachoric correlation between GPT-3 and American National Election Studies (ANES) vote reports for the whole sample was 0.90 (2012), 0.92 (2016) and 0.94 (2020).
  - The one exception was pure independents, the group the authors note is hardest to predict.
- *Fit:* **this is the objection, not support.** Fidelity concerns aggregate distributions on political survey items, conditioned on real people's backstories. A designer's imagined persona has no such backstory. Use it as the strongest objection and answer it with Wang et al.
- *Mark:* **checked.** Abstract from the published version. Numbers from the arXiv preprint (2209.06899v1), because the published full text was behind a login. Confirm the Table 1 values against the published version before charting.

**5. Wang, A., Morgenstern, J. & Dickerson, J. P. (2025).** "Large language models that replace human participants can harmfully misportray and flatten identity groups." *Nature Machine Intelligence* 7(3): 400–411. doi:10.1038/s42256-025-00986-z.
- *Status:* peer-reviewed journal.
- *Design:* four LLMs (Llama-2-Chat 7B, Wizard Vicuna Uncensored 7B, GPT-3.5-Turbo, GPT-4), 3,200 human participants, 16 demographic identities, nine free-response questions.
- *Three limitations:*
  - **Misportrayal:** an identity-prompted model sounds more like what outsiders imagine the group says than what members say (Fig. 2).
  - **Group flattening:** model responses are less diverse than human ones. GPT-4 and GPT-3.5 tended to cover only 3 of 5 multiple-choice options across 100 responses (Fig. 4).
  - **Identity essentialisation.**
- *Mitigations:* identity-coded names and higher temperature reduce the harms but don't remove them.
- *Relevance:* the paper names "user testing a product" as one of the uses it covers.
- *Fit:* **strong; the best empirical support for the tagging rule.** A model playing a persona produces an outsider's caricature with too little variance. That is fiction, not evidence. Caveat: the models date from mid-2023.
- *Mark:* **checked** (arXiv 2402.01908v3, the version accepted at the journal; the Nature page needed a login).

**6. Vaihinger, H. (1911).** *Die Philosophie des Als Ob*; trans. C. K. Ogden, *The Philosophy of "As If"* (1924).
- *Status:* established philosophy.
- *What it says (via Stoll, "Hans Vaihinger", SEP, 2020):*
  - A hypothesis says "it is possible that A is B". It tries to express reality and can be confirmed or refuted.
  - A fiction says "A is to be regarded as if it were B", when A is not B. It is justified by usefulness, not evidence, and it is held consciously.
- *Fit:* **exact.** A persona is a fiction in Vaihinger's sense (a yardstick), not a hypothesis (a sample). The consciousness condition is the tagging rule: a fiction is legitimate only while everyone knows it is one.
- *Mark:* **checked via SEP.** The book is **known**.

**7. The reasonable person: Gardner, J. (2015).** "The many faces of the reasonable person." *Law Quarterly Review* 131: 563–584. Reprinted in Gardner, *Torts and Other Wrongs* (OUP 2019), ch. 9, pp. 271–303, doi:10.1093/oso/9780198852940.003.0009.
- *Status:* peer-reviewed legal-philosophy journal (the Oxford repository lists it as peer-reviewed).
- *What it says:* the reasonable person sets extra-legal, normative standards. He can be thought of as "the justified person". Tension arises when he also does "double service" as the Man on the Clapham Omnibus, the average person. Gardner quotes Learned Hand J (*The T.J. Hooper*, 1932): "reasonable prudence is in fact common prudence; but strictly it is never its measure."
- *Fit:* **exact.** The law's best-known yardstick person is explicitly not a statistical average. That is the article's distinction between yardstick and sample.
- *Mark:* **checked** (the author's 2013 preprint on his website). Wording may differ slightly from the published version.

### Better alternative (same standard)

**A. Chapman, C. N., Love, E., Milham, R. P., ElRif, P. & Alford, J. L. (2008).** "Quantitative evaluation of personas as information." *Proceedings of the HFES Annual Meeting* 52(16): 1107–1111. doi:10.1177/154193120805201602.
- *Status:* peer-reviewed proceedings.
- *What it says:* an analytic model predicts that the share of people matching a persona falls quickly as attributes are added. Six survey datasets (N = 268 to 10,307), with 10,000 random persona-like descriptions each, confirm it. The correlation between observed and predicted prevalence ranges from r(9998) = 0.394 to 0.869.
- *Why it fits:* this is the data behind Chapman & Milham 2006.
- *Mark:* **checked** (abstract).

### Chartable

- **Argyle et al., Table 1** (arXiv v1; confirm against the published version). Tetrachoric correlation between GPT-3 and ANES vote, for 2012 / 2016 / 2020:

  | Group | 2012 | 2016 | 2020 |
  |---|---|---|---|
  | Whole sample | 0.90 | 0.92 | 0.94 |
  | Strong partisans | 0.99 | 1.00 | 1.00 |
  | Weak partisans | 0.73 | 0.71 | 0.84 |
  | Pure independents | 0.31 | 0.41 | 0.02 |

  A grouped bar chart shows high fidelity on average and collapse for the least predictable group.
- **Argyle et al., Study 1 (text):** 61.7% of human lists versus 61.2% of GPT-3 lists judged human-written.
- **Pruitt & Grudin, Figure 4.** This is an invented example, not data, so label it as an illustration.
  - Persona weights: 50, 35, 15.
  - Feature 1 scores 0, 1, 2 (weighted sum 65).
  - Feature 2 scores 2, 1, 1 (150).
  - Feature 3 scores −1, 1, 0 (−15).
  - Feature 4 scores 1, 1, 1 (100).

---

## Article 3. Whether every screen must be exactly one kind of thing

*Claim:* a kind is worth having only if it obliges something. Taxonomies are made, and judged by what they let you count. Reading a property of the parts as a property of the whole is the fallacy of composition (and the reverse, division). An empty state is a claim the product may make only after a read.

### Candidates

**1. Bowker, G. C. & Star, S. L. (1999).** *Sorting Things Out: Classification and Its Consequences*. MIT Press, Inside Technology series. ISBN 0-262-02461-6 (cloth); paperback 9780262522953 (2000).
- *Status:* scholarly monograph from a university press. Not peer-reviewed in the journal sense, but standard in science and technology studies and information science.
- *What it says:* classifications are human-made infrastructure with moral and political consequences: each category favours some viewpoints and silences others. The case studies include the International Classification of Diseases, race classification under apartheid, and the Nursing Interventions Classification.
- *Fit:* **good for "taxonomies are made"**, weaker for "judged by what they let you count". Nickerson et al. (below) is more direct on that.
- *Mark:* **known.** The well-known "valorizes some point of view and silences another" line was found only in a publisher synopsis. Wording and page not verified against the book, so don't quote it until checked.

**2. Nielsen, J. (1994).** "Enhancing the explanatory power of usability heuristics." *Proc. CHI '94*, pp. 152–158. doi:10.1145/191666.191729.
- *Status:* peer-reviewed conference.
- *What it says:*
  - Method: 101 heuristics from seven published sets were each rated (0–5) for how well they explained each of 249 usability problems from 11 projects.
  - Factor analysis: Factor 1, "visibility of system status", explained 6.1% of the variance and Factor 2 (match with the real world) 5.9%. The seven factors above 3% each added up to only 30%. The 25 factors at 1% or more added up to 62%. 53 factors were needed for 90%.
  - Conclusion: usability problems come from a broad variety of causes. Nielsen therefore chose heuristics by explanatory coverage (Table 1).
  - The abstract lists nine heuristics; the familiar ten came later.
- *Caveats in the paper:*
  - One rater, the author, did all the ratings, because no one else had worked on all the projects. Nielsen warns against relying on fine distinctions.
  - He cites Jeffries: three usability specialists fully agreed on only about two-thirds of the items in a simple classification of usability problems.
- *Fit:* **good for system status, and better than proposed for the taxonomy point.** The paper is a worked example of kinds chosen by what they let you count (coverage), not by what is "really there", and the Jeffries aside shows that classifying is a judgement. Mismatch: it says nothing about empty states. "An empty state is a claim made only after a read" is the author's inference from visibility of status plus Grice's maxim of Quality (Grice was checked earlier).
- *Mark:* **checked** (full text, a scanned copy).

**3. Fallacies of composition and division: Hansen, H. "Fallacies."** *Stanford Encyclopedia of Philosophy*, first published 29 May 2015, substantive revision 30 Aug 2024.
- *Status:* refereed reference work.
- *What it says:* composition and division are the mistakes of treating properties of parts and wholes as transferable from one to the other. The entry's example: a team of excellent researchers is not thereby an excellent research team. It warns that Aristotle's "combination and division" is a different, linguistic fallacy, so don't cite Aristotle for the modern part–whole sense. A standard logic textbook (Copi & Cohen, *Introduction to Logic*) treats these as fallacies of ambiguity.
- *Fit:* **exact.**
- *Mark:* **checked** (SEP). The textbook is **known**.

### Better alternative (same standard)

**A. Nickerson, R. C., Varshney, U. & Muntermann, J. (2013).** "A method for taxonomy development and its application in information systems." *European Journal of Information Systems* 22(3): 336–359. doi:10.1057/ejis.2012.26.
- *Status:* peer-reviewed journal.
- *What it says:*
  - A taxonomy is a set of dimensions, each with mutually exclusive and collectively exhaustive characteristics, so that every object has exactly one characteristic per dimension.
  - The basis of the taxonomy (the "meta-characteristic") is chosen from its purpose, which in turn comes from its users and their expected use.
  - The test is usefulness, not truth; the authors note that design science seeks utility rather than truth.
  - Usefulness has five qualities: concise, robust, comprehensive, extendible, explanatory. In the end it may come down to whether others use the taxonomy.
- *Why it fits:* this is the most direct support for "a kind is worth having only if it obliges something" and "judged by what it lets you count". It also sharpens the article: "exactly one kind" is a per-dimension condition. A screen can be exactly one kind on each dimension the team has declared, and the dimensions must come from what the kinds are for.
- *Mark:* **checked** (open-access postprint, University of Augsburg).

### Chartable

- **Nielsen 1994 (text):** variance explained by Factor 1 6.1% and Factor 2 5.9%; 7 factors 30%; 25 factors 62%; 53 factors 90%. A cumulative line shows there is no small set of kinds.
- **Nielsen 1994, Table 1.** Cumulative share of the 249 problems explained by the top ten heuristics, in order: 23, 39, 52, 59, 65, 71, 76, 80, 83, 85%.
  - The first three heuristics are consistency, speak the user's language, and feedback showing receipt of input.
  - These values were read from an OCR'd scan, so check them against the printed table before charting.
  - The paper's bottom list (82 serious problems) was too garbled in the scan to use.

---

## Article 4. Whether a word means what the designer means by it

*Claim:* meaning is in the reader, who brings every other product they know. Implicature carries claims: "Trash" implies "gone" and "space comes back". A word can be examined without readers by listing its implicatures and checking that the product delivers each one. Judgement, labelled unmeasured: models lean toward convention.

### Candidates

**1. Furnas, G. W., Landauer, T. K., Gomez, L. M. & Dumais, S. T. (1987).** "The vocabulary problem in human-system communication." *Communications of the ACM* 30(11): 964–971. doi:10.1145/32206.32212.
- *Status:* refereed journal article.
- *What it says:* the study covered spontaneous word choice in five application-related domains. In every case, two people chose the same term with probability below 0.20. Access through one designer's favourite word gives 80–90% failure rates in many common situations. "Unlimited aliasing" (accepting many words) improves this several-fold.
- *Fit:* **strong.** Your "less than ~20%" is right. The per-domain table was not reached.
- *Mark:* **checked** (abstract).

**2. Camerer, C., Loewenstein, G. & Weber, M. (1989).** "The curse of knowledge in economic settings: An experimental analysis." *Journal of Political Economy* 97(5): 1232–1254. doi:10.1086/261651.
- *Status:* peer-reviewed journal.
- *What it says:* better-informed people cannot ignore what they know when predicting the judgements of less-informed people. In the experiments, they predicted others' estimates of company earnings, and the model has a parameter w, where w = 0 means no bias. Feedback alone had little effect. Market forces reduced the curse by about 50% but did not remove it.
- *Fit:* **supports "the designer can't un-know", but the domain is far.** Keysar & Henly (below) test it on what an utterance means.
- *Mark:* **checked** (full text; Caltech copy).

**3. Blackwell, A. F. (2006).** "The reification of metaphor as a design tool." *ACM TOCHI* 13(4): 490–530. doi:10.1145/1188816.1188820.
- *Status:* peer-reviewed journal.
- *What it says:* a history of the interface-metaphor idea, drawing on education, philosophy and the sociology of science, plus a study of HCI researchers' attitudes 30 years on. It argues that metaphor became "reified" as a design tool.
- *Fit:* **weak for this use.** It is about how the field theorises metaphor, not evidence that a metaphor such as Trash makes users infer specific false things. Use Grice for the mechanism and Halasz & Moran (below) for the design warning.
- *Mark:* **checked** (abstract).

**4. Doshi, A. R. & Hauser, O. P. (2024).** "Generative AI enhances individual creativity but reduces the collective diversity of novel content." *Science Advances* 10(28): eadn5290. doi:10.1126/sciadv.adn5290.
- *Status:* peer-reviewed journal; preregistered.
- *Design:* 293 writers and 600 evaluators (3,519 evaluations). Writers had no AI, one AI idea, or up to five AI ideas.
- *What it found:*
  - Novelty rose by 5.4% with one idea and 8.1% with five. Usefulness rose by 3.7% and 9.0% (Fig. 2; table S3).
  - Gains were largest for less creative writers (Fig. 3).
  - Stories became more similar to each other: b = 0.871 with one idea and 0.718 with five, which is 10.7% and 8.9% of the human-only range (Fig. 4; table S11).
  - Stories were also 5.2% and 5.0% more similar to the AI idea.
- *Fit:* **supports the labelled judgement, not as proof.** It shows AI-assisted output converging on a common centre. It does not measure conventional wording in interfaces.
- *Mark:* **checked** (full text, PMC11244532).

**5. Anderson, B. R., Shah, J. H. & Kreminski, M. (2024).** "Homogenization effects of large language models on human creative ideation." *Proc. Creativity & Cognition '24*, pp. 413–425. doi:10.1145/3635636.3656204.
- *Status:* peer-reviewed conference.
- *Design:* 36 participants, within-subjects, ChatGPT versus the Oblique Strategies card deck.
- *What it found:*
  - At group level, ideas were less divergent with ChatGPT (M = .24 vs .28; t(32) = 2.154, p = .038, d = .47; Fig. 2).
  - At individual level there was no difference (.65 vs .66, n.s.; Fig. 3).
  - ChatGPT users produced more, and more detailed, ideas.
  - They gave themselves less responsibility for their ideas (48.17% vs 63.63%; t(32) = 3.21, p = .003, d = .67; Fig. 4).
- *Fit:* **same as Doshi & Hauser.** Caveats: small sample, the comparison is a card deck rather than working unaided, and the tasks are open ideation.
- *Mark:* **checked** (the arXiv 2402.01536 version of the paper).

### Better alternatives (same standard)

**A. Keysar, B. & Henly, A. S. (2002).** "Speakers' overestimation of their effectiveness." *Psychological Science* 13(3): 207–212. doi:10.1111/1467-9280.00439.
- *Status:* peer-reviewed journal.
- *What it says:* speakers read ambiguous sentences while trying to convey one meaning. They consistently overestimated how often listeners understood the intended meaning. Overhearers who knew the intended meaning did not overestimate. Speakers underestimate the ambiguity of their own words.
- *Why it fits:* this is the closest experiment to the article's title. The designer is the speaker.
- *Numbers, from a University of Chicago news release only (not verified against the paper):*
  - 40 pairs, 12 syntactically and 4 lexically ambiguous sentences;
  - listeners misunderstood 39% of the time;
  - when speakers thought they had been understood, they were wrong 46% of the time.

  The widely repeated "72% expected vs 61% actual" was not verified.
- *Mark:* **checked** (abstract). Numbers **not verified**.

**B. Halasz, F. & Moran, T. P. (1982).** "Analogy considered harmful." *Proc. CHI '82* (Human Factors in Computer Systems, Gaithersburg), pp. 383–386. doi:10.1145/800049.801816.
- *Status:* peer-reviewed conference.
- *What it says:* analogies for computer systems, such as the typewriter and the filing cabinet, invite users to carry over inferences that don't hold.
- *Why it fits:* this is the design-side warning behind "Trash implies gone and space comes back".
- *Mark:* **known.** Citation confirmed; text not read.

### Chartable

- **Doshi & Hauser, text with Figs 2 and 4:** novelty +5.4% / +8.1%; usefulness +3.7% / +9.0%; similarity to other stories +10.7% / +8.9% of range (one AI idea / five AI ideas). A pair of bars shows individual gains against collective convergence.
- **Anderson et al., Figs 2 and 4:** group-level divergence .24 (ChatGPT) vs .28 (deck); self-assigned responsibility 48.17% vs 63.63%.
- **Furnas et al. (abstract):** a single number (two people agree on a term less than 20% of the time), better as a sentence than a chart.
- Don't chart Keysar & Henly until the paper's own numbers are read.

---

## Article 5. Whether text nobody decided may ship

*Claim:* where text came from is no reason to ship it, but when its origin is its only support, it is testimony. A model gets no default credit. Trust is earned per kind of claim, by checking. Everything accepted gets explained back, everything that ships gets a full decision record, and undecided text stays in drafts.

### Candidates

**1. Fricker, E. (1994).** "Against gullibility." In B. K. Matilal & A. Chakrabarti (eds.), *Knowing from Words*, Synthese Library 230, Kluwer, pp. 125–161. doi:10.1007/978-94-017-2018-2_8.
- *Status:* chapter in an edited volume; established philosophy.
- *What it says:*
  - Via the SEP (Leonard 2021, checked earlier): Fricker 1994 is cited for the point that it is a mistake to treat testimony as a single unified source. Reliability is assessed category by category, for example by subject matter.
  - Via secondary summaries: she argues against a "presumptive right" to trust a speaker. Some monitoring of trustworthiness is required to avoid gullibility.
- *Fit:* **strong for "no default credit; trust per kind of claim".** Correction: the SEP attributes the developmental-phase versus mature-hearer distinction to Fricker 1995 (the *Mind* critical notice of Coady), not to 1994. Cite 1995 if the article uses it, or check 1994 first.
- *Mark:* **known.** Position checked via the SEP; the chapter itself not read.

**2. Lee, J. D. & See, K. A. (2004).** "Trust in automation: Designing for appropriate reliance." *Human Factors* 46(1): 50–80. doi:10.1518/hfes.46.1.50_30392.
- *Status:* peer-reviewed journal; a conceptual review.
- *What it says (abstract):* reliance on automation goes wrong when trust is inappropriate. Trust matters most where complexity makes full understanding impractical. The review gives a model of how context, automation characteristics and display design affect appropriate trust.
- *Concepts the article needs:*
  - **calibration:** whether trust matches capability;
  - **resolution:** how finely trust tracks differences in capability;
  - **functional specificity:** trust differentiated across functions, sub-functions and modes.
- *Fit:* **good.** "Trust earned per kind of claim" is functional specificity. Caveat: the review is about automation in general, not language models.
- *Mark:* abstract **checked**. The three definitions are **known**: consistent across secondary sources, but the original passage was not reached (no accessible PDF).

**3. Parasuraman, R. & Manzey, D. H. (2010).** "Complacency and bias in human use of automation: An attentional integration." *Human Factors* 52(3): 381–410. doi:10.1177/0018720810376055.
- *Status:* peer-reviewed review with an integrated model.
- *What it says:*
  - Complacency arises when other tasks compete for attention. It is found in both novices and experts and is not overcome by simple practice.
  - Automation bias produces omission and commission errors with imperfect aids. It occurs in novices and experts, cannot be prevented by training or instructions, and affects teams as well as individuals.
- *Fit:* **good.** It explains why "be careful with the model" is not enough, and why the discipline has to be structural (a decision record, drafts kept apart).
- *Mark:* **checked** (abstract).

**4. Buçinca, Z., Malaya, M. B. & Gajos, K. Z. (2021).** "To trust or to think: Cognitive forcing functions can reduce overreliance on AI in AI-assisted decision-making." *Proc. ACM Hum.-Comput. Interact.* 5(CSCW1), Article 188, pp. 1–21. doi:10.1145/3449287.
- *Status:* peer-reviewed journal (CSCW).
- *Design:*
  - N = 199 after exclusions from 260.
  - A simulated AI, 75% accurate, helped with a meal task: find the high-carbohydrate ingredient and choose a substitute.
  - Three forcing designs: on demand (click to see the AI), update (decide first, then see the AI and revise), and wait (30 seconds before the AI appears).
  - These were compared with two explanation-only designs and a no-AI condition.
- *Results when the AI was wrong (Table 2):*
  - For the carbohydrate-source decision, overreliance was 0.64 with explanation-only designs vs 0.48 with forcing, and correct answers 0.08 vs 0.27.
  - For the overall decision, overreliance was 0.30 vs 0.26 (not significant) and correct answers 0.03 vs 0.09.
- *Subjective results:* trust was 3.91 vs 3.72 (not significant). The designs that cut overreliance most were liked least. People high in need for cognition benefited more.
- *Fit:* **partial.** It supports "make the person engage before accepting". It does not test explain-back, and the effect on the overall decision was not significant. Fernandes et al. 2026 (already checked) is the direct source for explain-back.
- *Mark:* **checked** (full text, arXiv 2102.09692).

**5. Rozenblit, L. & Keil, F. (2002).** "The misunderstood limits of folk science: An illusion of explanatory depth." *Cognitive Science* 26(5): 521–562. doi:10.1207/s15516709cog2605_1.
- *Status:* peer-reviewed journal.
- *What it says:*
  - Study 1: 16 graduate students rated their understanding of devices such as a zipper or a cylinder lock on a 7-point scale, wrote a causal explanation, and rated again.
    - Ratings dropped after explaining and after a diagnostic question: F(4, 56) = 16.195, p < .001, with T1 differing from T2–T4.
    - Ratings rose again only after an expert explanation.
  - Study 2 replicated this with 33 undergraduates: F(4, 124) = 38.9.
  - The illusion is stronger for explanatory knowledge than for facts, procedures or narratives (Studies 7–10).
  - The authors read the drop as recalibration: trying to explain exposes the gaps.
- *Fit:* **good for the mechanism.** Explaining shows you the limits of what you understand. Mismatch: participants judged their own knowledge of devices, not someone else's claim, so it needs Fernandes to reach model output.
- *Mark:* **checked** (full text, PMC3062901). Means appear only in Figure 3, so no numbers are given.

**6. Reid, T. (1764).** *An Inquiry into the Human Mind on the Principles of Common Sense*, ch. 6 §24.
- *What it says:* two matched original principles: a "principle of veracity" (a disposition to speak truth) and a "principle of credulity" (a disposition to believe what we are told). Secondary sources cite p. 94 of the Beanblossom & Lehrer edition.
- *Fit:* **good as the position the article rejects for models.** The ground is a disposition the model lacks.
- *Mark:* **known.**

### Better alternatives (same standard)

**A. Goddard, K., Roudsari, A. & Wyatt, J. C. (2012).** "Automation bias: A systematic review of frequency, effect mediators, and mitigators." *Journal of the American Medical Informatics Association* 19(1): 121–127. doi:10.1136/amiajnl-2011-000089.
- *Status:* peer-reviewed systematic review.
- *What it says:* 74 of 13,821 retrieved papers met the inclusion criteria. Effective mitigators included training and emphasising user accountability, as well as design factors such as where advice sits on the screen, updated confidence levels, and giving information instead of a recommendation.
- *Why it fits:* this is the evidence that "a person answers for it" changes behaviour. The primary study on accountability is Skitka, Mosier & Burdick (2000), "Accountability and automation bias", *IJHCS* 52(4): 701–717, doi:10.1006/ijhc.1999.0349. Its citation is confirmed, but its abstract was not reached. Related NASA abstracts from the same programme report that participants who felt accountable checked the automation more and made fewer errors.
- *Mark:* Goddard **checked** (abstract). Skitka **known**.

**B. Chi, M. T. H., de Leeuw, N., Chiu, M.-H. & LaVancher, C. (1994).** "Eliciting self-explanations improves understanding." *Cognitive Science* 18(3): 439–477. doi:10.1207/s15516709cog1803_3.
- *Status:* peer-reviewed journal.
- *What it says:* 14 eighth-graders were asked to explain each line of a text on the circulatory system to themselves; 10 controls read it twice. The prompted group gained more from pretest to posttest, and every high explainer reached the correct mental model.
- *Why it fits:* this supports explain-back as something that builds understanding, not only something that exposes gaps (Rozenblit & Keil). Caveat: small sample, and the task is learning from a text.
- *Mark:* **checked** (abstract).

### Chartable

- **Buçinca et al., Table 2** (decisions when the AI was wrong, carbohydrate-source detection). Explanation-only vs forcing:
  - overrelied 0.64 vs 0.48;
  - correct 0.08 vs 0.27;
  - human error 0.27 vs 0.26.

  For the overall decision: overrelied 0.30 vs 0.26 (n.s.); correct 0.03 vs 0.09. A stacked 100% bar per condition works well.
- **Buçinca et al., Table 3** (subjective ratings):
  - trust 3.91 vs 3.72 (n.s.);
  - preference: no-AI 3.13, explanation-only 3.78, forcing 3.62;
  - mental demand: no-AI 3.66, explanation-only 2.86, forcing 2.84.
- **Rozenblit & Keil:** the time course appears only in Figure 3. Don't chart without the authors' numbers.

---

## Prologue

**1. Sperber, D., Clément, F., Heintz, C., Mascaro, O., Mercier, H., Origgi, G. & Wilson, D. (2010).** "Epistemic vigilance." *Mind & Language* 25(4): 359–393. doi:10.1111/j.1468-0017.2010.01394.x.
- *Status:* peer-reviewed journal; theoretical survey, no new data.
- *What it says:* humans depend massively on communication, which exposes them to being misinformed by accident or on purpose. To keep communication worthwhile, they have a suite of cognitive mechanisms for epistemic vigilance. The paper surveys this across philosophy, linguistics, psychology and the social sciences.
- *Fit:* **good.** It frames the designer as a hearer who must stay vigilant. The split between vigilance about the source and about the content is in the body, as read in the earlier session.
- *Mark:* **checked** (abstract). The source/content split is **known**.

**2. Tankelevitch, L., Kewenig, V., Simkute, A., Scott, A. E., Sarkar, A., Sellen, A. & Rintel, S. (2024).** "The metacognitive demands and opportunities of generative AI." *Proc. CHI '24*, pp. 1–24. doi:10.1145/3613904.3642902.
- *Status:* peer-reviewed conference; conceptual, no new data.
- *What it says:*
  - Prompting demands awareness of one's own goals and the ability to break a task down.
  - Judging output demands well-adjusted confidence. The paper separates resolution (sensitivity) from calibration (bias).
  - Proposed remedies: build metacognitive support into GenAI tools, and lower their demand through explainability and customisability.
- *Fit:* **good.** It pairs with Fleming & Lau (already checked) and sets up the problem the articles answer.
- *Mark:* **checked** (abstract and body via arXiv 2312.10893).

Pick one for the prologue: Sperber et al. if it leads with testimony, Tankelevitch et al. if it leads with working with the model.
