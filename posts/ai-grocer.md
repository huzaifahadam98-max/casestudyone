---
title: "Building an AI Grocer App"
date: "2026-03-15"
category: "Tech Projects"
excerpt: "Connecting local farmers directly to community buyers without the corporate middlemen. Here is how I built the prototype."
---

## The Problem with Supply Chains
Our food supply chains are extremely fragile and reliant on major corporate logistics. As I've started growing my own food, I noticed the massive inefficiency between what small-scale farmers produce and how it reaches local consumers.

I decided to solve this computationally.

### The AI Grocer Solution
Over the past month, I've been building a prototype app called **Smart Grocer**.

It uses AI to:
1. Predict localized crop readiness based on weather data and seed planting times.
2. Alert local buyers when a neighbor has surplus produce.
3. Optimize the pick-up routing to minimize emissions.

The stack is fairly simple: a Next.js frontend, an AI routing layer, and a lightweight Firebase database. The beauty of it is that it's all built to scale *down*. We don't need a national network, we just need neighborhood nodes.

It's systems thinking from my HR days, applied to community resilience.
