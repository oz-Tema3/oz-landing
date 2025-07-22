// analysis.js

// 1. 데이터 정의 (궁합 정보 추가)
const mbtiData = {
  ISTJ: {
    keyword: "현실주의자",
    trait: "논리적이고 현실적인 기준으로 세상과 관계를 바라봅니다.",
    style: "신뢰를 바탕으로 안정적인 관계를 구축합니다.",
    bestMatch: "ESFP",
    challengingMatch: "ENFP",
  },
  ISFJ: {
    keyword: "수호자",
    trait: "따뜻하고 헌신적인 마음으로 주변 사람들을 묵묵히 챙깁니다.",
    style: "상대방의 필요를 먼저 알아차리고 헌신적으로 지원합니다.",
    bestMatch: "ESTP",
    challengingMatch: "ENTP",
  },
  INFJ: {
    keyword: "옹호자",
    trait: "깊은 통찰력과 이상주의를 바탕으로 더 나은 관계를 꿈꿉니다.",
    style: "정신적 교감을 중요시하며, 의미있는 관계를 추구합니다.",
    bestMatch: "ENFP",
    challengingMatch: "ESTP",
  },
  INTJ: {
    keyword: "전략가",
    trait: "모든 가능성을 분석하고, 관계에도 전략적인 접근을 선호합니다.",
    style: "감정 표현보다 논리적인 해결책을 통해 애정을 표현합니다.",
    bestMatch: "ENTP",
    challengingMatch: "ESFP",
  },
  ISTP: {
    keyword: "장인",
    trait: "상황을 관찰하고, 문제 해결에 직접 뛰어드는 것을 즐깁니다.",
    style: "함께 활동하고 경험을 공유하며 관계를 발전시킵니다.",
    bestMatch: "ESFJ",
    challengingMatch: "ENFJ",
  },
  ISFP: {
    keyword: "모험가",
    trait: "유연하고 즉흥적인 태도로 삶과 사랑의 아름다움을 탐험합니다.",
    style: "현재의 감정에 충실하며, 자유로운 형태의 애정을 나눕니다.",
    bestMatch: "ENFJ",
    challengingMatch: "ESTJ",
  },
  INFP: {
    keyword: "중재자",
    trait: "자신의 가치관과 진실한 감정을 바탕으로 관계를 맺습니다.",
    style: "동화같이 이상적인 사랑을 꿈꾸며, 깊은 정서적 유대를 갈망합니다.",
    bestMatch: "ENTJ",
    challengingMatch: "ESTP",
  },
  INTP: {
    keyword: "논리술사",
    trait: "지적인 호기심으로 세상을 분석하며, 논리적인 대화를 즐깁니다.",
    style: "지적 토론과 아이디어 공유를 최고의 데이트로 생각합니다.",
    bestMatch: "ESTJ",
    challengingMatch: "ESFJ",
  },
  ESTP: {
    keyword: "사업가",
    trait: "에너지가 넘치며, 스릴과 즉각적인 행동을 통해 관계를 발전시킵니다.",
    style: "지루함을 싫어하며, 늘 새롭고 자극적인 데이트를 원합니다.",
    bestMatch: "ISFJ",
    challengingMatch: "INFJ",
  },
  ESFP: {
    keyword: "엔터테이너",
    trait: "타고난 사교성과 즐거움으로 주변을 파티 분위기로 만듭니다.",
    style: "함께 즐기는 순간을 중요시하며, 긍정적인 에너지를 나눕니다.",
    bestMatch: "ISTJ",
    challengingMatch: "INTJ",
  },
  ENFP: {
    keyword: "활동가",
    trait: "새로운 사람과 아이디어에 대한 열정으로 가득 차 있습니다.",
    style: "쉽게 사랑에 빠지고, 관계에 무한한 긍정과 열정을 쏟아붓습니다.",
    bestMatch: "INFJ",
    challengingMatch: "ISTJ",
  },
  ENTP: {
    keyword: "변론가",
    trait:
      "지적인 도전을 즐기며, 재치있는 논쟁으로 관계에 활기를 불어넣습니다.",
    style: "티키타카가 잘 맞는 상대와 지적으로 겨루며 애정을 키웁니다.",
    bestMatch: "INTJ",
    challengingMatch: "ISFJ",
  },
  ESTJ: {
    keyword: "경영자",
    trait: "체계와 질서를 중시하며, 관계를 책임감 있게 이끌어갑니다.",
    style: "안정성과 예측 가능성을 중요시하며, 관계의 리더 역할을 자처합니다.",
    bestMatch: "INTP",
    challengingMatch: "INFP",
  },
  ESFJ: {
    keyword: "집정관",
    trait: "타인에 대한 깊은 관심과 배려로 조화로운 관계를 만들어갑니다.",
    style:
      "상대방을 살뜰히 챙기는 것에서 사랑을 느끼며, 사회적 인정도 중요시합니다.",
    bestMatch: "ISTP",
    challengingMatch: "INTP",
  },
  ENFJ: {
    keyword: "선도자",
    trait: "카리스마와 열정으로 사람들을 이끌고, 관계에 영감을 줍니다.",
    style:
      "상대방의 성장을 돕고 지지하며, 함께 더 나은 사람이 되기를 바랍니다.",
    bestMatch: "ISFP",
    challengingMatch: "ISTP",
  },
  ENTJ: {
    keyword: "사령관",
    trait: "결단력과 비전으로 관계의 목표를 설정하고 대담하게 추진합니다.",
    style: "목표 지향적인 관계로, 함께 미래를 건설할 파트너를 찾습니다.",
    bestMatch: "INFP",
    challengingMatch: "ISFP",
  },
};

