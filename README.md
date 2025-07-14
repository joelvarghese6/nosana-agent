# 🧠 Job Opportunity Tracker Agent

Welcome to the **Job Opportunity Tracker Agent** – an AI-powered assistant built using the [Mastra framework](https://mastra.ai/) and deployed on the Nosana network. This agent helps users find remote job listings from the [Remotive API](https://remotive.com/) based on customizable filters such as category, company name, keywords, and location.

---

## 🚀 Overview

This AI agent leverages Mastra’s tool-calling capability to interact with Remotive’s public jobs API and retrieve relevant job listings in real-time. It is designed for ease of use, supports strict category filtering, and provides concise results in JSON format.

### ✨ Features

* Query remote jobs by:

  * Job category (e.g., `software-dev`, `design`)
  * Company name
  * Search keywords
  * Candidate location
  * Result limit
* Uses lightweight `qwen2.5:1.5b` model for fast responses
* Mastra-native tool-based execution
* Deployable via Docker and Nosana

---

## 🛠 Tech Stack

* **Framework**: [Mastra](https://mastra.ai)
* **Language**: TypeScript
* **AI Model**: Qwen2.5 1.5b (via Ollama or Nosana endpoint)
* **Deployment**: Docker + Nosana Network
* **API Source**: [Remotive Job API](https://remotive.com/api/remote-jobs)

---

## 📂 Folder Structure

```
src/
└── mastra/
    └── agents/
        └── job-agent/
            ├── job-agent.ts     # Agent definition and instruction set
            └── job-tool.ts      # Tool for fetching jobs from API
```

---

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/job-agent.git
cd job-agent
pnpm install
```

> *You may also use `npm` or `bun`, but `pnpm` is preferred.*

### 2. Configure Environment

Create a `.env` file:

```env
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b
API_BASE_URL=https://dashboard.nosana.com/jobs/GPVMUckqjKR6FwqnxDeDRqbn34BH7gAa5xWnWuNH1drf
```

Or if running locally with Ollama:

```env
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b
API_BASE_URL=http://localhost:11434
```

### 3. Start Development Server

```bash
pnpm run dev
```

Visit [http://localhost:8080](http://localhost:8080) to interact with your agent.

---


## 🧾 Environment Variables

| Variable                 | Description                         |
| ------------------------ | ----------------------------------- |
| `MODEL_NAME_AT_ENDPOINT` | LLM model to use (`qwen2.5:1.5b`)   |
| `API_BASE_URL`           | Ollama local or Nosana API base URL |

---

## 📹 Video Demo

[🔗 Watch the Demo on Loom]([https://your-youtube-link.com](https://www.loom.com/share/4fd4dfafaf3c4089b42d786f36152c84?sid=e0aaf152-d97c-4e20-8e91-71a3690e8ed4))

