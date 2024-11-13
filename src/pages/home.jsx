import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'


const carouselItems = [
  { id: 1, image: '/placeholder.svg?height=600&width=1600', alt: 'Slide 1' },
  { id: 2, image: '/placeholder.svg?height=600&width=1600', alt: 'Slide 2' },
  { id: 3, image: '/placeholder.svg?height=600&width=1600', alt: 'Slide 3' },
]

const categories = [
  { id: 1, name: 'Electronics', image: '/placeholder.svg?height=400&width=400' },
  { id: 2, name: 'Clothing', image: '/placeholder.svg?height=400&width=400' },
  { id: 3, name: 'Home & Garden', image: '/placeholder.svg?height=400&width=400' },
  { id: 4, name: 'Sports', image: '/placeholder.svg?height=400&width=400' },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <div className="min-h-screen bg-customBlack">
      

      <main>
        {/* Hero Carousel */}
        <section className="relative h-[600px] overflow-hidden">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={item.image} alt={item.alt} layout="fill" objectFit="cover" />
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </section>

        {/* Category Cards */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <Image src={category.image} alt={category.name} width={400} height={400} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Shop now
                    <ShoppingBag className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      
    </div>
  )
}