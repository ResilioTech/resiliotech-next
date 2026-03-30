import AppKit
import Foundation

let canvasWidth: CGFloat = 1200
let canvasHeight: CGFloat = 630

struct CoverSpec {
    let filename: String
    let label: String
    let title: String
    let subtitle: String
    let palette: [NSColor]
    let accent: NSColor
    let secondaryAccent: NSColor
    let chipText: [String]
    let artwork: () -> Void
}

func color(hex: Int, alpha: CGFloat = 1.0) -> NSColor {
    NSColor(
        calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
        green: CGFloat((hex >> 8) & 0xff) / 255,
        blue: CGFloat(hex & 0xff) / 255,
        alpha: alpha
    )
}

func topRect(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> NSRect {
    NSRect(x: x, y: canvasHeight - y - height, width: width, height: height)
}

func topPoint(_ x: CGFloat, _ y: CGFloat) -> NSPoint {
    NSPoint(x: x, y: canvasHeight - y)
}

func avenir(_ size: CGFloat, _ name: String) -> NSFont {
    NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: .semibold)
}

func drawGradient(in rect: NSRect, colors: [NSColor], angle: CGFloat) {
    NSGradient(colors: colors)?.draw(in: rect, angle: angle)
}

func drawGrid(spacing: CGFloat = 48, alpha: CGFloat = 0.06) {
    let path = NSBezierPath()
    for x in stride(from: CGFloat(0), through: canvasWidth, by: spacing) {
        path.move(to: topPoint(x, 0))
        path.line(to: topPoint(x, canvasHeight))
    }
    for y in stride(from: CGFloat(0), through: canvasHeight, by: spacing) {
        path.move(to: topPoint(0, y))
        path.line(to: topPoint(canvasWidth, y))
    }
    color(hex: 0xffffff, alpha: alpha).setStroke()
    path.lineWidth = 1
    path.stroke()
}

func drawGlow(x: CGFloat, y: CGFloat, radius: CGFloat, color glowColor: NSColor, alpha: CGFloat) {
    let rect = topRect(x - radius, y - radius, radius * 2, radius * 2)
    let colors = [
        glowColor.withAlphaComponent(alpha),
        glowColor.withAlphaComponent(alpha * 0.3),
        glowColor.withAlphaComponent(0)
    ]
    NSGradient(colors: colors)?.draw(in: rect, relativeCenterPosition: .zero)
}

func fillRoundedRect(_ rect: NSRect, radius: CGFloat, fill: NSColor, stroke: NSColor? = nil, lineWidth: CGFloat = 1) {
    let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
    fill.setFill()
    path.fill()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
}

func drawText(
    _ text: String,
    rect: NSRect,
    font: NSFont,
    color textColor: NSColor,
    alignment: NSTextAlignment = .left,
    lineHeight: CGFloat = 1.12,
    kern: CGFloat = 0
) {
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = alignment
    paragraph.lineBreakMode = .byWordWrapping
    paragraph.minimumLineHeight = font.pointSize * lineHeight
    paragraph.maximumLineHeight = font.pointSize * lineHeight

    let attrs: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: textColor,
        .paragraphStyle: paragraph,
        .kern: kern
    ]

    NSString(string: text).draw(
        with: rect,
        options: [.usesLineFragmentOrigin, .usesFontLeading],
        attributes: attrs
    )
}

func drawBadge(text: String, x: CGFloat, y: CGFloat, width: CGFloat) {
    let rect = topRect(x, y, width, 36)
    fillRoundedRect(
        rect,
        radius: 18,
        fill: color(hex: 0xffffff, alpha: 0.08),
        stroke: color(hex: 0xffffff, alpha: 0.14)
    )
    drawText(
        text.uppercased(),
        rect: rect.insetBy(dx: 16, dy: 7),
        font: avenir(12, "Avenir Next Demi Bold"),
        color: color(hex: 0xf8fafc, alpha: 0.85),
        lineHeight: 1.0,
        kern: 1.2
    )
}

func drawChip(text: String, x: CGFloat, y: CGFloat, accent: NSColor) -> CGFloat {
    let measureAttrs: [NSAttributedString.Key: Any] = [.font: avenir(13, "Avenir Next Medium")]
    let width = ceil(NSString(string: text).size(withAttributes: measureAttrs).width) + 36
    let rect = topRect(x, y, width, 34)
    fillRoundedRect(
        rect,
        radius: 17,
        fill: accent.withAlphaComponent(0.12),
        stroke: accent.withAlphaComponent(0.26)
    )
    drawText(
        text,
        rect: rect.insetBy(dx: 14, dy: 8),
        font: avenir(13, "Avenir Next Medium"),
        color: color(hex: 0xe5eefb, alpha: 0.94),
        lineHeight: 1.0
    )
    return width
}

