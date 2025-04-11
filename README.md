## Getting Started

First, run the development server:

```bash
npm install
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

## Table

To modify/add fields in the table, the following files need to be updated:
types/Players.ts
components/tHead.tsx
components/tBody.tsx


## Card

components/card.tsx

**"Whenever you want to add new fields to the card, copy the template and duplicate it according to the new data to be inserted in:
const statistics = [
  { label: 'Valor', value: player?.value ?? '-' },
  { label: 'Idade', value: player?.age ? `${player.age} anos` : '-' },
  { label: 'Jogos', value: player?.games && player?.league ? `${player.games} jogos em ${player.league}` : '-' },
  ...
]


