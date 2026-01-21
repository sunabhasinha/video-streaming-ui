# Screen Share Annotation Tool (Frontend)

A frontend-only application that allows users to share their screen and annotate
over it in real-time. Built with a custom Webpack configuration, React, and
Redux-Saga, emphasizing scalable architecture and performance.

## 🚀 Features

- **Screen Sharing:** Low-latency screen streaming using the `MediaDevices` API.
- **Real-time Annotation:** Draw over any shared screen/window using a
  transparent canvas overlay.
- **Drawing Tools:**
  - **Pen:** Customizable color and stroke width.
  - **Eraser:** Removes specific strokes.
  - **Undo:** "Time-travel" capability to undo the last action.
- **Responsive Architecture:** Canvas coordinates are normalized, ensuring
  drawings stay aligned even if the browser window is resized.
- **State Management:** Complete separation of concerns using Redux for state
  and Redux-Saga for side effects (media handling).

## 🛠️ Tech Stack

- **Core:** React 18, HTML5 Canvas
- **State Management:** Redux, React-Redux
- **Side Effects:** Redux-Saga (for handling async streams and permissions)
- **Build Tooling:** Custom Webpack 5 & Babel setup (No `create-react-app`)
- **Styling:** CSS Modules / Standard CSS

## ⚙️ Setup & Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Start Development Server**

    ```bash
    npm start
    ```

    - The app will open at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    ```
    - Output files will be generated in the `/dist` folder.

## 🏗️ Architectural Decisions

### 1. Canvas Layering Strategy ("The Sandwich")

To enable drawing _over_ a video stream without affecting the video data itself,
I implemented a layering strategy:

- **Layer 1 (Bottom):** The `<video>` element displaying the `MediaStream`.
- **Layer 2 (Top):** The `<canvas>` element, absolutely positioned to strictly
  match the video's dimensions.
- **Result:** The user sees a unified interface, but the drawing logic is
  decoupled from the media rendering.

### 2. Handling Resizing (Coordinate Normalization)

A common challenge in canvas apps is "drifting annotations" when the window
resizes.

- **Problem:** Storing coordinates as raw pixels (e.g., `x: 400`) causes
  misalignment when the video scales down.
- **Solution:** I implemented a **Normalization Engine**.
  - **Input:** User clicks at `400px` on an `800px` wide screen.
  - **Storage:** We store `x: 0.5` (50%) in Redux.
  - **Render:** On every render/resize, we calculate `currentWidth * 0.5`.
  - **Benefit:** Annotations are fully responsive and maintain their relative
    position on any screen size.

### 3. Redux-Saga for Side Effects

Instead of cluttering UI components with API calls (`navigator.mediaDevices`), I
moved all "impure" logic to Sagas.

- **Component:** Dispatches `START_SHARE_REQUEST`.
- **Saga:** Intercepts the action, calls the browser API, handles permission
  errors, and dispatches `START_SHARE_SUCCESS`.
- **Benefit:** This makes the components pure, easier to test, and prevents
  "zombie" streams (streams that stay alive after the component unmounts).
