import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button,Input } from "antd"
import {  QueryPATH } from "../../../components"
import { useEffect, useState, type SubmitEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

const StudentsCrud = () => {
    const {  studentId } = useParams()
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")



    
    const { mutate:createStudent, isPending } = Create("/students", cookies.token, navigate, queryClient, QueryPATH.students)
    
    const { mutate: updateStudent } = Update("/students", cookies.token, studentId, navigate, queryClient, QueryPATH.students, QueryPATH.studentMore)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { firstName, lastName, email, phone, password }
        studentId ? updateStudent(data) : createStudent(data)
    }

    const { data: singleInfo = {} } = studentId ? GetById(QueryPATH.studentMore, studentId, cookies.token, "/students") : {}

    useEffect(() => {
        if (singleInfo && studentId) {
            setFirstName(singleInfo.firstName)
            setLastName(singleInfo.lastName)
            setEmail(singleInfo.email)
            setPhone(singleInfo.phone)
            setPassword(singleInfo.password)
        }
    }, [singleInfo])

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-5 bg-slate-200 w-full h-full">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /></button>
                    <h2 className="font-bold text-[25px]">Student {studentId ? "update" : "create"}</h2>
                </div>
                <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary">Save</Button>
            </div>
            <div className="flex justify-center gap-5 m-5">
                
                <div className="w-[60%] flex flex-col gap-5 rounded-md bg-slate-500/40 p-8">
                    <h3 className="text-center text-2xl font-bold">Student {studentId ? "update" : "create"} form</h3>
                   <Input value={firstName} type={'string'} onChange={(e) => setFirstName(e.target.value)} size="large" allowClear placeholder="Enter first name" />
                    <Input value={lastName} type={'string'} onChange={(e) => setLastName(e.target.value)} size="large" allowClear placeholder="Enter last name" />
                    <Input value={email} type='email' onChange={(e) => setEmail(e.target.value)} size="large" allowClear placeholder="Enter email" />
                    <Input value={phone} type={'string'} onChange={(e) => setPhone(e.target.value)} size="large" allowClear placeholder="Enter phone" />
                    <Input.Password minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} size="large" allowClear placeholder="Enter password" type="password" />
                </div>
            </div>
        </form>
    )
}

export default StudentsCrud
