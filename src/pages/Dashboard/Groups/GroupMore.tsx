import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../services"
import { CustomTable, FormatDate, QueryPATH } from "../../../components"

const GroupMore = () => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Stack Name",
            dataIndex: "stackName"
        },
        {
            title: "Teacher Name",
            dataIndex: "teacherName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Actions",
            dataIndex: "actions"
        }
    ]
    const { groupId } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(['token'])
    const queryClient = useQueryClient()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    // Get Signle Data
    const { data = {}, isLoading } = GetById(QueryPATH.groupMore, groupId, cookies.token, "/groups")

     const students=(data.students??[]).map((item:any,index:number)=>({
        ...item,
        key: index + 1,
        name:`${item.firstName} ${item.lastName}`,
        stackName: data?.stack.name,
        teacherName: `${data?.teacher?.firstName} ${data?.teacher?.lastName}` ,
        actions: <Button onClick={() => navigate(`/students/${item.id}`)} type="primary" icon={<MoreOutlined />} />
    }))
    
    // Delete part
    const { mutate: GroupDelete, isPending } = Delete("/groups", cookies.token, groupId, navigate, QueryPATH.groups, queryClient)

    
    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer"> <ArrowLeftOutlined /> </button>
                    <h1 className="font-bold text-[25px]">{isLoading ? "loading..." : data.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />}></Button>
                    <Button onClick={() => navigate('update')} icon={<EditFilled />} size="large" type="primary">Update</Button>
                </div>
            </div>
          <div className="flex items-start justify-start gap-5">
            <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[35%]">
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">#ID</span>
                        <strong>{data.id}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Name</span>
                        <strong>{data.name}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Stack name</span>
                        <strong>{data?.stack?.name}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Teacher name</span>
                        <strong>{data?.teacher?.firstName} {data?.teacher?.lastName}</strong>
                    </li>
                </ul>
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Started At</span>
                        <strong>{FormatDate(data.startDate)}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Ended At</span>
                        <strong>{FormatDate(data.endDate)}</strong>
                    </li>
                </ul>
            </div>
            <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[35%]">
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">#ID</span>
                        <strong>{data.teacher?.id}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Name</span>
                        <strong>{data.teacher?.firstName} {data?.teacher?.lastName}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Stack name</span>
                        <strong>{data?.stack?.name}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Email</span>
                        <strong>{data.teacher?.email}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Phone</span>
                        <strong>{data.teacher?.phone}</strong>
                    </li>
                </ul>
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Created At</span>
                        <strong>{FormatDate(data.teacher?.createdAt)}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Updated At</span>
                        <strong>{FormatDate(data.teacher?.updatedAt)}</strong>
                    </li>
                </ul>
            </div>
          </div>
            <Modal confirmLoading={isPending} onOk={() => GroupDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete!"></Modal>

            <CustomTable columns={columns} data={students} loading={isLoading} />
        </div>
    )
}

export default GroupMore