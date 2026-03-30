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

func fillGradientRoundedRect(
    _ rect: NSRect,
    radius: CGFloat,
    colors: [NSColor],
    angle: CGFloat,
    stroke: NSColor? = nil,
    lineWidth: CGFloat = 1
) {
    let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
    NSGraphicsContext.current?.saveGraphicsState()
    path.addClip()
    NSGradient(colors: colors)?.draw(in: rect, angle: angle)
    NSGraphicsContext.current?.restoreGraphicsState()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
}

func drawOrb(x: CGFloat, y: CGFloat, radius: CGFloat, fill: NSColor, glow: NSColor? = nil) {
    if let glow {
        drawGlow(x: x + radius, y: y + radius, radius: radius * 2.8, color: glow, alpha: 0.10)
    }
    let orb = NSBezierPath(ovalIn: topRect(x, y, radius * 2, radius * 2))
    fill.setFill()
    orb.fill()
}

func drawBackdropConstellation(accent: NSColor, secondaryAccent: NSColor) {
    let points: [(CGFloat, CGFloat, NSColor)] = [
        (72, 112, accent.withAlphaComponent(0.72)),
        (1120, 88, secondaryAccent.withAlphaComponent(0.72)),
        (1060, 152, accent.withAlphaComponent(0.48)),
        (92, 520, secondaryAccent.withAlphaComponent(0.42)),
        (1038, 520, accent.withAlphaComponent(0.38))
    ]

    let connectors = NSBezierPath()
    connectors.move(to: topPoint(72, 112))
    connectors.line(to: topPoint(148, 168))
    connectors.line(to: topPoint(204, 138))
    connectors.move(to: topPoint(1038, 520))
    connectors.line(to: topPoint(1094, 480))
    connectors.line(to: topPoint(1120, 430))
    color(hex: 0xffffff, alpha: 0.08).setStroke()
    connectors.lineWidth = 1.2
    connectors.lineJoinStyle = .round
    connectors.lineCapStyle = .round
    connectors.stroke()

    for (x, y, fill) in points {
        drawOrb(x: x, y: y, radius: 4, fill: fill, glow: fill)
    }
}

func makeTextAttributes(
    font: NSFont,
    color textColor: NSColor,
    alignment: NSTextAlignment = .left,
    lineHeight: CGFloat = 1.12,
    kern: CGFloat = 0
) -> [NSAttributedString.Key: Any] {
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = alignment
    paragraph.lineBreakMode = .byWordWrapping
    paragraph.minimumLineHeight = font.pointSize * lineHeight
    paragraph.maximumLineHeight = font.pointSize * lineHeight

    return [
        .font: font,
        .foregroundColor: textColor,
        .paragraphStyle: paragraph,
        .kern: kern
    ]
}

func measureText(
    _ text: String,
    width: CGFloat,
    font: NSFont,
    alignment: NSTextAlignment = .left,
    lineHeight: CGFloat = 1.12,
    kern: CGFloat = 0
) -> NSSize {
    let attrs = makeTextAttributes(
        font: font,
        color: color(hex: 0xffffff),
        alignment: alignment,
        lineHeight: lineHeight,
        kern: kern
    )

    let measured = NSString(string: text).boundingRect(
        with: NSSize(width: width, height: .greatestFiniteMagnitude),
        options: [.usesLineFragmentOrigin, .usesFontLeading],
        attributes: attrs
    )
    return NSSize(width: ceil(measured.width), height: ceil(measured.height))
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
    let attrs = makeTextAttributes(
        font: font,
        color: textColor,
        alignment: alignment,
        lineHeight: lineHeight,
        kern: kern
    )

    NSString(string: text).draw(
        with: rect,
        options: [.usesLineFragmentOrigin, .usesFontLeading],
        attributes: attrs
    )
}

