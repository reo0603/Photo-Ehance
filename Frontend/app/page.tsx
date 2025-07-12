"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Settings, Sliders, Clock, Trash2 } from "lucide-react"
import Image from "next/image"

export default function PhotoEnhancementApp() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("")
  const [afterImageUrl, setAfterImageUrl] = useState<string>("")

  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [preferences, setPreferences] = useState({
    face: 50,
    body: 50,
    clothes: 50,
    background: 50,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock history data
  const [photoHistory] = useState([
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
    "/placeholder.svg?height=200&width=150",
  ])

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
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        processFile(file)
      }
    }
    // Reset the input value so the same file can be selected again
    e.target.value = ""
  }

  const processFile = (file: File) => {
    setUploadedFile(file)
    const url = URL.createObjectURL(file)
    setBeforeImageUrl(url)
    // Simulate enhanced version (in real app, this would be processed)
    setAfterImageUrl(url) // In a real app, this would be the URL of the processed image
    setShowComparison(true)
  }

  const handleApplySettings = () => {
    setNotificationMessage("Set successfully")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleEditPreferences = () => {
    setShowPreferencesModal(true)
  }

  const handleViewHistory = () => {
    setShowHistoryModal(true)
  }

  const handleDelete = () => {
    if (beforeImageUrl) {
      URL.revokeObjectURL(beforeImageUrl)
    }
    if (afterImageUrl && afterImageUrl !== beforeImageUrl) {
      URL.revokeObjectURL(afterImageUrl)
    }
    setUploadedFile(null)
    setBeforeImageUrl("")
    setAfterImageUrl("")
    setShowComparison(false)
    console.log("Photo deleted")
  }

  const handleApplyPreferences = () => {
    setShowPreferencesModal(false)
    setNotificationMessage("Set successfully")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handlePreferenceChange = (type: string, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleDownloadEnhancedPhoto = () => {
    if (afterImageUrl) {
      const link = document.createElement("a")
      link.href = afterImageUrl
      link.download = `enhanced-photo-${Date.now()}.png` // Suggest a filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("Downloading enhanced photo...")
    } else {
      console.log("No enhanced photo to download.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            {notificationMessage}
          </div>
        </div>
      )}
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
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
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
                      <Image
                        src={beforeImageUrl || "/placeholder.svg"}
                        alt="Before enhancement"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        unoptimized
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
                      <Image
                        src={afterImageUrl || "/placeholder.svg"}
                        alt="After enhancement"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        unoptimized
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
                </div>
              </div>

              {/* Enhancement Options */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Choose Enhancement Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  <Button
                    className="flex flex-col items-center gap-2 h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0"
                    onClick={() => {
                      setNotificationMessage("Enhance Successfully")
                      setShowNotification(true)
                      setTimeout(() => setShowNotification(false), 3000)
                    }}
                  >
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-xs">😊</span>
                    </div>
                    <span className="text-sm font-medium">Enhance Face</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
                    onClick={() => {
                      setNotificationMessage("Enhance Successfully")
                      setShowNotification(true)
                      setTimeout(() => setShowNotification(false), 3000)
                    }}
                  >
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-xs">💪</span>
                    </div>
                    <span className="text-sm font-medium">Enhance Body</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
                    onClick={() => {
                      setNotificationMessage("Enhance Successfully")
                      setShowNotification(true)
                      setTimeout(() => setShowNotification(false), 3000)
                    }}
                  >
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-xs">👔</span>
                    </div>
                    <span className="text-sm font-medium">Enhance Clothes</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
                    onClick={() => {
                      setNotificationMessage("Enhance Successfully")
                      setShowNotification(true)
                      setTimeout(() => setShowNotification(false), 3000)
                    }}
                  >
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-xs">🌅</span>
                    </div>
                    <span className="text-sm font-medium">Enhance Background</span>
                  </Button>
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
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                      onClick={handleDownloadEnhancedPhoto}
                    >
                      Download Enhanced Photo
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
      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Enhance Photo History</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {photoHistory.map((photo, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Enhanced photo ${index + 1}`}
                        width={150}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Training AI Photo Enhance Model</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreferencesModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Face Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-20 text-sm font-medium text-gray-700">Face</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.face}
                      onChange={(e) => handlePreferenceChange("face", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600">{preferences.face}</span>
                </div>

                {/* Body Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-20 text-sm font-medium text-gray-700">Body</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.body}
                      onChange={(e) => handlePreferenceChange("body", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600">{preferences.body}</span>
                </div>

                {/* Clothes Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-20 text-sm font-medium text-gray-700">Clothes</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.clothes}
                      onChange={(e) => handlePreferenceChange("clothes", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600">{preferences.clothes}</span>
                </div>

                {/* Background Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-20 text-sm font-medium text-gray-700">Background</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.background}
                      onChange={(e) => handlePreferenceChange("background", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600">{preferences.background}</span>
                </div>

                {/* Apply Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyPreferences}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
;<style jsx>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`}</style>
