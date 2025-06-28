
"use client"

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of ads can I upload as an advertiser?",
    answer: "Our platform supports a wide range of formats, including image ads (JPG, PNG, GIF), video ads (MP4), and interactive HTML5 ads. We provide a simple form to handle all specifications."
  },
//   {
//     question: "How do publishers get paid?",
//     answer: "Publishers earn revenue based on the ad performance on their site, determined by the advertiser's bid strategy (e.g., CPM, CPC). Payouts are handled automatically on a monthly basis through our secure payment system."
//   },
//   {
//     question: "Can I choose which ads appear on my site?",
//     answer: "Absolutely. As a publisher, you have full control. You receive requests from advertisers and can preview every ad creative before approving it to ensure it aligns with your brand and audience."
//   },
  {
    question: "How do you track ad performance?",
    answer: "We provide a real-time analytics dashboard for both advertisers and publishers. It tracks key metrics like impressions, clicks, CTR, and more. Publishers can also integrate their Google Analytics for a unified view of site traffic and ad performance."
  },
//   {
//     question: "Is there a long-term commitment?",
//     answer: "No. Our platform is designed to be flexible. We offer various plans, including pay-as-you-go options, so you can choose what works best for you without being locked into a long-term contract."
//   }
];


const FAQ = () => {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-foreground">Frequently Asked Questions</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
               <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FAQ;
