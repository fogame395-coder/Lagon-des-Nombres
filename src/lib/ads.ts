import { ADS_CONFIG } from "./ads.config";

// AdMob only works inside the native (Capacitor) app. On the web every call is a no-op.
async function getAdMob() {
  const { Capacitor } = await import("@capacitor/core");
  if (!Capacitor.isNativePlatform()) return null;
  const mod = await import("@capacitor-community/admob");
  const ids = Capacitor.getPlatform() === "ios" ? ADS_CONFIG.ios : ADS_CONFIG.android;
  return { ...mod, ids };
}

let ready: Promise<Awaited<ReturnType<typeof getAdMob>>> | null = null;
let gamesFinished = 0;

export function initAds() {
  if (ready) return ready;
  ready = (async () => {
    try {
      const m = await getAdMob();
      if (!m) return null;
      await m.AdMob.initialize({ initializeForTesting: ADS_CONFIG.testing });
      await m.AdMob.showBanner({
        adId: m.ids.banner,
        adSize: m.BannerAdSize.ADAPTIVE_BANNER,
        position: m.BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: ADS_CONFIG.testing,
      });
      await m.AdMob.prepareInterstitial({ adId: m.ids.interstitial, isTesting: ADS_CONFIG.testing });
      return m;
    } catch (e) {
      console.warn("AdMob init failed", e);
      return null;
    }
  })();
  return ready;
}

export async function onGameOver() {
  gamesFinished++;
  if (gamesFinished % ADS_CONFIG.interstitialEvery !== 0) return;
  const m = await initAds();
  if (!m) return;
  try {
    await m.AdMob.showInterstitial();
    await m.AdMob.prepareInterstitial({ adId: m.ids.interstitial, isTesting: ADS_CONFIG.testing });
  } catch (e) {
    console.warn("Interstitial failed", e);
  }
}
