# Jenifer Chen — Architecture × Acoustics Portfolio

A responsive two-page portfolio inspired by the supplied product-design reference: black canvas, vivid orange accents, blurred colour glows, glassmorphism panels, rounded cards, and subtle motion.

## Pages
- `index.html` — interactive home page with expandable professional profile, summary, education, career, and acoustical experience.
- `design.html` — selected architectural projects with supporting portfolio boards extracted from the uploaded portfolio PDF.

## Technology
HTML, CSS, JavaScript, and `content.json`. Designed for static hosting on GitHub Pages.

## Update content
Edit `content.json` to update profile text, membership, skills, education, career history, acoustic activities, and design projects. Add image files under `images/` and use their relative paths. Project cover and gallery paths are stored in each `designProjects` item.

## Run locally
In VS Code, right-click `index.html` and choose **Open with Live Server**. Do not open the HTML file directly as `file://`, because JavaScript loads `content.json` with `fetch()`.

## Personal information
The public website intentionally excludes the phone number, email address, and home address found in the source PDF. Replace `ADD YOUR CHINESE NAME` in `content.json` with the Chinese name you want to publish before deployment.

## Publish with GitHub Pages
1. Create a public GitHub repository and upload the project files.
2. Go to **Settings → Pages**.
3. Choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save.
4. Wait for deployment and add the published URL to the assignment presentation.

## Suggested meaningful commits
- `chore: create portfolio structure`
- `feat: add expandable portfolio navigation`
- `feat: load profile and project content from JSON`
- `style: apply dark glassmorphism visual system`
- `content: add acoustic research and career details`
- `content: add architectural project boards from portfolio PDF`
- `docs: document content updates and GitHub Pages deployment`

Only make commits that correspond to work actually completed.


## Recent homepage customisation
- Dark glassmorphism styling retained.
- Homepage opens with the requested Professional Summary paragraph.
- Removed the Professional Profile and Contact navigation cards, all section number labels, and arrow symbols.
- Kept the bottom “Let's connect” panel.
- Added the uploaded profile portrait as `images/profile-photo.jpg`.


## Open locally in VS Code
1. Extract the ZIP to a normal folder.
2. In VS Code choose **File → Open Folder** and select the extracted folder.
3. If VS Code shows **Restricted Mode**, click it and choose **Trust this folder** (only for this project).
4. Install the **Live Server** extension by Ritwick Dey from the Extensions panel if it is not installed.
5. Right-click `index.html` and choose **Open with Live Server**. If that option is absent, open the Command Palette (`Ctrl+Shift+P`) and run **Live Server: Open with Live Server**.

Do not open `index.html` by double-clicking it if you want `content.json` to load; use Live Server.


## Latest design portfolio content
The Design Portfolio page currently includes Roller Sport Training Center, Aureo Hotel, and Laydaunt Kan Home Extension. The final selected residential-design project has been removed. Roller Sport uses only the six images supplied specifically for that project. Laydaunt Kan uses the four supplied images plus page 29 from the original portfolio PDF. The crossed Aureo Hotel cover image is not used.