func drawCardChrome(accent: NSColor) {
    let cardRect = topRect(205, 88, 790, 454)
    let shadow = NSShadow()
    shadow.shadowBlurRadius = 30
    shadow.shadowOffset = NSSize(width: 0, height: -8)
    shadow.shadowColor = color(hex: 0x020617, alpha: 0.33)
    shadow.set()

    fillRoundedRect(
        cardRect,
        radius: 34,
        fill: color(hex: 0x04101d, alpha: 0.78),
        stroke: color(hex: 0xffffff, alpha: 0.10),
        lineWidth: 1.5
    )
    NSGraphicsContext.current?.saveGraphicsState()
    let innerRect = topRect(225, 108, 750, 414)
    fillRoundedRect(
        innerRect,
        radius: 28,
        fill: color(hex: 0x061423, alpha: 0.42),
        stroke: accent.withAlphaComponent(0.12),
        lineWidth: 1
    )
    NSGraphicsContext.current?.restoreGraphicsState()
}

func drawGpuArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(650, 164, 286, 244),
        radius: 26,
        fill: color(hex: 0x07192a, alpha: 0.78),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    for index in 0..<3 {
        let y = 194 + CGFloat(index * 56)
        fillRoundedRect(
            topRect(690, CGFloat(y), 150, 38),
            radius: 12,
            fill: accent.withAlphaComponent(0.10),
            stroke: accent.withAlphaComponent(0.30)
        )

        for dot in 0..<5 {
            let x = 706 + CGFloat(dot * 24)
            let cell = NSBezierPath(roundedRect: topRect(CGFloat(x), CGFloat(y + 10), 12, 12), xRadius: 3, yRadius: 3)
            secondaryAccent.withAlphaComponent(0.66 - CGFloat(index) * 0.14).setFill()
            cell.fill()
        }
    }

    let bars: [(CGFloat, CGFloat, CGFloat)] = [
        (830, 310, 38),
        (872, 272, 76),
        (914, 238, 110),
        (956, 196, 152)
    ]

    for (x, y, height) in bars {
        fillRoundedRect(
            topRect(x, y, 24, height),
            radius: 10,
            fill: color(hex: 0xffffff, alpha: 0.08),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
    }

    let trend = NSBezierPath()
    trend.move(to: topPoint(834, 264))
    trend.line(to: topPoint(884, 238))
    trend.line(to: topPoint(926, 212))
    trend.line(to: topPoint(972, 168))
    accent.setStroke()
    trend.lineWidth = 4
    trend.lineCapStyle = .round
    trend.lineJoinStyle = .round
    trend.stroke()

    let arrow = NSBezierPath()
    arrow.move(to: topPoint(970, 170))
    arrow.line(to: topPoint(954, 174))
    arrow.line(to: topPoint(964, 186))
    accent.setFill()
    arrow.fill()

    let badge = topRect(868, 128, 94, 56)
    fillRoundedRect(
        badge,
        radius: 18,
        fill: secondaryAccent.withAlphaComponent(0.14),
        stroke: secondaryAccent.withAlphaComponent(0.30)
    )
    drawText(
        "40%",
        rect: badge.insetBy(dx: 14, dy: 8),
        font: avenir(28, "Avenir Next Bold"),
        color: color(hex: 0xfff7ed),
        alignment: .center,
        lineHeight: 1.0
    )
}

