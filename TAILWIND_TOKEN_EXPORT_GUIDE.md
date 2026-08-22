# Universal UI Vault 토큰을 다른 React 프로젝트에 적용하는 가이드

**작성자: Manus AI**

이 문서는 Universal UI Vault 쇼케이스의 **Copy Tailwind Config** 기능이 내보내는 브랜드 토큰을 별도 React 프로젝트에 적용하는 방법을 설명합니다. 내보내기 결과는 색상, 서체 역할, 반경, 그림자, 전환 타이밍을 포함한 `theme.extend` 객체입니다. 현재 쇼케이스에서는 15개 브랜드에 대해 이 객체를 생성합니다.

> **중요한 경계**: 내보낸 값은 vault 컴포넌트에서 읽어낸 실용적 토큰 묶음이며, 해당 브랜드의 공식 디자인 시스템 배포물이나 상표 사용 허가가 아닙니다. 실제 제품에 적용하기 전에는 서체 라이선스, 상표·브랜드 사용 정책, 접근성, 제품 고유 요구사항을 별도로 검토해야 합니다.

| 선택지 | 적합한 프로젝트 | 권장 적용 방식 |
|---|---|---|
| Tailwind CSS v3 | `tailwind.config.js` 또는 `tailwind.config.ts`를 사용하는 React, Vite, Next.js 프로젝트 | 복사한 `theme.extend` 객체를 설정 파일에 병합 |
| Tailwind CSS v4 | CSS-first 구성을 사용하는 최신 React 프로젝트 | 내보낸 값을 `@theme` namespace가 맞는 CSS 변수로 변환 |
| 런타임 테마 전환 | 하나의 앱에서 여러 브랜드 표면을 동적으로 바꾸는 경우 | 정적 utility는 유지하고 CSS custom property 또는 `data-theme`를 사용 |

Tailwind CSS v3에서는 `theme.extend`에 새 값을 병합하면 기본 테마를 보존한 채 새 utility를 추가할 수 있습니다.[1] Tailwind CSS v4는 CSS-first 구성으로 전환되었으며, `@theme`의 namespace가 생성되는 utility API를 결정합니다.[2] [3]

## 1. 쇼케이스에서 토큰 복사하기

브랜드 전시대를 열고 오른쪽 상단의 **Copy Tailwind Config** 버튼을 누릅니다. 버튼이 **Tailwind Config 복사됨**으로 바뀌면 클립보드에 아래와 같은 TypeScript 객체가 들어 있습니다.

```ts
// 29CM vault theme tokens
export const TwentyNineCmTailwindTheme = {
  theme: {
    extend: {
      colors: {
        brand: "#111111",
        "brand-surface": "#FFFFFF",
        "brand-ink": "#111111",
        "brand-contrast": "#FF4800",
      },
      fontFamily: {
        brand: ["Pretendard, sans-serif"],
        "brand-display": ["Pretendard, sans-serif"],
      },
      borderRadius: {
        brand: "0px",
      },
      boxShadow: {
        brand: "0 12px 30px rgba(17,17,17,0.12)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
} as const;
```

이 객체는 **한 브랜드의 단일 theme extension**입니다. 두 개 이상의 브랜드를 동시에 전역 설정에 병합하면 동일한 `brand` key가 마지막 값으로 덮어써집니다. 혼합 테마가 필요하다면 아래의 런타임 테마 전략을 사용하거나 `brand29cm`, `brandToss`처럼 key를 명시적으로 namespace 하십시오.

## 2. Tailwind CSS v3 프로젝트에 적용하기

Tailwind CSS v3 프로젝트에서는 내보낸 객체를 `src/design/brand-theme.ts`에 저장하고 `tailwind.config.ts`에서 `theme.extend`에 병합합니다. v3의 `extend`는 기본 tokens를 제거하지 않고 새 값을 추가합니다.[1]

### 2.1 `src/design/brand-theme.ts`

```ts
export const TwentyNineCmTailwindTheme = {
  theme: {
    extend: {
      colors: {
        brand: "#111111",
        "brand-surface": "#FFFFFF",
        "brand-ink": "#111111",
        "brand-contrast": "#FF4800",
      },
      fontFamily: {
        brand: ["Pretendard, sans-serif"],
        "brand-display": ["Pretendard, sans-serif"],
      },
      borderRadius: {
        brand: "0px",
      },
      boxShadow: {
        brand: "0 12px 30px rgba(17,17,17,0.12)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
} as const;
```

