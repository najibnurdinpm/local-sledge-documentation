import { DocsThemeConfig } from "nextra-theme-docs";
import { Badge } from "~/components/global";
import { Footer } from "~/components/layout";
import Image from "next/image";
import { IMAGE_SLEDGE_LOGO } from "~/lib/const";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as gtag from "~/components/global/GoogleAnalytics";

const config: DocsThemeConfig = {
  head: () => {
    const { pathname } = useRouter();

    const gaTrackingId = "G-JZ2M36T02S";

    useEffect(() => {
      gtag.pageview(pathname, gaTrackingId);

      //trigger ga 4 custom event on nextra search
      [...(document?.querySelectorAll(".nextra-search input") as any)]?.map(
        (el) => {
          el.oninput = function (e) {
            clearTimeout(this.delay);
            this.delay = setTimeout(
              function () {
                if (this.value) {
                  gtag.event({
                    action: "search",
                    category: "documentation",
                    value: this.value,
                  });
                }
              }.bind(this),
              800
            );
          };
        }
      );
    }, [pathname]);

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Sledge Documentation" />
        <meta
          property="og:description"
          content="Build instant search, product filters, wishlist, product review, etc. for your store using your preferred tech stacks — in just a few minutes."
        />

        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* Google tag (gtag.js)  */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
        />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaTrackingId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </>
    );
  },
  logo: (
    <span className="self-center">
      <Image
        src={IMAGE_SLEDGE_LOGO}
        width={99.91}
        height={30}
        alt="sledge-logo"
      />
    </span>
  ),
  logoLink: "https://sledge-app.com/",
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "doc" && String(title)?.includes(":")) {
        const arrTitle = String(title).split(":");

        return (
          <div className="nx-w-full group">
            <span className="c-sidebar-nav-upcoming-text">{arrTitle[0]}</span>{" "}
            {arrTitle[1] ? (
              <Badge parentClassName="nx-w-fit nx-inline-block nx-ml-1">
                {arrTitle[1]}
              </Badge>
            ) : null}
          </div>
        );
      } else {
        return type === "separator" ? (
          <span className="c-sidebar-separator">{title}</span>
        ) : (
          title
        );
      }
    },
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    component() {
      return <></>;
    },
  },
  feedback: {
    content: null,
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Sledge Documentation",
    };
  },
  project: {},
  chat: {},
  footer: {
    component: <Footer />,
  },
  nextThemes: {
    defaultTheme: "dark",
  },
  darkMode: false,
};

export default config;
