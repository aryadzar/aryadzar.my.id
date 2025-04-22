import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackHome() {

    const navigate = useNavigate()
    return (
        <button onClick={() => navigate('/')}   className="inline-flex items-center mt-10  gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
        </button>  
    )
}
