// Global variables
let selectedSymptoms = []
let currentRatings = {
  effectiveness: 0,
  ease: 0,
  overall: 0,
}
const currentUser = null
const isGuestUser = false

// Enhanced remedy database with more entries
const remedyDatabase = {
  headache: [
    {
      title: "Peppermint Oil Massage",
      description: "Natural pain relief through topical application of diluted peppermint oil.",
      icon: "fas fa-leaf",
      instructions: [
        "Mix 2-3 drops of peppermint oil with 1 tablespoon of carrier oil (coconut or olive oil)",
        "Gently massage the mixture onto your temples and forehead",
        "Apply light pressure in circular motions for 2-3 minutes",
        "Rest in a quiet, dark room for 15-20 minutes",
      ],
      caution: "Avoid contact with eyes. Test on a small skin area first to check for allergic reactions.",
      tags: ["Natural", "Topical", "Quick Relief"],
      rating: 4.2,
      reviews: 156,
      category: "neurological",
    },
    {
      title: "Cold Compress Therapy",
      description: "Reduce inflammation and numb pain with cold therapy.",
      icon: "fas fa-snowflake",
      instructions: [
        "Wrap ice cubes or frozen peas in a thin towel",
        "Apply to the forehead or back of neck for 15 minutes",
        "Take a 15-minute break, then reapply if needed",
        "Repeat 2-3 times as necessary",
      ],
      caution: "Do not apply ice directly to skin. Limit application to 15 minutes to prevent frostbite.",
      tags: ["Cold Therapy", "Anti-inflammatory", "Safe"],
      rating: 4.0,
      reviews: 89,
      category: "neurological",
    },
    {
      title: "Lavender Aromatherapy",
      description: "Calming lavender essential oil to reduce tension headaches.",
      icon: "fas fa-spa",
      instructions: [
        "Add 3-4 drops of lavender oil to a diffuser",
        "Inhale deeply for 10-15 minutes",
        "Alternatively, apply 1 drop to temples (diluted)",
        "Practice deep breathing while inhaling the scent",
      ],
      caution: "Use pure lavender oil. Avoid if allergic to lavender.",
      tags: ["Aromatherapy", "Relaxation", "Natural"],
      rating: 4.3,
      reviews: 124,
      category: "neurological",
    },
  ],
  nausea: [
    {
      title: "Ginger Tea",
      description: "Soothing ginger root tea to calm stomach upset and reduce nausea.",
      icon: "fas fa-mug-hot",
      instructions: [
        "Slice 1 inch of fresh ginger root into thin pieces",
        "Boil 2 cups of water and add ginger slices",
        "Simmer for 10-15 minutes",
        "Strain and add honey to taste",
        "Drink slowly while warm",
      ],
      caution: "Consult doctor if pregnant or taking blood thinners. Limit to 2-3 cups per day.",
      tags: ["Herbal", "Digestive", "Natural"],
      rating: 4.5,
      reviews: 203,
      category: "digestive",
    },
    {
      title: "Peppermint Tea",
      description: "Cooling peppermint to soothe digestive discomfort and nausea.",
      icon: "fas fa-leaf",
      instructions: [
        "Steep 1 peppermint tea bag in hot water for 5-7 minutes",
        "Remove tea bag and let cool slightly",
        "Sip slowly, taking small amounts",
        "Drink 2-3 times daily as needed",
      ],
      caution: "Avoid if you have GERD or acid reflux. May interact with certain medications.",
      tags: ["Herbal", "Cooling", "Digestive"],
      rating: 4.1,
      reviews: 167,
      category: "digestive",
    },
  ],
  "sore throat": [
    {
      title: "Honey & Lemon Gargle",
      description: "Antibacterial honey combined with vitamin C-rich lemon for throat relief.",
      icon: "fas fa-honey-pot",
      instructions: [
        "Mix 2 tablespoons of honey with juice of half a lemon",
        "Add to 1 cup of warm water and stir well",
        "Gargle for 30 seconds, then swallow or spit out",
        "Repeat 3-4 times daily",
      ],
      caution: "Not suitable for children under 1 year due to honey. Use raw, unprocessed honey when possible.",
      tags: ["Antibacterial", "Soothing", "Immune Support"],
      rating: 4.3,
      reviews: 178,
      category: "respiratory",
    },
    {
      title: "Salt Water Gargle",
      description: "Simple and effective salt water solution to reduce throat inflammation.",
      icon: "fas fa-tint",
      instructions: [
        "Mix 1/2 teaspoon of salt in 1 cup of warm water",
        "Stir until salt is completely dissolved",
        "Gargle for 15-30 seconds",
        "Spit out and repeat 2-3 times daily",
      ],
      caution: "Do not swallow salt water. Use only as directed.",
      tags: ["Simple", "Anti-inflammatory", "Safe"],
      rating: 4.0,
      reviews: 145,
      category: "respiratory",
    },
  ],
  fatigue: [
    {
      title: "Green Tea Energy Boost",
      description: "Natural caffeine and antioxidants to combat fatigue without jitters.",
      icon: "fas fa-leaf",
      instructions: [
        "Steep 1 green tea bag in hot water for 3-5 minutes",
        "Add a slice of lemon for extra vitamin C",
        "Drink 1-2 cups in the morning or early afternoon",
        "Avoid drinking within 6 hours of bedtime",
      ],
      caution: "Contains caffeine. Limit intake if sensitive to caffeine or have heart conditions.",
      tags: ["Energy", "Antioxidants", "Natural Caffeine"],
      rating: 4.1,
      reviews: 134,
      category: "general",
    },
    {
      title: "Power Nap Technique",
      description: "Strategic short nap to restore energy without disrupting sleep cycle.",
      icon: "fas fa-bed",
      instructions: [
        "Find a quiet, dark place to rest",
        "Set an alarm for 10-20 minutes maximum",
        "Lie down and close your eyes",
        "Focus on relaxing your body and mind",
      ],
      caution: "Avoid naps longer than 20 minutes or after 3 PM to prevent sleep disruption.",
      tags: ["Rest", "Energy", "Natural"],
      rating: 4.4,
      reviews: 98,
      category: "general",
    },
  ],
  cough: [
    {
      title: "Honey Cough Syrup",
      description: "Natural honey to coat throat and suppress cough.",
      icon: "fas fa-honey-pot",
      instructions: [
        "Take 1-2 teaspoons of raw honey",
        "Let it coat your throat slowly",
        "Repeat every 2-3 hours as needed",
        "Can mix with warm water if preferred",
      ],
      caution: "Not for children under 1 year. Consult doctor for persistent cough.",
      tags: ["Natural", "Soothing", "Antitussive"],
      rating: 4.2,
      reviews: 189,
      category: "respiratory",
    },
    {
      title: "Steam Inhalation",
      description: "Moist warm air to loosen mucus and soothe airways.",
      icon: "fas fa-cloud",
      instructions: [
        "Boil water in a large pot",
        "Remove from heat and lean over pot",
        "Cover head with towel to trap steam",
        "Inhale deeply for 5-10 minutes",
      ],
      caution: "Be careful of hot steam. Keep safe distance to avoid burns.",
      tags: ["Steam", "Respiratory", "Mucus Relief"],
      rating: 4.0,
      reviews: 156,
      category: "respiratory",
    },
  ],
  fever: [
    {
      title: "Cool Compress",
      description: "External cooling to help reduce body temperature.",
      icon: "fas fa-thermometer-half",
      instructions: [
        "Soak a clean cloth in cool (not cold) water",
        "Wring out excess water",
        "Place on forehead, wrists, or back of neck",
        "Replace every 10-15 minutes",
      ],
      caution: "Monitor temperature regularly. Seek medical attention for high fever.",
      tags: ["Cooling", "Temperature", "Safe"],
      rating: 3.9,
      reviews: 112,
      category: "general",
    },
  ],
  "stomach ache": [
    {
      title: "Chamomile Tea",
      description: "Gentle chamomile to soothe digestive discomfort.",
      icon: "fas fa-mug-hot",
      instructions: [
        "Steep chamomile tea bag for 5-10 minutes",
        "Add honey if desired",
        "Drink warm, sip slowly",
        "Repeat 2-3 times daily",
      ],
      caution: "Avoid if allergic to ragweed family plants.",
      tags: ["Herbal", "Digestive", "Calming"],
      rating: 4.2,
      reviews: 143,
      category: "digestive",
    },
    {
      title: "BRAT Diet",
      description: "Bland foods to ease digestive stress and restore normal function.",
      icon: "fas fa-bread-slice",
      instructions: [
        "Eat Bananas, Rice, Applesauce, and Toast",
        "Start with small portions",
        "Eat slowly and chew thoroughly",
        "Gradually add other foods as tolerated",
      ],
      caution: "Not nutritionally complete long-term. Return to normal diet when possible.",
      tags: ["Diet", "Gentle", "Recovery"],
      rating: 4.0,
      reviews: 167,
      category: "digestive",
    },
  ],
  "muscle pain": [
    {
      title: "Epsom Salt Bath",
      description: "Magnesium-rich bath to relax muscles and reduce inflammation.",
      icon: "fas fa-bath",
      instructions: [
        "Add 1-2 cups of Epsom salt to warm bath water",
        "Stir to dissolve completely",
        "Soak for 15-20 minutes",
        "Rinse with cool water afterward",
      ],
      caution: "Avoid if you have kidney problems or open wounds.",
      tags: ["Relaxation", "Anti-inflammatory", "Magnesium"],
      rating: 4.3,
      reviews: 201,
      category: "muscular",
    },
    {
      title: "Gentle Stretching",
      description: "Light stretching to improve circulation and reduce muscle tension.",
      icon: "fas fa-running",
      instructions: [
        "Start with gentle, slow movements",
        "Hold each stretch for 15-30 seconds",
        "Breathe deeply during stretches",
        "Stop if pain increases",
      ],
      caution: "Do not force stretches. Stop if pain worsens.",
      tags: ["Exercise", "Flexibility", "Natural"],
      rating: 4.1,
      reviews: 134,
      category: "muscular",
    },
  ],
  anxiety: [
    {
      title: "Deep Breathing Exercise",
      description: "4-7-8 breathing technique to calm the nervous system.",
      icon: "fas fa-wind",
      instructions: [
        "Inhale through nose for 4 counts",
        "Hold breath for 7 counts",
        "Exhale through mouth for 8 counts",
        "Repeat 4-8 cycles",
      ],
      caution: "Stop if you feel dizzy. Practice regularly for best results.",
      tags: ["Breathing", "Relaxation", "Mental Health"],
      rating: 4.4,
      reviews: 189,
      category: "neurological",
    },
    {
      title: "Chamomile Tea",
      description: "Calming herbal tea to reduce anxiety and promote relaxation.",
      icon: "fas fa-mug-hot",
      instructions: [
        "Steep chamomile tea for 5-10 minutes",
        "Add honey if desired",
        "Drink slowly in a quiet environment",
        "Practice mindfulness while drinking",
      ],
      caution: "May cause drowsiness. Avoid if allergic to ragweed.",
      tags: ["Herbal", "Calming", "Natural"],
      rating: 4.2,
      reviews: 156,
      category: "neurological",
    },
  ],
  insomnia: [
    {
      title: "Lavender Sleep Routine",
      description: "Relaxing lavender aromatherapy to promote better sleep.",
      icon: "fas fa-moon",
      instructions: [
        "Add 3-4 drops lavender oil to diffuser 30 minutes before bed",
        "Take a warm bath with lavender Epsom salts",
        "Apply diluted lavender oil to pillow",
        "Practice deep breathing exercises",
      ],
      caution: "Test for skin sensitivity. Avoid ingesting essential oils.",
      tags: ["Aromatherapy", "Sleep", "Relaxation"],
      rating: 4.3,
      reviews: 178,
      category: "neurological",
    },
  ],
}

