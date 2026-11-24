# Publish on GitHub

1. Extract the ZIP and open the project folder in VS Code.
2. Review the original PDF and screenshots for personal information before making the repository public.
3. Create an empty repository named `password-strength-checker` at https://github.com/new (do not initialize a README).
4. Open the terminal in the extracted project folder and run:

```bash
git init
git add .
git status
git commit -m "Publish Sentinel password security project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/password-strength-checker.git
git push -u origin main
```

Replace YOUR_USERNAME with your actual GitHub username. Authenticate when GitHub prompts you. If Git requests your identity, configure `git config user.name "Your Name"` and `git config user.email "Your Email"`.

5. In the repository, open Settings > Pages. Select Deploy from a branch, main, /docs, then Save.
6. After deployment, open `https://YOUR_USERNAME.github.io/password-strength-checker/`.

The static website runs independently of Python. GitHub Pages does not execute the CLI.
