'use client'

import React, { useEffect, useState } from 'react'
import { getPopularMovies } from '@/services/movies/getPopularMovies'
import Link from 'next/link'

interface Movie {
  id: number
  title: string
  vote_average: number
  poster_path: string
  release_date: string
}

const PopularPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovies()
        setMovies(data.results)
      } catch (error) {
        console.error('Error fetching popular movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="min-h-screen bg-neutral-950 text-white py-12 px-6 md:px-16">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          🎬 Películas Populares
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Descubre las películas más populares del momento según TMDb.
        </p>
      </header>

      {loading ? (
        <div className="text-center text-zinc-400 text-xl animate-pulse">
          Cargando películas...
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group relative">
              <div className="overflow-hidden rounded-xl shadow-lg transition-transform transform group-hover:scale-105 bg-zinc-800">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[360px] object-cover transition-opacity duration-300 group-hover:opacity-85"
                />
              </div>
              <div className="mt-3 px-1">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-sm text-zinc-400">
                  ⭐ {movie.vote_average.toFixed(1)} · {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default PopularPage
