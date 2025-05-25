'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import getReviews from '@/apis/getReviews'

const Review = () => {
  const searchParams = useSearchParams()
  const link = searchParams.get('link')
  const name = searchParams.get('name')
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        const data = await getReviews(link)
        if (data && data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews)
        } else {
          setReviews([])
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    if (link) fetchReviews()
  }, [link])

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-2">📍 Place Reviews</h1>
      <p className="text-muted-foreground text-sm mb-3">Showing reviews for:</p>
      <div className="bg-muted px-4 py-2 rounded-lg text-sm text-blue-700 break-words mb-8 border border-blue-200">
        {name || 'Unknown Place'}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="shadow-md transition-shadow hover:shadow-lg border border-border"
                >
                  <CardContent className="p-5 flex gap-5 items-start">
                    <img
                      src={review?.avatar}
                      // alt={`${review.name.split("")[0]}`}
                      // onError={(e) => (e.currentTarget.src = '/fallback-avatar.png')}
                      className="w-14 h-14 rounded-full  object-cover border border-border"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">{review.name}</h2>
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                          ⭐ {review.rating || 'N/A'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{review.date}</p>
                      <p className="text-sm leading-relaxed text-foreground">{review.text}</p>
                      {review.isLocalGuide && (
                        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          🌟 Local Guide
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No reviews found.</p>
          )}
        </>
      )}
    </div>
  )
}

export default Review
