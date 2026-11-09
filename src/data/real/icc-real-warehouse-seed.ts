import type { InventoryBox } from "@/data/mock/warehouse-data";

// Fictional values created solely for demonstration.
export const ICC_REAL_WAREHOUSE_SOURCE = "Synthetic demo data";
export const ICC_REAL_WAREHOUSE_IMPORTED_AT = "2026-01-01T00:00:00.000Z";
export const iccRealWarehouseSeed: InventoryBox[] = Array.from({ length: 18 }, (_, i) => ({
  id: `demo-${i+1}`, source: "demo", boxNumber: `DEMO-${String(i+1).padStart(3,"0")}`,
  partNumber: ["BAR-A", "BAR-B", "ROD-C"][i%3], copperSize: ["1 x 2", "1 x 3", "2 x 2"][i%3],
  sku: ["BAR-A", "BAR-B", "ROD-C"][i%3], copperForm: "rod", alloy: "Demo alloy", supplier: "Example Supplier",
  row: String.fromCharCode(65 + Math.floor(i/6)), position: String(i%6+1).padStart(2,"0"), level: 1,
  warehouseLocation: `${String.fromCharCode(65 + Math.floor(i/6))}-${String(i%6+1).padStart(2,"0")}-L1`,
  weightLbs: 1000 + i*75, countryOfOrigin: "United States", receivedAt: `2026-0${1+i%6}-01T12:00:00.000Z`,
  warehouseZone: String.fromCharCode(65 + Math.floor(i/6)), status: i===2 ? "held" : "available",
  ftzStatus: "domestic", unitValueUsd: 4, tariffRate: 0, reviewStatus: "valid"
}));