// Enhanced symptom suggestions
const symptomSuggestions = [
  "headache",
  "nausea",
  "fatigue",
  "cough",
  "sore throat",
  "fever",
  "stomach ache",
  "muscle pain",
  "runny nose",
  "dizziness",
  "insomnia",
  "anxiety",
  "back pain",
  "joint pain",
  "congestion",
  "heartburn",
  "bloating",
  "stress",
  "tension",
  "migraine",
  "cold symptoms",
  "flu symptoms",
  "allergies",
  "indigestion",
  "constipation",
  "diarrhea",
  "acid reflux",
  "sinusitis",
  "earache",
  "toothache",
  "skin rash",
  "dry skin",
  "acne",
  "eczema",
  "sunburn",
  "cuts",
  "bruises",
  "sprains",
  "cramps",
  "menstrual pain",
  "morning sickness",
  "motion sickness",
  "hangover",
  "dehydration",
  "low energy",
  "mood swings",
  "depression",
  "panic attacks",
  "high blood pressure",
  "low blood pressure",
]

// Default remedies for everyone to view
const defaultRemedies = [
  {
    title: "Daily Hydration Therapy",
    description: "Proper hydration supports overall health and can help alleviate many symptoms.",
    icon: "fas fa-tint",
    instructions: [
      "Drink 8-10 glasses of water throughout the day",
      "Add a pinch of sea salt and lemon for electrolyte balance",
      "Avoid excessive caffeine and alcohol",
      "Monitor urine color - aim for pale yellow",
    ],
    caution: "Consult doctor if you have kidney problems or heart conditions that require fluid restriction.",
    tags: ["General Wellness", "Hydration", "Foundation"],
    rating: 4.0,
    reviews: 95,
    category: "general",
  },
  {
    title: "Vitamin D Sunshine",
    description: "Natural sunlight exposure to boost vitamin D and improve mood.",
    icon: "fas fa-sun",
    instructions: [
      "Spend 10-15 minutes in morning sunlight",
      "Expose arms and face without sunscreen initially",
      "Gradually increase exposure time",
      "Best times: 10 AM - 3 PM",
    ],
    caution: "Avoid overexposure. Use sunscreen for longer periods outdoors.",
    tags: ["Vitamin D", "Mood", "Natural"],
    rating: 4.2,
    reviews: 134,
    category: "general",
  },
  {
    title: "Meditation & Mindfulness",
    description: "Daily meditation practice to reduce stress and improve mental clarity.",
    icon: "fas fa-om",
    instructions: [
      "Find a quiet, comfortable space",
      "Sit with spine straight, eyes closed",
      "Focus on your breath for 5-10 minutes",
      "Acknowledge thoughts without judgment",
    ],
    caution: "Start with short sessions. Consistency is more important than duration.",
    tags: ["Mental Health", "Stress Relief", "Mindfulness"],
    rating: 4.5,
    reviews: 267,
    category: "neurological",
  },
  {
    title: "Apple Cider Vinegar Tonic",
    description: "Natural digestive aid and immune system booster.",
    icon: "fas fa-apple-alt",
    instructions: [
      "Mix 1-2 tablespoons ACV in 8 oz warm water",
      "Add honey and lemon to taste",
      "Drink 15-30 minutes before meals",
      'Use raw, unfiltered ACV with "mother"',
    ],
    caution: "May interact with medications. Dilute properly to protect tooth enamel.",
    tags: ["Digestive", "Immune Support", "Natural"],
    rating: 3.9,
    reviews: 156,
    category: "digestive",
  },
  {
    title: "Turmeric Golden Milk",
    description: "Anti-inflammatory golden milk to reduce inflammation and promote healing.",
    icon: "fas fa-mug-hot",
    instructions: [
      "Heat 1 cup milk (dairy or plant-based)",
      "Add 1 tsp turmeric, pinch of black pepper",
      "Add honey, ginger, and cinnamon to taste",
      "Simmer for 5 minutes, strain and enjoy",
    ],
    caution: "May interact with blood thinners. Start with small amounts.",
    tags: ["Anti-inflammatory", "Immune Support", "Antioxidant"],
    rating: 4.4,
    reviews: 198,
    category: "general",
  },
  {
    title: "Lemon Water Detox",
    description: "Morning lemon water to kickstart metabolism and support detoxification.",
    icon: "fas fa-lemon",
    instructions: [
      "Squeeze half a lemon into warm water",
      "Drink first thing in the morning on empty stomach",
      "Wait 30 minutes before eating",
      "Use fresh lemon, not bottled juice",
    ],
    caution: "May erode tooth enamel over time. Use a straw if concerned.",
    tags: ["Detox", "Metabolism", "Vitamin C"],
    rating: 4.1,
    reviews: 223,
    category: "general",
  },
]

