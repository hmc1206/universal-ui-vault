import { useMemo, useState, type FormEvent } from "react";

export interface TossRemittanceFormProps {
  /** 받는 사람의 표시 이름입니다. */
  recipientName?: string;
  /** 받는 사람의 은행명입니다. */
  recipientBank?: string;
  /** 받는 사람의 계좌번호입니다. */
  recipientAccountNumber?: string;
  /** 처음 표시할 송금 금액입니다. */
  initialAmount?: number;
  /** 빠른 금액 선택 버튼 목록입니다. */
  quickAmounts?: number[];
  /** 표시할 출금 가능 잔액입니다. */
  availableBalance?: number;
  /** 수수료 안내 문구입니다. */
  feeText?: string;
  /** 송금 버튼 문구입니다. */
  submitLabel?: string;
  /** 유효한 금액으로 송금을 요청할 때 호출됩니다. */
  onSubmit?: (amount: number) => void;
  /** 외부 송금 처리 진행 상태입니다. */
  loading?: boolean;
  /** 폼 전체를 비활성화합니다. */
  disabled?: boolean;
  /** 최상위 카드에 추가할 Tailwind 클래스입니다. */
  className?: string;
}

const MAX_AMOUNT = 999_999_999_999;
const KOREAN_DIGITS = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const KOREAN_SMALL_UNITS = ["", "십", "백", "천"];
const KOREAN_LARGE_UNITS = ["", "만", "억", "조"];

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

function parseAmount(value: string) {
  const numericValue = value.replace(/\D/g, "");

  if (!numericValue) {
    return 0;
  }

  return Math.min(Number(numericValue), MAX_AMOUNT);
}

function convertFourDigits(value: number) {
  return value
    .toString()
    .padStart(4, "0")
    .split("")
    .map((digit, index) => {
      const number = Number(digit);
      const unitIndex = 3 - index;

      if (number === 0) {
        return "";
      }

      const digitName = number === 1 && unitIndex > 0 ? "" : KOREAN_DIGITS[number];
      return `${digitName}${KOREAN_SMALL_UNITS[unitIndex]}`;
    })
    .join("");
}

