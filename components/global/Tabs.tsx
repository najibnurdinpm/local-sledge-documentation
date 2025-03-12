import { FC, ReactElement } from "react";
import { ETabs as NextraTabs, ETab as NextraTab } from "../nextra-componentts";
import * as gtag from "~/components/global/GoogleAnalytics";
import useSWR from "swr";

export { NextraTab };

export const Tab: FC<{
  children: ReactElement;
}> = function ({ children = null, ...props }) {
  return <NextraTab {...props}>{children}</NextraTab>;
};

export const Tabs: FC<{
  storageKey?: string;
  items: string[] & { props: { children: any }; key: any }[] & any;
  children: ReactElement;
  uniqueClass?: string;
  tabVariant?: "default" | "gradient";
}> = function ({
  storageKey = "tab-index",
  items,
  children = null,
  uniqueClass = "",
  tabVariant = "default",
  ...props
}) {
  // Use SWR so all tabs with the same key can sync their states.
  if (!storageKey) return;

  const { data, mutate } = useSWR(storageKey, (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  });

  const selectedIndex = items.findIndex(
    (x: any) => x?.props?.children[0]?.type.name === data
  );

  return (
    <>
      <NextraTabs
        tabVariant={tabVariant}
        onChange={(index) => {
          localStorage.setItem(
            storageKey,
            JSON.stringify(items[index].props.children[0].type.name)
          );

          mutate(items[index].props.children[0].type.name, false);

          gtag.event({
            action: "tech_stack_tab",
            category: "documentation",
            value: items[index].props.children[0].type.name,
          });
        }}
        selectedIndex={selectedIndex === -1 ? undefined : selectedIndex}
        items={items}
        {...props}
      >
        {children}
      </NextraTabs>
    </>
  );
};
