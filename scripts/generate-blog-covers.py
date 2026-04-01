from pathlib import Path
from html import escape
import re


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / 'content' / 'blog'
OUTPUT_DIR = ROOT / 'public' / 'blog-images'
WIDTH = 1200
HEIGHT = 630
LEFT_X = 170
LEFT_LINE_X = 148
TEXT_WIDTH = 500
TAGS_Y = 468
DESCRIPTION_BOTTOM_LIMIT = 444

THEMES = {
    'ai-reliability': {
        'accent': '#fb7185',
        'accent_two': '#f97316',
        'accent_soft': '#fecdd3',
        'glow': 'rgba(251, 113, 133, 0.28)',
        'badge': 'AI RELIABILITY',
        'panel_start': '#08111f',
        'panel_end': '#0f1d31',
    },
    'mlops': {
        'accent': '#38bdf8',
        'accent_two': '#14b8a6',
        'accent_soft': '#bae6fd',
        'glow': 'rgba(56, 189, 248, 0.24)',
        'badge': 'MLOPS',
        'panel_start': '#071521',
        'panel_end': '#0d2131',
    },
    'model-deployment': {
        'accent': '#f59e0b',
        'accent_two': '#f97316',
        'accent_soft': '#fde68a',
        'glow': 'rgba(245, 158, 11, 0.24)',
        'badge': 'MODEL DEPLOYMENT',
        'panel_start': '#12141e',
        'panel_end': '#221b13',
    },
}

KIND_METADATA = {
    'shield': 'Secure by Design',
    'network': 'Fault-Tolerant Systems',
    'layers': 'Structured AI Data',
    'dashboard': 'Operational Visibility',
    'gpu': 'Efficiency at Scale',
    'pipeline': 'Production-Ready Workflows',
}


def read_frontmatter(file_path: Path):
    text = file_path.read_text(encoding='utf-8')
    match = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not match:
        return {}

    data = {}
    for line in match.group(1).splitlines():
        if not line or line.startswith(' ') or ':' not in line:
            continue

        key, raw = line.split(':', 1)
        key = key.strip()
        raw = raw.strip()

        if raw.startswith('[') and raw.endswith(']'):
            items = [item.strip().strip('"').strip("'") for item in raw[1:-1].split(',') if item.strip()]
            data[key] = items
        elif raw in ('true', 'false'):
            data[key] = raw == 'true'
        else:
            data[key] = raw.strip('"').strip("'")

    return data


def normalize_label(value: str):
    replacements = {
        'ai': 'AI',
        'llm': 'LLM',
        'rag': 'RAG',
        'mlops': 'MLOps',
        'soc2': 'SOC 2',
        'soc-2': 'SOC 2',
        'ci': 'CI',
        'cd': 'CD',
        'gpu': 'GPU',
        'ml': 'ML',
        'api': 'API',
        'sla': 'SLA',
        'slas': 'SLAs',
        'slo': 'SLO',
        'slos': 'SLOs',
        'kubernetes': 'Kubernetes',
        'vllm': 'vLLM',
    }

    words = []
    for part in value.replace('_', '-').split('-'):
        lower = part.lower()
        words.append(replacements.get(lower, part.capitalize()))
    return ' '.join(words)


def char_width(char: str):
    if char in 'iltjfr.,:;|! ':
        return 0.33
    if char in 'MW@#%&QG':
        return 0.86
    if char.isupper():
        return 0.68
    if char.isdigit():
        return 0.60
    return 0.56


def estimate_width(text: str, font_size: int):
    return sum(char_width(char) * font_size for char in text)


def split_word_to_fit(word: str, font_size: int, max_width: int):
    parts = []
    current = ''

    for char in word:
        proposal = current + char
        if current and estimate_width(proposal, font_size) > max_width:
            parts.append(current)
            current = char
        else:
            current = proposal

    if current:
        parts.append(current)

    return parts or [word]