### 2.2 `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";
import { TwentyNineCmTailwindTheme } from "./src/design/brand-theme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      ...TwentyNineCmTailwindTheme.theme.extend,
    },
  },
  plugins: [],
} satisfies Config;
```

CommonJS 설정 파일을 쓰는 프로젝트라면 다음처럼 적용합니다.

```js
const { TwentyNineCmTailwindTheme } = require("./src/design/brand-theme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...TwentyNineCmTailwindTheme.theme.extend,
    },
  },
  plugins: [],
};
```

### 2.3 React에서 utility 사용하기

설정이 반영되면 `bg-brand`, `text-brand-ink`, `font-brand`, `rounded-brand`, `shadow-brand`, `ease-brand` utility를 사용할 수 있습니다.

```tsx
export function AccountCallToAction() {
  return (
    <section className="rounded-brand border border-brand-ink/15 bg-brand-surface p-6 shadow-brand">
      <p className="font-brand text-sm text-brand-ink/70">새로운 작업</p>
      <h2 className="mt-2 font-brand-display text-3xl font-bold text-brand-ink">다음 흐름을 시작하세요.</h2>
      <button
        className="mt-5 min-h-11 rounded-brand bg-brand px-4 font-brand text-sm font-semibold text-white transition duration-200 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-contrast focus-visible:ring-offset-2"
        type="button"
      >
        계속하기
      </button>
    </section>
  );
}
```

## 3. Tailwind CSS v4 프로젝트에 적용하기

Tailwind CSS v4는 JavaScript 설정 대신 CSS의 `@theme` 구성을 권장합니다.[2] `@theme` 안에서 `--color-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--ease-*` namespace를 사용하면 대응하는 utility가 생성됩니다.[3]

내보낸 JavaScript 객체는 v3 호환 형식이므로, v4에서는 아래처럼 CSS theme variables로 옮기는 것이 가장 직접적입니다.

### 3.1 `src/styles/brand-theme.css`

```css
@import "tailwindcss";

