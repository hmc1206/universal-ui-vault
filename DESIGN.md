# UI Vault Design & Development Specification

## 1. 컴포넌트 대량 생산 핵심 원칙 (Manus Agent Rule)
- **독립성 (No-Dependency):** 컴포넌트 파일 하나만 복사해서 타 프로젝트에 붙여넣어도 스타일과 Props가 100% 작동해야 한다. 파일 간 수평적 임포트(Import)를 금지한다.
- **스타일 완결성:** 모든 UI는 Tailwind CSS 클래스로만 완결짓는다. 별도의 `.css` 파일이나 `style` 속성 참조를 금지한다.
- **코드 완전 출력:** `full-output-enforcement` 스킬을 적용하여, 마누스는 어떤 경우에도 코드를 생략(`// 기존 코드와 동일`)하지 않고 전체 소스코드를 완전하게 출력한다.

## 2. 테마별 디자인 스펙 (Brand DNA)

### [Theme: Toss] - 미니멀 금융
- Primary Color: `#3182f6` (Toss Blue)
- Base Radius: `8px`
- Voice: 금융 용어를 배제하고 솔직하고 다정하게. 'Get Started' 같은 기계적인 영문 표현 금지.

### [Theme: Stripe] - 글로벌 결제 SaaS
- Primary Color: `#635bff` (Stripe Purple)
- Visulas: 유려하고 부드러운 그라디언트, 미세한 skeuomorphic 쉐도우 효과 적극 활용.
- Voice: 명확하고 기술적인 신뢰감을 주는 톤앤매너.

### [Theme: Linear] - 고성능 테크 다크모드
- Background: `#0c0c0d` / Accent: `#5e6ad2`
- Visulas: 극도의 보더 픽셀 완벽주의, 모노톤 배색, 고성능 대시보드 감성.
- Voice: 빌더(Developer)를 위한 군더더기 없고 정제된 프로페셔널 톤.

## 3. 파일 생성 가이드
- 단품 UI는 `src/components/primitive/[카테고리]/[Theme][UI이름].tsx` 형태로 생성한다.
  - 예: `src/components/primitive/buttons/StripeButton.tsx`
- 완성형 패턴은 `src/components/templates/[카테고리]/[Theme][패턴이름].tsx` 형태로 생성한다.
  - 예: `src/components/templates/fintech/TossRemittanceForm.tsx`
