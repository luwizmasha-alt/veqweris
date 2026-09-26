import { NextResponse } from 'next/server'
import { readSharedUploads, writeSharedUploads } from '@/lib/upload-store'

export async function GET() {
  const uploads = await readSharedUploads()
  return NextResponse.json({ uploads })
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const uploads = Array.isArray(body?.uploads) ? body.uploads : []
    await writeSharedUploads(uploads)
    return NextResponse.json({ ok: true, uploads })
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to save uploads' }, { status: 500 })
  }
}