// User interaction history management
class UserHistoryManager {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("symptocare_current_user") || "null")
    this.isGuest = !this.currentUser
    this.guestHistory = JSON.parse(localStorage.getItem("symptocare_guest_history") || "{}")
  }

  saveSymptomSearch(symptoms, timestamp = new Date().toISOString()) {
    const searchData = {
      symptoms: symptoms,
      timestamp: timestamp,
      type: "symptom_search",
    }

    if (this.isGuest) {
      if (!this.guestHistory.searches) this.guestHistory.searches = []
      this.guestHistory.searches.push(searchData)
      // Keep only last 10 searches for guests
      if (this.guestHistory.searches.length > 10) {
        this.guestHistory.searches = this.guestHistory.searches.slice(-10)
      }
      localStorage.setItem("symptocare_guest_history", JSON.stringify(this.guestHistory))
    } else {
      // Save to user's profile
      const users = JSON.parse(localStorage.getItem("symptocare_users") || "[]")
      const userIndex = users.findIndex((u) => u.id === this.currentUser.id)
      if (userIndex !== -1) {
        if (!users[userIndex].profile.searchHistory) users[userIndex].profile.searchHistory = []
        users[userIndex].profile.searchHistory.push(searchData)
        localStorage.setItem("symptocare_users", JSON.stringify(users))
      }
    }
  }

  saveRemedyInteraction(remedyTitle, action, rating = null) {
    const interactionData = {
      remedyTitle: remedyTitle,
      action: action, // 'viewed', 'rated', 'tried'
      rating: rating,
      timestamp: new Date().toISOString(),
      type: "remedy_interaction",
    }

    if (this.isGuest) {
      if (!this.guestHistory.remedyInteractions) this.guestHistory.remedyInteractions = []
      this.guestHistory.remedyInteractions.push(interactionData)
      localStorage.setItem("symptocare_guest_history", JSON.stringify(this.guestHistory))
    } else {
      const users = JSON.parse(localStorage.getItem("symptocare_users") || "[]")
      const userIndex = users.findIndex((u) => u.id === this.currentUser.id)
      if (userIndex !== -1) {
        if (!users[userIndex].profile.remedyHistory) users[userIndex].profile.remedyHistory = []
        users[userIndex].profile.remedyHistory.push(interactionData)
        localStorage.setItem("symptocare_users", JSON.stringify(users))
      }
    }
  }

  getRecentSearches(limit = 5) {
    if (this.isGuest) {
      return this.guestHistory.searches ? this.guestHistory.searches.slice(-limit) : []
    } else {
      const users = JSON.parse(localStorage.getItem("symptocare_users") || "[]")
      const user = users.find((u) => u.id === this.currentUser.id)
      return user && user.profile.searchHistory ? user.profile.searchHistory.slice(-limit) : []
    }
  }

  getRemedyHistory() {
    if (this.isGuest) {
      return this.guestHistory.remedyInteractions || []
    } else {
      const users = JSON.parse(localStorage.getItem("symptocare_users") || "[]")
      const user = users.find((u) => u.id === this.currentUser.id)
      return user && user.profile.remedyHistory ? user.profile.remedyHistory : []
    }
  }
}

// Initialize history manager
const historyManager = new UserHistoryManager()

