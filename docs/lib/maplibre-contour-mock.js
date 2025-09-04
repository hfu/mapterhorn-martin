// Mock maplibre-contour for testing purposes
// This simulates the contour generation functionality

window.mlcontour = {
  DemSource: class MockDemSource {
    constructor(options) {
      this.options = options;
      this.url = options.url;
      this.encoding = options.encoding;
      this.maxzoom = options.maxzoom;
      this.worker = options.worker;
      this.cacheSize = options.cacheSize;
      this.timeoutMs = options.timeoutMs;
      
      console.log('DemSource initialized with options:', options);
    }
    
    setupMaplibre(maplibregl) {
      console.log('MapLibre setup for contour protocol');
      // Mock the protocol setup
      return true;
    }
    
    contourProtocolUrl(options) {
      console.log('Contour protocol URL generated with options:', options);
      
      // Mock contour protocol URL
      // This would normally generate a special protocol URL for contour tiles
      return 'contour://' + JSON.stringify({
        url: this.url,
        encoding: this.encoding,
        multiplier: options.multiplier || 1,
        thresholds: options.thresholds || {},
        elevationKey: options.elevationKey || 'ele',
        levelKey: options.levelKey || 'level',
        contourLayer: options.contourLayer || 'contours'
      });
    }
  }
};