import { Button, Input } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { GetAll } from "../../../services";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { debounce } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Teachers = ({  title }: {  title?: string }) => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title:'Stack Name',
      dataIndex: "stackName"
    },
    {
      title: 'Email',
      dataIndex: "email"
    },
    {
      title:'Phone',
      dataIndex:"phone"
    },
    
    {
      title:"Groups count",
      dataIndex: "groupsCount"
    },
    {
      title: 'Actions',
      dataIndex: 'actions'
    }
  ];
  
  const [stackId, setStackId] = useState<number | string | null>(null)

  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const { data = [], isLoading } = GetAll([name,stackId], "/teachers", cookies.token, QueryPATH.teachers, { name,stackId })
  const teachers = (data ?? []).map((item, index) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name,
    name: `${item?.firstName} ${item?.lastName}`,
    groupsCount: item.groups.length,
    actions: <Button onClick={() => navigate(`/teachers/${item.id}`)} type="primary" icon={<MoreOutlined />} />
  }))
  return (
    <div className="p-5">
      <Caption icon={<PlusCircleOutlined />} count={teachers.length} title={`Teachers ${title ? title : ""}`} />
      <div className="flex gap-3 my-5">
        <Input onChange={(e) => setSearch(e.target.value)} className="w-70!" size="large" allowClear placeholder="Search teacher by name" />
        
        <CustomSelect params={{stackId}} value={stackId} setValue={setStackId} queryKey={QueryPATH.stacks} requestTitle="/stacks" />

      </div>
      <CustomTable loading={isLoading} columns={columns} data={teachers} />
    </div>
  )
}

export default Teachers