import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Create, GetById, Update } from "../../../services"
import { QueryPATH } from "../../../components"

const RoomCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['token'])
  const { roomId } = useParams()

  const [name, setName] = useState<string>("")
  const [capacity, setCapacity] = useState<number>()
 
  const { mutate: stackCreate, isPending } = Create("/rooms", cookies.token, navigate, queryClient, QueryPATH.rooms)
 
  const { mutate: stackUpdate } = Update("/rooms", cookies.token, roomId, navigate, queryClient, QueryPATH.rooms, QueryPATH.roomMore)

 
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { name, capacity }
    roomId ? stackUpdate(data) : stackCreate(data)
  }

  
  const { data: singleInfo = {} } = roomId ? GetById(QueryPATH.roomMore, roomId, cookies.token, "/rooms") : {}
  useEffect(() => {
    if (singleInfo && roomId) {
      setName(singleInfo.name)
      setCapacity(singleInfo.capacity)
    }
  }, [singleInfo])
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5 bg-slate-300 w-full h-[89%] overflow-x-hidden">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /></button>
          <h2 className="font-bold text-[25px]">Room {roomId ? "update" : "create"}</h2>
        </div>
        <Button loading={isPending} type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">Save</Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-5 bg-slate-400 items-center p-5 w-[400px] rounded-2xl mt-10">
          <h3 className="font-bold text-[25px]">{roomId ? "Update" : "Create"} Room</h3>
          <Input onChange={(e) => setName(e.target.value)} value={name} className="w-full!" size="large" allowClear name="name" placeholder="Enter room name" />
          <Input type={'number'} onChange={(e) => setCapacity(Number(e.target.value))} value={capacity}  className="w-full!" allowClear name="name" placeholder="Enter Room capacity" />
        </div>
      </div>
    </form>
  )
}

export default RoomCrud