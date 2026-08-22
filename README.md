# Universal UI Vault

> **15개 브랜드의 독립형 React·TypeScript·Tailwind 컴포넌트와, 이를 비교·혼합·검증·생성하는 디자인 시스템 워크스테이션**입니다.

Universal UI Vault는 서로 다른 제품 경험에서 관찰할 수 있는 디자인 방향성을 학습·비교하기 위한 프론트엔드 실험 공간입니다. 각 vault는 `Button`부터 `Accordion`까지 10개의 독립형 `.tsx` 컴포넌트를 제공하며, 쇼케이스는 실제 vault 컴포넌트를 렌더링하면서 ThemeBridge, 접근성 비교, 토큰 복사, 커스텀 DNA와 코드 생성 흐름을 제공합니다.

## 핵심 구성

| 구성 | 제공 기능 |
|---|---|
| **15개 브랜드 vault** | 29CM, Ably, Apple, Baemin, Figma, Kakao, KakaoBank, Karrot, Likelion, Musinsa, Samsung, Tesla, Toss, Upstage, 여기어때의 10종 컴포넌트 세트 |
| **실물 컴포넌트 전시** | 150개 실물 vault 컴포넌트를 정적 registry로 연결하고, 사용 가능한 인터랙션을 전시 카드에서 확인 |
| **ThemeBridge** | 한 브랜드의 palette·typography와 다른 브랜드의 material·motion을 전시 전용 skin layer에서 조합 |
| **Split View** | 원본 vault와 ThemeBridge 혼합 결과를 각 컴포넌트 카드에서 나란히 비교 |
| **Accessibility Simulation** | 고대비, 150% 텍스트, 48px 이상 hit area를 시각적으로 대조 |
| **Token exporter** | 선택한 브랜드의 Tailwind config 토큰과 import 경로를 클립보드로 복사 |
| **Custom DNA builder** | 직접 HEX로 semantic palette·상태색·focus·surface·geometry·motion을 정의 |
| **Custom vault generator** | custom DNA를 바탕으로 10개의 독립형 React·TypeScript·Tailwind TSX 전체 소스를 생성·검토·다운로드 |

## 빠른 시작

이 프로젝트는 **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**를 사용합니다.

```bash
git clone https://github.com/hmc1206/universal-ui-vault.git
cd universal-ui-vault
npm install
npm run dev
```

개발 서버가 준비되면 터미널에 표시된 로컬 주소를 엽니다. 기본 Vite 포트는 일반적으로 `http://localhost:5173`입니다.

| 명령 | 목적 |
|---|---|
| `npm run dev` | HMR을 포함한 로컬 개발 서버 실행 |
| `npm run build` | TypeScript 검사와 production 번들 생성 |
| `npm run lint` | Oxlint 정적 품질 검사 |
| `npm run preview` | production 빌드 로컬 미리보기 |

## 쇼케이스 사용법

### 1. 브랜드 vault 열기

첫 화면의 **Live vault catalog**에서 브랜드를 선택합니다. 각 브랜드 전시대에는 다음 10개 컴포넌트가 실제 vault source에서 렌더링됩니다.

| 순서 | 컴포넌트 | 확인할 내용 |
|---:|---|---|
| 01 | `Button` | variant, size, pressed·keyboard feedback |
| 02 | `Input` | focus depth, hint, error state |
| 03 | `HeroCard` | 브랜드의 주요 여백·타이포그래피·surface 구성 |
| 04 | `Toast` | success, warning, error 상태 안내 |
| 05 | `Badge` | inline tone과 상태 표현 |
| 06 | `Modal` | backdrop, Escape, close 동작 |
| 07 | `Select` | option 선택과 open state |
| 08 | `Avatar` | initials, image fallback, status |
| 09 | `Tabs` | active state와 keyboard navigation |
| 10 | `Accordion` | expanded state와 정보 위계 |

카드의 **코드 복사**는 해당 vault 파일의 import 경로를, 상단의 **Copy Tailwind Config**는 선택 브랜드의 token snippet을 복사합니다.

### 2. ThemeBridge로 브랜드 조합하기

첫 화면의 **Brand Mix & Match**에서 다음 두 출처를 선택합니다.

