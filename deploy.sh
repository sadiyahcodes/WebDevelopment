# E-commerce Deployment Script
# Run this after setting up all accounts

echo "🚀 Starting E-commerce Deployment..."

# Step 1: Deploy Frontend to Vercel
echo "📦 Deploying Frontend to Vercel..."
cd frontend/ecommerce-frontend
vercel --prod
echo "✅ Frontend deployed! Copy the URL shown above."

# Step 2: Deploy Backend to Railway
echo "🔧 Deploying Backend to Railway..."
cd ../../backend
railway login
railway init
railway up

echo "🎉 Deployment Complete!"
echo "Don't forget to:"
echo "1. Update your frontend API calls to use the Railway backend URL"
echo "2. Set environment variables in Railway dashboard"
echo "3. Test your deployed application"