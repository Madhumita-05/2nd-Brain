

```markdown
# 2nd Brain Web App

## Overview
The 2nd Brain web app is an AI-powered personal knowledge management system that allows users to upload, organize, and semantically search notes and PDF documents using embeddings and natural language AI models. It enables effortless retrieval of information through advanced search and NLP capabilities.

## Features
- Upload and manage text notes
- Upload multiple PDF documents with text extraction
- Semantic similarity search using Sentence Transformers embeddings
- AI-powered question answering, sentiment analysis, and chatbot features (backend)
- Text-to-Speech and Translator integration via Azure Cognitive Services
- React-based frontend with intuitive UI for uploading and searching content

## Tech Stack
- **Backend:** FastAPI, Python, Sentence Transformers, PyMuPDF, Azure Cognitive Services
- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Database:** SupaBase for persistent storage and indexing

## Setup and Usage

### Backend
1. Install dependencies:
   ```
   pip install -r requirements.txt
   pip install sentence-transformers pymupdf numpy
   ```
2. Run the backend server:
   ```
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend
1. Install dependencies:
   ```
   npm install
   ```
2. Run the frontend server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /upload/note`: Upload a text note (title & content)
- `POST /upload/pdfs`: Upload one or more PDF files
- `POST /search`: Search stored notes and PDFs by semantic similarity
- Additional endpoints for AI tasks like `/nn/qa`, `/nn/sentiment`, `/chatbot`, and Azure integrations

## Project Structure

```
backend/
  ├── app.py                 # Main FastAPI backend application
  ├── upload_search.py       # Upload and search endpoints code
  ├── models/                # AI model files
  ├── notes_store/           # Uploaded note text files
  └── pdf_store/             # Uploaded PDF files

frontend/
  ├── src/                   # React source code
  ├── public/
  ├── .env
  ├── package.json
  └── vite.config.ts
```

## Contribution
Feel free to open issues or pull requests for improvements and bug fixes.



```
