#!/bin/bash

# Inject Pro features into index-pro.html

# 1. Add Pro script before </head>
sed -i '' '/<\/head>/i\
<script src="pro-enhancements.js"><\/script>
' index-pro.html

# 2. Update title
sed -i '' 's/<title>AI思维导图生成 - AiMarkmap<\/title>/<title>AI思维导图生成 Pro - AiMarkmap-Pro<\/title>/' index-pro.html

# 3. Add Pro badge to header
sed -i '' 's/<h1>AiMarkmap <span class="ai-badge">AI Powered<\/span><\/h1>/<h1>AiMarkmap <span class="ai-badge">Pro v2.0<\/span><\/h1>/' index-pro.html

echo "✅ Pro features injected into index-pro.html"
