import type {
  GcQuery,
  StageFeatureQueryQuery,
  StageResultsQuery,
} from "../generated/graphql";

// client-preset 5+ only generates operation types, not schema types, so the
// shapes components share are derived from the queries that load them
export type Stage = StageFeatureQueryQuery["stage"];
export type Route = StageFeatureQueryQuery["routes"][number];
export type GcRider = GcQuery["gc"]["gcRiders"][number];
export type CategoryResults =
  StageResultsQuery["stageResults"]["categoryResults"][number];
export type StageRider = CategoryResults["stageRiders"][number];