| 선택기 | 담당 범위 | 예시 |
|---|---|---|
| **스타일 출처** | palette, typography, surface 성격 | `29CM`의 흑백 대비 |
| **물성 출처** | radius, shadow, hover response, motion | `Toss`의 elastic depth |

**혼합 테마 켜기**를 누른 후 특정 브랜드 전시대를 열면 실제 preview 자식에 혼합 skin이 적용됩니다. 이 처리는 showcase 컨테이너에서만 일어나며, `src/components/vault/`의 원본 소스는 변경하지 않습니다.

**원본 · 혼합 Split View**를 켜면 왼쪽에 원본 vault, 오른쪽에 혼합 결과를 표시합니다. Button, Input, Select, Tabs에서 accent·radius·shadow·hover 차이를 특히 쉽게 확인할 수 있습니다.

### 3. 접근성 시뮬레이션 보기

브랜드 전시대의 **Accessibility Simulation**을 켜면 일반 모드와 시니어 모드를 대조합니다. 시니어 모드는 텍스트를 150%로 확대하고, 버튼·입력창·선택 control의 hit area를 최소 48px 수준으로 키우며, yellow-on-black 고대비 경계를 사용합니다.

> 이 기능은 접근성 적합성 인증을 대체하지 않습니다. 실제 서비스에는 키보드 탐색, 스크린 리더, 색 대비, 실제 사용자 테스트를 포함한 별도 검증이 필요합니다.

## 고급 Custom DNA 에디터

**커스텀 브랜드 만들기 → 고급 토큰 직접 편집**을 열면 preset에 의존하지 않고 직접 값을 조절할 수 있습니다. 모든 색상은 `#RRGGBB`, size는 제한된 `px` 또는 `rem`, duration은 `ms` 형식으로 검증됩니다.

| 영역 | 직접 설정 가능한 토큰 |
|---|---|
| **Semantic palette** | `primary`, `primaryHover`, `primarySoft`, `surface`, `surfaceElevated`, `ink`, `mutedInk`, `border`, `focusRing` |
| **State colors** | `success`, `warning`, `danger` |
| **Geometry** | control·card·modal radius, border width |
| **Motion** | duration, easing, hover lift, press scale |
| **Component override** | Button부터 Accordion까지 각 컴포넌트별 accent·surface·radius·density |

### Override 테스트 예시

전역 토큰은 sky 계열로 두고 Button만 rose 계열로 바꿔보면 우선순위를 명확하게 확인할 수 있습니다.

```text
Global primary:         #0EA5E9
Global surface:         #F0F9FF
Button accent override: #F43F5E
Button surface override:#FFF1F2
Button radius override: 12px
Button density:         compact
```

1. **Target component**에서 `Button`을 선택합니다.
2. **Override 사용**을 활성화합니다.
3. 위처럼 전역과 구별되는 accent·surface·radius·density를 입력합니다.
4. **이 DNA 저장**을 누릅니다.
5. **10종 코드 만들기 → 전체 10종 코드 생성**을 실행합니다.
6. 생성 결과에서 `Button.tsx`와 `Input.tsx`를 비교합니다.

`Button.tsx`에는 Button override가 정적인 Tailwind utility로 반영되고, override가 없는 `Input.tsx` 등은 전역 DNA를 상속합니다. Override를 다시 비활성화하면 해당 컴포넌트는 전역 token으로 돌아갑니다.

## 10종 코드 생성 및 내보내기

Custom vault generator는 custom DNA를 다음 경로를 기준으로 전개합니다.

```text
src/components/vault/[slug]/
├── Button.tsx
├── Input.tsx
├── HeroCard.tsx
├── Toast.tsx
├── Badge.tsx
├── Modal.tsx
├── Select.tsx
├── Avatar.tsx
├── Tabs.tsx
└── Accordion.tsx
```

생성 워크벤치에서는 다음 과정을 수행합니다.

