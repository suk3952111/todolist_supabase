import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vwextkqnwkxzzjvkqoqt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZXh0a3Fud2t4enpqdmtxb3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTI1NzEsImV4cCI6MjAzMzQyODU3MX0.hDrkMW7BuWuQPSpvRuOoirHOp2VTwS3xo0a167mSolc";
export const supabase = createClient(supabaseUrl, supabaseKey);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
