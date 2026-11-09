# Portfolio

Code-editor style portfolio for Jekyll and GitHub Pages. Everything is placeholder content.

## Where to edit
- `_data/profile.yml`: name, role, photo, bio, facts, CV, buttons, top bar, social icons
- `_data/nav.yml`: the tabs in the top bar
- `_data/experience.yml`, `_data/skills.yml`: the About page
- `_projects/*.md`: one file per project (copy one to add a project). The text under the front matter is the overview.
- `_posts/`: blog posts, named `YYYY-MM-DD-title.md`
- `index.html`, `work/index.html`, `blog/index.html`: page headings

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
