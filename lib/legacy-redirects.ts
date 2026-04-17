/**
 * Maps the old PHP site's `?id=` query parameter on /product.php and
 * /product2.php to the new slug on /products/[slug]. Used by middleware.ts to
 * 301-redirect legacy inbound links.
 */
export const PRODUCT_ID_TO_SLUG: Record<string, string> = {
  // Complete Shafts
  "EQ.CS-01": "minelab-equinox-600-800-complete-shaft",
  "EQ.CS-02": "minelab-equinox-600-800-complete-shaft-cw",
  "GM.CS-01": "minelab-gold-monster-1000-complete-shaft",
  "G45.CS-01": "minelab-gpx-4500-5000-complete-shaft",
  "EXCAL.CS-01": "minelab-excalibur-complete-shaft",
  "XP.D2-01": "xp-deus-ii-complete-shaft",
  "GA.CS-01": "garrett-at-series-complete-shaft",

  // Upper Shafts
  "EQ.US-01": "minelab-equinox-600-800-upper-shaft",

  // Lower Rods CF
  "EQ-03": "minelab-equinox-700-900-lower-rod",
  "EQ-04": "minelab-equinox-700-900-tall-man-lower-rod",
  "MC-01": "minelab-manticore-lower-rod",
  "MC-02": "minelab-manticore-tall-man-lower-rod",
  "C3-01": "minelab-ctx-3030-lower-rod",
  "C3-02": "minelab-ctx-3030-tall-man-lower-rod",
  "C3-03": "minelab-ctx-3030-travel-rod",
  "G45-01": "minelab-gpx-series-lower-rod",
  "G45-02": "minelab-gpx-series-tall-man-lower-rod",
  "G6-02": "minelab-gpx-6000-tall-man-lower-rod",
  "XP-01": "xp-deus-ii-lower-rod",

  // Two-piece
  "EQ.2P-01": "minelab-equinox-700-900-two-piece-shaft",
  "MC.2P-01": "minelab-manticore-two-piece-shaft",
  "GA-01": "garrett-at-ace-two-piece-shaft",
  "TAR-01": "tarsacci-mdt-8000-two-piece-shaft",

  // Glass-Fiber
  "MC_GLASS-01": "minelab-manticore-glass-fiber-lower-rod",
  "GM_GLASS-01": "minelab-gold-monster-glass-fiber-lower-rod",
  "EQ_GLASS-01": "minelab-equinox-600-800-glass-fiber-lower-rod",
  "EQ79_GLASS-01": "minelab-equinox-700-900-glass-fiber-lower-rod",
  "G6_GLASS-01": "minelab-gpx-6000-glass-fiber-lower-rod",
  "XP_GLASS-01": "xp-deus-ii-glass-fiber-lower-rod",
  "G45_GLASS-01": "minelab-gpx-4500-5000-glass-fiber-lower-rod",

  // Scoop Handles
  "SS-02": "scoop-handle-stealth",
  "SS-03": "scoop-handle-xtreme",
  "SSCooB-01": "scoop-handle-coob-v1",
  "SSCooB-02": "scoop-handle-coob-v2",
  "SS-TREX": "scoop-handle-trex",
  "SS-STAVR": "scoop-handle-stavr",
  "SS-CKG": "scoop-handle-ckg",
  "SS-HB": "scoop-handle-honey-badger",
  "SS-DUNE": "scoop-handle-dune",

  // Accessories
  "UN-01": "carbon-fiber-arm-cuff",
  "EQACC-03": "counterweight-tube",
  "EQACC-05": "herke-arm-cuff",
  "XPACC-01": "rcdigs-mount-xp-deus",

  // CarbonPro
  "CP-CS-01": "carbonpro-equinox-complete-shaft-black",
  "CP-CS-02": "carbonpro-equinox-complete-shaft-red",
  "CP-US-01": "carbonpro-equinox-upper-shaft",
};