def wrap_text(text: str, font_size: int, max_width: int, max_lines: int, clip: bool = True):
    words = text.split()
    if not words:
        return []

    lines = []
    current = ''

    for word in words:
        if estimate_width(word, font_size) > max_width:
            oversized_parts = split_word_to_fit(word, font_size, max_width)
        else:
            oversized_parts = [word]

        for part in oversized_parts:
            proposal = f'{current} {part}'.strip()
            if estimate_width(proposal, font_size) <= max_width:
                current = proposal
            else:
                if current:
                    lines.append(current)
                    current = part
                else:
                    lines.append(part)
                    current = ''

    if current:
        lines.append(current)

    if len(lines) <= max_lines or not clip:
        return lines

    clipped = lines[:max_lines]
    clipped[-1] = clipped[-1].rstrip(' .,;:') + '…'
    return clipped


def text_block_height(font_size: int, line_count: int, line_height_ratio: float):
    if line_count <= 0:
        return 0
    line_height = int(font_size * line_height_ratio)
    return font_size + (line_count - 1) * line_height


def choose_title_y(line_count: int):
    if line_count <= 2:
        return 230
    if line_count == 3:
        return 222
    if line_count == 4:
        return 210
    return 198


def compute_layout(title: str, description: str):
    description = description.strip()
    title_sizes = (68, 64, 60, 56, 52, 48, 44, 40, 38, 36, 34, 32)
    description_options = [
        (22, 3, True),
        (20, 3, True),
        (18, 3, True),
        (18, 2, True),
        (16, 2, True),
        (0, 0, True),
    ]
    best_layout = None
    best_score = None

    for title_size in title_sizes:
        title_lines = wrap_text(title, title_size, TEXT_WIDTH, 5, clip=False)
        if len(title_lines) > 5:
            continue

        title_y = choose_title_y(len(title_lines))
        title_height = text_block_height(title_size, len(title_lines), 1.06)
        description_y = title_y + title_height + 34

        for description_size, description_max_lines, description_clip in description_options:
            if description_size == 0 or not description:
                description_lines = []
                description_height = 0
            else:
                description_lines = wrap_text(
                    description,
                    description_size,
                    TEXT_WIDTH,
                    description_max_lines,
                    clip=description_clip,
                )
                description_height = text_block_height(description_size, len(description_lines), 1.45)

            if description_y + description_height <= DESCRIPTION_BOTTOM_LIMIT:
                score = title_size * 4
                score -= max(0, len(title_lines) - 3) * 12
                if description_lines:
                    score += 90
                    score += len(description_lines) * 70
                    score += description_size * len(description_lines) * 2
                    if description_clip:
                        score -= 25

                layout = {
                    'title_font_size': title_size,
                    'title_lines': title_lines,
                    'title_y': title_y,
                    'description_font_size': description_size,
                    'description_lines': description_lines,
                    'description_y': description_y,
                }
                if best_score is None or score > best_score:
                    best_score = score
                    best_layout = layout

    if best_layout is not None:
        return best_layout

    fallback_lines = wrap_text(title, 30, TEXT_WIDTH, 6, clip=False)
    return {
        'title_font_size': 30,
        'title_lines': fallback_lines,
        'title_y': 192,
        'description_font_size': 0,
        'description_lines': [],
        'description_y': 0,
    }


def make_seed(text: str):
    seed = 0
    for index, char in enumerate(text):
        seed = (seed * 131 + ord(char) + index * 17) % 1000003
    return seed


def render_title(lines, font_size, title_y):
    line_height = int(font_size * 1.06)
    tspans = []
    for index, line in enumerate(lines):
        dy = 0 if index == 0 else line_height
        tspans.append(f'<tspan x="{LEFT_X}" dy="{dy}">{escape(line)}</tspan>')
    markup = ''.join(tspans)
    text = (
        f'<text x="{LEFT_X}" y="{title_y}" fill="#f8fafc" '
        f'font-size="{font_size}" font-family="Inter, Arial, sans-serif" '
        f'font-weight="820" letter-spacing="-1.4">{markup}</text>'
    )
    return text


