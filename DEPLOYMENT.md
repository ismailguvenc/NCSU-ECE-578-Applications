# Deployment checklist

1. Verify repository owner `ismailguvenc`; visibility **Private**.
2. Upload all files, preserving `site/`, `private_materials/`, and `.github/`.
3. Enable Cloudflare Pages Git integration (recommended for GitHub Free) OR GitHub Actions-based Pages (GitHub Pro+).
4. Confirm production web URL in hosting dashboard.
5. Open site root and navigate Module 1, Module 3 paging/TA, Module 16 NR, Module 17 quiz and study guide.
6. Confirm that `/<SITE_URL>/reference_slides/` and `/private_materials/` are NOT hosted.
7. If access should be restricted to students, configure authentication BEFORE sharing URL.
8. Treat original historical examination answer keys as instructor-review material; client-side quiz is intended for formative practice.

## Troubleshooting

- CSS/JS 404: Verify the deployment output directory is `site/` and all `shared/` assets are committed.
- Incorrect module URL: use `/module_01/` (leading zero) through `/module_17/`.
- GitHub Pages build not available from a private repo: check GitHub plan or switch to Cloudflare Pages.
- Raw slide PDF link missing: intentionally not deployed; students should use course-provided slides.