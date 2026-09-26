"use client";

// core state + logic for the access tracker

import { useCallback, useMemo, useRef, useState } from "react";
import type { AccessAction, AccessLogEntry, TrackedFile } from "@/types/access";
import { MOCK_FILES, MOCK_USER_ID, MAX_LOG_ENTRIES } from "@/lib/constants";
import { countAccess } from "@/lib/accessLog";

export interface AccessResult {
  success: boolean;
  reason?: string;
}

export function useAccessTracker() {
  const [files, setFiles] = useState<TrackedFile[]>(MOCK_FILES);
  const [log, setLog] = useState<AccessLogEntry[]>([]);
  const [resetTimestamps, setResetTimestamps] = useState<
    Record<string, string>
  >({});

  const logRef = useRef<AccessLogEntry[]>([]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const file of files) {
      map[file.id] = countAccess(log, file.id, resetTimestamps[file.id]);
    }
    return map;
  }, [files, log, resetTimestamps]);

  const recordAccess = useCallback(
    (fileId: string, action: AccessAction): AccessResult => {
      const file = files.find((f) => f.id === fileId);
      if (!file) return { success: false, reason: "File not found" };

      const currentCount = countAccess(
        logRef.current,
        fileId,
        resetTimestamps[fileId],
      );
      if (currentCount >= file.limit) {
        return {
          success: false,
          reason: `Access limit reached (${file.limit}/${file.limit}). Reset to allow more.`,
        };
      }

      const entry: AccessLogEntry = {
        id: crypto.randomUUID(),
        docId: fileId,
        userId: MOCK_USER_ID,
        action,
        at: new Date().toISOString(),
      };

      let nextLog = [...logRef.current, entry];
      if (nextLog.length > MAX_LOG_ENTRIES) {
        nextLog = nextLog.slice(nextLog.length - MAX_LOG_ENTRIES);
      }

      logRef.current = nextLog;
      setLog(nextLog);

      return { success: true };
    },
    [files, resetTimestamps],
  );

  const resetAccess = useCallback((fileId: string) => {
    setResetTimestamps((prev) => ({
      ...prev,
      [fileId]: new Date().toISOString(),
    }));
  }, []);

  // per-file limit change
  const setLimit = useCallback((fileId: string, newLimit: number) => {
    if (newLimit < 1) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, limit: newLimit } : f)),
    );
  }, []);

  return { files, log, counts, recordAccess, resetAccess, setLimit };
}
