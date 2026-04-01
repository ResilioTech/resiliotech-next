from pathlib import Path
from html import escape
import re


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / 'content' / 'blog'
OUTPUT_DIR = ROOT / 'public' / 'blog-images'
WIDTH = 1200
HEIGHT = 630
PANEL_X = 96
PANEL_Y = 56
PANEL_WIDTH = 1008
PANEL_HEIGHT = 518
INNER_PANEL_X = 114
INNER_PANEL_Y = 74
INNER_PANEL_WIDTH = 972
INNER_PANEL_HEIGHT = 482
LEFT_X = 168
LEFT_LINE_X = 140
LEFT_LINE_Y = 92
LEFT_LINE_HEIGHT = 446
TEXT_WIDTH = 500
TAGS_Y = 476
TITLE_BOTTOM_LIMIT = 440
VISUAL_PANEL_X = 706
VISUAL_PANEL_Y = 136
VISUAL_SCALE = 1.12

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
    'audit': 'Compliance Controls',
    'network': 'Fault-Tolerant Systems',
    'layers': 'Structured AI Data',
    'vector': 'Similarity Search',
    'observability': 'Live Telemetry',
    'slo': 'Error Budget Tracking',
    'eval': 'Regression Scoring',
    'loadtest': 'Latency Under Load',
    'dashboard': 'Operational Visibility',
    'runbook': 'Incident Response',
    'gpu': 'Efficiency at Scale',
    'token': 'Inference Cost Flow',
    'experiment': 'Controlled Experiments',
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
        return 244
    if line_count == 3:
        return 234
    if line_count == 4:
        return 222
    return 208


