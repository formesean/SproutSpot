"use client";

import React, { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is SproutSpot?",
      answer:
        "SproutSpot is an AI-powered platform designed to help farmers optimize crop growth, predict yields, and improve overall efficiency using advanced machine learning models.",
    },
    {
      question: "How does AI help in farming?",
      answer:
        "AI analyzes real-time data from sensors, weather patterns, and soil quality to provide smart recommendations, improve resource allocation, and predict potential issues before they arise.",
    },
    {
      question: "Is SproutSpot suitable for small farms?",
      answer:
        "Absolutely! SproutSpot is designed to support both small and large-scale farms, providing tailored insights based on farm-specific data.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h2 className="mb-6 text-center text-3xl font-bold text-green-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-green-300 p-4 shadow-md"
          >
            <button
              className="flex w-full items-center justify-between text-left text-lg font-semibold text-green-700 focus:outline-none"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <span className="text-green-600 transition-transform duration-300">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-green-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
