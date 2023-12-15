import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default {
    plugins: [react(), WindiCSS()],
};
