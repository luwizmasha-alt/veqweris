'use client'

import { useEffect, useRef, useState } from 'react'
import { VeqButton } from '@/components/veq-button'

type Status = 'ready' | 'playing' | 'gameover'

type Enemy = {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

type Pickup = {
  id: number
  x: number
  y: number
  size: number
  speed: number
  value: number
}

type GameState = {
  playerX: number
  enemies: Enemy[]
  pickups: Pickup[]
  score: number
  lives: number
  status: Status
  enemyTimer: number
  pickupTimer: number
}

const GAME_WIDTH = 420
const GAME_HEIGHT = 560
const PLAYER_WIDTH = 54
const PLAYER_HEIGHT = 50
const PLAYER_STEP = 22

const createInitialState = (): GameState => ({
  playerX: (GAME_WIDTH - PLAYER_WIDTH) / 2,
  enemies: [],
  pickups: [],
  score: 0,
  lives: 3,
  status: 'ready',
  enemyTimer: 0,
  pickupTimer: 0,
})

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function NeonDriftGame() {
  const [game, setGame] = useState<GameState>(createInitialState)
  const keysRef = useRef({ left: false, right: false })
  const enemyIdRef = useRef(1)
  const pickupIdRef = useRef(1)

  const startGame = () => {
    setGame({ ...createInitialState(), status: 'playing' })
  }

  const setKeyState = (key: 'left' | 'right', active: boolean) => {
    keysRef.current[key] = active
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (event.key === 'ArrowLeft' || key === 'a') {
        event.preventDefault()
        setKeyState('left', true)
      }
      if (event.key === 'ArrowRight' || key === 'd') {
        event.preventDefault()
        setKeyState('right', true)
      }
      if (event.code === 'Space') {
        event.preventDefault()
        setGame((current) => {
          if (current.status === 'playing') {
            return current
          }

          if (current.status === 'gameover') {
            return { ...createInitialState(), status: 'playing' }
          }

          return { ...current, status: 'playing' }
        })
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (event.key === 'ArrowLeft' || key === 'a') {
        setKeyState('left', false)
      }
      if (event.key === 'ArrowRight' || key === 'd') {
        setKeyState('right', false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (game.status !== 'playing') {
      return
    }

    const interval = window.setInterval(() => {
      setGame((current) => {
        if (current.status !== 'playing') {
          return current
        }

        const movement = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0)
        const nextPlayerX = clamp(current.playerX + movement * PLAYER_STEP, 0, GAME_WIDTH - PLAYER_WIDTH)

        let enemies = current.enemies.map((enemy) => ({
          ...enemy,
          y: enemy.y + enemy.speed,
        }))

        let pickups = current.pickups.map((pickup) => ({
          ...pickup,
          y: pickup.y + pickup.speed,
        }))

        let enemyTimer = current.enemyTimer + 50
        let pickupTimer = current.pickupTimer + 50

        if (enemyTimer >= 700) {
          enemyTimer = 0
          enemies = [
            ...enemies,
            {
              id: enemyIdRef.current++,
              x: randomBetween(8, GAME_WIDTH - 38),
              y: -24,
              size: randomBetween(18, 34),
              speed: randomBetween(2.5, 4.4),
            },
          ]
        }

        if (pickupTimer >= 1600) {
          pickupTimer = 0
          pickups = [
            ...pickups,
            {
              id: pickupIdRef.current++,
              x: randomBetween(10, GAME_WIDTH - 26),
              y: -18,
              size: 16,
              speed: 2.3,
              value: 20,
            },
          ]
        }

        const playerBox = {
          left: nextPlayerX,
          right: nextPlayerX + PLAYER_WIDTH,
          top: GAME_HEIGHT - PLAYER_HEIGHT - 16,
          bottom: GAME_HEIGHT - 16,
        }

        const collidedEnemies: Enemy[] = []
        let lives = current.lives

        for (const enemy of enemies) {
          const enemyBox = {
            left: enemy.x,
            right: enemy.x + enemy.size,
            top: enemy.y,
            bottom: enemy.y + enemy.size,
          }

          const isColliding = !(
            playerBox.right < enemyBox.left ||
            playerBox.left > enemyBox.right ||
            playerBox.bottom < enemyBox.top ||
            playerBox.top > enemyBox.bottom
          )

          if (isColliding) {
            lives -= 1
            continue
          }

          collidedEnemies.push(enemy)
        }

        const remainingPickups: Pickup[] = []
        let score = current.score

        for (const pickup of pickups) {
          const pickupBox = {
            left: pickup.x,
            right: pickup.x + pickup.size,
            top: pickup.y,
            bottom: pickup.y + pickup.size,
          }

          const isCollected = !(
            playerBox.right < pickupBox.left ||
            playerBox.left > pickupBox.right ||
            playerBox.bottom < pickupBox.top ||
            playerBox.top > pickupBox.bottom
          )

          if (isCollected) {
            score += pickup.value
            continue
          }

          remainingPickups.push(pickup)
        }

        const status = lives <= 0 ? 'gameover' : 'playing'

        return {
          ...current,
          playerX: nextPlayerX,
          enemies: collidedEnemies.filter((enemy) => enemy.y < GAME_HEIGHT + enemy.size),
          pickups: remainingPickups.filter((pickup) => pickup.y < GAME_HEIGHT + pickup.size),
          score,
          lives,
          status,
          enemyTimer,
          pickupTimer,
        }
      })
    }, 50)

    return () => {
      window.clearInterval(interval)
    }
  }, [game.status])

  const inGame = game.status === 'playing'

  return (
    <section className="relative overflow-hidden bg-background px-4 py-10 md:px-10 md:py-16">
      <div className="absolute inset-0 veq-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-electric-blue/80">
            VEQWERIS // arcade
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Neon Drift
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Dodge incoming drones and collect energy cores to keep your run alive.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(45,140,255,0.08)] backdrop-blur-sm">
            <div className="flex flex-wrap gap-3">
              <VeqButton onClick={startGame} variant="primary" className="min-w-[150px]">
                {game.status === 'ready' ? 'Start game' : game.status === 'gameover' ? 'Play again' : 'Restart'}
              </VeqButton>
              <VeqButton
                onClick={() => setGame((current) => ({ ...current, status: 'ready' }))}
                variant="secondary"
              >
                Pause
              </VeqButton>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-sky-500/30 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Score</p>
                <p className="mt-2 text-3xl font-black text-electric-blue">{game.score}</p>
              </div>
              <div className="rounded-2xl border border-sky-500/30 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Lives</p>
                <p className="mt-2 text-3xl font-black text-amber-400">{game.lives}</p>
              </div>
              <div className="rounded-2xl border border-sky-500/30 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Status</p>
                <p className="mt-2 text-lg font-bold text-white">{game.status === 'ready' ? 'Ready' : game.status === 'playing' ? 'Live' : 'Crashed'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-500/20 bg-slate-950/60 p-5 text-sm text-slate-300">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                How to play
              </h2>
              <ul className="space-y-2">
                <li>• Move with A/D or the left and right arrow keys.</li>
                <li>• Collect bright energy cores for bonus points.</li>
                <li>• Avoid drones until the ship reaches maximum score.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Move left"
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white transition hover:border-electric-blue/60 hover:bg-slate-800"
                onMouseDown={() => setKeyState('left', true)}
                onMouseUp={() => setKeyState('left', false)}
                onMouseLeave={() => setKeyState('left', false)}
              >
                Left
              </button>
              <button
                type="button"
                aria-label="Move right"
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white transition hover:border-electric-blue/60 hover:bg-slate-800"
                onMouseDown={() => setKeyState('right', true)}
                onMouseUp={() => setKeyState('right', false)}
                onMouseLeave={() => setKeyState('right', false)}
              >
                Right
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-electric-blue/30 bg-[#020d1a] p-3 shadow-[0_0_40px_rgba(45,140,255,0.2)]">
            <div className="mb-3 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.4em] text-slate-400">
              <span>Zone 07</span>
              <span>{inGame ? 'Active' : 'Standby'}</span>
            </div>

            <div
              className="relative overflow-hidden rounded-[22px] border border-sky-500/30 bg-[radial-gradient(circle_at_top,_rgba(45,140,255,0.22),_transparent_35%),linear-gradient(180deg,#030d18_0%,#02070d_100%)]"
              style={{ width: '100%', height: 560 }}
            >
              <div className="veq-grid absolute inset-0 opacity-40" />

              {game.pickups.map((pickup) => (
                <div
                  key={pickup.id}
                  style={{
                    position: 'absolute',
                    left: pickup.x,
                    top: pickup.y,
                    width: pickup.size,
                    height: pickup.size,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fef3c7 0%, #fbbf24 25%, #2dd4bf 100%)',
                    boxShadow: '0 0 18px rgba(251, 191, 36, 0.9)',
                  }}
                />
              ))}

              {game.enemies.map((enemy) => (
                <div
                  key={enemy.id}
                  style={{
                    position: 'absolute',
                    left: enemy.x,
                    top: enemy.y,
                    width: enemy.size,
                    height: enemy.size,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(248,113,113,0.95), rgba(239,68,68,0.78), rgba(59,130,246,0.7))',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 0 18px rgba(239, 68, 68, 0.65)',
                  }}
                />
              ))}

              <div
                style={{
                  position: 'absolute',
                  left: game.playerX,
                  bottom: 18,
                  width: PLAYER_WIDTH,
                  height: PLAYER_HEIGHT,
                  background: 'linear-gradient(180deg, #f8fbff 0%, #8be9fd 35%, #2d8cff 100%)',
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '0 0 26px rgba(45,140,255,0.9)',
                }}
              />

              {game.status !== 'playing' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65 backdrop-blur-[2px]">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/85 p-6 text-center shadow-[0_0_30px_rgba(45,140,255,0.25)]">
                    <p className="text-[10px] uppercase tracking-[0.45em] text-electric-blue">
                      {game.status === 'ready' ? 'Ready' : 'Game over'}
                    </p>
                    <h3 className="mt-3 text-3xl font-black text-white">
                      {game.status === 'ready' ? 'Launch sequence' : 'System failure'}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      {game.status === 'ready'
                        ? 'Press start and survive the incoming swarm.'
                        : `Final score: ${game.score}. Hit start to retry.`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
