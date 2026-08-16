import { useId, useMemo, useState, type FormEvent } from "react";

export interface StripePaymentCardProps {
  /** 결제 상단에 표시할 상점 또는 서비스 이름입니다. */
  merchantName?: string;
  /** 청구할 금액입니다. */
  amount?: number;
  /** ISO 4217 통화 코드입니다. */
  currency?: string;
  /** 결제 설명으로 표시할 문구입니다. */
  description?: string;
  /** 결제 버튼에 표시할 문구입니다. */
  submitLabel?: string;
  /** 폼 제출 시 정규화된 카드 정보를 전달합니다. */
  onSubmit?: (payment: {
    cardholderName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => void;
  /** 외부 결제 처리 진행 상태입니다. */
  loading?: boolean;
  /** 결제 처리가 불가능한 상태입니다. */
  disabled?: boolean;
  /** 최상위 컨테이너에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length < 3) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function CardBrandMark() {
  return (
    <div className="flex h-9 w-[58px] items-center justify-center rounded-md border border-white/20 bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm">
      <svg aria-label="카드 결제" className="h-5 w-8" fill="none" viewBox="0 0 32 20">
        <path d="M12.4 4.3h7.3l-7.6 11.4H4.8L12.4 4.3Z" fill="white" fillOpacity="0.94" />
        <path d="M20.2 4.3h7L19.6 15.7h-7.1l7.7-11.4Z" fill="#C8C4FF" fillOpacity="0.95" />
      </svg>
    </div>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
      <rect height="11" rx="2" stroke="currentColor" strokeWidth="1.8" width="15" x="4.5" y="10" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

/**
 * Stripe의 결제 경험을 모티브로 만든 독립형 카드 입력 UI입니다.
 * 모든 장식, 그라디언트, 반응형 레이아웃은 Tailwind CSS 클래스로만 구성됩니다.
 */
export function StripePaymentCard({
  merchantName = "Acme, Inc.",
  amount = 49,
  currency = "USD",
  description = "Pro 플랜 · 월간 구독",
  submitLabel,
  onSubmit,
  loading = false,
  disabled = false,
  className,
}: StripePaymentCardProps) {
  const id = useId();
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(() => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  }, [amount, currency]);

  const isFormComplete =
    cardholderName.trim().length > 1 &&
    cardNumber.replace(/\s/g, "").length >= 15 &&
    expiry.length === 5 &&
    cvc.length >= 3;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!isFormComplete || loading || disabled) {
      return;
    }

    onSubmit?.({
      cardholderName: cardholderName.trim(),
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiry,
      cvc,
    });
  }

  const buttonLabel = submitLabel ?? `${total} 결제하기`;
  const inputClassName =
    "h-11 w-full rounded-lg border border-[#d9d9e3] bg-white px-3.5 text-sm font-medium text-[#1a1b25] outline-none transition-[border-color,box-shadow] placeholder:text-[#8b8c9a] focus:border-[#635bff] focus:ring-4 focus:ring-[#635bff]/10 disabled:cursor-not-allowed disabled:bg-[#f7f7fa]";