func drawPipelineArtwork(accent: NSColor, secondaryAccent: NSColor) {
    let nodes: [(String, CGFloat, CGFloat, CGFloat)] = [
        ("Git", 666, 190, 108),
        ("CI", 782, 162, 108),
        ("Registry", 854, 224, 128),
        ("Deploy", 756, 306, 130),
        ("Monitor", 860, 354, 122)
    ]

    let connector = NSBezierPath()
    connector.move(to: topPoint(770, 244))
    connector.curve(to: topPoint(790, 216), controlPoint1: topPoint(778, 226), controlPoint2: topPoint(780, 216))
    connector.curve(to: topPoint(888, 278), controlPoint1: topPoint(834, 216), controlPoint2: topPoint(860, 248))
    connector.curve(to: topPoint(822, 360), controlPoint1: topPoint(882, 320), controlPoint2: topPoint(852, 356))
    connector.curve(to: topPoint(900, 408), controlPoint1: topPoint(846, 372), controlPoint2: topPoint(874, 404))
    connector.curve(to: topPoint(930, 294), controlPoint1: topPoint(940, 392), controlPoint2: topPoint(952, 338))
    secondaryAccent.setStroke()
    connector.lineWidth = 4
    connector.lineCapStyle = .round
    connector.lineJoinStyle = .round
    connector.stroke()

    for (name, x, y, width) in nodes {
        fillRoundedRect(
            topRect(x, y, width, 74),
            radius: 22,
            fill: color(hex: 0x07192a, alpha: 0.78),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        let iconRect = topRect(x + 14, y + 16, 42, 42)
        fillRoundedRect(
            iconRect,
            radius: 14,
            fill: accent.withAlphaComponent(0.16),
            stroke: accent.withAlphaComponent(0.28)
        )
        let dot = NSBezierPath(ovalIn: topRect(x + 27, y + 29, 16, 16))
        accent.setFill()
        dot.fill()
        drawText(
            name,
            rect: topRect(x + 64, y + 23, width - 76, 28),
            font: avenir(18, "Avenir Next Demi Bold"),
            color: color(hex: 0xf8fafc),
            lineHeight: 1.0
        )
    }

    for point in [(770.0, 244.0), (822.0, 215.0), (888.0, 275.0), (824.0, 361.0), (900.0, 406.0)] {
        let pulse = NSBezierPath(ovalIn: topRect(point.0 - 8, point.1 - 8, 16, 16))
        accent.setFill()
        pulse.fill()
    }

    let cubeOuter = NSBezierPath()
    cubeOuter.move(to: topPoint(930, 154))
    cubeOuter.line(to: topPoint(968, 176))
    cubeOuter.line(to: topPoint(968, 220))
    cubeOuter.line(to: topPoint(930, 242))
    cubeOuter.line(to: topPoint(892, 220))
    cubeOuter.line(to: topPoint(892, 176))
    cubeOuter.close()
    secondaryAccent.withAlphaComponent(0.18).setFill()
    secondaryAccent.withAlphaComponent(0.42).setStroke()
    cubeOuter.lineWidth = 2
    cubeOuter.fill()
    cubeOuter.stroke()

    let cubeMid = NSBezierPath()
    cubeMid.move(to: topPoint(930, 154))
    cubeMid.line(to: topPoint(930, 242))
    cubeMid.move(to: topPoint(892, 176))
    cubeMid.line(to: topPoint(930, 198))
    cubeMid.line(to: topPoint(968, 176))
    secondaryAccent.withAlphaComponent(0.50).setStroke()
    cubeMid.lineWidth = 2
    cubeMid.stroke()
}

func drawFailureArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(662, 160, 310, 256),
        radius: 26,
        fill: color(hex: 0x08131f, alpha: 0.80),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    let axis = NSBezierPath()
    axis.move(to: topPoint(704, 366))
    axis.line(to: topPoint(704, 212))
    axis.line(to: topPoint(942, 212))
    color(hex: 0xffffff, alpha: 0.18).setStroke()
    axis.lineWidth = 2
    axis.stroke()

    let stable = NSBezierPath()
    stable.move(to: topPoint(726, 266))
    stable.curve(to: topPoint(784, 248), controlPoint1: topPoint(744, 262), controlPoint2: topPoint(760, 248))
    stable.curve(to: topPoint(832, 276), controlPoint1: topPoint(802, 248), controlPoint2: topPoint(818, 276))
    stable.curve(to: topPoint(878, 228), controlPoint1: topPoint(844, 268), controlPoint2: topPoint(860, 238))
    stable.curve(to: topPoint(928, 304), controlPoint1: topPoint(898, 232), controlPoint2: topPoint(910, 292))
    accent.setStroke()
    stable.lineWidth = 4
    stable.lineCapStyle = .round
    stable.lineJoinStyle = .round
    stable.stroke()

    let broken = NSBezierPath()
    broken.move(to: topPoint(726, 302))
    broken.curve(to: topPoint(782, 286), controlPoint1: topPoint(744, 296), controlPoint2: topPoint(760, 286))
    broken.curve(to: topPoint(824, 330), controlPoint1: topPoint(796, 288), controlPoint2: topPoint(812, 330))
    broken.curve(to: topPoint(864, 318), controlPoint1: topPoint(838, 330), controlPoint2: topPoint(852, 318))
    broken.curve(to: topPoint(930, 376), controlPoint1: topPoint(888, 320), controlPoint2: topPoint(904, 372))
    secondaryAccent.setStroke()
    broken.lineWidth = 4
    broken.lineCapStyle = .round
    broken.lineJoinStyle = .round
    broken.setLineDash([10, 10], count: 2, phase: 0)
    broken.stroke()

    for (x, y, radius) in [(884.0, 198.0, 18.0), (938.0, 172.0, 12.0), (958.0, 258.0, 10.0)] {
        let ring = NSBezierPath(ovalIn: topRect(x - radius, y - radius, radius * 2, radius * 2))
        secondaryAccent.withAlphaComponent(0.56).setStroke()
        ring.lineWidth = 3
        ring.stroke()
    }

    for index in 0..<12 {
        let x = 734 + CGFloat(index * 18)
        let y = 188 + CGFloat((index * 17) % 94)
        let dot = NSBezierPath(ovalIn: topRect(x, y, 6, 6))
        color(hex: 0xffffff, alpha: 0.26 + CGFloat(index % 3) * 0.10).setFill()
        dot.fill()
    }

    let alertRect = topRect(892, 132, 78, 62)
    fillRoundedRect(
        alertRect,
        radius: 18,
        fill: secondaryAccent.withAlphaComponent(0.16),
        stroke: secondaryAccent.withAlphaComponent(0.34)
    )
    drawText(
        "!",
        rect: alertRect.insetBy(dx: 24, dy: 6),
        font: avenir(40, "Avenir Next Bold"),
        color: color(hex: 0xfff1f2),
        alignment: .center,
        lineHeight: 1.0
    )
}

func drawVLLMArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(654, 158, 304, 262),
        radius: 26,
        fill: color(hex: 0x081622, alpha: 0.82),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    let cluster = NSBezierPath()
    cluster.move(to: topPoint(786, 182))
    cluster.line(to: topPoint(824, 204))
    cluster.line(to: topPoint(824, 248))
    cluster.line(to: topPoint(786, 270))
    cluster.line(to: topPoint(748, 248))
    cluster.line(to: topPoint(748, 204))
    cluster.close()
    accent.withAlphaComponent(0.16).setFill()
    accent.withAlphaComponent(0.38).setStroke()
    cluster.lineWidth = 2
    cluster.fill()
    cluster.stroke()

    let clusterMid = NSBezierPath()
    clusterMid.move(to: topPoint(786, 182))
    clusterMid.line(to: topPoint(786, 270))
    clusterMid.move(to: topPoint(748, 204))
    clusterMid.line(to: topPoint(786, 226))
    clusterMid.line(to: topPoint(824, 204))
    accent.withAlphaComponent(0.48).setStroke()
    clusterMid.lineWidth = 2
    clusterMid.stroke()

    let pods: [(CGFloat, CGFloat)] = [(676, 204), (676, 266), (676, 328)]
    for (x, y) in pods {
        fillRoundedRect(
            topRect(x, y, 114, 42),
            radius: 14,
            fill: color(hex: 0xffffff, alpha: 0.05),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        let dot = NSBezierPath(ovalIn: topRect(x + 14, y + 13, 16, 16))
        secondaryAccent.setFill()
        dot.fill()
        drawText(
            "Pod",
            rect: topRect(x + 40, y + 10, 54, 22),
            font: avenir(16, "Avenir Next Demi Bold"),
            color: color(hex: 0xf8fafc),
            lineHeight: 1.0
        )
    }

    let routes = NSBezierPath()
    routes.move(to: topPoint(790, 226))
    routes.line(to: topPoint(764, 226))
    routes.line(to: topPoint(764, 224))
    routes.line(to: topPoint(790, 288))
    routes.line(to: topPoint(764, 288))
    routes.line(to: topPoint(764, 286))
    routes.line(to: topPoint(790, 350))
    routes.line(to: topPoint(764, 350))
    secondaryAccent.setStroke()
    routes.lineWidth = 3
    routes.lineCapStyle = .round
    routes.lineJoinStyle = .round
    routes.stroke()

    let tokenBars: [(CGFloat, CGFloat)] = [
        (854, 208), (880, 208), (906, 208), (932, 208),
        (854, 240), (880, 240), (906, 240),
        (854, 272), (880, 272), (906, 272), (932, 272),
        (854, 304), (880, 304), (906, 304),
        (854, 336), (880, 336), (906, 336), (932, 336)
    ]
    for (x, y) in tokenBars {
        fillRoundedRect(
            topRect(x, y, 16, 10),
            radius: 4,
            fill: accent.withAlphaComponent(0.72)
        )
    }
}

func drawRAGArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(654, 160, 306, 260),
        radius: 26,
        fill: color(hex: 0x081523, alpha: 0.82),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    let docs: [(CGFloat, CGFloat, CGFloat)] = [
        (684, 198, -10),
        (712, 222, 0),
        (740, 246, 10)
    ]

    for (x, y, rotation) in docs {
        NSGraphicsContext.current?.saveGraphicsState()
        let transform = NSAffineTransform()
        transform.translateX(by: x + 72, yBy: canvasHeight - y - 48)
        transform.rotate(byDegrees: rotation)
        transform.translateX(by: -(x + 72), yBy: -(canvasHeight - y - 48))
        transform.concat()

        fillRoundedRect(
            topRect(x, y, 144, 96),
            radius: 16,
            fill: color(hex: 0xffffff, alpha: 0.06),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        for row in 0..<3 {
            let line = NSBezierPath(roundedRect: topRect(x + 18, y + 20 + CGFloat(row * 18), 92, 8), xRadius: 4, yRadius: 4)
            color(hex: 0xdbeafe, alpha: 0.24).setFill()
            line.fill()
        }
        NSGraphicsContext.current?.restoreGraphicsState()
    }

    let searchRing = NSBezierPath(ovalIn: topRect(842, 212, 70, 70))
    accent.withAlphaComponent(0.22).setFill()
    accent.withAlphaComponent(0.46).setStroke()
    searchRing.lineWidth = 4
    searchRing.fill()
    searchRing.stroke()

    let handle = NSBezierPath()
    handle.move(to: topPoint(898, 274))
    handle.line(to: topPoint(930, 306))
    accent.withAlphaComponent(0.58).setStroke()
    handle.lineWidth = 6
    handle.lineCapStyle = .round
    handle.stroke()

    let checklist = topRect(842, 302, 92, 76)
    fillRoundedRect(
        checklist,
        radius: 18,
        fill: secondaryAccent.withAlphaComponent(0.12),
        stroke: secondaryAccent.withAlphaComponent(0.34)
    )
    for row in 0..<3 {
        let y = 316 + CGFloat(row * 18)
        let check = NSBezierPath()
        check.move(to: topPoint(858, y + 8))
        check.line(to: topPoint(866, y + 16))
        check.line(to: topPoint(878, y))
        secondaryAccent.setStroke()
        check.lineWidth = 3
        check.lineCapStyle = .round
        check.lineJoinStyle = .round
        check.stroke()

        let line = NSBezierPath(roundedRect: topRect(886, y + 2, 30, 6), xRadius: 3, yRadius: 3)
        color(hex: 0xfffbeb, alpha: 0.46).setFill()
        line.fill()
    }
}

