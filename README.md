# ECE 578 — LTE and 5G Communications Interactive Learning Laboratory

**NC State University · Modules 1–17 · 16 technical simulations · 372-question study laboratory**

This repository is intended to remain **PRIVATE**. The interactive applications are static HTML/CSS/JavaScript and can be published as a separate website without exposing the underlying lecture PDFs or internal QA reports.

## Folder structure

- `site/index.html` — student-facing course landing page
- `site/module_01/` … `site/module_17/` — independent applications
- `site/shared/` — common JavaScript/CSS components
- `site/module_17/study_questions.html` — answer-marked study guide
- `private_materials/lecture_slides/` — course slide PDF files **not published** to the website
- `private_materials/quality_assurance/` — development and review records **not published**
- `.github/workflows/deploy-github-pages.yml` — GitHub Pages deployment action for `site/` only

## Recommended web hosting: Cloudflare Pages (works with private GitHub repositories)

1. The **PRIVATE** repository `ismailguvenc/NCSU-ECE-578-Applications` already exists. Keep the `site/` layout unchanged.
2. In [Cloudflare Workers & Pages](https://dash.cloudflare.com/), choose **Create application → Pages → Connect to Git → GitHub**, and authorize access to this repository.
3. Select repository `ismailguvenc/NCSU-ECE-578-Applications`, Production branch `main`.
4. Choose no framework, **Build command: leave blank**, **Build output directory: `site`**, **Root directory: repository root (default)**.
5. Deploy. Cloudflare will provide the actual `*.pages.dev` URL. Do not guess the URL before deployment.

Once deployed, use:
- `<SITE_URL>/` — course portal
- `<SITE_URL>/module_01/` — Module 1
- ...
- `<SITE_URL>/module_16/` — Module 16
- `<SITE_URL>/module_17/` — cumulative quiz
- `<SITE_URL>/module_17/study_questions.html` — answer-marked study guide

Every push to `main` can automatically redeploy the site.

## Alternative: GitHub Pages, if eligible

GitHub Pages supports private source repositories on GitHub Pro/Team/Enterprise plans, but the published website is **public by default**, even if the repository is private. Personal GitHub Free plans require a public repository for GitHub Pages.

In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. The included workflow uploads **only the `site/` directory**. Do **NOT** choose “Deploy from branch root” or you risk exposing `private_materials/`. For an eligible account, the project site is normally at `https://ismailguvenc.github.io/NCSU-ECE-578-Applications/` after successful deployment.

## Local preview

From the repository root:

```bash
python -m http.server 8000 --directory site
```

Open http://localhost:8000/ and visit a module. Python is used only as a static file server. No student login or server-side execution is provided.

## Privacy / assessment warning

The **GitHub repository is private**, but a Cloudflare Pages or standard GitHub Pages *website is publicly accessible* by default. Correct answers in client-side quiz JavaScript and `study_questions.html` are therefore accessible to site visitors. Do not use this client-side quiz for a secure graded exam. To restrict access to enrolled students, put an authentication gate in front of the site (for example Cloudflare Access or university-approved SSO hosting).

See `DEPLOYMENT.md` for a release checklist.