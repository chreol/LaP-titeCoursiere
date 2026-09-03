This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Administration du contenu

La page [`/admin`](/admin) permet d'ajouter des témoignages, des images et des vidéos.

- `Exporter JSON` télécharge une sauvegarde du contenu dans le navigateur.
- `Importer JSON` recharge une sauvegarde dans le navigateur.
- `Charger GitHub` récupère le fichier versionné depuis GitHub.
- `Enregistrer sur GitHub` écrit `src/data/site-content.json` dans le dépôt. Si Vercel est connecté au dépôt, ce commit déclenche automatiquement un nouveau déploiement.

Pour activer GitHub, ajoutez ces variables dans Vercel et en local :

```env
GITHUB_OWNER=chreol
GITHUB_REPO=LaP-titeCoursiere
GITHUB_BRANCH=main
GITHUB_TOKEN=un_token_github_avec_le_droit_Contents_read_write
ADMIN_CONTENT_TOKEN=un_secret_long_pour_proteger_admin
```

Le token GitHub reste côté serveur dans les variables Vercel. Le `ADMIN_CONTENT_TOKEN` est saisi dans `/admin` pour autoriser l'écriture et ne doit jamais être commité. En production, protégez également la route `/admin` avec une authentification utilisateur avant de partager son URL.
