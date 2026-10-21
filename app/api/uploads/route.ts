import { NextResponse } from 'next/server'
import { readSharedUploads, writeSharedUploads } from '@/lib/upload-store'
import type { UploadItem } from '@/lib/admin-data'

function isUploadItem(value: unknown): value is UploadItem {
  if (typeof value !== 'object' || value === null) return false

  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.category === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.status === 'string' &&
    typeof item.image === 'string' &&
    (item.video === undefined || typeof item.video === 'string') &&
    typeof item.href === 'string' &&
    typeof item.createdAt === 'string'
  )
}

export async function GET() {
  const uploads = await readSharedUploads()
  return NextResponse.json({ uploads })
}

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
    }

    if (
      typeof body !== 'object' ||
      body === null ||
      !('uploads' in body) ||
      !Array.isArray(body.uploads) ||
      !body.uploads.every(isUploadItem)
    ) {
      return NextResponse.json({ ok: false, error: 'Invalid uploads payload' }, { status: 400 })
    }

    const uploads = body.uploads
    await writeSharedUploads(uploads)
    return NextResponse.json({ ok: true, uploads })
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to save uploads' }, { status: 500 })
  }
}
