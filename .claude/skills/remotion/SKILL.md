---
name: remotion
description: Generate walkthrough videos from Stitch projects using Remotion with smooth transitions, zooming, and text overlays
---

# Stitch to Remotion Walkthrough Videos

You are a video production specialist focused on creating engaging walkthrough videos from app designs. You combine Stitch's screen retrieval capabilities with Remotion's programmatic video generation to produce smooth, professional presentations.

## Overview

This skill enables you to create walkthrough videos that showcase app screens with professional transitions, zoom effects, and contextual text overlays.

## Prerequisites

**Required:**
- Node.js and npm installed
- A Stitch project with designed screens

**Recommended:**
- Familiarity with Remotion's video capabilities
- Understanding of React components (Remotion uses React)

## Video Composition Strategy

### Architecture

Create a modular Remotion composition with these components:

1. **`ScreenSlide.tsx`** - Individual screen display component
   - Props: `imageSrc`, `title`, `description`, `width`, `height`
   - Features: Zoom-in animation, fade transitions
   - Duration: Configurable (default 3-5 seconds per screen)

2. **`WalkthroughComposition.tsx`** - Main video composition
   - Sequences multiple `ScreenSlide` components
   - Handles transitions between screens
   - Adds text overlays and annotations

3. **`config.ts`** - Video configuration
   - Frame rate (default: 30 fps)
   - Video dimensions
   - Total duration calculation

### Transition Effects

Use Remotion's `@remotion/transitions` for professional effects:

- **Fade**: Smooth cross-fade between screens
- **Slide**: Directional slide transitions
- **Zoom**: Zoom in/out effects for emphasis

### Text Overlays

Add contextual information using Remotion's text rendering:

1. **Screen titles**: Display at the top or bottom of each frame
2. **Feature callouts**: Highlight specific UI elements with animated pointers
3. **Descriptions**: Fade in descriptive text for each screen
4. **Progress indicator**: Show current screen position in walkthrough

## Execution Steps

### Step 1: Gather Screen Assets

1. Identify target Stitch project
2. List all screens in the project
3. Download screenshots for each screen
4. Organize in order of walkthrough flow
5. Create a manifest file (`screens.json`):

```json
{
  "projectName": "Calculator App",
  "screens": [
    {
      "id": "1",
      "title": "Home Screen",
      "description": "Main calculator interface with number pad",
      "imagePath": "assets/screens/home.png",
      "width": 1200,
      "height": 800,
      "duration": 4
    },
    {
      "id": "2",
      "title": "History View",
      "description": "View of previous calculations",
      "imagePath": "assets/screens/history.png",
      "width": 1200,
      "height": 800,
      "duration": 3
    }
  ]
}
```

### Step 2: Set Up Remotion Project

1. **Check for existing Remotion project**:
   - Look for `remotion.config.ts` or `package.json` with Remotion dependencies

2. **Create new Remotion project** (if needed):
   ```bash
   npm create video@latest -- --blank
   ```
   - Choose TypeScript template
   - Set up in a dedicated `video/` directory

3. **Install dependencies**:
   ```bash
   cd video
   npm install @remotion/transitions @remotion/animated-emoji
   ```

### Step 3: Generate Remotion Components

Create the video components following Remotion best practices:

1. **Create `ScreenSlide.tsx`**:
   - Use `useCurrentFrame()` and `spring()` for animations
   - Implement zoom and fade effects
   - Add text overlays with proper timing

```typescript
// ScreenSlide.tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface ScreenSlideProps {
  readonly imageSrc: string;
  readonly title: string;
  readonly description: string;
  readonly duration: number;
}

export function ScreenSlide({ imageSrc, title, description, duration }: ScreenSlideProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 }
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div className="relative w-full h-full bg-white">
      <img
        src={imageSrc}
        className="w-full h-full object-cover"
        style={{ transform: `scale(${scale})` }}
      />
      <div className="absolute bottom-8 left-8 right-8" style={{ opacity }}>
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">{title}</h2>
        <p className="text-lg text-white/80 drop-shadow-md">{description}</p>
      </div>
    </div>
  );
}
```

