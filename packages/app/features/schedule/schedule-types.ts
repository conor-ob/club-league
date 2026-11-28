import type { Stage } from "../../graphql/types";

export type Schedule = {
  nextStage?: Stage;
  upcoming: ScheduleMonth[];
  completed: ScheduleMonth[];
};

export type ScheduleMonth = {
  displayName: string;
  stages: Stage[];
};
