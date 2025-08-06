# MacOS Emulator React Frontend

This project provides a full-featured React-powered MacOS emulator UI in the browser, including:

## Features

- Full MacOS-like desktop interface & styling, based on extracted style guide
- Menu bar, Dock, desktop background—faithfully mimicking MacOS
- Responsive window management: open/close/minimize/maximize/drag, with z-order
- Mission Control (F3): shows all open windows, pick one to focus
- Dark/light mode—automatic and in-app toggling, with smooth transitions
- Simulated app windows: Finder, Settings, Notes (demo UIs with React)
- Minimal CSS/JS dependencies—no external UI kit required

## Project Structure

- `src/components/` – Key UI/UX elements: MenuBar, Dock, Window, Desktop, MissionControl, ThemeContext
- `src/windows/` – Per-app demo window content (Finder, Settings, Notes)
- `src/icons/` – Inline SVG icons for Dock
- `src/util/` – Window state/initial data
- Styling follows extracted MacOS color palette and layout tokens

## Running Locally

In the project directory:

```
npm install
npm start
```

## Usage

- Drag windows, try minimize/maximize/close
- Switch dark/light mode via system menu or Settings app
- Use the Dock to open/switch apps; Mission Control (menu or icon) to overview all windows

See `src/` for detailed, well-commented code.

