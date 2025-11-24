import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface Profile {
    id: string;
    username: string;
    role: 'RIDER' | 'DRIVER';
    created_at: string;
}

export interface RiderProfile {
    id: string;
    user_id: string;
    dob?: string;
    gender?: string;
    about_me?: string;
}

export interface DriverProfile {
    id: string;
    user_id: string;
    license_number?: string;
    car_model?: string;
    plate_number?: string;
    is_verified: boolean;
}
