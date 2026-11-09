export type CopperForm = "cathode" | "rod" | "wire" | "scrap" | "other";

export type InventoryStatus =
  | "available"
  | "reserved"
  | "picked"
  | "shipped"
  | "held"
  | "needsReview"
  | "archived";

export type FtzStatus =
  | "domestic"
  | "foreignPrivileged"
  | "nonPrivilegedForeign"
  | "needsReview";

export type MovementType =
  | "receive"
  | "transfer"
  | "reserve"
  | "pick"
  | "ship"
  | "adjust"
  | "hold"
  | "release"
  | "withdraw"
  | "deplete";

export type AdvisorSeverity = "info" | "warning" | "critical";
export type AdvisorTopic = "fifo" | "ftz" | "tariff" | "inventory" | "movement";
export type ReportCategory = "inventory" | "fifo" | "ftz" | "tariff" | "executive";
export type ReportFormat = "csv" | "xlsx" | "pdf";

export type StorageLocation = {
  id: string;
  zone: string;
  rack: string;
  bay: string;
  row: string;
  maxLengthFt: 6 | 12;
  capacityLbs: number;
};

export type InventoryBox = {
  id: string;
  source?: "icc-seed" | "uploaded" | "manual" | "demo";
  sourceRow?: number;
  boxNumber: string;
  partNumber?: string;
  copperSize?: string;
  sku: string;
  copperForm: CopperForm;
  alloy?: string;
  grade?: string;
  supplier?: string;
  poNumber?: string;
  row?: string;
  position?: string;
  level?: number;
  warehouseLocation?: string;
  boxLengthFt?: 6 | 12;
  storageSide?: "left12ft" | "right6ft";
  weightLbs: number;
  dateReceived?: string;
  countryOfOrigin: string;
  receivedAt: string;
  warehouseZone: string;
  locationId?: string;
  status: InventoryStatus;
  ftzStatus: FtzStatus;
  ftzLotId?: string;
  htsCode?: string;
  costUsd?: number | null;
  unitValueUsd: number;
  tariffRate: number;
  tariffExposureUsd?: number;
  originalStatus?: string;
  reviewStatus?: "valid" | "needsReview";
  reviewIssues?: string[];
  fifoRank?: number;
  customerAccount?: string;
  holdReason?: string;
};

export type Movement = {
  id: string;
  boxId: string;
  type: MovementType | "edit" | "receiveBox" | "moveBox" | "reserveBox" | "holdBox" | "releaseBox" | "consumeBox" | "archiveBox";
  fromZone?: string;
  toZone?: string;
  fromLocation?: string;
  toLocation?: string;
  previousWeightLbs?: number;
  newWeightLbs?: number;
  pulledWeightLbs?: number;
  consumedWeightLbs?: number;
  remainingWeightLbs?: number;
  pricePerLbUsd?: number;
  dutiableValueUsd?: number;
  estimatedDutyUsd?: number;
  jobNumber?: string;
  tariffTracked?: boolean;
  previousStatus?: InventoryStatus;
  newStatus?: InventoryStatus;
  previousLocation?: string;
  newLocation?: string;
  occurredAt: string;
  actor: string;
  reason?: string;
};

export type FifoRecommendation = {
  id: string;
  sku: string;
  requestedWeightLbs: number;
  selectedBoxIds: string[];
  totalWeightLbs: number;
  shortageLbs: number;
  shortageWeightLbs: number;
  rationale: string[];
  createdAt: string;
};

export type FifoOverride = {
  id: string;
  recommendationId: string;
  removedBoxIds: string[];
  addedBoxIds: string[];
  reason: string;
  actor: string;
  createdAt: string;
};

export type FtzLedgerEntry = {
  id: string;
  boxId: string;
  eventType: "admit" | "transfer" | "withdraw" | "statusChange" | "adjustment";
  ftzStatus: FtzStatus;
  occurredAt: string;
  referenceMovementId?: string;
};

export type TariffLedgerEntry = {
  id: string;
  boxId: string;
  eventType: "estimate" | "accrual" | "withdrawal" | "adjustment";
  dutiableValueUsd: number;
  tariffRate: number;
  estimatedDutyUsd: number;
  occurredAt: string;
  referenceMovementId?: string;
};

