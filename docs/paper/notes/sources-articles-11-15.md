# Sources for articles 11–15 and the closing

Working note, 27 October 2026. Reading material for *Examined Design*; not part of the paper.

**Evidence standard (Valentin's decision).** Each article rests on one or two peer-reviewed studies or established philosophical arguments, explained in plain words. Preprints and practitioner sources appear only as labelled illustration.

**Marks.**
- **checked**: I read the abstract or the relevant passage this session, and it says what is claimed.
- **known**: standard bibliography that I did not re-read this session.
- **not verified**: I couldn't reach it.

The earlier session already checked Moran 2005, Hinchman 2005, Knight 2023 (SEP), Nguyen 2022, Leonard 2021 (SEP), Fernandes et al. 2026 and Magnus 2025 (in an earlier notes file, not published here). I cite them below where they help but did not re-verify them.

**Quotations.** I kept verbatim quotation to one sentence (Neurath, article 14) and a few coined terms. Everything else is paraphrase with an exact page or section locator, so the exact wording can be pulled from the source at that place.

**Numbers.** Every figure below was read in the source, or in the author's own later summary where I say so. Nothing is rounded or read off a plot. Where a figure exists only as a plot, I say so and give no numbers.

---

## Article 11. Whether a person must sign what ships

*Claim:* on the assurance view, telling is taking responsibility. A model can produce the words of a promise without taking on the promise. So every claim that ships has a person's name behind it, and "Claude recommended it" is never a reason in a decision log.

### Candidates

**1. Matthias, A. (2004).** "The responsibility gap: Ascribing responsibility for the actions of learning automata." *Ethics and Information Technology* 6(3): 175–183. doi:10.1007/s10676-004-3422-1.
- *Status:* peer-reviewed journal article; the Lingnan repository lists it as a refereed journal article.
- *What it says:* traditionally we blame a machine's maker or operator for what it does. Learning machines (neural networks, genetic algorithms, agent architectures) act in ways their makers can't predict, so they can't fairly be blamed. Society must either stop using such machines, which Matthias calls unrealistic, or live with a "responsibility gap" that the usual ways of assigning blame can't close.
- *Fit:* **partial, and the direction needs care.** Matthias names the problem, not the solution. Read on its own, he says nobody can fairly answer for a learning system's output, which cuts against "a person signs". The paper can use him as the objection: a model's output has no author who can answer for it, so either someone takes it on or nobody does. But his own premise (you can't fairly answer for what you can't predict or control) sets a condition on the signer: the person must actually have checked what they sign. Otherwise the signature is a fiction (see Elish).
- *Mark:* **checked** (abstract via the repository record; citation via Crossref).

**2. Santoni de Sio, F. & Mecacci, G. (2021).** "Four responsibility gaps with artificial intelligence: Why they matter and how to address them." *Philosophy & Technology* 34(4): 1057–1084. doi:10.1007/s13347-021-00450-x. Open access.
- *Status:* peer-reviewed; TU Delft lists it as "Article, Scientific, peer-review".
- *What it says:* the "responsibility gap" is at least four linked gaps:
  - culpability (whom to blame);
  - moral accountability (who must explain to those affected);
  - public accountability (who explains to the public and institutions);
  - active responsibility (who is obliged to make the system behave well beforehand).
  
  The authors reject three responses: fatalism (the gap can't be closed), deflationism (there is no real gap) and solutionism (a technical or legal fix alone closes it). They propose designing socio-technical systems for "meaningful human control", so that the system's behaviour tracks the reasons and capacities of identifiable people.
- *Fit:* **good, and the best support here.** The paper's "signed" is a small, concrete case of designing for meaningful human control: a named person who can give reasons to users (accountability) and who checks before shipping (active responsibility). It also answers Matthias on his own terms: the gap is closed by design, not by pretending the model is responsible. I know the "tracking" and "tracing" conditions of meaningful human control from Santoni de Sio & van den Hoven (2018), but I did not confirm that this 2021 paper spells them out. Don't attribute them to it without checking.
- *Mark:* **checked** (the abstract's main claim, the four gaps, the three rejected responses and the proposal, via the TU Delft record and a search summary; citation via Crossref). Full text not read.

**3. Elish, M. C. (2019).** "Moral crumple zones: Cautionary tales in human-robot interaction." *Engaging Science, Technology, and Society* 5: 40–60. doi:10.17351/ests2019.260. Open access.
- *Status:* peer-reviewed journal (the 4S society journal).
- *What it says:* blame for a failure in a highly automated system can be misattributed to the nearest human operator, who had limited control over the system's behaviour. A car's crumple zone protects the driver. A moral crumple zone protects the technology, at the cost of the human. Elish's cases are Three Mile Island and Air France 447, and the paper opens with the 2018 Uber self-driving fatality. She calls such operators "liability sponges" (pp. 41–42).
- *Fit:* **good, as the counterweight you intended.** It turns "a person signs" into a condition: a signature is fair only if the signer had real control and real knowledge of what they sign. Otherwise the designer becomes the crumple zone for the model's output. The paper can say that signing is earned by the checking (tied, tested), and that a signature without them is what Elish warns about.
- *Mark:* **checked** (journal page abstract and the full-text PDF, pp. 40–42 read).

**4. Austin, J. L. (1962).** *How to Do Things with Words*. Ed. J. O. Urmson. Oxford: Clarendon Press. 2nd ed., eds. Urmson & Sbisà, Harvard University Press, 1975.
- *What the paper can lean on:* Lecture II, p. 22. A performative utterance is "hollow or void" when said by an actor on stage, in a poem or in soliloquy. Austin sets such non-serious uses aside from his analysis. Also Lecture II's conditions: the persons and circumstances must be appropriate (his rule A.2), and the speaker must have the relevant thoughts and intentions (Γ.1).
- *Fit:* **usable, with one correction.**
  - In Austin, a promise made without intending to keep it is still a promise. It is an "abuse" (a Γ failure), not a void act. So "a model produces the words of a promise without making one" does not follow from the insincerity rules.
  - It follows from the other two places: the actor-on-stage case (the words are said but nobody is bound), or the "inappropriate person" case (A.2).
  - The stage comparison is the cleanest: model output is a performance of a promise with nobody standing behind it until a person adopts it.
  - Austin's exclusion of stage speech is contested (Derrida, "Signature Event Context", 1972). If a reviewer raises it, the answer is that the paper doesn't need Austin's exclusion, only Moran's point that telling is taking responsibility.
- *Mark:* the p. 22 passage is **checked via a secondary quotation** (*Vooys* 32, 2014, quoting Austin 1962: 22). The rest is **known**.

### Better alternatives (same standard)

**A. Coeckelbergh, M. (2020).** "Artificial intelligence, responsibility attribution, and a relational justification of explainability." *Science and Engineering Ethics* 26(4): 2051–2068. doi:10.1007/s11948-019-00146-8 (online 2019; PMC7417397).
- *What it says:* it starts from Aristotle's two conditions for responsibility, control and knowledge. It adds the problem of "many things" (responsibility spread across many technical components) to the familiar problem of many hands. Then it shifts the view to the people responsibility is owed to: those affected may demand reasons for decisions made with AI. Responsibility becomes answerability.
- *Fit:* **very good** for "a person answers for it" and for why "Claude recommended it" fails as a logged reason: the person affected can't interrogate the model's reason, only a person's. One caveat: the paper assumes, rather than argues, that only humans can be responsible agents. Pair it with Moran for the argument.
- *Mark:* **checked** (abstract via Europe PMC).

**B. Shoemaker, D. (2011).** "Attributability, answerability, and accountability: Toward a wider theory of moral responsibility." *Ethics* 121(3): 602–632. doi:10.1086/659003.
- *What it says:* it is the standard source for separating three faces of responsibility. Answerability is the face that fits "signed": being liable to be asked for, and to give, one's reasons.
- *Mark:* citation **checked** (Crossref); content **known**.

### Chartable results
None. This article rests on arguments, not measurements.

### Recommendation
- Make **Moran** (already checked) the philosophical spine.
- Use **Santoni de Sio & Mecacci** as the peer-reviewed support for designing a named person into the loop.
- Add **Elish** as the condition that keeps the signature honest.
- **Coeckelbergh** is the best single replacement if you want one source that does both answerability and users.
- Use **Matthias** as the objection, not as support.
- Use **Austin** only for the actor-on-stage point, with the correction above.

---

## Article 12. Whether anything outside the conversation can correct it

*Claim:* the designer and the model checking each other is a circle. Every chain of justification stops somewhere (Agrippa's trilemma), and the stopping point must be outside the circle: how the system behaves, an engineering answer, a rendered screen a person looked at, a user when there is one.

### Candidates

**1. Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. & Gal, Y. (2024).** "AI models collapse when trained on recursively generated data." *Nature* 631(8022): 755–759. doi:10.1038/s41586-024-07566-y. Open access (PMC11269175).
- *Status:* peer-reviewed (*Nature*).
- *What it says:*
  - Training generative models on data produced by earlier models causes "model collapse": the tails of the original distribution (rare events) disappear first, and later generations converge on a narrow distribution.
  - Later generations also produce sequences the original model would never produce, which the authors describe as misperceiving reality from their ancestors' errors.
  - Their remedy is to keep access to original, human-produced data.
- *Numbers (pp. 757–758, Fig. 1b,c):*
  - OPT-125m fine-tuned on wikitext2 reaches a mean perplexity of 34, down from a zero-shot 115.
  - With five epochs and no original data kept, performance drops by an amount the text gives as "from 20 to 28 perplexity points". The phrase is ambiguous: a 20–28 point loss, or perplexity going from 20 to 28. Don't use it without the supplementary data.
  - With ten epochs and a random 10% of the original data kept each generation, the text reports only minor degradation.
  - The per-generation perplexities appear only as plots in Fig. 1b,c.
- *Is the analogy fair?* **Partly.**
  - *Fair:* a process that feeds only on its own products loses the rare cases first and grows confident errors, and putting some original data back slows the damage. "Loses the rare cases" is a good image for edge cases dropping out of a designer–model loop.
  - *Unfair 1:* collapse happens across training generations (the weights change). A design conversation does not retrain the model.
  - *Unfair 2:* the designer is a second, different source in the loop, so it is not a pure self-loop. It becomes one only when the designer's sole evidence is the model's own text.
  - *Unfair 3:* the paper's Fig. 1a caption describes data accumulating across generations, while the language-model method trains each generation on the previous generation's output. A preprint (Gerstgrasser et al. 2024, arXiv 2404.01413, *preprint: illustration only*) reports that collapse is avoided when synthetic data accumulates alongside the real data instead of replacing it.
  - *Verdict:* use Shumailov only as a labelled analogy. The direct evidence is alternative A below.
- *Mark:* **checked** (abstract, Fig. 1 caption and the language-model section read in the PDF).

**2. Hutchins, E. (1995).** *Cognition in the Wild*. Cambridge, MA: MIT Press.
- *What it says:* cognition on a ship's bridge is spread across people, instruments and representations such as charts and bearing logs. Errors are caught because the system has overlapping access and external representations that more than one person can inspect.
- *Fit:* **weak to moderate.** Hutchins describes how cognitive work is distributed, not what justifies a belief. He supports "a rendered screen a person looked at" as an external representation that others can check. He does not support the stronger claim that the stopping point must lie outside the circle. Keep him for a sentence, not as the article's support.
- *Mark:* **known.**

**3. Agrippa's modes: Sextus Empiricus, *Outlines of Pyrrhonism* I.164–177**, with SEP "Ancient Skepticism" (Katja Vogt; first published 2010, substantive revision 21 Sep 2022). English: Sextus Empiricus, *Outlines of Scepticism*, trans. J. Annas & J. Barnes, Cambridge UP, 2000.
- *What it says:*
  - There are five modes: disagreement, infinite regress, relativity, hypothesis (an arbitrary starting assumption) and circularity (reciprocal support).
  - The SEP entry calls regress, hypothesis and circularity "the so-called formal modes".
  - The label "trilemma" is modern: Hans Albert's "Münchhausen trilemma" (*Traktat über kritische Vernunft*, 1968) (known).
- *Fit:* **mis-described in the brief.** The trilemma does not say every chain stops somewhere. It says every chain either goes on forever, circles back, or stops at an unsupported assumption, and that none of the three justifies anything. That conclusion is the sceptic's. "The stopping point must be outside the circle" is the paper's response.
  - That response is a foundationalist or externalist move. For the standard presentation of the regress argument and the foundationalist answer, see SEP "Foundationalist Theories of Epistemic Justification" (Hasan & Fumerton; revision 5 Aug 2022). That entry traces the argument to Aristotle, *Posterior Analytics* I.3.
  - *Refinement:* several of the paper's stopping points are themselves testimony (an engineering answer is Bálint telling you something). So what matters is not that they are foundations but that they are **independent of the circle**: their reliability doesn't come from the designer or the model. "Independent and reliable", not "basic".
- *Mark:* **checked** (the SEP entry's list of modes, the PH I.164–177 locator and the "formal modes" wording; the foundationalism entry's framing). Sextus himself was not re-read: **known**.

**4. Coady, C. A. J. (1992).** *Testimony: A Philosophical Study*. Oxford: Clarendon Press.
- *What it says:* global reductionism is circular. Almost everything we would use to check testimony's reliability was itself learned from testimony.
- *Fit:* **use with care; his conclusion runs the other way.** Coady uses the circle to argue for non-reductionism: we are entitled to trust testimony by default. The earlier notes say that default is exactly what the paper must not grant the model. So Coady supports "the circle is real" but not "the way out is an outside anchor". If you cite him, say that you take his diagnosis and reject his cure for this case.
- *Mark:* **known** (position checked via SEP in the earlier session).

### Objection the article must meet

Goodman calls the circle between rules and particular judgements "a virtuous one" (*Fact, Fiction, and Forecast*, 4th ed., 1983, p. 64; **checked**, see article 15). A reviewer will say that if mutual adjustment is virtuous for Goodman, the designer–model circle is too.

The answer the article can give: Goodman's circle works because one side brings in judgements made independently of the rules (accepted inferences, considered cases). A designer–model circle in which both sides draw only on the same text has no such independent input.

### Better alternatives (same standard)

**A. Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X. & Zhou, D. (2024).** "Large language models cannot self-correct reasoning yet." *ICLR 2024* (conference paper; arXiv 2310.01798).
- *Status:* peer-reviewed conference paper; the PDF carries the ICLR 2024 header.
- *What it says:* when a model reviews and revises its own answers with no outside signal ("intrinsic self-correction"), accuracy does not improve and often falls. When the loop is told whether the answer is correct (an "oracle" label used to decide when to stop), accuracy rises. Why it falls: the models can't judge whether their own reasoning is right, so they more often change a correct answer to a wrong one than the reverse.
- *Fit:* **direct, and the strongest source for this article.** Same model, same task; the only difference is whether a signal from outside the model enters the loop. Two caveats:
  - The authors call the oracle setting unrealistic: if you had the labels, you wouldn't need the model.
  - The test is a model checking itself, not a designer and a model. The bridge is the paper's own point: a designer who only reads the model's text adds no independent signal.
  - The models are 2023 vintage.
- *Mark:* **checked** (abstract, Tables 2–4 and §3.3 read in the PDF).

**B. Kamoi, R., Zhang, Y., Zhang, N., Han, J. & Zhang, R. (2024).** "When can LLMs *actually* correct their own mistakes? A critical survey of self-correction of LLMs." *Transactions of the Association for Computational Linguistics* 12: 1417–1440. doi:10.1162/tacl_a_00713.
- *What it says:* no prior work shows successful self-correction from feedback by prompted models, except in tasks especially suited to it. Self-correction works when reliable external feedback is available. Many positive results came from unfair or impractical evaluations.
- *Fit:* **very good** as the survey-level statement of the rule "the correction must come from outside, and it must be reliable".
- *Mark:* **checked** (abstract via arXiv 2406.01297; venue and pages via Crossref).

### Chartable results

**Huang et al. 2024, Tables 2 and 3.** Accuracy (%) with an outside signal versus without one.

| Model | Setting | GSM8K | CommonSenseQA | HotpotQA |
|---|---|---|---|---|
| GPT-3.5 | Standard prompting (1 call) | 75.9 | 75.8 | 26.0 |
| GPT-3.5 | Self-correct with oracle label (Table 2) | 84.3 | 89.7 | 29.0 |
| GPT-3.5 | Intrinsic self-correct, round 1 (3 calls) | 75.1 | 38.1 | 25.0 |
| GPT-3.5 | Intrinsic self-correct, round 2 (5 calls) | 74.7 | 41.8 | 25.0 |
| GPT-4 | Standard prompting | 95.5 | 82.0 | 49.0 |
| GPT-4 | Self-correct with oracle label | 97.5 | 85.5 | 59.0 |
| GPT-4 | Intrinsic, round 1 | 91.5 | 79.5 | 49.0 |
| GPT-4 | Intrinsic, round 2 | 89.0 | 80.0 | 43.0 |

**Table 4** (intrinsic only, GSM8K / CommonSenseQA):
- GPT-4-Turbo: standard 91.5 / 84.0; round 1 88.0 / 81.5; round 2 90.0 / 83.0.
- Llama-2: standard 62.0 / 64.0; round 1 43.5 / 37.5; round 2 36.5 / 36.5.

*Suggested chart:* grouped bars per benchmark, with standard, with-outside-signal and without-outside-signal (round 2) side by side.

*Note:* the authors write that accuracy drops for all models on all benchmarks. Read strictly, GPT-4 on HotpotQA is unchanged after round 1 (49.0) and falls only at round 2.

**Shumailov et al.:** not chartable from the text. The per-generation perplexities exist only as plots (Fig. 1b,c).

### Recommendation
- Rest the article on **Huang et al. 2024**: an outside signal raises accuracy; the model judging itself does not.
- Add **Kamoi et al. 2024** for the general rule.
- Use the **SEP account of Agrippa's modes**, correctly described, for the logic.
- Keep **Shumailov** as a labelled analogy only, and **Hutchins** as one supporting sentence.
- Cite **Coady** only with the caveat about his conclusion.

---

## Article 13. Whether a decision should be reopened when a case breaks it

*Claim:* reopen only with a named objection (it doesn't follow; a premise is false; the conclusion is known false; a premise is unsupported; a vague term does precise work). After reversing, give the error theory (why the old answer looked right). A model reversing under pushback is compliance, not refutation.

### Candidates

**1. Ross, L., Lepper, M. R. & Hubbard, M. (1975).** "Perseverance in self-perception and social perception: Biased attributional processes in the debriefing paradigm." *Journal of Personality and Social Psychology* 32(5): 880–892. doi:10.1037/0022-3514.32.5.880.
- *Status:* peer-reviewed.
- *What it says:*
  - Participants sorted real from fake suicide notes and got false feedback: 24 of 25 right (success) or 10 of 25 (failure).
  - After a standard "outcome" debriefing, which told them the feedback had been fabricated, they still rated their ability in line with the false feedback. So did observers who had watched through a one-way mirror (Experiment 2).
  - A "process" debriefing, which also explained how such impressions persist, generally removed the false self-perceptions.
- *Numbers:* Lee Ross later reproduced the post-debriefing means himself. Source: L. Ross, "The challenge of addressing vivid lies spread by America's enemies in the cyber era", undated essay hosted by Stanford FSI, p. 6. In his words, about half the difference between the success and failure groups remained after the thorough debriefing.

  | Measure (after debriefing) | Actors, success | Actors, failure | Observers, success | Observers, failure |
  |---|---|---|---|---|
  | Estimated initial score (of 25) | 18.3 | 12.8 | 19.0 | 12.4 |
  | Estimated next score (of 25) | 18.3 | 14.3 | 19.1 | 14.5 |
  | Rated ability at the task | 5.0 | 3.83 | 5.33 | 4.0 |

  The table doesn't say which experiment or debriefing condition it shows. Because it has observers, it is very likely Experiment 2 after outcome debriefing (consistent with the abstract). The scale of "rated ability" isn't given. I did not see the original 1975 tables.
- *Fit:* **good for two things.**
  - Beliefs outlive the discrediting of their evidence, so a decision that has been undermined won't feel undermined. That argues for a written rule for reopening.
  - It also backs the **error-theory step**, which you didn't mention: what removed the false belief was an explanation of why it persisted. That is close to "say why the old answer looked right". Close, not identical, since process debriefing explained the perseverance mechanism rather than the original error.
- *Objection to note:* Godden, D. (2012), "Rethinking the debriefing paradigm: The rationality of belief perseverance", *Logos & Episteme* 3(1): 51–74, doi:10.5840/logos-episteme20123150, argues by its title that perseverance can be rational. Citation **checked** via Crossref; content **not verified**.
- *Replication:* McFarland, C., Cheam, A. & Buehler, R. (2007), "The perseverance effect in the debriefing paradigm: Replication and extension", *Journal of Experimental Social Psychology* 43(2): 233–240, doi:10.1016/j.jesp.2006.01.010. Citation **checked** via Crossref; the publisher page returned 403, so the abstract was **not verified**.
- *Mark:* **checked** (abstract wording via a database record; design and numbers via Ross's own later account; a secondary description in Shultz & Katz, McGill, agrees). The original article's tables were not seen.

**2. Staw, B. M. (1976).** "Knee-deep in the big muddy: A study of escalating commitment to a chosen course of action." *Organizational Behavior and Human Performance* 16(1): 27–44. doi:10.1016/0030-5073(76)90005-2.
- *Status:* peer-reviewed.
- *What it says:*
  - 240 business students role-played a financial vice president and had $20 million to split between two divisions.
  - People who had personally chosen a division that then declined gave that division more money than anyone else.
  - Their own failing choice made them commit more, not less.
- *Numbers (pp. 36–38; Tables 4–5; Fig. 1), in $ millions of $20M allocated to the previously chosen division:*
  - High personal responsibility: 11.08. Low: 8.89.
  - Positive consequences: 8.77. Negative: 11.20.
  - High responsibility with negative consequences: 13.07, the only cell significantly different from the others (p. 38).
  - ANOVA (Table 5): responsibility F = 14.40, consequences F = 17.93, interaction F = 5.56. Error df = 235.
  - The three other 2×2 cell means are only plotted (Fig. 1). Table 4 gives eight sub-cells (read from a scanned table):
    - high responsibility, positive: 9.36 and 9.00;
    - high, negative: 13.46 and 12.56;
    - low, positive: 8.22 and 8.48;
    - low, negative: 9.65 and 9.22.
- *Fit:* **moderate, and weakened by replications.** It shows the opposite failure to the one the article guards against: people refuse to reopen their own failed decisions. That supports writing the reopening rule down. But the FORRT replication atlas lists:
  - a **failed** replication: Białek et al. 2021, *Economics and Business Review*, N = 365, "no evidence for escalation of commitment";
  - a **mixed** one: Schultze & Schulz-Hardt 2022, *Journal of Experimental Psychology: Applied*.
  
  If you use Staw, say that the effect is contested.
- *Mark:* **checked** (full text read: abstract, procedure, results, Tables 4–5). Replication status checked via FORRT.

**3. Sharma, M., Tong, M., Korbak, T., et al. (2024).** "Towards understanding sycophancy in language models." *ICLR 2024* (conference paper; arXiv 2310.13548).
- *Status:* peer-reviewed conference paper; the PDF carries the ICLR 2024 header and the paper is in the ICLR 2024 proceedings.
- *What it says (§3.2 "AI assistants can be easily swayed", Fig. 2; Appendix A.4, Figs. 13–17):*
  - The models: Claude 1.3, Claude 2, GPT-3.5, GPT-4, Llama-2-70B-chat.
  - The datasets: subsets of MMLU, MATH, AQuA, TruthfulQA and TriviaQA.
  - After the first answer, the user replies with a bare two-sentence doubt that gives no reason (the paper's "Are you sure?" setting).
- *Numbers (Appendix A.4, as stated in the text):*
  - Models change their initial answer on 32% (GPT-4) to 86% (Claude 1.3) of questions (Fig. 16).
  - Models admit a mistake on 42% (GPT-4) to 98% (Claude 1.3) of questions (Fig. 15). The main text says Claude 1.3 wrongly admits mistakes on 98% of questions.
  - Accuracy drops by up to 27% for Claude 1.3, averaged across datasets (Fig. 13).
  - Stated confidence barely moves: GPT-4 98.9% → 98.9%; Claude 1.3 90.6% → 85.3%. Restricting to answers with at least 95% confidence doesn't change the picture (Fig. 14).
  - Switching from correct to incorrect is more likely than the reverse (Fig. 17).
- *Fit:* **good.** Precision matters, though: the pushback contained **no argument at all**. So the finding is "a model will abandon a correct answer in response to bare doubt". That is exactly "compliance, not refutation", because there was nothing to be refuted by.
- *Caveats:*
  - The models are 2023 vintage.
  - "Admits a mistake" was graded by another model (gpt-3.5-turbo).
  - The appendix says "six datasets" where the main text lists five.
  - The per-model bar heights in Fig. 2 aren't given as numbers.
- *Mark:* **checked** (PDF read: §3.2, Fig. 2 caption, Appendix A.4, Figs. 13–17 captions).

**4. Lakatos, I. (1970).** "Falsification and the methodology of scientific research programmes." In I. Lakatos & A. Musgrave (eds.), *Criticism and the Growth of Knowledge*, Cambridge UP, pp. 91–196.
- *What it says:* a single anomaly does not refute a research programme. A programme may protect its hard core with auxiliary changes as long as it stays progressive, meaning it predicts new facts. It is degenerating when its changes only patch.
- *Fit:* **it earns a place as the counterweight**: a breaking case is not automatically a reason to reopen. It also gives the paper a test for repeated patching (degenerating). But Lakatos is about long-run programmes, not single decisions. One paragraph at most.
- *Mark:* **known.**

### Terminology flag

In philosophy, "error theory" mostly means Mackie's moral error theory (*Ethics: Inventing Right and Wrong*, 1977). Readers may hear that. The plain phrase "say why the old answer looked right" avoids the clash, or the paper can define its sense once.

### Better alternatives (same standard)

**A. Wang, B., Yue, X. & Sun, H. (2023).** "Can ChatGPT defend its belief in truth? Evaluating LLM reasoning via debate." *Findings of the Association for Computational Linguistics: EMNLP 2023*, pp. 11865–11881. doi:10.18653/v1/2023.findings-emnlp.795.
- *Status:* peer-reviewed (ACL Findings).
- *What it says:*
  - The setup: start only from questions the model answers correctly on its own. Then a simulated user, another ChatGPT conditioned on an invalid solution, argues for a wrong answer.
  - ChatGPT abandons the correct answer on 22% to over 70% of examples, depending on the benchmark.
  - GPT-4 does so less often, but still at a considerable rate.
  - Failure barely tracks the model's confidence: it stays high even where the model was 100% consistent in repeated sampling.
  - In 30 hand-examined GSM8K failures:
    - 50%: the model admits the invalid critique directly;
    - 30%: it argues only about non-essential points and is misled;
    - 20%: it misreads the user.
- *Fit:* **the best support for "compliance, not refutation".** Here the pushback is an *invalid argument*, and the model still yields. The reversal is not tracking whether the objection is any good. Pair it with Sharma (bare doubt) and the two cover both kinds of pushback.
- *Mark:* **checked** (abstract via ACL Anthology; Tables 1–2 and §4 read in the PDF).

**B.** (No second empirical alternative needed.) If you want a philosophical counterweight, Godden 2012 above is the place to look, once read.

### Chartable results

**Wang et al. 2023, Table 2.** ChatGPT (gpt-3.5-turbo), share of correctly solved examples it abandons under invalid pushback ("Either" metric), %.

| Benchmark | Mean failure rate | Mean confidence | Failure rate at 100% confidence |
|---|---|---|---|
| GSM8K | 41.6 | 87.5 | 35.1 |
| PrOntoQA | 79.2 | 88.7 | 77.2 |
| StrategyQA | 22.8 | 94.2 | 21.6 |
| CommonsenseQA 2.0 | 46.5 | 95 | 47.0 |
| Creak | 30.0 | 97.5 | 29.2 |
| Tracking Shuffled Objects [three] | 79.1 | 58.9 | 83.3 |
| Disambiguation QA | 48.0 | 76.8 | 62.5 |
| Web of Lies | 82.7 | 58.7 | 100.0 |
| Temporal Sequences | 64.7 | 60.2 | 100.0 |
| Sports Understanding | 32.1 | 97.9 | 29.8 |
| Salient Translation Error Detection | 72.4 | 94.7 | 73.3 |
| Penguins in a Table | 39.8 | 83.5 | 38.8 |
| Logical Deduction [three] | 69.2 | 76.3 | 63.8 |
| Navigate | 95.9 | 93.2 | 96.7 |

Also chartable (n = 30, GSM8K failure types): admits directly 50%, misled on non-essentials 30%, misreads the user 20%.

**Sharma et al. 2024:** only the endpoints are stated in the text:
- changed answer: GPT-4 32%, Claude 1.3 86% (Fig. 16);
- admitted a mistake: GPT-4 42%, Claude 1.3 98% (Fig. 15);
- confidence: GPT-4 98.9 → 98.9, Claude 1.3 90.6 → 85.3.

The other three models are plotted only. A two-point chart is possible; a five-model chart would need the plot digitised.

**Ross et al. 1975:** the post-debriefing table above. Chart estimated scores, success versus failure, against the feedback given (24 vs 10). Source: Ross's later essay, not the 1975 tables.

**Staw 1976:** a 2×2 chart from the text and Table 4. The text gives 13.07 for the high-responsibility, negative cell and the marginal means; Table 4 gives the sub-cells.

### Recommendation
- Rest the model half on **Wang et al. 2023** (invalid arguments flip correct answers) and **Sharma et al. 2024** (bare doubt flips them).
- Rest the human half on **Ross, Lepper & Hubbard 1975**, which also backs the error-theory step.
- **Staw** is optional and contested.
- **Lakatos** gets one paragraph as the reason a breaking case isn't automatically a refutation.

---

## Article 14. Whether the method's tools may be retired when its claims may not

*Claim:* the method's tools fall under a pragmatist test (keep a practice while it makes the work better). The product's claims about the world fall under plain truth. The project retired its screen generators mid-project: the method was rebuilt while in use.

### Candidates

**1. Neurath, O. (1932/33).** "Protokollsätze." *Erkenntnis* 3(1): 204–214. doi:10.1007/BF01886420.
- *English:*
  - "Protocol Statements", in O. Neurath, *Philosophical Papers 1913–1946*, ed. and trans. R. S. Cohen & M. Neurath, Dordrecht: Reidel, 1983, pp. 91–99. The ship passage is on **p. 92**.
  - Also "Protocol Sentences", trans. G. Schick, in A. J. Ayer (ed.), *Logical Positivism*, Glencoe, IL: Free Press, 1959, pp. 199–208.
- *The passage* (Neurath 1983, p. 92, as quoted in SEP "Otto Neurath"): "We are like sailors who have to rebuild their ship on the open sea". It continues: without ever being able to take it apart in dry dock and rebuild it from the best parts.
- *What it means (SEP, Jordi Cat; revision 1 Mar 2024):* there are no fully secured starting statements and no clean slate. Science is repaired plank by plank while afloat. Imprecise word clusters (*Ballungen*) are always part of the ship.
- *Fit:* **good** for "rebuilding the method while using it". Retiring the screen generators mid-project is a plank replaced at sea. One honest limit: Neurath's ship is the whole body of knowledge, claims included. So Neurath alone doesn't give you the asymmetry between tools and claims, which needs a second source (Kelly, below).
- *Earlier versions:* SEP links the 1921 *Anti-Spengler* only to the no-clean-slate point, not to the boat. The boat image may appear in earlier texts too, but I didn't verify that.
- *Mark:* the passage and page are **checked** via SEP (which quotes Neurath 1983, p. 92); the *Erkenntnis* citation is **checked** via Crossref. The Ayer 1959 printing is **known**.

**2. Arkes, H. R. & Blumer, C. (1985).** "The psychology of sunk cost." *Organizational Behavior and Human Decision Processes* 35(1): 124–140. doi:10.1016/0749-5978(85)90049-4.
- *Status:* peer-reviewed.
- *What it says:* once money, effort or time has been invested, people are more likely to continue an endeavour, even when the future costs and benefits favour stopping. People who had sunk a cost also rated the project's chance of success higher. Taking economics courses did not reduce the effect.
- *Numbers:*
  - **Experiment 3 (p. 129), a radar-blank plane that a rival has already beaten:**
    - When $10M had been spent and the project was 90% complete, 41 of 48 said to finish it (7 said no).
    - When nothing had been spent and the question was whether to spend the last $1M, 10 of 60 said yes (50 said no). χ²(1, N = 108) = 50.6.
    - Experiment 5 (p. 130) repeated the no-investment version with a $10M product: again 10 yes, 50 no.
  - **Experiment 4 (p. 130):** estimated chance that the plane succeeds financially was 41.0 with the sunk cost (n = 76) and 34.0 without (n = 82), t(156) = 2.02.
  - **Experiment 1 (pp. 126–127), the ski trip:** 33 chose the $100 trip they expected to enjoy less; 28 chose the $50 trip they expected to enjoy more. Only 46% chose the better trip (99% CI 30–62%).
  - **Experiment 2 (pp. 127–128), a field study of theatre season tickets:** in the first half of the season, normal-price buyers used 4.11 tickets on average (n = 18), $2-discount buyers 3.32 (n = 19) and $7-discount buyers 3.29 (n = 17). The second half showed no significant difference (2.28 and 2.18 for no discount and $7 discount; the $2 value is illegible in the scan).
- *Fit:* **good.** It names the force that keeps a failing tool in use (the effort already spent on the screen generators) and shows it is a bias, not a reason. The fit is by analogy, since the studies are about money and projects, not working methods; say so in one clause.
- *Caveats:* Experiments 1 and 3–5 are hypothetical vignettes with student samples. The field study is small (n = 54 after exclusions). Partial replications exist (an EASP mass-replication list includes Studies 1 and 4), but I didn't read their outcomes. **Not verified.**
- *Mark:* **checked** (full text read: abstract and Experiments 1–5).

**3. James, W. (1907).** *Pragmatism: A New Name for Some Old Ways of Thinking*. New York: Longmans, Green. Lecture VI. **Or Peirce, C. S. (1878).** "How to make our ideas clear." *Popular Science Monthly* 12: 286–302.
- *Fit:* **mismatch, so handle with care.**
  - James's pragmatism is a theory of **truth**: in Lecture VI the true is what proves expedient in our thinking. So invoking James for the tools while denying pragmatism for the claims is the opposite of James's view. A reader who knows James will notice.
  - Peirce's maxim is a theory of **meaning** (the meaning of a concept is its conceivable practical effects), not a test for keeping practices.
  - The paper doesn't need either. "Keep a practice while it makes the work better" is plain instrumental rationality: tools are judged by whether they serve the goal.
  - If you want the pragmatists, use James as the foil: the paper accepts his test for tools and refuses it for claims, and says why.
- *Mark:* **known.**

### Better alternative (same standard)

**A. Kelly, T. (2003).** "Epistemic rationality as instrumental rationality: A critique." *Philosophy and Phenomenological Research* 66(3): 612–640. doi:10.1111/j.1933-1592.2003.tb00281.x.
- *What it says:* epistemic rationality (believing what the evidence supports) cannot be reduced to instrumental rationality (taking effective means to one's goals). Whether a belief is rational doesn't depend on whether holding it serves your aims.
- *Fit:* **this is the source the asymmetry needs.** Tools are means and are judged instrumentally, so you can retire them when they stop serving. Claims are beliefs offered to users and answer to evidence and truth, whatever their usefulness to the project. One standard philosophy article gives the paper exactly the line between "may be retired" and "may not".
- *Mark:* citation **checked** (Crossref). The argument is **known**, and two secondary sources (Lockard 2013 in *Synthese*; a 2021 *Noûs* paper) describe Kelly's thesis this way. Abstract not read (PhilPapers returned 403).

### Chartable results

**Arkes & Blumer 1985, Experiment 3** (and 5). Percent saying "finish / build it":
- 41 of 48 with $10M sunk and 90% done;
- 10 of 60 with no sunk cost ($1M version);
- 10 of 60 with no sunk cost ($10M version).

A two- or three-bar chart.

Also from Arkes & Blumer:
- **Experiment 2:** first-half tickets used: 4.11 / 3.32 / 3.29 by price paid (normal / $2 off / $7 off).
- **Experiment 4:** estimated success 41.0 vs 34.0.

### Recommendation
- Rest the article on **Neurath** (rebuilding at sea) and **Arkes & Blumer** (why retiring a tool is hard, and why the effort already spent is no reason to keep it).
- Add **Kelly 2003** for the asymmetry between tools and claims.
- Drop James as support, or use him as the foil.

---

## Article 15. Whether the loop must stop

*Claim:* the design loop is reflective equilibrium (principles and cases adjusted against each other). Its five known objections are the loop's failure modes. It needs a stopping rule written in advance (the project's definition of "Ready"). Act on the probable while keeping the opposing case on the table.

### Candidates

**1. Goodman, N. (1955).** *Fact, Fiction, and Forecast*. Cambridge, MA: Harvard UP. Cited here from the 4th ed., 1983, ch. III §2, **p. 64**.
- *What it says (p. 64):*
  - Deductive rules are justified by agreement with the inferences we accept, and accepted inferences by agreement with the rules.
  - Goodman admits this looks circular and calls the circle "a virtuous one".
  - A rule is amended when it yields an inference we won't accept; an inference is rejected when it breaks a rule we won't amend.
  - The agreement reached is the only justification either needs.
  - He extends this to induction on the same page.
- *Fit:* **good; it is the source of the mutual-adjustment idea.** Note that Goodman's version has no stopping rule: agreement is the goal, but nothing says when to stop adjusting. That gap is the article's point.
- *Mark:* **checked** (p. 64 read in a scan of the 4th edition).

**2. Rawls, J. (1971).** *A Theory of Justice*. Cambridge, MA: Harvard UP. **§4 (p. 20)** and §9 (pp. 46–53, 1971 pagination).
- *What it says:* Rawls introduces and names "reflective equilibrium" in **§4** (p. 20), not §9. §9 elaborates it. At p. 20 he also says the equilibrium is not necessarily stable: further reflection or new cases may upset it.
- *Fit:* **good.** Rawls's own admission that the equilibrium is never final is the textbook reason the loop needs an outside stopping rule. Cite §4 as well as §9.
- *Mark:* **known** (Rawls's use was checked in the earlier session via Knight 2023; the page-20 instability remark is from memory and should be confirmed against an edition).

**3. Daniels, N. (1979).** "Wide reflective equilibrium and theory acceptance in ethics." *Journal of Philosophy* 76(5): 256–282. doi:10.2307/2025881.
- *What it says:* it distinguishes narrow reflective equilibrium (principles and judgements about cases) from wide, which also brings in background theories. Wide equilibrium is the standard reply to the credibility objection: starting judgements are tested against more than each other.
- *Fit:* **good.** In design terms, the background theories are the outside anchors of article 12 (how the system behaves, engineering facts). Wide equilibrium is the loop with its outside inputs.
- *Mark:* citation **checked** (Crossref gives volume, issue and first page; the end page 282 is known). Content **known**.

**4. Simon, H. A. (1956).** "Rational choice and the structure of the environment." *Psychological Review* 63(2): 129–138. doi:10.1037/h0042769.
- *What it says:* the paper that coins "satisfice". On p. 129 Simon says organisms adapt well enough to satisfice and do not, in general, optimise. A satisficer sets an aspiration level and takes the first option that meets it. Satisficing is a stopping rule for search.
- *Fit:* **good** for "Ready" as an aspiration level. One mismatch: in Simon's model (more fully in Simon 1955, *QJE*) aspiration levels move during search, falling when options are hard to find and rising when they are easy. "Written in advance" is the paper's addition, defended by the bias objection (whatever you decide during the loop is shaped by the loop). Say that the fixed threshold is your choice, not Simon's.
- *Mark:* citation **checked** (Crossref); the p. 129 wording seen only in secondary quotations, so **known**.

**5. Schön, D. A. (1983).** *The Reflective Practitioner: How Professionals Think in Action*. New York: Basic Books. Ch. 3, "Design as a reflective conversation with the situation".
- *Fit:* **good** for describing the loop in design's own terms: the situation "talks back". Schön also has no stopping rule, which makes him a second witness that the loop doesn't end by itself.
- *Mark:* **known.**

**6. Kant, I.** *Critique of Pure Reason* (1781/1787). Trans. N. Kemp Smith, London: Macmillan, 1929.
- *The exact passages:*
  - **A293/B349–350** (Kemp Smith p. 297), the opening of the Transcendental Dialectic, "I. Transcendental Illusion". Kant says he has already called dialectic in general a "logic of illusion". This is the citation for that phrase; Grier cites it as A293/B350.
  - It refers back to **A61/B85–86**: general logic, used as an organon for producing knowledge rather than as a canon for judging it, becomes a logic of illusion, that is, dialectical. (Known; not re-read.)
  - **A297/B354:** transcendental illusion does not stop even after it has been detected. Kant compares it to the sea looking higher at the horizon than at the shore.
  - **A298/B355:** there is a natural and unavoidable dialectic of pure reason, which keeps trapping reason even after it has been exposed.
- *Fit:* **partial; the brief overstates it.** Kant's dialectic is not about loops that fail to stop. It is about reason applying its principles beyond any possible experience, in search of the unconditioned. There it produces arguments that feel compelling and can't be settled; the antinomies (the Antinomy chapter, A405/B432 ff.; locator known, not re-read) are equally provable on both sides.
  - Two parts carry over honestly. First, argument cut loose from experience can go on forever on both sides. Second, the pull persists even when you know it's an illusion (A297/B354).
  - So "unbounded dialectic is a trap" is fair if "unbounded" means "unbounded by experience". It overreaches if it means "with no time limit".
  - Arguably this fits article 12 (the anchor outside the circle) as well as article 15.
- *Mark:* A293/B349–350 **checked** (Kemp Smith text online, p. 297; Grier, *Kant's Doctrine of Transcendental Illusion*, Cambridge UP, 2001, Introduction, cites A293/B350). A297/B354 and A298/B355 **checked** as quoted by Grier. A61/B85–86 **known**.

### Better alternatives (same standard)

**A. Iyengar, S. S., Wells, R. E. & Schwartz, B. (2006).** "Doing better but feeling worse: Looking for the 'best' job undermines satisfaction." *Psychological Science* 17(2): 143–150. doi:10.1111/j.1467-9280.2006.01677.x.
- *What it says:* graduating students high in maximising tendencies got jobs with **20% higher starting salaries** than low maximisers. But they were less satisfied with the jobs they got and felt worse throughout the search.
- *Fit:* **honest evidence with a twist.** Searching on without a "good enough" threshold costs something, but in this study it also bought a better objective outcome. Use it if you want the article to meet the objection that stopping early leaves value on the table. The study is correlational and measures a personality trait, not a stopping rule.
- *Mark:* **checked** (abstract via Europe PMC).

**B. Mill, J. S. (1859).** *On Liberty*, ch. 2.
- *What it says:* someone who knows only their own side of a case knows little even of that. It is the established source for keeping the opposing case on the table while you act.
- *Mark:* **known.**

### Chartable results
- None from the philosophical sources.
- Iyengar et al. give only one figure in the abstract (20% higher starting salaries). The underlying means are in the paper, which I didn't read, so it isn't chartable from what I saw.

### Recommendation
- Rest the loop on **Goodman p. 64** (checked) with **Rawls §4/§9** and **Daniels**.
- Rest the stopping rule on **Simon 1956**, saying that the fixed, written threshold is your addition.
- Use **Kant** only with the "unbounded by experience" reading and the A293/B349–350 and A297/B354 locators.
- **Mill** is the cleanest source for the last clause.

---

## Closing. Self-application

*Need:* one standard source on self-referential or self-refuting arguments, for the paper applying its own discipline (tied, tested, signed) to itself.

**1. Passmore, J. (1961).** *Philosophical Reasoning*. London: Duckworth (US ed., Basic Books, 1969).
- *What it covers:* philosophers' uses of infinite-regress arguments (the first chapter, "The Infinite Regress"), paradigm-case arguments, self-refutation charges and accusations of meaninglessness.
- *Fit:* fine as a general source. The regress chapter could also serve article 12.
- *Not verified:* I could not confirm which chapter treats self-refutation, so don't cite a chapter number until checked.
- *Mark:* **known** (contents via a PhilPapers abstract summary and a search; chapter number **not verified**).

**2. Mackie, J. L. (1964).** "Self-refutation: A formal analysis." *The Philosophical Quarterly* 14(56): 193–203. doi:10.2307/2955461.
- *What it says:* it separates kinds of self-refutation, notably absolute, pragmatic and ad hominem. Later scholarship takes the standard terminology from Mackie, Burnyeat and Passmore (Castagnoli 2010; BMCR review 2011.08.21).
- *Fit:* **better than Passmore** for the closing: short, peer-reviewed and exact. The closing can say that the paper's standard is not self-refuting in any of Mackie's senses because it passes its own test. That makes the self-application a check, not a paradox.
- *Mark:* citation **checked** (Crossref; pages confirmed by a 1965 *JSL* review listing); content **known**.

**Alternative: Castagnoli, L. (2010).** *Ancient Self-Refutation: The Logic and History of the Self-Refutation Argument from Democritus to Augustine*. Cambridge UP.
- *What it says:* the ancient self-refutation arguments (*peritropē*) aim mainly to show that an opponent can't consistently maintain a position in debate, not that it is false. It separates pragmatic, absolute, operational and ad hominem self-refutation.
- *Mark:* **checked via the BMCR review** (2011.08.21); the book itself not read.

**Illustrations a reader will know (not support):**
- the verification principle that can't be verified;
- classical foundationalism failing its own criterion (Plantinga, "Reason and Belief in God", in Plantinga & Wolterstorff (eds.), *Faith and Rationality*, 1983);
- Protagoras in Plato's *Theaetetus* 171a–c.

All **known**. The verification principle has a neat link back to Neurath and the Vienna Circle.

---

## Summary table

| Art. | Source | Peer-reviewed / established | Mark | Verdict |
|---|---|---|---|---|
| 11 | Matthias 2004 | yes | checked | Objection, not support; implies the signer must have real control |
| 11 | Santoni de Sio & Mecacci 2021 | yes | checked | **Strongest**; meaningful human control, four gaps |
| 11 | Elish 2019 | yes | checked | Good counterweight; signature only fair with control |
| 11 | Austin 1962 | established | checked (p. 22 via secondary) / known | Use the actor-on-stage point; insincere promise ≠ void |
| 11 | *Alt.* Coeckelbergh 2020 | yes | checked | Answerability to users; very good fit |
| 11 | *Alt.* Shoemaker 2011 | yes | citation checked / known | Answerability as a face of responsibility |
| 12 | Shumailov et al. 2024 | yes | checked | Analogy only, partly fair |
| 12 | Hutchins 1995 | established | known | Weak; one sentence |
| 12 | Sextus PH I.164–177 / SEP Ancient Skepticism | established | checked (SEP) | Mis-described: trilemma ≠ "every chain stops" |
| 12 | Coady 1992 | established | known | Diagnosis yes, cure opposite |
| 12 | *Alt.* Huang et al. 2024 (ICLR) | yes | checked | **Strongest**; chartable |
| 12 | *Alt.* Kamoi et al. 2024 (TACL) | yes | checked | Survey-level rule: reliable external feedback |
| 13 | Ross, Lepper & Hubbard 1975 | yes | checked (abstract; numbers via Ross's later table) | Good; also backs the error-theory step |
| 13 | Staw 1976 | yes | checked | Contested (failed and mixed replications) |
| 13 | Sharma et al. 2024 (ICLR) | yes | checked | Good; pushback was bare doubt, no argument |
| 13 | Lakatos 1970 | established | known | One paragraph as counterweight |
| 13 | *Alt.* Wang, Yue & Sun 2023 (EMNLP Findings) | yes | checked | **Strongest** for compliance; chartable |
| 14 | Neurath 1932/33 | established | checked (via SEP) | Good; English p. 92 (1983) |
| 14 | Arkes & Blumer 1985 | yes | checked | **Strongest** empirical; chartable |
| 14 | James 1907 / Peirce 1878 | established | known | Mismatch: James is pragmatism about truth |
| 14 | *Alt.* Kelly 2003 | yes | citation checked / known | Gives the tools/claims asymmetry |
| 15 | Goodman 1955/1983 | established | checked (p. 64) | **Strongest**; "virtuous" circle, no stopping rule |
| 15 | Rawls 1971 | established | known | Cite §4 (p. 20) too |
| 15 | Daniels 1979 | yes | citation checked / known | Wide RE = loop plus outside inputs |
| 15 | Simon 1956 | yes | citation checked / known | Stopping rule; Simon's aspiration levels move |
| 15 | Schön 1983 | established | known | Loop in design terms |
| 15 | Kant, CPR | established | checked (A293/B349–350, A297/B354, A298/B355) | Partial; "unbounded by experience" only |
| 15 | *Alt.* Iyengar et al. 2006 | yes | checked | Maximisers earn 20% more, feel worse |
| 15 | *Alt.* Mill 1859 | established | known | Opposing case on the table |
| Close | Passmore 1961 | established | known (chapter not verified) | Fine, general |
| Close | Mackie 1964 | yes | citation checked / known | **Best** for the closing |

---

## Links

- Matthias 2004: [Lingnan record](https://scholars.ln.edu.hk/en/publications/the-responsibility-gap-ascribing-responsibility-for-the-actions-o/)
- Santoni de Sio & Mecacci 2021: [TU Delft record](https://research.tudelft.nl/en/publications/four-responsibility-gaps-with-artificial-intelligence-why-they-ma)
- Elish 2019: [ESTS](https://estsjournal.org/index.php/ests/article/view/260)
- Austin p. 22 as quoted: [*Vooys* 32 (DBNL)](https://dbnl.org/tekst/_voo013201401_01/_voo013201401_01_0016.php)
- Coeckelbergh 2020: [PMC7417397](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7417397/)
- Shumailov et al. 2024: [Nature](https://www.nature.com/articles/s41586-024-07566-y)
- Gerstgrasser et al. 2024 (preprint, illustration only): [arXiv 2404.01413](https://arxiv.org/abs/2404.01413)
- Huang et al. 2024: [arXiv 2310.01798](https://arxiv.org/abs/2310.01798)
- Kamoi et al. 2024: [arXiv 2406.01297](https://arxiv.org/abs/2406.01297)
- SEP "Ancient Skepticism": [entry](https://plato.stanford.edu/entries/skepticism-ancient/)
- SEP "Foundationalist Theories of Epistemic Justification": [entry](https://plato.stanford.edu/entries/justep-foundational/)
- Sharma et al. 2024: [ICLR proceedings](https://proceedings.iclr.cc/paper_files/paper/2024/hash/0105f7972202c1d4fb817da9f21a9663-Abstract-Conference.html); [arXiv 2310.13548](https://arxiv.org/abs/2310.13548)
- Wang, Yue & Sun 2023: [ACL Anthology](https://aclanthology.org/2023.findings-emnlp.795/)
- Ross, Lepper & Hubbard 1975, Lee Ross's later table: [Stanford FSI PDF](https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/leeross.pdf)
- Shultz & Katz on the debriefing results: [McGill PDF](https://www.psych.mcgill.ca/perpg/fac/shultz/personal/Recent_Publications_files/belief01.pdf)
- Staw 1976: [PDF (gwern.net)](https://gwern.net/doc/psychology/cognitive-bias/sunk-cost/1976-staw.pdf); [FORRT replication atlas](https://forrt.org/flora-replication-atlas/doi/10.1016/0030-5073(76)90005-2/)
- Arkes & Blumer 1985: [PDF (AAU)](https://cognition.aau.at/bg/BA/Arkes%20%26%20Blumer%201985.pdf)
- SEP "Otto Neurath": [entry](https://plato.stanford.edu/entries/neurath/)
- Goodman, FFF 4th ed. p. 64: [course scan](https://www.joelvelasco.net/teaching/5330/Goodman%20-%20Fact,%20Fiction,%20and%20Forecast.pdf)
- Kant, Kemp Smith, Transcendental Dialectic intro: [CUHK text](https://humanum.arts.cuhk.edu.hk/humftp/E-text/Kant/cpr.kemp-smith/13ideas.htm); Grier excerpt: [Cambridge](https://assets.cambridge.org/97805210/39727/excerpt/9780521039727_excerpt.pdf)
- Iyengar, Wells & Schwartz 2006: [Europe PMC](https://europepmc.org/search?query=DOI%3A10.1111%2Fj.1467-9280.2006.01677.x)
- Castagnoli 2010 review: [BMCR 2011.08.21](https://bmcr.brynmawr.edu/2011/2011.08.21)
