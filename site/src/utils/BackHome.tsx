import PreserveLink from "@/components/preserve-link";
import { ArrowLeft } from "lucide-react";

export default function BackHome() {

    return (
        <PreserveLink to="/"  className="inline-flex items-center mt-10  gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
        </PreserveLink>  
    )
}
