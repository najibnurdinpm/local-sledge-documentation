import { Callout } from "nextra/components";
import { useState } from "react";

export function Dropdown({ text, trigger, children }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <Callout type="info">
        <div className="flex gap-1">
          {text}
          <div
            className="cursor-pointer text-[rgba(67,198,172,1)]"
            onClick={() => setOpen(!isOpen)}
          >
            <span className="underline text-[#96c0b6]">{trigger}</span>
          </div>
        </div>
      </Callout>

      {isOpen && <div className="mt-3 ">{children}</div>}
    </div>
  );
}