  return (
    <section
      aria-label="결제 정보"
      className={joinClasses(
        "relative w-full max-w-[430px] overflow-hidden rounded-2xl border border-[#e6e6ef] bg-[#fbfbfd] p-4 shadow-[0_22px_55px_-24px_rgba(30,32,52,0.38),0_8px_20px_-12px_rgba(99,91,255,0.2)] sm:p-5",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-[#f1efff] via-[#fafafe] to-[#e8f5ff]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#897eff]/20 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6a78]">결제 대상</p>
            <h2 className="mt-1 text-base font-semibold tracking-[-0.02em] text-[#1a1b25]">{merchantName}</h2>
          </div>
          <div className="rounded-lg border border-[#e0defd] bg-white/75 px-3 py-1.5 text-right shadow-[0_1px_2px_rgba(33,31,76,0.06)] backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#777489]">총 결제금액</p>
            <p className="mt-0.5 text-sm font-bold tracking-[-0.02em] text-[#26233d]">{total}</p>
          </div>
        </div>

        <div className="relative mb-5 overflow-hidden rounded-xl border border-[#7770f0]/55 bg-gradient-to-br from-[#6c63ff] via-[#635bff] to-[#4439b3] p-5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.26),inset_0_-14px_28px_rgba(34,25,123,0.28),0_14px_24px_-14px_rgba(65,55,195,0.72)]">
          <div aria-hidden="true" className="absolute -right-8 -top-14 h-40 w-40 rounded-full bg-[#aaecff]/30 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-16 left-4 h-32 w-32 rounded-full bg-[#c5a6ff]/25 blur-2xl" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(110deg,transparent_18%,rgba(255,255,255,0.11)_42%,transparent_58%)] opacity-70" />

          <div className="relative flex items-start justify-between">
            <div className="flex h-8 w-11 items-center rounded-md border border-white/25 bg-gradient-to-br from-[#f9eab9] via-[#d5b861] to-[#ad8733] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_1px_1px_rgba(37,22,1,0.24)]">
              <span className="h-full w-1/2 border-r border-[#9a7528]/50" />
              <span className="h-full w-1/2" />
            </div>
            <CardBrandMark />
          </div>

          <p className="relative mt-8 font-mono text-lg font-medium tracking-[0.14em] text-white/95 sm:text-xl">
            {cardNumber || "•••• •••• •••• ••••"}
          </p>

          <div className="relative mt-5 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/60">카드 소유자</p>
              <p className="mt-1 truncate text-xs font-medium uppercase tracking-[0.06em] text-white/95">
                {cardholderName || "YOUR NAME"}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/60">만료일</p>
              <p className="mt-1 font-mono text-xs font-medium tracking-[0.08em] text-white/95">{expiry || "MM/YY"}</p>
            </div>
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <p className="mb-4 text-sm leading-5 text-[#656574]">{description}</p>

          <div className="space-y-3.5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#363643]" htmlFor={`${id}-cardholder`}>
                카드 소유자 이름
              </label>
              <input
                autoComplete="cc-name"
                className={inputClassName}
                disabled={disabled || loading}
                id={`${id}-cardholder`}
                onChange={(event) => setCardholderName(event.target.value)}
                placeholder="이름을 입력하세요"
                type="text"
                value={cardholderName}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#363643]" htmlFor={`${id}-number`}>
                카드 번호
              </label>
              <div className="relative">
                <input
                  autoComplete="cc-number"
                  className={joinClasses(inputClassName, "pr-12 font-mono tracking-[0.04em]")}
                  disabled={disabled || loading}
                  id={`${id}-number`}
                  inputMode="numeric"
                  maxLength={23}
                  onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                  placeholder="4242 4242 4242 4242"
                  type="text"
                  value={cardNumber}
                />
                <svg aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#858594]" fill="none" viewBox="0 0 24 24">
                  <rect height="14" rx="2" stroke="currentColor" strokeWidth="1.7" width="19" x="2.5" y="5" />
                  <path d="M2.5 10h19" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#363643]" htmlFor={`${id}-expiry`}>
                  만료일
                </label>
                <input
                  autoComplete="cc-exp"
                  className={joinClasses(inputClassName, "font-mono")}
                  disabled={disabled || loading}
                  id={`${id}-expiry`}
                  inputMode="numeric"
                  maxLength={5}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  placeholder="MM/YY"
                  type="text"
                  value={expiry}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#363643]" htmlFor={`${id}-cvc`}>
                  CVC
                </label>
                <div className="relative">
                  <input
                    autoComplete="cc-csc"
                    className={joinClasses(inputClassName, "pr-10 font-mono")}
                    disabled={disabled || loading}
                    id={`${id}-cvc`}
                    inputMode="numeric"
                    maxLength={4}
                    onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    type="text"
                    value={cvc}
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#858594]">
                    <LockIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {submitted && !isFormComplete ? (
            <p aria-live="polite" className="mt-3 text-xs font-medium text-[#b42318]">
              모든 카드 정보를 올바르게 입력해 주세요.
            </p>
          ) : null}

          <button
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#5149df] bg-gradient-to-b from-[#756dff] to-[#635bff] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_4px_8px_rgba(99,91,255,0.26)] outline-none transition-[box-shadow,transform,filter] duration-150 hover:brightness-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_7px_14px_rgba(99,91,255,0.3)] focus-visible:ring-4 focus-visible:ring-[#635bff]/25 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled || loading}
            type="submit"
          >
            {loading ? <Spinner /> : <LockIcon />}
            <span>{loading ? "결제를 처리하는 중..." : buttonLabel}</span>
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#858594]">
            <LockIcon />
            <span>256비트 SSL 암호화로 안전하게 보호됩니다.</span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default StripePaymentCard;
