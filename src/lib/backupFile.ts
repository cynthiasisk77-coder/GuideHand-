// Getting a backup off the phone, and a backup file back onto it.
//
// Everything platform-specific lives here so the backup logic itself stays
// plain string-in, string-out and can be tested without a device.

import { Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Directory, File, Paths } from 'expo-file-system';

export type SaveResult =
  | { ok: true; how: 'shared' | 'downloaded' }
  | { ok: false; reason: string };

/**
 * Hands the backup to the person. On a phone that means the system share sheet,
 * so they choose where it goes — email to themselves, Files, a cloud drive,
 * whatever they already trust. GuideHand never sees where it lands.
 */
export async function saveBackupFile(fileName: string, contents: string): Promise<SaveResult> {
  if (Platform.OS === 'web') {
    try {
      const blob = new Blob([contents], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return { ok: true, how: 'downloaded' };
    } catch (err) {
      return { ok: false, reason: err instanceof Error ? err.message : 'Could not save the file.' };
    }
  }

  try {
    // The cache directory: the file only needs to live long enough to be handed
    // to whatever app the person picks, and the system can reclaim it after.
    const dir = new Directory(Paths.cache, 'backups');
    if (!dir.exists) dir.create({ intermediates: true });
    const file = new File(dir, fileName);
    if (file.exists) file.delete();
    file.create();
    file.write(contents);

    if (!(await Sharing.isAvailableAsync())) {
      return { ok: false, reason: `This phone cannot share files. The backup is saved at ${file.uri}` };
    }
    await Sharing.shareAsync(file.uri, {
      mimeType: 'application/json',
      dialogTitle: 'Save your GuideHand backup',
      UTI: 'public.json',
    });
    return { ok: true, how: 'shared' };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'Could not save the file.' };
  }
}

export type PickResult =
  | { ok: true; contents: string; name: string }
  | { ok: false; reason: string; cancelled?: boolean };

/** Opens the system file picker and reads the chosen backup. */
export async function pickBackupFile(): Promise<PickResult> {
  if (Platform.OS === 'web') {
    return { ok: false, reason: 'Choosing a file to restore only works in the phone app.' };
  }

  try {
    const result = await File.pickFileAsync({ mimeTypes: ['application/json', 'text/plain'] });
    if (result.canceled) return { ok: false, reason: 'No file chosen.', cancelled: true };

    const picked = result.result;
    const file = Array.isArray(picked) ? picked[0] : picked;
    if (!file) return { ok: false, reason: 'No file chosen.', cancelled: true };

    const contents = await file.text();
    const name = Paths.basename(file.uri) || 'backup.json';
    return { ok: true, contents, name };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'Could not open that file.' };
  }
}
