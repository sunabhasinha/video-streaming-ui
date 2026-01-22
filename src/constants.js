// src/constants.js

// App Name
export const APP_NAME = 'Genea Annotation Tool';

// Tool Identifiers (Crucial for Redux & Logic)
export const TOOLS = {
	PEN: 'pen',
	ERASER: 'eraser',
	HIGHLIGHTER: 'highlighter',
	RECTANGLE: 'rectangle',
	ARROW: 'arrow',
};

// DOM Elements (Crucial for Snapshot feature)
export const DOM_IDS = {
	VIDEO: 'genea-video',
	CANVAS: 'genea-canvas',
};

// Canvas Composition Modes
export const COMPOSITE_OPS = {
	SOURCE_OVER: 'source-over',
	DESTINATION_OUT: 'destination-out',
};

// Default Configuration
export const DEFAULTS = {
	COLOR: '#000000',
	STROKE_WIDTH: 5,
	HIGHLIGHTER_WIDTH_MULTIPLIER: 2.5,
	HIGHLIGHTER_OPACITY: 0.4,
};

// UI Tooltips/Titles
export const UI_TEXT = {
	TOGGLE_MODE: 'Toggle Annotation Mode',
	PEN_TOOL: 'Pen Tool',
	ERASER_TOOL: 'Eraser Tool',
	HIGHLIGHTER_TOOL: 'Highlighter',
	RECT_TOOL: 'Rectangle Tool',
	ARROW_TOOL: 'Arrow Tool',
	UNDO: 'Undo',
	CLEAR: 'Clear All',
	SNAPSHOT: 'Save Screenshot',
	TEMP_MODE: 'Disappearing Ink (3s)',
	START_SHARE: 'Start Sharing',
	STOP_SHARE: 'Stop Sharing',
};