// Form validation utilities
const FormValidator = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  required: (value) => {
    return value && value.trim().length > 0
  },

  minLength: (value, min) => {
    return value && value.length >= min
  },

  maxLength: (value, max) => {
    return value && value.length <= max
  },

  phone: (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  },

  showError: (fieldId, message) => {
    const field = document.getElementById(fieldId)
    const errorElement =
      document.getElementById(fieldId + "Error") || field?.parentElement.querySelector(".error-message")

    if (field) {
      field.classList.add("error")
      if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = "block"
      }
    }
  },

  clearError: (fieldId) => {
    const field = document.getElementById(fieldId)
    const errorElement =
      document.getElementById(fieldId + "Error") || field?.parentElement.querySelector(".error-message")

    if (field) {
      field.classList.remove("error")
      if (errorElement) {
        errorElement.style.display = "none"
      }
    }
  },

  validateForm: (formId, rules) => {
    let isValid = true
    const form = document.getElementById(formId)

    if (!form) return false

    Object.keys(rules).forEach((fieldId) => {
      const field = document.getElementById(fieldId)
      const fieldRules = rules[fieldId]

      if (!field) return

      FormValidator.clearError(fieldId)

      const value = field.value

      // Check each rule
      fieldRules.forEach((rule) => {
        if (!isValid) return

        switch (rule.type) {
          case "required":
            if (!FormValidator.required(value)) {
              FormValidator.showError(fieldId, rule.message || "This field is required")
              isValid = false
            }
            break
          case "email":
            if (value && !FormValidator.email(value)) {
              FormValidator.showError(fieldId, rule.message || "Please enter a valid email")
              isValid = false
            }
            break
          case "minLength":
            if (value && !FormValidator.minLength(value, rule.value)) {
              FormValidator.showError(fieldId, rule.message || `Minimum ${rule.value} characters required`)
              isValid = false
            }
            break
          case "maxLength":
            if (value && !FormValidator.maxLength(value, rule.value)) {
              FormValidator.showError(fieldId, rule.message || `Maximum ${rule.value} characters allowed`)
              isValid = false
            }
            break
        }
      })
    })

    return isValid
  },
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeSymptomInput()
  initializeFeedbackForms()
  loadRemediesPage()
  loadSymptomsFromStorage()
  initializeChatbot()
  displayRecentSearches()

  // Initialize user status
  checkUserStatus()
})

function checkUserStatus() {
  const currentUser = JSON.parse(localStorage.getItem("symptocare_current_user") || "null")
  if (currentUser) {
    updateNavigationForUser(currentUser)
  } else {
    showGuestWelcome()
  }
}

function updateNavigationForUser(user) {
  const navMenu = document.querySelector(".nav-menu")
  if (navMenu) {
    // Add user menu
    const userMenuItem = document.createElement("li")
    userMenuItem.innerHTML = `
            <div class="user-menu">
                <span class="user-greeting">Hello, ${user.firstName}</span>
                <div class="user-dropdown">
                    <a href="#" onclick="showUserHistory()">My History</a>
                    <a href="#" onclick="logout()">Logout</a>
                </div>
            </div>
        `
    navMenu.appendChild(userMenuItem)
  }
}

function showGuestWelcome() {
  // Show guest welcome message on home page
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      const guestBanner = document.createElement("div")
      guestBanner.className = "guest-banner"
      guestBanner.innerHTML = `
                <div class="guest-message">
                    <i class="fas fa-user"></i>
                    <span>You're browsing as a guest. <a href="login.html">Sign up</a> to save your health journey!</span>
                </div>
            `
      heroContent.insertBefore(guestBanner, heroContent.firstChild)
    }
  }
}