export type AdvisorInsight = {
  id: string;
  severity: AdvisorSeverity;
  topic: AdvisorTopic;
  title: string;
  reasoning: string[];
  relatedBoxIds: string[];
  createdAt: string;
};

export type ReportDefinition = {
  id: string;
  title: string;
  category: ReportCategory;
  description: string;
  defaultFormat: ReportFormat;
  columns: string[];
};

export type ReportExportRequest = {
  reportId: string;
  format: ReportFormat;
  filters?: Record<string, string | number | boolean>;
  requestedAt: string;
};

export type ReportExportResult = {
  fileName: string;
  mimeType: string;
  byteLength: number;
  generatedAt: string;
  source: "mock" | "supabase";
};

export type DashboardMetrics = {
  totalBoxes: number;
  availableBoxes: number;
  availableWeightLbs: number;
  heldWeightLbs: number;
  reservedWeightLbs: number;
  totalValueUsd: number;
  estimatedTariffLiabilityUsd: number;
  ftzExposureUsd: number;
  fifoRiskCount: number;
  overrideCount: number;
  recentMovementCount: number;
  needsReviewCount?: number;
};

export type QrPayload = {
  version: 1;
  entity: "inventoryBox" | "movement" | "report";
  id: string;
  label: string;
  generatedAt: string;
  data: Record<string, string | number>;
};

// All locations and sample records below are invented for this review demo.
export const storageLocations: StorageLocation[] = [
  { id: "demo-loc-a", zone: "A", rack: "A1", bay: "01", row: "A", maxLengthFt: 12, capacityLbs: 10000 },
  { id: "demo-loc-b", zone: "B", rack: "B1", bay: "01", row: "B", maxLengthFt: 12, capacityLbs: 10000 },
  { id: "demo-loc-c", zone: "C", rack: "C1", bay: "01", row: "C", maxLengthFt: 12, capacityLbs: 10000 },
  { id: "demo-loc-d", zone: "D", rack: "D1", bay: "01", row: "D", maxLengthFt: 6, capacityLbs: 8000 },
  { id: "demo-loc-e", zone: "E", rack: "E1", bay: "01", row: "E", maxLengthFt: 6, capacityLbs: 8000 },
  { id: "demo-loc-f", zone: "F", rack: "F1", bay: "01", row: "F", maxLengthFt: 6, capacityLbs: 8000 },
];
export const inventoryBoxes: InventoryBox[] = [];
export const movements: Movement[] = [];
export const fifoOverrides: FifoOverride[] = [];

export const reportDefinitions: ReportDefinition[] = [
  {
    id: "report-inventory-valuation",
    title: "Inventory Valuation",
    category: "inventory",
    description: "Current copper weight, status, location, and valuation by lot.",
    defaultFormat: "csv",
    columns: ["boxNumber", "sku", "grade", "weightLbs", "warehouseZone", "status", "valueUsd"]
  },
  {
    id: "report-fifo-audit",
    title: "FIFO Audit",
    category: "fifo",
    description: "FIFO pick sequence, exceptions, and override audit support.",
    defaultFormat: "csv",
    columns: ["sku", "requestedWeightLbs", "selectedBoxIds", "shortageLbs", "rationale"]
  },
  {
    id: "report-ftz-compliance",
    title: "FTZ Compliance",
    category: "ftz",
    description: "FTZ status changes, withdrawals, and bonded exposure.",
    defaultFormat: "xlsx",
    columns: ["boxNumber", "ftzStatus", "eventType", "occurredAt", "referenceMovementId"]
  },
  {
    id: "report-tariff-exposure",
    title: "Tariff Exposure",
    category: "tariff",
    description: "Estimated duty exposure by origin, lot, and movement event.",
    defaultFormat: "xlsx",
    columns: ["boxNumber", "countryOfOrigin", "dutiableValueUsd", "tariffRate", "estimatedDutyUsd"]
  },
  {
    id: "report-executive-summary",
    title: "Executive Summary",
    category: "executive",
    description: "Management summary of value, liability, exceptions, and movement velocity.",
    defaultFormat: "pdf",
    columns: ["metric", "value", "risk", "generatedAt"]
  }
];
