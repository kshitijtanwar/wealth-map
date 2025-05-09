import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey ? "Key exists" : "Key is missing");

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "Missing Supabase credentials. Please check your .env file."
    );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
