/**
 * Design Philosophy: Soft Minimalism
 * - Soft indigo and light mint colors for calm, modern feel
 * - Floating sidebar with generous spacing
 * - Round corners and subtle shadows for depth
 */

export interface MenuItem {
  id: string;
  title: string;
  items?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  title: string;
  content: string;
}

export const manualData: MenuItem[] = [
  {
    id: "event-preparation",
    title: "이벤트 준비",
    items: [
      {
        id: "event-planning",
        title: "이벤트 기획",
        content: `이벤트 기획 단계에서는 목표 설정, 타겟 고객 분석, 예산 수립 등을 진행합니다.

**주요 체크리스트:**
- 이벤트 목적 및 KPI 설정
- 타겟 고객층 정의
- 예산 및 리소스 계획
- 일정 및 마일스톤 수립

이벤트의 성공을 위해서는 명확한 목표 설정이 가장 중요합니다. 각 이벤트마다 측정 가능한 지표를 설정하고, 이를 기반으로 성과를 평가해야 합니다.`
      },
      {
        id: "event-setup",
        title: "이벤트 설정",
        content: `시스템에서 이벤트를 생성하고 설정하는 방법을 안내합니다.

**설정 단계:**
1. 관리자 페이지 접속
2. '이벤트 관리' 메뉴 선택
3. '새 이벤트 만들기' 버튼 클릭
4. 이벤트 정보 입력 (제목, 기간, 조건 등)
5. 참여 대상 및 혜택 설정
6. 미리보기 및 최종 확인

모든 설정은 저장 후에도 수정 가능하며, 이벤트 시작 전까지 언제든 변경할 수 있습니다.`
      },
      {
        id: "event-promotion",
        title: "이벤트 홍보",
        content: `이벤트 홍보를 위한 다양한 채널과 방법을 소개합니다.

**홍보 채널:**
- 앱 푸시 알림
- 이메일 마케팅
- 소셜 미디어
- 배너 광고

각 채널별 특성을 고려하여 적절한 메시지와 타이밍을 설정하는 것이 중요합니다. 특히 푸시 알림의 경우 발송 시간대와 빈도를 신중하게 결정해야 합니다.`
      }
    ]
  },
  {
    id: "event-statistics",
    title: "이벤트 통계",
    items: [
      {
        id: "realtime-monitoring",
        title: "실시간 모니터링",
        content: `진행 중인 이벤트의 실시간 데이터를 확인하고 분석합니다.

**모니터링 지표:**
- 참여자 수 (실시간)
- 전환율
- 트래픽 소스
- 이탈률

대시보드를 통해 주요 지표를 한눈에 확인할 수 있으며, 이상 징후 발견 시 즉시 알림을 받을 수 있습니다.`
      },
      {
        id: "performance-analysis",
        title: "성과 분석",
        content: `이벤트 종료 후 전체 성과를 분석하고 리포트를 생성합니다.

**분석 항목:**
- 총 참여자 수 및 참여율
- 목표 달성률
- ROI (투자 대비 수익)
- 고객 피드백 분석

상세한 분석 리포트는 CSV 또는 PDF 형식으로 다운로드할 수 있으며, 향후 이벤트 기획에 참고 자료로 활용할 수 있습니다.`
      },
      {
        id: "data-export",
        title: "데이터 내보내기",
        content: `이벤트 관련 데이터를 다양한 형식으로 내보낼 수 있습니다.

**지원 형식:**
- CSV (엑셀 호환)
- JSON (API 연동)
- PDF (리포트)

데이터 내보내기 시 개인정보 보호 정책을 준수해야 하며, 필요한 권한이 있는 경우에만 접근 가능합니다.`
      }
    ]
  },
  {
    id: "gtt-show",
    title: "GTT Show",
    items: [
      {
        id: "show-management",
        title: "쇼 관리",
        content: `GTT Show의 전체 일정과 콘텐츠를 관리합니다.

**관리 기능:**
- 쇼 일정 등록 및 수정
- 출연진 정보 관리
- 티켓 판매 현황 확인
- 좌석 배치 설정

각 쇼마다 고유한 ID가 부여되며, 이를 통해 체계적인 관리가 가능합니다.`
      },
      {
        id: "ticket-system",
        title: "티켓 시스템",
        content: `티켓 발권, 환불, 재발행 등 티켓 관련 전반적인 업무를 처리합니다.

**주요 기능:**
- 티켓 발권 및 취소
- 환불 처리
- 티켓 재발행
- 입장 확인 시스템

티켓 시스템은 실시간으로 동기화되며, 중복 발권이나 오류를 방지하는 검증 시스템이 내장되어 있습니다.`
      },
      {
        id: "venue-setup",
        title: "공연장 설정",
        content: `공연장의 좌석 배치, 시설 정보 등을 설정합니다.

**설정 항목:**
- 좌석 구역 및 등급
- 시설 정보 (주차, 편의시설)
- 접근성 옵션
- 안전 수칙

공연장 정보는 고객에게 공개되므로 정확하고 최신 정보를 유지하는 것이 중요합니다.`
      }
    ]
  },
  {
    id: "admin-menu",
    title: "운영진 메뉴",
    items: [
      {
        id: "user-management",
        title: "사용자 관리",
        content: `플랫폼 사용자 및 운영진 계정을 관리합니다.

**관리 기능:**
- 계정 생성 및 삭제
- 권한 설정
- 활동 로그 조회
- 비밀번호 재설정

사용자 관리 시 권한 레벨에 따라 접근 가능한 메뉴와 기능이 제한됩니다. 최소 권한 원칙을 준수하여 보안을 강화해야 합니다.`
      },
      {
        id: "system-settings",
        title: "시스템 설정",
        content: `플랫폼의 전반적인 시스템 설정을 관리합니다.

**설정 영역:**
- 기본 설정 (언어, 시간대)
- 알림 설정
- API 키 관리
- 백업 및 복구

시스템 설정 변경 시 영향 범위를 충분히 검토한 후 진행해야 하며, 중요한 변경사항은 반드시 백업 후 수행하는 것을 권장합니다.`
      },
      {
        id: "audit-logs",
        title: "감사 로그",
        content: `시스템 내 모든 중요 활동을 기록하고 조회합니다.

**로그 항목:**
- 로그인/로그아웃 기록
- 데이터 수정 이력
- 권한 변경 내역
- 시스템 오류 로그

감사 로그는 보안 및 컴플라이언스 목적으로 최소 1년간 보관되며, 필요 시 특정 기간의 로그를 검색하고 내보낼 수 있습니다.`
      },
      {
        id: "notification-center",
        title: "알림 센터",
        content: `시스템 알림 및 공지사항을 관리합니다.

**알림 유형:**
- 시스템 공지
- 긴급 알림
- 업데이트 안내
- 점검 일정

알림은 우선순위에 따라 분류되며, 긴급 알림의 경우 모든 운영진에게 즉시 전달됩니다.`
      }
    ]
  }
];