def render_description(lines, font_size, start_y):
    if not lines:
        return ''

    line_height = int(font_size * 1.52)
    tspans = []
    for index, line in enumerate(lines):
        dy = 0 if index == 0 else line_height
        tspans.append(f'<tspan x="{LEFT_X}" dy="{dy}">{escape(line)}</tspan>')
    text = (
        f'<text x="{LEFT_X}" y="{start_y}" fill="#cbd5e1" '
        f'font-size="{font_size}" font-family="Inter, Arial, sans-serif" '
        f'font-weight="520">{"".join(tspans)}</text>'
    )
    return text


def render_tags(tags, accent, accent_soft, y):
    selected = [normalize_label(tag) for tag in tags[:3]] or ['AI Infrastructure']
    x = 170
    chips = []

    for label in selected:
        width = max(112, min(176, int(estimate_width(label, 16) + 42)))
        if x + width > 660:
            break
        chips.append(
            f'''
            <g transform="translate({x}, 0)">
              <rect x="0" y="{y}" width="{width}" height="42" rx="21" fill="rgba(10, 17, 31, 0.70)" stroke="rgba(148, 163, 184, 0.18)" />
              <circle cx="22" cy="{y + 21}" r="5" fill="{accent}" />
              <text x="36" y="{y + 27}" fill="#e2e8f0" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="650">{escape(label)}</text>
            </g>
            '''
        )
        x += width + 14

    underline_width = max(132, min(230, int(estimate_width(selected[0], 16) + 88)))
    chips.append(
        f'<rect x="170" y="{y - 12}" width="{underline_width}" height="4" rx="2" fill="{accent}" opacity="0.90" />'
    )
    chips.append(
        f'<rect x="{170 + underline_width + 12}" y="{y - 12}" width="66" height="4" rx="2" fill="{accent_soft}" opacity="0.72" />'
    )
    return ''.join(chips)


def render_brand_logo(x: int, y: int):
    return f'''
    <g transform="translate({x}, {y})">
      <rect width="36" height="36" rx="10" fill="#00D4FF" />
      <rect x="1" y="1" width="34" height="34" rx="9" fill="none" stroke="rgba(255, 255, 255, 0.20)" />
      <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-size="21" font-family="Inter, Arial, sans-serif" font-weight="800">R</text>
    </g>
    '''


def choose_illustration(title: str, tags):
    text = (title + ' ' + ' '.join(tags)).lower()
    if any(keyword in text for keyword in ('security', 'privacy', 'secret', 'audit', 'soc 2', 'soc2', 'compliance', 'auth')):
        return 'shield'
    if any(keyword in text for keyword in ('disaster', 'failover', 'multi-region', 'gateway', 'routing', 'traffic')):
        return 'network'
    if any(keyword in text for keyword in ('rag', 'vector', 'retrieval', 'feature store', 'data', 'embedding')):
        return 'layers'
    if any(keyword in text for keyword in ('observability', 'incident', 'slo', 'eval', 'testing', 'monitoring', 'metrics')):
        return 'dashboard'
    if any(keyword in text for keyword in ('gpu', 'inference', 'capacity', 'cost', 'autoscaling', 'token', 'serving')):
        return 'gpu'
    return 'pipeline'