func drawObservabilityArtwork(accent: NSColor, secondaryAccent: NSColor) {
    let panels: [(CGFloat, CGFloat, CGFloat, CGFloat)] = [
        (662, 176, 126, 92),
        (804, 176, 126, 92),
        (662, 286, 126, 92),
        (804, 286, 126, 92)
    ]

    for (x, y, width, height) in panels {
        fillRoundedRect(
            topRect(x, y, width, height),
            radius: 18,
            fill: color(hex: 0x081622, alpha: 0.82),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
    }

    let bars = [32.0, 48.0, 22.0, 60.0]
    for (index, height) in bars.enumerated() {
        let x = 684 + CGFloat(index * 22)
        fillRoundedRect(
            topRect(CGFloat(x), 246 - CGFloat(height), 14, CGFloat(height)),
            radius: 5,
            fill: accent.withAlphaComponent(0.72)
        )
    }

    let spark = NSBezierPath()
    spark.move(to: topPoint(824, 240))
    spark.line(to: topPoint(844, 226))
    spark.line(to: topPoint(864, 236))
    spark.line(to: topPoint(886, 210))
    spark.line(to: topPoint(912, 232))
    secondaryAccent.setStroke()
    spark.lineWidth = 4
    spark.lineCapStyle = .round
    spark.lineJoinStyle = .round
    spark.stroke()

    for row in 0..<4 {
        let line = NSBezierPath(roundedRect: topRect(684, 304 + CGFloat(row * 14), 74, 7), xRadius: 4, yRadius: 4)
        color(hex: 0xffffff, alpha: 0.16 + CGFloat(row) * 0.04).setFill()
        line.fill()
    }

    let donutOuter = NSBezierPath(ovalIn: topRect(832, 304, 58, 58))
    accent.withAlphaComponent(0.18).setFill()
    accent.withAlphaComponent(0.40).setStroke()
    donutOuter.lineWidth = 10
    donutOuter.fill()
    donutOuter.stroke()
    let donutInner = NSBezierPath(ovalIn: topRect(848, 320, 26, 26))
    color(hex: 0x081622).setFill()
    donutInner.fill()

    let alert = topRect(908, 150, 44, 44)
    fillRoundedRect(
        alert,
        radius: 14,
        fill: secondaryAccent.withAlphaComponent(0.16),
        stroke: secondaryAccent.withAlphaComponent(0.34)
    )
    drawText(
        "!",
        rect: alert.insetBy(dx: 12, dy: 2),
        font: avenir(28, "Avenir Next Bold"),
        color: color(hex: 0xfffbeb),
        alignment: .center,
        lineHeight: 1.0
    )
}

func render(spec: CoverSpec, outputDir: URL) throws {
    guard let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: Int(canvasWidth),
        pixelsHigh: Int(canvasHeight),
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else {
        throw NSError(domain: "blog-image-generator", code: 1)
    }

    guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
        throw NSError(domain: "blog-image-generator", code: 2)
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.imageInterpolation = .high

    drawGradient(in: topRect(0, 0, canvasWidth, canvasHeight), colors: spec.palette, angle: 18)
    drawGrid()

    drawGlow(x: 260, y: 84, radius: 210, color: spec.secondaryAccent, alpha: 0.18)
    drawGlow(x: 1026, y: 96, radius: 180, color: spec.accent, alpha: 0.22)
    drawGlow(x: 950, y: 520, radius: 220, color: spec.secondaryAccent, alpha: 0.15)

    let backdrop = NSBezierPath()
    backdrop.move(to: topPoint(80, 540))
    backdrop.curve(to: topPoint(340, 392), controlPoint1: topPoint(122, 428), controlPoint2: topPoint(258, 350))
    backdrop.curve(to: topPoint(560, 480), controlPoint1: topPoint(396, 430), controlPoint2: topPoint(482, 500))
    backdrop.curve(to: topPoint(840, 350), controlPoint1: topPoint(660, 458), controlPoint2: topPoint(728, 360))
    backdrop.curve(to: topPoint(1120, 530), controlPoint1: topPoint(924, 346), controlPoint2: topPoint(1044, 470))
    backdrop.line(to: topPoint(1120, 630))
    backdrop.line(to: topPoint(80, 630))
    backdrop.close()
    color(hex: 0xffffff, alpha: 0.035).setFill()
    backdrop.fill()

    drawCardChrome(accent: spec.accent)
    drawBadge(text: spec.label, x: 258, y: 142, width: 186)

    drawText(
        spec.title,
        rect: topRect(258, 196, 352, 154),
        font: avenir(46, "Avenir Next Bold"),
        color: color(hex: 0xf8fafc),
        lineHeight: 1.05
    )

    drawText(
        spec.subtitle,
        rect: topRect(258, 364, 336, 90),
        font: avenir(18, "Avenir Next Medium"),
        color: color(hex: 0xd5e3f5, alpha: 0.88),
        lineHeight: 1.34
    )

    var chipX: CGFloat = 258
    for text in spec.chipText {
        let chipWidth = drawChip(text: text, x: chipX, y: 462, accent: spec.accent)
        chipX += chipWidth + 14
    }

    spec.artwork()

    NSGraphicsContext.restoreGraphicsState()

    let outputURL = outputDir.appendingPathComponent(spec.filename)
    guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.92]) else {
        throw NSError(domain: "blog-image-generator", code: 3)
    }
    try data.write(to: outputURL)
    print("Generated \(outputURL.path)")
}

let outputDir = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent("public/blog-images", isDirectory: true)
try FileManager.default.createDirectory(at: outputDir, withIntermediateDirectories: true)

