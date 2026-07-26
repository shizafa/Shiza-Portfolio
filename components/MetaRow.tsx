import type { ReactNode } from "react";

interface MetaItem {
  label: string;
  value: ReactNode;
}

export default function MetaRow({ items }: { items: MetaItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
      {items.map(({ label, value }) => (
        <div key={label} className="border-t border-border pt-3">
          <div className="text-xs uppercase tracking-widest text-muted">
            {label}
          </div>
          <div className="mt-1 text-sm">{value}</div>
        </div>
      ))}
    </div>
  );
}
