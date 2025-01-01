import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mpsfesswsnkbjacazlml.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wc2Zlc3N3c25rYmphY2F6bG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1Nzk1NzQsImV4cCI6MjA1MTE1NTU3NH0.XS04f75Bbv8h3WJ0ZOSnwNbck844vSJXI0mpLGBM_zY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
