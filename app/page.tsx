"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, BookOpen, Video, Newspaper, Code, MessageCircle, Palette } from "lucide-react"

type Framework = {
  name: string
  category: string
  description: string
  docsUrl: string
  wwdcUrl: string
  newsUrl: string
}

const frameworks = [
  // Core System Frameworks
  {
    name: "Foundation",
    category: "Core",
    description: "Essential classes and data types for Cocoa applications",
    docsUrl: "https://developer.apple.com/documentation/foundation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10176/",
    newsUrl: "https://developer.apple.com/news/?id=foundation",
  },
  {
    name: "CoreFoundation",
    category: "Core",
    description: "Low-level C API providing basic data types and services",
    docsUrl: "https://developer.apple.com/documentation/corefoundation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2022/10171/",
    newsUrl: "https://developer.apple.com/news/?id=corefoundation",
  },
  {
    name: "CoreServices",
    category: "Core",
    description: "System-level services and utilities for applications",
    docsUrl: "https://developer.apple.com/documentation/coreservices",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10175/",
    newsUrl: "https://developer.apple.com/news/?id=coreservices",
  },
  {
    name: "CoreData",
    category: "Core",
    description: "Object graph and persistence framework for data management",
    docsUrl: "https://developer.apple.com/documentation/coredata",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10196/",
    newsUrl: "https://developer.apple.com/news/?id=coredata",
  },
  {
    name: "CoreLocation",
    category: "Core",
    description: "Location and heading services for geographic positioning",
    docsUrl: "https://developer.apple.com/documentation/corelocation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10180/",
    newsUrl: "https://developer.apple.com/news/?id=corelocation",
  },
  {
    name: "Combine",
    category: "Core",
    description: "Reactive programming framework for handling asynchronous events",
    docsUrl: "https://developer.apple.com/documentation/combine",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2019/722/",
    newsUrl: "https://developer.apple.com/news/?id=combine",
  },

  // UI Frameworks
  {
    name: "UIKit",
    category: "UI",
    description: "User interface framework for iOS applications",
    docsUrl: "https://developer.apple.com/documentation/uikit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit",
  },
  {
    name: "SwiftUI",
    category: "UI",
    description: "Declarative user interface framework for all Apple platforms",
    docsUrl: "https://developer.apple.com/documentation/swiftui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui",
  },
  {
    name: "WidgetKit",
    category: "UI",
    description: "Framework for creating home screen and Today view widgets",
    docsUrl: "https://developer.apple.com/documentation/widgetkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10028/",
    newsUrl: "https://developer.apple.com/news/?id=widgetkit",
  },
  {
    name: "AppIntents",
    category: "UI",
    description: "Framework for exposing app functionality to the system",
    docsUrl: "https://developer.apple.com/documentation/appintents",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10032/",
    newsUrl: "https://developer.apple.com/news/?id=appintents",
  },

  // Graphics & Animation
  {
    name: "CoreGraphics",
    category: "Graphics",
    description: "2D drawing and rendering framework",
    docsUrl: "https://developer.apple.com/documentation/coregraphics",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10155/",
    newsUrl: "https://developer.apple.com/news/?id=coregraphics",
  },
  {
    name: "Metal",
    category: "Graphics",
    description: "Low-level graphics and compute framework",
    docsUrl: "https://developer.apple.com/documentation/metal",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=metal",
  },
  {
    name: "MetalKit",
    category: "Graphics",
    description: "Utility framework for Metal rendering",
    docsUrl: "https://developer.apple.com/documentation/metalkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10163/",
    newsUrl: "https://developer.apple.com/news/?id=metalkit",
  },
  {
    name: "SceneKit",
    category: "Graphics",
    description: "3D scene graph framework for rendering and animation",
    docsUrl: "https://developer.apple.com/documentation/scenekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=scenekit",
  },
  {
    name: "RealityKit",
    category: "Graphics",
    description: "AR and 3D rendering framework for spatial computing",
    docsUrl: "https://developer.apple.com/documentation/realitykit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10080/",
    newsUrl: "https://developer.apple.com/news/?id=realitykit",
  },
  {
    name: "SpriteKit",
    category: "Graphics",
    description: "2D game development framework",
    docsUrl: "https://developer.apple.com/documentation/spritekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10164/",
    newsUrl: "https://developer.apple.com/news/?id=spritekit",
  },
  {
    name: "CoreAnimation",
    category: "Graphics",
    description: "Animation framework for smooth visual transitions",
    docsUrl: "https://developer.apple.com/documentation/quartzcore",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10156/",
    newsUrl: "https://developer.apple.com/news/?id=coreanimation",
  },
  {
    name: "CoreImage",
    category: "Graphics",
    description: "Image processing and analysis framework",
    docsUrl: "https://developer.apple.com/documentation/coreimage",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10157/",
    newsUrl: "https://developer.apple.com/news/?id=coreimage",
  },
  {
    name: "ImageIO",
    category: "Graphics",
    description: "Framework for reading and writing image data",
    docsUrl: "https://developer.apple.com/documentation/imageio",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10158/",
    newsUrl: "https://developer.apple.com/news/?id=imageio",
  },

  // Media & Audio
  {
    name: "AVFoundation",
    category: "Media",
    description: "Audio and video media framework for playback and recording",
    docsUrl: "https://developer.apple.com/documentation/avfoundation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10113/",
    newsUrl: "https://developer.apple.com/news/?id=avfoundation",
  },
  {
    name: "CoreAudio",
    category: "Media",
    description: "Low-level audio services and hardware abstraction",
    docsUrl: "https://developer.apple.com/documentation/coreaudio",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10115/",
    newsUrl: "https://developer.apple.com/news/?id=coreaudio",
  },
  {
    name: "AudioToolbox",
    category: "Media",
    description: "Audio processing and playback services",
    docsUrl: "https://developer.apple.com/documentation/audiotoolbox",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10116/",
    newsUrl: "https://developer.apple.com/news/?id=audiotoolbox",
  },
  {
    name: "MediaPlayer",
    category: "Media",
    description: "Framework for media playback and library access",
    docsUrl: "https://developer.apple.com/documentation/mediaplayer",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10117/",
    newsUrl: "https://developer.apple.com/news/?id=mediaplayer",
  },
  {
    name: "CoreMedia",
    category: "Media",
    description: "Low-level media processing framework",
    docsUrl: "https://developer.apple.com/documentation/coremedia",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10118/",
    newsUrl: "https://developer.apple.com/news/?id=coremedia",
  },
  {
    name: "VideoToolbox",
    category: "Media",
    description: "Hardware-accelerated video encoding and decoding",
    docsUrl: "https://developer.apple.com/documentation/videotoolbox",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10119/",
    newsUrl: "https://developer.apple.com/news/?id=videotoolbox",
  },
  {
    name: "PhotosUI",
    category: "Media",
    description: "User interface for Photos framework integration",
    docsUrl: "https://developer.apple.com/documentation/photosui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10120/",
    newsUrl: "https://developer.apple.com/news/?id=photosui",
  },
  {
    name: "Photos",
    category: "Media",
    description: "Framework for accessing and modifying photo library",
    docsUrl: "https://developer.apple.com/documentation/photos",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10121/",
    newsUrl: "https://developer.apple.com/news/?id=photos",
  },

  // Machine Learning & AI
  {
    name: "CoreML",
    category: "ML",
    description: "Machine learning model integration framework",
    docsUrl: "https://developer.apple.com/documentation/coreml",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10049/",
    newsUrl: "https://developer.apple.com/news/?id=coreml",
  },
  {
    name: "Vision",
    category: "ML",
    description: "Computer vision framework for image analysis",
    docsUrl: "https://developer.apple.com/documentation/vision",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10048/",
    newsUrl: "https://developer.apple.com/news/?id=vision",
  },
  {
    name: "NaturalLanguage",
    category: "ML",
    description: "Natural language processing framework",
    docsUrl: "https://developer.apple.com/documentation/naturallanguage",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10050/",
    newsUrl: "https://developer.apple.com/news/?id=naturallanguage",
  },
  {
    name: "Speech",
    category: "ML",
    description: "Speech recognition and synthesis framework",
    docsUrl: "https://developer.apple.com/documentation/speech",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10051/",
    newsUrl: "https://developer.apple.com/news/?id=speech",
  },
  {
    name: "SoundAnalysis",
    category: "ML",
    description: "Framework for analyzing audio content",
    docsUrl: "https://developer.apple.com/documentation/soundanalysis",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10052/",
    newsUrl: "https://developer.apple.com/news/?id=soundanalysis",
  },

  // AR & Spatial Computing
  {
    name: "ARKit",
    category: "AR",
    description: "Augmented reality framework for spatial experiences",
    docsUrl: "https://developer.apple.com/documentation/arkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10082/",
    newsUrl: "https://developer.apple.com/news/?id=arkit",
  },
  {
    name: "RoomPlan",
    category: "AR",
    description: "Framework for creating 3D room scans",
    docsUrl: "https://developer.apple.com/documentation/roomplan",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10083/",
    newsUrl: "https://developer.apple.com/news/?id=roomplan",
  },

  // Health & Fitness
  {
    name: "HealthKit",
    category: "Health",
    description: "Framework for health and fitness data management",
    docsUrl: "https://developer.apple.com/documentation/healthkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10203/",
    newsUrl: "https://developer.apple.com/news/?id=healthkit",
  },
  {
    name: "HealthKitUI",
    category: "Health",
    description: "User interface components for HealthKit integration",
    docsUrl: "https://developer.apple.com/documentation/healthkitui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10204/",
    newsUrl: "https://developer.apple.com/news/?id=healthkitui",
  },
  {
    name: "WorkoutKit",
    category: "Health",
    description: "Framework for workout and fitness tracking",
    docsUrl: "https://developer.apple.com/documentation/workoutkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10205/",
    newsUrl: "https://developer.apple.com/news/?id=workoutkit",
  },

  // Game Development
  {
    name: "GameKit",
    category: "Games",
    description: "Game Center integration and multiplayer services",
    docsUrl: "https://developer.apple.com/documentation/gamekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10185/",
    newsUrl: "https://developer.apple.com/news/?id=gamekit",
  },
  {
    name: "GameController",
    category: "Games",
    description: "Framework for game controller support",
    docsUrl: "https://developer.apple.com/documentation/gamecontroller",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10186/",
    newsUrl: "https://developer.apple.com/news/?id=gamecontroller",
  },
  {
    name: "GameplayKit",
    category: "Games",
    description: "Gameplay mechanics and AI framework",
    docsUrl: "https://developer.apple.com/documentation/gameplaykit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10187/",
    newsUrl: "https://developer.apple.com/news/?id=gameplaykit",
  },
  {
    name: "ReplayKit",
    category: "Games",
    description: "Framework for recording and sharing gameplay",
    docsUrl: "https://developer.apple.com/documentation/replaykit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10188/",
    newsUrl: "https://developer.apple.com/news/?id=replaykit",
  },

  // Communication & Messaging
  {
    name: "CallKit",
    category: "Communication",
    description: "VoIP call integration with system UI",
    docsUrl: "https://developer.apple.com/documentation/callkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10190/",
    newsUrl: "https://developer.apple.com/news/?id=callkit",
  },
  {
    name: "Messages",
    category: "Communication",
    description: "Framework for Messages app integration",
    docsUrl: "https://developer.apple.com/documentation/messages",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10191/",
    newsUrl: "https://developer.apple.com/news/?id=messages",
  },
  {
    name: "MessageUI",
    category: "Communication",
    description: "User interface for composing messages and emails",
    docsUrl: "https://developer.apple.com/documentation/messageui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10192/",
    newsUrl: "https://developer.apple.com/news/?id=messageui",
  },
  {
    name: "Social",
    category: "Communication",
    description: "Framework for social media integration",
    docsUrl: "https://developer.apple.com/documentation/social",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10193/",
    newsUrl: "https://developer.apple.com/news/?id=social",
  },

  // Networking
  {
    name: "Network",
    category: "Network",
    description: "Modern networking framework for connections",
    docsUrl: "https://developer.apple.com/documentation/network",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10130/",
    newsUrl: "https://developer.apple.com/news/?id=network",
  },
  {
    name: "CFNetwork",
    category: "Network",
    description: "Low-level networking framework",
    docsUrl: "https://developer.apple.com/documentation/cfnetwork",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10131/",
    newsUrl: "https://developer.apple.com/news/?id=cfnetwork",
  },
  {
    name: "NetworkExtension",
    category: "Network",
    description: "Framework for network extensions and VPN",
    docsUrl: "https://developer.apple.com/documentation/networkextension",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10132/",
    newsUrl: "https://developer.apple.com/news/?id=networkextension",
  },
  {
    name: "MultipeerConnectivity",
    category: "Network",
    description: "Peer-to-peer networking framework",
    docsUrl: "https://developer.apple.com/documentation/multipeerconnectivity",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10133/",
    newsUrl: "https://developer.apple.com/news/?id=multipeerconnectivity",
  },
  {
    name: "NearbyInteraction",
    category: "Network",
    description: "Framework for precise distance and direction finding",
    docsUrl: "https://developer.apple.com/documentation/nearbyinteraction",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10134/",
    newsUrl: "https://developer.apple.com/news/?id=nearbyinteraction",
  },

  // Security & Privacy
  {
    name: "CryptoKit",
    category: "Security",
    description: "Cryptographic operations framework",
    docsUrl: "https://developer.apple.com/documentation/cryptokit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10210/",
    newsUrl: "https://developer.apple.com/news/?id=cryptokit",
  },
  {
    name: "LocalAuthentication",
    category: "Security",
    description: "Biometric and passcode authentication framework",
    docsUrl: "https://developer.apple.com/documentation/localauthentication",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10211/",
    newsUrl: "https://developer.apple.com/news/?id=localauthentication",
  },
  {
    name: "AuthenticationServices",
    category: "Security",
    description: "Web authentication and Sign in with Apple",
    docsUrl: "https://developer.apple.com/documentation/authenticationservices",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10212/",
    newsUrl: "https://developer.apple.com/news/?id=authenticationservices",
  },
  {
    name: "Security",
    category: "Security",
    description: "Security services and keychain access",
    docsUrl: "https://developer.apple.com/documentation/security",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10213/",
    newsUrl: "https://developer.apple.com/news/?id=security",
  },

  // Data & Storage
  {
    name: "CloudKit",
    category: "Data",
    description: "iCloud database and sync framework",
    docsUrl: "https://developer.apple.com/documentation/cloudkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10220/",
    newsUrl: "https://developer.apple.com/news/?id=cloudkit",
  },
  {
    name: "FileProvider",
    category: "Data",
    description: "Framework for file provider extensions",
    docsUrl: "https://developer.apple.com/documentation/fileprovider",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10221/",
    newsUrl: "https://developer.apple.com/news/?id=fileprovider",
  },
  {
    name: "UniformTypeIdentifiers",
    category: "Data",
    description: "Framework for uniform type identifiers",
    docsUrl: "https://developer.apple.com/documentation/uniformtypeidentifiers",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10222/",
    newsUrl: "https://developer.apple.com/news/?id=uniformtypeidentifiers",
  },

  // System Integration
  {
    name: "UserNotifications",
    category: "System",
    description: "Local and remote notification framework",
    docsUrl: "https://developer.apple.com/documentation/usernotifications",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10170/",
    newsUrl: "https://developer.apple.com/news/?id=usernotifications",
  },
  {
    name: "BackgroundTasks",
    category: "System",
    description: "Framework for background app refresh",
    docsUrl: "https://developer.apple.com/documentation/backgroundtasks",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10171/",
    newsUrl: "https://developer.apple.com/news/?id=backgroundtasks",
  },
  {
    name: "EventKit",
    category: "System",
    description: "Calendar and reminder data access",
    docsUrl: "https://developer.apple.com/documentation/eventkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10172/",
    newsUrl: "https://developer.apple.com/news/?id=eventkit",
  },
  {
    name: "EventKitUI",
    category: "System",
    description: "User interface for EventKit integration",
    docsUrl: "https://developer.apple.com/documentation/eventkitui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10173/",
    newsUrl: "https://developer.apple.com/news/?id=eventkitui",
  },
  {
    name: "Contacts",
    category: "System",
    description: "Framework for accessing contact information",
    docsUrl: "https://developer.apple.com/documentation/contacts",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10174/",
    newsUrl: "https://developer.apple.com/news/?id=contacts",
  },
  {
    name: "ContactsUI",
    category: "System",
    description: "User interface for Contacts framework",
    docsUrl: "https://developer.apple.com/documentation/contactsui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10175/",
    newsUrl: "https://developer.apple.com/news/?id=contactsui",
  },

  // App Services
  {
    name: "StoreKit",
    category: "App Services",
    description: "In-app purchases and App Store integration",
    docsUrl: "https://developer.apple.com/documentation/storekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10140/",
    newsUrl: "https://developer.apple.com/news/?id=storekit",
  },
  {
    name: "AppTrackingTransparency",
    category: "App Services",
    description: "Framework for app tracking permission",
    docsUrl: "https://developer.apple.com/documentation/apptrackingtransparency",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10141/",
    newsUrl: "https://developer.apple.com/news/?id=apptrackingtransparency",
  },
  {
    name: "AdSupport",
    category: "App Services",
    description: "Advertising identifier framework",
    docsUrl: "https://developer.apple.com/documentation/adsupport",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10142/",
    newsUrl: "https://developer.apple.com/news/?id=adsupport",
  },
  {
    name: "iAd",
    category: "App Services",
    description: "Apple's advertising framework (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/iad",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10143/",
    newsUrl: "https://developer.apple.com/news/?id=iad",
  },

  // Accessibility
  {
    name: "Accessibility",
    category: "Accessibility",
    description: "Framework for accessibility features",
    docsUrl: "https://developer.apple.com/documentation/accessibility",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10230/",
    newsUrl: "https://developer.apple.com/news/?id=accessibility",
  },

  // Developer Tools
  {
    name: "OSLog",
    category: "Developer",
    description: "Unified logging system framework",
    docsUrl: "https://developer.apple.com/documentation/oslog",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10240/",
    newsUrl: "https://developer.apple.com/news/?id=oslog",
  },
  {
    name: "MetricKit",
    category: "Developer",
    description: "Framework for app performance metrics",
    docsUrl: "https://developer.apple.com/documentation/metrickit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10241/",
    newsUrl: "https://developer.apple.com/news/?id=metrickit",
  },
  {
    name: "XCTest",
    category: "Developer",
    description: "Testing framework for iOS applications",
    docsUrl: "https://developer.apple.com/documentation/xctest",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10242/",
    newsUrl: "https://developer.apple.com/news/?id=xctest",
  },

  // Specialized Frameworks
  {
    name: "MapKit",
    category: "Specialized",
    description: "Map display and interaction framework",
    docsUrl: "https://developer.apple.com/documentation/mapkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10043/",
    newsUrl: "https://developer.apple.com/news/?id=mapkit",
  },
  {
    name: "HomeKit",
    category: "Specialized",
    description: "Home automation framework",
    docsUrl: "https://developer.apple.com/documentation/homekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10195/",
    newsUrl: "https://developer.apple.com/news/?id=homekit",
  },
  {
    name: "CarPlay",
    category: "Specialized",
    description: "Framework for CarPlay integration",
    docsUrl: "https://developer.apple.com/documentation/carplay",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10250/",
    newsUrl: "https://developer.apple.com/news/?id=carplay",
  },
  {
    name: "WatchConnectivity",
    category: "Specialized",
    description: "Communication between iOS and watchOS apps",
    docsUrl: "https://developer.apple.com/documentation/watchconnectivity",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10251/",
    newsUrl: "https://developer.apple.com/news/?id=watchconnectivity",
  },
  {
    name: "WatchKit",
    category: "Specialized",
    description: "Framework for Apple Watch applications",
    docsUrl: "https://developer.apple.com/documentation/watchkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10252/",
    newsUrl: "https://developer.apple.com/news/?id=watchkit",
  },
  {
    name: "WebKit",
    category: "Specialized",
    description: "Web content rendering framework",
    docsUrl: "https://developer.apple.com/documentation/webkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10253/",
    newsUrl: "https://developer.apple.com/news/?id=webkit",
  },
  {
    name: "SafariServices",
    category: "Specialized",
    description: "Safari integration and web services",
    docsUrl: "https://developer.apple.com/documentation/safariservices",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10254/",
    newsUrl: "https://developer.apple.com/news/?id=safariservices",
  },
  {
    name: "QuickLook",
    category: "Specialized",
    description: "Framework for previewing documents",
    docsUrl: "https://developer.apple.com/documentation/quicklook",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10255/",
    newsUrl: "https://developer.apple.com/news/?id=quicklook",
  },
  {
    name: "QuickLookThumbnailing",
    category: "Specialized",
    description: "Framework for generating document thumbnails",
    docsUrl: "https://developer.apple.com/documentation/quicklookthumbnailing",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10256/",
    newsUrl: "https://developer.apple.com/news/?id=quicklookthumbnailing",
  },
  {
    name: "MusicKit",
    category: "Specialized",
    description: "Apple Music integration framework",
    docsUrl: "https://developer.apple.com/documentation/musickit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10257/",
    newsUrl: "https://developer.apple.com/news/?id=musickit",
  },
  {
    name: "SiriKit",
    category: "Specialized",
    description: "Siri integration framework",
    docsUrl: "https://developer.apple.com/documentation/sirikit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10258/",
    newsUrl: "https://developer.apple.com/news/?id=sirikit",
  },
  {
    name: "Intents",
    category: "Specialized",
    description: "Framework for app shortcuts and intents",
    docsUrl: "https://developer.apple.com/documentation/intents",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10259/",
    newsUrl: "https://developer.apple.com/news/?id=intents",
  },
  {
    name: "IntentsUI",
    category: "Specialized",
    description: "User interface for Intents framework",
    docsUrl: "https://developer.apple.com/documentation/intentsui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10260/",
    newsUrl: "https://developer.apple.com/news/?id=intentsui",
  },
  {
    name: "PencilKit",
    category: "Specialized",
    description: "Apple Pencil drawing and annotation framework",
    docsUrl: "https://developer.apple.com/documentation/pencilkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10261/",
    newsUrl: "https://developer.apple.com/news/?id=pencilkit",
  },
  {
    name: "PDFKit",
    category: "Specialized",
    description: "PDF display and manipulation framework",
    docsUrl: "https://developer.apple.com/documentation/pdfkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10262/",
    newsUrl: "https://developer.apple.com/news/?id=pdfkit",
  },
  {
    name: "PassKit",
    category: "Specialized",
    description: "Apple Pay and Wallet integration",
    docsUrl: "https://developer.apple.com/documentation/passkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10263/",
    newsUrl: "https://developer.apple.com/news/?id=passkit",
  },
  {
    name: "PushKit",
    category: "Specialized",
    description: "VoIP and complication push notifications",
    docsUrl: "https://developer.apple.com/documentation/pushkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10264/",
    newsUrl: "https://developer.apple.com/news/?id=pushkit",
  },
  {
    name: "ExternalAccessory",
    category: "Specialized",
    description: "Framework for external accessory communication",
    docsUrl: "https://developer.apple.com/documentation/externalaccessory",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10265/",
    newsUrl: "https://developer.apple.com/news/?id=externalaccessory",
  },
  {
    name: "CoreBluetooth",
    category: "Specialized",
    description: "Bluetooth Low Energy framework",
    docsUrl: "https://developer.apple.com/documentation/corebluetooth",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10266/",
    newsUrl: "https://developer.apple.com/news/?id=corebluetooth",
  },
  {
    name: "CoreNFC",
    category: "Specialized",
    description: "Near Field Communication framework",
    docsUrl: "https://developer.apple.com/documentation/corenfc",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10267/",
    newsUrl: "https://developer.apple.com/news/?id=corenfc",
  },
  {
    name: "CoreTelephony",
    category: "Specialized",
    description: "Cellular network information framework",
    docsUrl: "https://developer.apple.com/documentation/coretelephony",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10268/",
    newsUrl: "https://developer.apple.com/news/?id=coretelephony",
  },
  {
    name: "CoreMotion",
    category: "Specialized",
    description: "Motion and environment sensing framework",
    docsUrl: "https://developer.apple.com/documentation/coremotion",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10269/",
    newsUrl: "https://developer.apple.com/news/?id=coremotion",
  },
  {
    name: "DeviceActivity",
    category: "Specialized",
    description: "Screen Time and device usage monitoring",
    docsUrl: "https://developer.apple.com/documentation/deviceactivity",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10270/",
    newsUrl: "https://developer.apple.com/news/?id=deviceactivity",
  },
  {
    name: "FamilyControls",
    category: "Specialized",
    description: "Parental controls and Screen Time API",
    docsUrl: "https://developer.apple.com/documentation/familycontrols",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10271/",
    newsUrl: "https://developer.apple.com/news/?id=familycontrols",
  },
  {
    name: "ManagedSettings",
    category: "Specialized",
    description: "Device management and restrictions framework",
    docsUrl: "https://developer.apple.com/documentation/managedsettings",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10272/",
    newsUrl: "https://developer.apple.com/news/?id=managedsettings",
  },
  {
    name: "ShazamKit",
    category: "Specialized",
    description: "Audio recognition framework",
    docsUrl: "https://developer.apple.com/documentation/shazamkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10273/",
    newsUrl: "https://developer.apple.com/news/?id=shazamkit",
  },
  {
    name: "WeatherKit",
    category: "Specialized",
    description: "Weather data and forecasting framework",
    docsUrl: "https://developer.apple.com/documentation/weatherkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10274/",
    newsUrl: "https://developer.apple.com/news/?id=weatherkit",
  },
  {
    name: "ThreadNetwork",
    category: "Specialized",
    description: "Thread network protocol framework",
    docsUrl: "https://developer.apple.com/documentation/threadnetwork",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10275/",
    newsUrl: "https://developer.apple.com/news/?id=threadnetwork",
  },
  {
    name: "Matter",
    category: "Specialized",
    description: "Matter smart home standard framework",
    docsUrl: "https://developer.apple.com/documentation/matter",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10276/",
    newsUrl: "https://developer.apple.com/news/?id=matter",
  },
  {
    name: "GroupActivities",
    category: "Specialized",
    description: "SharePlay and group activities framework",
    docsUrl: "https://developer.apple.com/documentation/groupactivities",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10277/",
    newsUrl: "https://developer.apple.com/news/?id=groupactivities",
  },
  {
    name: "SharedWithYou",
    category: "Specialized",
    description: "Shared content from Messages integration",
    docsUrl: "https://developer.apple.com/documentation/sharedwithyou",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10278/",
    newsUrl: "https://developer.apple.com/news/?id=sharedwithyou",
  },
  {
    name: "SharedWithYouCore",
    category: "Specialized",
    description: "Core framework for SharedWithYou functionality",
    docsUrl: "https://developer.apple.com/documentation/sharedwithyoucore",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10279/",
    newsUrl: "https://developer.apple.com/news/?id=sharedwithyoucore",
  },
  {
    name: "ScreenTime",
    category: "Specialized",
    description: "Screen Time API for app usage monitoring",
    docsUrl: "https://developer.apple.com/documentation/screentime",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10280/",
    newsUrl: "https://developer.apple.com/news/?id=screentime",
  },
  {
    name: "SensitiveContentAnalysis",
    category: "Specialized",
    description: "Framework for analyzing sensitive content",
    docsUrl: "https://developer.apple.com/documentation/sensitivecontentanalysis",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10281/",
    newsUrl: "https://developer.apple.com/news/?id=sensitivecontentanalysis",
  },
  {
    name: "SensorKit",
    category: "Specialized",
    description: "Framework for accessing device sensor data",
    docsUrl: "https://developer.apple.com/documentation/sensorkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10282/",
    newsUrl: "https://developer.apple.com/news/?id=sensorkit",
  },
  {
    name: "ClassKit",
    category: "Specialized",
    description: "Framework for educational app integration",
    docsUrl: "https://developer.apple.com/documentation/classkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10283/",
    newsUrl: "https://developer.apple.com/news/?id=classkit",
  },
  {
    name: "BusinessChat",
    category: "Specialized",
    description: "Framework for Business Chat integration",
    docsUrl: "https://developer.apple.com/documentation/businesschat",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10284/",
    newsUrl: "https://developer.apple.com/news/?id=businesschat",
  },
  {
    name: "FinanceKit",
    category: "Specialized",
    description: "Framework for financial data integration",
    docsUrl: "https://developer.apple.com/documentation/financekit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10285/",
    newsUrl: "https://developer.apple.com/news/?id=financekit",
  },
  {
    name: "FinanceKitUI",
    category: "Specialized",
    description: "User interface for FinanceKit integration",
    docsUrl: "https://developer.apple.com/documentation/financekitui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10286/",
    newsUrl: "https://developer.apple.com/news/?id=financekitui",
  },
  {
    name: "TipKit",
    category: "Specialized",
    description: "Framework for in-app tips and onboarding",
    docsUrl: "https://developer.apple.com/documentation/tipkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10287/",
    newsUrl: "https://developer.apple.com/news/?id=tipkit",
  },
  {
    name: "Translation",
    category: "Specialized",
    description: "On-device translation framework",
    docsUrl: "https://developer.apple.com/documentation/translation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10288/",
    newsUrl: "https://developer.apple.com/news/?id=translation",
  },
  {
    name: "VisionKit",
    category: "Specialized",
    description: "Document scanning and text recognition UI",
    docsUrl: "https://developer.apple.com/documentation/visionkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10289/",
    newsUrl: "https://developer.apple.com/news/?id=visionkit",
  },
  {
    name: "LinkPresentation",
    category: "Specialized",
    description: "Framework for rich link previews",
    docsUrl: "https://developer.apple.com/documentation/linkpresentation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10290/",
    newsUrl: "https://developer.apple.com/news/?id=linkpresentation",
  },
  {
    name: "OSLog",
    category: "Developer",
    description: "Unified logging system for debugging",
    docsUrl: "https://developer.apple.com/documentation/oslog",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10291/",
    newsUrl: "https://developer.apple.com/news/?id=oslog",
  },
  {
    name: "Accelerate",
    category: "Developer",
    description: "High-performance mathematical computations",
    docsUrl: "https://developer.apple.com/documentation/accelerate",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10292/",
    newsUrl: "https://developer.apple.com/news/?id=accelerate",
  },
  {
    name: "Compression",
    category: "Developer",
    description: "Data compression and decompression framework",
    docsUrl: "https://developer.apple.com/documentation/compression",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10293/",
    newsUrl: "https://developer.apple.com/news/?id=compression",
  },
  {
    name: "simd",
    category: "Developer",
    description: "Single instruction, multiple data operations",
    docsUrl: "https://developer.apple.com/documentation/simd",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10294/",
    newsUrl: "https://developer.apple.com/news/?id=simd",
  },
  {
    name: "ModelIO",
    category: "Graphics",
    description: "3D model import, export, and processing",
    docsUrl: "https://developer.apple.com/documentation/modelio",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10295/",
    newsUrl: "https://developer.apple.com/news/?id=modelio",
  },
  {
    name: "GLKit",
    category: "Graphics",
    description: "OpenGL ES utility framework (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/glkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10296/",
    newsUrl: "https://developer.apple.com/news/?id=glkit",
  },
  {
    name: "MetalPerformanceShaders",
    category: "Graphics",
    description: "Optimized compute and graphics shaders",
    docsUrl: "https://developer.apple.com/documentation/metalperformanceshaders",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10297/",
    newsUrl: "https://developer.apple.com/news/?id=metalperformanceshaders",
  },
  {
    name: "MetalPerformanceShadersGraph",
    category: "Graphics",
    description: "Graph-based Metal Performance Shaders",
    docsUrl: "https://developer.apple.com/documentation/metalperformanceshadersgraph",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10298/",
    newsUrl: "https://developer.apple.com/news/?id=metalperformanceshadersgraph",
  },
  {
    name: "MetalFX",
    category: "Graphics",
    description: "Metal upscaling and rendering effects",
    docsUrl: "https://developer.apple.com/documentation/metalfx",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10299/",
    newsUrl: "https://developer.apple.com/news/?id=metalfx",
  },
  {
    name: "CreateML",
    category: "ML",
    description: "Framework for creating machine learning models",
    docsUrl: "https://developer.apple.com/documentation/createml",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10300/",
    newsUrl: "https://developer.apple.com/news/?id=createml",
  },
  {
    name: "CreateMLComponents",
    category: "ML",
    description: "Components for building ML training pipelines",
    docsUrl: "https://developer.apple.com/documentation/createmlcomponents",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10301/",
    newsUrl: "https://developer.apple.com/news/?id=createmlcomponents",
  },
  {
    name: "MLCompute",
    category: "ML",
    description: "High-performance machine learning computations",
    docsUrl: "https://developer.apple.com/documentation/mlcompute",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10302/",
    newsUrl: "https://developer.apple.com/news/?id=mlcompute",
  },
  {
    name: "TabularData",
    category: "ML",
    description: "Framework for working with tabular data",
    docsUrl: "https://developer.apple.com/documentation/tabulardata",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10303/",
    newsUrl: "https://developer.apple.com/news/?id=tabulardata",
  },
  {
    name: "Charts",
    category: "UI",
    description: "SwiftUI framework for creating charts",
    docsUrl: "https://developer.apple.com/documentation/charts",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10304/",
    newsUrl: "https://developer.apple.com/news/?id=charts",
  },
  {
    name: "ActivityKit",
    category: "UI",
    description: "Live Activities for Dynamic Island and Lock Screen",
    docsUrl: "https://developer.apple.com/documentation/activitykit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10305/",
    newsUrl: "https://developer.apple.com/news/?id=activitykit",
  },
  {
    name: "LiveActivities",
    category: "UI",
    description: "Framework for Live Activities implementation",
    docsUrl: "https://developer.apple.com/documentation/liveactivities",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10306/",
    newsUrl: "https://developer.apple.com/news/?id=liveactivities",
  },
  {
    name: "SwiftData",
    category: "Data",
    description: "SwiftUI-native data persistence framework",
    docsUrl: "https://developer.apple.com/documentation/swiftdata",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10307/",
    newsUrl: "https://developer.apple.com/news/?id=swiftdata",
  },
  {
    name: "Observation",
    category: "Data",
    description: "Framework for observable data changes",
    docsUrl: "https://developer.apple.com/documentation/observation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10308/",
    newsUrl: "https://developer.apple.com/news/?id=observation",
  },
  {
    name: "DataDetection",
    category: "Data",
    description: "Framework for detecting structured data in text",
    docsUrl: "https://developer.apple.com/documentation/datadetection",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10309/",
    newsUrl: "https://developer.apple.com/news/?id=datadetection",
  },
  {
    name: "DeveloperToolsSupport",
    category: "Developer",
    description: "Support framework for developer tools integration",
    docsUrl: "https://developer.apple.com/documentation/developertoolssupport",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10310/",
    newsUrl: "https://developer.apple.com/news/?id=developertoolssupport",
  },
  {
    name: "AutomatedDeviceEnrollment",
    category: "System",
    description: "Framework for automated device enrollment",
    docsUrl: "https://developer.apple.com/documentation/automateddeviceenrollment",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10311/",
    newsUrl: "https://developer.apple.com/news/?id=automateddeviceenrollment",
  },
  {
    name: "AutomationsDeviceManagement",
    category: "System",
    description: "Framework for device management automation",
    docsUrl: "https://developer.apple.com/documentation/automationsdevicemanagement",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10312/",
    newsUrl: "https://developer.apple.com/news/?id=automationsdevicemanagement",
  },
  {
    name: "MobileCoreServices",
    category: "System",
    description: "Core services for mobile devices (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/mobilecoreservices",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10313/",
    newsUrl: "https://developer.apple.com/news/?id=mobilecoreservices",
  },
  {
    name: "AddressBook",
    category: "System",
    description: "Address book access framework (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/addressbook",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10314/",
    newsUrl: "https://developer.apple.com/news/?id=addressbook",
  },
  {
    name: "AddressBookUI",
    category: "System",
    description: "Address book UI framework (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/addressbookui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10315/",
    newsUrl: "https://developer.apple.com/news/?id=addressbookui",
  },
  {
    name: "AssetsLibrary",
    category: "Media",
    description: "Photo library access framework (deprecated)",
    docsUrl: "https://developer.apple.com/documentation/assetslibrary",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10316/",
    newsUrl: "https://developer.apple.com/news/?id=assetslibrary",
  },
  {
    name: "BackgroundAssets",
    category: "System",
    description: "Framework for background asset downloads",
    docsUrl: "https://developer.apple.com/documentation/backgroundassets",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10317/",
    newsUrl: "https://developer.apple.com/news/?id=backgroundassets",
  },
  {
    name: "Cinematic",
    category: "Media",
    description: "Framework for cinematic video effects",
    docsUrl: "https://developer.apple.com/documentation/cinematic",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10318/",
    newsUrl: "https://developer.apple.com/news/?id=cinematic",
  },
  {
    name: "ClockKit",
    category: "UI",
    description: "Framework for Apple Watch complications",
    docsUrl: "https://developer.apple.com/documentation/clockkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10319/",
    newsUrl: "https://developer.apple.com/news/?id=clockkit",
  },
  {
    name: "ColorSync",
    category: "Graphics",
    description: "Color management framework",
    docsUrl: "https://developer.apple.com/documentation/colorsync",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10320/",
    newsUrl: "https://developer.apple.com/news/?id=colorsync",
  },
  {
    name: "CoreMediaIO",
    category: "Media",
    description: "Media I/O framework for audio and video",
    docsUrl: "https://developer.apple.com/documentation/coremediaio",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10321/",
    newsUrl: "https://developer.apple.com/news/?id=coremediaio",
  },
  {
    name: "CoreMIDI",
    category: "Media",
    description: "MIDI (Musical Instrument Digital Interface) framework",
    docsUrl: "https://developer.apple.com/documentation/coremidi",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10322/",
    newsUrl: "https://developer.apple.com/news/?id=coremidi",
  },
  {
    name: "CoreSpotlight",
    category: "System",
    description: "Framework for app content indexing and search",
    docsUrl: "https://developer.apple.com/documentation/corespotlight",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10323/",
    newsUrl: "https://developer.apple.com/news/?id=corespotlight",
  },
  {
    name: "CoreText",
    category: "UI",
    description: "Advanced text layout and typography framework",
    docsUrl: "https://developer.apple.com/documentation/coretext",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10324/",
    newsUrl: "https://developer.apple.com/news/?id=coretext",
  },
  {
    name: "CoreTransferable",
    category: "System",
    description: "Framework for data transfer between apps",
    docsUrl: "https://developer.apple.com/documentation/coretransferable",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10325/",
    newsUrl: "https://developer.apple.com/news/?id=coretransferable",
  },
  {
    name: "CoreVideo",
    category: "Media",
    description: "Core video processing framework",
    docsUrl: "https://developer.apple.com/documentation/corevideo",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10326/",
    newsUrl: "https://developer.apple.com/news/?id=corevideo",
  },
  {
    name: "CryptoTokenKit",
    category: "Security",
    description: "Framework for cryptographic token integration",
    docsUrl: "https://developer.apple.com/documentation/cryptotokenkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10327/",
    newsUrl: "https://developer.apple.com/news/?id=cryptotokenkit",
  },
  {
    name: "ExposureNotification",
    category: "Health",
    description: "COVID-19 exposure notification framework",
    docsUrl: "https://developer.apple.com/documentation/exposurenotification",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10328/",
    newsUrl: "https://developer.apple.com/news/?id=exposurenotification",
  },
  {
    name: "FileProviderUI",
    category: "System",
    description: "User interface for file provider extensions",
    docsUrl: "https://developer.apple.com/documentation/fileproviderui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10329/",
    newsUrl: "https://developer.apple.com/news/?id=fileproviderui",
  },
  {
    name: "GSS",
    category: "Security",
    description: "Generic Security Services framework",
    docsUrl: "https://developer.apple.com/documentation/gss",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10330/",
    newsUrl: "https://developer.apple.com/news/?id=gss",
  },
  {
    name: "IdentityLookup",
    category: "Communication",
    description: "Framework for call and message filtering",
    docsUrl: "https://developer.apple.com/documentation/identitylookup",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10331/",
    newsUrl: "https://developer.apple.com/news/?id=identitylookup",
  },
  {
    name: "IdentityLookupUI",
    category: "Communication",
    description: "User interface for identity lookup extensions",
    docsUrl: "https://developer.apple.com/documentation/identitylookupui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10332/",
    newsUrl: "https://developer.apple.com/news/?id=identitylookupui",
  },
  {
    name: "ImageCaptureCore",
    category: "Media",
    description: "Framework for camera and scanner integration",
    docsUrl: "https://developer.apple.com/documentation/imagecapturecore",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10333/",
    newsUrl: "https://developer.apple.com/news/?id=imagecapturecore",
  },
  {
    name: "IOKit",
    category: "System",
    description: "I/O Kit framework for hardware interaction",
    docsUrl: "https://developer.apple.com/documentation/iokit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10334/",
    newsUrl: "https://developer.apple.com/news/?id=iokit",
  },
  {
    name: "JavaScriptCore",
    category: "Developer",
    description: "JavaScript engine framework",
    docsUrl: "https://developer.apple.com/documentation/javascriptcore",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10335/",
    newsUrl: "https://developer.apple.com/news/?id=javascriptcore",
  },
  {
    name: "LocalAuthenticationEmbeddedUI",
    category: "Security",
    description: "Embedded UI for local authentication",
    docsUrl: "https://developer.apple.com/documentation/localauthenticationembeddedui",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10336/",
    newsUrl: "https://developer.apple.com/news/?id=localauthenticationembeddedui",
  },
  {
    name: "MailKit",
    category: "Communication",
    description: "Framework for Mail app extensions",
    docsUrl: "https://developer.apple.com/documentation/mailkit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10337/",
    newsUrl: "https://developer.apple.com/news/?id=mailkit",
  },
  {
    name: "MatterSupport",
    category: "Specialized",
    description: "Support framework for Matter ecosystem",
    docsUrl: "https://developer.apple.com/documentation/mattersupport",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10338/",
    newsUrl: "https://developer.apple.com/news/?id=mattersupport",
  },
  {
    name: "MediaAccessibility",
    category: "Media",
    description: "Media accessibility features framework",
    docsUrl: "https://developer.apple.com/documentation/mediaaccessibility",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10339/",
    newsUrl: "https://developer.apple.com/news/?id=mediaaccessibility",
  },
  {
    name: "MediaSetup",
    category: "Media",
    description: "Framework for media device setup",
    docsUrl: "https://developer.apple.com/documentation/mediasetup",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10340/",
    newsUrl: "https://developer.apple.com/news/?id=mediasetup",
  },
  {
    name: "MediaToolbox",
    category: "Media",
    description: "Media processing toolbox framework",
    docsUrl: "https://developer.apple.com/documentation/mediatoolbox",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10341/",
    newsUrl: "https://developer.apple.com/news/?id=mediatoolbox",
  },
  {
    name: "OSLog",
    category: "Developer",
    description: "Unified logging system framework",
    docsUrl: "https://developer.apple.com/documentation/oslog",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10342/",
    newsUrl: "https://developer.apple.com/news/?id=oslog",
  },
  {
    name: "RealityFoundation",
    category: "AR",
    description: "Foundation framework for RealityKit",
    docsUrl: "https://developer.apple.com/documentation/realityfoundation",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10343/",
    newsUrl: "https://developer.apple.com/news/?id=realityfoundation",
  },
  {
    name: "SafetyKit",
    category: "System",
    description: "Framework for safety and emergency features",
    docsUrl: "https://developer.apple.com/documentation/safetykit",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10344/",
    newsUrl: "https://developer.apple.com/news/?id=safetykit",
  },
  {
    name: "AVRouting",
    category: "Media",
    description: "Audio and video routing framework",
    docsUrl: "https://developer.apple.com/documentation/avrouting",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10345/",
    newsUrl: "https://developer.apple.com/news/?id=avrouting",
  },
  {
    name: "CarKey",
    category: "Specialized",
    description: "Framework for digital car key functionality",
    docsUrl: "https://developer.apple.com/documentation/carkey",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10346/",
    newsUrl: "https://developer.apple.com/news/?id=carkey",
  },
  {
    name: "Accounts",
    category: "System",
    description: "Framework for account management",
    docsUrl: "https://developer.apple.com/documentation/accounts",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10347/",
    newsUrl: "https://developer.apple.com/news/?id=accounts",
  },
  {
    name: "AdServices",
    category: "App Services",
    description: "Apple Search Ads attribution framework",
    docsUrl: "https://developer.apple.com/documentation/adservices",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10348/",
    newsUrl: "https://developer.apple.com/news/?id=adservices",
  },
  {
    name: "AppClip",
    category: "App Services",
    description: "Framework for App Clip functionality",
    docsUrl: "https://developer.apple.com/documentation/appclip",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10349/",
    newsUrl: "https://developer.apple.com/news/?id=appclip",
  },
  {
    name: "Appintents",
    category: "System",
    description: "Framework for app shortcuts and automation",
    docsUrl: "https://developer.apple.com/documentation/appintents",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10350/",
    newsUrl: "https://developer.apple.com/news/?id=appintents",
  },
  // SwiftUI Components
  {
    name: "Button",
    category: "SwiftUI",
    description: "Interactive control that performs an action when triggered",
    docsUrl: "https://developer.apple.com/documentation/swiftui/button",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-button",
  },
  {
    name: "Text",
    category: "SwiftUI",
    description: "View that displays one or more lines of read-only text",
    docsUrl: "https://developer.apple.com/documentation/swiftui/text",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-text",
  },
  {
    name: "Image",
    category: "SwiftUI",
    description: "View that displays an image",
    docsUrl: "https://developer.apple.com/documentation/swiftui/image",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-image",
  },
  {
    name: "VStack",
    category: "SwiftUI",
    description: "View that arranges its children in a vertical line",
    docsUrl: "https://developer.apple.com/documentation/swiftui/vstack",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-vstack",
  },
  {
    name: "HStack",
    category: "SwiftUI",
    description: "View that arranges its children in a horizontal line",
    docsUrl: "https://developer.apple.com/documentation/swiftui/hstack",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-hstack",
  },
  {
    name: "ZStack",
    category: "SwiftUI",
    description: "View that overlays its children, aligning them in both axes",
    docsUrl: "https://developer.apple.com/documentation/swiftui/zstack",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-zstack",
  },
  {
    name: "ScrollView",
    category: "SwiftUI",
    description: "Scrollable view that allows users to scroll through content",
    docsUrl: "https://developer.apple.com/documentation/swiftui/scrollview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10159/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-scrollview",
  },
  {
    name: "List",
    category: "SwiftUI",
    description: "Container that presents rows of data arranged in a single column",
    docsUrl: "https://developer.apple.com/documentation/swiftui/list",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10159/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-list",
  },
  {
    name: "LazyVGrid",
    category: "SwiftUI",
    description: "Container view that arranges its child views in a grid that grows vertically",
    docsUrl: "https://developer.apple.com/documentation/swiftui/lazyvgrid",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10159/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-lazyvgrid",
  },
  {
    name: "LazyHGrid",
    category: "SwiftUI",
    description: "Container view that arranges its child views in a grid that grows horizontally",
    docsUrl: "https://developer.apple.com/documentation/swiftui/lazyhgrid",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10159/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-lazyhgrid",
  },
  {
    name: "NavigationView",
    category: "SwiftUI",
    description: "View for presenting a stack of views that represents a visible path in a navigation hierarchy",
    docsUrl: "https://developer.apple.com/documentation/swiftui/navigationview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-navigationview",
  },
  {
    name: "NavigationStack",
    category: "SwiftUI",
    description: "View that displays a root view and enables you to present additional views over the root view",
    docsUrl: "https://developer.apple.com/documentation/swiftui/navigationstack",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2022/10054/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-navigationstack",
  },
  {
    name: "TabView",
    category: "SwiftUI",
    description: "View that switches between multiple child views using interactive user interface elements",
    docsUrl: "https://developer.apple.com/documentation/swiftui/tabview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-tabview",
  },
  {
    name: "TextField",
    category: "SwiftUI",
    description: "Control that displays an editable text interface",
    docsUrl: "https://developer.apple.com/documentation/swiftui/textfield",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-textfield",
  },
  {
    name: "SecureField",
    category: "SwiftUI",
    description: "Control that displays an editable text interface for sensitive data",
    docsUrl: "https://developer.apple.com/documentation/swiftui/securefield",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-securefield",
  },
  {
    name: "Toggle",
    category: "SwiftUI",
    description: "Control that toggles between on and off states",
    docsUrl: "https://developer.apple.com/documentation/swiftui/toggle",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-toggle",
  },
  {
    name: "Slider",
    category: "SwiftUI",
    description: "Control for selecting a value from a bounded linear range of values",
    docsUrl: "https://developer.apple.com/documentation/swiftui/slider",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-slider",
  },
  {
    name: "Stepper",
    category: "SwiftUI",
    description: "Control that performs increment and decrement actions",
    docsUrl: "https://developer.apple.com/documentation/swiftui/stepper",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-stepper",
  },
  {
    name: "Picker",
    category: "SwiftUI",
    description: "Control for selecting from a set of mutually exclusive values",
    docsUrl: "https://developer.apple.com/documentation/swiftui/picker",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-picker",
  },
  {
    name: "DatePicker",
    category: "SwiftUI",
    description: "Control that displays an editable date interface",
    docsUrl: "https://developer.apple.com/documentation/swiftui/datepicker",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-datepicker",
  },
  {
    name: "ColorPicker",
    category: "SwiftUI",
    description: "Control that displays a system interface for selecting a color",
    docsUrl: "https://developer.apple.com/documentation/swiftui/colorpicker",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10161/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-colorpicker",
  },
  {
    name: "ProgressView",
    category: "SwiftUI",
    description: "View that shows the completion progress of a task",
    docsUrl: "https://developer.apple.com/documentation/swiftui/progressview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-progressview",
  },
  {
    name: "Menu",
    category: "SwiftUI",
    description: "Control that presents a menu when pressed",
    docsUrl: "https://developer.apple.com/documentation/swiftui/menu",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-menu",
  },
  {
    name: "ContextMenu",
    category: "SwiftUI",
    description: "Container for contextual actions available by long-pressing",
    docsUrl: "https://developer.apple.com/documentation/swiftui/contextmenu",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-contextmenu",
  },
  {
    name: "ActionSheet",
    category: "SwiftUI",
    description: "Modal view that presents a set of actions in response to a control",
    docsUrl: "https://developer.apple.com/documentation/swiftui/actionsheet",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-actionsheet",
  },
  {
    name: "Alert",
    category: "SwiftUI",
    description: "Container that presents an alert to the user",
    docsUrl: "https://developer.apple.com/documentation/swiftui/alert",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10162/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-alert",
  },
  {
    name: "Sheet",
    category: "SwiftUI",
    description: "Presentation modifier that displays a modal sheet",
    docsUrl: "https://developer.apple.com/documentation/swiftui/sheet",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10163/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-sheet",
  },
  {
    name: "FullScreenCover",
    category: "SwiftUI",
    description: "Presentation modifier that displays a full-screen modal view",
    docsUrl: "https://developer.apple.com/documentation/swiftui/fullscreencover",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10163/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-fullscreencover",
  },
  {
    name: "Popover",
    category: "SwiftUI",
    description: "Presentation modifier that displays content in a popover",
    docsUrl: "https://developer.apple.com/documentation/swiftui/popover",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10163/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-popover",
  },
  {
    name: "Form",
    category: "SwiftUI",
    description: "Container for grouping controls used for data entry",
    docsUrl: "https://developer.apple.com/documentation/swiftui/form",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10164/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-form",
  },
  {
    name: "Section",
    category: "SwiftUI",
    description: "Container view that groups related content with optional header and footer",
    docsUrl: "https://developer.apple.com/documentation/swiftui/section",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10164/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-section",
  },
  {
    name: "GroupBox",
    category: "SwiftUI",
    description: "Stylized view with an optional label that is associated with a logical grouping of content",
    docsUrl: "https://developer.apple.com/documentation/swiftui/groupbox",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10164/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-groupbox",
  },
  {
    name: "DisclosureGroup",
    category: "SwiftUI",
    description: "View that shows or hides another content view, based on the state of a disclosure control",
    docsUrl: "https://developer.apple.com/documentation/swiftui/disclosuregroup",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10164/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-disclosuregroup",
  },
  {
    name: "Spacer",
    category: "SwiftUI",
    description: "Flexible space that expands along the major axis of its containing stack layout",
    docsUrl: "https://developer.apple.com/documentation/swiftui/spacer",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-spacer",
  },
  {
    name: "Divider",
    category: "SwiftUI",
    description: "Visual element that can be used to separate other content",
    docsUrl: "https://developer.apple.com/documentation/swiftui/divider",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10148/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-divider",
  },
  {
    name: "Rectangle",
    category: "SwiftUI",
    description: "Rectangular shape that you can use when drawing a view",
    docsUrl: "https://developer.apple.com/documentation/swiftui/rectangle",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-rectangle",
  },
  {
    name: "Circle",
    category: "SwiftUI",
    description: "Circular shape that you can use when drawing a view",
    docsUrl: "https://developer.apple.com/documentation/swiftui/circle",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-circle",
  },
  {
    name: "RoundedRectangle",
    category: "SwiftUI",
    description: "Rectangular shape with rounded corners",
    docsUrl: "https://developer.apple.com/documentation/swiftui/roundedrectangle",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-roundedrectangle",
  },
  {
    name: "Capsule",
    category: "SwiftUI",
    description: "Capsule shape aligned inside the frame of the view containing it",
    docsUrl: "https://developer.apple.com/documentation/swiftui/capsule",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-capsule",
  },
  {
    name: "Path",
    category: "SwiftUI",
    description: "Outline of a 2D shape that you can use when drawing a view",
    docsUrl: "https://developer.apple.com/documentation/swiftui/path",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10165/",
    newsUrl: "https://developer.apple.com/news/?id=swiftui-path",
  },
  // UIKit Components
  {
    name: "UIButton",
    category: "UIKit",
    description: "Control that executes custom code in response to user interactions",
    docsUrl: "https://developer.apple.com/documentation/uikit/uibutton",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uibutton",
  },
  {
    name: "UILabel",
    category: "UIKit",
    description: "View that displays one or more lines of informational text",
    docsUrl: "https://developer.apple.com/documentation/uikit/uilabel",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uilabel",
  },
  {
    name: "UITableView",
    category: "UIKit",
    description: "View that presents data using rows arranged in a single column",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitableview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitableview",
  },
  {
    name: "UICollectionView",
    category: "UIKit",
    description: "Object that manages an ordered collection of data items and presents them using customizable layouts",
    docsUrl: "https://developer.apple.com/documentation/uikit/uicollectionview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uicollectionview",
  },
  {
    name: "UIScrollView",
    category: "UIKit",
    description: "View that allows the scrolling and zooming of its contained views",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiscrollview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiscrollview",
  },
  {
    name: "UITextField",
    category: "UIKit",
    description: "Object that displays an editable text area in your interface",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitextfield",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitextfield",
  },
  {
    name: "UITextView",
    category: "UIKit",
    description: "Scrollable, multiline text region",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitextview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitextview",
  },
  {
    name: "UIImageView",
    category: "UIKit",
    description: "Object that displays a single image or a sequence of animated images in your interface",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiimageview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiimageview",
  },
  {
    name: "UIView",
    category: "UIKit",
    description: "Object that manages the content for a rectangular area on the screen",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiview",
  },
  {
    name: "UIViewController",
    category: "UIKit",
    description: "Object that manages a view hierarchy for your UIKit app",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiviewcontroller",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiviewcontroller",
  },
  {
    name: "UINavigationController",
    category: "UIKit",
    description: "Container view controller that defines a stack-based scheme for navigating hierarchical content",
    docsUrl: "https://developer.apple.com/documentation/uikit/uinavigationcontroller",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uinavigationcontroller",
  },
  {
    name: "UITabBarController",
    category: "UIKit",
    description: "Container view controller that manages a radio-style selection interface",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitabbarcontroller",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitabbarcontroller",
  },
  {
    name: "UIStackView",
    category: "UIKit",
    description: "Streamlined interface for laying out a collection of views in either a column or a row",
    docsUrl: "https://developer.apple.com/documentation/uikit/uistackview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uistackview",
  },
  {
    name: "UIAlertController",
    category: "UIKit",
    description: "Object that displays an alert message to the user",
    docsUrl: "https://developer.apple.com/documentation/uikit/uialertcontroller",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uialertcontroller",
  },
  {
    name: "UISwitch",
    category: "UIKit",
    description: "Control that offers a binary choice, such as on/off",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiswitch",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiswitch",
  },
  {
    name: "UISlider",
    category: "UIKit",
    description: "Control used to select a single value from a continuous range of values",
    docsUrl: "https://developer.apple.com/documentation/uikit/uislider",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uislider",
  },
  {
    name: "UISegmentedControl",
    category: "UIKit",
    description: "Horizontal control made of multiple segments, each segment functioning as a discrete button",
    docsUrl: "https://developer.apple.com/documentation/uikit/uisegmentedcontrol",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uisegmentedcontrol",
  },
  {
    name: "UIPickerView",
    category: "UIKit",
    description: "View that uses a spinning-wheel or slot-machine metaphor to show one or more sets of values",
    docsUrl: "https://developer.apple.com/documentation/uikit/uipickerview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uipickerview",
  },
  {
    name: "UIDatePicker",
    category: "UIKit",
    description: "Control used for the inputting of date and time values",
    docsUrl: "https://developer.apple.com/documentation/uikit/uidatepicker",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uidatepicker",
  },
  {
    name: "UIProgressView",
    category: "UIKit",
    description: "View that depicts the progress of a task over time",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiprogressview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiprogressview",
  },
  {
    name: "UIActivityIndicatorView",
    category: "UIKit",
    description: "View that shows that a task is in progress",
    docsUrl: "https://developer.apple.com/documentation/uikit/uiactivityindicatorview",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uiactivityindicatorview",
  },
  {
    name: "UISearchBar",
    category: "UIKit",
    description: "Text field-like control that supports text-based searches",
    docsUrl: "https://developer.apple.com/documentation/uikit/uisearchbar",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uisearchbar",
  },
  {
    name: "UIToolbar",
    category: "UIKit",
    description: "Control that displays one or more buttons along the bottom edge of your interface",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitoolbar",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitoolbar",
  },
  {
    name: "UINavigationBar",
    category: "UIKit",
    description: "Navigational control displayed at the top of a navigation controller's view",
    docsUrl: "https://developer.apple.com/documentation/uikit/uinavigationbar",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uinavigationbar",
  },
  {
    name: "UITabBar",
    category: "UIKit",
    description:
      "Control that displays one or more buttons in a tab bar for selecting between different subtasks, views, or modes",
    docsUrl: "https://developer.apple.com/documentation/uikit/uitabbar",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2023/10160/",
    newsUrl: "https://developer.apple.com/news/?id=uikit-uitabbar",
  },
]