function displayRecentSearches() {
  const recentSearches = historyManager.getRecentSearches()
  const searchContainer = document.getElementById("recentSearches")

  if (searchContainer && recentSearches.length > 0) {
    searchContainer.innerHTML = `
            <h4><i class="fas fa-history"></i> Recent Searches</h4>
            <div class="recent-searches-list">
                ${recentSearches
                  .map(
                    (search) => `
                    <div class="recent-search-item" onclick="loadPreviousSearch('${JSON.stringify(search.symptoms).replace(/'/g, "\\'")}')">
                        <div class="search-symptoms">
                            ${search.symptoms.join(", ")}
                        </div>
                        <div class="search-date">
                            ${new Date(search.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `
  }
}

function loadPreviousSearch(symptomsJson) {
  try {
    const symptoms = JSON.parse(symptomsJson)
    selectedSymptoms = symptoms
    updateSymptomsDisplay()

    // Navigate to remedies page
    const formData = {
      symptoms: symptoms,
      duration: "",
      severity: "",
      additionalNotes: "Loaded from previous search",
      categories: [],
    }

    localStorage.setItem("symptomData", JSON.stringify(formData))
    window.location.href = "remedies.html"
  } catch (error) {
    console.error("Error loading previous search:", error)
  }
}

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }
}

// Enhanced symptom input functionality
function initializeSymptomInput() {
  const symptomInput = document.getElementById("symptomInput")
  const suggestionsDropdown = document.getElementById("symptomSuggestions")
  const symptomsForm = document.getElementById("symptomsForm")

  if (symptomInput) {
    symptomInput.addEventListener("input", handleSymptomInput)
    symptomInput.addEventListener("keydown", handleSymptomKeydown)

    // Add real-time validation
    symptomInput.addEventListener("blur", () => {
      if (symptomInput.value.trim() && selectedSymptoms.length === 0) {
        FormValidator.showError(
          "symptomInput",
          "Please select at least one symptom from suggestions or press Enter to add",
        )
      } else {
        FormValidator.clearError("symptomInput")
      }
    })
  }

  if (symptomsForm) {
    symptomsForm.addEventListener("submit", handleSymptomsSubmit)
  }

  // Quick add buttons
  document.querySelectorAll(".symptom-quick-add").forEach((button) => {
    button.addEventListener("click", function () {
      const symptom = this.dataset.symptom
      addSymptom(symptom)
    })
  })

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".input-container")) {
      hideSuggestions()
    }
  })
}

function handleSymptomInput(e) {
  const query = e.target.value.toLowerCase().trim()
  const suggestionsDropdown = document.getElementById("symptomSuggestions")

  FormValidator.clearError("symptomInput")

  if (query.length < 2) {
    hideSuggestions()
    return
  }

  const matches = symptomSuggestions.filter(
    (symptom) => symptom.toLowerCase().includes(query) && !selectedSymptoms.includes(symptom),
  )

  if (matches.length > 0) {
    showSuggestions(matches)
  } else {
    hideSuggestions()
  }
}

function handleSymptomKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault()
    const symptom = e.target.value.trim()
    if (symptom) {
      addSymptom(symptom)
      e.target.value = ""
      hideSuggestions()
    }
  }
}

function showSuggestions(suggestions) {
  const dropdown = document.getElementById("symptomSuggestions")
  dropdown.innerHTML = ""

  suggestions.forEach((suggestion) => {
    const item = document.createElement("div")
    item.className = "suggestion-item"
    item.textContent = suggestion
    item.addEventListener("click", () => {
      addSymptom(suggestion)
      document.getElementById("symptomInput").value = ""
      hideSuggestions()
    })
    dropdown.appendChild(item)
  })

  dropdown.style.display = "block"
}

function hideSuggestions() {
  const dropdown = document.getElementById("symptomSuggestions")
  if (dropdown) {
    dropdown.style.display = "none"
  }
}

function addSymptom(symptom) {
  if (!selectedSymptoms.includes(symptom.toLowerCase())) {
    selectedSymptoms.push(symptom.toLowerCase())
    updateSymptomsDisplay()
    saveSymptoms()
    FormValidator.clearError("symptomInput")
  }
}

function removeSymptom(symptom) {
  selectedSymptoms = selectedSymptoms.filter((s) => s !== symptom)
  updateSymptomsDisplay()
  saveSymptoms()
}

function updateSymptomsDisplay() {
  const tagsContainer = document.getElementById("symptomsTags")
  if (!tagsContainer) return

  tagsContainer.innerHTML = ""

  if (selectedSymptoms.length === 0) {
    tagsContainer.innerHTML = '<p style="color: #666; font-style: italic;">No symptoms selected</p>'
    return
  }

  selectedSymptoms.forEach((symptom) => {
    const tag = document.createElement("div")
    tag.className = "symptom-tag"
    tag.innerHTML = `
            ${symptom}
            <span class="remove-symptom" onclick="removeSymptom('${symptom}')">&times;</span>
        `
    tagsContainer.appendChild(tag)
  })
}

function handleSymptomsSubmit(e) {
  e.preventDefault()

  // Validate form
  const isValid = FormValidator.validateForm("symptomsForm", {
    symptomInput: [{ type: "required", message: "Please add at least one symptom" }],
  })

  if (selectedSymptoms.length === 0) {
    FormValidator.showError("symptomInput", "Please select at least one symptom before proceeding.")
    return
  }

  // Save form data
  const formData = {
    symptoms: selectedSymptoms,
    duration: document.getElementById("duration").value,
    severity: document.getElementById("severity").value,
    additionalNotes: document.getElementById("additionalNotes").value,
    categories: Array.from(document.querySelectorAll(".category-filters input:checked")).map((cb) => cb.value),
  }

  localStorage.setItem("symptomData", JSON.stringify(formData))

  // Save to history
  historyManager.saveSymptomSearch(selectedSymptoms)

  // Redirect to remedies page
  window.location.href = "remedies.html"
}

function clearForm() {
  selectedSymptoms = []
  updateSymptomsDisplay()
  document.getElementById("symptomsForm").reset()
  document.querySelectorAll(".category-filters input").forEach((cb) => (cb.checked = false))
  localStorage.removeItem("symptomData")

  // Clear validation errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none"
  })
  document.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error")
  })
}

function saveSymptoms() {
  const existingData = JSON.parse(localStorage.getItem("symptomData") || "{}")
  existingData.symptoms = selectedSymptoms
  localStorage.setItem("symptomData", JSON.stringify(existingData))
}

function loadSymptomsFromStorage() {
  const savedData = localStorage.getItem("symptomData")
  if (savedData) {
    const data = JSON.parse(savedData)
    if (data.symptoms) {
      selectedSymptoms = data.symptoms
      updateSymptomsDisplay()
    }
  }
}

// Enhanced remedies page functionality
function loadRemediesPage() {
  if (!window.location.pathname.includes("remedies.html")) return

  const savedData = localStorage.getItem("symptomData")
  const symptomsDisplay = document.getElementById("symptomsDisplay")
  const remediesContainer = document.getElementById("remediesContainer")
  const noRemedies = document.getElementById("noRemedies")

  // Always show default remedies first
  displayDefaultRemedies()

  if (!savedData) {
    displaySymptomsSummary([])
    return
  }

  const data = JSON.parse(savedData)

  if (!data.symptoms || data.symptoms.length === 0) {
    displaySymptomsSummary([])
    return
  }

  // Display symptoms
  displaySymptomsSummary(data.symptoms)

  // Generate and display personalized remedies
  const remedies = generateRemedies(data.symptoms)
  displayPersonalizedRemedies(remedies)
}

function displayDefaultRemedies() {
  const defaultContainer = document.getElementById("defaultRemediesContainer") || createDefaultRemediesContainer()

  defaultContainer.innerHTML = `
        <div class="remedies-section-header">
            <h2><i class="fas fa-star"></i> Popular Remedies for Everyone</h2>
            <p>Discover these time-tested natural remedies that promote overall wellness</p>
        </div>
        <div class="default-remedies-grid">
            ${defaultRemedies.map((remedy, index) => createRemedyCardHTML(remedy, index, "default")).join("")}
        </div>
    `
}

function createDefaultRemediesContainer() {
  const container = document.createElement("div")
  container.id = "defaultRemediesContainer"
  container.className = "default-remedies-container"

  const remediesPage = document.querySelector(".remedies-page .container")
  if (remediesPage) {
    const pageHeader = remediesPage.querySelector(".page-header")
    if (pageHeader) {
      pageHeader.insertAdjacentElement("afterend", container)
    } else {
      remediesPage.insertBefore(container, remediesPage.firstChild)
    }
  }

  return container
}

function displaySymptomsSummary(symptoms) {
  const symptomsDisplay = document.getElementById("symptomsDisplay")
  if (!symptomsDisplay) return

  if (symptoms.length === 0) {
    symptomsDisplay.innerHTML =
      '<p style="color: #666; font-style: italic;">Browse our popular remedies below or <a href="symptoms.html">add your symptoms</a> for personalized suggestions</p>'
    return
  }

  symptomsDisplay.innerHTML = ""
  symptoms.forEach((symptom) => {
    const tag = document.createElement("span")
    tag.className = "symptom-tag"
    tag.textContent = symptom
    symptomsDisplay.appendChild(tag)
  })
}

function generateRemedies(symptoms) {
  const remedies = []

  symptoms.forEach((symptom) => {
    if (remedyDatabase[symptom]) {
      remedies.push(...remedyDatabase[symptom])
    }
  })

  // Remove duplicates
  const uniqueRemedies = remedies.filter(
    (remedy, index, self) => index === self.findIndex((r) => r.title === remedy.title),
  )

  return uniqueRemedies
}

function displayPersonalizedRemedies(remedies) {
  let personalizedContainer = document.getElementById("personalizedRemediesContainer")

  if (!personalizedContainer) {
    personalizedContainer = document.createElement("div")
    personalizedContainer.id = "personalizedRemediesContainer"
    personalizedContainer.className = "personalized-remedies-container"

    const defaultContainer = document.getElementById("defaultRemediesContainer")
    if (defaultContainer) {
      defaultContainer.insertAdjacentElement("afterend", personalizedContainer)
    }
  }

  if (remedies.length === 0) {
    personalizedContainer.innerHTML = `
            <div class="remedies-section-header">
                <h2><i class="fas fa-user-md"></i> No Specific Remedies Found</h2>
                <p>We couldn't find specific remedies for your symptoms, but the general wellness remedies above may still help!</p>
            </div>
        `
    return
  }

  personalizedContainer.innerHTML = `
        <div class="remedies-section-header">
            <h2><i class="fas fa-user-md"></i> Personalized Remedies for Your Symptoms</h2>
            <p>Based on your specific symptoms, here are targeted natural remedies</p>
        </div>
        <div class="personalized-remedies-grid">
            ${remedies.map((remedy, index) => createRemedyCardHTML(remedy, index, "personalized")).join("")}
        </div>
    `
}

function createRemedyCardHTML(remedy, index, type) {
  const instructionsList = remedy.instructions.map((instruction) => `<li>${instruction}</li>`).join("")

  const tagsList = remedy.tags.map((tag) => `<span class="remedy-tag">${tag}</span>`).join("")

  const cautionSection = remedy.caution
    ? `
        <div class="remedy-caution">
            <h4><i class="fas fa-exclamation-triangle"></i> Caution</h4>
            <p>${remedy.caution}</p>
        </div>
    `
    : ""

  return `
        <div class="remedy-card" data-remedy-type="${type}">
            <div class="remedy-header">
                <div class="remedy-icon">
                    <i class="${remedy.icon}"></i>
                </div>
                <h3 class="remedy-title">${remedy.title}</h3>
            </div>
            
            <p class="remedy-description">${remedy.description}</p>
            
            <div class="remedy-instructions">
                <h4><i class="fas fa-list-ol"></i> Instructions</h4>
                <ol>${instructionsList}</ol>
            </div>
            
            ${cautionSection}
            
            <div class="remedy-tags">${tagsList}</div>
            
            <div class="remedy-actions">
                <div class="remedy-rating">
                    <div class="stars">
                        ${"★".repeat(Math.floor(remedy.rating))}${"☆".repeat(5 - Math.floor(remedy.rating))}
                    </div>
                    <span>${remedy.rating} (${remedy.reviews} reviews)</span>
                </div>
                <div class="remedy-buttons">
                    <button class="btn btn-secondary btn-small" onclick="rateRemedy('${remedy.title}')">
                        <i class="fas fa-star"></i> Rate This
                    </button>
                    <button class="btn btn-primary btn-small" onclick="markRemedyTried('${remedy.title}')">
                        <i class="fas fa-check"></i> I Tried This
                    </button>
                </div>
            </div>
        </div>
    `
}

function rateRemedy(remedyTitle) {
  // Store the remedy title for feedback
  localStorage.setItem("selectedRemedy", remedyTitle)
  historyManager.saveRemedyInteraction(remedyTitle, "viewed")
  window.location.href = "feedback.html"
}

function markRemedyTried(remedyTitle) {
  historyManager.saveRemedyInteraction(remedyTitle, "tried")

  // Show success message
  const notification = document.createElement("div")
  notification.className = "remedy-notification"
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Great! We've noted that you tried "${remedyTitle}". How did it work for you?</span>
            <button onclick="rateRemedy('${remedyTitle}')" class="btn btn-small btn-primary">Rate It</button>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-small btn-secondary">Close</button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 10000)
}

// Chatbot functionality
function initializeChatbot() {
  createChatbotInterface()
  initializeChatbotEvents()
}

function createChatbotInterface() {
  const chatbotHTML = `
        <div id="chatbot-container" class="chatbot-container">
            <div id="chatbot-toggle" class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge">AI</span>
            </div>
            
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <i class="fas fa-robot"></i>
                        <span>SymptoCare AI Assistant</span>
                    </div>
                    <button id="chatbot-close" class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="chatbot-message bot-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Hello! I'm your AI health assistant. Tell me about your symptoms and I'll suggest natural remedies to help you feel better.</p>
                            <div class="quick-actions">
                                <button class="quick-action" onclick="sendQuickMessage('I have a headache')">I have a headache</button>
                                <button class="quick-action" onclick="sendQuickMessage('I feel nauseous')">I feel nauseous</button>
                                <button class="quick-action" onclick="sendQuickMessage('I can\\'t sleep')">I can't sleep</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Describe your symptoms..." maxlength="500">
                    <button id="chatbot-send" class="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="chatbot-typing" id="chatbot-typing" style="display: none;">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span>AI is thinking...</span>
                </div>
            </div>
        </div>
    `

  document.body.insertAdjacentHTML("beforeend", chatbotHTML)
}

function initializeChatbotEvents() {
  const chatbotToggle = document.getElementById("chatbot-toggle")
  const chatbotWindow = document.getElementById("chatbot-window")
  const chatbotClose = document.getElementById("chatbot-close")
  const chatbotInput = document.getElementById("chatbot-input")
  const chatbotSend = document.getElementById("chatbot-send")

  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active")
    if (chatbotWindow.classList.contains("active")) {
      chatbotInput.focus()
    }
  })

  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active")
  })

  chatbotSend.addEventListener("click", sendChatMessage)

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendChatMessage()
    }
  })

  // Auto-resize input
  chatbotInput.addEventListener("input", (e) => {
    e.target.style.height = "auto"
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"
  })
}

function sendQuickMessage(message) {
  document.getElementById("chatbot-input").value = message
  sendChatMessage()
}

async function sendChatMessage() {
  const input = document.getElementById("chatbot-input")
  const message = input.value.trim()

  if (!message) return

  // Add user message
  addChatMessage(message, "user")
  input.value = ""
  input.style.height = "auto"

  // Show typing indicator
  showTypingIndicator()

  // Process message and get response
  setTimeout(
    () => {
      const response = processChatMessage(message)
      hideTypingIndicator()
      addChatMessage(response.text, "bot", response.actions)
    },
    1500 + Math.random() * 1000,
  ) // Simulate thinking time
}

function addChatMessage(message, sender, actions = null) {
  const messagesContainer = document.getElementById("chatbot-messages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `chatbot-message ${sender}-message`

  if (sender === "user") {
    messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `
  } else {
    const actionsHTML = actions
      ? `
            <div class="message-actions">
                ${actions
                  .map(
                    (action) => `
                    <button class="action-btn" onclick="${action.onclick}">
                        <i class="${action.icon}"></i> ${action.text}
                    </button>
                `,
                  )
                  .join("")}
            </div>
        `
      : ""

    messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                ${actionsHTML}
            </div>
        `
  }

  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function processChatMessage(message) {
  const lowerMessage = message.toLowerCase()

  // Extract symptoms from message
  const detectedSymptoms = symptomSuggestions.filter((symptom) => lowerMessage.includes(symptom.toLowerCase()))

  if (detectedSymptoms.length > 0) {
    const remedies = []
    detectedSymptoms.forEach((symptom) => {
      if (remedyDatabase[symptom]) {
        remedies.push(...remedyDatabase[symptom].slice(0, 2)) // Limit to 2 per symptom
      }
    })

    if (remedies.length > 0) {
      const remedy = remedies[0] // Show first remedy
      return {
        text: `I understand you're experiencing ${detectedSymptoms.join(", ")}. Here's a natural remedy that might help: **${remedy.title}** - ${remedy.description}`,
        actions: [
          {
            text: "View Full Instructions",
            icon: "fas fa-list",
            onclick: `showRemedyDetails('${remedy.title}')`,
          },
          {
            text: "See More Remedies",
            icon: "fas fa-search",
            onclick: `searchForSymptoms(['${detectedSymptoms.join("','")}'])`,
          },
        ],
      }
    }
  }

  // Handle general health questions
  if (lowerMessage.includes("how") && (lowerMessage.includes("feel better") || lowerMessage.includes("improve"))) {
    return {
      text: "Here are some general wellness tips: Stay hydrated, get adequate sleep, eat nutritious foods, exercise regularly, and manage stress. Would you like specific remedies for any symptoms you're experiencing?",
      actions: [
        {
          text: "Browse Popular Remedies",
          icon: "fas fa-star",
          onclick: "window.location.href='remedies.html'",
        },
      ],
    }
  }

  // Default response
  return {
    text: "I'd be happy to help! Could you be more specific about your symptoms? For example, you could say 'I have a headache' or 'I feel tired and nauseous'.",
    actions: [
      {
        text: "Use Symptom Form",
        icon: "fas fa-form",
        onclick: "window.location.href='symptoms.html'",
      },
    ],
  }
}

function showRemedyDetails(remedyTitle) {
  // Find the remedy and show detailed modal
  let remedy = null

  // Search in all remedy databases
  Object.values(remedyDatabase).forEach((remedyList) => {
    const found = remedyList.find((r) => r.title === remedyTitle)
    if (found) remedy = found
  })

  if (!remedy) {
    remedy = defaultRemedies.find((r) => r.title === remedyTitle)
  }

  if (remedy) {
    showRemedyModal(remedy)
  }
}

function showRemedyModal(remedy) {
  const modal = document.createElement("div")
  modal.className = "remedy-modal"
  modal.innerHTML = `
        <div class="remedy-modal-content">
            <div class="remedy-modal-header">
                <h2><i class="${remedy.icon}"></i> ${remedy.title}</h2>
                <button class="remedy-modal-close" onclick="this.closest('.remedy-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="remedy-modal-body">
                <p class="remedy-description">${remedy.description}</p>
                
                <div class="remedy-instructions">
                    <h3><i class="fas fa-list-ol"></i> Instructions</h3>
                    <ol>
                        ${remedy.instructions.map((instruction) => `<li>${instruction}</li>`).join("")}
                    </ol>
                </div>
                
                ${
                  remedy.caution
                    ? `
                    <div class="remedy-caution">
                        <h3><i class="fas fa-exclamation-triangle"></i> Caution</h3>
                        <p>${remedy.caution}</p>
                    </div>
                `
                    : ""
                }
                
                <div class="remedy-tags">
                    ${remedy.tags.map((tag) => `<span class="remedy-tag">${tag}</span>`).join("")}
                </div>
            </div>
            <div class="remedy-modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.remedy-modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="markRemedyTried('${remedy.title}'); this.closest('.remedy-modal').remove();">
                    <i class="fas fa-check"></i> I'll Try This
                </button>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

function searchForSymptoms(symptoms) {
  selectedSymptoms = symptoms
  const formData = {
    symptoms: symptoms,
    duration: "",
    severity: "",
    additionalNotes: "From AI chat",
    categories: [],
  }

  localStorage.setItem("symptomData", JSON.stringify(formData))
  historyManager.saveSymptomSearch(symptoms)
  window.location.href = "remedies.html"
}

function showTypingIndicator() {
  document.getElementById("chatbot-typing").style.display = "flex"
  const messagesContainer = document.getElementById("chatbot-messages")
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function hideTypingIndicator() {
  document.getElementById("chatbot-typing").style.display = "none"
}

// Feedback functionality (enhanced)
function initializeFeedbackForms() {
  if (!window.location.pathname.includes("feedback.html")) return

  // Initialize star ratings
  initializeStarRatings()

  // Initialize form submissions with validation
  const forms = [
    {
      id: "remedyFeedbackForm",
      rules: {
        remedySelect: [{ type: "required", message: "Please select a remedy" }],
      },
    },
    {
      id: "reportIssueForm",
      rules: {
        issueType: [{ type: "required", message: "Please select issue type" }],
        issueDescription: [
          { type: "required", message: "Please describe the issue" },
          { type: "minLength", value: 10, message: "Please provide more details (minimum 10 characters)" },
        ],
      },
    },
    {
      id: "generalFeedbackForm",
      rules: {
        improvements: [{ type: "maxLength", value: 1000, message: "Maximum 1000 characters allowed" }],
        newFeatures: [{ type: "maxLength", value: 1000, message: "Maximum 1000 characters allowed" }],
      },
    },
  ]

  forms.forEach((formConfig) => {
    const form = document.getElementById(formConfig.id)
    if (form) {
      form.addEventListener("submit", (e) => handleFeedbackSubmit(e, formConfig.rules))
    }
  })

  // Load selected remedy if coming from remedies page
  const selectedRemedy = localStorage.getItem("selectedRemedy")
  if (selectedRemedy) {
    const remedySelect = document.getElementById("remedySelect")
    if (remedySelect) {
      // Add the selected remedy as an option if it doesn't exist
      const existingOption = Array.from(remedySelect.options).find((option) =>
        option.textContent.includes(selectedRemedy),
      )
      if (!existingOption) {
        const option = document.createElement("option")
        option.value = selectedRemedy.toLowerCase().replace(/\s+/g, "-")
        option.textContent = selectedRemedy
        remedySelect.appendChild(option)
      }
      remedySelect.value = selectedRemedy.toLowerCase().replace(/\s+/g, "-")
    }
    localStorage.removeItem("selectedRemedy")
  }
}

function initializeStarRatings() {
  document.querySelectorAll(".star-rating").forEach((rating) => {
    const stars = rating.querySelectorAll("i")
    const ratingId = rating.id

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        const ratingValue = index + 1
        currentRatings[ratingId.replace("Rating", "")] = ratingValue

        // Update visual state
        stars.forEach((s, i) => {
          if (i < ratingValue) {
            s.classList.add("active")
          } else {
            s.classList.remove("active")
          }
        })

        // Update rating text
        const ratingText = rating.parentElement.querySelector(".rating-text")
        if (ratingText) {
          ratingText.textContent = `${ratingValue} star${ratingValue !== 1 ? "s" : ""}`
        }
      })

      star.addEventListener("mouseenter", () => {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.style.color = "#ffc107"
          } else {
            s.style.color = "#ddd"
          }
        })
      })
    })

    rating.addEventListener("mouseleave", () => {
      const currentRating = currentRatings[ratingId.replace("Rating", "")] || 0
      stars.forEach((s, i) => {
        if (i < currentRating) {
          s.style.color = "#ffc107"
        } else {
          s.style.color = "#ddd"
        }
      })
    })
  })
}

