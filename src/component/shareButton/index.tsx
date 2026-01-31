import { useEffect } from "react" // 👈 useEffect 추가
import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
// import { useKakao } from "../store" // 👈 이거 대신 window 객체 직접 사용 (더 확실함)

export const ShareButton = () => {
  // ✅ 1. 여기에 아까 찾은 'JavaScript 키'를 붙여넣으세요!
  const KAKAO_KEY = "여기에_복사한_자바스크립트_키를_넣으세요"; 
  
  // ✅ 2. 배포된 주소 고정 (오류 방지용)
  const REAL_URL = "https://dk-kim.github.io/wedding-invitation";

  useEffect(() => {
    // 카카오 기능 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오톡 초기화 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "location",
      address: SHARE_ADDRESS,
      addressTitle: SHARE_ADDRESS_TITLE,
      content: {
        title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
        description:
          WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
        imageUrl: REAL_URL + "/preview_image.png", // 이미지 주소도 확실하게
        link: {
          mobileWebUrl: REAL_URL,
          webUrl: REAL_URL,
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: REAL_URL,
            webUrl: REAL_URL,
          },
        },
      ],
    });
  };

  return (
    <LazyDiv className="footer share-button">
      <button className="ktalk-share" onClick={handleShare}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}