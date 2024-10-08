# BuyIllini Website

Code for the website [buyillini.com](https://www.buyillini.com)!

## Recreation
To recreate this project on your end:
1. Clone this repo
2. Run `npm install` to retrieve all dependencies
3. Make a root-level `.env` file, and add the following inside:
```
CRON_SECRET = // Your Vercel cron secret

DATABASE_URL = // Your database URL (For supabase, ":6543")
DIRECT_URL = // Your direct database URL (For supabase, ":5432")

SALT_ROUNDS = // Salt rounds for passwords

SENDGRID_API_KEY = // Your SendGrid API Key

S3_REGION = // Your S3 region
S3_ACCESS_KEY_ID = // Your S3 Access Key ID
S3_SECRET_ACCESS_KEY = // Your S3 Access Key
S3_BUCKET_NAME = // Your S3 Bucket Name
```