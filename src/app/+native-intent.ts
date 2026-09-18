// What the app does when Android opens it with a link.
//
// The family-plan QR is a link to /GuideHand-/plan/#<payload>. A camera app
// opens that link; Android hands it here because the app claims that exact
// path (app.json → android.intentFilters). The plan lives in the part after
// "#". It is handed to the scanner screen, which already knows how to show a
// plan and ask before saving it — the same screen, whether the plan arrived by
// camera or by link. Anything else is passed through untouched.

const PLAN_PATH = '/GuideHand-/plan';

export function redirectSystemPath({ path }: { path: string; initial: boolean }): string {
  try {
    if (path.includes(PLAN_PATH) && path.includes('#')) {
      const payload = path.slice(path.indexOf('#') + 1);
      if (payload) return `/meetup-scan?code=${encodeURIComponent(payload)}`;
    }
  } catch {
    // Fall through: a bad link opens the app normally rather than nowhere.
  }
  return path;
}