const bloodTypeData = {
  A: {
    keyword: "섬세한",
    trait: "안정감을 중요시하고 상대방을 세심하게 배려하는 모습을 보입니다.",
    weakness: "하지만 때로는 사소한 것에 너무 많이 걱정하는 경향이 있습니다.",
  },
  B: {
    keyword: "자유로운",
    trait:
      "틀에 얽매이지 않고, 자신의 감정에 솔직하게 행동하는 경향이 있습니다.",
    weakness: "가끔은 자기중심적으로 비춰져 오해를 사기도 합니다.",
  },
  O: {
    keyword: "사교적인",
    trait: "타고난 리더십과 표현력으로 관계의 중심에 서는 경우가 많습니다.",
    weakness:
      "자존심이 강해 지는 것을 싫어하고, 가끔은 고집스러워 보일 수 있습니다.",
  },
  AB: {
    keyword: "합리적인",
    trait: "객관적인 시선으로 상황을 분석하며, 신비로운 거리감을 유지합니다.",
    weakness: "감정 표현에 서툴러 차갑다는 인상을 줄 수 있습니다.",
  },
};

const zodiacData = {
  Aries: {
    keyword: "개척자",
    trait: "관계의 시작에 있어 저돌적이고 열정적인 에너지를 뿜어냅니다.",
    strength: "솔직하고 용기 있는 당신의 행동은 관계에 활력을 불어넣습니다.",
    bestMatch: "Libra",
    reason: "당신의 뜨거운 열정을 상대방의 균형 감각이 우아하게 조율해줍니다.",
    challengingMatch: "Capricorn",
    challengeReason: "당신의 즉흥성과 상대방의 신중함이 부딪힐 수 있습니다.",
  },
  Taurus: {
    keyword: "미식가",
    trait:
      "현실적이고 감각적인 즐거움을 중요시하며, 뚝심 있게 관계를 지켜나갑니다.",
    strength: "한결같은 당신의 모습은 상대방에게 깊은 안정감을 줍니다.",
    bestMatch: "Scorpio",
    reason:
      "당신의 현실적인 안정감을 상대방의 깊이 있는 열정이 더욱 풍부하게 만듭니다.",
    challengingMatch: "Aquarius",
    challengeReason:
      "안정을 추구하는 당신과 변화를 즐기는 상대는 다른 세상을 꿈꿉니다.",
  },
  Gemini: {
    keyword: "유희자",
    trait: "재치있는 대화와 새로운 경험을 통해 관계에 즐거움을 더합니다.",
    strength:
      "뛰어난 유머 감각과 사교성은 어떤 관계든 지루할 틈이 없게 만듭니다.",
    bestMatch: "Sagittarius",
    reason:
      "두 사람 모두 새로운 경험을 즐기기에, 함께라면 세상은 거대한 놀이터가 됩니다.",
    challengingMatch: "Virgo",
    challengeReason:
      "자유로운 당신의 소통 방식과 상대의 분석적인 태도가 서로를 피곤하게 할 수 있습니다.",
  },
  Cancer: {
    keyword: "몽상가",
    trait:
      "감성적이고 보호적인 본능으로, 사랑하는 사람에게 깊은 안식처가 되어줍니다.",
    strength:
      "타의 추종을 불허하는 공감 능력으로 상대방의 마음을 어루만집니다.",
    bestMatch: "Capricorn",
    reason:
      "현실적인 상대가 당신의 꿈을 지지해주고, 당신은 상대에게 따뜻한 안식처가 되어줍니다.",
    challengingMatch: "Aries",
    challengeReason:
      "섬세한 당신에게 상대의 직설적인 표현은 상처가 될 수 있습니다.",
  },
  Leo: {
    keyword: "군주",
    trait: "화려한 존재감과 자신감으로, 연애에서도 주인공이 되기를 원합니다.",
    strength:
      "당신의 긍정적이고 화끈한 애정 표현은 관계를 더욱 뜨겁게 만듭니다.",
    bestMatch: "Aquarius",
    reason:
      "서로의 독창성을 인정해주며, 함께 있을 때 가장 빛나는 커플이 될 수 있습니다.",
    challengingMatch: "Taurus",
    challengeReason:
      "주도적인 당신과 뚝심 있는 상대는 보이지 않는 힘겨루기를 할 수 있습니다.",
  },
  Virgo: {
    keyword: "분석가",
    trait:
      "꼼꼼하고 완벽주의적인 성향으로, 관계의 작은 디테일까지 신경 씁니다.",
    strength: "현실적인 조언과 세심한 배려는 관계를 더욱 단단하게 만듭니다.",
    bestMatch: "Pisces",
    reason:
      "당신의 현실 감각이 상대의 몽상가적 기질을 잡아주고, 상대는 당신의 삶에 감성을 더합니다.",
    challengingMatch: "Gemini",
    challengeReason:
      "계획적인 당신에게 상대의 즉흥적인 모습은 예측 불가능한 스트레스일 수 있습니다.",
  },
  Libra: {
    keyword: "외교관",
    trait:
      "조화와 균형을 중시하며, 관계의 평화를 위해 노력하는 모습을 보입니다.",
    strength:
      "상대방을 존중하는 당신의 태도는 언제나 평화롭고 안정적인 관계를 유지시켜 줍니다.",
    bestMatch: "Aries",
    reason:
      "상대의 추진력이 당신의 고민을 덜어주고, 당신은 상대에게 신중함을 더해주는 최고의 파트너입니다.",
    challengingMatch: "Cancer",
    challengeReason:
      "이성적인 당신과 감성적인 상대는 문제 해결 방식에서 차이를 보일 수 있습니다.",
  },
  Scorpio: {
    keyword: "탐정",
    trait:
      "상대의 깊은 내면까지 알고 싶어하며, 한번 맺은 인연에 강하게 몰입합니다.",
    strength:
      "한 사람에게 집중하는 당신의 깊이 있는 사랑은 무엇과도 바꿀 수 없습니다.",
    bestMatch: "Taurus",
    reason:
      "상대의 굳건함이 당신의 강한 감정을 받아주는 최고의 그릇이 되어줍니다.",
    challengingMatch: "Leo",
    challengeReason:
      "두 사람 모두 자존심이 강해, 한번 시작된 갈등은 크게 번질 수 있습니다.",
  },
  Sagittarius: {
    keyword: "여행자",
    trait: "자유로운 탐험 정신으로, 얽매이지 않는 쿨한 관계를 추구합니다.",
    strength:
      "긍정적이고 유머러스한 당신의 태도는 관계에 즐거운 에너지를 더합니다.",
    bestMatch: "Gemini",
    reason:
      "두 사람의 호기심과 유머 코드가 만나, 세상을 탐험하는 최고의 친구이자 연인이 됩니다.",
    challengingMatch: "Pisces",
    challengeReason:
      "자유를 추구하는 당신에게 상대의 헌신적인 모습은 때로 부담으로 다가올 수 있습니다.",
  },
  Capricorn: {
    keyword: "설계자",
    trait: "책임감과 야망을 바탕으로, 관계의 미래를 진지하게 설계해나갑니다.",
    strength:
      "당신의 강한 책임감과 성실함은 연인에게 가장 든든한 버팀목이 되어줍니다.",
    bestMatch: "Cancer",
    reason:
      "당신이 세운 현실적인 계획에 상대의 따뜻한 감성이 더해져 이상적인 가정을 이룹니다.",
    challengingMatch: "Aries",
    challengeReason:
      "신중한 당신에게 상대의 저돌적인 모습은 너무 무모하게 보일 수 있습니다.",
  },
  Aquarius: {
    keyword: "혁명가",
    trait:
      "독창적이고 친구 같은 관계로, 서로의 개성을 존중하는 것을 중요시합니다.",
    strength:
      "틀에 박히지 않은 당신의 생각은 관계를 늘 새롭게 유지시켜 줍니다.",
    bestMatch: "Leo",
    reason:
      "서로의 특별함을 즉시 알아보고, 각자의 개성을 존중하는 가장 멋진 커플이 됩니다.",
    challengingMatch: "Taurus",
    challengeReason:
      "변화를 즐기는 당신과 안정을 추구하는 상대는 삶의 방향성에서 차이를 느낄 수 있습니다.",
  },
  Pisces: {
    keyword: "예술가",
    trait: "낭만적인 상상력과 헌신적인 마음으로, 동화 같은 사랑을 꿈꿉니다.",
    strength:
      "상대방의 감정을 내 것처럼 느끼는 당신의 깊은 공감 능력은 최고의 무기입니다.",
    bestMatch: "Virgo",
    reason:
      "상대의 현실적인 감각이 당신의 꿈을 지지하고, 당신은 상대의 삶에 따뜻한 감성을 불어넣습니다.",
    challengingMatch: "Sagittarius",
    challengeReason:
      "헌신적인 당신에게 상대의 자유로운 모습은 때로 외로움을 느끼게 할 수 있습니다.",
  },
};

