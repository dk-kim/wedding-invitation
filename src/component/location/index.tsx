import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        {/* ✨ [여기] 아래 코드를 통째로 추가하세요 (전세버스 안내) */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading" style={{ color: "var(--theme-color)" }}>
            전세버스 (대전-포항)
          </div>
          <div />
          <div className="content">
            대전 출발 시간: 9시 30분 <br />
            출발 장소: 유성장로교회 주차장 <br />
            포항 출발 시간: <br />
          </div>
        </div>
        {/* ✨ 추가 끝 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
          * 버스 이용시
            <br />
            - 700, 306, 216, 110(111)
            <br />
            포항시청 좌측 방면, 대이동 주민센터 맞은편
            <br />
          </div>
          <div />
          <div className="content">
          * 자가용 이용시
            <br />
            대구-포항 고속도로 이용시
            <br />
            → 포항요금소 직진 (포항시청 방향) 이동
            <br />→ SK, GS 이동주유소 사거리 직진
            <br />→ 포항시청 삼거리 좌회전
            <br />→ 시청 앞 삼거리 우회전
            <br />→ THE QUEEN
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>포항 더퀸</b> 검색
            <br />
            - 주차 요금은 무료입니다.
            <br />
          </div>
          <div />
          <div className="content">
            <b>
              ※ 웨딩홀 옆 노면 주차장, 포항시청 지하주차장 이용가능합니다. 
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
