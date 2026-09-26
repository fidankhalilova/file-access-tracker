import { FileAccessManager } from "@/components/FileAccessManager";

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">
        File Access Tracker &amp; Download Limiter
      </h1>
      <FileAccessManager />
    </main>
  );
}
