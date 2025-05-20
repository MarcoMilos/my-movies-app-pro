"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getMovieById } from "@/services/movies/getMovieById"
import { getMovieRecommendations } from "@/services/movies/getMovieRecommendations"
import Link from "next/link"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  genres: { id: number; name: string }[]
  runtime: number
}

const MovieDetailPage = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id || typeof id !== "string") return

      try {
        const movieData = await getMovieById(id)
        const recData = await getMovieRecommendations(id)
        setMovie(movieData)
        setRecommendations(recData.results)

        // Check favorites in localStorage
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
        const alreadyFav = stored.some((m: Movie) => m.id === movieData.id)
        setIsFavorite(alreadyFav)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) return <div className="text-white p-10">Cargando...</div>
  if (!movie) return <div className="text-white p-10">No se encontró la película.</div>

  return (
    <section className="min-h-screen bg-neutral-950 text-white px-6 md:px-20 py-12">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-xs rounded-xl shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-zinc-400 mb-2">
            {new Date(movie.release_date).getFullYear()} · {movie.runtime} min
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-lg text-zinc-300 leading-relaxed">{movie.overview}</p>

          <button
            className={`mt-6 inline-block px-6 py-2 rounded-full transition font-semibold ${
              isFavorite
                ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
            onClick={() => {
              const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
              let updated
              if (isFavorite) {
                updated = stored.filter((m: Movie) => m.id !== movie.id)
              } else {
                updated = [...stored, movie]
              }
              localStorage.setItem("favorites", JSON.stringify(updated))
              setIsFavorite(!isFavorite)
            }}
          >
            {isFavorite ? "💔 Eliminar de Favoritos" : "❤️ Agregar a Favoritos"}
          </button>
        </div>
      </div>

      {/* Carrusel de recomendadas */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Películas Recomendadas</h2>
        <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
          {recommendations.map((rec) => (
            <Link key={rec.id} href={`/movie/${rec.id}`}>
              <div className="inline-block w-40 shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                  alt={rec.title}
                  className="w-full h-auto rounded-lg hover:opacity-80 transition"
                />
                <p className="text-sm mt-2 text-zinc-300 truncate">{rec.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MovieDetailPage
