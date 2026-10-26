import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { AboutDeviceVisual } from "./AboutDeviceVisual";
import { HomeBehaviors } from "./HomeBehaviors";

function CountryFlag({ country }: { country: "de" | "at" | "nl" | "be" }) {
  const stripes = {
    de: <><rect width="30" height="6" fill="#000"/><rect y="6" width="30" height="6" fill="#DD0000"/><rect y="12" width="30" height="6" fill="#FFCE00"/></>,
    at: <><rect width="30" height="6" fill="#C8102E"/><rect y="6" width="30" height="6" fill="#FFF"/><rect y="12" width="30" height="6" fill="#C8102E"/></>,
    nl: <><rect width="30" height="6" fill="#AE1C28"/><rect y="6" width="30" height="6" fill="#FFF"/><rect y="12" width="30" height="6" fill="#21468B"/></>,
    be: <><rect width="10" height="18" fill="#2D2926"/><rect x="10" width="10" height="18" fill="#FFCD00"/><rect x="20" width="10" height="18" fill="#C8102E"/></>,
  };

  return <svg className="country-flag" viewBox="0 0 30 18" aria-hidden="true" focusable="false">{stripes[country]}</svg>;
}

const euStars = [
  [18, 5.5], [21.25, 6.37], [23.63, 8.75], [24.5, 12],
  [23.63, 15.25], [21.25, 17.63], [18, 18.5], [14.75, 17.63],
  [12.37, 15.25], [11.5, 12], [12.37, 8.75], [14.75, 6.37],
];

function EuFlag() {
  return (
    <svg className="eu-flag" viewBox="0 0 36 24" aria-hidden="true" focusable="false">
      <rect width="36" height="24" fill="#003399"/>
      {euStars.map(([x, y]) => (
        <path key={`${x}-${y}`} d="M0-1.15.27-.37 1.09-.35.44.14.68.93 0 .46-.68.93-.44.14-1.09-.35-.27-.37Z" fill="#FFCC00" transform={`translate(${x} ${y})`}/>
      ))}
    </svg>
  );
}

