import { Card } from "app/components/card/card";
import { Column } from "app/components/layout/column";
import type { Stage } from "app/graphql/types";
import { FlatList, Text, View } from "react-native";

export function StageInfoCard({ stage }: { stage: Stage }) {
  return (
    <Column>
      <Text className="text-primary font-inter-medium ml-4 text-xl">
        Stage Info
      </Text>
      <View className="h-2" />
      <Card>
        <Column className="p-4">
          <FlatList
            data={stage.info}
            // scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-2" />}
            renderItem={({ item }) => (
              <Text className="text-primary font-inter-regular text-base">
                {item}
              </Text>
            )}
          />
        </Column>
      </Card>
    </Column>
  );
}
