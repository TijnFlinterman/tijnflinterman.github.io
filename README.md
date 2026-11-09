# Portfolio

Code-editor style portfolio for Jekyll and GitHub Pages. Everything is placeholder content.

## Where to edit
- `_data/profile.yml`: name, role, photo, bio, facts, CV, buttons, top bar, social icons
- `_data/nav.yml`: the tabs in the top bar
- `_data/experience.yml`, `services.yml`, `stack.yml`, `awards.yml`, `testimonials.yml`: the landing page sections
- `_projects/*.md`: one file per project (copy one to add a project). The text under the front matter is the overview.
- `_posts/`: blog posts, named `YYYY-MM-DD-title.md`
- `index.html` (the landing page), `work/index.html`, `blog/index.html`: headings and section text

## Project front matter
`title, order, client, role, year, live_url, cover, gallery, results, feedback`.
Leave `gallery`, `results`, `feedback` or `live_url` out and that part (and its Index entry) disappears.

## Images
Put images in `assets/img/` and refer to them like `/assets/img/my-shot.jpg`.
Your photo goes in `assets/img/` too, then set `avatar` in `profile.yml`. Put your CV at `assets/cv.pdf`.

## Preview
    bundle exec jekyll serve

## GitHub Pages
Settings, Pages, "Deploy from a branch", `main`, `/ (root)`. For a project site set `baseurl: "/repo-name"` in `_config.yml`.

## Contact form
GitHub Pages has no server. Either paste a form service URL (Formspree, Web3Forms) into `form_action` in `_data/profile.yml`,
or leave it empty and the form opens the visitor's email app addressed to `form_email`.
