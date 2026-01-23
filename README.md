# Genea Annotation Tool

A professional, frontend-only screen sharing application that allows real-time
annotation over a video stream. Built with React, Redux-Saga, and the native
Media Devices API, focusing on performance, scalability, and clean architecture.

## 🧩 Architecture & Data Flow
<img width="1095" height="534" alt="Screenshot 2026-01-23 at 12 11 33 PM" src="https://github.com/user-attachments/assets/1cf662df-452f-4f78-b620-c9d600198d66" />

## 🚀 Features

- **Screen Sharing:** Low-latency streaming via
  `navigator.mediaDevices.getDisplayMedia`.
- **Advanced Annotation:**
  - **Tools:** Pen, Highlighter (transparent), Eraser, Rectangle, Arrow.
  - **Styles:** Customizable stroke color and width.
  - **Modes:** Toggle between "View Mode" (interact with screen) and "Draw Mode"
    (annotate).
- **Smart Features:**
  - **Undo/Clear:** Full state history management.
  - **Snapshots:** Export the combined video + canvas frame as a PNG.
  - **Shortcuts:** Press `d` to toggle annotation mode.
- **Responsive:** Vector-based scaling ensures drawings stay aligned when the
  window resizes.

## 🛠️ Tech Stack

- **Core:** React 18
- **State Management:** Redux (Global State) + Redux-Saga (Side Effects/Async)
- **Graphics:** HTML5 Canvas API (2D Context)
- **Build System:** Custom Webpack 5 Configuration (No `create-react-app`)
- **Styling:** CSS Modules, Glassmorphism UI, React Icons

## ⚙️ Setup & Installation

This project is self-contained and requires no backend server.

1.  **Clone the Repository**

    ```bash
    git clone [repository-url](https://github.com/sunabhasinha/video-streaming-ui.git)
    cd video-streaming-ui
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Start Development Server**

    ```bash
    npm start
    ```

    - The application will launch at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    ```
    - Optimized assets will be generated in the `/dist` folder.

## 🎨 Canvas Layering & Scaling Approach

To achieve high-performance annotation without altering the video stream, I
implemented a **"Sandwich Architecture"**:

### 1. The Layering Strategy

We use CSS absolute positioning to stack two distinct elements:

- **Bottom Layer (`z-index: 1`):** The `<video>` element rendering the live
  `MediaStream`.
- **Top Layer (`z-index: 2`):** A transparent `<canvas>` element.

This decouples the rendering logic. The video plays natively while the canvas
handles the graphics. A "Pointer Events" toggle (`pointer-events: none`) allows
clicks to pass through to the video layer when "View Mode" is active.

### 2. The Scaling Strategy (Normalized Coordinates)

A common challenge in canvas apps is "drifting annotations" during window
resizing.

- **Problem:** Storing coordinates as pixels (e.g., `x: 500`) breaks when the
  video shrinks to `400px` width.
- **Solution:** I implemented a **Coordinate Normalization Engine**
  (`src/utils/canvasMath.js`).
  - **Input:** When a user draws, we convert pixels to **percentages** (0.0 to
    1.0) relative to the container size.
  - **Storage:** Redux stores these normalized points (`x: 0.5`, `y: 0.5`).
  - **Render:** On every frame/resize, the `CanvasRenderer` calculates the
    actual pixel position based on the _current_ container dimensions
    (`x = 0.5 * currentWidth`).
- **Result:** Annotations scale geometrically and remain perfectly anchored to
  their video content on any screen size.

## 🏗️ Key Architectural Decisions

### 1. Separation of Logic vs. UI (Custom Hooks)

I extracted the complex canvas logic into `useCanvas.js`.

- **Benefit:** The UI component (`CanvasOverlay.jsx`) is thin and declarative.
  The math (`canvasMath.js`) and rendering (`canvasRenderer.js`) are pure
  functions, making them unit-testable and reusable.

### 2. Performance Optimization (Ref Pattern)

React's `useState` triggers a re-render on every update. For drawing (which
fires ~60 events per second), this causes lag ("jank").

- **Decision:** I used `useRef` to store the high-frequency mouse coordinates
  during a stroke.
- **Result:** The component **does not re-render** while drawing. We only
  dispatch to Redux once the stroke is finished (Mouse Up), ensuring 60 FPS
  performance even on lower-end devices.

### 3. Redux-Saga for Side Effects

Handling media streams and timers (for disappearing ink) inside React components
leads to "zombie" streams and memory leaks.

- **Decision:** All "impure" actions are handled by Sagas.
- **Example:** When `START_SHARE_REQUEST` is dispatched, a Saga calls
  `navigator.mediaDevices`, handles permission errors, and safely stores the
  stream. This keeps the UI pure and predictable.

### 4. Component Composition

The Toolbar is broken down into atomic, reusable units (`ToolbarButton`,
`ToggleSwitch`).

- **Benefit:** Consistent styling, centralized accessibility logic
  (`aria-labels`, tooltips), and easier maintenance.

```

```
