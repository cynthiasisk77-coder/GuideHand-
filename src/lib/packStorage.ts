// Where downloaded packs live.
//
// On a phone this is real files in the app's document directory, which survives
// restarts and is not cleared by the system when storage runs low — a pack you
// downloaded before the storm has to still be there during it.
//
// The web build of expo-file-system is a stub, so web falls back to
// AsyncStorage. Web is a development and testing surface here, not where the
// app ships, so the smaller size ceiling there does not matter.

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';

export interface PackStorage {
  /** Reads a stored pack's raw JSON text, or undefined when it isn't there. */
  read(id: string): Promise<string | undefined>;
  write(id: string, contents: string): Promise<void>;
  remove(id: string): Promise<void>;
  /** Free space on the device in bytes, or undefined when it can't be determined. */
  freeSpace(): Promise<number | undefined>;
}

const WEB_PREFIX = 'guidehand.pack.';
const PACK_DIR = 'content-packs';

function webStorage(): PackStorage {
  return {
    async read(id) {
      const value = await AsyncStorage.getItem(WEB_PREFIX + id);
      return value ?? undefined;
    },
    async write(id, contents) {
      await AsyncStorage.setItem(WEB_PREFIX + id, contents);
    },
    async remove(id) {
      await AsyncStorage.removeItem(WEB_PREFIX + id);
    },
    async freeSpace() {
      return undefined;
    },
  };
}

// Only ever constructed off web — expo-file-system's web build is a stub whose
// File and Directory classes do nothing.
function nativeStorage(): PackStorage {
  const packDirectory = () => {
    const dir = new Directory(Paths.document, PACK_DIR);
    if (!dir.exists) dir.create({ intermediates: true });
    return dir;
  };

  const packFile = (id: string) => new File(packDirectory(), `${id}.json`);

  return {
    async read(id) {
      try {
        const file = packFile(id);
        if (!file.exists) return undefined;
        return file.textSync();
      } catch {
        return undefined;
      }
    },
    async write(id, contents) {
      const file = packFile(id);
      if (file.exists) file.delete();
      file.create();
      file.write(contents);
    },
    async remove(id) {
      try {
        const file = packFile(id);
        if (file.exists) file.delete();
      } catch {
        // Already gone is the outcome we wanted.
      }
    },
    async freeSpace() {
      try {
        return Paths.availableDiskSpace;
      } catch {
        return undefined;
      }
    },
  };
}

let cached: PackStorage | undefined;

export function getPackStorage(): PackStorage {
  if (!cached) {
    cached = Platform.OS === 'web' ? webStorage() : nativeStorage();
  }
  return cached;
}

/** Test seam: lets the pack manager be exercised against an in-memory store. */
export function setPackStorageForTesting(storage: PackStorage | undefined): void {
  cached = storage;
}
