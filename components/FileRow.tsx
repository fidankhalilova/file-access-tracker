"use client";

// file's row — name, usage bar, "X of Y used" text, View/Download buttons, and the bonus reset + limit controls

import { useState } from "react";
import type { TrackedFile } from "@/types/access";
import type { AccessResult } from "@/hooks/useAccessTracker";
import { UsageBar } from "./UsageBar";

interface FileRowProps {
  file: TrackedFile;
  count: number;
  onAccess: (fileId: string, action: "view" | "download") => AccessResult;
  onReset: (fileId: string) => void;
  onSetLimit: (fileId: string, newLimit: number) => void;
}

export function FileRow({
  file,
  count,
  onAccess,
  onReset,
  onSetLimit,
}: FileRowProps) {
  const isLocked = count >= file.limit;

  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [draftLimit, setDraftLimit] = useState(String(file.limit));

  function handleAccess(action: "view" | "download") {
    const result = onAccess(file.id, action);
    setBlockedMessage(result.success ? null : (result.reason ?? "Blocked"));
  }

  function commitLimit() {
    const parsed = parseInt(draftLimit, 10);
    if (!Number.isNaN(parsed) && parsed >= 1) {
      onSetLimit(file.id, parsed);
    } else {
      setDraftLimit(String(file.limit));
    }
    setIsEditingLimit(false);
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border p-4 ${
        isLocked ? "border-red-200 bg-red-50/40" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-medium text-neutral-900">{file.name}</p>
        {isLocked && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            Locked
          </span>
        )}
      </div>

      <UsageBar count={count} limit={file.limit} />

      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>
          {count} of {file.limit} accesses used
        </span>

        {/* per-file limit control */}
        {isEditingLimit ? (
          <input
            type="number"
            min={1}
            value={draftLimit}
            onChange={(e) => setDraftLimit(e.target.value)}
            onBlur={commitLimit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitLimit();
              if (e.key === "Escape") {
                setDraftLimit(String(file.limit));
                setIsEditingLimit(false);
              }
            }}
            autoFocus
            aria-label={`Set access limit for ${file.name}`}
            className="w-16 rounded border border-neutral-300 px-1 py-0.5 text-xs"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraftLimit(String(file.limit));
              setIsEditingLimit(true);
            }}
            className="text-xs text-neutral-400 hover:text-neutral-600 hover:underline"
          >
            Change limit
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleAccess("view")}
          disabled={isLocked}
          className="rounded border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => handleAccess("download")}
          disabled={isLocked}
          className="rounded border border-neutral-900 bg-neutral-900 px-3 py-1 text-sm text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300 disabled:opacity-50"
        >
          Download
        </button>

        {/* reset access */}
        <button
          type="button"
          onClick={() => {
            onReset(file.id);
            setBlockedMessage(null);
          }}
          className="ml-auto text-xs text-neutral-400 hover:text-neutral-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* blocked-reason feedback */}
      {blockedMessage && (
        <p role="alert" className="text-xs text-red-600">
          {blockedMessage}
        </p>
      )}
    </div>
  );
}
