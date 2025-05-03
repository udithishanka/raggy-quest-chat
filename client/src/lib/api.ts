
/**
 * API service for connecting to the RAG backend
 */

interface QueryResponse {
  answer: string;
  error?: string;
}

export async function queryRag(question: string): Promise<QueryResponse> {
  try {
    const response = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error querying RAG:", error);
    return {
      answer: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