/** 숫자 금액을 자연스러운 한국어 읽기 형태로 변환합니다. 예: 50000 → 오만 */
function amountToKorean(amount: number) {
  if (amount === 0) {
    return "영";
  }

  const groups: string[] = [];
  let remaining = amount;
  let unitIndex = 0;

  while (remaining > 0) {
    const group = remaining % 10_000;

    if (group > 0) {
      groups.unshift(`${convertFourDigits(group)}${KOREAN_LARGE_UNITS[unitIndex] ?? ""}`);
    }

    remaining = Math.floor(remaining / 10_000);
    unitIndex += 1;
  }

  return groups.join("");
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4.5 7.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 7.5V6a2 2 0 0 1 2-2h9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="16.5" cy="13.5" fill="currentColor" r="1.1" />
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
 * 토스 앱의 빠르고 친절한 송금 경험을 담은 독립형 카드 폼입니다.
 * 금액 입력값은 천 단위로 포맷하고, 숫자 금액과 한글 읽기 금액을 실시간으로 함께 표시합니다.
 */
export function TossRemittanceForm({
  recipientName = "김토스",
  recipientBank = "토스뱅크",
  recipientAccountNumber = "1000-1234-5678",
  initialAmount = 50_000,
  quickAmounts = [10_000, 50_000, 100_000],
  availableBalance = 1_280_000,
  feeText = "송금 수수료 무료",
  submitLabel,
  onSubmit,
  loading = false,
  disabled = false,
  className,
}: TossRemittanceFormProps) {
  const [amount, setAmount] = useState(() => Math.max(0, Math.min(Math.floor(initialAmount), MAX_AMOUNT)));
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const formattedAmount = useMemo(() => formatAmount(amount), [amount]);
  const koreanAmount = useMemo(() => amountToKorean(amount), [amount]);
  const isAmountValid = amount > 0 && amount <= availableBalance;
  const isDisabled = disabled || loading;
  const recipientInitial = recipientName.trim().charAt(0) || "토";

  function handleAmountChange(value: string) {
    setAmount(parseAmount(value));
    setHasAttemptedSubmit(false);
  }

  function handleQuickAmount(quickAmount: number) {
    setAmount(Math.max(0, Math.min(Math.floor(quickAmount), MAX_AMOUNT)));
    setHasAttemptedSubmit(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    if (!isAmountValid || isDisabled) {
      return;
    }

    onSubmit?.(amount);
  }

  const message =
    amount === 0
      ? "보낼 금액을 입력해 주세요."
      : amount > availableBalance
        ? "출금 가능 잔액보다 큰 금액이에요."
        : `${recipientName}님에게 ${formattedAmount}원을 보낼게요.`;

  return (
    <section
      aria-label="간편 송금"
      className={joinClasses(
        "w-full max-w-[440px] overflow-hidden rounded-3xl border border-[#e8edf2] bg-white shadow-[0_18px_50px_-22px_rgba(30,93,155,0.2),0_5px_16px_-9px_rgba(30,93,155,0.12)]",
        className,
      )}
    >
      <div className="border-b border-[#f0f2f5] bg-[#fcfdff] px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[-0.01em] text-[#8b95a1]">3초 송금</p>
            <h2 className="mt-1 text-xl font-bold tracking-[-0.045em] text-[#191f28]">얼마를 보낼까요?</h2>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#e8f3ff] px-2.5 py-1 text-[11px] font-semibold tracking-[-0.01em] text-[#3182f6]">
            {feeText}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f6f8fa] p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9fd7ff] to-[#5e9fff] text-base font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_3px_8px_rgba(49,130,246,0.22)]">
            {recipientInitial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold tracking-[-0.025em] text-[#191f28]">{recipientName}</p>
            <p className="mt-0.5 truncate text-xs tracking-[-0.015em] text-[#6b7684]">
              {recipientBank} · {recipientAccountNumber}
            </p>
          </div>
          <span aria-hidden="true" className="text-[#adb5bd]">
            <ArrowRightIcon />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <label className="mb-2 block text-[13px] font-semibold tracking-[-0.015em] text-[#4e5968]" htmlFor="toss-remittance-amount">
            보낼 금액
          </label>

          <div className="group relative rounded-2xl border border-[#e2e8ee] bg-white px-4 py-3.5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-[#c8d2dc] focus-within:scale-[1.01] focus-within:border-[#3182f6] focus-within:shadow-[0_0_0_4px_rgba(49,130,246,0.11),0_10px_22px_-14px_rgba(49,130,246,0.42)]">
            <div className="flex items-end gap-1.5">
              <input
                aria-describedby="toss-remittance-message"
                className="min-w-0 flex-1 bg-transparent text-right text-[32px] font-bold leading-none tracking-[-0.055em] text-[#191f28] outline-none placeholder:text-[#c6cdd5] sm:text-4xl"
                disabled={isDisabled}
                id="toss-remittance-amount"
                inputMode="numeric"
                onChange={(event) => handleAmountChange(event.target.value)}
                placeholder="0"
                type="text"
                value={amount === 0 ? "" : formattedAmount}
              />
              <span className="mb-0.5 shrink-0 text-lg font-bold tracking-[-0.035em] text-[#4e5968]">원</span>
            </div>
            <div aria-hidden="true" className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#dbe3eb] to-transparent transition-colors duration-200 group-focus-within:via-[#9fcbff]" />
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs font-medium tracking-[-0.01em] text-[#8b95a1]">한글로</span>
              <span aria-live="polite" className="text-sm font-bold tracking-[-0.025em] text-[#3182f6]">
                {amount > 0 ? `${koreanAmount} 원` : "금액을 입력해 주세요"}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" aria-label="빠른 금액 선택">
            {quickAmounts.map((quickAmount) => {
              const isSelected = amount === quickAmount;

              return (
                <button
                  className={joinClasses(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[-0.015em] outline-none transition-[background-color,border-color,color,transform] duration-150 focus-visible:ring-4 focus-visible:ring-[#3182f6]/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45",
                    isSelected
                      ? "border-[#b8dcff] bg-[#e8f3ff] text-[#3182f6]"
                      : "border-[#e6ebf0] bg-white text-[#6b7684] hover:border-[#c9d5e1] hover:bg-[#f7faff] hover:text-[#3182f6]",
                  )}
                  disabled={isDisabled}
                  key={quickAmount}
                  onClick={() => handleQuickAmount(quickAmount)}
                  type="button"
                >
                  +{formatAmount(quickAmount)}원
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className={joinClasses(
              "mt-4 min-h-5 text-[13px] font-medium tracking-[-0.02em]",
              amount > availableBalance ? "text-[#e65a4f]" : "text-[#6b7684]",
            )}
            id="toss-remittance-message"
          >
            {message}
          </p>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f6f8fa] px-3.5 py-3 text-xs tracking-[-0.015em]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#6b7684]">
              <WalletIcon />
              내 출금 가능 금액
            </span>
            <span className="font-bold text-[#333d4b]">{formatAmount(availableBalance)}원</span>
          </div>

          {hasAttemptedSubmit && !isAmountValid ? (
            <p aria-live="assertive" className="mt-3 text-xs font-semibold text-[#e65a4f]">
              {amount === 0 ? "송금할 금액을 입력해 주세요." : "출금 가능 금액 안에서 입력해 주세요."}
            </p>
          ) : null}

          <button
            className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#3182f6] px-5 text-[17px] font-bold tracking-[-0.035em] text-white shadow-[0_8px_16px_-8px_rgba(49,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.24)] outline-none transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#2272e6] hover:shadow-[0_10px_20px_-8px_rgba(49,130,246,0.6),inset_0_1px_0_rgba(255,255,255,0.24)] focus-visible:ring-4 focus-visible:ring-[#3182f6]/25 active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#d7dde5] disabled:text-[#9aa6b2] disabled:shadow-none"
            disabled={isDisabled || !isAmountValid}
            type="submit"
          >
            {loading ? <Spinner /> : null}
            <span>{loading ? "송금하는 중이에요..." : submitLabel ?? `${formattedAmount}원 보내기`}</span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default TossRemittanceForm;
