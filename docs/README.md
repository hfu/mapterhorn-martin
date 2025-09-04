# Mapterhorn Terrain Visualization Documentation

This directory contains the Web-based terrain visualization implementation using Mapterhorn elevation data.

## Files Overview

### `index.html` (Main Demo)
The primary demonstration page showcasing the Mapterhorn terrain visualization concept. Features:
- Visual design demonstrating the terrain visualization interface
- Technical specifications and feature overview
- Ready for MapLibre GL JS integration when external libraries are accessible

### `index-interactive.html` (Interactive Version)
Full interactive implementation with MapLibre GL JS integration. Features:
- Real-time 3D terrain rendering using Mapterhorn data
- Interactive controls for terrain exaggeration
- Hillshade effects toggle
- Multiple predefined viewpoints (Matterhorn summit, Zermatt, Glacier views)
- Navigation controls

### `terrain-implementation.js` (Technical Implementation)
Complete technical implementation module containing:
- MapLibre GL JS style configuration for Mapterhorn terrain
- Terrain control classes and utilities
- Predefined scenic viewpoints
- Modular code for integration

## Data Source

**URL:** `https://tunnel.optgeo.org/martin/mapterhorn`

**Specifications:**
- **Tile Size:** 512px
- **Encoding:** Terrarium
- **Data Type:** Raster DEM (Digital Elevation Model)
- **Focus Area:** Matterhorn region (7.7461°E, 46.0382°N)

## Features Implemented

### 🏔️ 3D Terrain Rendering
- Real-time elevation display with configurable exaggeration (0.5x - 3.0x)
- Smooth terrain transitions and WebGL-accelerated rendering
- Interactive camera controls (pan, zoom, pitch, bearing)

### 🌄 Hillshade Effects
- Dynamic shadow and highlight rendering for terrain relief
- Configurable illumination direction and intensity
- Toggle visibility for comparison views

### 📍 Interactive Navigation
- **Reset View:** Default Matterhorn overview
- **Matterhorn Summit:** Close-up view of the peak
- **Zermatt Valley:** Valley perspective view
- **Glacier View:** Glacial terrain focus

### 🗺️ Map Layers
- Base topographic data from Protomaps
- Terrain-appropriate land cover styling
- Road networks for spatial reference
- Place name labels

## Technical Stack

- **MapLibre GL JS 5.6.1** - WebGL-based map rendering
- **Mapterhorn Terrain Tiles** - High-resolution elevation data
- **Terrarium Encoding** - Efficient elevation data compression
- **WebGL** - Hardware-accelerated 3D rendering
- **Vanilla JavaScript** - No additional framework dependencies

## Browser Requirements

- Modern browser with WebGL support
- Recommended: Chrome 80+, Firefox 75+, Safari 14+
- Internet connection for tile data loading

## Usage

1. **Basic Demo:** Open `index.html` for the conceptual overview
2. **Interactive Map:** Open `index-interactive.html` for full functionality
3. **Development:** Import `terrain-implementation.js` for custom integration

## Development Notes

The implementation follows the project requirements:
- Uses Mapterhorn terrain data as specified
- Similar approach to hfu/glob but with Mapterhorn data source
- Single-file approach similar to hfu/autopilot
- Focused on Matterhorn region visualization
- Includes credit to Mapterhorn project and X-24B inspiration

## Credits

- **Mapterhorn Project** - Terrain tile data
- **X-24B (Martin Company)** - Project name inspiration
- **Protomaps** - Base map data
- **OpenStreetMap** - Geographic data source