function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active")
  })

  // Show selected tab content
  const selectedTab = document.getElementById(tabName)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Add active class to clicked button
  event.target.classList.add("active")

  // Clear form validation errors when switching tabs
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none"
  })
  document.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error")
  })
}

function handleFeedbackSubmit(e, validationRules = {}) {
  e.preventDefault()

  const formId = e.target.id

  // Validate form if rules provided
  if (Object.keys(validationRules).length > 0) {
    const isValid = FormValidator.validateForm(formId, validationRules)
    if (!isValid) {
      return
    }
  }

  let feedbackData = {}

  // Collect form data based on form type
  switch (formId) {
    case "remedyFeedbackForm":
      feedbackData = {
        type: "remedy_feedback",
        remedy: document.getElementById("remedySelect").value,
        effectiveness: currentRatings.effectiveness || 0,
        ease: currentRatings.ease || 0,
        comments: document.getElementById("remedyComments").value,
        wouldRecommend: document.getElementById("wouldRecommend").checked,
        timestamp: new Date().toISOString(),
      }

      // Save to history
      historyManager.saveRemedyInteraction(
        document.getElementById("remedySelect").selectedOptions[0].text,
        "rated",
        currentRatings.effectiveness,
      )
      break

    case "reportIssueForm":
      feedbackData = {
        type: "issue_report",
        issueType: document.getElementById("issueType").value,
        description: document.getElementById("issueDescription").value,
        symptoms: document.getElementById("symptomsReported").value,
        remedy: document.getElementById("remedySuggested").value,
        urgent: document.getElementById("urgentIssue").checked,
        timestamp: new Date().toISOString(),
      }
      break

    case "generalFeedbackForm":
      feedbackData = {
        type: "general_feedback",
        overallRating: currentRatings.overall || 0,
        favoriteFeature: document.getElementById("favoriteFeature").value,
        improvements: document.getElementById("improvements").value,
        newFeatures: document.getElementById("newFeatures").value,
        wouldRecommend: document.getElementById("recommendApp").checked,
        timestamp: new Date().toISOString(),
      }
      break
  }

  // Simulate feedback submission
  console.log("Feedback submitted:", feedbackData)

  // Save feedback to local storage
  const existingFeedback = JSON.parse(localStorage.getItem("symptocare_feedback") || "[]")
  existingFeedback.push(feedbackData)
  localStorage.setItem("symptocare_feedback", JSON.stringify(existingFeedback))

  // Show success message
  showFeedbackSuccess()
}

