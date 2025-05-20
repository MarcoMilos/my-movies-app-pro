'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  return (
    <section className="min-h-screen bg-neutral-950 text-white px-6 md:px-20 py-12">
      <h1 className="text-4xl font-bold mb-8">⭐ Mis Películas Favoritas</h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-400 text-lg">Aún no has agregado películas a favoritos.</p>
      ) : (
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
              <div className="overflow-hidden rounded-xl shadow-md transition-transform transform hover:scale-105 bg-zinc-800">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[360px] object-cover group-hover:opacity-85 transition-opacity"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-sm text-zinc-400">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default FavoritesPage
