import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase key:', supabaseAnonKey.slice(0, 8) + '...');

// 🔍 Real table connection test using 'templates'
async function testSupabaseConnection() {
	console.log('🔌 Performing Supabase connection test...');

	const { data, error } = await supabase.from('templates').select('id').limit(1);

	if (error) {
		console.error('❌ Supabase connection test failed:', error.message);
	} else {
		console.log('✅ Supabase connection test successful! Table access works.');
	}
}

// Only run the test during development
if (import.meta.env.DEV) {
	testSupabaseConnection();
}
