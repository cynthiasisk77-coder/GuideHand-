// Offline distance/direction math. The phone's GPS chip works with no cell
// signal and no Wi-Fi, and everything below is pure arithmetic on two
// coordinate pairs — so the whole Family Meetup feature keeps working when the
// network is gone. No map tiles, no lookups, no dependency on being online.

export interface Coords {
  latitude: number;
  longitude: number;
}

// Mean Earth radius. Haversine on a sphere is accurate to roughly 0.3% — far
// better than the GPS fix you'll actually get on foot in bad conditions.
const EARTH_RADIUS_MILES = 3958.7613;
const EARTH_RADIUS_KM = 6371.0088;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

/** Great-circle distance between two points, in miles (Haversine formula). */
export function distanceMiles(from: Coords, to: Coords): number {
  return haversine(from, to) * EARTH_RADIUS_MILES;
}

/** Great-circle distance between two points, in kilometres. */
export function distanceKilometers(from: Coords, to: Coords): number {
  return haversine(from, to) * EARTH_RADIUS_KM;
}

// Returns the central angle between the two points, in radians.
function haversine(from: Coords, to: Coords): number {
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * Initial compass bearing from one point to the other, 0-360 degrees clockwise
 * from true north. This is a true bearing, so it lines up with a paper map or a
 * baseplate compass — it does not need the phone's magnetometer.
 */
export function bearingDegrees(from: Coords, to: Coords): number {
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  const dLon = toRadians(to.longitude - from.longitude);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

const COMPASS_SHORT = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

const COMPASS_LONG = [
  "North", "North-northeast", "Northeast", "East-northeast",
  "East", "East-southeast", "Southeast", "South-southeast",
  "South", "South-southwest", "Southwest", "West-southwest",
  "West", "West-northwest", "Northwest", "North-northwest",
];

/** "NE" — the 16-point compass abbreviation for a bearing. */
export function compassShort(bearing: number): string {
  return COMPASS_SHORT[compassIndex(bearing)];
}

/** "Northeast" — the spelled-out compass direction for a bearing. */
export function compassLong(bearing: number): string {
  return COMPASS_LONG[compassIndex(bearing)];
}

function compassIndex(bearing: number): number {
  const normalized = ((bearing % 360) + 360) % 360;
  return Math.round(normalized / 22.5) % 16;
}

/**
 * Distance phrased the way a person needs it on the ground: feet up close,
 * one decimal for a walkable distance, whole miles once it's a drive.
 */
export function formatDistance(miles: number): string {
  if (!Number.isFinite(miles)) return "—";
  if (miles < 0.095) {
    const feet = Math.round(miles * 5280);
    return `${feet} ft`;
  }
  if (miles < 10) return `${miles.toFixed(1)} mi`;
  if (miles < 100) return `${miles.toFixed(0)} mi`;
  return `${Math.round(miles).toLocaleString()} mi`;
}

// A steady walking pace over unfamiliar or damaged ground, carrying something.
// Deliberately conservative: better to arrive early than to plan on 4 mph and
// have people waiting in the dark.
const WALKING_MPH = 2.5;

/** Rough walking time, or undefined when walking is not a realistic answer. */
export function formatWalkingTime(miles: number): string | undefined {
  if (!Number.isFinite(miles) || miles < 0.1 || miles > 40) return undefined;
  const totalMinutes = Math.round((miles / WALKING_MPH) * 60);
  if (totalMinutes < 60) return `about ${totalMinutes} min on foot`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `about ${hours} hr on foot`;
  return `about ${hours} hr ${minutes} min on foot`;
}

/** Fixed-width coordinate text you can read aloud, write down, or radio in. */
export function formatCoords(coords: Coords): string {
  return `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
}

/**
 * Accepts the shapes people actually paste or type: "34.05224, -118.24368",
 * "34.05224 -118.24368", or "34.05224 N, 118.24368 W". Returns undefined for
 * anything it can't read with confidence, rather than guessing at a location.
 */
export function parseCoords(input: string): Coords | undefined {
  const cleaned = input.trim().replace(/[()]/g, "");
  if (!cleaned) return undefined;

  const pattern = /^\s*([+-]?\d+(?:\.\d+)?)\s*°?\s*([NnSs])?\s*[, ]\s*([+-]?\d+(?:\.\d+)?)\s*°?\s*([EeWw])?\s*$/;
  const match = cleaned.match(pattern);
  if (!match) return undefined;

  let latitude = Number(match[1]);
  let longitude = Number(match[3]);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return undefined;

  const latHemisphere = match[2]?.toUpperCase();
  const lonHemisphere = match[4]?.toUpperCase();
  if (latHemisphere === "S") latitude = -Math.abs(latitude);
  if (latHemisphere === "N") latitude = Math.abs(latitude);
  if (lonHemisphere === "W") longitude = -Math.abs(longitude);
  if (lonHemisphere === "E") longitude = Math.abs(longitude);

  if (latitude < -90 || latitude > 90) return undefined;
  if (longitude < -180 || longitude > 180) return undefined;

  return { latitude, longitude };
}

/**
 * A shared meeting place, as it travels between two phones inside a QR code.
 */
export interface SharedPlace extends Coords {
  label?: string;
}

/**
 * Builds a `geo:` URI (RFC 5870) for a meeting place. Using the real standard
 * instead of a GuideHand-only format means the code a person scans here is the
 * same kind of code a mapping app makes — and the coordinates are still legible
 * as plain text if someone photographs the code and reads it off a screen.
 */
export function buildPlaceCode(place: SharedPlace): string {
  const lat = place.latitude.toFixed(5);
  const lon = place.longitude.toFixed(5);
  const base = `geo:${lat},${lon}?q=${lat},${lon}`;
  const label = place.label?.trim();
  return label ? `${base}(${label})` : base;
}

/**
 * Reads a scanned code back into a place. Accepts GuideHand's own `geo:` codes,
 * the map links people paste to each other, and a bare "lat, long" pair — so a
 * code made somewhere else still works. Returns undefined rather than guessing.
 */
export function parsePlaceCode(raw: string): SharedPlace | undefined {
  const text = raw.trim();
  if (!text) return undefined;

  // A label in parentheses, the way geo: URIs carry one.
  const labelMatch = text.match(/\(([^)]{1,80})\)\s*$/);
  const label = labelMatch ? decodeURIComponent(labelMatch[1].replace(/\+/g, " ")).trim() : undefined;
  const withoutLabel = labelMatch ? text.slice(0, labelMatch.index).trim() : text;

  const candidates: string[] = [];

  const geoMatch = withoutLabel.match(/^geo:\s*([^?;]+)/i);
  if (geoMatch) candidates.push(geoMatch[1]);

  // The query parameter map apps use to carry a coordinate pair: ?q= in geo:
  // URIs and Google links, ?ll= in Apple Maps, ?daddr=/?destination= in
  // directions links.
  const queryMatch = withoutLabel.match(/[?&](?:q|ll|sll|daddr|destination)=([^&]+)/i);
  if (queryMatch) candidates.push(decodeURIComponent(queryMatch[1]));

  // The /@lat,lon,zoom form used in map URLs.
  const atMatch = withoutLabel.match(/[/@](-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (atMatch) candidates.push(`${atMatch[1]},${atMatch[2]}`);

  candidates.push(withoutLabel);

  for (const candidate of candidates) {
    // Map URLs often append a zoom level; keep only the first two numbers.
    const trimmed = candidate.trim().split(",").slice(0, 2).join(",");
    const coords = parseCoords(trimmed);
    if (coords) return label ? { ...coords, label } : coords;
  }

  return undefined;
}
