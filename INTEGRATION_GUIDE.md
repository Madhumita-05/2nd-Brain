# Integration Guide: Connecting to FastAPI Backend

This guide explains how to connect the frontend to your existing FastAPI backend with MongoDB and neural network search.

## Backend Endpoints to Integrate

### 1. Upload Notes (`/upload/notes-multi`)
**Location in code:** `src/components/UploadSection.tsx` - `handleNoteUpload` function

```typescript
const handleNoteUpload = async () => {
  const response = await fetch('http://your-backend-url/upload/notes-multi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notes: [{ title: noteTitle, content: noteContent }]
    })
  });
  
  if (response.ok) {
    toast.success("Note uploaded successfully!");
    setNoteTitle("");
    setNoteContent("");
  }
};
```

### 2. Upload PDFs (`/upload/pdfs-multi`)
**Location in code:** `src/components/UploadSection.tsx` - `handlePDFUpload` function

```typescript
const handlePDFUpload = async () => {
  const formData = new FormData();
  Array.from(selectedFiles).forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch('http://your-backend-url/upload/pdfs-multi', {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    toast.success("PDFs uploaded successfully!");
    setSelectedFiles(null);
  }
};
```

### 3. AI Search (`/search`)
**Location in code:** `src/components/SearchSection.tsx` - `handleSearch` function

```typescript
const handleSearch = async () => {
  const response = await fetch('http://your-backend-url/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  const data = await response.json();
  setResults(data.results); // Adjust based on your API response structure
};
```

## Azure Speech Services Integration

### Prerequisites
1. Azure subscription key
2. Azure region (e.g., "eastus")

### Adding Azure Speech SDK

Add to `index.html` before closing `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@latest/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js"></script>
```

### Speech-to-Text Implementation
**Location in code:** `src/components/SpeechSection.tsx` - `handleSpeechToText` function

```typescript
const handleSpeechToText = () => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "YOUR_SUBSCRIPTION_KEY",
    "YOUR_REGION"
  );
  speechConfig.speechRecognitionLanguage = selectedLanguage;

  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizeOnceAsync(result => {
    if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
      setTranscribedText(result.text);
      toast.success("Speech recognized!");
    }
    recognizer.close();
  });
};
```

### Text-to-Speech Implementation
**Location in code:** `src/components/SpeechSection.tsx` - `handleTextToSpeech` function

```typescript
const handleTextToSpeech = () => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "YOUR_SUBSCRIPTION_KEY",
    "YOUR_REGION"
  );
  speechConfig.speechSynthesisLanguage = selectedLanguage;

  const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
  
  synthesizer.speakTextAsync(
    transcribedText,
    result => {
      if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
        toast.success("Speech completed!");
      }
      synthesizer.close();
    },
    error => {
      toast.error("Speech synthesis error");
      synthesizer.close();
    }
  );
};
```

## Additional NN Features Integration

To add the enhanced AI features (summarization, sentiment, topics, QA):

1. **Update your FastAPI backend** to include these endpoints:
   - `/analyze/summarize` - Content summarization
   - `/analyze/sentiment` - Sentiment analysis
   - `/analyze/topics` - Topic extraction
   - `/analyze/qa` - Question answering

2. **Frontend integration** in `SearchSection.tsx`:

```typescript
// After getting search results, call additional analysis
const enhanceResults = async (results) => {
  const promises = [
    fetch('/analyze/summarize', { /* ... */ }),
    fetch('/analyze/sentiment', { /* ... */ }),
    fetch('/analyze/topics', { /* ... */ }),
    fetch('/analyze/qa', { /* ... */ })
  ];
  
  const [summary, sentiment, topics, answer] = await Promise.all(promises);
  
  setInsights({
    summary: summary.data,
    sentiment: sentiment.data,
    topics: topics.data,
    answer: answer.data
  });
};
```

## Environment Variables

Create a `.env.local` file (for Next.js migration):

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_AZURE_SPEECH_KEY=your_azure_key
VITE_AZURE_SPEECH_REGION=your_region
```

Access in code:
```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

## CORS Configuration

Make sure your FastAPI backend allows CORS from your frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Next Steps

1. Replace all `TODO` comments in the code with actual API calls
2. Add Azure Speech SDK script to `index.html`
3. Configure environment variables
4. Test each integration point individually
5. Add error handling and loading states
6. Implement file upload with AWS S3 or Cloudinary if needed

## Testing

1. Start your FastAPI backend
2. Run the frontend: `npm run dev`
3. Test each feature:
   - Upload a note
   - Upload a PDF
   - Perform a search
   - Try speech-to-text
   - Try text-to-speech

Happy building! 🚀
