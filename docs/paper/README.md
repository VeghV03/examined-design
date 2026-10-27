# Examined Design: the paper

*Examined Design: Testimony in both directions when you design with a model.* Fifteen articles in the
scholastic form (a question, the objections, the contrary, the answer, the replies, and a bold rule),
from framing the worst outcome to stopping, with the File Manager of Swarm Desktop as the case.

| | |
|---|---|
| `examined-design.pdf` | the paper |
| `examined-design.tex` | its source |
| `figures/figs.tex` | every diagram and chart, as TikZ and pgfplots macros |
| `figures/boards/` | renders of the boards from the case that the articles show |
| `notes/` | the source notes behind each article's citations: what each source says, and what was checked |

## Building it

```sh
cd docs/paper
xelatex examined-design.tex
xelatex examined-design.tex      # a second run settles the cross-references
```

It needs XeLaTeX (TeX Live or MacTeX) with `fontspec`, `tikz`, `pgfplots`, `microtype`, `enumitem`
and `multicol`, and the **Iowan Old Style** font, which ships with macOS. On another system, change the
`\setmainfont` line to a serif you have; the line breaks will move.

## What its citations rest on

Each article cites the studies and philosophy it argues from. The notes say, per source, what the
claim in the paper is, where in the source it is, and whether it was checked against the source itself
or rests on a reliable secondary account. Where a well-known finding has failed to replicate or is
contested, the paper says so beside the citation.

The notes were written by the model during the research, in its own first person: "this session"
means the session in which a source was read, and "checked" and "known" mark what was read against
the source and what was not. They are published as they were used, so a reader can see what each
citation rests on.

## Licence

The code in this repository is MIT. The paper's licence has not been decided yet.
