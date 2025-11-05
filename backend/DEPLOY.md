# Backend Deployment Guide

## Deploy to Vercel

### Required Environment Variables

You need to set these in Vercel dashboard:

```
PORT=8001
NODE_ENV=production
CORS_ORIGINS=https://kaggi.is,https://www.kaggi.is
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
CREDITINFO_API_KEY=your_creditinfo_api_key
CREDITINFO_API_URL=https://api.creditinfo.is
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=noreply@kaggi.is
BREVO_SENDER_NAME=Kaggi
JWT_SECRET=your_jwt_secret_key_here
```

### Deployment Steps

1. Go to Vercel Dashboard
2. Click "Add New..." → "Project"
3. Import your `stebbidabba/kaggi` repository
4. Set **Root Directory** to `backend`
5. Framework Preset: **Other** (or leave as detected)
6. Add all environment variables above
7. Deploy

### After Deployment

Your backend will be available at: `https://your-backend.vercel.app`

Then update your frontend environment variable:
- In frontend Vercel project settings
- Add: `NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app`
- Redeploy frontend

