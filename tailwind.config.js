/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {},
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
            opacity: ['disabled'],
            textColor: ['visited'],
        },
    },
    plugins: [],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-select/dist/index.esm.js"
    ]
}