1. **Source boundary**에 folder slug, reference URL, 관찰 근거와 로컬 확장, 라이선스·상표 경계를 기록합니다.
2. **전체 10종 코드 생성**으로 schema v2 manifest를 만듭니다.
3. 컴포넌트별 탭에서 전체 TSX source를 검토합니다.
4. 개별 TSX, 전체 source 복사, JSON manifest 중 필요한 방식으로 내보냅니다.
5. **ThemeBridge에 적용**을 눌러 같은 DNA를 기존 실물 vault의 mixed preview와 Split View에 적용합니다.

> 브라우저 워크벤치는 임의의 local vault 파일을 자동으로 저장소에 쓰거나 GitHub에 푸시하지 않습니다. 생성물을 검토한 뒤 실제 `src/components/vault/[slug]/` 반영과 커밋은 명시적인 별도 작업으로 수행하세요.

## Vault 작성 계약

새 vault 파일을 저장소에 반영할 때는 [`DESIGN.md`](./DESIGN.md)의 계약을 따릅니다.

| 규칙 | 요구 사항 |
|---|---|
| 위치 | `src/components/vault/[Brand]/` 내부 |
| 파일 | `Button.tsx`, `Input.tsx`, `HeroCard.tsx`, `Toast.tsx`, `Badge.tsx`, `Modal.tsx`, `Select.tsx`, `Avatar.tsx`, `Tabs.tsx`, `Accordion.tsx` |
| 독립성 | 파일 하나를 복사해도 동작하도록 local/horizontal import 없이 작성 |
| 스타일 | Tailwind utility만 사용하며 CSS import와 inline style을 vault source에 두지 않음 |
| 의존성 | React·TypeScript만 사용하며 외부 UI·motion·icon 라이브러리를 추가하지 않음 |
| 출력 | 축약 없이 전체 구현을 제공하고 named export와 default export를 함께 제공 |

## 프로젝트 구조

```text
src/
├── components/
│   ├── showcase/
│   │   ├── ShowcaseLayout.tsx          # 워크스테이션 진입점
│   │   ├── ComponentViewer.tsx         # 실제 vault 전시·Split View·접근성 비교
│   │   ├── ThemeBridgePanel.tsx        # ThemeBridge·recipe·custom DNA 진입점
│   │   ├── CustomBrandBuilder.tsx      # 고급 semantic token·override 편집기
│   │   ├── BrandGenerationWorkbench.tsx# 10종 source 검토·내보내기 화면
│   │   ├── brand-generator.ts          # schema v2 manifest와 TSX template 생성기
│   │   ├── custom-brand.ts             # custom DNA 검증·저장·CSS variable resolver
│   │   └── themebridge.skin.ts          # 전시 전용 ThemeBridge skin
│   └── vault/
│       └── [Brand]/                    # 브랜드별 10개 독립 TSX
├── main.tsx
└── index.css
```

## 문서

| 문서 | 목적 |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | vault 컴포넌트 구조·독립성·스타일 계약 |
| [`TAILWIND_TOKEN_EXPORT_GUIDE.md`](./TAILWIND_TOKEN_EXPORT_GUIDE.md) | 생성 토큰을 다른 React 프로젝트의 Tailwind v3/v4 환경에 적용하는 방법 |
| [`docs/usage-guide-slides.md`](./docs/usage-guide-slides.md) | 사이트 사용법 슬라이드 원고 |
| [`docs/Universal-UI-Vault-Usage-Guide.pptx`](./docs/Universal-UI-Vault-Usage-Guide.pptx) | Git에서 바로 내려받을 수 있는 11장 PowerPoint 호환 사용법 슬라이드 |

## 브랜드·권리 고지

이 저장소의 브랜드명과 시각적 방향은 비교·실험·교육 목적의 참조 대상입니다. 각 브랜드의 로고, 글꼴, 상표, 이미지, 제품 UI를 실제 제품 또는 상업적 결과물에 사용할 권리는 별도로 확인해야 합니다. Custom DNA generator의 evidence와 license boundary 필드는 바로 이 구분을 기록하기 위한 장치입니다.

## 품질 검증

```bash
npm run lint
npm run build
```

코드 생성 계약을 점검하려면 다음을 실행할 수 있습니다.

```bash
pnpm dlx tsx scripts/verify-generated-vault.ts
```

이 검사는 fixture DNA로 10개 전체 TSX가 생성되는지와 standalone·Tailwind-only 계약을 점검합니다.
