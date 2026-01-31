import { LazyDiv } from "../lazyDiv"
// 카카오 관련 import 다 삭제했습니다.

export const ShareButton = () => {
  const handleCopyLink = () => {
    // 1. 현재 주소 가져오기 (혹은 배포 주소 직접 입력)
    const url = "https://dk-kim.github.io/wedding-invitation";

    // 2. 클립보드에 복사
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("청첩장 주소가 복사되었습니다.\n원하는 곳에 붙여넣기 해주세요! 🌸");
      })
      .catch(() => {
        alert("주소 복사에 실패했습니다.");
      });
  };

  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={handleCopyLink}
        style={{
          // 카카오 노란색 대신 깔끔한 회색/흰색 톤으로 변경
          backgroundColor: "#f0f0f0", 
          color: "#333",
          border: "1px solid #ddd"
        }}
      >
        {/* 아이콘 없이 깔끔하게 텍스트만 */}
        🔗 청첩장 주소 복사하기
      </button>
    </LazyDiv>
  )
}