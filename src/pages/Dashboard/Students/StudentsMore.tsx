import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../services"
import { CustomTable, FormatDate, QueryPATH } from "../../../components"
import type { GroupsType } from "../../../@types"
const StudentMore = () => {
    const { studentId } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(['token'])
    const queryClient = useQueryClient()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Group Name',
      dataIndex: 'name'
    },
    {
      title: 'Stacks name',
      dataIndex: "stackName"
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Student count',
      dataIndex: 'studentCount'
    },
    {
      title: 'Actions',
      dataIndex: 'actions'
    },
  ];
    const { data = {}, isLoading } = GetById(QueryPATH.studentMore, studentId, cookies.token, "/students")
    const { mutate: TeacherDelete, isPending } = Delete("/students", cookies.token, studentId, navigate, QueryPATH.students, queryClient)
    console.log(data)
    const groups=(data.groups??[]).map((item:GroupsType,index:number)=>({
        ...item,
        key: index + 1,
        stackName: item.stack?.name,
        studentCount: data.groups?.length || 0,
        teacherName: `${item.teacher?.firstName} ${item.teacher?.lastName}`,
        actions: <Button onClick={() => navigate(`/groups/${item.id}`)} type="primary" icon={<MoreOutlined />} />
    }))
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
            <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[50%]">
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">#ID</span>
                        <strong>{data.id}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Name</span>
                        <strong>{`${data.firstName} ${data.lastName}`}</strong>
                    </li>
                      
                          <li className={`flex flex-col  ${data.stacks?.length > 0 ? 'hidden' : 'block'}`}>
                            <span className="text-[10px] text-slate-400">Stack name</span>
                            <strong>{data?.stack?.name}</strong>
                          </li>
                        
                      
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Email</span>
                        <strong>{data?.email}</strong>
                    </li>
                </ul>
                <ul className=" flex flex-col gap-5 ">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Created At</span>
                        <strong>{FormatDate(data.createdAt)}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Updated At</span>
                        <strong>{FormatDate(data.updatedAt)}</strong>
                    </li>
                </ul>
            </div>
            <Modal confirmLoading={isPending} onOk={() => TeacherDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete this teacher!"></Modal>
            <CustomTable columns={columns} data={groups} loading={isLoading} />
        </div>
    )
}

export default StudentMore
