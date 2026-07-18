/* ============================================================
   The Jimothy Bull ($JIMBULL) — link config
   ------------------------------------------------------------
   ▶ PATCH HERE: paste your two values once and every link
     (pump.fun / pumpswap buy button, Dexscreener chart + embed,
      CA bar, copy button) updates automatically.
   ============================================================ */

const CA = "TBA"; // <-- paste TOKEN CONTRACT ADDRESS here (pump.fun / pumpswap)
const PAIR = "pairaddress"; // <-- paste DEXSCREENER PAIR ADDRESS here (solana pair)

/* Fixed socials */
const X_URL = "https://x.com/TheJimothyBull";
const TG_URL = "https://t.me/TheJimothyBull";

/* ------------------------------------------------------------
   Derived links (no need to edit below)
   ------------------------------------------------------------ */
const SOL = "So11111111111111111111111111111111111111112"; // wrapped SOL mint

const links = {
  x: X_URL,
  tg: TG_URL,
  // PumpSwap buy link (pump.fun swap) — used for BUY + pump.fun buttons
  pump: CA
    ? `https://swap.pump.fun/?input=${SOL}&output=${CA}`
    : "https://pump.fun/",
  buy: CA
    ? `https://swap.pump.fun/?input=${SOL}&output=${CA}`
    : "https://pump.fun/",
  // Dexscreener Solana pair
  dex: PAIR
    ? `https://dexscreener.com/solana/${PAIR}`
    : "https://dexscreener.com/solana",
};

/* Apply all links */
document.querySelectorAll("[data-link]").forEach((el) => {
  const key = el.getAttribute("data-link");
  if (links[key]) {
    el.setAttribute("href", links[key]);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }
});

/* CA bar text + copy */
const caText = document.getElementById("ca-text");
const caCopy = document.getElementById("ca-copy");
if (CA) {
  caText.textContent = CA;
}
caCopy.addEventListener("click", async () => {
  if (!CA) {
    return;
  }
  try {
    await navigator.clipboard.writeText(CA);
    caCopy.classList.add("ok");
    caCopy.innerHTML = '<i class="bi bi-check-lg"></i>';
    setTimeout(() => {
      caCopy.classList.remove("ok");
      caCopy.innerHTML = '<i class="bi bi-clipboard"></i>';
    }, 1500);
  } catch (e) {
    /* clipboard unavailable */
  }
});

/* Dexscreener embed (chart section) */
const embed = document.getElementById("dex-embed");
if (PAIR) {
  embed.innerHTML =
    `<iframe title="Dexscreener chart" loading="lazy" ` +
    `src="https://dexscreener.com/solana/${PAIR}?embed=1&theme=dark&trades=0&info=0"></iframe>`;
}