def compute_layout(title: str):
    title_sizes = (76, 72, 68, 64, 60, 56, 52, 48, 44, 42, 40, 38, 36)
    best_layout = None
    best_score = None

    for title_size in title_sizes:
        title_lines = wrap_text(title, title_size, TEXT_WIDTH, 5, clip=False)
        if len(title_lines) > 5:
            continue

        title_y = choose_title_y(len(title_lines))
        title_height = text_block_height(title_size, len(title_lines), 1.06)
        if title_y + title_height <= TITLE_BOTTOM_LIMIT:
            score = title_size * 5
            score -= max(0, len(title_lines) - 3) * 16

            layout = {
                'title_font_size': title_size,
                'title_lines': title_lines,
                'title_y': title_y,
            }
            if best_score is None or score > best_score:
                best_score = score
                best_layout = layout

    if best_layout is not None:
        return best_layout

    fallback_lines = wrap_text(title, 30, TEXT_WIDTH, 6, clip=False)
    return {
        'title_font_size': 34,
        'title_lines': fallback_lines,
        'title_y': 212,
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
    x = LEFT_X
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
        f'<rect x="{LEFT_X}" y="{y - 12}" width="{underline_width}" height="4" rx="2" fill="{accent}" opacity="0.90" />'
    )
    chips.append(
        f'<rect x="{LEFT_X + underline_width + 12}" y="{y - 12}" width="66" height="4" rx="2" fill="{accent_soft}" opacity="0.72" />'
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


def choose_visual_context(title: str, tags):
    text = (title + ' ' + ' '.join(tags)).lower()

    if any(keyword in text for keyword in ('canary', 'shadow traffic', 'shadow-traffic', 'ab testing', 'ab-testing', 'experiment')):
        return 'experiment', 'Canary Traffic Split'
    if any(keyword in text for keyword in ('incident', 'runbook', 'response')):
        return 'runbook', 'Runbook Automation'
    if any(keyword in text for keyword in ('audit', 'audit logs', 'regulator', 'soc 2', 'soc2', 'compliance')):
        return 'audit', 'Evidence Trails'
    if any(keyword in text for keyword in ('vector', 'embedding', 'similarity', 'database')):
        return 'vector', 'Similarity Search'
    if any(keyword in text for keyword in ('slo', 'slos', 'sla', 'slas', 'error budget', 'burn rate', 'burn-rate')):
        return 'slo', 'Error Budget Tracking'
    if any(keyword in text for keyword in ('eval', 'evaluation', 'regression', 'regressions')):
        return 'eval', 'Regression Scoring'
    if any(keyword in text for keyword in ('load testing', 'load-testing', 'latency', 'throughput test', 'stress test')):
        return 'loadtest', 'Latency Under Load'
    if any(keyword in text for keyword in ('observability', 'dashboard', 'dashboards', 'metrics', 'telemetry', 'traces')):
        return 'observability', 'Live Telemetry'
    if any(keyword in text for keyword in ('disaster', 'failover', 'multi-region', 'gateway', 'routing', 'traffic')):
        return 'network', 'Traffic Routing'
    if any(keyword in text for keyword in ('rag', 'retrieval', 'feature store', 'data', 'pii')):
        return 'layers', 'Retrieval Pipeline'
    if any(keyword in text for keyword in ('security', 'privacy', 'secret', 'auth', 'abuse', 'private ai')):
        return 'shield', 'Secure by Design'
    if any(keyword in text for keyword in ('autoscaling', 'capacity')):
        return 'gpu', 'Capacity at Scale'
    if any(keyword in text for keyword in ('batching', 'throughput', 'latency')):
        return 'gpu', 'Throughput Tuning'
    if any(keyword in text for keyword in ('token', 'economics', 'spend', 'cost control', 'cost-controls', 'inference spend')):
        return 'token', 'Inference Cost Flow'
    if any(keyword in text for keyword in ('rollback', 'versioning', 'terraform', 'mlops', 'ci/cd', 'ci-cd', 'platform')):
        return 'pipeline', 'Platform Workflows'
    if any(keyword in text for keyword in ('testing', 'monitoring')):
        return 'dashboard', 'Operational Signals'
    if any(keyword in text for keyword in ('serving', 'inference', 'gpu', 'vllm', 'multi-model', 'spot instances')):
        return 'gpu', 'Serving Efficiency'
    if any(keyword in text for keyword in ('pipeline', 'kubernetes')):
        return 'pipeline', 'Platform Workflows'

    return 'pipeline', KIND_METADATA['pipeline']


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


def render_visual_panel(kind: str, label: str, accent: str, accent_two: str, accent_soft: str):
    panel_markup = f'''
      <rect x="706" y="136" width="352" height="326" rx="36" fill="rgba(9, 14, 26, 0.54)" stroke="rgba(148, 163, 184, 0.14)" />
      <rect x="724" y="154" width="316" height="290" rx="28" fill="rgba(10, 17, 31, 0.76)" stroke="rgba(148, 163, 184, 0.08)" />
      <rect x="748" y="176" width="100" height="10" rx="5" fill="{accent}" opacity="0.88" />
      <rect x="860" y="176" width="48" height="10" rx="5" fill="{accent_two}" opacity="0.62" />
      <rect x="920" y="176" width="76" height="10" rx="5" fill="rgba(148, 163, 184, 0.20)" />
      <rect x="742" y="388" width="280" height="34" rx="17" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(148, 163, 184, 0.12)" />
      <text x="766" y="410" fill="#e2e8f0" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="680">{escape(label)}</text>
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
    elif kind == 'audit':
        body = f'''
          <rect x="776" y="214" width="112" height="146" rx="22" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.18)" />
          <rect x="914" y="226" width="108" height="132" rx="22" fill="rgba(9, 14, 26, 0.84)" stroke="rgba(148, 163, 184, 0.16)" />
          <rect x="800" y="238" width="64" height="10" rx="5" fill="{accent}" opacity="0.90" />
          <rect x="800" y="262" width="52" height="8" rx="4" fill="rgba(148, 163, 184, 0.30)" />
          <rect x="800" y="282" width="68" height="8" rx="4" fill="rgba(148, 163, 184, 0.24)" />
          <rect x="800" y="302" width="58" height="8" rx="4" fill="rgba(148, 163, 184, 0.20)" />
          <circle cx="934" cy="254" r="9" fill="rgba(15, 23, 42, 0.90)" stroke="{accent_two}" stroke-width="3" />
          <path d="M930 254 L933 257 L939 250" stroke="{accent_two}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="934" cy="286" r="9" fill="rgba(15, 23, 42, 0.90)" stroke="{accent}" stroke-width="3" />
          <path d="M930 286 L933 289 L939 282" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="934" cy="318" r="9" fill="rgba(15, 23, 42, 0.90)" stroke="{accent_soft}" stroke-width="3" />
          <rect x="950" y="249" width="48" height="8" rx="4" fill="rgba(148, 163, 184, 0.26)" />
          <rect x="950" y="281" width="42" height="8" rx="4" fill="rgba(148, 163, 184, 0.24)" />
          <rect x="950" y="313" width="38" height="8" rx="4" fill="rgba(148, 163, 184, 0.22)" />
          <path d="M888 292 H914" stroke="{accent_two}" stroke-width="4" stroke-linecap="round" />
          <circle cx="898" cy="340" r="12" fill="rgba(15, 23, 42, 0.92)" stroke="{accent}" stroke-width="3" />
          <circle cx="944" cy="340" r="12" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_two}" stroke-width="3" />
          <circle cx="990" cy="340" r="12" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_soft}" stroke-width="3" />
          <path d="M910 340 H932" stroke="rgba(148, 163, 184, 0.24)" stroke-width="3" stroke-linecap="round" />
          <path d="M956 340 H978" stroke="rgba(148, 163, 184, 0.24)" stroke-width="3" stroke-linecap="round" />
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
    elif kind == 'vector':
        body = f'''
          <circle cx="886" cy="290" r="78" fill="rgba(9, 14, 26, 0.84)" stroke="rgba(148, 163, 184, 0.14)" />
          <circle cx="836" cy="254" r="8" fill="{accent}" />
          <circle cx="868" cy="318" r="8" fill="{accent_two}" />
          <circle cx="914" cy="274" r="8" fill="{accent_soft}" />
          <circle cx="948" cy="326" r="8" fill="{accent}" opacity="0.92" />
          <circle cx="906" cy="338" r="8" fill="{accent_two}" opacity="0.92" />
          <circle cx="966" cy="254" r="10" fill="rgba(15, 23, 42, 0.95)" stroke="{accent}" stroke-width="4" />
          <path d="M966 254 L914 274" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <path d="M966 254 L948 326" stroke="{accent_two}" stroke-width="4" stroke-linecap="round" opacity="0.88" />
          <path d="M966 254 L906 338" stroke="{accent_soft}" stroke-width="4" stroke-linecap="round" opacity="0.82" />
          <path d="M820 290 H952" stroke="rgba(148, 163, 184, 0.12)" stroke-width="2" stroke-dasharray="8 8" />
          <path d="M886 224 V356" stroke="rgba(148, 163, 184, 0.12)" stroke-width="2" stroke-dasharray="8 8" />
          <rect x="972" y="214" width="52" height="32" rx="16" fill="rgba(15, 23, 42, 0.90)" stroke="rgba(148, 163, 184, 0.12)" />
          <text x="998" y="235" text-anchor="middle" fill="#f8fafc" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="700">Q</text>
        '''
    elif kind == 'observability':
        body = f'''
          <rect x="774" y="208" width="254" height="162" rx="26" fill="rgba(9, 14, 26, 0.92)" stroke="rgba(148, 163, 184, 0.16)" />
          <rect x="792" y="226" width="74" height="14" rx="7" fill="{accent}" opacity="0.90" />
          <rect x="878" y="226" width="42" height="14" rx="7" fill="{accent_two}" opacity="0.70" />
          <rect x="932" y="226" width="58" height="14" rx="7" fill="rgba(148, 163, 184, 0.20)" />
          <rect x="792" y="254" width="108" height="78" rx="18" fill="rgba(15, 23, 42, 0.78)" stroke="rgba(148, 163, 184, 0.12)" />
          <path d="M804 312 C818 288, 828 302, 842 274 C852 254, 864 286, 884 266" stroke="{accent}" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M804 300 C816 294, 828 304, 840 294 C852 284, 866 286, 884 280" stroke="{accent_soft}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.84" />
          <circle cx="842" cy="274" r="6" fill="{accent}" />
          <circle cx="884" cy="266" r="6" fill="{accent_soft}" />
          <rect x="914" y="254" width="96" height="78" rx="18" fill="rgba(15, 23, 42, 0.78)" stroke="rgba(148, 163, 184, 0.12)" />
          <circle cx="962" cy="293" r="28" fill="none" stroke="rgba(148, 163, 184, 0.14)" stroke-width="8" />
          <path d="M962 265 A28 28 0 1 1 939 308" stroke="{accent_two}" stroke-width="8" fill="none" stroke-linecap="round" />
          <text x="962" y="299" text-anchor="middle" fill="#f8fafc" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="760">99%</text>
          <rect x="792" y="344" width="218" height="14" rx="7" fill="rgba(148, 163, 184, 0.12)" />
          <rect x="792" y="344" width="166" height="14" rx="7" fill="{accent}" opacity="0.88" />
          <rect x="792" y="366" width="66" height="8" rx="4" fill="rgba(148, 163, 184, 0.22)" />
          <rect x="868" y="366" width="52" height="8" rx="4" fill="rgba(148, 163, 184, 0.18)" />
          <rect x="930" y="366" width="80" height="8" rx="4" fill="rgba(148, 163, 184, 0.14)" />
        '''
    elif kind == 'slo':
        body = f'''
          <rect x="780" y="214" width="116" height="144" rx="24" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <circle cx="838" cy="274" r="34" fill="none" stroke="rgba(148, 163, 184, 0.14)" stroke-width="10" />
          <path d="M838 240 A34 34 0 1 1 812 322" stroke="{accent}" stroke-width="10" fill="none" stroke-linecap="round" />
          <text x="838" y="280" text-anchor="middle" fill="#f8fafc" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="780">72%</text>
          <text x="838" y="304" text-anchor="middle" fill="{accent_soft}" font-size="12" font-family="Inter, Arial, sans-serif" font-weight="650">budget left</text>
          <rect x="916" y="214" width="110" height="58" rx="20" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <text x="971" y="238" text-anchor="middle" fill="#f8fafc" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="720">Burn Rate</text>
          <text x="971" y="260" text-anchor="middle" fill="{accent_two}" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="800">1.3×</text>
          <rect x="916" y="286" width="110" height="72" rx="20" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <path d="M930 338 C946 334, 958 314, 972 304 C986 294, 996 298, 1012 282" stroke="{accent}" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M930 326 H1012" stroke="rgba(148, 163, 184, 0.10)" stroke-width="2" />
          <path d="M930 314 H1012" stroke="rgba(148, 163, 184, 0.10)" stroke-width="2" />
          <circle cx="972" cy="304" r="6" fill="{accent_two}" />
        '''
    elif kind == 'eval':
        body = f'''
          <rect x="776" y="214" width="112" height="144" rx="24" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <text x="832" y="238" text-anchor="middle" fill="#f8fafc" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="720">Baseline</text>
          <rect x="796" y="254" width="72" height="12" rx="6" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="796" y="254" width="60" height="12" rx="6" fill="{accent}" opacity="0.90" />
          <rect x="796" y="280" width="72" height="12" rx="6" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="796" y="280" width="48" height="12" rx="6" fill="{accent_two}" opacity="0.84" />
          <rect x="796" y="306" width="72" height="12" rx="6" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="796" y="306" width="66" height="12" rx="6" fill="{accent_soft}" opacity="0.80" />
          <rect x="914" y="214" width="112" height="144" rx="24" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <text x="970" y="238" text-anchor="middle" fill="#f8fafc" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="720">Candidate</text>
          <circle cx="938" cy="272" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent}" stroke-width="3" />
          <path d="M934 272 L937 275 L943 268" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="954" y="268" width="44" height="8" rx="4" fill="rgba(148, 163, 184, 0.24)" />
          <circle cx="938" cy="300" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_two}" stroke-width="3" />
          <path d="M934 296 L942 304 M942 296 L934 304" stroke="{accent_two}" stroke-width="3" stroke-linecap="round" />
          <rect x="954" y="296" width="38" height="8" rx="4" fill="rgba(148, 163, 184, 0.20)" />
          <circle cx="938" cy="328" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_soft}" stroke-width="3" />
          <path d="M934 328 L937 331 L943 324" stroke="{accent_soft}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="954" y="324" width="52" height="8" rx="4" fill="rgba(148, 163, 184, 0.18)" />
        '''
    elif kind == 'loadtest':
        body = f'''
          <rect x="776" y="214" width="250" height="148" rx="26" fill="rgba(9, 14, 26, 0.90)" stroke="rgba(148, 163, 184, 0.16)" />
          <path d="M796 338 C818 314, 836 260, 858 246 C880 232, 900 278, 924 286 C944 292, 962 252, 988 226" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M796 328 C822 320, 846 300, 864 296 C884 292, 902 298, 922 306 C946 316, 966 318, 988 302" stroke="{accent_two}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.85" />
          <path d="M796 350 H1006" stroke="rgba(148, 163, 184, 0.12)" stroke-width="2" />
          <path d="M796 308 H1006" stroke="rgba(148, 163, 184, 0.08)" stroke-width="2" />
          <rect x="798" y="226" width="60" height="14" rx="7" fill="{accent_soft}" opacity="0.22" />
          <rect x="938" y="226" width="70" height="18" rx="9" fill="rgba(15, 23, 42, 0.94)" stroke="{accent_two}" stroke-width="3" />
          <text x="973" y="239" text-anchor="middle" fill="#f8fafc" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="720">p95 420ms</text>
          <circle cx="924" cy="286" r="7" fill="{accent_two}" />
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
    elif kind == 'runbook':
        body = f'''
          <rect x="776" y="216" width="92" height="70" rx="18" fill="rgba(9, 14, 26, 0.92)" stroke="rgba(148, 163, 184, 0.18)" />
          <path d="M822 232 L844 272 H800 Z" fill="rgba(127, 29, 29, 0.32)" stroke="{accent}" stroke-width="4" stroke-linejoin="round" />
          <path d="M822 244 V256" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <circle cx="822" cy="264" r="3" fill="{accent}" />
          <rect x="896" y="208" width="126" height="150" rx="24" fill="rgba(9, 14, 26, 0.88)" stroke="rgba(148, 163, 184, 0.16)" />
          <rect x="922" y="234" width="56" height="10" rx="5" fill="{accent_two}" opacity="0.90" />
          <circle cx="922" cy="270" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent}" stroke-width="3" />
          <path d="M918 270 L921 273 L927 266" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="938" y="266" width="52" height="8" rx="4" fill="rgba(148, 163, 184, 0.26)" />
          <circle cx="922" cy="296" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_two}" stroke-width="3" />
          <path d="M918 296 L921 299 L927 292" stroke="{accent_two}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="938" y="292" width="44" height="8" rx="4" fill="rgba(148, 163, 184, 0.24)" />
          <circle cx="922" cy="322" r="8" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_soft}" stroke-width="3" />
          <rect x="938" y="318" width="48" height="8" rx="4" fill="rgba(148, 163, 184, 0.22)" />
          <path d="M868 252 C882 252, 892 252, 904 252" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <path d="M836 322 C872 318, 888 310, 904 294" stroke="{accent_two}" stroke-width="4" stroke-linecap="round" />
          <circle cx="878" cy="324" r="14" fill="rgba(15, 23, 42, 0.92)" stroke="{accent_soft}" stroke-width="3" />
          <path d="M872 324 H884" stroke="{accent_soft}" stroke-width="3" stroke-linecap="round" />
          <path d="M878 318 V330" stroke="{accent_soft}" stroke-width="3" stroke-linecap="round" />
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
    elif kind == 'token':
        body = f'''
          <circle cx="832" cy="300" r="42" fill="rgba(15, 23, 42, 0.92)" stroke="{accent}" stroke-width="4" />
          <circle cx="832" cy="300" r="24" fill="rgba(9, 14, 26, 0.84)" stroke="rgba(148, 163, 184, 0.14)" />
          <path d="M820 300 H844" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <path d="M832 288 V312" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <rect x="904" y="220" width="102" height="18" rx="9" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="904" y="220" width="56" height="18" rx="9" fill="{accent}" opacity="0.90" />
          <rect x="904" y="254" width="128" height="18" rx="9" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="904" y="254" width="84" height="18" rx="9" fill="{accent_two}" opacity="0.84" />
          <rect x="904" y="288" width="144" height="18" rx="9" fill="rgba(148, 163, 184, 0.16)" />
          <rect x="904" y="288" width="112" height="18" rx="9" fill="{accent_soft}" opacity="0.80" />
          <path d="M892 334 C922 318, 950 300, 982 248" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M970 248 L982 248 L978 260" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <rect x="928" y="334" width="108" height="34" rx="17" fill="rgba(15, 23, 42, 0.84)" stroke="rgba(148, 163, 184, 0.12)" />
          <text x="982" y="357" text-anchor="middle" fill="#f8fafc" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="760">$ / 1M</text>
        '''
    elif kind == 'experiment':
        body = f'''
          <rect x="780" y="242" width="76" height="46" rx="18" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.14)" />
          <text x="818" y="271" text-anchor="middle" fill="#f8fafc" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="760">100%</text>
          <rect x="902" y="214" width="106" height="60" rx="22" fill="rgba(9, 14, 26, 0.90)" stroke="{accent}" stroke-width="3" />
          <text x="955" y="242" text-anchor="middle" fill="#f8fafc" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="760">CANARY</text>
          <text x="955" y="262" text-anchor="middle" fill="{accent_soft}" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="800">10%</text>
          <rect x="902" y="300" width="106" height="60" rx="22" fill="rgba(9, 14, 26, 0.90)" stroke="{accent_two}" stroke-width="3" />
          <text x="955" y="328" text-anchor="middle" fill="#f8fafc" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="760">STABLE</text>
          <text x="955" y="348" text-anchor="middle" fill="{accent_soft}" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="800">90%</text>
          <path d="M856 264 C878 264, 888 252, 902 244" stroke="{accent}" stroke-width="5" fill="none" stroke-linecap="round" />
          <path d="M856 266 C878 278, 890 294, 902 320" stroke="{accent_two}" stroke-width="5" fill="none" stroke-linecap="round" />
          <circle cx="874" cy="258" r="8" fill="{accent}" />
          <circle cx="874" cy="284" r="8" fill="{accent_two}" />
          <rect x="790" y="324" width="72" height="18" rx="9" fill="rgba(148, 163, 184, 0.18)" />
          <rect x="790" y="324" width="18" height="18" rx="9" fill="{accent}" opacity="0.92" />
          <rect x="790" y="350" width="72" height="18" rx="9" fill="rgba(148, 163, 184, 0.18)" />
          <rect x="790" y="350" width="54" height="18" rx="9" fill="{accent_two}" opacity="0.82" />
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

    panel_markup += body
    return (
        f'<g transform="translate({VISUAL_PANEL_X} {VISUAL_PANEL_Y}) '
        f'scale({VISUAL_SCALE}) translate(-{VISUAL_PANEL_X} -{VISUAL_PANEL_Y})">'
        f'{panel_markup}'
        f'</g>'
    )


def build_svg(title: str, description: str, category: str, tags, slug: str):
    theme = THEMES.get(category, THEMES['ai-reliability'])
    layout = compute_layout(title)
    title_markup = render_title(
        layout['title_lines'],
        layout['title_font_size'],
        layout['title_y'],
    )
    illustration, illustration_label = choose_visual_context(title, tags)
    badge_width = max(188, min(292, int(estimate_width(theme['badge'], 15) + 42)))
    seed = make_seed(slug)

    return f'''<svg width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#08101d" />
      <stop offset="0.5" stop-color="#0d2035" />
      <stop offset="1" stop-color="#132b44" />
    </linearGradient>
    <linearGradient id="panel" x1="{PANEL_X}" y1="{PANEL_Y}" x2="{PANEL_X + PANEL_WIDTH}" y2="{PANEL_Y + PANEL_HEIGHT}" gradientUnits="userSpaceOnUse">
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

  <rect x="{PANEL_X}" y="{PANEL_Y}" width="{PANEL_WIDTH}" height="{PANEL_HEIGHT}" rx="44" fill="url(#panel)" stroke="rgba(148, 163, 184, 0.12)" />
  <rect x="{INNER_PANEL_X}" y="{INNER_PANEL_Y}" width="{INNER_PANEL_WIDTH}" height="{INNER_PANEL_HEIGHT}" rx="36" fill="none" stroke="rgba(148, 163, 184, 0.08)" />
  <rect x="{LEFT_LINE_X}" y="{LEFT_LINE_Y}" width="4" height="{LEFT_LINE_HEIGHT}" rx="2" fill="url(#accentLine)" opacity="0.88" />

  <rect x="{LEFT_X}" y="128" width="{badge_width}" height="42" rx="21" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(148, 163, 184, 0.14)" />
  <text x="{LEFT_X + 22}" y="155" fill="#e2e8f0" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="760" letter-spacing="1.5">{escape(theme['badge'])}</text>

  {title_markup}
  {render_tags(tags, theme['accent'], theme['accent_soft'], TAGS_Y)}
  {render_visual_panel(illustration, illustration_label, theme['accent'], theme['accent_two'], theme['accent_soft'])}

  <text x="1002" y="522" text-anchor="end" fill="rgba(226, 232, 240, 0.72)" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="730" letter-spacing="1.8">RESILIOTECH</text>
  <text x="1002" y="542" text-anchor="end" fill="rgba(148, 163, 184, 0.66)" font-size="13" font-family="Inter, Arial, sans-serif" font-weight="500">AI Infrastructure • Reliability • MLOps</text>
  {render_brand_logo(1018, 506)}
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
