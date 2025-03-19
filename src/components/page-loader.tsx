import { Loader } from "lucide-react"

export const PageLoader = () => {
    return (
        <div className="w-full h-screen m-auto flex items-center justify-center">
            <Loader className="size-6 animate-spin"/>
        </div>
    )
}