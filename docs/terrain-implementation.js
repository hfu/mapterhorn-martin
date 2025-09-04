/**
 * Mapterhorn Terrain Visualization Implementation
 * 
 * This file contains the complete MapLibre GL JS implementation for 
 * 3D terrain visualization using Mapterhorn elevation data.
 * 
 * Data source: https://tunnel.optgeo.org/martin/mapterhorn
 * Specifications:
 * - tileSize: 512
 * - encoding: terrarium
 * - Focus area: Matterhorn (7.7461°E, 46.0382°N)
 */

// MapLibre GL JS Style with Mapterhorn Terrain
const mapterhornTerrainStyle = {
    "version": 8,
    "sources": {
        // Base map from protomaps
        "protomaps": {
            "type": "vector",
            "attribution": "<a href=\"https://github.com/protomaps/basemaps\">Protomaps</a> © <a href=\"https://openstreetmap.org\">OpenStreetMap</a>",
            "url": "https://tunnel.optgeo.org/martin/protomaps-basemap"
        },
        // Mapterhorn terrain data for 3D elevation
        "mapterhorn-terrain": {
            "type": "raster-dem",
            "url": "https://tunnel.optgeo.org/martin/mapterhorn",
            "tileSize": 512,
            "encoding": "terrarium"
        },
        // Mapterhorn data for hillshade effects
        "mapterhorn-hillshade": {
            "type": "raster-dem", 
            "url": "https://tunnel.optgeo.org/martin/mapterhorn",
            "tileSize": 512,
            "encoding": "terrarium"
        }
    },
    // Enable 3D terrain with exaggeration
    "terrain": {
        "source": "mapterhorn-terrain",
        "exaggeration": 1.5
    },
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#f0f0f0"
            }
        },
        // Hillshade layer for terrain relief visualization
        {
            "id": "hillshade",
            "type": "hillshade",
            "source": "mapterhorn-hillshade",
            "paint": {
                "hillshade-shadow-color": "#473B24",
                "hillshade-highlight-color": "#ffffff",
                "hillshade-accent-color": "#5d4a1f",
                "hillshade-illumination-direction": 315,
                "hillshade-illumination-anchor": "map",
                "hillshade-exaggeration": 0.8
            }
        },
        // Base earth layer
        {
            "id": "earth",
            "type": "fill",
            "filter": ["==", "$type", "Polygon"],
            "source": "protomaps",
            "source-layer": "earth",
            "paint": {
                "fill-color": "#e2dfda",
                "fill-opacity": 0.8
            }
        },
        // Land cover with terrain-appropriate colors
        {
            "id": "landcover",
            "type": "fill",
            "source": "protomaps",
            "source-layer": "landcover",
            "paint": {
                "fill-color": [
                    "match",
                    ["get", "kind"],
                    "glacier", "#ffffff",
                    "rock", "#8b7d6b", 
                    "scree", "#a0a0a0",
                    "grassland", "#c8d8c8",
                    "forest", "#6b8e3b",
                    "#e2dfda"
                ],
                "fill-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8, 0.6,
                    12, 0.8
                ]
            }
        },
        // Water bodies
        {
            "id": "water",
            "type": "fill",
            "filter": ["==", "$type", "Polygon"],
            "source": "protomaps",
            "source-layer": "water", 
            "paint": {
                "fill-color": "#4a9eff",
                "fill-opacity": 0.8
            }
        },
        // Roads for reference
        {
            "id": "roads",
            "type": "line",
            "source": "protomaps",
            "source-layer": "roads",
            "filter": ["==", "kind", "highway"],
            "paint": {
                "line-color": "#ffffff",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    6, 0.5,
                    12, 2,
                    18, 8
                ]
            }
        },
        // Place labels
        {
            "id": "places",
            "type": "symbol",
            "source": "protomaps",
            "source-layer": "places",
            "filter": ["==", "kind", "locality"],
            "layout": {
                "text-field": ["get", "name"],
                "text-font": ["Noto Sans Regular"],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8, 10,
                    12, 14
                ]
            },
            "paint": {
                "text-color": "#2d2d2d",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2
            }
        }
    ],
    "sprite": "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    "glyphs": "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf"
};

