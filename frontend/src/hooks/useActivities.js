import { useState, useEffect } from "react";

// 실제 서버 API가 없을 때를 위한 가짜(목업) 데이터
const mockActivities = [
  {
    _id: 1,
    user: { nickname: "지민" },
    content: "강남역 근처 카페에서 코딩 중! 💻",
    hashtags: ["#코딩", "#카페"],
    createdAt: new Date(),
  },
  {
    _id: 2,
    user: { nickname: "수진" },
    content: "오랜만에 책 읽으러 왔어요.",
    hashtags: ["#독서", "#여유"],
    createdAt: new Date(),
  },
];

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1초의 딜레이를 주어 실제 네트워크 통신을 하는 것처럼 흉내 냅니다.
    const timer = setTimeout(() => {
      setActivities(mockActivities); // 1초 뒤에 가짜 데이터를 상태에 저장
      setIsLoading(false); // 로딩 상태를 false로 변경
    }, 1000);

    // 컴포넌트가 사라질 때 타이머를 정리합니다 (메모리 누수 방지)
    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 설정

  // 컴포넌트에서 사용할 데이터와 상태를 반환합니다.
  return { activities, isLoading, error };
};
