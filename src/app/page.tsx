'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 🎬 Video en movimiento como fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/cinematic.mp4" type="video/mp4" />
        Tu navegador no soporta el video HTML5.
      </video>

      {/* 🌓 Capa de oscurecimiento para legibilidad */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          🎥 Bienvenido a <span className="text-pink-500">MovieVerse</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl">
          Explora lo más popular, lo más aclamado y lo más reciente del cine.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/popular"
            className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition text-white font-semibold"
          >
            🔥 Populares
          </Link>
          <Link
            href="/top-rated"
            className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition text-white font-semibold"
          >
            🏆 Mejor Calificadas
          </Link>
          <Link
            href="/now-playing"
            className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition text-white font-semibold"
          >
            🎟️ En Cartelera
          </Link>
          <Link
            href="/favorites"
            className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition text-white font-semibold"
          >
            ⭐ Mis Favoritas
          </Link>
        </div>
      </div>
    </main>
  )
}
