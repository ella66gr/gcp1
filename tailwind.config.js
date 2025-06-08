// tailwind.config.js

import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class', // Use class-based dark mode
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
    theme: {
        extend: {
            colors: {
                // Ensure proper gray scale for light/dark mode
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712'
                },
                // Primary colors for consistent theming
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554'
                }
            },
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans],
                display: ['Inter', 'system-ui', 'sans-serif']
            }
        }
    }
};

export default config;