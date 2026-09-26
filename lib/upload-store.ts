import { promises as fs } from 'node:fs'
import path from 'node:path'
import { DEFAULT_UPLOADS, type UploadItem } from '@/lib/admin-data'

const SERVER_UPLOADS_PATH = path.join(process.cwd(), 'data', 'uploads.json')

export async function readSharedUploads(): Promise<UploadItem[]> {
  try {
    const raw = await fs.readFile(SERVER_UPLOADS_PATH, 'utf8')
    const parsed = JSON.parse(raw) as UploadItem[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_UPLOADS
  } catch {
    await fs.mkdir(path.dirname(SERVER_UPLOADS_PATH), { recursive: true })
    await fs.writeFile(SERVER_UPLOADS_PATH, JSON.stringify(DEFAULT_UPLOADS, null, 2), 'utf8')
    return DEFAULT_UPLOADS
  }
}

export async function writeSharedUploads(items: UploadItem[]) {
  await fs.mkdir(path.dirname(SERVER_UPLOADS_PATH), { recursive: true })
  await fs.writeFile(SERVER_UPLOADS_PATH, JSON.stringify(items, null, 2), 'utf8')
}
