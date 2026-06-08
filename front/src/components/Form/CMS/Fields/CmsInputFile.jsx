import { useEffect, useMemo } from "react";

function detectTypeFromUrl(url) {
    if (!url) return "";
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return "video";
    return "image";
}

function CmsInputFile({name, label, value, valueUrl, onChange, placeholder, type = "file", rightSlot = null, accept = "image/*, video/*"}) {
    const fileObjectUrl = useMemo(() => {
        if (value instanceof File) {
            return URL.createObjectURL(value);
        }
        return "";
    }, [value]);

    const previewUrl = fileObjectUrl || valueUrl || "";
    const previewType = useMemo(() => {
        if (value instanceof File) {
            return value.type?.startsWith("video/") ? "video" : "image";
        }
        if (valueUrl) return detectTypeFromUrl(valueUrl);
        return "";
    }, [value, valueUrl]);

    useEffect(() => {
        return () => {
            if (fileObjectUrl) URL.revokeObjectURL(fileObjectUrl);
        };
    }, [fileObjectUrl]);

    function handleFileChange(event) {
        if (onChange) {
            onChange(event);
        }
    }

    return(
        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
            <div className="flex justify-between items-between md:flex-row">
                <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px]">
                    { label }
                </label>
                {rightSlot}
            </div>
            <input type={type} name={name} accept={accept} onChange={handleFileChange}
                className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"
            />
            {previewUrl ? (
                previewType === "video" ? (
                    <video src={previewUrl}
                        className="h-[80px] w-[120px] object-contain rounded-[8px] border border-white/10 bg-white/5"
                        muted autoPlay loop
                    />
                ) : (
                    <img src={previewUrl} alt=""
                        className="h-[80px] w-[120px] object-contain rounded-[8px] border border-white/10 bg-white/5"
                    />
                )
            ) : (
                <p className="text-xs normal-case opacity-70">
                    { placeholder || "Apercu du background" }
                </p>
            )}
        </div>
    )
}

export default CmsInputFile
