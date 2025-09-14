# CSS Architecture and !important Override Strategy

This document outlines the CSS refactoring strategy implemented to eliminate the need for `!important` declarations while maintaining proper functionality with third-party libraries.

## Problem Statement

The MapLibre GL library uses `!important` declarations in the `.maplibregl-pseudo-fullscreen` class:

```css
.maplibregl-pseudo-fullscreen {
  height: 100% !important;
  left: 0 !important;
  position: fixed !important;
  top: 0 !important;
  width: 100% !important;
  z-index: 99999;
}
```

These declarations make it difficult to override styles without using `!important` in our own CSS, leading to poor maintainability.

## Solution Strategy

### 1. High Specificity Selectors

Instead of using `!important`, we use highly specific selectors that naturally override the library styles:

```css
/* Higher specificity than .maplibregl-pseudo-fullscreen */
html body #map.maplibregl-map .maplibregl-pseudo-fullscreen,
body #map.maplibregl-map .maplibregl-pseudo-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  /* Additional clean styling */
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}
```

### 2. CSS Custom Properties

We implement CSS custom properties for maintainable theming:

```css
:root {
  --fullscreen-z-index: 99999;
  --fullscreen-transition: all 0.3s ease;
}

html body #map.maplibregl-map .maplibregl-pseudo-fullscreen {
  z-index: var(--fullscreen-z-index);
  transition: var(--fullscreen-transition);
}
```

### 3. Specificity Calculation

Our override selectors have higher specificity than the library selectors:

- Library: `.maplibregl-pseudo-fullscreen` → Specificity: (0, 1, 0)
- Our override: `html body #map.maplibregl-map .maplibregl-pseudo-fullscreen` → Specificity: (0, 1, 4)

Higher specificity wins over `!important` when the `!important` has lower specificity.

## CSS Quality Assurance

### Stylelint Configuration

We've implemented Stylelint with rules to prevent `!important` usage:

```json
{
  "rules": {
    "declaration-no-important": true,
    "selector-max-specificity": ["0,5,4", {
      "severity": "warning"
    }]
  }
}
```

### NPM Scripts

- `npm run lint:css` - Check CSS quality
- `npm run lint:css:fix` - Auto-fix CSS issues

## Best Practices

### 1. Avoid !important
- Use specificity and cascade instead
- Only override third-party `!important` with higher specificity
- Document reasons for high specificity when necessary

### 2. CSS Architecture
- Use semantic class names
- Implement CSS custom properties for theming
- Keep specificity as low as practical
- Use consistent naming conventions

### 3. Third-party Library Integration
- Understand library CSS patterns
- Use targeted overrides instead of global resets
- Document override strategies
- Test thoroughly after library updates

## Testing Strategy

1. **Visual Testing**: Ensure UI appearance is maintained
2. **Functional Testing**: Verify fullscreen functionality works
3. **Regression Testing**: Check after library updates
4. **CSS Validation**: Run Stylelint on all changes

## Maintenance Guidelines

### When updating MapLibre GL:
1. Check if the library's CSS structure has changed
2. Verify our override selectors still work
3. Update specificity if necessary
4. Test fullscreen functionality thoroughly

### When adding new styles:
1. Run `npm run lint:css` before committing
2. Avoid `!important` declarations
3. Use CSS custom properties for dynamic values
4. Document high specificity selectors

## Benefits Achieved

1. **No custom !important declarations**: Clean, maintainable CSS
2. **Proper cascade respect**: Natural CSS behavior preserved
3. **Future-proof**: Easy to maintain and update
4. **Quality assurance**: Automated linting prevents regressions
5. **Documentation**: Clear understanding of override strategies

## Example Usage

The override styles automatically apply when MapLibre GL activates fullscreen mode. No JavaScript changes are required, and the visual behavior remains identical to the original implementation.