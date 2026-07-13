type IconProps = { className?: string }

const base = 'shrink-0'

export const ChevronDown = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 5l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Hamburger = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const Close = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const UserCircle = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="10" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4.9 16.5a5.6 5.6 0 0 1 10.2 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const QuestionCircle = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M7.9 7.7a2.1 2.1 0 1 1 2.9 1.95c-.5.22-.8.7-.8 1.25v.3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="10" cy="14.3" r="0.85" fill="currentColor" />
  </svg>
)

export const InfoCircle = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="4.9" r="0.8" fill="currentColor" />
  </svg>
)

export const Minus = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const Plus = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const Expand = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5l-5 5M2.5 13.5l5-5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Sliders = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="5.5" cy="4" r="1.6" fill="white" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="10.5" cy="8" r="1.6" fill="white" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="6.5" cy="12" r="1.6" fill="white" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export const Diamond = ({ className = '' }: IconProps) => (
  <svg className={`${base} ${className}`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 1.6l6.4 6.4L8 14.4 1.6 8z" fill="currentColor" opacity="0.35" />
    <path d="M8 4.8v3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="10.9" r="0.85" fill="currentColor" />
  </svg>
)

export const Severity = ({ className = '' }: IconProps) => (
  <svg className={`${base} ${className}`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.6" fill="currentColor" opacity="0.35" />
    <path d="M8 4.6v3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.85" fill="currentColor" />
  </svg>
)

export const Instances = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 2l4 4M14 2l-4 4M2 14l4-4M14 14l-4-4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1.8" fill="currentColor" opacity="0.45" />
  </svg>
)

export const Density = ({ className = '' }: IconProps) => (
  <svg
    className={`${base} ${className}`}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="5" fill="currentColor" opacity="0.3" />
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10.8 10.8L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 8.4V6M7 8.4V4.8M9 8.4V6.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

export const Caret = ({ up = false, className = '' }: IconProps & { up?: boolean }) => (
  <svg
    className={`${base} ${className}`}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    aria-hidden="true"
  >
    <path d={up ? 'M1 6.5L5 2.5l4 4' : 'M1 3.5L5 7.5l4-4'} fill="currentColor" />
  </svg>
)
