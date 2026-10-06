import { useState } from "react"

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaChevronDown,
  FaLeaf,
} from "react-icons/fa"

import contactUsImage from "../assets/images/services/contactus.jpg"

function Contact() {
  // ================= FORM DATA =================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // ================= STATES =================

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }))
  }

  // ================= VALIDATION =================

  const validateForm = () => {
    const newErrors = {}

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name."
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters."
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can contain letters and spaces only."
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address."
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address."
    }

    // Subject
    if (!formData.subject) {
      newErrors.subject = "Please select a subject."
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message."
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters."
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message cannot exceed 500 characters."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit contact message."
        )
      }

      console.log("Contact Form:", data.contact)

      setSubmitted(true)

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setErrors({})

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error(
        "Contact submission failed:",
        error
      )

      setErrors({
        submit:
          "Unable to send your message. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-green-50">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section
        className="relative bg-green-950 bg-cover bg-center px-6 py-20 text-white"
        style={{
          backgroundImage: `url(${contactUsImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-300">
            Get in Touch
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            Contact WildGuard
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-100">
            Have a question, want to collaborate, or need more information?
            We would love to hear from you.
          </p>

        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
              Reach Out
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              We Are Here to Help
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Connect with the WildGuard India team for questions,
              partnerships, volunteering, or conservation initiatives.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Address */}

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <FaMapMarkerAlt />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Our Location
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                India
              </p>

            </div>

            {/* Email */}

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <FaEnvelope />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Email Us
              </h3>

              <p className="break-words text-sm leading-relaxed text-gray-600">
                hello@wildguardindia.org
              </p>

            </div>

            {/* Phone */}

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <FaPhoneAlt />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Call Us
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                +91 98765 43210
              </p>

            </div>

            {/* Hours */}

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <FaClock />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Working Hours
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Mon - Fri
                <br />
                9:00 AM - 6:00 PM
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT FORM + LOCATION
      ====================================================== */}

      <section className="px-6 pb-20">

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">

          {/* =================================================
              CONTACT FORM
          ================================================== */}

          <div className="rounded-3xl bg-white p-6 shadow-lg md:p-10 lg:col-span-3">

            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <FaLeaf />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
                Send a Message
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Let's Connect
              </h2>

              <p className="mt-3 text-gray-600">
                Fill out the form and our team will get back to you.
              </p>

            </div>

            {/* Backend Error */}

            {errors.submit && (
              <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="mt-0.5 text-xl text-red-600">
                    !
                  </div>

                  <div>

                    <h3 className="font-semibold text-red-800">
                      Message Could Not Be Sent
                    </h3>

                    <p className="mt-1 text-sm text-red-700">
                      {errors.submit}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* Success Message */}

            {submitted && (
              <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="mt-0.5 text-xl text-green-700">
                    ✓
                  </div>

                  <div>

                    <h3 className="font-semibold text-green-800">
                      Message Sent Successfully!
                    </h3>

                    <p className="mt-1 text-sm text-green-700">
                      Thank you for contacting WildGuard India.
                      We will get back to you soon.
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

              {/* Name + Email */}

              <div className="grid gap-6 md:grid-cols-2">

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
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

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
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

              {/* Subject */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 ${
                      errors.subject
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >

                    <option value="">
                      Select a subject
                    </option>

                    <option value="General Inquiry">
                      General Inquiry
                    </option>

                    <option value="Volunteer">
                      Volunteer Opportunities
                    </option>

                    <option value="Partnership">
                      Partnership
                    </option>

                    <option value="Wildlife Conservation">
                      Wildlife Conservation
                    </option>

                    <option value="Programs">
                      Conservation Programs
                    </option>

                    <option value="Media">
                      Media & Press
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                </div>

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject}
                  </p>
                )}

              </div>

              {/* Message */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-gray-700">
                    Message{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {formData.message.length}/500
                  </span>

                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  maxLength="500"
                  placeholder="Write your message here..."
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

              {/* Submit */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-green-800 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Sending Message..."
                  : "Send Message"}
              </button>

            </form>

          </div>

          {/* =================================================
              LOCATION / ABOUT CARD
          ================================================== */}

          <div className="flex flex-col overflow-hidden rounded-3xl bg-green-950 text-white shadow-lg lg:col-span-2">

            {/* Map Placeholder */}

            <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden bg-green-900">

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-green-700 opacity-40" />

              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-green-700 opacity-40" />

              <div className="relative z-10 text-center">

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-800 text-3xl text-green-200">
                  <FaMapMarkerAlt />
                </div>

                <h3 className="mb-2 text-2xl font-bold">
                  WildGuard India
                </h3>

                <p className="text-green-200">
                  India
                </p>

              </div>

            </div>

            {/* Location Information */}

            <div className="p-8">

              <h3 className="mb-4 text-2xl font-bold">
                Let's Protect Wildlife Together
              </h3>

              <p className="mb-6 leading-relaxed text-green-100">
                Whether you are interested in volunteering,
                conservation programs, partnerships, or simply
                learning more about wildlife, our team is ready
                to connect with you.
              </p>

              {/* Email */}

              <div className="mb-4 flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-800 text-green-200">
                  <FaEnvelope />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-green-300">
                    Email
                  </p>

                  <p className="text-sm text-white">
                    hello@wildguardindia.org
                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-800 text-green-200">
                  <FaPhoneAlt />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-green-300">
                    Phone
                  </p>

                  <p className="text-sm text-white">
                    +91 98765 43210
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ SECTION
      ====================================================== */}

      <FaqSection />

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
            Together We Can
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Every Conversation Can Create Change
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">
            Wildlife conservation starts with people who care.
            Reach out today and become part of the movement to
            protect India's incredible biodiversity.
          </p>

        </div>

      </section>

    </div>
  )
}

// =====================================================
// FAQ SECTION
// =====================================================

function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: "How can I volunteer with WildGuard India?",
      answer:
        "You can join our conservation efforts by completing the Join Team form. Tell us about your interests and skills, and our team can guide you toward suitable opportunities.",
    },
    {
      question: "Can I collaborate with WildGuard India?",
      answer:
        "Yes. We welcome partnerships with individuals, organizations, educational institutions, and other groups interested in wildlife and environmental conservation.",
    },
    {
      question: "How can I support wildlife conservation?",
      answer:
        "You can support conservation by volunteering, spreading awareness, participating in environmental initiatives, supporting responsible tourism, and helping protect natural habitats.",
    },
    {
      question: "Does WildGuard India organize conservation programs?",
      answer:
        "Yes. Our programs section highlights conservation initiatives focused on wildlife protection, habitat restoration, biodiversity, and community participation.",
    },
    {
      question: "How can I contact the WildGuard team?",
      answer:
        "You can use the contact form on this page to send us your question, partnership request, or other message. Our team will review your submission and respond as appropriate.",
    },
  ]

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <section className="bg-green-50 px-6 py-20">

      <div className="mx-auto max-w-4xl">

        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Have Questions?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find answers to some common questions about WildGuard
            India and wildlife conservation.
          </p>

        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = openFaq === index

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >

                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <FaChevronDown
                    className={`shrink-0 text-green-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-6 pb-5 pt-4">

                    <p className="leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default Contact