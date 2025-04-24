"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const toastId = toast.loading("Sending message...")

    const formEncoded = new URLSearchParams()
    formEncoded.append("name", formState.name)
    formEncoded.append("email", formState.email)
    formEncoded.append("message", formState.message)
    try {
      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbxVy3_CM9AL-rCZx_qVjFI6b2Igy4cJrmfBizk2qjt9kGP1OsvIqH76289iCQJ25wb8/exec",
        formEncoded,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (res.status === 200) {
        toast.success("Message sent successfully!", { id: toastId })
        setFormState({ name: "", email: "", message: "" })
      } else {
        alert("Oops! Something went wrong.")
      }
    } catch (error) {
      console.error("Submission failed", error)
      toast.error("Failed to send. Please try again later.", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-8">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-600/20 rounded-2xl">
                  <Mail className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Email</h4>
                  <p className="font-medium">aryadzaky8494@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-600/20 rounded-2xl">
                  <Phone className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Phone</h4>
                  <p className="font-medium">+6282186796121</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-600/20 rounded-2xl">
                  <MapPin className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Location</h4>
                  <p className="font-medium">Bandar Lampung,Lampung</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-900 rounded-2xl border border-gray-800">
              <h4 className="font-bold mb-4">Current Availability</h4>
              <p className="text-gray-300">
                I'm currently available for freelance work and open to discussing new opportunities.
              </p>
              <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-2xl text-sm">
                Available for hire
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium overflow-hidden transition-colors ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {/* Background hover animation */}
                {!loading && (
                  <motion.div
                    className="absolute inset-0 bg-violet-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