const designResources = [
  {
    name: "Human Interface Guidelines",
    description:
      "Apple's comprehensive design guidelines for creating intuitive user experiences across all Apple platforms",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/",
    wwdcUrl: "https://developer.apple.com/videos/design/",
    newsUrl: "https://developer.apple.com/news/?id=design",
  },
  {
    name: "SF Symbols",
    description: "Apple's comprehensive library of symbols that integrate seamlessly with San Francisco system font",
    category: "Design",
    docsUrl: "https://developer.apple.com/sf-symbols/",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2019/206/",
    newsUrl: "https://developer.apple.com/news/?id=sf-symbols",
  },
  {
    name: "Design Resources",
    description: "Official Apple design resources including templates, UI kits, and production materials",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/resources/",
    wwdcUrl: "https://developer.apple.com/videos/design/",
    newsUrl: "https://developer.apple.com/news/?id=design-resources",
  },
  {
    name: "Accessibility Design",
    description: "Guidelines and best practices for creating accessible experiences for all users",
    category: "Design",
    docsUrl: "https://developer.apple.com/accessibility/",
    wwdcUrl: "https://developer.apple.com/videos/accessibility/",
    newsUrl: "https://developer.apple.com/news/?id=accessibility",
  },
  {
    name: "App Store Guidelines",
    description: "Design and content guidelines for App Store submission and approval",
    category: "Design",
    docsUrl: "https://developer.apple.com/app-store/review/guidelines/",
    wwdcUrl: "https://developer.apple.com/videos/app-store/",
    newsUrl: "https://developer.apple.com/news/?id=app-store",
  },
  {
    name: "Typography Guidelines",
    description: "Best practices for typography across Apple platforms using San Francisco font family",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/typography",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2016/803/",
    newsUrl: "https://developer.apple.com/news/?id=typography",
  },
  {
    name: "Color Guidelines",
    description: "System colors, dynamic color, and accessibility considerations for Apple platforms",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/color",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2019/214/",
    newsUrl: "https://developer.apple.com/news/?id=color",
  },
  {
    name: "Layout and Spacing",
    description: "Guidelines for creating consistent layouts and spacing across different screen sizes",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/layout",
    wwdcUrl: "https://developer.apple.com/videos/design/",
    newsUrl: "https://developer.apple.com/news/?id=layout",
  },
  {
    name: "Animation Guidelines",
    description: "Principles and best practices for creating meaningful animations and transitions",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/motion",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2018/803/",
    newsUrl: "https://developer.apple.com/news/?id=animation",
  },
  {
    name: "Dark Mode Design",
    description: "Guidelines for implementing Dark Mode and creating adaptive interfaces",
    category: "Design",
    docsUrl: "https://developer.apple.com/design/human-interface-guidelines/dark-mode",
    wwdcUrl: "https://developer.apple.com/videos/play/wwdc2019/214/",
    newsUrl: "https://developer.apple.com/news/?id=dark-mode",
  },
]

