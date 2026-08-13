import AppKit
import Foundation

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: stitch.swift <tile-dir> <output.png>\n", stderr)
    exit(2)
}

let tileDir = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]
let width = 4000
let height = 5588

guard let bitmap = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: width,
    pixelsHigh: height,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
) else {
    fatalError("Unable to create output bitmap")
}

guard let graphics = NSGraphicsContext(bitmapImageRep: bitmap) else {
    fatalError("Unable to create graphics context")
}

let tiles: [(String, CGFloat, CGFloat)] = [
    ("tile-0-0.svg.png", 0, 0),
    ("tile-0-1.svg.png", 2000, 0),
    ("tile-1-0.svg.png", 0, 2000),
    ("tile-1-1.svg.png", 2000, 2000),
    ("tile-2-0.svg.png", 0, 3588),
    ("tile-2-1.svg.png", 2000, 3588),
]

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = graphics
NSColor.white.setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()

for (file, x, topY) in tiles {
    let path = URL(fileURLWithPath: tileDir).appendingPathComponent(file).path
    guard let image = NSImage(contentsOfFile: path) else {
        fatalError("Unable to load tile: \(path)")
    }
    let y = CGFloat(height) - topY - 2000
    image.draw(
        in: NSRect(x: x, y: y, width: 2000, height: 2000),
        from: NSRect(origin: .zero, size: image.size),
        operation: .sourceOver,
        fraction: 1.0
    )
}

graphics.flushGraphics()
NSGraphicsContext.restoreGraphicsState()

guard let data = bitmap.representation(using: .png, properties: [:]) else {
    fatalError("Unable to encode PNG")
}
try data.write(to: URL(fileURLWithPath: outputPath))
