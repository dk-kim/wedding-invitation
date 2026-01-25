import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { SERVER_URL } from "../../env"

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  const { openModal, closeModal } = useModal()

  const initialized = useRef(false)

  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    openModal({
      className: "attendance-info-modal",
      header: <div className="title">참석 의사 전달 안내</div>,
      content: (
        <>
          <div className="info-message">
            축하의 마음으로 참석해주시는
            <br />
            모든 분들을 귀하게 모실 수 있도록
            <br />
            참석 및 식사 여부를 미리 여쭙고자 합니다.
            <div className="break" />
            부담없이 알려주시면
            <br />
            정성껏 준비하겠습니다.
          </div>
          <div className="wedding-info">
            <HeartIcon /> 신랑 {GROOM_FULLNAME} & 신부 {BRIDE_FULLNAME}
            <br />
            <CalendarIcon /> {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </>
      ),
      footer: (
        <>
          <Button
            buttonStyle="style2"
            onClick={() => {
              closeModal()
              openModal(attendanceModalInfo)
            }}
          >
            참석 의사 전달하기
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={closeModal}
          >
            닫기
          </Button>
        </>
      ),
    })
  }, [openModal, closeModal])

  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <div className="info-card">
      <div className="label">참석 의사 전달</div>
      <div className="content">
        신랑, 신부에게 참석의사를
        <br />
        미리 전달할 수 있어요.
      </div>

      <div className="break" />

      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal(attendanceModalInfo)
        }}
      >
        참석 의사 전달하기
      </Button>
    </div>
  )
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  
  // 상태 관리로 변경 (화면이 즉시 바뀌어야 하므로)
  const [side, setSide] = useState<"groom" | "bride">("groom")
  const [attendance, setAttendance] = useState<string>("yes") // yes, bus, undecided, no
  const [loading, setLoading] = useState(false)

  // 이름과 인원은 그대로 ref 사용 (타이핑할 때마다 렌더링 방지)
  const nameRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = nameRef.current?.value
          const count = Number(countRef.current?.value)

          if (!name) {
            alert("성함을 입력해주세요.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            return
          }

          if (isNaN(count)) {
            alert("참석 인원을 입력해주세요.")
            return
          }
          if (count < RULES.count.min) {
            alert(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
            return
          }

          // 서버로 보낼 데이터 (meal 필드에 attendance 값을 넣습니다)
          // DB에 'bus'라는 값이 들어가도 되는지 확인 필요!
          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              side, 
              name, 
              meal: attendance, // 서버 필드명은 meal 그대로 유지 (값은 bus 등이 들어감)
              count 
            }),
          })
          
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("참석 의사가 성공적으로 전달되었습니다.")
          closeModal()
        } catch {
          alert("참석 의사 전달에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">구분</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              checked={side === "groom"}
              onChange={() => setSide("groom")}
              hidden
            />
            <span>신랑</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              checked={side === "bride"}
              onChange={() => {
                setSide("bride")
                // 신부 측으로 바꾸면 '버스' 선택 상태를 '참석'으로 초기화 (신부측엔 버스가 없으니까)
                if (attendance === "bus") setAttendance("yes")
              }}
              hidden
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">성함</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            placeholder="참석자 성함을 입력해주세요."
            maxLength={RULES.name.maxLength}
            ref={nameRef}
          />
        </div>
      </div>

      <div className="input-group">
        {/* 라벨을 '식사'에서 '참석 여부'로 변경 */}
        <div className="label">참석 여부</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="attendance"
              value="yes"
              checked={attendance === "yes"}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <span>참석</span>
          </label>

          {/* 신랑 측일 때만 보이는 '버스탑승' 옵션 */}
          {side === "groom" && (
            <label>
              <input
                disabled={loading}
                type="radio"
                name="attendance"
                value="bus"
                checked={attendance === "bus"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              <span>버스탑승(대전)</span>
            </label>
          )}

          <label>
            <input
              disabled={loading}
              type="radio"
              name="attendance"
              value="undecided"
              checked={attendance === "undecided"}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <span>미정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="attendance"
              value="no"
              checked={attendance === "no"}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">참석 인원 (본인 포함)</div>
        <div>
          <input
            disabled={loading}
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={countRef}
          />
          명
        </div>
      </div>
    </form>
  )
}
const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        전달하기
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        닫기
      </Button>
    </>
  )
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <div className="title">참석 의사 전달하기</div>,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}
