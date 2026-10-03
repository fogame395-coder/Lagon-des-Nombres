// AdMob IDs — real Android IDs configured. iOS placeholders to replace later.
// While `testing` is true, Google test ads are shown (required during development).
// Set `testing` to false before publishing the app.
export const ADS_CONFIG = {
  testing: true,
  // Show an interstitial every N finished games.
  interstitialEvery: 2,
  android: {
    appId: "ca-app-pub-5957048815311602~7027960195",
    banner: "ca-app-pub-5957048815311602/3088715180",
    interstitial: "ca-app-pub-5957048815311602/1775633512",
    // Extra ad units kept for later use (e.g. rewarded ads):
    extra: [
      "ca-app-pub-5957048815311602/6390589380",
      "ca-app-pub-5957048815311602/9921631120",
    ],
  },
  ios: {
    appId: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
    banner: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    interstitial: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
  },
};
