# F1GPT

A RAG (Retrieval-Augmented Generation) chatbot for Formula One fans, built with Next.js. Ask anything about F1 and get answers grounded in up-to-date data scraped from Wikipedia and the official Formula 1 website.

<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/f7136e83-0fa4-435c-8182-2f98802ed4f2" />

## How it works

1. **Scrape & embed** — `scripts/loadDb.ts` uses Puppeteer to scrape F1 pages, splits the text into chunks, and generates vector embeddings via OpenAI's `text-embedding-3-small` model.
2. **Store** — Embeddings and their source text are stored in a DataStax Astra DB vector collection.
3. **Query** — When a user sends a message, the app embeds the question, runs a similarity search against Astra DB to fetch the 10 most relevant chunks, and injects them as context into a GPT-4o system prompt.
4. **Stream** — The response is streamed back to the browser using the Vercel AI SDK.

## Tech stack

- **Next.js 16** — App Router, API Routes
- **Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`)** — `streamText` + `useChat` hook for streaming responses
- **OpenAI** — `text-embedding-3-small` for embeddings, `gpt-4o` for chat completions
- **DataStax Astra DB** — serverless vector database for similarity search
- **LangChain** — `PuppeteerWebBaseLoader` and `RecursiveCharacterTextSplitter` for scraping and chunking
- **TypeScript**, **Tailwind CSS**

## What I learned

This project was built following a 2024 YouTube tutorial. A significant part of the work involved **migrating outdated dependencies** — the AI SDK had gone through major breaking changes since the tutorial was recorded, requiring rewrites of the streaming API calls, the chat hook imports, and the response format.

Key concepts covered:
- **Vector embeddings** — converting text into high-dimensional float arrays that capture semantic meaning, enabling similarity-based retrieval rather than keyword search
- **RAG architecture** — augmenting an LLM's responses with freshly retrieved context to reduce hallucination and keep answers current
- **Chunking strategy** — splitting scraped HTML (stripped of tags) into 512-token chunks with 100-token overlap so embeddings stay semantically focused
- **Streaming UI** — using `streamText` and `toDataStreamResponse()` on the server with `useChat` on the client for a real-time chat experience

## Getting started

### 1. Seed the database

```bash
npm run seed
```

This scrapes the configured F1 URLs, generates embeddings, and loads them into Astra DB. Only needs to be run once (or when you want to refresh the data).

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env` file at the project root:

```
ASTRA_DB_NAMESPACE=
ASTRA_DB_COLLECTION=
ASTRA_DB_API_ENDPOINT=
ASTRA_DB_APPLICATION_TOKEN=
OPENAI_API_KEY=
```
