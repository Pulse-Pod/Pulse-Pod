/**
 * Project Pulse & Pod - Products & Pricing Configuration File
 * 
 * Edit this file to update product specifications, prices, or copywriting.
 * Any changes here will be dynamically rendered on the website upon refresh.
 */

window.PULSE_POD_CONFIG = {
  "prices": {
    "moong": 78000,   // Base Price per Metric Ton (INR)
    "gram": 84000,    // Base Price per Metric Ton (INR)
    "sesame": 112000  // Base Price per Metric Ton (INR)
  },
  
  "crops": [
    {
      "key": "moong",
      "title": "Premium Green Moong",
      "category": "Vigna Radiata",
      "quote": "Procured from East AP. Naturally winnowed, sun-dried, sieved, and herbal neem protected.",
      "image": "assets/green_moong.png",
      "nutrition": {
        "protein": { "value": "24g", "percentage": 24 },
        "fiber": { "value": "16g", "percentage": 16 },
        "iron": { "value": "38%", "percentage": 38 }
      },
      "specs": {
        "purity": "99.9% (Water Cleaned & Sieved)",
        "moisture": "Max 11.0%",
        "foreign": "Max 0.05%",
        "infest": "Nil (Guntur Mirchi & Neem Protected)",
        "admix": "Max 0.2%"
      },
      "pkgRetail": "250g, 500g, 1kg eco-friendly paper pouches.",
      "pkgBulk": "25kg / 50kg Biodegradable Eco Jute bags."
    },
    {
      "key": "gram",
      "title": "Premium Black Gram",
      "category": "Vigna Mungo",
      "quote": "East AP farm field gate sourcing. Sieved, water-cleaned, and naturally protected.",
      "image": "assets/black_gram.png",
      "nutrition": {
        "protein": { "value": "25g", "percentage": 25 },
        "fiber": { "value": "18g", "percentage": 18 },
        "iron": { "value": "32%", "percentage": 32 }
      },
      "specs": {
        "purity": "99.8% (Sieved & Water Cleaned)",
        "moisture": "Max 12.0%",
        "foreign": "Max 0.1%",
        "infest": "Nil (Guntur Mirchi & Neem Protected)",
        "admix": "Max 0.3%"
      },
      "pkgRetail": "500g, 1kg eco-friendly paper pouches.",
      "pkgBulk": "25kg / 50kg Biodegradable Eco Jute bags."
    },
    {
      "key": "sesame",
      "title": "Sun-Dried Sesame Seeds",
      "category": "Sesamum Indicum",
      "quote": "Uniform golden seeds with rich oil contents, harvested using natural sun-drying.",
      "image": "assets/sesame.png",
      "nutrition": {
        "protein": { "value": "18g", "percentage": 18 },
        "fiber": { "value": "12g", "percentage": 12 },
        "iron": { "value": "52%", "percentage": 52 }
      },
      "specs": {
        "purity": "99.9% (Water Cleaned & Sieved)",
        "moisture": "Max 6.0%",
        "foreign": "Max 0.02%",
        "infest": "Nil (Guntur Mirchi & Neem Protected)",
        "admix": "Max 0.1%"
      },
      "pkgRetail": "200g, 500g glass jars or paper packs.",
      "pkgBulk": "25kg / 50kg Biodegradable Eco Jute bags."
    }
  ]
};
