"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Settings, Sliders, Clock, Trash2 } from "lucide-react"

export default function PhotoEnhancementApp() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("")
  const [afterImageUrl, setAfterImageUrl] = useState<string>("")

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        processFile(file)
      }
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        processFile(file)
      }
    }
  }

  const processFile = (file: File) => {
    setUploadedFile(file)
    const url = URL.createObjectURL(file)
    setBeforeImageUrl(url)
    // Simulate enhanced version (in real app, this would be processed)
    setAfterImageUrl(url)
    setShowComparison(true)
  }

  const handleApplySettings = () => {
    console.log("Applying last settings...")
  }

  const handleEditPreferences = () => {
    console.log("Opening preferences...")
  }

  const handleViewHistory = () => {
    console.log("Viewing history...")
  }

  const handleDelete = () => {
    setUploadedFile(null)
    setBeforeImageUrl("")
    setAfterImageUrl("")
    setShowComparison(false)
    console.log("Deleting photo...")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Transform Your Photos</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your appearance for social media with ease.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 transition-colors">
          <CardContent className="p-8 md:p-12">
            <div
              className={`relative flex flex-col items-center justify-center space-y-4 transition-all duration-200 ${
                dragActive ? "bg-blue-50 scale-105" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg md:text-xl text-gray-700">
                  Drag and drop a photo or{" "}
                  <label className="font-semibold text-gray-900 cursor-pointer hover:underline hover:text-blue-600 transition-colors">
                    Browse
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
                  </label>
                </p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, and other image formats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Photos Section */}
        {showComparison && (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Your Enhanced Photos</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Before Photo */}
                <div className="relative group">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    {beforeImageUrl ? (
                      <img
                        src={beforeImageUrl || "/placeholder.svg"}
                        alt="Before enhancement"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </div>
                </div>

                {/* After Photo */}
                <div className="relative group">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    {afterImageUrl ? (
                      <img
                        src={afterImageUrl || "/placeholder.svg"}
                        alt="After enhancement"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </div>

                  {/* Before/After Toggle */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white rounded-full px-4 py-2 shadow-lg border flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Before</span>
                      <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                        <div className="w-4 h-4 bg-green-500 rounded-full absolute right-0 transition-all"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">After</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 hover:bg-gray-50 transition-colors bg-transparent"
                  onClick={handleApplySettings}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Apply last settings</span>
                  <span className="sm:hidden">Settings</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 hover:bg-gray-50 transition-colors bg-transparent"
                  onClick={handleEditPreferences}
                >
                  <Sliders className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit preferences</span>
                  <span className="sm:hidden">Edit</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 hover:bg-gray-50 transition-colors bg-transparent"
                  onClick={handleViewHistory}
                >
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">View history</span>
                  <span className="sm:hidden">History</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors bg-transparent"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
              </div>

              {/* Download/Share Section */}
              {uploadedFile && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                      Download Enhanced Photo
                    </Button>
                    <Button variant="outline" className="px-8 py-3 bg-transparent">
                      Share to Social Media
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Enhancement</h3>
            <p className="text-gray-600 text-sm">
              Advanced AI algorithms automatically enhance your photos for the best results.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Custom Settings</h3>
            <p className="text-gray-600 text-sm">
              Fine-tune your enhancements with customizable settings and preferences.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quick Processing</h3>
            <p className="text-gray-600 text-sm">
              Get your enhanced photos in seconds with our fast processing engine.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
