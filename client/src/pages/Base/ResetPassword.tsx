import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { BaseButton } from "components/base"
import { HomeSidebar } from "components/composite"
import { usePageDimensions } from "hooks/usePageDimensions"
import { selectIsOpen } from "features/sidebarSlice"

const ResetPassword = () => {
    const { height } = usePageDimensions();
    const { email } = useParams();
    const sidebarIsOpen = useSelector(selectIsOpen)

    return  (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
        <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
        >
            <HomeSidebar />
        </div>
        <div className="min-w-52" />
        <div className={"flex-1 justify-center flex-col px-4 pb-4"}>
            
        </div>
    </div>
  )
}

export default ResetPassword;
