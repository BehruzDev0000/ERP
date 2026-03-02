import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button,Input } from "antd"
import { CustomSelect, QueryPATH } from "../../../components"
import { useEffect, useState, type SubmitEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

const TeachersCrud = () => {
    const { stackId: stackPathId, teacherId } = useParams()
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [stackId, setStackId] = useState<number | string>(stackPathId ? Number(stackPathId) : "")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")



    
    const { mutate:createTeacher, isPending } = Create("/teachers", cookies.token, navigate, queryClient, QueryPATH.teachers)
    
    const { mutate: updateTeacher } = Update("/teachers", cookies.token, teacherId, navigate, queryClient, QueryPATH.teachers, QueryPATH.teacherMore)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { firstName, lastName, stackId: Number(stackId), email, phone, password }
        teacherId ? updateTeacher(data) : createTeacher(data)
    }

    const { data: singleInfo = {} } = teacherId ? GetById(QueryPATH.groupMore, teacherId, cookies.token, "/teachers") : {}

    useEffect(() => {
        if (singleInfo && teacherId) {
            setFirstName(singleInfo.firstName)
            setLastName(singleInfo.lastName)
            setStackId(singleInfo?.stack?.id)
            setEmail(singleInfo.email)
            setPhone(singleInfo.phone)
            setPassword(singleInfo.password)
        }
    }, [singleInfo])

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /></button>
                    <h2 className="font-bold text-[25px]">Teacher {teacherId ? "update" : "create"}</h2>
                </div>
                <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary">Save</Button>
            </div>
            <div className="flex justify-center gap-5 m-5">
                <div className="w-[45%] flex flex-col gap-5">
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} size="large" allowClear placeholder="Enter first name" />
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} size="large" allowClear placeholder="Enter last name" />
                    <CustomSelect  value={stackId} setValue={setStackId} extraClass="w-full!" queryKey={QueryPATH.stacks} requestTitle="/stacks"  />
                    
                </div>
                <div className="w-[45%] flex flex-col gap-5">
                    <Input value={email} type='email' onChange={(e) => setEmail(e.target.value)} size="large" allowClear placeholder="Enter email" />
                    <Input value={phone} type={'string'} onChange={(e) => setPhone(e.target.value)} size="large" allowClear placeholder="Enter phone" />
                    <Input.Password minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} size="large" allowClear placeholder="Enter password" type="password" />
                </div>
            </div>
        </form>
    )
}

export default TeachersCrud