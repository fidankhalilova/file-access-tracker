// helper for deriving a file's current access count from the log.

import type { AccessLogEntry } from "@/types/access";

export function countAccess(
  log: AccessLogEntry[],
  docId: string,
  resetAt?: string,
): number {
  return log.filter((entry) => {
    if (entry.docId !== docId) return false;
    if (resetAt && entry.at <= resetAt) return false;
    return true;
  }).length;
}