// 2. 아키타입 이름 생성 함수
function getArchetype(mbti, bloodType, zodiac) {
  return {
    title: `${zodiacData[zodiac].keyword} ${mbtiData[mbti].keyword}`,
    subtitle: `${bloodTypeData[bloodType].keyword} ${zodiacData[zodiac].keyword}`,
  };
}

// 3. 상세 분석 생성 함수
function generateDetailedAnalysis(mbti, bloodType, zodiac) {
  const mbtiInfo = mbtiData[mbti];
  const bloodInfo = bloodTypeData[bloodType];
  const zodiacInfo = zodiacData[zodiac];

  return {
    mbtiTrait: `MBTI 특성: ${mbtiInfo.trait}`,
    bloodTypeTrait: `혈액형 기질: ${bloodInfo.trait}`,
    zodiacTrait: `별자리 매력: ${zodiacInfo.trait}`,
    romanticStyle: mbtiInfo.style,
    strength: zodiacInfo.strength,
    weakness: bloodInfo.weakness,
  };
}

// 4. 궁합 정보 생성 함수 (신규)
function getChemistry(mbti, zodiac) {
  const mbtiInfo = mbtiData[mbti];
  const zodiacInfo = zodiacData[zodiac];

  // Best Match 정보 조합
  const bestMatchMbti = mbtiInfo.bestMatch;
  const bestMatchZodiac = zodiacInfo.bestMatch;
  const bestMatchName = `${zodiacData[bestMatchZodiac].keyword} ${mbtiData[bestMatchMbti].keyword}`;
  const bestMatchDescription = mbtiData[bestMatchMbti].trait;
  const bestMatchReason = zodiacInfo.reason;

  // Challenging Match 정보 조합
  const challengingMatchMbti = mbtiInfo.challengingMatch;
  const challengingMatchZodiac = zodiacInfo.challengingMatch;
  const challengingMatchName = `${zodiacData[challengingMatchZodiac].keyword} ${mbtiData[challengingMatchMbti].keyword}`;
  const challengingMatchDescription = mbtiData[challengingMatchMbti].trait;
  const challengingMatchReason = zodiacInfo.challengeReason;

  return {
    best: {
      name: bestMatchName,
      description: bestMatchDescription,
      reason: bestMatchReason,
    },
    challenging: {
      name: challengingMatchName,
      description: challengingMatchDescription,
      reason: challengingMatchReason,
    },
  };
}
