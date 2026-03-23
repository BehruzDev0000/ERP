import { Button, Input, Tag, Avatar } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { MoreOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { GetAll } from "../../../services";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { debounce } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Teachers = ({ title }: { title?: string }) => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      render: (id: number) => <span className="text-muted-foreground font-mono">#{id}</span>
    },
    {
      title: "O'qituvchi",
      dataIndex: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-3">
          <Avatar size={36} className="bg-gradient-to-br from-primary to-blue-400" icon={<UserOutlined />} />
          <span className="font-medium text-foreground">{name}</span>
        </div>
      )
    },
    {
      title: 'Stack',
      dataIndex: "stackName",
      render: (stackName: string) => (
        <Tag color="blue" className="rounded-full px-3">
          {stackName || "Belgilanmagan"}
        </Tag>
      )
    },
    {
      title: 'Email',
      dataIndex: "email",
      render: (email: string) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MailOutlined />
          <span>{email}</span>
        </div>
      )
    },
    {
      title: 'Telefon',
      dataIndex: "phone",
      render: (phone: string) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <PhoneOutlined />
          <span>{phone}</span>
        </div>
      )
    },
    {
      title: "Guruhlar",
      dataIndex: "groupsCount",
      width: 100,
      render: (count: number) => (
        <Tag color={count > 0 ? "green" : "default"} className="rounded-full">
          {count} ta
        </Tag>
      )
    },
    {
      title: 'Amallar',
      dataIndex: 'actions',
      width: 100,
    }
  ];

  const [stackId, setStackId] = useState<number | string | null>(null)
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const { data = [], isLoading } = GetAll([name, stackId], "/teachers", cookies.token, QueryPATH.teachers, { name, stackId })

  const teachers = (data ?? []).map((item, index) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name,
    name: `${item?.firstName} ${item?.lastName}`,
    groupsCount: item.groups?.length || 0,
    actions: (
      <Button
        onClick={() => navigate(`/teachers/${item.id}`)}
        type="text"
        className="text-muted-foreground hover:text-primary hover:bg-primary/10"
        icon={<MoreOutlined />}
      />
    )
  }))

  return (
    <div>
      <Caption icon={<PlusCircleOutlined />} count={teachers.length} title={`O'qituvchilar ${title ? title : ""}`} />

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
            size="large"
            allowClear
            placeholder="Ism bo'yicha qidirish..."
            prefix={<SearchOutlined className="text-muted-foreground" />}
          />
          <CustomSelect
            params={{ stackId }}
            value={stackId}
            setValue={setStackId}
            queryKey={QueryPATH.stacks}
            requestTitle="/stacks"
          />
        </div>
      </div>

      <CustomTable loading={isLoading} columns={columns} data={teachers} />
    </div>
  )
}

export default Teachers
