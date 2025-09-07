// Mock MapLibre GL JS for testing purposes
// This is a minimal implementation to demonstrate contour line functionality

window.maplibregl = {
  Map: class MockMap {
    constructor(options) {
      this.options = options;
      this._style = options.style || {};
      this._layers = this._style.layers || [];
      this._sources = this._style.sources || {};
      this._terrain = null;
      this._loaded = false;
      this.eventHandlers = {};
      
      // Create a simple map container
      const container = document.getElementById(options.container);
      if (container) {
        container.style.backgroundColor = '#2d3748';
        container.innerHTML = `
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            font-family: Arial, sans-serif;
          ">
            <h3>🗺️ Mapterhorn Martin</h3>
            <p>Terrain Visualization Demo</p>
            <p style="font-size: 12px; opacity: 0.7;">Mock mode - Libraries loading simulated</p>
            <div style="margin-top: 20px; font-size: 14px;">
              <div>✓ Base map layers</div>
              <div id="contour-status">✓ Contour lines (enabled)</div>
              <div>✓ Hillshade effects</div>
              <div>✓ 3D terrain</div>
            </div>
          </div>
        `;
        
        // Simulate map loading
        setTimeout(() => {
          this._loaded = true;
          this.fireEvent('load');
        }, 1000);
      }
    }
    
    on(event, handler) {
      if (!this.eventHandlers[event]) {
        this.eventHandlers[event] = [];
      }
      this.eventHandlers[event].push(handler);
    }
    
    fireEvent(event, data) {
      if (this.eventHandlers[event]) {
        this.eventHandlers[event].forEach(handler => handler(data));
      }
    }
    
    isStyleLoaded() {
      return this._loaded;
    }
    
    getStyle() {
      return {
        layers: this._layers,
        sources: this._sources
      };
    }
    
    setLayoutProperty(layerId, property, value) {
      console.log(`Setting ${layerId} ${property} to ${value}`);
      const statusElement = document.getElementById('contour-status');
      if (layerId === 'contour-lines' && property === 'visibility' && statusElement) {
        statusElement.textContent = value === 'visible' 
          ? '✓ Contour lines (enabled)' 
          : '✗ Contour lines (disabled)';
      }
    }
    
    setTerrain(terrain) {
      this._terrain = terrain;
      console.log('Terrain set:', terrain);
    }
    
    addControl(control) {
      console.log('Control added:', control);
    }
    
    queryRenderedFeatures(point) {
      return []; // Mock empty features
    }
    
    addLayer(layer, beforeId) {
      this._layers.push(layer);
      console.log('Layer added:', layer.id);
    }
    
    removeLayer(layerId) {
      this._layers = this._layers.filter(layer => layer.id !== layerId);
      console.log('Layer removed:', layerId);
    }
    
    addSource(sourceId, source) {
      this._sources[sourceId] = source;
      console.log('Source added:', sourceId);
    }
    
    removeSource(sourceId) {
      delete this._sources[sourceId];
      console.log('Source removed:', sourceId);
    }
    
    getLayer(layerId) {
      return this._layers.find(layer => layer.id === layerId);
    }
    
    getSource(sourceId) {
      return this._sources[sourceId];
    }
  },
  
  NavigationControl: class MockNavigationControl {
    constructor(options) {
      this.options = options;
    }
  },
  
  GlobeControl: class MockGlobeControl {
    constructor(options) {
      this.options = options;
    }
  }
};