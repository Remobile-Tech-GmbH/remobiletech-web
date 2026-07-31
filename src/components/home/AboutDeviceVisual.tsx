import type { CSSProperties } from "react";

export function AboutDeviceVisual({ animated = false }: { animated?: boolean }) {
  return (
    <aside
      className={`about-device-card${animated ? " reveal" : ""}`}
      style={animated ? ({ "--i": 1 } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <div className="devices about-devices" id="about-devices" aria-hidden="true">
        <svg className="device-stage" viewBox="0 0 340 440" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="dev-glass" x1="0" y1="0" x2=".38" y2="1">
              <stop offset="0" stopColor="#D6ECFF" stopOpacity=".42" />
              <stop offset=".55" stopColor="#D6ECFF" stopOpacity=".26" />
              <stop offset="1" stopColor="#D6ECFF" stopOpacity=".20" />
            </linearGradient>
            <linearGradient id="dev-screen" x1=".1" y1="0" x2=".6" y2="1">
              <stop offset="0" stopColor="#A9C6DC" stopOpacity=".28" />
              <stop offset=".62" stopColor="#A9C6DC" stopOpacity=".18" />
              <stop offset="1" stopColor="#A9C6DC" stopOpacity=".13" />
            </linearGradient>
            <linearGradient id="dev-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset=".30" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset=".44" stopColor="#FFFFFF" stopOpacity=".11" />
              <stop offset=".52" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dev-plane" x1="0" y1="0" x2=".2" y2="1">
              <stop offset="0" stopColor="#C5E2FA" stopOpacity=".085" />
              <stop offset=".6" stopColor="#C5E2FA" stopOpacity=".012" />
              <stop offset="1" stopColor="#C5E2FA" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="dev-halo" cx=".5" cy=".46" r=".5">
              <stop offset="0" stopColor="#9AC6E8" stopOpacity=".20" />
              <stop offset=".55" stopColor="#9AC6E8" stopOpacity=".07" />
              <stop offset="1" stopColor="#9AC6E8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dev-floor" gradientUnits="userSpaceOnUse" x1="26" y1="0" x2="314" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".26" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <ellipse cx="170" cy="238" rx="132" ry="168" fill="url(#dev-halo)" />
          <g className="device-plane"><rect x="112" y="-104" width="118" height="648" rx="2" transform="rotate(17 170 220)" /></g>
          <path className="device-floor" d="M26 352H314" />

          <g className="device-form device-form--1 is-on">
            <g className="device-drift">
              <rect className="device-body" x="112" y="114" width="116" height="238" rx="15" />
              <rect className="device-screen" x="120" y="122" width="100" height="222" rx="9" />
              <rect className="device-sheen" x="120" y="122" width="100" height="222" rx="9" />
              <path className="device-hair" d="M155 133h30" />
            </g>
          </g>

          <g className="device-form device-form--2">
            <g className="device-drift">
              <rect className="device-body" x="79" y="114" width="182" height="238" rx="12" />
              <rect className="device-screen" x="89" y="124" width="162" height="212" rx="5" />
              <rect className="device-sheen" x="89" y="124" width="162" height="212" rx="5" />
              <path className="device-hair" d="M144 344h52" />
            </g>
          </g>

          <g className="device-form device-form--3">
            <g className="device-drift">
              <rect className="device-body" x="70" y="210" width="200" height="126" rx="6" />
              <rect className="device-screen" x="77" y="217" width="186" height="112" rx="3" />
              <rect className="device-sheen" x="77" y="217" width="186" height="112" rx="3" />
              <path className="device-body" d="M56 336h228l12 16H44Z" />
              <path className="device-hair" d="M152 344h36" />
            </g>
          </g>

          <g className="device-form device-form--4">
            <g className="device-drift">
              <g opacity=".28" transform="rotate(-7 107 244)">
                <rect className="device-body" x="64" y="156" width="86" height="176" rx="11" />
                <rect className="device-screen" x="71" y="163" width="72" height="162" rx="6" />
              </g>
              <g opacity=".38" transform="rotate(7 233 238)">
                <rect className="device-body" x="190" y="150" width="86" height="176" rx="11" />
                <rect className="device-screen" x="197" y="157" width="72" height="162" rx="6" />
              </g>
              <g>
                <rect className="device-body" x="127" y="176" width="86" height="176" rx="11" />
                <rect className="device-screen" x="134" y="183" width="72" height="162" rx="6" />
                <rect className="device-sheen" x="134" y="183" width="72" height="162" rx="6" />
                <path className="device-hair" d="M158 192h24" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </aside>
  );
}