def render_backdrop(seed: int, accent: str, accent_soft: str, accent_two: str):
    dots = []
    lines = []
    colors = [accent, accent_soft, accent_two]

    for index in range(10):
        x = 56 + ((seed + index * 173) % 1088)
        y = 62 + ((seed * (index + 3) + index * 67) % 506)
        radius = 2 + ((seed + index) % 3)
        color = colors[index % len(colors)]
        opacity = 0.34 + ((seed + index * 11) % 28) / 100
        dots.append(f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{color}" opacity="{opacity:.2f}" />')

    for index in range(3):
        x1 = 72 + ((seed + index * 61) % 220)
        y1 = 92 + ((seed + index * 53) % 180)
        x2 = x1 + 60 + ((seed + index * 23) % 90)
        y2 = y1 + 24 + ((seed + index * 31) % 90)
        x3 = x2 + 70 + ((seed + index * 17) % 90)
        y3 = max(48, y2 - 36 + ((seed + index * 41) % 80))
        lines.append(
            f'<path d="M{x1} {y1} L{x2} {y2} L{x3} {y3}" stroke="rgba(148, 163, 184, 0.10)" stroke-width="2" fill="none" />'
        )

    return ''.join(dots + lines)


def render_visual_panel(kind: str, accent: str, accent_two: str, accent_soft: str):
    header = f'''
      <rect x="706" y="136" width="352" height="326" rx="36" fill="rgba(9, 14, 26, 0.54)" stroke="rgba(148, 163, 184, 0.14)" />
      <rect x="724" y="154" width="316" height="290" rx="28" fill="rgba(10, 17, 31, 0.76)" stroke="rgba(148, 163, 184, 0.08)" />
      <rect x="748" y="176" width="100" height="10" rx="5" fill="{accent}" opacity="0.88" />
      <rect x="860" y="176" width="48" height="10" rx="5" fill="{accent_two}" opacity="0.62" />
      <rect x="920" y="176" width="76" height="10" rx="5" fill="rgba(148, 163, 184, 0.20)" />
      <rect x="742" y="388" width="280" height="34" rx="17" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(148, 163, 184, 0.12)" />
      <text x="766" y="410" fill="#e2e8f0" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="680">{escape(KIND_METADATA[kind])}</text>
    '''

    if kind == 'shield':
        body = f'''
          <rect x="782" y="214" width="200" height="132" rx="28" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(148, 163, 184, 0.12)" />
          <path d="M882 228 L940 248 L940 292 C940 322 919 347 882 364 C845 347 824 322 824 292 L824 248 Z" fill="rgba(7, 12, 24, 0.88)" stroke="{accent}" stroke-width="4" />
          <rect x="868" y="274" width="28" height="46" rx="14" fill="{accent_two}" opacity="0.92" />
          <rect x="854" y="258" width="56" height="34" rx="17" fill="none" stroke="{accent_soft}" stroke-width="4" />
          <path d="M798 254 L842 268" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <path d="M798 314 L840 294" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <path d="M966 254 L922 268" stroke="{accent_two}" stroke-width="4" stroke-linecap="round" />
          <path d="M966 314 L924 294" stroke="{accent_two}" stroke-width="4" stroke-linecap="round" />
        '''
    elif kind == 'network':
        body = f'''
          <circle cx="792" cy="258" r="20" fill="rgba(9, 14, 26, 0.92)" stroke="{accent}" stroke-width="4" />
          <circle cx="932" cy="234" r="20" fill="rgba(9, 14, 26, 0.92)" stroke="{accent_two}" stroke-width="4" />
          <circle cx="888" cy="332" r="20" fill="rgba(9, 14, 26, 0.92)" stroke="{accent}" stroke-width="4" />
          <circle cx="984" cy="292" r="20" fill="rgba(9, 14, 26, 0.92)" stroke="{accent_soft}" stroke-width="4" />
          <path d="M810 254 C840 242, 864 236, 910 238" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M928 254 C914 278, 900 302, 892 312" stroke="{accent_two}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M906 332 C938 324, 958 316, 968 302" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M806 272 C838 294, 856 308, 872 324" stroke="{accent_soft}" stroke-width="5" fill="none" stroke-linecap="round" />
          <rect x="770" y="212" width="248" height="156" rx="28" fill="none" stroke="rgba(148, 163, 184, 0.10)" />
        '''
    elif kind == 'layers':
        body = f'''
          <path d="M786 246 L880 212 L974 246 L880 280 Z" fill="rgba(8, 13, 24, 0.94)" stroke="{accent}" stroke-width="4" />
          <path d="M786 290 L880 256 L974 290 L880 324 Z" fill="rgba(10, 17, 31, 0.86)" stroke="{accent_two}" stroke-width="4" />
          <path d="M786 334 L880 300 L974 334 L880 368 Z" fill="rgba(16, 24, 40, 0.82)" stroke="{accent_soft}" stroke-width="4" />
          <circle cx="954" cy="224" r="26" fill="rgba(9, 14, 26, 0.92)" stroke="{accent}" stroke-width="4" />
          <path d="M968 238 L988 258" stroke="{accent}" stroke-width="5" stroke-linecap="round" />
          <circle cx="882" cy="290" r="7" fill="{accent_two}" />
          <circle cx="848" cy="334" r="7" fill="{accent_soft}" />
        '''
    elif kind == 'dashboard':
        body = f'''
          <rect x="782" y="220" width="90" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="892" y="220" width="116" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="838" y="300" width="136" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <path d="M802 256 C824 228, 836 288, 860 248 C882 212, 908 284, 944 242 C966 216, 984 250, 1000 232" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <circle cx="802" cy="256" r="8" fill="{accent}" />
          <circle cx="860" cy="248" r="8" fill="{accent_two}" />
          <circle cx="944" cy="242" r="8" fill="{accent}" />
          <circle cx="1000" cy="232" r="8" fill="{accent_soft}" />
          <rect x="864" y="318" width="14" height="26" rx="7" fill="{accent}" opacity="0.88" />
          <rect x="888" y="306" width="14" height="38" rx="7" fill="{accent_two}" opacity="0.78" />
          <rect x="912" y="294" width="14" height="50" rx="7" fill="{accent_soft}" opacity="0.78" />
        '''
    elif kind == 'gpu':
        body = f'''
          <rect x="776" y="214" width="168" height="136" rx="28" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="810" y="244" width="60" height="18" rx="9" fill="{accent}" opacity="0.92" />
          <rect x="810" y="286" width="98" height="18" rx="9" fill="{accent_two}" opacity="0.82" />
          <rect x="810" y="328" width="124" height="18" rx="9" fill="{accent_soft}" opacity="0.76" />
          <rect x="958" y="232" width="22" height="118" rx="11" fill="rgba(71, 85, 105, 0.78)" />
          <rect x="990" y="266" width="22" height="84" rx="11" fill="rgba(71, 85, 105, 0.78)" />
          <path d="M946 318 C968 300, 986 284, 1008 248" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M998 248 L1010 250 L1004 262" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <rect x="964" y="202" width="82" height="48" rx="18" fill="rgba(15, 23, 42, 0.82)" stroke="rgba(148, 163, 184, 0.14)" />
          <text x="982" y="234" fill="#f8fafc" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="760">40%</text>
        '''
    else:
        body = f'''
          <rect x="782" y="224" width="86" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="894" y="208" width="100" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="840" y="304" width="110" height="62" rx="18" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.18)" />
          <path d="M866 256 C890 256, 898 242, 916 238" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M946 268 C934 294, 926 308, 912 320" stroke="{accent_two}" stroke-width="5" fill="none" stroke-linecap="round" />
          <circle cx="866" cy="256" r="8" fill="{accent}" />
          <circle cx="916" cy="238" r="8" fill="{accent_two}" />
          <circle cx="912" cy="320" r="8" fill="{accent_soft}" />
          <path d="M786 336 H824" stroke="{accent_soft}" stroke-width="4" stroke-linecap="round" />
          <path d="M970 334 H1008" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
        '''

    return header + body


def build_svg(title: str, description: str, category: str, tags, slug: str):
    theme = THEMES.get(category, THEMES['ai-reliability'])
    layout = compute_layout(title, description)
    title_markup = render_title(
        layout['title_lines'],
        layout['title_font_size'],
        layout['title_y'],
    )
    description_markup = render_description(
        layout['description_lines'],
        layout['description_font_size'],
        layout['description_y'],
    )
    illustration = choose_illustration(title, tags)
    badge_width = max(188, min(292, int(estimate_width(theme['badge'], 15) + 42)))
    seed = make_seed(slug)

    return f'''<svg width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#08101d" />
      <stop offset="0.5" stop-color="#0d2035" />
      <stop offset="1" stop-color="#132b44" />
    </linearGradient>
    <linearGradient id="panel" x1="128" y1="84" x2="1068" y2="548" gradientUnits="userSpaceOnUse">
      <stop stop-color="{theme['panel_start']}" />
      <stop offset="1" stop-color="{theme['panel_end']}" />
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1012 96) rotate(127) scale(512 402)">
      <stop stop-color="{theme['glow']}" />
      <stop offset="1" stop-color="rgba(15, 23, 42, 0)" />
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(132 552) rotate(5) scale(388 258)">
      <stop stop-color="rgba(250, 204, 21, 0.10)" />
      <stop offset="1" stop-color="rgba(15, 23, 42, 0)" />
    </radialGradient>
    <linearGradient id="accentLine" x1="{LEFT_LINE_X}" y1="0" x2="{LEFT_LINE_X + 276}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="{theme['accent']}" />
      <stop offset="1" stop-color="{theme['accent_two']}" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glowA)" />
  <rect width="1200" height="630" fill="url(#glowB)" />

  <g opacity="0.11" stroke="#94a3b8" stroke-width="1">
    <path d="M0 48 H1200" /><path d="M0 108 H1200" /><path d="M0 168 H1200" /><path d="M0 228 H1200" />
    <path d="M0 288 H1200" /><path d="M0 348 H1200" /><path d="M0 408 H1200" /><path d="M0 468 H1200" /><path d="M0 528 H1200" />
    <path d="M52 0 V630" /><path d="M112 0 V630" /><path d="M172 0 V630" /><path d="M232 0 V630" /><path d="M292 0 V630" />
    <path d="M352 0 V630" /><path d="M412 0 V630" /><path d="M472 0 V630" /><path d="M532 0 V630" /><path d="M592 0 V630" />
    <path d="M652 0 V630" /><path d="M712 0 V630" /><path d="M772 0 V630" /><path d="M832 0 V630" /><path d="M892 0 V630" />
    <path d="M952 0 V630" /><path d="M1012 0 V630" /><path d="M1072 0 V630" /><path d="M1132 0 V630" />
  </g>

  {render_backdrop(seed, theme['accent'], theme['accent_soft'], theme['accent_two'])}

  <rect x="128" y="84" width="940" height="464" rx="40" fill="url(#panel)" stroke="rgba(148, 163, 184, 0.12)" />
  <rect x="146" y="102" width="904" height="428" rx="32" fill="none" stroke="rgba(148, 163, 184, 0.08)" />
  <rect x="{LEFT_LINE_X}" y="118" width="4" height="396" rx="2" fill="url(#accentLine)" opacity="0.88" />

  <rect x="170" y="140" width="{badge_width}" height="40" rx="20" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(148, 163, 184, 0.14)" />
  <text x="192" y="166" fill="#e2e8f0" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="760" letter-spacing="1.5">{escape(theme['badge'])}</text>

  {title_markup}
  {description_markup}
  {render_tags(tags, theme['accent'], theme['accent_soft'], TAGS_Y)}
  {render_visual_panel(illustration, theme['accent'], theme['accent_two'], theme['accent_soft'])}

  <text x="976" y="512" text-anchor="end" fill="rgba(226, 232, 240, 0.72)" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="730" letter-spacing="1.8">RESILIOTECH</text>
  <text x="976" y="532" text-anchor="end" fill="rgba(148, 163, 184, 0.66)" font-size="13" font-family="Inter, Arial, sans-serif" font-weight="500">AI Infrastructure • Reliability • MLOps</text>
  {render_brand_logo(992, 496)}
</svg>
'''


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for file_path in sorted(CONTENT_DIR.glob('*.mdx')):
        data = read_frontmatter(file_path)
        slug = file_path.stem
        title = data.get('title', normalize_label(slug))
        description = data.get('description', 'Practical guidance for production AI systems, infrastructure, and reliability engineering.')
        category = data.get('category', 'ai-reliability')
        tags = data.get('tags', [])

        svg = build_svg(title, description, category, tags, slug)
        (OUTPUT_DIR / f'{slug}.svg').write_text(svg, encoding='utf-8')
        print(f'generated public/blog-images/{slug}.svg')


if __name__ == '__main__':
    main()
