// Browser stand-in. The native module reaches for TurboModuleRegistry at import
// time, and on web that takes down every route rather than just this control —
// which has already happened twice in this project. So the web build gets this
// file and never loads the real one.

export function VoiceInput() {
  return null;
}
