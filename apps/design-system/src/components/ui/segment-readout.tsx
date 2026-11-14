import { cn } from "cn"

const segments = [
  "6,2 26,2 22,6 10,6",
  "27,3 27,23 23,20 23,8",
  "27,25 27,45 23,40 23,28",
  "6,46 26,46 22,42 10,42",
  "5,25 9,28 9,40 5,45",
  "5,3 9,8 9,20 5,23",
  "6,24 10,21 22,21 26,24 22,27 10,27",
]
const digits = ["012345", "12", "01346", "01236", "1256", "02356", "023456", "012", "0123456", "012356"]

function SegmentReadout({ value, className }: { value: number; className?: string }) {
  const text = String(Math.max(0, Math.floor(value))).padStart(2, "0")
  return (
    <span className={cn("segment-readout", className)} role="img" aria-label={String(value)}>
      {[...text].map((digit, index) => (
        <svg key={index} viewBox="0 0 32 48" aria-hidden="true">
          {segments.map((points, segment) => (
            <polygon key={segment} points={points} fill="currentColor" opacity={digits[Number(digit)].includes(String(segment)) ? 1 : 0.08} />
          ))}
        </svg>
      ))}
    </span>
  )
}

export { SegmentReadout }
