import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol as PMTilesProtocol } from 'pmtiles';
import './style.css';

// Initialize PMTiles protocol (with error handling for environments where CDN is blocked)
try {
    let protocol = new PMTilesProtocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
} catch (error) {
    console.warn('PMTiles or MapLibre not available:', error.message);
    // Continue with initialization anyway for basic functionality
}

// Initialize the application
async function initializeApp() {
    try {
        const response = await fetch('style.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const baseStyle = await response.json();
        initializeMap(baseStyle);
    } catch (error) {
        console.error('Error loading style.json:', error);
        // Set up basic controls even if map fails to load
        setupControls();
    }
}

// Parse URL parameters for building highlighting
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Update building highlight by setting paint properties dynamically
function updateBuildingHighlight(map) {
    const buildingParam = getUrlParameter('building');
    const buildingIds = buildingParam ? buildingParam.split(',').map(id => id.trim()) : [];
    
    try {
        // Create color expression based on whether we have building IDs to highlight
        const colorExpression = buildingIds.length > 0 ? [
            "case",
            ["in", ["get", "id"], ["literal", buildingIds]],
            "#FFD700",
            ["has", "facade_color"],
            ["get", "facade_color"],
            ["has", "roof_color"],
            ["get", "roof_color"],
            "#D2B48C"
        ] : [
            "case",
            ["has", "facade_color"],
            ["get", "facade_color"],
            ["has", "roof_color"],
            ["get", "roof_color"],
            "#D2B48C"
        ];
        
        // Update both regular and 3D building layers
        const layers = ['buildings', 'building-parts', 'buildings-3d', 'building-parts-3d'];
        layers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                // For 3D layers, update fill-extrusion-color
                if (layerId.includes('-3d')) {
                    map.setPaintProperty(layerId, 'fill-extrusion-color', colorExpression);
                } else {
                    // For 2D layers, update fill-color
                    map.setPaintProperty(layerId, 'fill-color', colorExpression);
                }
            }
        });
        
        if (buildingIds.length > 0) {
            console.log('Highlighting buildings:', buildingIds);
        }
    } catch (error) {
        console.warn('Could not update building highlight:', error);
    }
}

// Start the application
initializeApp();

