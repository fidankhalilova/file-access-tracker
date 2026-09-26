// values and mock data

import type { TrackedFile } from "@/types/access";

export const DEFAULT_ACCESS_LIMIT = 3;
export const MOCK_USER_ID = "local-user";
export const MAX_LOG_ENTRIES = 500;
export const MOCK_FILES: TrackedFile[] = [
  {
    id: "file-1",
    name: "Q3-Financial-Report.pdf",
    limit: DEFAULT_ACCESS_LIMIT,
  },
  { id: "file-2", name: "Employee-Handbook.docx", limit: DEFAULT_ACCESS_LIMIT },
  { id: "file-3", name: "Product-Roadmap.pptx", limit: 5 },
  { id: "file-4", name: "NDA-Template.pdf", limit: 1 },
];