2. **Create `WalkthroughComposition.tsx`**:
   - Import screen manifest
   - Sequence screens with `<Sequence>` components
   - Apply transitions between screens

```typescript
// WalkthroughComposition.tsx
import { Composition, Sequence } from "remotion";
import { ScreenSlide } from "./ScreenSlide";
import screens from "../screens.json";

export function WalkthroughComposition() {
  let currentFrame = 0;

  return (
    <div className="w-full h-full">
      {screens.screens.map((screen, index) => {
        const startFrame = currentFrame;
        currentFrame += screen.duration * 30; // 30 fps

        return (
          <Sequence key={screen.id} from={startFrame} durationInFrames={screen.duration * 30}>
            <ScreenSlide
              imageSrc={screen.imagePath}
              title={screen.title}
              description={screen.description}
              duration={screen.duration}
            />
          </Sequence>
        );
      })}
    </div>
  );
}
```

### Step 4: Preview and Refine

1. **Start Remotion Studio**:
   ```bash
   npm run dev
   ```
   - Opens browser-based preview
   - Allows real-time editing and refinement

2. **Adjust timing**:
   - Ensure each screen has appropriate display duration
   - Verify transitions are smooth
   - Check text overlay timing

### Step 5: Render Video

1. **Render using Remotion CLI**:
   ```bash
   npx remotion render WalkthroughComposition output.mp4
   ```

2. **Optimization options**:
   - Set quality level (`--quality`)
   - Configure codec (`--codec h264` or `h265`)
   - Enable parallel rendering (`--concurrency`)

## Advanced Features

### Interactive Hotspots

Highlight clickable elements or important features:

```typescript
import { interpolate, useCurrentFrame, spring } from 'remotion';

interface HotspotProps {
  readonly x: number;
  readonly y: number;
  readonly label: string;
}

export function Hotspot({ x, y, label }: HotspotProps) {
  const frame = useCurrentFrame();
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 10, stiffness: 100 }
  });

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `scale(${scale})`
    }}>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
  );
}
```

## File Structure

```
project/
├── video/                      # Remotion project directory
│   ├── src/
│   │   ├── WalkthroughComposition.tsx
│   │   ├── ScreenSlide.tsx
│   │   └── components/
│   │       ├── Hotspot.tsx
│   │       └── TextOverlay.tsx
│   ├── public/
│   │   └── assets/
│   │       └── screens/        # Downloaded screenshots
│   │           ├── home.png
│   │           └── history.png
│   ├── remotion.config.ts
│   └── package.json
├── screens.json                # Screen manifest
└── output.mp4                  # Rendered video
```

## Common Patterns

### Pattern 1: Simple Slide Show
- 3-5 seconds per screen
- Cross-fade transitions
- Bottom text overlay with screen title
- Progress bar at top

### Pattern 2: Feature Highlight
- Zoom into specific regions
- Animated circles/arrows pointing to features
- Slow-motion emphasis on key interactions

### Pattern 3: User Flow
- Sequential screen flow with directional slides
- Numbered steps overlay
- Highlight user actions (clicks, taps)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Blurry screenshots** | Ensure downloaded images are at full resolution |
| **Misaligned text** | Verify screen dimensions match composition size |
| **Choppy animations** | Increase frame rate to 60fps; use proper spring configurations |
| **Remotion build fails** | Check Node version compatibility; ensure all dependencies are installed |

## Best Practices

1. **Maintain aspect ratio**: Use actual screen dimensions or scale proportionally
2. **Consistent timing**: Keep screen display duration consistent unless emphasizing specific screens
3. **Readable text**: Ensure sufficient contrast; use appropriate font sizes
4. **Smooth transitions**: Use spring animations for natural motion
5. **Preview thoroughly**: Always preview in Remotion Studio before final render
