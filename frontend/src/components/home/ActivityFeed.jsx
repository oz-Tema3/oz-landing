import ActivityCard from "./ActivityCard";
export default function ActivityFeed({ activities, isLoading, error }) {
  if (isLoading)
    return <div className="text-center text-gray-500 pt-10">로딩 중...</div>;
  if (error)
    return <div className="text-center text-red-500 pt-10">{error}</div>;
  if (activities.length === 0)
    return (
      <div className="text-center text-gray-500 pt-10">
        주변에 새로운 활동이 없어요.
        <br />
        가장 먼저 활동을 시작해보세요!
      </div>
    );
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}
    </div>
  );
}
