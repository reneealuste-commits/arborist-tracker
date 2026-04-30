# Arborist Planner 🌲

Arborist'i tööde ja liidide haldamise rakendus.

## Omadused

- 📅 **Kalender** – Nädala ja kuuvaade
- 🪚 **Tööde haldus** – Lisa, muuda, märgi tehtud
- 💶 **Tulu** – Näda plaanitud ja saadud tulusid
- 🎯 **Liidid** – Raielubade haldus ja kontakteerimine
- 📧 **Postkast** – Email integratsioon
- 🔐 **Turvalisus** – NextAuth + Supabase RLS

## Seadistus

### 1. Supabase (Andmebaas)

1. Ava [https://supabase.com](https://supabase.com)
2. Logi sisse / loo konto
3. Loo uus projekt
4. Ava SQL Editor ja jooksuta [db/schema.sql](db/schema.sql) faili sisu
5. Kopeeri URL ja anon key:
   - Projekti seaded → API
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Tee service role key nähtavaks (Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2. GitHub OAuth (Optional, kuid soovituslik)

1. Ava [https://github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App
3. Application name: `Arborist Planner`
4. Homepage URL: `https://yourdomain.vercel.app`
5. Authorization callback URL: `https://yourdomain.vercel.app/api/auth/callback/github`
6. Kopeeri:
   - `GITHUB_ID`
   - `GITHUB_SECRET`

### 3. NextAuth Secret

```bash
openssl rand -base64 32
```

Kopeeri väljund `NEXTAUTH_SECRET` muutujasse.

### 4. .env.local

Renameeri `.env.local.example` → `.env.local` ja täida:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### 5. Käivita kohalikult

```bash
npm install
npm run dev
```

Ava [http://localhost:3000](http://localhost:3000)

## Vercel'ile juurutamine

1. Push kood GitHub'i
2. Ava [https://vercel.com](https://vercel.com)
3. Import project
4. Vali `arborist-tracker` repo
5. Seaded → Environment Variables
6. Lisa kõik .env.local muutujad
7. Deploy

Vercel suunab automaatselt turvalisuse seadistused (HTTPS, etc).

## Andmebaasi struktuur

- `jobs` – Arborist'i tööd
- `leads` – Raielubade liidid
- `user_profiles` – Kasutaja ettevõtte andmed
- `connections` – Email teenuste ühendused

Kõik tabelid on kaitstud RLS-iga – igal kasutajal juurdepääs vaid oma andmetele.

## Licens

MIT
