import { useEffect, useState } from "react";

export default function usePrefersDark() {
    const [prefersDark, setPrefersDark] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : false,
    );

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (event) => setPrefersDark(event.matches);

        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return prefersDark;
}
