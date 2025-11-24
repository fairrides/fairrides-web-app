# NYCRide - Fair Ride Sharing Platform

A modern ride-sharing application built with Next.js, designed to be 20% cheaper than competitors while ensuring drivers keep 100% of their earnings.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🎯 Features

- **Dual User Roles**: Separate experiences for riders and drivers
- **Smart Pricing**: AI-powered pricing engine (20% cheaper than competitors)
- **Driver-First**: Drivers keep 100% of earnings
- **Real-time Mapping**: Powered by Mapbox
- **Mobile Ready**: Built with Capacitor for iOS/Android deployment

## 🧪 Testing the App

### Rider Signup
1. Go to [http://localhost:3000/auth/rider](http://localhost:3000/auth/rider)
2. Click "Sign Up"
3. Fill in your details
4. Start requesting rides!

### Driver Signup
1. Go to [http://localhost:3000/auth/driver](http://localhost:3000/auth/driver)
2. Click "Sign Up"
3. Complete onboarding
4. Start earning!

## 💾 Data Storage

Currently using **localStorage** for easy development and sharing:
- ✅ No backend setup required
- ✅ Works immediately after clone
- ✅ Perfect for demos and development
- ✅ Easy to migrate to Supabase/Firebase later

All user data is stored locally in your browser. Clear your browser's localStorage to reset.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Mobile**: Capacitor
- **Auth**: localStorage (development) → Supabase (production ready)

## 📱 Building for Mobile

```bash
# Build the web app
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android
```

## 🔄 Migrating to Production Backend

When ready to deploy, you can easily swap localStorage auth for:
- **Supabase** (recommended, 5 min setup)
- **Firebase** (Google's BaaS)
- **Your own API** (custom backend)

Just update `src/lib/auth.ts` - all UI components will work unchanged!

## 🌍 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Get a free Mapbox token at [mapbox.com](https://www.mapbox.com)

## 📄 License

MIT

## 🤝 Contributing

This is a development project. Feel free to fork and experiment!
