## 기술 스택 및 프레임워크

- **프레임워크**: Next.js (Pages Router 기반)
- **언어**: TypeScript (필수)
- **스타일링**: Tailwind CSS
- **상태 관리**
    - 클라이언트 상태: Zustand
- **API 호출**: axios (인터셉터 기반 인증/헤더 처리)
- **라우팅 방식**: Pages Router (익숙함 기반 선택)
- **버전 정책**: 최신 안정화 버전 사용 (2025.08 기준)

| 영역 | 권장 버전 | 비고/이유 |
| --- | --- | --- |
| Next.js | 15.5.x | 최신 안정, Turbopack/ESLint 개선 |
| TypeScript | 5.9 | 최신 기능, 호환성 강화 |
| Tailwind CSS | 4.x | 설정 단순화, 성능 개선 |
| Zustand | 5.0.8 | React 18/19 호환, 경량 상태관리 |
| TanStack Query | 5.85.x | 캐싱·무한스크롤·페이지네이션 최적 |
| axios | 1.11.x | 인터셉터 기반 인증 처리에 적합 |

## 협업 규칙

- 프로젝트 Init 후 패키지 신규 설치 및 버전 수정의 경우 꼭 팀원들에게 공지

### 커밋 컨벤션

- prefix: `Feat`, `Fix` 등등
- 설명: 구체적으로 작성 (한글 권장)
    - 예: `Feat: 메인 페이지 내 메인 이미지 수정`

### 브랜치 전략

- `main`: 배포용
- `develop`: 개발 통합 브랜치
- `feature/동사-명사`: 기능 단위 브랜치 (예: `feature/add-login`)
- Workflow:
    - 로컬 작업 → **commit** → `feature` 브랜치 **push** → **PR** → `develop` 브랜치
    - PR은 최소 1명 리뷰 / **approve** 후 **merge**

### 팀 운영 방식

- **데일리 스크럼**: 매일 오전 11시 (화/금 → 10시 30분)
    - 어제 한 일 / 오늘 할 일 / 이슈 / PR & Merge 공유
- **회고 진행**: 멘토 참여, 트러블슈팅 공유
- **팀 멘토링**: 진행사항·이슈 상시 공유

### 파일 네이밍

- **컴포넌트**: PascalCase → `DashboardCard.tsx`, `Navbar.tsx`
- **페이지**: PascalCase → `Login.tsx`, `MyDashboard.tsx`
- **Hook**: camelCase + `use` prefix → `useAuth.ts`
- **Store**: camelCase + `Store` suffix → `useAuthStore.ts`
- **유틸/상수**: camelCase → `formatDate.ts`, `messages.ts`
- **타입**: PascalCase → `User.ts`, `Dashboard.ts`
- **폴더명**: 소문자-kebab-case, 도메인 단위는 단수형

### 변수 네이밍

- 상수명: `SNAKE_CASE`
- 변수/함수명: `camelCase`
- CSS 클래스명: `kebab-case`