function setupControls() {
    // Hamburger Menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const terrainControls = document.getElementById('terrain-controls');
    const closeControls = document.getElementById('close-controls');
    
    function toggleMenu() {
        const isOpen = terrainControls.classList.contains('show');
        
        if (isOpen) {
            terrainControls.classList.remove('show');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            terrainControls.classList.add('show');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (closeControls) {
        closeControls.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (terrainControls.classList.contains('show') && 
            !terrainControls.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            toggleMenu();
        }
    });

    // Preset configurations
    const presets = {
        natural: {
            shadow: '#473B24',
            highlight: '#F4E8C1', 
            accent: '#8a7f6e'
        },
        enhanced: {
            shadow: '#2a2419',
            highlight: '#fff3d4',
            accent: '#7a6f5e'
        },
        subtle: {
            shadow: '#5a4f3a',
            highlight: '#f0e7d0',
            accent: '#9a8f7e'
        }
    };

    function applyPreset(presetName) {
        const preset = presets[presetName];
        if (!preset) return;
        
        // Update map properties if map and hillshade layer exist
        if (window.map && window.map.getLayer && window.map.getLayer('hillshade')) {
            try {
                window.map.setPaintProperty('hillshade', 'hillshade-shadow-color', preset.shadow);
                window.map.setPaintProperty('hillshade', 'hillshade-highlight-color', preset.highlight);
                window.map.setPaintProperty('hillshade', 'hillshade-accent-color', preset.accent);
                console.log('Applied preset:', presetName, preset);
            } catch (error) {
                console.warn('Failed to apply preset:', presetName, error);
            }
        } else {
            console.warn('Map or hillshade layer not ready yet for preset:', presetName);
        }
    }

    // Preset button event delegation - more efficient than individual listeners
    document.querySelector('.preset-buttons').addEventListener('click', (event) => {
        const button = event.target;
        if (button.tagName === 'BUTTON' && button.id.startsWith('preset-')) {
            const presetName = button.id.replace('preset-', '');
            applyPreset(presetName);
        }
    });
}

function initializeMap(style) {
    // Create the MapLibre GL JS map
    window.map = new maplibregl.Map({
        container: 'map',
        style: style,
        hash: true,
        antialias: true,
        maxPitch: 85
    });

    // Add navigation control (zoom, compass, and 3D pitch toggle)
    window.map.addControl(new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
    }));

    // Add geolocation control (user's current location)
    window.map.addControl(new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));

    window.map.addControl(new maplibregl.GlobeControl());
    
    // Add scale bar control
    // Provides metric distance reference for users to understand terrain scale
    window.map.addControl(new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
    }));

    // Properties panel
    let propertiesPanel = document.getElementById('properties-panel');
    let propertiesContent = document.getElementById('properties-content');
    let closePanel = document.getElementById('close-panel');

    closePanel.addEventListener('click', () => {
        propertiesPanel.style.display = 'none';
    });

    function showPropertiesPanel(features) {
        propertiesContent.innerHTML = '';
        
        features.forEach((feature, index) => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'feature-item';
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'feature-header';
            headerDiv.textContent = `${feature.sourceLayer || 'Feature'} (${feature.geometry.type})`;
            headerDiv.onclick = () => {
                const props = featureDiv.querySelector('.feature-properties');
                props.classList.toggle('collapsed');
            };
            
            const propsDiv = document.createElement('div');
            propsDiv.className = 'feature-properties';
            
            if (feature.properties && Object.keys(feature.properties).length > 0) {
                propsDiv.textContent = JSON.stringify(feature.properties, null, 2);
            } else {
                propsDiv.textContent = 'No properties';
            }
            
            featureDiv.appendChild(headerDiv);
            featureDiv.appendChild(propsDiv);
            propertiesContent.appendChild(featureDiv);
        });
        
        propertiesPanel.style.display = 'block';
    }
    
    window.map.on('click', (e) => {
        const features = window.map.queryRenderedFeatures(e.point);
        
        if (features.length > 0) {
            // Single-tap shows properties on both mobile and desktop
            showPropertiesPanel(features);
        } else {
            propertiesPanel.style.display = 'none';
        }
    });

    // Enable terrain when map loads
    window.map.on('load', () => {
        setTerrainFromSource('mapterhorn-terrain');
        updateBuildingHighlight(window.map); // Initialize building highlighting
        console.log('Mapterhorn Terrain Visualization initialized');
        console.log('Data source: https://tunnel.optgeo.org/martin/mapterhorn');
        console.log('Encoding: Terrarium format');
    });

    // Utility functions for terrain management
    function setTerrainFromSource(source = 'mapterhorn-terrain') {
        if (window.map) {
            window.map.setTerrain({
                source: source,
                exaggeration: 1.0
            });
        }
    }

    function updateHillshadeLayer(sourceId) {
        try {
            if (window.map.getLayer('hillshade')) {
                window.map.removeLayer('hillshade');
            }
            if (window.map.getSource('hillshade')) {
                window.map.removeSource('hillshade');
            }
            
            // Re-add hillshade with new dedicated source
            window.map.addLayer({
                "id": "hillshade",
                "type": "hillshade",
                "source": sourceId,
                "paint": {
                    "hillshade-shadow-color": "#473B24",
                    "hillshade-highlight-color": "#F4E8C1",
                    "hillshade-accent-color": "#8a7f6e",
                    "hillshade-illumination-direction": 315,
                    "hillshade-exaggeration": 1.0
                }
            }, 'roads_tunnels_other_casing');
        } catch (error) {
            console.warn('Could not update hillshade:', error);
        }
    }

    // Consolidated control handlers using event delegation where possible
    const controlsContainer = document.getElementById('terrain-controls');
    controlsContainer.addEventListener('change', function(event) {
        const target = event.target;
        
        switch(target.id) {
            case 'terrain':
                if (target.checked) {
                    setTerrainFromSource('mapterhorn-terrain');
                } else {
                    window.map.setTerrain(null);
                }
                break;
                
            case 'terrain-source':
                const source = target.value;
                const terrainSource = source === 'gel' ? 'gel-terrain' : 'mapterhorn-terrain';
                const hillshadeSource = source === 'gel' ? 'gel-hillshade' : 'mapterhorn-hillshade';
                
                setTerrainFromSource(terrainSource);
                updateHillshadeLayer(hillshadeSource);
                break;
                
            case 'hillshade':
                const visibility = target.checked ? 'visible' : 'none';
                window.map.setLayoutProperty('hillshade', 'visibility', visibility);
                break;
        }
    });
    
    // Set up hillshade controls after map is initialized
    setupControls();
}