let specs: [CoverSpec] = [
    CoverSpec(
        filename: "gpu-cost-optimization.jpg",
        label: "Model Deployment",
        title: "GPU Cost\nOptimization",
        subtitle: "Cut infrastructure spend with smarter scheduling, right-sizing, and spot-aware training.",
        palette: [color(hex: 0x07111e), color(hex: 0x0b1930), color(hex: 0x10233f)],
        accent: color(hex: 0x38bdf8),
        secondaryAccent: color(hex: 0xf59e0b),
        chipText: ["Spot GPUs", "Right-sizing", "40% Savings"],
        artwork: {
            drawGpuArtwork(accent: color(hex: 0x38bdf8), secondaryAccent: color(hex: 0xf59e0b))
        }
    ),
    CoverSpec(
        filename: "mlops-pipeline-kubernetes.jpg",
        label: "MLOps",
        title: "MLOps Pipeline\non Kubernetes",
        subtitle: "A production path from commit to retrain, with registry, rollout, and monitoring loops built in.",
        palette: [color(hex: 0x04131f), color(hex: 0x08253a), color(hex: 0x0b3345)],
        accent: color(hex: 0x22d3ee),
        secondaryAccent: color(hex: 0x34d399),
        chipText: ["CI/CD", "Registry", "Canary Deploy"],
        artwork: {
            drawPipelineArtwork(accent: color(hex: 0x22d3ee), secondaryAccent: color(hex: 0x34d399))
        }
    ),
    CoverSpec(
        filename: "ml-models-fail-production.jpg",
        label: "AI Reliability",
        title: "ML Failures\nin Production",
        subtitle: "Model drift, latency spikes, and blind monitoring create the gap between notebook success and real reliability.",
        palette: [color(hex: 0x110a11), color(hex: 0x23101c), color(hex: 0x32101b)],
        accent: color(hex: 0xfb7185),
        secondaryAccent: color(hex: 0xf97316),
        chipText: ["Drift", "Latency", "Monitoring"],
        artwork: {
            drawFailureArtwork(accent: color(hex: 0xfb7185), secondaryAccent: color(hex: 0xf97316))
        }
    ),
    CoverSpec(
        filename: "vllm-kubernetes-serving.jpg",
        label: "Model Deployment",
        title: "vLLM on\nKubernetes",
        subtitle: "Serve open-source LLMs with better batching, safer routing, and GPU-aware autoscaling.",
        palette: [color(hex: 0x06121d), color(hex: 0x0b1f31), color(hex: 0x10344f)],
        accent: color(hex: 0x38bdf8),
        secondaryAccent: color(hex: 0x34d399),
        chipText: ["vLLM", "Autoscaling", "GPU Routing"],
        artwork: {
            drawVLLMArtwork(accent: color(hex: 0x38bdf8), secondaryAccent: color(hex: 0x34d399))
        }
    ),
    CoverSpec(
        filename: "rag-reliability-checklist.jpg",
        label: "AI Reliability",
        title: "RAG Reliability\nChecklist",
        subtitle: "Harden retrieval, freshness, guardrails, and permissions before your knowledge system hits production.",
        palette: [color(hex: 0x0d0f18), color(hex: 0x1f1230), color(hex: 0x2f1a40)],
        accent: color(hex: 0xa78bfa),
        secondaryAccent: color(hex: 0xf59e0b),
        chipText: ["Retrieval", "Freshness", "Guardrails"],
        artwork: {
            drawRAGArtwork(accent: color(hex: 0xa78bfa), secondaryAccent: color(hex: 0xf59e0b))
        }
    ),
    CoverSpec(
        filename: "ai-observability-dashboards.jpg",
        label: "MLOps",
        title: "AI Observability\nDashboards",
        subtitle: "Track latency, runtime health, quality, retrieval, and cost with dashboards built for production incidents.",
        palette: [color(hex: 0x071018), color(hex: 0x0b2432), color(hex: 0x153847)],
        accent: color(hex: 0x22d3ee),
        secondaryAccent: color(hex: 0xf97316),
        chipText: ["Latency", "Quality", "Cost"],
        artwork: {
            drawObservabilityArtwork(accent: color(hex: 0x22d3ee), secondaryAccent: color(hex: 0xf97316))
        }
    )
]

for spec in specs {
    try autoreleasepool {
        try render(spec: spec, outputDir: outputDir)
    }
}
