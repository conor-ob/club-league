import { defineRailway, github, group, project, service } from "railway/iac";

export default defineRailway(() => {
  const server = service("server", {
    source: github("conor-ob/club-league", { checkSuites: true }),
    env: {
      PORT: "8080",
    },
    build: {
      buildEnvironment: "V3",
      builder: "DOCKERFILE",
      dockerfilePath: "apps/server/Dockerfile",
    },
    deploy: {
      healthcheckPath: "/healthcheck",
      // Sleep when idle; the next request wakes it with a cold start
      sleepApplication: true,
      multiRegionConfig: { "europe-west4-drams3a": { numReplicas: 1 } },
    },
  });

  const backend = group("backend", [server]);

  return project("club-league", {
    resources: [backend],
  });
});

// temporary: runs the plan job on this PR, reverted before merge
