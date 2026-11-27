import { useRedirectQuery } from "app/graphql/use-redirect-query";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "solito/router";

export default function ScheduleRedirect() {
  const { data } = useRedirectQuery({
    seasonId: undefined,
  });
  const { replace } = useRouter();

  useEffect(() => {
    if (data?.redirects.currentSeasonId) {
      replace(`/schedule/${data.redirects.currentSeasonId}`);
    }
  }, [data, replace]);

  return (
    <ScrollView
      contentContainerClassName="px-4 py-6"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* <ResultsFeatureSkeleton /> */}
    </ScrollView>
  );
}
