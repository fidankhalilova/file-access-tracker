"use client";

// wires useAccessTracker's state and handlers to a list of FileRow components.

import { useAccessTracker } from "@/hooks/useAccessTracker";
import { FileRow } from "./FileRow";

export function FileAccessManager() {
  const { files, counts, recordAccess, resetAccess, setLimit } =
    useAccessTracker();

  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <FileRow
          key={file.id}
          file={file}
          count={counts[file.id] ?? 0}
          onAccess={recordAccess}
          onReset={resetAccess}
          onSetLimit={setLimit}
        />
      ))}
    </div>
  );
}
