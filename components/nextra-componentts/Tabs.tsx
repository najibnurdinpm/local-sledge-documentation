import { Tab as HeadlessTab } from "@headlessui/react";
import cn from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Button from "../global/Button";

type TabItem = string | ReactNode;

type TabObjectItem = {
  label: TabItem;
  disabled: boolean;
};

function isTabObjectItem(item: unknown): item is TabObjectItem {
  return !!item && typeof item === "object" && "label" in item;
}

export function ETabs({
  items,
  selectedIndex: _selectedIndex,
  defaultIndex = 0,
  onChange,
  children,
  storageKey,
  tabVariant = "default",
}: {
  items: (TabItem | TabObjectItem)[];
  selectedIndex?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  children: ReactNode;
  storageKey?: string;
  tabVariant?: "default" | "gradient";
}): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    if (_selectedIndex !== undefined) {
      setSelectedIndex(_selectedIndex);
    }
  }, [_selectedIndex]);

  useEffect(() => {
    if (!storageKey) {
      // Do not listen storage events if there is no storage key
      return;
    }

    function fn(event: StorageEvent) {
      if (event.key === storageKey) {
        setSelectedIndex(Number(event.newValue));
      }
    }

    const index = Number(localStorage.getItem(storageKey));
    setSelectedIndex(Number.isNaN(index) ? 0 : index);

    window.addEventListener("storage", fn);
    return () => {
      window.removeEventListener("storage", fn);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  const handleChange = useCallback((index: number) => {
    if (storageKey) {
      const newValue = String(index);
      localStorage.setItem(storageKey, newValue);

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      window.dispatchEvent(
        new StorageEvent("storage", { key: storageKey, newValue })
      );
      return;
    }
    setSelectedIndex(index);
    onChange?.(index);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  const selectedClass = (selected, disabled, selectedIndex) => {
    return cn(
      "nx-mr-2 nx-rounded-t nx-p-2 nx-font-medium nx-leading-5 nx-transition-colors",
      "-nx-mb-0.5 nx-select-none nx-border-b-2",
      !selectedIndex &&
        "[&_svg]:[filter:invert(0%)_sepia(140%)_saturate(130%)_hue-rotate(29deg)_brightness(155%)_contrast(132%)]",
      selected
        ? "nx-border-primary-500 nx-text-primary-600"
        : "nx-border-transparent nx-text-gray-600 hover:nx-border-gray-200 hover:nx-text-black dark:nx-text-gray-200 dark:hover:nx-border-neutral-800 dark:hover:nx-text-white",
      disabled &&
        "nx-pointer-events-none nx-text-gray-400 dark:nx-text-neutral-600"
    );
  };

  const scrollbarClass =
    tabVariant !== "default"
      ? `nextra-scrollbar-${tabVariant}`
      : "nextra-scrollbar";

  const tabListClass =
    tabVariant !== "default"
      ? "nx-mt-4 nx-flex nx-w-max nx-min-w-full nx-pb-px gap-2"
      : "nx-mt-4 nx-flex nx-w-max nx-min-w-full nx-border-b nx-border-gray-200 nx-pb-px dark:nx-border-neutral-800";

  return (
    <HeadlessTab.Group
      selectedIndex={selectedIndex}
      defaultIndex={defaultIndex}
      onChange={handleChange}
    >
      <div
        className={`${scrollbarClass} nx-overflow-x-auto nx-overflow-y-hidden nx-overscroll-x-contain`}
      >
        <HeadlessTab.List className={tabListClass}>
          {items.map((item: any, index) => {
            const disabled = isTabObjectItem(item) && item.disabled;
            return (
              <HeadlessTab
                key={index}
                disabled={disabled}
                className={({ selected }) =>
                  tabVariant !== "default"
                    ? null
                    : selectedClass(selected, disabled, selectedIndex === index)
                }
              >
                {tabVariant === "default" && (
                  <>{isTabObjectItem(item) ? item.label : item}</>
                )}
                {tabVariant === "gradient" && (
                  <Button
                    rounded="rounded-lg"
                    px="px-4"
                    py="py-2"
                    variant={
                      selectedIndex === index
                        ? "borderAnimation"
                        : "gradientBackground"
                    }
                    className="border-gray-2 w-full lg:w-max font-medium"
                    as="div"
                  >
                    <span
                      className={`${
                        selectedIndex === index &&
                        "[&_svg]:[filter:invert(0%)_sepia(140%)_saturate(130%)_hue-rotate(29deg)_brightness(155%)_contrast(132%)]"
                      } flex gap-2 rounded-lg leading-[15px] lg:leading-[20px] text-sm lg:text-base font-['cabinet-grotesk'] pointer-events-none`}
                    >
                      {isTabObjectItem(item) ? item.label : item}
                    </span>
                  </Button>
                )}
              </HeadlessTab>
            );
          })}
        </HeadlessTab.List>
      </div>
      <HeadlessTab.Panels>{children}</HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
}

export function ETab({
  children,
  ...props
}: ComponentProps<typeof HeadlessTab.Panel>): ReactElement {
  return (
    <HeadlessTab.Panel {...props} className="nx-rounded nx-pt-6">
      {children}
    </HeadlessTab.Panel>
  );
}
