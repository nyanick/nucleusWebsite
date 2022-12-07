module.exports = {
    mode: 'jit',
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        boxShadow: {
            nav: 'inset 0 -1px #eaeaea'
        },
        backgroundColor: theme => ({
            ...theme('colors'),
            'accent': '#f3f2ef'
        })
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp')
    ],
}
