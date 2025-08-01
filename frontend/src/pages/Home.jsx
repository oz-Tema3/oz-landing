import { useActivities } from "../hooks/useActivities";
import ActivityFeed from "../components/home/ActivityFeed";

export default function Home() {
  const { activities, isLoading, error } = useActivities();
  return (
    <main className="flex-grow p-4 overflow-y-auto bg-gray-50">
      <ActivityFeed
        activities={activities}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
