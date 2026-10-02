import { useState } from "react"
import {
  FaHandsHelping,
  FaLeaf,
  FaUsers,
  FaChevronDown,
} from "react-icons/fa"

import joinTeamImage from "../assets/images/services/jointeam.jpg"

// ================= COUNTRY =================
const countries = [
  {
    name: "India",
    code: "+91",
  },
]

// ================= STATES & CITIES =================
const locations = {
  India: {
    Punjab: [
      "Amritsar",
      "Jalandhar",
      "Ludhiana",
      "Patiala",
    ],

    Haryana: [
      "Gurugram",
      "Faridabad",
      "Panipat",
      "Ambala",
    ],

    "Himachal Pradesh": [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Solan",
    ],

    Delhi: [
      "New Delhi",
      "Delhi",
    ],

    "Uttar Pradesh": [
      "Lucknow",
      "Agra",
      "Kanpur",
      "Varanasi",
    ],

    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
    ],

    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
    ],

    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
    ],

    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubballi",
    ],

    "West Bengal": [
      "Kolkata",
      "Darjeeling",
      "Siliguri",
      "Howrah",
    ],

    Kerala: [
      "Kochi",
      "Thiruvananthapuram",
      "Kozhikode",
      "Thrissur",
    ],
  },
}

// ================= COMPONENT =================
function JoinTeam() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    country: "India",
    state: "",
    city: "",
    interest: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  // ================= HANDLE COUNTRY =================
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value

    const countryData = countries.find(
      (country) => country.name === selectedCountry
    )

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      countryCode: countryData?.code || "+91",
      state: "",
      city: "",
    }))

    setErrors((prev) => ({
      ...prev,
      country: "",
      state: "",
      city: "",
    }))
  }

  // ================= HANDLE STATE =================
  const handleStateChange = (e) => {
    const selectedState = e.target.value

    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
    }))

    setErrors((prev) => ({
      ...prev,
      state: "",
      city: "",
    }))
  }

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name."
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters."
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can contain letters and spaces only."
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address."
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number."
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number."
    }

    if (!formData.country) {
      newErrors.country = "Please select your country."
    }

    if (!formData.state) {
      newErrors.state = "Please select your state."
    }

    if (!formData.city) {
      newErrors.city = "Please select your city."
    }

    if (!formData.interest) {
      newErrors.interest =
        "Please select your area of interest."
    }

    if (!formData.message.trim()) {
      newErrors.message =
        "Please tell us why you want to join."
    } else if (formData.message.trim().length < 20) {
      newErrors.message =
        "Message must be at least 20 characters."
    } else if (formData.message.trim().length > 500) {
      newErrors.message =
        "Message cannot exceed 500 characters."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log("Volunteer Application:", formData)

    setSubmitted(true)

    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      country: "India",
      state: "",
      city: "",
      interest: "",
      message: "",
    })

    setErrors({})

    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <div className="min-w-0 bg-green-50">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section
        className="relative bg-green-950 bg-cover bg-center px-6 py-20 text-white"
        style={{
          backgroundImage: `url(${joinTeamImage})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-300">
            Join the Mission
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            Become a Voice for Wildlife
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-100">
            Join WildGuard India and help protect wildlife,
            restore natural habitats, and build a future where
            people and nature can thrive together.
          </p>

        </div>
      </section>

      {/* =====================================================
          BENEFITS SECTION
      ====================================================== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
              Why Join Us
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Make a Meaningful Difference
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Your time, skills, and passion can contribute to
              real conservation efforts.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                <FaHandsHelping />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Make an Impact
              </h3>

              <p className="leading-relaxed text-gray-600">
                Contribute your time and skills to wildlife
                conservation and environmental initiatives.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                <FaLeaf />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Protect Nature
              </h3>

              <p className="leading-relaxed text-gray-600">
                Support projects focused on protecting habitats,
                biodiversity, and endangered species.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                <FaUsers />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Join a Community
              </h3>

              <p className="leading-relaxed text-gray-600">
                Connect with people who share your passion for
                wildlife and environmental conservation.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FORM SECTION
      ====================================================== */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl bg-white p-6 shadow-lg md:p-10">

            {/* Form Header */}
            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
                Volunteer Application
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Join the WildGuard Team
              </h2>

              <p className="mt-3 text-gray-600">
                Tell us a little about yourself and how you would
                like to contribute.
              </p>

            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="mt-0.5 text-xl text-green-700">
                    ✓
                  </div>

                  <div>

                    <h3 className="font-semibold text-green-800">
                      Application Submitted!
                    </h3>

                    <p className="mt-1 text-sm text-green-700">
                      Thank you for joining WildGuard India.
                      We appreciate your interest in wildlife
                      conservation.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME + EMAIL */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}

                </div>

              </div>

              {/* COUNTRY + PHONE */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* Country */}
                <div>

                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Country{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                        errors.country
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="India">
                        India
                      </option>
                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  </div>

                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}

                </div>

                {/* Phone Number */}
                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`flex w-full overflow-hidden rounded-xl border bg-white transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-100 ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >

                    {/* Country Code */}
                    <div className="relative flex w-[78px] shrink-0 items-center border-r border-gray-200 bg-gray-50">

                      <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="h-full w-full appearance-none bg-transparent px-3 py-3 text-sm font-semibold text-gray-700 outline-none"
                      >
                        <option value="+91">
                          +91
                        </option>
                      </select>

                      <FaChevronDown className="pointer-events-none absolute right-2 text-[10px] text-gray-400" />

                    </div>

                    {/* Phone Input */}
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      maxLength="10"
                      inputMode="numeric"
                      className="min-w-0 flex-1 px-4 py-3 text-gray-700 outline-none placeholder:text-gray-400"
                    />

                  </div>

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}

                </div>

              </div>

              {/* STATE + CITY */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* State */}
                <div>

                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    State{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                        errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select your state
                      </option>

                      {Object.keys(
                        locations[formData.country] || {}
                      ).map((state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      ))}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  </div>

                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.state}
                    </p>
                  )}

                </div>

                {/* City */}
                <div>

                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    City{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.state}
                      className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select your city
                      </option>

                      {(
                        locations[formData.country]?.[
                          formData.state
                        ] || []
                      ).map((city) => (
                        <option
                          key={city}
                          value={city}
                        >
                          {city}
                        </option>
                      ))}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  </div>

                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city}
                    </p>
                  )}

                </div>

              </div>

              {/* AREA OF INTEREST */}
              <div>

                <label
                  htmlFor="interest"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Area of Interest{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                      errors.interest
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">
                      Select your area of interest
                    </option>

                    <option value="Wildlife Conservation">
                      Wildlife Conservation
                    </option>

                    <option value="Habitat Restoration">
                      Habitat Restoration
                    </option>

                    <option value="Community Outreach">
                      Community Outreach
                    </option>

                    <option value="Education">
                      Education & Awareness
                    </option>

                    <option value="Research">
                      Research & Data
                    </option>

                    <option value="Digital & Technology">
                      Digital & Technology
                    </option>

                    <option value="Events">
                      Events & Campaigns
                    </option>

                  </select>

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                </div>

                {errors.interest && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.interest}
                  </p>
                )}

              </div>

              {/* MESSAGE */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Why do you want to join us?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {formData.message.length}/500
                  </span>

                </div>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  maxLength="500"
                  placeholder="Tell us about your interests, skills, or how you would like to contribute..."
                  className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}

              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">

                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-800 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Submit Volunteer Application
                </button>

              </div>

              {/* Privacy Text */}
              <p className="text-center text-xs leading-relaxed text-gray-500">
                By submitting this form, you agree to be contacted
                regarding your volunteer application and WildGuard
                India activities.
              </p>

            </form>

          </div>

        </div>
      </section>

    </div>
  )
}

export default JoinTeam