// Map initialization with terrain focus
function initializeMapterhornMap(containerId) {
    const map = new maplibregl.Map({
        container: containerId,
        style: mapterhornTerrainStyle,
        center: [7.7461, 46.0382], // Matterhorn coordinates
        zoom: 12,
        pitch: 60,
        bearing: 0,
        antialias: true,
        hash: true
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
    }));

    // Add terrain control
    map.addControl(new maplibregl.TerrainControl({
        source: 'mapterhorn-terrain',
        exaggeration: 1.5
    }));

    // Set terrain when map loads
    map.on('load', () => {
        map.setTerrain({
            source: 'mapterhorn-terrain',
            exaggeration: 1.5
        });
    });

    return map;
}

// Terrain control functions
class MapterhornTerrainControls {
    constructor(map) {
        this.map = map;
        this.currentExaggeration = 1.5;
        this.hillshadeVisible = true;
        this.terrainEnabled = true;
    }

    // Update terrain exaggeration
    setExaggeration(value) {
        this.currentExaggeration = value;
        if (this.terrainEnabled) {
            this.map.setTerrain({
                source: 'mapterhorn-terrain',
                exaggeration: value
            });
        }
    }

    // Toggle hillshade visibility
    toggleHillshade() {
        this.hillshadeVisible = !this.hillshadeVisible;
        const visibility = this.hillshadeVisible ? 'visible' : 'none';
        this.map.setLayoutProperty('hillshade', 'visibility', visibility);
    }

    // Toggle 3D terrain
    toggleTerrain() {
        this.terrainEnabled = !this.terrainEnabled;
        if (this.terrainEnabled) {
            this.map.setTerrain({
                source: 'mapterhorn-terrain',
                exaggeration: this.currentExaggeration
            });
        } else {
            this.map.setTerrain(null);
        }
    }

    // Fly to Matterhorn summit
    flyToMatterhorn() {
        this.map.flyTo({
            center: [7.7462, 45.9763], // Matterhorn summit coordinates
            zoom: 15,
            pitch: 75,
            bearing: 25,
            duration: 3000
        });
    }

    // Reset to default view
    resetView() {
        this.map.flyTo({
            center: [7.7461, 46.0382],
            zoom: 12,
            pitch: 60,
            bearing: 0,
            duration: 2000
        });
    }

    // Add contour lines (requires additional source)
    addContourLines() {
        // This would require a separate contour line source
        // Implementation depends on available contour data
        console.log('Contour lines functionality ready for implementation');
    }
}

// Predefined scenic viewpoints around Matterhorn
const matterhornViewpoints = {
    summit: {
        name: "Matterhorn Summit",
        center: [7.7462, 45.9763],
        zoom: 15,
        pitch: 75,
        bearing: 25
    },
    zermatt: {
        name: "Zermatt Valley",
        center: [7.7461, 46.0278],
        zoom: 13,
        pitch: 50,
        bearing: 180
    },
    overview: {
        name: "Regional Overview", 
        center: [7.7461, 46.0382],
        zoom: 10,
        pitch: 45,
        bearing: 0
    },
    glacier: {
        name: "Glacier View",
        center: [7.7580, 45.9850],
        zoom: 14,
        pitch: 60,
        bearing: 90
    }
};

// Utility function to fly to viewpoint
function flyToViewpoint(map, viewpointKey) {
    const viewpoint = matterhornViewpoints[viewpointKey];
    if (viewpoint) {
        map.flyTo({
            center: viewpoint.center,
            zoom: viewpoint.zoom,
            pitch: viewpoint.pitch,
            bearing: viewpoint.bearing,
            duration: 3000
        });
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mapterhornTerrainStyle,
        initializeMapterhornMap,
        MapterhornTerrainControls,
        matterhornViewpoints,
        flyToViewpoint
    };
}