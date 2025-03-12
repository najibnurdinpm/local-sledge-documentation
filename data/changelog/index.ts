import * as coreLog from "~/pages/changelog-sledge-app-core.mdx";
import * as jsLog from "~/pages/changelog-js.mdx";
import * as instantSearchLog from "~/pages/changelog-sledge-app-react-instant-search.mdx";
import * as productReviewLog from "~/pages/changelog-sledge-app-react-product-review.mdx";
import * as wishlistLog from "~/pages/changelog-sledge-app-react-wishlist.mdx";
import * as productRecommendationLog from "~/pages/changelog-sledge-app-react-product-recommendation.mdx";
import * as backendLog from "~/pages/changelog-backend.mdx";

const CHANGE_LOG_VERSIONS = [
  {
    title: "@sledge-app/core",
    href: "changelog-sledge-app-core",
    latestVersion: getLatest({ type: "version", versionsLog: coreLog }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: coreLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "@sledge-app/js",
    href: "changelog-js",
    latestVersion: getLatest({ type: "version", versionsLog: jsLog }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: jsLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "@sledge-app/react-instant-search",
    href: "changelog-sledge-app-react-instant-search",
    latestVersion: getLatest({
      type: "version",
      versionsLog: instantSearchLog,
    }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: instantSearchLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "@sledge-app/react-product-review",
    href: "changelog-sledge-app-react-product-review",
    latestVersion: getLatest({
      type: "version",
      versionsLog: productReviewLog,
    }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: productReviewLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "@sledge-app/react-wishlist",
    href: "changelog-sledge-app-react-wishlist",
    latestVersion: getLatest({ type: "version", versionsLog: wishlistLog }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: wishlistLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "@sledge-app/react-product-recommendation",
    href: "changelog-sledge-app-react-product-recommendation",
    latestVersion: getLatest({
      type: "version",
      versionsLog: productRecommendationLog,
    }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: productRecommendationLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
  {
    title: "Backend",
    href: "changelog-backend",
    latestVersion: getLatest({ type: "version", versionsLog: backendLog }),
    latestVersionDate: getLatest({
      type: "date",
      versionsLog: productReviewLog,
    }),
    show: true, //TODO: remove this object when the package version has been applied
  },
];

type GetLatestFunctionType = {
  type?: "version" | "date";
  versionsLog: any;
};

export function getLatest({ type, versionsLog }: GetLatestFunctionType) {
  const toc = versionsLog?.__toc.filter((item: any) => item.depth === 2);

  if (!toc[0]) return null;

  return toc[0].value?.split(" ")[type === "version" ? 0 : 1];
}

export { CHANGE_LOG_VERSIONS };
