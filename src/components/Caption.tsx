import { Button } from "antd"
import type { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface CaptionType {
    title: string,
    count: number,
    icon: ReactNode
}

const Caption: FC<CaptionType> = ({ title, count, icon }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="font-bold text-2xl text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Jami: <span className="text-primary font-semibold">{count}</span> ta
                </p>
            </div>
            <Button 
                onClick={() => navigate("create")} 
                size="large" 
                icon={icon} 
                iconPlacement="start" 
                type="primary"
                className="h-11 px-6 font-semibold"
            >
                Yaratish
            </Button>
        </div>
    )
}

export default Caption
