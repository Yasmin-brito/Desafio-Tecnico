import { UiIcon } from "../Ui/Icon/UiIcon";
import house from "@/assets/icons/house"
import user from "@/assets/icons/user";
import menu from "@/assets/icons/menu";

type AppTopBarProps = {
    onMenuClick: () => void
}

export function AppTopBar({ onMenuClick }: AppTopBarProps){
    return (
        <div className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-200 bg-slate-600 px-4 backdrop-blur-xl">
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-[#EAEFF8] transition hover:bg-slate-500 lg:hidden"
                    aria-label="Abrir menu"
                >
                    <UiIcon data={menu} className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-1">
                    <div>
                        <UiIcon data={house} className="text-[#EAEFF8]"/>
                    </div>
                    <h1 className="text-lg font-bold text-[#EAEFF8]">Expense Control</h1>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div>
                    <UiIcon data={user} className="text-[#EAEFF8]"/>
                </div>
                <p className="text-lg text-[#EAEFF8]">Usuário</p>
            </div>
        </div>
    );
}
