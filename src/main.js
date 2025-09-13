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

// Load the base style from external JSON file
fetch('style.json')
.then(response => response.json())
.then(baseStyle => {
    // Initialize map with the complete style
    initializeMap(baseStyle);
})
.catch(error => {
    console.error('Error loading style.json:', error);
    // Set up basic controls even if map fails to load
    setupControls();
});

function setupControls() {
    // Illumination direction control
    document.getElementById('illumination-direction').addEventListener('input', function() {
        const direction = parseInt(this.value);
        document.getElementById('direction-value').textContent = direction + '°';
        if (window.map && window.map.getLayer && window.map.getLayer('hillshade')) {
            try {
                window.map.setPaintProperty('hillshade', 'hillshade-illumination-direction', direction);
                console.log('Updated illumination direction to:', direction);
            } catch (error) {
                console.warn('Failed to update illumination direction:', error);
            }
        } else {
            console.warn('Map or hillshade layer not ready yet for direction change:', direction);
        }
    });

    // Preset configurations
    const presets = {
        natural: {
            shadow: '#473B24',
            highlight: '#F4E8C1', 
            accent: '#8a7f6e',
            direction: 315
        },
        enhanced: {
            shadow: '#2a2419',
            highlight: '#fff3d4',
            accent: '#7a6f5e', 
            direction: 325
        },
        subtle: {
            shadow: '#5a4f3a',
            highlight: '#f0e7d0',
            accent: '#9a8f7e',
            direction: 335
        }
    };

    function applyPreset(presetName) {
        const preset = presets[presetName];
        if (!preset) return;

        // Update UI controls
        document.getElementById('illumination-direction').value = preset.direction;
        document.getElementById('direction-value').textContent = preset.direction + '°';
        
        // Update map properties if map and hillshade layer exist
        if (window.map && window.map.getLayer && window.map.getLayer('hillshade')) {
            try {
                window.map.setPaintProperty('hillshade', 'hillshade-shadow-color', preset.shadow);
                window.map.setPaintProperty('hillshade', 'hillshade-highlight-color', preset.highlight);
                window.map.setPaintProperty('hillshade', 'hillshade-accent-color', preset.accent);
                window.map.setPaintProperty('hillshade', 'hillshade-illumination-direction', preset.direction);
                console.log('Applied preset:', presetName, preset);
            } catch (error) {
                console.warn('Failed to apply preset:', presetName, error);
            }
        } else {
            console.warn('Map or hillshade layer not ready yet for preset:', presetName);
        }
    }

    document.getElementById('preset-natural').addEventListener('click', () => applyPreset('natural'));
    document.getElementById('preset-enhanced').addEventListener('click', () => applyPreset('enhanced'));
    document.getElementById('preset-subtle').addEventListener('click', () => applyPreset('subtle'));
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

    window.map.on('click', (e) => {
        const features = window.map.queryRenderedFeatures(e.point);
        
        if (features.length > 0) {
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
        } else {
            propertiesPanel.style.display = 'none';
        }
    });

    // Enable terrain when map loads
    window.map.on('load', () => {
        window.map.setTerrain({
            source: 'mapterhorn-terrain',
            exaggeration: 1.0
        });
        
        console.log('Mapterhorn Terrain Visualization');
        console.log('Data source: https://tunnel.optgeo.org/martin/mapterhorn');
        console.log('Encoding: Terrarium format');
    });

    // Control functionality
    document.getElementById('terrain').addEventListener('change', function() {
        const enabled = this.checked;
        if (enabled) {
            window.map.setTerrain({
                source: 'mapterhorn-terrain',
                exaggeration: 1.0
            });
        } else {
            window.map.setTerrain(null);
        }
    });

    document.getElementById('terrain-source').addEventListener('change', function() {
        const source = this.value;
        const terrainSource = source === 'gel' ? 'gel-terrain' : 'mapterhorn-terrain';
        const hillshadeSource = source === 'gel' ? 'gel-hillshade' : 'mapterhorn-hillshade';
        
        // Update terrain source
        window.map.setTerrain({
            source: terrainSource,
            exaggeration: 1.0
        });
        
        // Update hillshade source if it exists
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
                "source": hillshadeSource,
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
    });

    document.getElementById('hillshade').addEventListener('change', function() {
        const visibility = this.checked ? 'visible' : 'none';
        window.map.setLayoutProperty('hillshade', 'visibility', visibility);
    });
    
    // Log terrain configuration
    console.log('Mapterhorn Terrain Visualization initialized');
    console.log('Data source: https://tunnel.optgeo.org/martin/mapterhorn');
    console.log('Features: 3D terrain, hillshade, interactive controls');
    
    // Set up hillshade controls after map is initialized
    setupControls();
}