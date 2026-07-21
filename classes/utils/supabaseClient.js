import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = "https://eqqyjpcfzclijibecsko.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcXlqcGNmemNsaWppYmVjc2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MzQzOTcsImV4cCI6MjA5OTUxMDM5N30.H_xtquhTEmiK5PPyr1ZobpMfhfRmBv1_dvPzF_o8G70";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
