import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dmulwcpyxypjodtiiaru.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtdWx3Y3B5eHlwam9kdGlpYXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NTc3MTYsImV4cCI6MjA1MTUzMzcxNn0.1Qk3cDR4JsBkWdg3UIszTq1ViblCoPTCvdWCW68i7Fs";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
);