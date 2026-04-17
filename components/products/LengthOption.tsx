"use client";

interface LengthOptionProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}

export function LengthOption({ selected, onClick, title, sub }: LengthOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-left bg-surface"
      style={{
        border: selected ? "2px solid #B8452F" : "1px solid #E3E1D6",
        padding: selected ? "11px 14px" : "12px 15px",
        background: selected ? "#F3F1E8" : "#FFFFFF",
      }}
    >
      <div
        className="font-sans font-semibold text-text"
        style={{ fontSize: 14 }}
      >
        {title}
      </div>
      <div className="text-text-muted" style={{ fontSize: 12, marginTop: 2 }}>
        {sub}
      </div>
    </button>
  );
}