func drawCenteredText(
    _ text: String,
    rect: NSRect,
    font: NSFont,
    color textColor: NSColor,
    alignment: NSTextAlignment = .center,
    lineHeight: CGFloat = 1.0,
    kern: CGFloat = 0
) {
    let singleLine = !text.contains("\n")
    if singleLine {
        let paragraph = NSMutableParagraphStyle()
        paragraph.alignment = alignment
        paragraph.lineBreakMode = .byClipping

        let attrs: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: textColor,
            .paragraphStyle: paragraph,
            .kern: kern
        ]

        let measured = NSString(string: text).size(withAttributes: attrs)
        let centeredRect = NSRect(
            x: rect.origin.x,
            y: rect.origin.y + max(0, floor((rect.height - ceil(measured.height)) / 2)),
            width: rect.width,
            height: ceil(measured.height)
        )

        NSString(string: text).draw(
            with: centeredRect,
            options: [.usesLineFragmentOrigin],
            attributes: attrs
        )
        return
    }

    let attrs = makeTextAttributes(
        font: font,
        color: textColor,
        alignment: alignment,
        lineHeight: lineHeight,
        kern: kern
    )

    let measured = NSString(string: text).boundingRect(
        with: NSSize(width: rect.width, height: .greatestFiniteMagnitude),
        options: [.usesLineFragmentOrigin, .usesFontLeading],
        attributes: attrs
    )

    let centeredRect = NSRect(
        x: rect.origin.x,
        y: rect.origin.y + max(0, floor((rect.height - ceil(measured.height)) / 2)),
        width: rect.width,
        height: ceil(measured.height)
    )

    NSString(string: text).draw(
        with: centeredRect,
        options: [.usesLineFragmentOrigin, .usesFontLeading],
        attributes: attrs
    )
}

func drawCenteredDotLabel(
    text: String,
    in rect: NSRect,
    dotColor: NSColor,
    font: NSFont,
    textColor: NSColor,
    dotSize: CGFloat = 16,
    gap: CGFloat = 10
) {
    let textSize = measureText(text, width: rect.width, font: font, alignment: .left, lineHeight: 1.0)
    let groupWidth = dotSize + gap + textSize.width
    let startX = rect.origin.x + max(0, (rect.width - groupWidth) / 2)
    let dotY = rect.origin.y + (rect.height - dotSize) / 2

    let dot = NSBezierPath(ovalIn: NSRect(x: startX, y: dotY, width: dotSize, height: dotSize))
    dotColor.setFill()
    dot.fill()

    drawCenteredText(
        text,
        rect: NSRect(x: startX + dotSize + gap, y: rect.origin.y, width: textSize.width, height: rect.height),
        font: font,
        color: textColor,
        alignment: .left,
        lineHeight: 1.0
    )
}

