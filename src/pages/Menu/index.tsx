import MenuLayouts from "@/components/Layouts/MenuLayouts"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Menu = () => {
    const navigate = useNavigate()
    return (
        <div>
            <MenuLayouts>
                <Button
                    onClick={(() => { navigate("/") })}
                >
                    Back To Landing
                </Button>

            </MenuLayouts>
        </div >
    )
}

export default Menu