"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox
import { ImageIcon, Settings, Sliders, Clock, Trash2, Download, Share2 } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/footer" // Import the new Footer component

export default function PhotoEnhancementApp() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [beforeImageUrl, setBeforeImageUrl] = useState<string>("")
  const [afterImageUrl, setAfterImageUrl] = useState<string>("")

  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false) // Existing multi-slider preferences
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  // Existing preferences for the multi-slider modal
  const [preferences, setPreferences] = useState({
    face: 50,
    body: 50,
    clothes: 50,
    background: 50,
  })

  // New states for individual feature modals
  const [showFacialFeaturesModal, setShowFacialFeaturesModal] = useState(false)
  const [facialFeatures, setFacialFeatures] = useState({
    smiling: false,
    crying: false,
    gloomy: false,
  })

  const [showBodyContourModal, setShowBodyContourModal] = useState(false)
  const [bodyContour, setBodyContour] = useState({
    chest: 50,
    stomach: 50,
    waist: 50,
    legs: 50,
  })

  const [showBackgroundChangeModal, setShowBackgroundChangeModal] = useState(false)
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)
  const backgroundImages = [
    "/backgrounds/bg1.png",
    "/backgrounds/bg2.png",
    "/backgrounds/bg3.png",
    // Add more background images as needed
  ]

  const [showClothChangesModal, setShowClothChangesModal] = useState(false)
  const [selectedCloth, setSelectedCloth] = useState<string | null>(null)
  const clothImages = [
    "/clothes/cloth1.png",
    "/clothes/cloth2.png",
    "/clothes/cloth3.png",
    // Add more clothing images as needed
  ]

  const [showPoseAlgorithmModal, setShowPoseAlgorithmModal] = useState(false)
  const [poseOptions, setPoseOptions] = useState({
    standing: false,
    sitting: false,
    lyingDown: false,
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
    setNotificationMessage("Settings applied successfully!")
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
    setNotificationMessage("Photo deleted successfully!")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleApplyPreferences = () => {
    setShowPreferencesModal(false)
    setNotificationMessage("Preferences saved successfully!")
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
      setNotificationMessage("Download started!")
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } else {
      setNotificationMessage("No enhanced photo to download.")
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const handleSharePhoto = () => {
    setNotificationMessage("Share functionality coming soon!")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  // Handlers for new modals
  const handleFacialFeatureChange = (feature: string, checked: boolean) => {
    setFacialFeatures((prev) => ({
      ...prev,
      [feature]: checked,
    }))
  }

  const handleApplyFacialFeatures = () => {
    setShowFacialFeaturesModal(false)
    setNotificationMessage("Facial features adjusted!")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleBodyContourSliderChange = (part: string, value: number) => {
    setBodyContour((prev) => ({
      ...prev,
      [part]: value,
    }))
  }

  const handleApplyBodyContour = () => {
    setShowBodyContourModal(false)
    setNotificationMessage("Body contour adjusted!")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleBackgroundSelect = (image: string) => {
    setSelectedBackground(image)
  }

  const handleApplyBackgroundChange = () => {
    setShowBackgroundChangeModal(false)
    setNotificationMessage(
      `Background changed to ${selectedBackground ? selectedBackground.split("/").pop() : "default"}!`,
    )
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleClothSelect = (image: string) => {
    setSelectedCloth(image)
  }

  const handleApplyClothChanges = () => {
    setShowClothChangesModal(false)
    setNotificationMessage(`Clothes changed to ${selectedCloth ? selectedCloth.split("/").pop() : "default"}!`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handlePoseOptionChange = (pose: string, checked: boolean) => {
    setPoseOptions((prev) => ({
      ...prev,
      [pose]: checked,
    }))
  }

  const handleApplyPoseAlgorithm = () => {
    setShowPoseAlgorithmModal(false)
    setNotificationMessage("Pose adjusted!")
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-dark dark:text-brand-text-light">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-brand-primary text-brand-text-light px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-text-light rounded-full"></div>
            {notificationMessage}
          </div>
        </div>
      )}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <Image
            src="/logo.png"
            alt="PhotoEnhance Logo"
            width={96}
            height={96}
            className="mx-auto mb-4 animate-scale-in animate-delay-100"
            priority
          />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-text-dark dark:text-brand-text-light leading-tight animate-fade-in animate-delay-200">
            Transform Your Photos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in animate-delay-300">
            Enhance your appearance for social media with ease, powered by advanced AI.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-card hover:border-brand-primary/50 dark:hover:border-brand-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in animate-slide-in-from-bottom animate-delay-400">
          <CardContent className="p-8 md:p-12 bg-black">
            <div
              className={`relative flex flex-col items-center justify-center space-y-6 transition-all duration-300 ease-in-out ${
                dragActive ? "bg-brand-primary/5 dark:bg-brand-primary/10 scale-[1.01] shadow-inner" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-24 h-24 bg-brand-secondary dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                <ImageIcon className="w-10 h-10 text-brand-primary" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-xl md:text-2xl text-brand-text-dark dark:text-brand-text-light font-semibold">
                  Drag and drop a photo or{" "}
                  <label className="font-bold text-brand-primary cursor-pointer hover:underline hover:text-brand-primary/80 transition-colors">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports JPG, PNG, WEBP, and other image formats
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Photos Section */}
        {showComparison && (
          <Card className="bg-white dark:bg-card shadow-lg animate-fade-in animate-slide-in-from-bottom animate-delay-500">
            <CardContent className="p-6 md:p-8 bg-black">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text-dark dark:text-brand-text-light mb-8 text-center">
                Your Enhanced Photos
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Before Photo */}
                <div className="relative group rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {beforeImageUrl ? (
                      <Image
                        src={beforeImageUrl || "/placeholder.svg"}
                        alt="Before enhancement"
                        width={400}
                        height={533}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                    Original
                  </div>
                </div>

                {/* After Photo */}
                <div className="relative group rounded-xl overflow-hidden shadow-xl border border-brand-primary/30 dark:border-brand-primary/50">
                  <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {afterImageUrl ? (
                      <Image
                        src={afterImageUrl || "/placeholder.svg"}
                        alt="After enhancement"
                        width={400}
                        height={533}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                    Enhanced
                  </div>
                </div>
              </div>

              {/* Enhancement Options */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-brand-text-dark dark:text-brand-text-light mb-6 text-center">
                  Select an Enhancement Feature
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Button
                    className="flex flex-col items-center gap-2 h-24 bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowFacialFeaturesModal(true)}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-lg">😊</span>
                    </div>
                    <span className="text-sm font-medium">Facial Features</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-24 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowBodyContourModal(true)}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-lg">💪</span>
                    </div>
                    <span className="text-sm font-medium">Body Contour</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-24 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowBackgroundChangeModal(true)}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🌅</span>
                    </div>
                    <span className="text-sm font-medium">Background Change</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-24 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowClothChangesModal(true)}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-lg">👔</span>
                    </div>
                    <span className="text-sm font-medium">Cloth Changes</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-2 h-24 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowPoseAlgorithmModal(true)}
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🧘</span>
                    </div>
                    <span className="text-sm font-medium">Pose Algorithm</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 bg-black transition-colors border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-brand-text-light"
                  onClick={handleApplySettings}
                >
                  <Settings className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="hidden sm:inline">Apply last settings</span>
                  <span className="sm:hidden">Settings</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 bg-black transition-colors border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-brand-text-light"
                  onClick={handleEditPreferences}
                >
                  <Sliders className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="hidden sm:inline">Edit preferences</span>
                  <span className="sm:hidden">Edit</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 bg-black transition-colors border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-brand-text-light"
                  onClick={handleViewHistory}
                >
                  <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="hidden sm:inline">View history</span>
                  <span className="sm:hidden">History</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 bg-black hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-900 transition-colors rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-brand-text-light"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete Photo</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
              </div>

              {/* Download/Share Section */}
              {uploadedFile && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={handleDownloadEnhancedPhoto}
                    >
                      <Download className="w-5 h-5 mr-2" /> Download Enhanced Photo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 animate-fade-in animate-slide-in-from-bottom animate-delay-600">
          <Card className="text-center p-6 bg-black rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <ImageIcon className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-brand-text-dark dark:text-brand-text-light">AI Enhancement</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Advanced AI algorithms automatically enhance your photos for the best results.
            </p>
          </Card>

          <Card className="text-center p-6 bg-black rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Settings className="w-8 h-8 text-brand-accent" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-brand-text-dark dark:text-brand-text-light">Custom Settings</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Fine-tune your enhancements with customizable settings and preferences.
            </p>
          </Card>

          <Card className="text-center p-6 bg-black rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-purple-600/10 dark:bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-brand-text-dark dark:text-brand-text-light">Quick Processing</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get your enhanced photos in seconds with our fast processing engine.
            </p>
          </Card>
        </div>
      </main>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>
                  Enhance Photo History
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoHistory.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Enhanced photo ${index + 1}`}
                        width={150}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

      {/* Preferences Modal (Existing multi-slider) */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-md w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>
                  Training AI Photo Enhance Model
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferencesModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Face Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300" style={{ color: 'black' }}>Face</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.face}
                      onChange={(e) => handlePreferenceChange("face", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-brand-primary"
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">{preferences.face}</span>
                </div>

                {/* Body Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300" style={{ color: 'black' }}>Body</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.body}
                      onChange={(e) => handlePreferenceChange("body", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-brand-primary"
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">{preferences.body}</span>
                </div>

                {/* Clothes Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300" style={{ color: 'black' }}>Clothes</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.clothes}
                      onChange={(e) => handlePreferenceChange("clothes", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-brand-primary"
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {preferences.clothes}
                  </span>
                </div>

                {/* Background Slider */}
                <div className="flex items-center gap-4">
                  <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300" style={{ color: 'black' }}>Background</label>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.background}
                      onChange={(e) => handlePreferenceChange("background", Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-brand-primary"
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {preferences.background}
                  </span>
                </div>

                {/* Apply Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyPreferences}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Facial Features Adjustment Modal */}
      {showFacialFeaturesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-md w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>
                  Adjust Facial Features
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFacialFeaturesModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smiling-face"
                    checked={facialFeatures.smiling}
                    onCheckedChange={(checked) => handleFacialFeatureChange("smiling", !!checked)}
                  />
                  <label
                    htmlFor="smiling-face"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Smiling face
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="crying-face"
                    checked={facialFeatures.crying}
                    onCheckedChange={(checked) => handleFacialFeatureChange("crying", !!checked)}
                  />
                  <label
                    htmlFor="crying-face"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Crying face
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gloomy-face"
                    checked={facialFeatures.gloomy}
                    onCheckedChange={(checked) => handleFacialFeatureChange("gloomy", !!checked)}
                  />
                  <label
                    htmlFor="gloomy-face"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Gloomy face
                  </label>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyFacialFeatures}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Body Contour Modal */}
      {showBodyContourModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-md w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>Body Contour</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBodyContourModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-6">
                {Object.entries(bodyContour).map(([part, value]) => (
                  <div key={part} className="flex items-center gap-4">
                    <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize" style={{ color: 'black' }}>
                      {part}
                    </label>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleBodyContourSliderChange(part, Number.parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-brand-primary"
                      />
                    </div>
                    <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">{value}</span>
                  </div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyBodyContour}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Change Modal */}
      {showBackgroundChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-2xl w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>Background Change</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBackgroundChangeModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                  {backgroundImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ${
                        selectedBackground === image ? "border-2 border-brand-primary ring-2 ring-brand-primary" : ""
                      }`}
                      onClick={() => handleBackgroundSelect(image)}
                    >
                      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Background ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      {selectedBackground === image && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyBackgroundChange}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cloth Changes Modal */}
      {showClothChangesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-2xl w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>Cloth Changes</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowClothChangesModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                  {clothImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ${
                        selectedCloth === image ? "border-2 border-brand-primary ring-2 ring-brand-primary" : ""
                      }`}
                      onClick={() => handleClothSelect(image)}
                    >
                      <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Cloth ${index + 1}`}
                          width={150}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      {selectedCloth === image && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyClothChanges}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pose Algorithm Modal */}
      {showPoseAlgorithmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
          <div className="bg-white dark:bg-card rounded-xl max-w-md w-full animate-scale-in animate-fade-in shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-brand-text-dark dark:text-brand-text-light" style={{ color: 'black' }}>Pose Algorithm</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPoseAlgorithmModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pose-standing"
                    checked={poseOptions.standing}
                    onCheckedChange={(checked) => handlePoseOptionChange("standing", !!checked)}
                  />
                  <label
                    htmlFor="pose-standing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Standing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pose-sitting"
                    checked={poseOptions.sitting}
                    onCheckedChange={(checked) => handlePoseOptionChange("sitting", !!checked)}
                  />
                  <label
                    htmlFor="pose-sitting"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Sitting
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pose-lying-down"
                    checked={poseOptions.lyingDown}
                    onCheckedChange={(checked) => handlePoseOptionChange("lyingDown", !!checked)}
                  />
                  <label
                    htmlFor="pose-lying-down"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: 'black' }}
                  >
                    Lying down
                  </label>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleApplyPoseAlgorithm}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-light px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