const allResources = [...frameworks, ...designResources]

const categories = [
  "All",
  "Core",
  "UI",
  "SwiftUI",
  "UIKit",
  "Design", // Added Design category
  "Graphics",
  "Media",
  "Network",
  "Security",
  "Data",
  "ML",
  "AR",
  "Health",
  "Games",
  "Communication",
  "System",
  "App Services",
  "Accessibility",
  "Developer",
  "Specialized",
]

const getCategoryColor = (category: string) => {
  return "bg-white/50 border-gray-200/60 hover:bg-gray-50/80 hover:border-gray-300/60"
}

const resourceTypes = [
  { key: "docs", label: "Documentation", icon: BookOpen },
  { key: "wwdc", label: "WWDC Videos", icon: Video },
  { key: "news", label: "News & Updates", icon: Newspaper },
]

export default function IOSFrameworksFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null)

  const filteredFrameworks = useMemo(() => {
    return allResources.filter((framework) => {
      const matchesSearch =
        framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        framework.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        framework.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || framework.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const groupedFrameworks = useMemo(() => {
    const grouped = filteredFrameworks.reduce(
      (acc, framework) => {
        if (!acc[framework.category]) {
          acc[framework.category] = []
        }
        acc[framework.category].push(framework)
        return acc
      },
      {} as Record<string, Framework[]>,
    )
    return grouped
  }, [filteredFrameworks])

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white flex">
      <div className="w-80 bg-[#0f1419] border-r border-gray-700/50 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories Section */}
          <div className="p-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</h3>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1 ${
                !selectedCategory ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              All Frameworks
              <span className="float-right text-xs bg-gray-600/50 px-2 py-0.5 rounded-full">{allResources.length}</span>
            </button>
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1 ${
                  selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                {category}
                <span className="float-right text-xs bg-gray-600/50 px-2 py-0.5 rounded-full">
                  {allResources.filter((f) => f.category === category).length}
                </span>
              </button>
            ))}
          </div>

          {/* Learning Resources Section */}
          <div className="p-3 border-t border-gray-700/30">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Learning Resources</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <BookOpen className="h-4 w-4" />
                Documentation
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <Video className="h-4 w-4" />
                WWDC Videos
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <Newspaper className="h-4 w-4" />
                News & Updates
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <Code className="h-4 w-4" />
                Sample Code
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <MessageCircle className="h-4 w-4" />
                Developer Forums
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 rounded-md flex items-center gap-2 transition-colors">
                <Palette className="h-4 w-4" />
                Design Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0f1419] border-b border-gray-700/50 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            iOS Frameworks <span className="text-gray-400">personal quick-finder</span>
          </h1>
          <p className="text-gray-400">
            Comprehensive reference for all {allResources.length} iOS frameworks with official resources
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mt-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search frameworks (e.g. Core, Kit, AR, Media)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-[#1a1f2e] border-gray-600/50 text-white placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredFrameworks.length} of {allResources.length} frameworks
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {selectedFramework ? (
              // Framework Detail View
              <div className="bg-[#0f1419] border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedFramework.name}</h2>
                  <button onClick={() => setSelectedFramework(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </div>
                <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm mb-4">
                  {selectedFramework.category}
                </span>
                <p className="text-gray-300 text-lg mb-6">{selectedFramework.description}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => window.open(selectedFramework.docsUrl, "_blank")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Documentation
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(selectedFramework.wwdcUrl, "_blank")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Video className="h-4 w-4" />
                    WWDC Videos
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(selectedFramework.newsUrl, "_blank")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Newspaper className="h-4 w-4" />
                    News & Updates
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              // Framework Grid

              <div className="space-y-6">
                {Object.entries(groupedFrameworks).map(([category, frameworks]) => (
                  <div key={category}>
                    <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      {category}
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                        {frameworks.length}
                      </span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                      {frameworks.map((framework) => (
                        <div
                          key={framework.name}
                          className={`bg-[#0f1419] border rounded-lg p-2.5 hover:border-gray-600/50 transition-all cursor-pointer hover:shadow-lg ${
                            framework.category === "UIKit" ? "border-blue-500/50" : "border-gray-700/50"
                          }`}
                          onClick={() => setSelectedFramework(framework)}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <h3 className="text-sm font-semibold text-white truncate pr-1">{framework.name}</h3>
                            <span className="text-xs px-1.5 py-0.5 bg-gray-700/50 text-gray-300 rounded-full whitespace-nowrap">
                              {framework.category}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2 leading-relaxed">
                            {framework.description}
                          </p>
                          <div className="flex gap-0.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(framework.docsUrl, "_blank")
                              }}
                              className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                            >
                              <BookOpen className="h-3 w-3" />
                              Docs
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(framework.wwdcUrl, "_blank")
                              }}
                              className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                            >
                              <Video className="h-3 w-3" />
                              WWDC
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(framework.newsUrl, "_blank")
                              }}
                              className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-xs rounded transition-colors"
                            >
                              <Newspaper className="h-3 w-3" />
                              News
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