func drawCenteredIconLabel(
    text: String,
    cardRect: NSRect,
    accent: NSColor,
    font: NSFont,
    textColor: NSColor,
    iconSize: CGFloat = 42,
    iconDotSize: CGFloat = 16,
    gap: CGFloat = 12
) {
    let availableTextWidth = cardRect.width - iconSize - gap - 20
    let naturalTextWidth = ceil(NSString(string: text).size(withAttributes: [.font: font]).width)
    let textWidth = min(naturalTextWidth, availableTextWidth)
    let textSize = NSSize(width: textWidth, height: measureText(text, width: textWidth, font: font, alignment: .left, lineHeight: 1.0).height)
    let groupWidth = iconSize + gap + textSize.width
    let startX = cardRect.origin.x + max(14, (cardRect.width - groupWidth) / 2)
    let iconY = cardRect.origin.y + (cardRect.height - iconSize) / 2

    let iconRect = NSRect(x: startX, y: iconY, width: iconSize, height: iconSize)
    fillRoundedRect(
        iconRect,
        radius: 14,
        fill: accent.withAlphaComponent(0.16),
        stroke: accent.withAlphaComponent(0.28)
    )
    let dotInset = (iconSize - iconDotSize) / 2
    let dot = NSBezierPath(ovalIn: NSRect(x: startX + dotInset, y: iconY + dotInset, width: iconDotSize, height: iconDotSize))
    accent.setFill()
    dot.fill()

    drawCenteredText(
        text,
        rect: NSRect(x: startX + iconSize + gap, y: cardRect.origin.y, width: textSize.width, height: cardRect.height),
        font: font,
        color: textColor,
        alignment: .left,
        lineHeight: 1.0
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
    drawCenteredText(
        text.uppercased(),
        rect: rect.insetBy(dx: 14, dy: 0),
        font: avenir(12, "Avenir Next Demi Bold"),
        color: color(hex: 0xf8fafc, alpha: 0.85),
        alignment: .center,
        lineHeight: 1.0,
        kern: 1.2
    )
}

func drawChip(text: String, x: CGFloat, y: CGFloat, accent: NSColor) -> CGFloat {
    let measureAttrs: [NSAttributedString.Key: Any] = [.font: avenir(13, "Avenir Next Medium")]
    let width = ceil(NSString(string: text).size(withAttributes: measureAttrs).width) + 36
    let rect = topRect(x, y, width, 34)
    fillGradientRoundedRect(
        rect,
        radius: 17,
        colors: [
            color(hex: 0x07192a, alpha: 0.92),
            accent.withAlphaComponent(0.14)
        ],
        angle: 0,
        stroke: accent.withAlphaComponent(0.26)
    )
    drawCenteredText(
        text,
        rect: rect.insetBy(dx: 12, dy: 0),
        font: avenir(13, "Avenir Next Medium"),
        color: color(hex: 0xe5eefb, alpha: 0.94),
        alignment: .center,
        lineHeight: 1.0
    )
    return width
}

func drawCardChrome(accent: NSColor) {
    let cardRect = topRect(205, 88, 790, 454)
    let shadow = NSShadow()
    shadow.shadowBlurRadius = 42
    shadow.shadowOffset = NSSize(width: 0, height: -12)
    shadow.shadowColor = color(hex: 0x020617, alpha: 0.42)
    shadow.set()

    fillGradientRoundedRect(
        cardRect,
        radius: 34,
        colors: [
            color(hex: 0x071321, alpha: 0.96),
            color(hex: 0x05111f, alpha: 0.94),
            color(hex: 0x08162a, alpha: 0.96)
        ],
        angle: 24,
        stroke: color(hex: 0xffffff, alpha: 0.10),
        lineWidth: 1.5
    )

    let topSheen = NSBezierPath(roundedRect: topRect(224, 104, 752, 98), xRadius: 28, yRadius: 28)
    NSGraphicsContext.current?.saveGraphicsState()
    topSheen.addClip()
    NSGradient(colors: [
        color(hex: 0xffffff, alpha: 0.09),
        color(hex: 0xffffff, alpha: 0.00)
    ])?.draw(in: topRect(224, 104, 752, 98), angle: 90)
    NSGraphicsContext.current?.restoreGraphicsState()

    NSGraphicsContext.current?.saveGraphicsState()
    let innerRect = topRect(225, 108, 750, 414)
    fillGradientRoundedRect(
        innerRect,
        radius: 28,
        colors: [
            color(hex: 0x071526, alpha: 0.82),
            color(hex: 0x07111d, alpha: 0.78)
        ],
        angle: 180,
        stroke: accent.withAlphaComponent(0.12),
        lineWidth: 1
    )
    let insetBorder = NSBezierPath(roundedRect: topRect(238, 120, 724, 390), xRadius: 24, yRadius: 24)
    color(hex: 0xffffff, alpha: 0.05).setStroke()
    insetBorder.lineWidth = 1
    insetBorder.stroke()
    NSGraphicsContext.current?.restoreGraphicsState()
}

func drawArtworkPanel(in rect: NSRect, accent: NSColor, secondaryAccent: NSColor) {
    fillGradientRoundedRect(
        rect,
        radius: 28,
        colors: [
            color(hex: 0x0a1a2d, alpha: 0.92),
            color(hex: 0x091728, alpha: 0.90)
        ],
        angle: 180,
        stroke: color(hex: 0xffffff, alpha: 0.08),
        lineWidth: 1.2
    )

    let edgeGlow = NSBezierPath(roundedRect: rect.insetBy(dx: 8, dy: 8), xRadius: 22, yRadius: 22)
    NSGraphicsContext.current?.saveGraphicsState()
    edgeGlow.addClip()
    NSGradient(colors: [
        accent.withAlphaComponent(0.10),
        color(hex: 0xffffff, alpha: 0.0)
    ])?.draw(in: rect.insetBy(dx: 8, dy: 8), angle: 35)
    NSGraphicsContext.current?.restoreGraphicsState()

    let topRail = NSRect(x: rect.origin.x + 18, y: rect.maxY - 26, width: 88, height: 8)
    fillRoundedRect(topRail, radius: 4, fill: accent.withAlphaComponent(0.46))
    let topRail2 = NSRect(x: rect.origin.x + 114, y: rect.maxY - 26, width: 44, height: 8)
    fillRoundedRect(topRail2, radius: 4, fill: secondaryAccent.withAlphaComponent(0.30))
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
    drawCenteredText(
        "40%",
        rect: badge,
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
        let cardRect = topRect(x, y, width, 74)
        fillRoundedRect(
            cardRect,
            radius: 22,
            fill: color(hex: 0x07192a, alpha: 0.78),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        drawCenteredIconLabel(
            text: name,
            cardRect: cardRect,
            accent: accent,
            font: avenir(16, "Avenir Next Demi Bold"),
            textColor: color(hex: 0xf8fafc),
            iconSize: 32,
            iconDotSize: 12,
            gap: 10
        )
    }

    for point in [(770.0, 244.0), (822.0, 215.0), (888.0, 275.0), (824.0, 361.0), (900.0, 406.0)] {
        let pulse = NSBezierPath(ovalIn: topRect(point.0 - 8, point.1 - 8, 16, 16))
        accent.setFill()
        pulse.fill()
    }

    let cubeOuter = NSBezierPath()
    cubeOuter.move(to: topPoint(946, 158))
    cubeOuter.line(to: topPoint(978, 176))
    cubeOuter.line(to: topPoint(978, 214))
    cubeOuter.line(to: topPoint(946, 232))
    cubeOuter.line(to: topPoint(914, 214))
    cubeOuter.line(to: topPoint(914, 176))
    cubeOuter.close()
    secondaryAccent.withAlphaComponent(0.18).setFill()
    secondaryAccent.withAlphaComponent(0.42).setStroke()
    cubeOuter.lineWidth = 2
    cubeOuter.fill()
    cubeOuter.stroke()

    let cubeMid = NSBezierPath()
    cubeMid.move(to: topPoint(946, 158))
    cubeMid.line(to: topPoint(946, 232))
    cubeMid.move(to: topPoint(914, 176))
    cubeMid.line(to: topPoint(946, 194))
    cubeMid.line(to: topPoint(978, 176))
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
    drawCenteredText(
        "!",
        rect: alertRect,
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
        let cardRect = topRect(x, y, 114, 42)
        fillRoundedRect(
            cardRect,
            radius: 14,
            fill: color(hex: 0xffffff, alpha: 0.05),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        drawCenteredDotLabel(
            text: "Pod",
            in: cardRect,
            dotColor: secondaryAccent,
            font: avenir(16, "Avenir Next Demi Bold"),
            textColor: color(hex: 0xf8fafc)
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
    drawCenteredText(
        "!",
        rect: alert,
        font: avenir(28, "Avenir Next Bold"),
        color: color(hex: 0xfffbeb),
        alignment: .center,
        lineHeight: 1.0
    )
}

func drawCanaryArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(658, 176, 292, 232),
        radius: 24,
        fill: color(hex: 0x081622, alpha: 0.82),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    let lane = NSBezierPath(roundedRect: topRect(688, 232, 230, 18), xRadius: 9, yRadius: 9)
    color(hex: 0xffffff, alpha: 0.08).setFill()
    lane.fill()

    let stableFill = NSBezierPath(roundedRect: topRect(688, 232, 136, 18), xRadius: 9, yRadius: 9)
    secondaryAccent.withAlphaComponent(0.78).setFill()
    stableFill.fill()

    let canaryFill = NSBezierPath(roundedRect: topRect(824, 232, 46, 18), xRadius: 9, yRadius: 9)
    accent.withAlphaComponent(0.86).setFill()
    canaryFill.fill()

    let stableCard = topRect(678, 188, 122, 78)
    let canaryCard = topRect(816, 188, 122, 78)
    let rollbackCard = topRect(732, 318, 152, 58)

    fillRoundedRect(stableCard, radius: 18, fill: color(hex: 0xffffff, alpha: 0.05), stroke: color(hex: 0xffffff, alpha: 0.10))
    fillRoundedRect(canaryCard, radius: 18, fill: color(hex: 0xffffff, alpha: 0.05), stroke: color(hex: 0xffffff, alpha: 0.10))
    fillRoundedRect(rollbackCard, radius: 18, fill: accent.withAlphaComponent(0.10), stroke: accent.withAlphaComponent(0.22))

    drawCenteredDotLabel(
        text: "Stable",
        in: stableCard.insetBy(dx: 10, dy: 0),
        dotColor: secondaryAccent,
        font: avenir(18, "Avenir Next Demi Bold"),
        textColor: color(hex: 0xf8fafc)
    )
    drawCenteredDotLabel(
        text: "Canary",
        in: canaryCard.insetBy(dx: 10, dy: 0),
        dotColor: accent,
        font: avenir(17, "Avenir Next Demi Bold"),
        textColor: color(hex: 0xf8fafc)
    )
    drawCenteredText(
        "Rollback",
        rect: rollbackCard,
        font: avenir(17, "Avenir Next Demi Bold"),
        color: color(hex: 0xf8fafc),
        alignment: .center,
        lineHeight: 1.0
    )

    let rollbackLine = NSBezierPath()
    rollbackLine.move(to: topPoint(878, 268))
    rollbackLine.curve(to: topPoint(850, 318), controlPoint1: topPoint(880, 290), controlPoint2: topPoint(866, 310))
    rollbackLine.line(to: topPoint(866, 318))
    accent.withAlphaComponent(0.82).setStroke()
    rollbackLine.lineWidth = 4
    rollbackLine.lineCapStyle = .round
    rollbackLine.lineJoinStyle = .round
    rollbackLine.stroke()

    let rollbackArrow = NSBezierPath()
    rollbackArrow.move(to: topPoint(866, 318))
    rollbackArrow.line(to: topPoint(856, 312))
    rollbackArrow.line(to: topPoint(858, 324))
    rollbackArrow.close()
    accent.setFill()
    rollbackArrow.fill()

    for (label, x) in [("5%", 704.0), ("25%", 760.0), ("50%", 818.0), ("100%", 880.0)] {
        drawCenteredText(
            label,
            rect: topRect(x, 258, 36, 16),
            font: avenir(12, "Avenir Next Medium"),
            color: color(hex: 0xd5e3f5, alpha: 0.78),
            alignment: .center,
            lineHeight: 1.0
        )
    }

    let guardRect = topRect(910, 136, 46, 46)
    fillRoundedRect(
        guardRect,
        radius: 16,
        fill: secondaryAccent.withAlphaComponent(0.14),
        stroke: secondaryAccent.withAlphaComponent(0.34)
    )
    let shield = NSBezierPath()
    shield.move(to: topPoint(933, 146))
    shield.line(to: topPoint(945, 151))
    shield.line(to: topPoint(945, 165))
    shield.curve(to: topPoint(933, 175), controlPoint1: topPoint(945, 170), controlPoint2: topPoint(939, 175))
    shield.curve(to: topPoint(921, 165), controlPoint1: topPoint(927, 175), controlPoint2: topPoint(921, 170))
    shield.line(to: topPoint(921, 151))
    shield.close()
    color(hex: 0xfffbeb).setFill()
    shield.fill()
}

func drawIncidentArtwork(accent: NSColor, secondaryAccent: NSColor) {
    fillRoundedRect(
        topRect(662, 178, 286, 226),
        radius: 24,
        fill: color(hex: 0x081622, alpha: 0.82),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )

    for row in 0..<4 {
        let line = NSBezierPath(roundedRect: topRect(694, 214 + CGFloat(row * 28), 124, 8), xRadius: 4, yRadius: 4)
        color(hex: 0xffffff, alpha: 0.18 + CGFloat(row) * 0.05).setFill()
        line.fill()
    }

    let alertCard = topRect(834, 208, 88, 78)
    fillRoundedRect(
        alertCard,
        radius: 18,
        fill: accent.withAlphaComponent(0.12),
        stroke: accent.withAlphaComponent(0.34)
    )
    drawCenteredText(
        "!",
        rect: alertCard,
        font: avenir(40, "Avenir Next Bold"),
        color: color(hex: 0xfff1f2),
        alignment: .center,
        lineHeight: 1.0
    )

    let statusDots: [(CGFloat, CGFloat, NSColor)] = [
        (694, 334, secondaryAccent),
        (734, 334, accent),
        (774, 334, secondaryAccent)
    ]
    for (x, y, dotColor) in statusDots {
        let dot = NSBezierPath(ovalIn: topRect(x, y, 18, 18))
        dotColor.setFill()
        dot.fill()
    }

    let arrow = NSBezierPath()
    arrow.move(to: topPoint(846, 314))
    arrow.line(to: topPoint(884, 346))
    arrow.line(to: topPoint(864, 346))
    arrow.line(to: topPoint(864, 374))
    arrow.line(to: topPoint(828, 374))
    arrow.line(to: topPoint(828, 346))
    arrow.line(to: topPoint(808, 346))
    arrow.close()
    secondaryAccent.withAlphaComponent(0.22).setFill()
    secondaryAccent.withAlphaComponent(0.36).setStroke()
    arrow.lineWidth = 2
    arrow.fill()
    arrow.stroke()
}

func drawGatewayArtwork(accent: NSColor, secondaryAccent: NSColor) {
    let gateway = topRect(726, 206, 124, 120)
    fillRoundedRect(
        gateway,
        radius: 22,
        fill: color(hex: 0x081622, alpha: 0.84),
        stroke: color(hex: 0xffffff, alpha: 0.10)
    )
    drawCenteredText(
        "Gateway",
        rect: gateway,
        font: avenir(20, "Avenir Next Demi Bold"),
        color: color(hex: 0xf8fafc),
        alignment: .center,
        lineHeight: 1.0
    )

    let sources: [(CGFloat, CGFloat)] = [(666, 198), (666, 256), (666, 314)]
    for (index, (x, y)) in sources.enumerated() {
        fillRoundedRect(
            topRect(x, y, 42, 42),
            radius: 14,
            fill: color(hex: 0xffffff, alpha: 0.06),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        let dot = NSBezierPath(ovalIn: topRect(x + 13, y + 13, 16, 16))
        (index == 1 ? secondaryAccent : accent).setFill()
        dot.fill()
    }

    let models: [(String, CGFloat, CGFloat, CGFloat)] = [
        ("Small", 872, 190, 78),
        ("JSON", 872, 248, 78),
        ("Large", 872, 306, 78)
    ]
    for (name, x, y, width) in models {
        let cardRect = topRect(x, y, width, 42)
        fillRoundedRect(
            cardRect,
            radius: 14,
            fill: color(hex: 0xffffff, alpha: 0.06),
            stroke: color(hex: 0xffffff, alpha: 0.10)
        )
        drawCenteredText(
            name,
            rect: cardRect,
            font: avenir(15, "Avenir Next Demi Bold"),
            color: color(hex: 0xf8fafc),
            alignment: .center,
            lineHeight: 1.0
        )
    }

    let path = NSBezierPath()
    for y in [219.0, 277.0, 335.0] {
        path.move(to: topPoint(708, y))
        path.line(to: topPoint(726, y))
    }
    for y in [211.0, 269.0, 327.0] {
        path.move(to: topPoint(850, y))
        path.line(to: topPoint(872, y))
    }
    accent.setStroke()
    path.lineWidth = 4
    path.lineCapStyle = .round
    path.stroke()

    let limitRect = topRect(900, 144, 48, 48)
    fillRoundedRect(
        limitRect,
        radius: 14,
        fill: secondaryAccent.withAlphaComponent(0.14),
        stroke: secondaryAccent.withAlphaComponent(0.30)
    )
    drawCenteredText(
        "$",
        rect: limitRect,
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
    drawBackdropConstellation(accent: spec.accent, secondaryAccent: spec.secondaryAccent)

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

    fillRoundedRect(
        topRect(258, 456, 148, 4),
        radius: 2,
        fill: spec.accent.withAlphaComponent(0.70)
    )
    fillRoundedRect(
        topRect(414, 456, 42, 4),
        radius: 2,
        fill: spec.secondaryAccent.withAlphaComponent(0.42)
    )

    var chipX: CGFloat = 258
    for text in spec.chipText {
        let chipWidth = drawChip(text: text, x: chipX, y: 462, accent: spec.accent)
        chipX += chipWidth + 14
    }

    NSGraphicsContext.current?.saveGraphicsState()
    // Fit all right-side artwork into a consistent safe zone so it keeps similar padding
    // from the card edges instead of drifting into the right boundary.
    let artworkSourceRect = topRect(650, 132, 318, 288)
    let artworkSafeZone = topRect(644, 154, 286, 250)
    let artworkScale = min(
        artworkSafeZone.width / artworkSourceRect.width,
        artworkSafeZone.height / artworkSourceRect.height
    )
    let fittedWidth = artworkSourceRect.width * artworkScale
    let fittedHeight = artworkSourceRect.height * artworkScale
    let fittedRect = NSRect(
        x: artworkSafeZone.origin.x + (artworkSafeZone.width - fittedWidth) / 2,
        y: artworkSafeZone.origin.y + (artworkSafeZone.height - fittedHeight) / 2,
        width: fittedWidth,
        height: fittedHeight
    )

    drawArtworkPanel(in: fittedRect.insetBy(dx: -8, dy: -8), accent: spec.accent, secondaryAccent: spec.secondaryAccent)

    NSBezierPath(roundedRect: fittedRect, xRadius: 24, yRadius: 24).addClip()

    let artworkTransform = NSAffineTransform()
    artworkTransform.translateX(by: fittedRect.origin.x, yBy: fittedRect.origin.y)
    artworkTransform.scale(by: artworkScale)
    artworkTransform.translateX(by: -artworkSourceRect.origin.x, yBy: -artworkSourceRect.origin.y)
    artworkTransform.concat()

    spec.artwork()
    NSGraphicsContext.current?.restoreGraphicsState()

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
    ),
    CoverSpec(
        filename: "model-canary-releases.jpg",
        label: "Model Deployment",
        title: "Model Canary\nReleases",
        subtitle: "Use shadow traffic, rollout gates, and fast rollback paths to ship models without production surprises.",
        palette: [color(hex: 0x07111d), color(hex: 0x122235), color(hex: 0x183149)],
        accent: color(hex: 0x38bdf8),
        secondaryAccent: color(hex: 0xf59e0b),
        chipText: ["Shadow Traffic", "Promotion", "Rollback"],
        artwork: {
            drawCanaryArtwork(accent: color(hex: 0x38bdf8), secondaryAccent: color(hex: 0xf59e0b))
        }
    ),
    CoverSpec(
        filename: "ai-incident-response-runbooks.jpg",
        label: "AI Reliability",
        title: "AI Incident\nRunbooks",
        subtitle: "Triage latency spikes, bad outputs, retrieval failures, and serving incidents with repeatable response paths.",
        palette: [color(hex: 0x130d16), color(hex: 0x271329), color(hex: 0x3a182b)],
        accent: color(hex: 0xfb7185),
        secondaryAccent: color(hex: 0xf97316),
        chipText: ["Triage", "Dashboards", "Mitigation"],
        artwork: {
            drawIncidentArtwork(accent: color(hex: 0xfb7185), secondaryAccent: color(hex: 0xf97316))
        }
    ),
    CoverSpec(
        filename: "llm-gateway-architecture.jpg",
        label: "MLOps",
        title: "LLM Gateway\nArchitecture",
        subtitle: "Centralize routing, quotas, guardrails, and cost-aware fallbacks for shared model usage.",
        palette: [color(hex: 0x081018), color(hex: 0x0f2230), color(hex: 0x143746)],
        accent: color(hex: 0x22d3ee),
        secondaryAccent: color(hex: 0x34d399),
        chipText: ["Routing", "Rate Limits", "Cost Control"],
        artwork: {
            drawGatewayArtwork(accent: color(hex: 0x22d3ee), secondaryAccent: color(hex: 0x34d399))
        }
    )
]

for spec in specs {
    try autoreleasepool {
        try render(spec: spec, outputDir: outputDir)
    }
}