export async function HomePageContent({ locale }: { locale: string }) {
  const t = await getTranslations("Home");
  return (
    <>
      
      {/* logo artwork: docs/branding/svg/*_remobile_tech.svg, width/height stripped,
           single definition tinted with currentColor (white on the hero, --ink elsewhere) */}
      <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <symbol id="rmt-logo" viewBox="0 0 1241 305">
          <path fill="currentColor" d="M38.7101 144.481V183H9.15312V63.4373H52.8211C71.2545 63.4373 84.3486 66.5519 92.1033 72.7812C99.858 79.0104 103.735 89.3712 103.735 103.864C103.735 113.652 101.638 121.661 97.4426 127.891C93.3746 133.993 87.1454 138.442 78.755 141.239L107.931 183H72.4622L47.6725 144.481H38.7101ZM73.797 103.864C73.797 98.7786 72.2715 95.219 69.2205 93.185C66.1694 91.151 60.703 90.134 52.8211 90.134H38.7101V120.644H52.8211C60.703 120.644 66.1694 119.437 69.2205 117.021C72.2715 114.479 73.797 110.093 73.797 103.864ZM201.588 155.35V183H119.21V63.4373H199.871V90.134H148.767V109.966H192.816V134.755H148.767V155.35H201.588ZM335.239 63.4373V183H307.589V111.301L287.185 160.117H263.158L243.136 111.301V183H215.486V63.4373H251.526L275.744 123.695L300.533 63.4373H335.239ZM461.978 123.123C461.978 144.862 457.528 160.626 448.63 170.414C439.858 180.076 425.556 184.907 405.724 184.907C385.003 184.907 370.447 180.33 362.056 171.177C353.666 162.024 349.471 146.006 349.471 123.123C349.471 101.385 353.857 85.6845 362.628 76.0229C371.527 66.3613 385.893 61.5304 405.724 61.5304C426.446 61.5304 441.002 66.107 449.392 75.2601C457.783 84.4132 461.978 100.368 461.978 123.123ZM383.032 148.676C384.685 151.854 387.1 154.079 390.278 155.35C393.584 156.621 398.732 157.257 405.724 157.257C412.716 157.257 417.801 156.621 420.98 155.35C424.285 154.079 426.764 151.854 428.416 148.676C429.688 146.133 430.578 142.828 431.086 138.76C431.722 134.692 432.04 129.48 432.04 123.123C432.04 116.64 431.722 111.364 431.086 107.296C430.578 103.101 429.688 99.732 428.416 97.1895C426.891 93.8842 424.476 91.5959 421.17 90.3246C417.992 88.9262 412.843 88.2271 405.724 88.2271C398.605 88.2271 393.393 88.9262 390.088 90.3246C386.91 91.5959 384.558 93.8842 383.032 97.1895C381.761 99.732 380.808 103.101 380.172 107.296C379.663 111.364 379.409 116.64 379.409 123.123C379.409 129.48 379.663 134.692 380.172 138.76C380.808 142.828 381.761 146.133 383.032 148.676ZM569.442 147.913C569.442 159.99 565.883 168.889 558.764 174.61C551.772 180.203 540.712 183 525.583 183H476.195V63.4373H525.583C539.313 63.4373 549.038 65.8527 554.759 70.6836C560.607 75.3872 563.531 83.3327 563.531 94.5198C563.531 101.639 562.577 107.105 560.67 110.919C558.764 114.606 554.95 117.466 549.229 119.5C556.094 120.899 561.179 123.95 564.484 128.653C567.79 133.357 569.442 139.777 569.442 147.913ZM536.262 98.9057C536.262 94.7105 535.436 91.7866 533.783 90.134C532.258 88.4813 529.524 87.655 525.583 87.655H505.752V111.873H525.583C529.524 111.873 532.258 110.919 533.783 109.012C535.436 106.978 536.262 103.609 536.262 98.9057ZM540.839 146.006C540.839 141.43 539.695 138.251 537.406 136.472C535.118 134.565 531.177 133.611 525.583 133.611H505.752V157.829H525.583C531.177 157.829 535.118 156.939 537.406 155.159C539.695 153.379 540.839 150.328 540.839 146.006ZM611.898 63.4373V183H582.341V63.4373H611.898ZM706.475 155.35V183H630.199V63.4373H659.756V155.35H706.475ZM800.474 155.35V183H718.095V63.4373H798.757V90.134H747.652V109.966H791.702V134.755H747.652V155.35H800.474ZM927.233 63.4373V90.134H894.625V183H865.068V90.134H832.46V63.4373H927.233ZM1021.15 155.35V183H938.767V63.4373H1019.43V90.134H968.324V109.966H1012.37V134.755H968.324V155.35H1021.15ZM1085.23 157.257C1090.32 157.257 1095.85 156.748 1101.82 155.731C1107.8 154.587 1113.14 153.125 1117.84 151.345V177.47C1110.85 180.267 1104.56 182.174 1098.96 183.191C1093.37 184.335 1087.52 184.907 1081.42 184.907C1070.36 184.907 1061.53 183.636 1054.92 181.093C1048.3 178.551 1043.03 174.483 1039.09 168.889C1035.78 164.058 1033.3 157.892 1031.65 150.392C1030.13 142.892 1029.36 133.802 1029.36 123.123C1029.36 101.766 1033.94 86.193 1043.09 76.4043C1052.37 66.4884 1067.06 61.5304 1087.14 61.5304C1092.99 61.5304 1098.2 61.6576 1102.78 61.9118C1107.35 62.1661 1111.49 62.611 1115.17 63.2467V88.9898C1110.98 88.7356 1106.59 88.5449 1102.02 88.4177C1097.57 88.2906 1092.61 88.2271 1087.14 88.2271C1080.15 88.2271 1074.94 88.9262 1071.51 90.3246C1068.2 91.5959 1065.72 93.8842 1064.07 97.1895C1062.54 99.732 1061.46 103.101 1060.83 107.296C1060.19 111.491 1059.87 116.767 1059.87 123.123C1059.87 129.098 1060.13 134.12 1060.64 138.188C1061.27 142.129 1062.22 145.434 1063.5 148.104C1065.15 151.409 1067.56 153.761 1070.74 155.159C1073.92 156.558 1078.75 157.257 1085.23 157.257ZM1159.76 183H1130.2V63.4373H1159.76V109.012H1201.71V63.4373H1231.27V183H1201.71V135.709H1159.76V183Z"/>
          <path className="rmt-logo-gmbh" fill="currentColor" d="M1049.61 261.249H1035.18V254.61H1056.69V281.344C1055.04 282.111 1052.09 282.879 1047.84 283.646C1043.59 284.354 1039.72 284.708 1036.24 284.708C1027.09 284.708 1020.75 282.554 1017.21 278.246C1013.72 273.938 1011.98 266.59 1011.98 256.203C1011.98 246.406 1014.08 239.206 1018.27 234.603C1022.46 229.94 1029.04 227.609 1038.01 227.609C1041.08 227.609 1044 227.698 1046.77 227.875C1049.61 227.993 1051.91 228.199 1053.68 228.494V235.134C1051.32 234.898 1048.75 234.721 1045.98 234.603C1043.26 234.485 1040.61 234.426 1038.01 234.426C1031.28 234.426 1026.53 236.078 1023.76 239.383C1021.04 242.688 1019.69 248.295 1019.69 256.203C1019.69 260.098 1019.89 263.374 1020.31 266.029C1020.78 268.626 1021.51 270.721 1022.52 272.315C1023.7 274.321 1025.38 275.767 1027.56 276.652C1029.75 277.479 1032.93 277.892 1037.12 277.892C1038.78 277.892 1040.72 277.774 1042.97 277.538C1045.21 277.243 1047.42 276.859 1049.61 276.387V261.249ZM1073.84 284H1066.58V240.268H1073.22L1073.57 243.632H1073.84C1076.43 242.157 1078.79 241.095 1080.92 240.445C1083.04 239.737 1085.17 239.383 1087.29 239.383C1089.77 239.383 1091.9 239.767 1093.67 240.534C1095.44 241.301 1096.82 242.452 1097.83 243.986H1098.09C1100.45 242.511 1102.93 241.39 1105.53 240.622C1108.18 239.796 1110.84 239.383 1113.5 239.383C1117.69 239.383 1120.84 240.504 1122.97 242.747C1125.15 244.931 1126.24 248.177 1126.24 252.485V284H1118.98V253.37C1118.98 250.832 1118.31 248.973 1116.95 247.793C1115.59 246.554 1113.44 245.934 1110.49 245.934C1108.83 245.934 1107.09 246.2 1105.26 246.731C1103.43 247.203 1101.6 247.911 1099.77 248.855C1099.89 249.446 1099.95 250.036 1099.95 250.626C1100.01 251.216 1100.04 251.836 1100.04 252.485V284H1092.78V253.37C1092.78 250.832 1092.1 248.973 1090.75 247.793C1089.39 246.554 1087.23 245.934 1084.28 245.934C1082.81 245.934 1081.24 246.2 1079.59 246.731C1077.94 247.203 1076.02 248.029 1073.84 249.209V284ZM1159.15 239.383C1165.11 239.383 1169.36 241.154 1171.9 244.695C1174.5 248.177 1175.8 253.901 1175.8 261.869C1175.8 270.013 1174.2 275.856 1171.02 279.397C1167.83 282.938 1162.49 284.708 1154.99 284.708C1151.63 284.708 1148.47 284.502 1145.52 284.089C1142.57 283.734 1139.88 283.174 1137.47 282.407V225.13H1144.72V243.278C1146.79 242.039 1149.06 241.095 1151.54 240.445C1154.02 239.737 1156.56 239.383 1159.15 239.383ZM1168.54 261.869C1168.54 255.908 1167.68 251.777 1165.97 249.475C1164.32 247.114 1161.19 245.934 1156.59 245.934C1154.46 245.934 1152.37 246.229 1150.3 246.819C1148.24 247.35 1146.38 248.118 1144.72 249.121V276.829C1146.02 277.184 1147.5 277.479 1149.15 277.715C1150.8 277.892 1152.6 277.98 1154.55 277.98C1160.04 277.98 1163.73 276.829 1165.62 274.528C1167.56 272.226 1168.54 268.006 1168.54 261.869ZM1193.42 284H1185.89V228.494H1193.42V252.396H1222.45V228.494H1229.98V284H1222.45V259.301H1193.42V284Z"/>
        </symbol>
      </svg>
      
      <SiteHeader locale={locale} page="home" usesInlineLogo />
      
      <main id="main">
      
      {/* ========================== HERO STORY =========================== */}
      <section className="site-hero hero-story" id="top" aria-label={t("a11y.heroStory")}>
        <div className="hero-story__sticky">
          <div className="atrium" aria-hidden="true">
            <div className="plane plane--1"></div>
            <div className="plane plane--5"></div>
            <div className="plane plane--2"></div>
            <div className="plane plane--3"></div>
            <div className="plane plane--4"></div>
          </div>
          <div className="mullions" aria-hidden="true"></div>
          <div className="shaft" aria-hidden="true"></div>
          <div className="grain" aria-hidden="true"></div>
          <div className="veil" aria-hidden="true"></div>
          <div className="hero-story__glow" aria-hidden="true"></div>

          <div className="hero-body">
            <div className="container hero-story__inner">
              <div className="hero-stages">
                <article className="hero-stage" data-hero-stage="0">
                  <div className="hero-stage__body">
                    <p className="hero-eyebrow" data-hero-anim>Remobile Tech GmbH</p>
                    <h1 data-hero-anim>{t.rich("hero.title", { soft: (chunks) => <span className="soft">{chunks}</span> })}</h1>
                    <p className="hero-lede" data-hero-anim>{t("hero.lede")}</p>
                    <div className="hero-actions" data-hero-anim>
                      <a className="btn btn--solid-light" href="#wholesale" data-wholesale-trigger>
                        {t("hero.wholesaleCta")}
                        <svg className="arw" width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"><path d="M9.6 1 13.5 5 9.6 9M13 5H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                      <a className="btn btn--ghost-light" href="#portfolio">{t("hero.brandsCta")}</a>
                    </div>
                  </div>
                </article>

                <article className="hero-stage" id="portfolio" data-hero-stage="1">
                  <div className="hero-stage__body">
                    <p className="hero-eyebrow" data-hero-anim><span>02 /</span> {t("portfolio.eyebrow")}</p>
                    <h2 data-hero-anim>{t("portfolio.title")}</h2>
                <div className="brand-grid">
                  {/* brand logos inlined verbatim from docs/branding/brands/ — fixed
                       width/height stripped, viewBox kept, ids namespaced;
                       remobile-eu is monochrome so its fills take currentColor */}
                  <div className="brand-card" data-hero-anim>
                    <div className="brand-plate">
                      <a className="brand-logo-link" href="https://remobile.eu" target="_blank" rel="noopener noreferrer" aria-label="Remobile.eu">
                      <svg className="bmark bmark--remobile" viewBox="0 0 295 79" fill="none" aria-hidden="true" focusable="false">
                      <g clipPath="url(#rmt-re-clip)">
                      <path d="M59.6548 72.8682L39.0614 60.9682C34.7343 58.418 30.5227 55.7909 26.5434 52.9316V72.5976H21.3273V39.4089C21.3273 37.4771 21.5591 35.5453 21.9841 33.8066L4.86836 43.6591L2.2797 39.0612L23.3363 26.9293C36.8555 19.1856 41.6284 16.1137 55.0957 25.8475V6.22015H60.3502V39.4089C60.3502 48.9259 55.6504 53.7876 47.2525 57.684L45.4752 58.5726L62.2821 68.2705L59.6548 72.8682ZM40.8388 53.6659C48.682 53.6659 55.0957 47.2523 55.0957 39.4089C55.0957 31.527 48.682 25.152 40.8388 25.152C32.9954 25.152 26.5818 31.527 26.5818 39.4089C26.5818 47.2523 32.9954 53.6659 40.8388 53.6659ZM40.8388 78.8182C19.0864 78.8182 1.42948 61.1613 1.42948 39.4089C1.42948 17.6565 19.0864 -0.000343323 40.8388 -0.000343323C62.5912 -0.000343323 80.248 17.6565 80.248 39.4089C80.248 61.1613 62.5912 78.8182 40.8388 78.8182ZM40.8388 72.2498C58.998 72.2498 73.6798 57.5681 73.6798 39.4089C73.6798 21.2497 58.998 6.56788 40.8388 6.56788C22.6796 6.56788 7.99786 21.2497 7.99786 39.4089C7.99786 57.5681 22.6796 72.2498 40.8388 72.2498Z" fill="currentColor" fillOpacity="0.5"/>
                      <circle cx="40.8862" cy="39.4286" r="16.8922" stroke="currentColor" strokeWidth="5.61736"/>
                      <rect x="21.1853" y="39.6287" width="5.61736" height="33.9449" fill="currentColor"/>
                      <rect x="32.5637" y="57.283" width="5.61736" height="32.1999" transform="rotate(-59.3455 32.5637 57.283)" fill="currentColor"/>
                      </g>
                      <path d="M277.831 55.8751C275.356 55.8751 273.221 55.3874 271.424 54.412C269.637 53.4263 268.262 52.0249 267.297 50.2075C266.342 48.38 265.864 46.2084 265.864 43.6929C265.864 41.2493 266.347 39.1137 267.312 37.2861C268.277 35.4483 269.637 34.0211 271.393 33.0046C273.149 31.9779 275.218 31.4645 277.6 31.4645C279.284 31.4645 280.824 31.7264 282.22 32.25C283.616 32.7736 284.823 33.5488 285.839 34.5755C286.856 35.6023 287.646 36.8703 288.211 38.3796C288.776 39.8786 289.058 41.5984 289.058 43.5389V45.4178H268.498V41.044H282.051C282.04 40.2431 281.85 39.5295 281.481 38.9032C281.111 38.2769 280.603 37.7892 279.956 37.4401C279.32 37.0808 278.585 36.9011 277.754 36.9011C276.912 36.9011 276.157 37.091 275.49 37.4709C274.822 37.8406 274.294 38.3488 273.904 38.9956C273.513 39.6322 273.308 40.356 273.288 41.1672V45.618C273.288 46.5832 273.477 47.4302 273.857 48.1592C274.237 48.8779 274.776 49.4375 275.474 49.8379C276.173 50.2383 277.004 50.4386 277.969 50.4386C278.637 50.4386 279.243 50.3462 279.787 50.1613C280.331 49.9765 280.798 49.7044 281.188 49.3451C281.578 48.9857 281.871 48.5442 282.066 48.0206L288.981 48.2208C288.694 49.7712 288.062 51.1213 287.087 52.2713C286.122 53.4109 284.854 54.2991 283.283 54.9356C281.712 55.562 279.895 55.8751 277.831 55.8751Z" fill="currentColor"/>
                      <path d="M261.979 23.8873V55.4285H254.448V23.8873H261.979Z" fill="currentColor"/>
                      <path d="M242.124 55.4285V31.7726H249.655V55.4285H242.124ZM245.897 29.0158C244.839 29.0158 243.931 28.6667 243.171 27.9685C242.411 27.2601 242.031 26.4079 242.031 25.412C242.031 24.4263 242.411 23.5844 243.171 22.8862C243.931 22.1778 244.839 21.8235 245.897 21.8235C246.965 21.8235 247.873 22.1778 248.623 22.8862C249.383 23.5844 249.763 24.4263 249.763 25.412C249.763 26.4079 249.383 27.2601 248.623 27.9685C247.873 28.6667 246.965 29.0158 245.897 29.0158Z" fill="currentColor"/>
                      <path d="M214.383 55.4285V23.8873H221.914V35.823H222.068C222.376 35.1043 222.812 34.4113 223.377 33.7439C223.952 33.0765 224.681 32.5323 225.564 32.1114C226.457 31.6802 227.525 31.4645 228.767 31.4645C230.41 31.4645 231.945 31.8958 233.372 32.7582C234.81 33.6207 235.97 34.9503 236.853 36.7471C237.736 38.5439 238.177 40.8335 238.177 43.6159C238.177 46.2957 237.751 48.5391 236.899 50.3462C236.057 52.1532 234.917 53.5085 233.48 54.412C232.053 55.3155 230.467 55.7673 228.721 55.7673C227.53 55.7673 226.498 55.5722 225.626 55.1821C224.753 54.7919 224.019 54.2785 223.423 53.642C222.838 53.0054 222.386 52.3226 222.068 51.5936H221.837V55.4285H214.383ZM221.76 43.6005C221.76 44.8737 221.929 45.9825 222.268 46.9271C222.617 47.8717 223.115 48.6058 223.762 49.1295C224.419 49.6428 225.205 49.8995 226.118 49.8995C227.042 49.8995 227.828 49.6428 228.475 49.1295C229.122 48.6058 229.609 47.8717 229.938 46.9271C230.277 45.9825 230.446 44.8737 230.446 43.6005C230.446 42.3274 230.277 41.2236 229.938 40.2893C229.609 39.355 229.122 38.6311 228.475 38.1178C227.838 37.6044 227.053 37.3477 226.118 37.3477C225.194 37.3477 224.409 37.5993 223.762 38.1024C223.115 38.6055 222.617 39.3242 222.268 40.2585C221.929 41.1928 221.76 42.3068 221.76 43.6005Z" fill="currentColor"/>
                      <path d="M198.574 55.8751C196.089 55.8751 193.953 55.3669 192.167 54.3504C190.391 53.3237 189.02 51.8965 188.055 50.0689C187.1 48.2311 186.623 46.1006 186.623 43.6775C186.623 41.2442 187.1 39.1137 188.055 37.2861C189.02 35.4483 190.391 34.0211 192.167 33.0046C193.953 31.9779 196.089 31.4645 198.574 31.4645C201.058 31.4645 203.189 31.9779 204.965 33.0046C206.752 34.0211 208.122 35.4483 209.077 37.2861C210.042 39.1137 210.525 41.2442 210.525 43.6775C210.525 46.1006 210.042 48.2311 209.077 50.0689C208.122 51.8965 206.752 53.3237 204.965 54.3504C203.189 55.3669 201.058 55.8751 198.574 55.8751ZM198.62 50.1921C199.523 50.1921 200.288 49.9149 200.915 49.3605C201.541 48.8061 202.018 48.036 202.347 47.0503C202.686 46.0647 202.855 44.925 202.855 43.6313C202.855 42.3171 202.686 41.1672 202.347 40.1815C202.018 39.1958 201.541 38.4258 200.915 37.8714C200.288 37.3169 199.523 37.0397 198.62 37.0397C197.686 37.0397 196.895 37.3169 196.248 37.8714C195.612 38.4258 195.124 39.1958 194.785 40.1815C194.457 41.1672 194.292 42.3171 194.292 43.6313C194.292 44.925 194.457 46.0647 194.785 47.0503C195.124 48.036 195.612 48.8061 196.248 49.3605C196.895 49.9149 197.686 50.1921 198.62 50.1921Z" fill="currentColor"/>
                      <path d="M147.381 55.4285V31.7726H154.542V36.1156H154.804C155.297 34.6782 156.129 33.5437 157.299 32.712C158.47 31.8804 159.866 31.4645 161.488 31.4645C163.131 31.4645 164.538 31.8855 165.708 32.7274C166.879 33.5693 167.623 34.6988 167.941 36.1156H168.188C168.629 34.709 169.492 33.5847 170.775 32.7428C172.058 31.8906 173.573 31.4645 175.318 31.4645C177.557 31.4645 179.374 32.1833 180.77 33.6207C182.167 35.0478 182.865 37.0089 182.865 39.5039V55.4285H175.334V41.2288C175.334 40.048 175.031 39.1496 174.425 38.5336C173.819 37.9073 173.034 37.5941 172.069 37.5941C171.032 37.5941 170.215 37.933 169.62 38.6106C169.035 39.278 168.742 40.1764 168.742 41.3058V55.4285H161.504V41.1518C161.504 40.0532 161.206 39.1856 160.61 38.549C160.015 37.9124 159.229 37.5941 158.254 37.5941C157.597 37.5941 157.017 37.7533 156.514 38.0716C156.011 38.3796 155.615 38.8211 155.328 39.3961C155.051 39.971 154.912 40.6487 154.912 41.429V55.4285H147.381Z" fill="currentColor"/>
                      <path d="M132.307 55.8751C129.832 55.8751 127.697 55.3874 125.9 54.412C124.114 53.4263 122.738 52.0249 121.773 50.2075C120.818 48.38 120.34 46.2084 120.34 43.6929C120.34 41.2493 120.823 39.1137 121.788 37.2861C122.753 35.4483 124.114 34.0211 125.869 33.0046C127.625 31.9779 129.694 31.4645 132.076 31.4645C133.76 31.4645 135.3 31.7264 136.696 32.25C138.093 32.7736 139.299 33.5488 140.315 34.5755C141.332 35.6023 142.122 36.8703 142.687 38.3796C143.252 39.8786 143.534 41.5984 143.534 43.5389V45.4178H122.974V41.044H136.527C136.517 40.2431 136.327 39.5295 135.957 38.9032C135.587 38.2769 135.079 37.7892 134.432 37.4401C133.796 37.0808 133.062 36.9011 132.23 36.9011C131.388 36.9011 130.633 37.091 129.966 37.4709C129.299 37.8406 128.77 38.3488 128.38 38.9956C127.989 39.6322 127.784 40.356 127.764 41.1672V45.618C127.764 46.5832 127.954 47.4302 128.333 48.1592C128.713 48.8779 129.252 49.4375 129.951 49.8379C130.649 50.2383 131.48 50.4386 132.446 50.4386C133.113 50.4386 133.719 50.3462 134.263 50.1613C134.807 49.9765 135.274 49.7044 135.664 49.3451C136.054 48.9857 136.347 48.5442 136.542 48.0206L143.457 48.2208C143.17 49.7712 142.538 51.1213 141.563 52.2713C140.598 53.4109 139.33 54.2991 137.759 54.9356C136.188 55.562 134.371 55.8751 132.307 55.8751Z" fill="currentColor"/>
                      <path d="M93 55.4285V23.8873H106.029C108.391 23.8873 110.429 24.3134 112.143 25.1655C113.868 26.0075 115.198 27.219 116.132 28.8002C117.067 30.3711 117.534 32.2346 117.534 34.3907C117.534 36.5777 117.056 38.4361 116.101 39.9659C115.147 41.4855 113.791 42.6457 112.036 43.4465C110.28 44.2371 108.201 44.6324 105.798 44.6324H97.5587V38.626H104.381C105.531 38.626 106.491 38.4771 107.261 38.1794C108.042 37.8714 108.632 37.4093 109.032 36.7933C109.433 36.167 109.633 35.3661 109.633 34.3907C109.633 33.4153 109.433 32.6094 109.032 31.9728C108.632 31.3259 108.042 30.8434 107.261 30.5251C106.481 30.1965 105.521 30.0323 104.381 30.0323H100.623V55.4285H93ZM110.757 41.0132L118.612 55.4285H110.295L102.595 41.0132H110.757Z" fill="currentColor"/>
                      <defs>
                      <clipPath id="rmt-re-clip">
                      <rect width="80.248" height="78.857" fill="white" transform="matrix(-1 0 0 1 80.248 0)"/>
                      </clipPath>
                      </defs>
                      </svg>
                      </a>
                    </div>
                    <h3><a className="brand-name-link" href="https://remobile.eu" target="_blank" rel="noopener noreferrer">Remobile.eu</a></h3>
                  <p>{t("portfolio.remobileDescription")}</p>
                  </div>
      
                </div>
                  </div>
                </article>

                <article className="hero-stage" id="markets" data-hero-stage="2">
                  <div className="hero-stage__body">
                    <p className="hero-eyebrow" data-hero-anim><span>03 /</span> {t("markets.eyebrow")}</p>
                    <h2 data-hero-anim>{t("markets.title")}</h2>
                    <ul className="hero-markets">
                      <li className="hero-market" data-hero-anim><CountryFlag country="de" /><span>{t("markets.countries.germany")}</span></li>
                      <li className="hero-market" data-hero-anim><CountryFlag country="at" /><span>{t("markets.countries.austria")}</span></li>
                      <li className="hero-market" data-hero-anim><CountryFlag country="nl" /><span>{t("markets.countries.netherlands")}</span></li>
                      <li className="hero-market" data-hero-anim><CountryFlag country="be" /><span>{t("markets.countries.belgium")}</span></li>
                    </ul>
                    <p className="hero-market-support" data-hero-anim><span>{t("markets.support")}</span><EuFlag /></p>
                  </div>
                </article>
              </div>

              <figure className="hero-orbit" aria-hidden="true">
                <svg className="orbit-viz" id="hero-orbit" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                  <defs>
                    <radialGradient id="hero-orbit-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#A9C6DC" stopOpacity=".30"/>
                      <stop offset=".58" stopColor="#A9C6DC" stopOpacity=".08"/>
                      <stop offset="1" stopColor="#A9C6DC" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="hero-orbit-core-glow" x="-150%" y="-150%" width="400%" height="400%">
                      <feGaussianBlur stdDeviation="7" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <circle className="orbit-field" cx="200" cy="200" r="156" fill="url(#hero-orbit-glow)"/>
                  <g id="hero-orbit-rotor">
                    <circle className="orbit-ring orbit-ring--outer" cx="200" cy="200" r="190"/>
                    <circle className="orbit-ring" cx="200" cy="200" r="96"/>
                    <circle className="orbit-arc" id="hero-orbit-arc-a" cx="200" cy="200" r="96"/>
                    <g id="hero-orbit-group-a">
                      <line className="orbit-spoke" x1="180.95" y1="189" x2="127.25" y2="158"/>
                      <line className="orbit-spoke" x1="219.05" y1="211" x2="272.75" y2="242"/>
                      <circle className="orbit-node orbit-node-a" cx="116.86" cy="152" r="10"/>
                      <circle className="orbit-node orbit-node-a" cx="283.14" cy="248" r="10"/>
                    </g>
                    <circle className="orbit-ring" cx="200" cy="200" r="158"/>
                    <circle className="orbit-arc" id="hero-orbit-arc-b" cx="200" cy="200" r="158"/>
                    <g id="hero-orbit-group-b">
                      <line className="orbit-spoke" x1="200" y1="88" x2="200" y2="54"/>
                      <line className="orbit-spoke" x1="312" y1="200" x2="346" y2="200"/>
                      <line className="orbit-spoke" x1="200" y1="312" x2="200" y2="346"/>
                      <line className="orbit-spoke" x1="88" y1="200" x2="54" y2="200"/>
                      <circle className="orbit-node orbit-node-b" cx="200" cy="42" r="7"/>
                      <circle className="orbit-node orbit-node-b" cx="358" cy="200" r="7"/>
                      <circle className="orbit-node orbit-node-b" cx="200" cy="358" r="7"/>
                      <circle className="orbit-node orbit-node-b" cx="42" cy="200" r="7"/>
                    </g>
                  </g>
                  <circle className="orbit-halo" cx="200" cy="200" r="34"/>
                  <circle className="orbit-core" id="hero-orbit-core" cx="200" cy="200" r="19"/>
                </svg>
              </figure>
            </div>
          </div>

          <div className="hero-rail" aria-hidden="true">
            <ol>
              <li data-hero-tick="0"><i></i>01</li>
              <li data-hero-tick="1"><i></i>02</li>
              <li data-hero-tick="2"><i></i>03</li>
            </ol>
          </div>

          <div className="scroll-cue" id="hero-scroll-cue" aria-hidden="true">
            <span className="track"></span>
            <span>{t("hero.scroll")}</span>
          </div>
          <div className="hero-foot" aria-hidden="true"></div>
        </div>
      </section>

      {/* =============================== ABOUT ============================== */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-copy reveal">
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h2 style={{ marginTop: 20 }}>{t("about.title")}</h2>
            <p className="lede-serif" style={{ marginTop: 26 }}>
              {t("about.lede")}
            </p>
            <p className="about-actions">
              <Link className="textlink" href={`/${locale}/about`}>{t("about.link")}<svg className="arw" width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"><path d="M9.6 1 13.5 5 9.6 9M13 5H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
            </p>
          </div>
          <AboutDeviceVisual animated />
        </div>
      </section>
      
      {/* ============================= WHOLESALE ============================ */}
      <section className="section section--tint" id="wholesale">
        <div className="container">
          <div className="wholesale-panel reveal">
            <div className="wholesale-copy">
              <p className="eyebrow">{t("wholesale.eyebrow")}</p>
              <h2>{t("wholesale.title")}</h2>
              <p>
                {t("wholesale.body")}
              </p>
            </div>
            <div className="wholesale-actions">
              <a className="btn btn--solid-light" href="mailto:wholesale@remobiletech.com" data-wholesale-trigger>
                {t("wholesale.cta")}
                <svg className="arw" width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"><path d="M9.6 1 13.5 5 9.6 9M13 5H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="wholesale-markets">
              <p className="label">{t("wholesale.marketsLabel")}</p>
              <p className="list">{t("wholesale.marketsList")}</p>
            </div>
          </div>
        </div>
      </section>
      
      </main>
      
      {/* Both home-page CTAs open this shared inquiry flow. */}
      <dialog className="wmodal" id="wholesale-modal" aria-modal="true" aria-labelledby="wmodal-title">
        <form className="wmodal__panel" id="wholesale-form" noValidate autoComplete="on">
          <div className="wmodal__head">
            <h2 className="wmodal__title" id="wmodal-title">{t("modal.title")}</h2>
            <button className="wmodal__close" type="button" data-wm-close aria-label={t("modal.close")}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" focusable="false">
                <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
      
          <div className="wmodal__body" id="wmodal-body">
            <div className="field" data-field>
              <label htmlFor="wm-name">{t("modal.name")} <span aria-hidden="true">*</span></label>
              <input id="wm-name" name="name" type="text" autoComplete="name"
                     required aria-describedby="wm-name-err" />
              <p className="field__err" id="wm-name-err"></p>
            </div>
            <div className="field" data-field>
              <label htmlFor="wm-company">{t("modal.company")}</label>
              <input id="wm-company" name="company" type="text" autoComplete="organization" />
            </div>
            <div className="field" data-field>
              <label htmlFor="wm-email">{t("modal.email")} <span aria-hidden="true">*</span></label>
              <input id="wm-email" name="email" type="email" autoComplete="email"
                     required aria-describedby="wm-email-err" />
              <p className="field__err" id="wm-email-err"></p>
            </div>
            <div className="field" data-field>
              <label htmlFor="wm-message">{t("modal.message")}</label>
              <textarea id="wm-message" name="message" rows={4}></textarea>
            </div>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="wm-website">Website</label>
              <input id="wm-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="form-status form-status--error" id="wm-status" role="alert" hidden></p>
      
            <div className="wmodal__foot">
              <button className="btn btn--solid-ink" type="submit">
                <span data-wm-submit-label>{t("modal.submit")}</span>
                <svg className="arw" width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"><path d="M9.6 1 13.5 5 9.6 9M13 5H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
      
          <div className="wmodal__done" id="wmodal-done" hidden tabIndex={-1}>
            <span className="tick" aria-hidden="true">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true" focusable="false">
                <path d="M1.5 6.2 5.4 10 13.5 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p>{t("modal.success")}</p>
          </div>
        </form>
      </dialog>
      {/* ==== WHOLESALE MODAL — end ==== */}
      
      <SiteFooter locale={locale} usesInlineLogo />
      
      
      <HomeBehaviors
        messages={{
          requiredEmail: t("modal.errors.requiredEmail"),
          requiredName: t("modal.errors.requiredName"),
          invalidEmail: t("modal.errors.invalidEmail"),
          failure: t("modal.failure"),
          sending: t("modal.sending"),
          submit: t("modal.submit"),
        }}
      />
    </>
  );
}
