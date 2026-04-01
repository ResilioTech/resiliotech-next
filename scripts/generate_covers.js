const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const matter = require('gray-matter');

const BACKGROUNDS = [
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/ai_audit_logs_1775038269839.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/batching_strategies_1775038385339.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/feature_store_1775038334392.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/gpu_autoscaling_1775038401835.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/gpu_cost_cover_1775037844567.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/kubernetes_mlops_cover_1775037859397.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/load_testing_llm_1775038351117.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/ml_failure_cover_1775037872351.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/model_canary_1775038302708.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/multi_model_serving_1775038367848.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/rag_systems_1775038419973.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/securing_ai_endpoints_1775038316728.png",
    "/Users/shivam/.gemini/antigravity/brain/bf3395ed-fd66-4872-95a9-7f86a992701d/serving_vllm_1775038288366.png"
];

function getTemplate(bgPath, title, subtitle, category) {
    return `
    <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                body {
                    margin: 0;
                    padding: 0;
                    width: 1200px;
                    height: 630px;
                    font-family: 'Inter', sans-serif;
                    background-image: linear-gradient(to right, rgba(10, 15, 30, 0.95), rgba(10, 15, 30, 0.7)), url('file://${bgPath}');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 80px;
                    padding-right: 80px;
                    box-sizing: border-box;
                }
                .branding {
                    color: #00F0FF;
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }
                .title {
                    font-size: 80px;
                    font-weight: 900;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    text-shadow: 0px 4px 20px rgba(0,0,0,0.5);
                    background: -webkit-linear-gradient(135deg, #fff, #b4dfff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .subtitle {
                    font-size: 32px;
                    font-weight: 400;
                    color: #A0B0D0;
                    max-width: 900px;
                    line-height: 1.4;
                    margin-bottom: 40px;
                }
                .tags {
                    display: flex;
                    gap: 16px;
                }
                .tag {
                    background: rgba(0, 240, 255, 0.15);
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    padding: 8px 24px;
                    border-radius: 40px;
                    color: #00F0FF;
                    font-weight: 700;
                    font-size: 20px;
                    text-transform: uppercase;
                }
            </style>
        </head>
        <body>
            <div class="branding">RESILIOTECH BLOG</div>
            <div class="title">${title}</div>
            ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
            ${category ? `<div class="tags"><div class="tag">${category}</div></div>` : ''}
        </body>
    </html>
    `;
}

async function run() {
    const directories = [
        path.join(__dirname, '../content/blog'),
        path.join(__dirname, '../src/content/blog')
    ];

    const outDir = path.join(__dirname, '../public/blog-images');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    let bgIndex = 0;

    for (const dir of directories) {
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

        for (const file of files) {
            const filePath = path.join(dir, file);
            const contentRaw = fs.readFileSync(filePath, 'utf8');
            const data = matter(contentRaw).data;

            if (!data.title) continue;

            const bgPath = BACKGROUNDS[bgIndex % BACKGROUNDS.length];
            bgIndex++;

            const slug = file.replace(/\.mdx?$/, '');
            const outputPath = path.join(outDir, \`\${slug}.png\`);

            // Generate image
            console.log(\`Rendering cover for \${slug}...\`);
            let subtitle = data.description || '';
            // Trim description if too long
            if (subtitle.length > 150) {
                subtitle = subtitle.slice(0, 147) + '...';
            }
            
            const html = getTemplate(bgPath, data.title, subtitle, data.category || 'Engineering');
            
            await page.setContent(html, { waitUntil: 'networkidle0' });
            await page.screenshot({ path: outputPath, type: 'png' });

            // Update MDX frontmatter: replace generic svg or png references specifically for coverImage
            const newContent = contentRaw.replace(/coverImage:\s*["'].*?["']/, \`coverImage: "/blog-images/\${slug}.png"\`);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(\`Updated \${filePath}\`);
        }
    }

    await browser.close();
    console.log("Done!");
}

run().catch(console.error);
