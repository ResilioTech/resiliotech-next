#!/bin/bash

# Performance Optimization Implementation Script
# Run this to apply all optimizations

set -e

echo "🚀 Starting Performance Optimization Implementation"
echo "=================================================="

# Step 1: Install dependencies
echo ""
echo "📦 Step 1: Installing bundle analyzer..."
npm install --save-dev @next/bundle-analyzer

# Step 2: Add analyze script to package.json
echo ""
echo "📝 Step 2: Adding analyze script to package.json..."
if ! grep -q '"analyze"' package.json; then
  # Use Node.js to add the script
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.scripts.analyze = 'ANALYZE=true npm run build';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  echo "✅ Added 'analyze' script to package.json"
else
  echo "⏭️  'analyze' script already exists"
fi

# Step 3: Backup and replace next.config.js
echo ""
echo "⚙️  Step 3: Backing up and replacing next.config.js..."
if [ -f next.config.js ]; then
  cp next.config.js next.config.js.backup.$(date +%Y%m%d_%H%M%S)
  echo "✅ Backed up next.config.js"
fi

cp next.config.optimized.js next.config.js
echo "✅ Replaced next.config.js with optimized version"

# Step 4: Replace analytics components
echo ""
echo "📊 Step 4: Updating analytics components..."
if [ -f src/components/analytics/GA4.tsx ]; then
  cp src/components/analytics/GA4.tsx src/components/analytics/GA4.backup.$(date +%Y%m%d_%H%M%S).tsx
  echo "✅ Backed up GA4.tsx"
fi

cp src/components/analytics/GA4.optimized.tsx src/components/analytics/GA4.tsx
echo "✅ Replaced GA4.tsx with optimized version"

if [ -f src/components/analytics/Clarity.tsx ]; then
  cp src/components/analytics/Clarity.tsx src/components/analytics/Clarity.backup.$(date +%Y%m%d_%H%M%S).tsx
  echo "✅ Backed up Clarity.tsx"
fi

cp src/components/analytics/Clarity.optimized.tsx src/components/analytics/Clarity.tsx
echo "✅ Replaced Clarity.tsx with optimized version"

# Step 5: Clean build cache
echo ""
echo "🧹 Step 5: Cleaning build cache..."
rm -rf .next
echo "✅ Cleaned .next directory"

# Step 6: Test build
echo ""
echo "🔨 Step 6: Testing production build..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful!"
else
  echo ""
  echo "❌ Build failed. Restoring backups..."
  # Restore backups if build fails
  if [ -f next.config.js.backup.* ]; then
    cp next.config.js.backup.* next.config.js
  fi
  exit 1
fi

# Success message
echo ""
echo "🎉 Optimization Implementation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Run 'npm run start' to test the optimized build"
echo "2. Run 'npm run analyze' to see bundle sizes"
echo "3. Test with Lighthouse in Chrome DevTools"
echo ""
echo "Expected improvements:"
echo "- Performance Score: 69 → 90+"
echo "- Total Blocking Time: 1510ms → <300ms"
echo "- JavaScript Bundle: Reduced by ~30%"
echo ""
echo "📚 See PERFORMANCE-OPTIMIZATION-GUIDE.md for more optimizations"
