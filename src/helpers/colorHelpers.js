// Helper function to convert hex to HSL
export function hexToHSL(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16); // Correct slicing
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function sortColorsByHSL(colors) {
  return colors.sort((a, b) => {
    const hslA = hexToHSL(a.hexCode);
    const hslB = hexToHSL(b.hexCode);
    if (hslA.h !== hslB.h) return hslA.h - hslB.h;
    if (hslA.s !== hslB.s) return hslA.s - hslB.s;
    return hslA.l - hslB.l;
  });
}

export function getFilteredColors(dataSet = [], searchTerm, selectedFilters) {
  if (!Array.isArray(dataSet)) {
    console.error("Expected dataSet to be an array, but got:", typeof dataSet);
    return [];
  }

  return sortColorsByHSL(
    dataSet.filter((color) => {
      const matchesSearch =
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.hexCode.toLowerCase().includes(searchTerm.toLowerCase());

      const colorTypes = color.type
        ? (Array.isArray(color.type) ? color.type : [color.type]).map((type) =>
            type.toLowerCase()
          )
        : [];

      if (selectedFilters.length === 0) {
        return matchesSearch;
      }

      const normalizedSelectedFilters = selectedFilters.map((filter) =>
        filter.toLowerCase()
      );

      const matchesFilter = normalizedSelectedFilters.some((filter) =>
        colorTypes.includes(filter)
      );

      return matchesSearch && matchesFilter;
    })
  );
}