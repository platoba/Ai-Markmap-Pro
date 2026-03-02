/**
 * Ai-Markmap-Pro Enhancement Module v2.0.0
 * Professional features for AI Mind Map Generator
 * 
 * Features:
 * - History Management
 * - Template System
 * - Theme System
 * - Advanced Export (MD/JSON/PDF)
 * - Share System
 * - Prompt Library
 * - Auto-save
 * - Search & Filter
 */

// ========== History Management ==========
class HistoryManager {
    constructor() {
        this.storageKey = 'ai-markmap-history';
        this.maxHistory = 100;
    }

    save(markdown, title = null) {
        const history = this.getAll();
        const entry = {
            id: Date.now(),
            title: title || this.extractTitle(markdown),
            markdown: markdown,
            timestamp: new Date().toISOString(),
            tags: []
        };
        
        history.unshift(entry);
        if (history.length > this.maxHistory) {
            history.pop();
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(history));
        return entry.id;
    }

    getAll() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (e) {
            return [];
        }
    }

    get(id) {
        return this.getAll().find(item => item.id === id);
    }

    delete(id) {
        const history = this.getAll().filter(item => item.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }

    search(query) {
        const history = this.getAll();
        const lowerQuery = query.toLowerCase();
        return history.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.markdown.toLowerCase().includes(lowerQuery)
        );
    }

    extractTitle(markdown) {
        const match = markdown.match(/^#\s+(.+)/m);
        return match ? match[1].replace(/[^\w\u4e00-\u9fa5\s]/g, '').trim().slice(0, 50) : 'Untitled';
    }

    exportAll() {
        const history = this.getAll();
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        return blob;
    }

    importAll(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                localStorage.setItem(this.storageKey, JSON.stringify(imported));
                return true;
            }
        } catch (e) {
            console.error('Import failed:', e);
        }
        return false;
    }
}

// ========== Template System ==========
class TemplateManager {
    constructor() {
        this.templates = {
            'project-planning': {
                name: '📋 Project Planning',
                markdown: `# Project Name

## 🎯 Objectives
- Primary goal
- Secondary goals
- Success metrics

## 📊 Scope
### In Scope
- Feature A
- Feature B
### Out of Scope
- Future considerations

## 👥 Team
- Project Manager
- Developers
- Designers

## 📅 Timeline
- Phase 1: Planning
- Phase 2: Development
- Phase 3: Testing
- Phase 4: Launch

## 💰 Budget
- Development costs
- Marketing costs
- Operational costs

## ⚠️ Risks
- Technical risks
- Resource risks
- Timeline risks`
            },
            'brainstorming': {
                name: '🧠 Brainstorming',
                markdown: `# Central Idea

## 💡 Main Concepts
- Concept 1
- Concept 2
- Concept 3

## 🔍 Analysis
### Pros
- Advantage 1
- Advantage 2
### Cons
- Challenge 1
- Challenge 2

## 🚀 Action Items
- Next step 1
- Next step 2
- Next step 3

## 📝 Notes
- Additional thoughts
- References`
            },
            'learning-notes': {
                name: '📚 Learning Notes',
                markdown: `# Topic Name

## 📖 Key Concepts
- Concept 1
  - Definition
  - Examples
- Concept 2
  - Definition
  - Examples

## 🔗 Relationships
- How concepts connect
- Dependencies

## 💡 Insights
- Important takeaways
- Aha moments

## ❓ Questions
- What I don't understand
- Areas to explore

## 📚 Resources
- Books
- Articles
- Videos`
            },
            'swot-analysis': {
                name: '📊 SWOT Analysis',
                markdown: `# SWOT Analysis

## 💪 Strengths
- Internal advantage 1
- Internal advantage 2
- Core competencies

## 🔻 Weaknesses
- Internal limitation 1
- Internal limitation 2
- Areas for improvement

## 🌟 Opportunities
- External opportunity 1
- External opportunity 2
- Market trends

## ⚠️ Threats
- External threat 1
- External threat 2
- Competitive pressures

## 🎯 Strategic Actions
- Leverage strengths
- Address weaknesses
- Capitalize on opportunities
- Mitigate threats`
            },
            'meeting-notes': {
                name: '📝 Meeting Notes',
                markdown: `# Meeting Title

## 📅 Details
- Date: YYYY-MM-DD
- Time: HH:MM
- Attendees: Names

## 🎯 Agenda
1. Topic 1
2. Topic 2
3. Topic 3

## 💬 Discussion Points
### Topic 1
- Key point 1
- Key point 2
### Topic 2
- Key point 1
- Key point 2

## ✅ Decisions Made
- Decision 1
- Decision 2

## 📋 Action Items
- [ ] Task 1 - Owner - Due date
- [ ] Task 2 - Owner - Due date

## 📝 Next Steps
- Follow-up meeting
- Deliverables`
            },
            'goal-setting': {
                name: '🎯 Goal Setting',
                markdown: `# Goal Name

## 🎯 SMART Criteria
- **S**pecific: Clear and well-defined
- **M**easurable: Quantifiable metrics
- **A**chievable: Realistic and attainable
- **R**elevant: Aligned with objectives
- **T**ime-bound: Deadline set

## 📊 Current State
- Where we are now
- Baseline metrics

## 🎯 Target State
- Where we want to be
- Target metrics

## 🛤️ Action Plan
### Phase 1
- Step 1
- Step 2
### Phase 2
- Step 3
- Step 4

## 📈 Progress Tracking
- Milestone 1
- Milestone 2
- Milestone 3

## 🎉 Success Criteria
- Metric 1
- Metric 2`
            },
            'roadmap': {
                name: '🗺️ Roadmap',
                markdown: `# Product Roadmap

## Q1 2026
### Features
- Feature A
- Feature B
### Goals
- Goal 1
- Goal 2

## Q2 2026
### Features
- Feature C
- Feature D
### Goals
- Goal 3
- Goal 4

## Q3 2026
### Features
- Feature E
- Feature F
### Goals
- Goal 5
- Goal 6

## Q4 2026
### Features
- Feature G
- Feature H
### Goals
- Goal 7
- Goal 8

## Future Considerations
- Long-term vision
- Potential features`
            },
            'research': {
                name: '🔬 Research',
                markdown: `# Research Topic

## 🎯 Research Question
- Main question
- Sub-questions

## 📚 Literature Review
- Source 1
  - Key findings
- Source 2
  - Key findings

## 🔬 Methodology
- Approach
- Tools
- Data collection

## 📊 Findings
- Finding 1
- Finding 2
- Finding 3

## 💡 Analysis
- Interpretation
- Implications

## 🎯 Conclusions
- Summary
- Recommendations

## 📝 References
- Citation 1
- Citation 2`
            }
        };
    }