@theme {
  --color-brand: #111111;
  --color-brand-surface: #ffffff;
  --color-brand-ink: #111111;
  --color-brand-contrast: #ff4800;

  --font-brand: Pretendard, sans-serif;
  --font-brand-display: Pretendard, sans-serif;

  --radius-brand: 0px;
  --shadow-brand: 0 12px 30px rgba(17, 17, 17, 0.12);
  --ease-brand: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

프로젝트의 entry CSS에서 해당 파일을 import합니다.

```css
@import "./styles/brand-theme.css";
```

v4에서도 React markup은 v3와 동일하게 `bg-brand`, `font-brand`, `rounded-brand`, `shadow-brand`, `ease-brand`를 사용합니다. `@theme`에 정의한 값은 utility뿐 아니라 일반 CSS variable로도 접근할 수 있습니다.[3]

## 4. 한 프로젝트에서 여러 브랜드를 다루는 방법

서로 다른 브랜드를 전역 `brand` key에 병합하지 마십시오. 브랜드를 동시에 유지해야 한다면 namespace를 만듭니다.

### 4.1 v3 namespace 예시

```ts
export const MixedBrandTheme = {
  theme: {
    extend: {
      colors: {
        "29cm-brand": "#111111",
        "29cm-surface": "#FFFFFF",
        "toss-brand": "#3182F6",
        "toss-surface": "#E8F3FF",
      },
      boxShadow: {
        "toss-depth": "0 18px 42px rgba(49,130,246,0.20)",
      },
      transitionTimingFunction: {
        "toss-elastic": "cubic-bezier(0.22, 1.2, 0.36, 1)",
      },
    },
  },
} as const;
```

```tsx
export function MixedBrandPanel() {
  return (
    <article className="rounded-none border border-29cm-brand/20 bg-29cm-surface p-6 shadow-toss-depth">
      <p className="text-29cm-brand">29CM palette</p>
      <button className="mt-4 min-h-11 bg-29cm-brand px-4 font-semibold text-white transition ease-toss-elastic" type="button">
        Toss material
      </button>
    </article>
  );
}
```

### 4.2 v4 namespace 예시

```css
@import "tailwindcss";

@theme {
  --color-29cm-brand: #111111;
  --color-29cm-surface: #ffffff;
  --color-toss-brand: #3182f6;
  --color-toss-surface: #e8f3ff;
  --shadow-toss-depth: 0 18px 42px rgba(49, 130, 246, 0.2);
  --ease-toss-elastic: cubic-bezier(0.22, 1.2, 0.36, 1);
}
```

### 4.3 런타임 brand switch는 CSS variable로 제한하기

Tailwind는 소스에 존재하는 class를 기준으로 CSS를 만듭니다. 따라서 `bg-${brand}`처럼 런타임 문자열로 class를 생성하지 말고, 정적인 utility와 CSS custom property를 함께 사용하십시오.

```tsx
import { useState } from "react";

type ThemeName = "29cm" | "toss";

const themes: Record<ThemeName, { primary: string; surface: string; ink: string }> = {
  "29cm": { primary: "#111111", surface: "#ffffff", ink: "#111111" },
  toss: { primary: "#3182f6", surface: "#e8f3ff", ink: "#191f28" },
};

export function RuntimeThemePanel() {
  const [themeName, setThemeName] = useState<ThemeName>("29cm");
  const theme = themes[themeName];

  return (
    <section
      className="rounded-2xl p-6 shadow-xl"
      style={{
        "--brand-primary": theme.primary,
        "--brand-surface": theme.surface,
        "--brand-ink": theme.ink,
      } as React.CSSProperties}
    >
      <button className="min-h-11 rounded-xl bg-[var(--brand-primary)] px-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-2" onClick={() => setThemeName(themeName === "29cm" ? "toss" : "29cm")} type="button">
        {themeName === "29cm" ? "Toss로 전환" : "29CM으로 전환"}
      </button>
      <p className="mt-4 text-[var(--brand-ink)]">현재 선택한 브랜드의 token surface입니다.</p>
    </section>
  );
}
```

위 예시는 런타임 전환을 설명하기 위해 `style`을 사용합니다. Universal UI Vault의 단일 vault 컴포넌트 규칙은 Tailwind-only이지만, **다른 프로젝트의 runtime theme host**에서는 CSS custom property가 올바른 사용 사례가 될 수 있습니다. 혼합 brand surface는 브랜드의 공식 디자인 시스템을 뜻하지 않는 로컬 presentation layer로 취급하십시오.

## 5. 서체, 모션, 접근성 확인

내보내기 객체의 `fontFamily`은 서체 역할을 전달할 뿐 실제 font file을 포함하지 않습니다. 해당 서체가 라이선스와 배포 조건을 충족하는지 확인한 뒤, `@font-face`, 사내 font CDN 또는 적법한 provider로 별도로 로드해야 합니다. 서체를 로드하지 않을 경우 명시적인 fallback stack을 추가하십시오.

고유한 shadow와 timing curve는 보기 좋은 효과보다 상태 전달을 우선해야 합니다. 모든 interactive element에는 keyboard focus가 보여야 하며, `prefers-reduced-motion` 사용자는 움직임을 줄일 수 있어야 합니다.

```tsx
export function AccessibleBrandAction() {
  return (
    <button className="min-h-12 rounded-brand bg-brand px-5 font-brand font-semibold text-white shadow-brand transition duration-200 ease-brand motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-contrast focus-visible:ring-offset-2" type="button">
      저장하고 계속하기
    </button>
  );
}
```

| 확인 항목 | 검증 방법 |
|---|---|
| 색 대비 | 브랜드 surface 위의 body text와 control label을 실제 상태별로 검토합니다. |
| Keyboard focus | Tab과 Shift+Tab으로 모든 action에 도달하고, `focus-visible` ring이 배경과 구별되는지 확인합니다. |
| Hit area | 주요 action을 최소 44–48px 높이로 유지하고 touch target 간 간격을 확보합니다. |
| Reduced motion | `motion-reduce`에서 hover lift, scale, long transition이 제거되는지 확인합니다. |
| Font fallback | 네트워크가 느리거나 custom font가 로드되지 않을 때도 가독성과 layout이 유지되는지 확인합니다. |

## 6. 적용 후 검증 순서

토큰을 적용한 뒤에는 개발 서버만 확인하지 말고 production build를 실행하십시오.

```bash
npm run build
```

그 다음, 실제 페이지에서 token utility가 생성되었는지, light/dark 또는 high-contrast 상태에서 contrast가 유지되는지, 모바일에서 button과 input의 hit area가 충분한지 확인합니다. 애플리케이션이 사용하지 않는 브랜드 token을 전역적으로 모두 주입할 이유는 없습니다. 필요한 브랜드 또는 namespace만 선택적으로 포함하면 CSS surface와 운영 복잡도를 줄일 수 있습니다.

## 7. 자주 발생하는 문제

| 증상 | 원인 | 해결 |
|---|---|---|
| `bg-brand`가 생성되지 않음 | v3에서 `content`가 해당 TSX를 찾지 못했거나 v4에서 `--color-brand`가 `@theme` 밖에 있음 | v3 `content` glob을 점검하고, v4는 top-level `@theme`에 `--color-brand`를 선언합니다. |
| `rounded-brand` 또는 `shadow-brand`가 동작하지 않음 | namespace가 다르거나 theme key가 누락됨 | v3에서는 `borderRadius.brand`/`boxShadow.brand`, v4에서는 `--radius-brand`/`--shadow-brand`를 사용합니다. |
| 글꼴이 바뀌지 않음 | token은 선언했지만 font asset을 로드하지 않음 | 적법한 font source를 연결하고 fallback stack을 선언합니다. |
| 두 브랜드가 서로 덮어씀 | 둘 다 `brand` key를 사용함 | `29cm-brand`, `toss-brand`처럼 namespace 하거나 CSS variable host를 사용합니다. |
| 런타임 class가 빌드에서 사라짐 | `bg-${name}`처럼 동적으로 class를 조립함 | 정적 class 또는 CSS custom property로 전환합니다. |

## References

[1] [Tailwind CSS v3 — Theme Configuration](https://v3.tailwindcss.com/docs/theme)

[2] [Tailwind CSS v4.0 — CSS-first configuration](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

[3] [Tailwind CSS — Theme variables and utility namespaces](https://tailwindcss.com/docs/theme)
