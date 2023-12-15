export default {
    extract: {
        include: ["./**/*.{html,js,jsx}"],
    },
    safelist: ["prose", "prose-sm", "m-auto"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                silkscreen: ["Silkscreen", "sans-serif"],
            },
        },
    },
};
