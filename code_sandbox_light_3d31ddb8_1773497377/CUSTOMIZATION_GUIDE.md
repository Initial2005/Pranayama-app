# ⚡ Quick Customization Guide

## 🎯 5-Minute Setup - Replace Your Information

This guide helps you quickly replace all placeholder information with your own details.

---

## Step 1: Update Developer Information

### Open `index.html` and search for these sections:

### 📝 Your Name (Line ~274)
```html
<!-- FIND -->
<h3 class="developer-name">Your Name</h3>
<p class="developer-title">Full Stack Developer & Yoga Enthusiast</p>

<!-- REPLACE WITH -->
<h3 class="developer-name">John Smith</h3>
<p class="developer-title">Senior Web Developer & Meditation Coach</p>
```

### 📖 Your Bio (Line ~277)
```html
<!-- FIND -->
<div class="developer-bio">
    <p>Passionate about creating technology...</p>
    <p>With a background in both modern web...</p>
</div>

<!-- REPLACE WITH YOUR STORY -->
<div class="developer-bio">
    <p>Your first paragraph about yourself...</p>
    <p>Your second paragraph about your journey...</p>
</div>
```

### 📊 Your Stats (Line ~283)
```html
<!-- FIND -->
<span class="stat-number">5+</span>
<span class="stat-label">Years Coding</span>

<!-- REPLACE WITH YOUR STATS -->
<span class="stat-number">10+</span>
<span class="stat-label">Years Coding</span>
```

### 🛠️ Your Skills (Line ~296)
```html
<!-- FIND -->
<span class="skill-tag">HTML5</span>
<span class="skill-tag">CSS3</span>
<span class="skill-tag">JavaScript</span>

<!-- REPLACE WITH YOUR SKILLS -->
<span class="skill-tag">React</span>
<span class="skill-tag">TypeScript</span>
<span class="skill-tag">Python</span>
```

---

## Step 2: Update Social Links

### 🔗 Replace All Social Media URLs

Search and replace these in `index.html`:

```html
<!-- GitHub (appears 2 times) -->
FIND: https://github.com/yourusername
REPLACE: https://github.com/YOUR-ACTUAL-USERNAME

<!-- LinkedIn (appears 2 times) -->
FIND: https://linkedin.com/in/yourusername
REPLACE: https://linkedin.com/in/YOUR-ACTUAL-USERNAME

<!-- Twitter (appears 1 time) -->
FIND: https://twitter.com/yourusername
REPLACE: https://twitter.com/YOUR-ACTUAL-HANDLE

<!-- Email (appears 4 times) -->
FIND: your.email@example.com
REPLACE: your-actual-email@domain.com

<!-- Portfolio (appears 1 time) -->
FIND: https://yourportfolio.com
REPLACE: https://your-actual-portfolio.com
```

---

## Step 3: Test Your Changes

### Open your app and verify:

1. **Navigation Bar**: Shows your name after login
2. **About Section**: Displays your info correctly
3. **Social Links**: Click each link to verify they work
4. **Contact Section**: Shows your email
5. **Footer**: Shows your name

---

## 🎨 Optional: Customize Avatar

### Replace Emoji with Your Photo

**Current code (Line ~269):**
```html
<div class="avatar-circle">
    <span class="avatar-text">🧘</span>
</div>
```

**Option 1: Different Emoji**
```html
<div class="avatar-circle">
    <span class="avatar-text">👨‍💻</span>
</div>
```

**Option 2: Your Photo**
```html
<div class="avatar-circle" style="overflow: hidden;">
    <img src="your-photo.jpg" alt="Your Name" 
         style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

---

## 🎨 Optional: Customize Colors

### Change Theme Colors

Open `css/style.css` and find the `:root` section (Line ~10):

```css
:root {
    /* Customize these colors */
    --hero-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    --hero-text: #ffffff;
    
    /* Or change element colors */
    --earth-primary: #3d2817;
    --water-primary: #0a4d68;
    --fire-primary: #8b2500;
    --air-primary: #1e3a5f;
    --ether-primary: #4a148c;
}
```

---

## ✅ Pre-Deployment Checklist

Before publishing, make sure you've updated:

- [ ] Your name (3 places)
- [ ] Your bio (2 paragraphs)
- [ ] Your experience stats (3 stats)
- [ ] Your skills (8+ tags)
- [ ] GitHub URL (2 places)
- [ ] LinkedIn URL (2 places)
- [ ] Twitter URL (1 place)
- [ ] Email address (4 places)
- [ ] Portfolio URL (1 place)
- [ ] Avatar/photo (optional)

---

## 🔍 Find & Replace Tool

Use your code editor's "Find & Replace" feature:

**VS Code**: `Ctrl/Cmd + H`
**Sublime**: `Ctrl/Cmd + H`
**Atom**: `Ctrl/Cmd + F`

### Recommended Find & Replace Order:

1. **yourusername** → YOUR-GITHUB-USERNAME
2. **your.email@example.com** → YOUR-EMAIL
3. **Your Name** → YOUR-ACTUAL-NAME
4. **yourportfolio.com** → YOUR-PORTFOLIO-URL

---

## 🚀 Quick Deploy

After customization:

1. Save all files
2. Test locally in browser
3. Go to **Publish tab**
4. Click **Publish Project**
5. Share your live URL! 🎉

---

## 💡 Pro Tips

### Tip 1: Use Consistent Naming
Make sure your name appears the same way everywhere for consistency.

### Tip 2: Professional Email
Use a professional email address (not something like cooldev123@...)

### Tip 3: Complete Profiles
Ensure your LinkedIn/GitHub profiles are complete before linking them.

### Tip 4: Test All Links
Click every social link after updating to ensure they work.

### Tip 5: Professional Bio
Write a concise, professional bio. 2-3 paragraphs is perfect.

---

## 🎯 Example: Complete Replacement

**Before:**
```html
<h3 class="developer-name">Your Name</h3>
<a href="https://github.com/yourusername">GitHub</a>
<a href="mailto:your.email@example.com">Email</a>
```

**After:**
```html
<h3 class="developer-name">Sarah Johnson</h3>
<a href="https://github.com/sarahjdev">GitHub</a>
<a href="mailto:sarah.johnson@techmail.com">Email</a>
```

---

## 📋 Line Number Reference

Quick reference for finding sections in `index.html`:

```
Line ~12-40: Navigation & Auth Modal
Line ~45-135: Earth Element Section
Line ~137-227: Water Element Section
Line ~229-319: Fire Element Section
Line ~321-411: Air Element Section
Line ~413-503: Ether Element Section
Line ~505-622: About Developer Section ← CUSTOMIZE THIS
Line ~624-751: Contact Section ← UPDATE EMAILS HERE
Line ~753-789: Footer
```

---

## ⚠️ Common Mistakes to Avoid

1. **Forgetting https://** in URLs
2. **Leaving placeholder text** in bio
3. **Not testing links** after updating
4. **Using inconsistent capitalization** in your name
5. **Forgetting to update email** in multiple places
6. **Broken image links** if using custom avatar

---

## 🆘 Quick Fixes

### Links Don't Work?
- Add `https://` to the beginning
- Check for typos in username
- Ensure `target="_blank"` is present for external links

### Name Not Appearing?
- Check if you logged in after updating
- Clear browser cache and refresh
- Logout and login again

### Avatar Not Showing?
- Check image path is correct
- Use relative path: `images/avatar.jpg`
- Ensure image file exists in project

---

## ✨ You're Done!

Your personalized Pranayama app is ready to share with the world!

**Next step:** Go to the **Publish tab** and deploy! 🚀

---

*Remember: You can always come back and update these details later.*