function showFeedbackSuccess() {
  document.querySelector(".feedback-container").style.display = "none"
  document.getElementById("feedbackSuccess").style.display = "block"
}

function resetFeedbackForm() {
  document.querySelector(".feedback-container").style.display = "block"
  document.getElementById("feedbackSuccess").style.display = "none"

  // Reset all forms
  document.querySelectorAll(".feedback-form").forEach((form) => form.reset())

  // Reset ratings
  currentRatings = { effectiveness: 0, ease: 0, overall: 0 }

  // Reset star displays
  document.querySelectorAll(".star-rating i").forEach((star) => {
    star.classList.remove("active")
    star.style.color = "#ddd"
  })

  // Reset rating texts
  document.querySelectorAll(".rating-text").forEach((text) => {
    text.textContent = "Click to rate"
  })

  // Clear validation errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none"
  })
  document.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error")
  })

  // Switch back to first tab
  switchTab("remedy-feedback")
}

// User history functions
function showUserHistory() {
  const modal = document.createElement("div")
  modal.className = "history-modal"
  modal.innerHTML = `
        <div class="history-modal-content">
            <div class="history-modal-header">
                <h2><i class="fas fa-history"></i> Your Health Journey</h2>
                <button class="history-modal-close" onclick="this.closest('.history-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="history-modal-body">
                <div class="history-tabs">
                    <button class="history-tab active" onclick="showHistoryTab('searches')">
                        <i class="fas fa-search"></i> Recent Searches
                    </button>
                    <button class="history-tab" onclick="showHistoryTab('remedies')">
                        <i class="fas fa-pills"></i> Remedy History
                    </button>
                </div>
                
                <div id="history-searches" class="history-tab-content active">
                    ${generateSearchHistoryHTML()}
                </div>
                
                <div id="history-remedies" class="history-tab-content">
                    ${generateRemedyHistoryHTML()}
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

function generateSearchHistoryHTML() {
  const searches = historyManager.getRecentSearches(10)

  if (searches.length === 0) {
    return '<p class="no-history">No search history found. Start by describing your symptoms!</p>'
  }

  return `
        <div class="history-list">
            ${searches
              .map(
                (search) => `
                <div class="history-item">
                    <div class="history-item-header">
                        <div class="history-symptoms">
                            ${search.symptoms.map((symptom) => `<span class="symptom-tag">${symptom}</span>`).join("")}
                        </div>
                        <div class="history-date">
                            ${new Date(search.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                    <div class="history-actions">
                        <button class="btn btn-small btn-secondary" onclick="loadPreviousSearch('${JSON.stringify(search.symptoms).replace(/'/g, "\\'")}')">
                            <i class="fas fa-redo"></i> Search Again
                        </button>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `
}

function generateRemedyHistoryHTML() {
  const remedyHistory = historyManager.getRemedyHistory()

  if (remedyHistory.length === 0) {
    return '<p class="no-history">No remedy history found. Try some remedies and rate them!</p>'
  }

  return `
        <div class="history-list">
            ${remedyHistory
              .map(
                (interaction) => `
                <div class="history-item">
                    <div class="history-item-header">
                        <div class="remedy-name">${interaction.remedyTitle}</div>
                        <div class="history-date">
                            ${new Date(interaction.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                    <div class="interaction-details">
                        <span class="interaction-type">${interaction.action}</span>
                        ${interaction.rating ? `<span class="interaction-rating">${"★".repeat(interaction.rating)}${"☆".repeat(5 - interaction.rating)}</span>` : ""}
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `
}

function showHistoryTab(tabName) {
  // Remove active class from all tabs
  document.querySelectorAll(".history-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Hide all tab contents
  document.querySelectorAll(".history-tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(`history-${tabName}`).classList.add("active")
  event.target.classList.add("active")
}

function logout() {
  localStorage.removeItem("symptocare_current_user")
  localStorage.removeItem("symptocare_remember_user")
  window.location.href = "index.html"
}

// Utility functions
function showLoading(element) {
  element.innerHTML = '<div class="loading"></div>'
}

function hideLoading(element) {
  element.innerHTML = ""
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-card, .remedy-card, .stat-item")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateOnScroll)

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Service worker registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker registration would go here
    console.log("Service worker support detected")
  })
}
