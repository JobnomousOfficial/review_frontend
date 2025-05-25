'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import getPlaces from '@/apis/getPlaces'
import Link from 'next/link'

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setResults(null)

    try {
      const response = await getPlaces(query)
      setResults(response)
    } catch (error) {
      console.error('Error fetching places:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6  max-w-[1600px] mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places like 'cafes in Hyderabad'"
        />
        <Button type="submit">Search</Button>
      </form>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      )}

{!loading && results && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    {Array.isArray(results) && results.length > 0 ? (
      results.map((place, index) => (
        <Card
          key={index}
          className="flex flex-col shadow-md border border-muted rounded-2xl overflow-hidden h-full transition-all hover:shadow-lg"
        >
          {/* Image */}
          <div className="w-full h-48 bg-gray-100">
            {place.image ? (
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="flex flex-col justify-between p-4 space-y-2 flex-1">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">{place.name}</h3>
              <p className="text-sm text-muted-foreground">{place.address}</p>
              <p className="text-sm">🕒 {place.hours || 'Hours not available'}</p>
              <p className="text-sm">⭐ {place.rating || 'N/A'} • {place.reviews || '0 reviews'}</p>
            </div>

            {place.link && (
           <Link
           href={`/review?link=${encodeURIComponent(place.link)}&name=${encodeURIComponent(place.name)}`}
           target="_blank"
           rel="noopener noreferrer"
           className="text-sm font-medium cursor-pointer text-primary hover:underline"
         >
           View Reviews
         </Link>
         
            )}
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center text-muted-foreground col-span-full">No results found.</p>
    )}
  </div>
)}

    </div>
  )
}

export default Home
