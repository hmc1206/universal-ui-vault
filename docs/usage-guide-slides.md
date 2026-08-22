## Cover

# Universal UI Vault

### 브랜드 UI를 비교하고, 조합하고, 생성하는 워크스테이션

---

## Slide 1

# 15개 브랜드, 150개 실물 컴포넌트

- 각 브랜드는 Button부터 Accordion까지 **10개 독립 TSX**로 구성됩니다.
- Live vault catalog에서 브랜드를 고르면 실제 source가 전시 카드에 렌더링됩니다.
- 목적은 복사가 아니라 **디자인 방향성 비교와 구현 기준 정리**입니다.

---

## Slide 2

# 먼저 원본 vault의 결을 읽습니다

- Live vault catalog에서 브랜드를 열고 10개 컴포넌트를 순서대로 확인합니다.
- Button·Input은 상태와 feedback을, HeroCard는 surface·여백·타이포그래피를 중점적으로 봅니다.
- 각 전시대에서 import path와 Tailwind token snippet을 바로 복사할 수 있습니다.

---

## Slide 3

# ThemeBridge는 스타일과 물성을 분리합니다

- **스타일 출처**는 palette·typography·surface의 인상을 결정합니다.
- **물성 출처**는 radius·shadow·hover response·motion의 감각을 결정합니다.
- 예: 29CM의 절제된 흑백 스타일에 Toss의 elastic depth를 조합합니다.

---

## Slide 4

# Split View가 차이를 증명합니다

- 혼합 테마를 켠 뒤 원본·혼합 Split View로 이동합니다.
- 왼쪽은 원본 vault, 오른쪽은 전시 전용 ThemeBridge skin이 적용된 결과입니다.
- Button·Input·Select·Tabs에서 accent, radius, shadow, hover의 변화를 즉시 비교합니다.

---

## Slide 5

# 접근성은 비교 가능한 상태여야 합니다

- Accessibility Simulation은 일반 모드와 시니어 모드를 나란히 보여줍니다.
- 시니어 모드는 **150% text**, 더 넓은 hit area, 높은 대비를 시각화합니다.
- 이는 검증의 출발점이며 실제 배포 전에는 키보드·스크린 리더·실사용자 테스트가 필요합니다.

---

## Slide 6

# 고급 DNA는 직접 값으로 설계합니다

- Custom brand builder에서 `#RRGGBB` semantic palette를 직접 입력합니다.
- primary·surface·ink·border·focus ring과 success·warning·danger를 독립 조절합니다.
- control·card·modal radius, border, motion duration·easing·lift·scale까지 같은 DNA에 담습니다.

---

## Slide 7

# Override로 한 컴포넌트만 다르게 만듭니다

- Target component에서 Button부터 Accordion까지 대상 하나를 고릅니다.
- Override를 켜면 accent·surface·radius·density를 전역 DNA와 별도로 정의합니다.
- 예: 전역은 sky, Button만 rose·12px·compact로 지정해 우선순위를 생성 코드에서 확인합니다.

---

## Slide 8

# DNA는 검토 가능한 10개 TSX가 됩니다

- folder slug, observed evidence, license boundary를 먼저 기록합니다.
- 생성기는 Button·Input·HeroCard·Toast·Badge·Modal·Select·Avatar·Tabs·Accordion의 전체 source를 만듭니다.
- 탭별 검토, source 복사, 개별 TSX 다운로드, Manifest JSON 내보내기를 지원합니다.

---

## Slide 9

# 안전한 handoff가 마지막 단계입니다

- ThemeBridge에 적용해 기존 vault와 바로 섞어보고 Split View에서 확인합니다.
- 브라우저 생성기는 저장소를 임의로 바꾸지 않습니다.
- 검토가 끝난 source만 `src/components/vault/[slug]/`에 반영하고 lint·build 후 커밋합니다.

---

## Slide 10

# 비교에서 출발해, 검증 가능한 시스템으로

### Explore → Mix → Validate → Define → Generate → Review → Ship