    getAll() {
        return Object.entries(this.templates).map(([id, template]) => ({
            id,
            ...template
        }));
    }

    get(id) {
        return this.templates[id];
    }
}

// ========== Theme System ==========
class ThemeManager {
    constructor() {
        this.themes = {
            'default': {
                name: 'Default',
                colors: ['#3B82F6', '#16A34A', '#F97316', '#9333EA', '#E11D48', '#0891B2'],
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                panelBg: 'rgba(255, 255, 255, 0.95)',
                textColor: '#333'
            },
            'ocean': {
                name: '🌊 Ocean',
                colors: ['#0EA5E9', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#0284C7'],
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                panelBg: 'rgba(255, 255, 255, 0.95)',
                textColor: '#1e293b'
            },
            'forest': {
                name: '🌲 Forest',
                colors: ['#10B981', '#059669', '#16A34A', '#15803D', '#14532D', '#22C55E'],
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                panelBg: 'rgba(255, 255, 255, 0.95)',
                textColor: '#1e293b'
            },
            'sunset': {
                name: '🌅 Sunset',
                colors: ['#F97316', '#EA580C', '#DC2626', '#EF4444', '#F59E0B', '#FB923C'],
                background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
                panelBg: 'rgba(255, 255, 255, 0.95)',
                textColor: '#1e293b'
            },
            'purple': {
                name: '💜 Purple',
                colors: ['#9333EA', '#7C3AED', '#6366F1', '#8B5CF6', '#A855F7', '#C084FC'],
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                panelBg: 'rgba(255, 255, 255, 0.95)',
                textColor: '#1e293b'
            },
            'dark': {
                name: '🌙 Dark',
                colors: ['#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F87171', '#2DD4BF'],
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                panelBg: 'rgba(30, 41, 59, 0.95)',
                textColor: '#f1f5f9'
            }
        };
        this.currentTheme = 'default';
    }

    apply(themeId) {
        const theme = this.themes[themeId];
        if (!theme) return;

        document.body.style.background = theme.background;
        document.documentElement.style.setProperty('--panel-bg', theme.panelBg);
        document.documentElement.style.setProperty('--text-color', theme.textColor);
        
        // Update color palette for mind map
        if (window.colorPalette) {
            window.colorPalette = theme.colors;
        }

        this.currentTheme = themeId;
        localStorage.setItem('ai-markmap-theme', themeId);
    }

    getAll() {
        return Object.entries(this.themes).map(([id, theme]) => ({
            id,
            name: theme.name
        }));
    }

    getCurrent() {
        return this.currentTheme;
    }

    loadSaved() {
        const saved = localStorage.getItem('ai-markmap-theme');
        if (saved && this.themes[saved]) {
            this.apply(saved);
        }
    }
}

// ========== Share System ==========
class ShareManager {
    generateShareUrl(markdown, theme = 'default') {
        const data = btoa(encodeURIComponent(markdown));
        const baseUrl = window.location.href.split('?')[0];
        return `${baseUrl}?data=${data}&theme=${theme}`;
    }

    loadFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('data');
        const theme = params.get('theme');
        
        if (data) {
            try {
                const markdown = decodeURIComponent(atob(data));
                return { markdown, theme };
            } catch (e) {
                console.error('Failed to load shared data:', e);
            }
        }
        return null;
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return Promise.resolve();
        }
    }
}

// ========== Export Manager ==========
class ExportManager {
    exportMarkdown(markdown, filename) {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        this.downloadBlob(blob, filename + '.md');
    }

    exportJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        this.downloadBlob(blob, filename + '.json');
    }

    async exportPDF(svgElement, filename) {
        // Use browser's print functionality
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${filename}</title>
                <style>
                    body { margin: 0; padding: 20px; }
                    svg { max-width: 100%; height: auto; }
                </style>
            </head>
            <body>
                ${svgElement.outerHTML}
                <script>
                    window.onload = () => {
                        window.print();
                        window.close();
                    };
                </script>
            </body>
            </html>
        `);
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// ========== Prompt Library ==========
class PromptLibrary {
    constructor() {
        this.prompts = {
            'detailed': {
                name: '📝 Detailed Analysis',
                prompt: `Analyze the following content in extreme detail and create a comprehensive mind map with at least 5 levels of hierarchy. Include:
- Main concepts and sub-concepts
- Relationships and dependencies
- Examples and use cases
- Pros and cons
- Implementation details

Content: {{CONTENT}}

Create a detailed Markdown mind map.`
            },
            'simple': {
                name: '✨ Simple & Clean',
                prompt: `Create a simple, clean mind map with 2-3 levels maximum. Focus on:
- Core concepts only
- Clear hierarchy
- Easy to understand

Content: {{CONTENT}}

Create a concise Markdown mind map.`
            },
            'creative': {
                name: '🎨 Creative Brainstorm',
                prompt: `Think creatively about this topic and generate innovative ideas. Include:
- Unconventional perspectives
- Creative connections
- "What if" scenarios
- Future possibilities

Content: {{CONTENT}}

Create an innovative Markdown mind map.`
            },
            'academic': {
                name: '🎓 Academic Research',
                prompt: `Analyze this content from an academic perspective. Include:
- Theoretical frameworks
- Research methodologies
- Literature connections
- Critical analysis
- Future research directions

Content: {{CONTENT}}

Create an academic Markdown mind map.`
            },
            'business': {
                name: '💼 Business Strategy',
                prompt: `Analyze from a business strategy perspective. Include:
- Market analysis
- Competitive advantages
- Revenue opportunities
- Risk assessment
- Implementation roadmap

Content: {{CONTENT}}

Create a business-focused Markdown mind map.`
            },
            'technical': {
                name: '⚙️ Technical Architecture',
                prompt: `Create a technical architecture mind map. Include:
- System components
- Data flows
- Technologies and tools
- Integration points
- Scalability considerations

Content: {{CONTENT}}

Create a technical Markdown mind map.`
            },
            'learning': {
                name: '📚 Learning Path',
                prompt: `Create a learning path mind map. Include:
- Prerequisites
- Core concepts
- Learning sequence
- Practice exercises
- Resources and references

Content: {{CONTENT}}

Create a learning-focused Markdown mind map.`
            },
            'problem-solving': {
                name: '🔧 Problem Solving',
                prompt: `Analyze this problem systematically. Include:
- Problem definition
- Root causes
- Potential solutions
- Pros and cons of each
- Recommended approach

Content: {{CONTENT}}

Create a problem-solving Markdown mind map.`
            }
        };
    }

    getAll() {
        return Object.entries(this.prompts).map(([id, prompt]) => ({
            id,
            ...prompt
        }));
    }

    get(id) {
        return this.prompts[id];
    }
}

// ========== Auto-save Manager ==========
class AutoSaveManager {
    constructor(historyManager) {
        this.historyManager = historyManager;
        this.autoSaveKey = 'ai-markmap-autosave';
        this.autoSaveInterval = 30000; // 30 seconds
        this.timer = null;
    }

    start(getMarkdownFn) {
        this.stop();
        this.timer = setInterval(() => {
            const markdown = getMarkdownFn();
            if (markdown && markdown.trim()) {
                localStorage.setItem(this.autoSaveKey, JSON.stringify({
                    markdown,
                    timestamp: new Date().toISOString()
                }));
            }
        }, this.autoSaveInterval);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    getAutoSaved() {
        try {
            const data = localStorage.getItem(this.autoSaveKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    clearAutoSaved() {
        localStorage.removeItem(this.autoSaveKey);
    }
}

// ========== Initialize Pro Features ==========
window.AiMarkmapPro = {
    history: new HistoryManager(),
    templates: new TemplateManager(),
    themes: new ThemeManager(),
    share: new ShareManager(),
    export: new ExportManager(),
    prompts: new PromptLibrary(),
    autoSave: null, // Will be initialized after DOM ready

    init() {
        console.log('🚀 Ai-Markmap-Pro v2.0.0 loaded');
        
        // Load saved theme
        this.themes.loadSaved();
        
        // Check for shared content
        const shared = this.share.loadFromUrl();
        if (shared) {
            console.log('📥 Loading shared content');
            if (shared.theme) {
                this.themes.apply(shared.theme);
            }
            // Will be handled by main app
            window.sharedMarkdown = shared.markdown;
        }
        
        // Initialize auto-save (will be started by main app)
        this.autoSave = new AutoSaveManager(this.history);
    }
};

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.AiMarkmapPro.init());
} else {
    window.AiMarkmapPro.init();
}
