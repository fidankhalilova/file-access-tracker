export interface TrackedFile {
  id: string;
  name: string;
  limit: number; // per-file access limit
}

export type AccessAction = "view" | "download";

export interface AccessLogEntry {
  id: string;
  docId: string;
  userId: string;
  action: AccessAction;
  at: string;
}
