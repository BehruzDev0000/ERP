import { Button, Input, Tag } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { MoreOutlined, PlusCircleOutlined, SearchOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { GetAll } from "../../../services";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { debounce } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Groups = ({ stackId, title }: { stackId?: string | undefined, title?: string }) => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'green'
      case 'completed': return 'blue'
      case 'pending': return 'orange'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'Faol'
      case 'completed': return 'Tugallangan'
      case 'pending': return 'Kutilmoqda'
      default: return status || 'Noma\'lum'
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      render: (id: number) => <span className="text-muted-foreground font-mono">#{id}</span>
    },
    {
      title: 'Guruh nomi',
      dataIndex: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
            <TeamOutlined className="text-primary" />
          </div>
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
      title: "O'qituvchi",
      dataIndex: 'teacherName',
      render: (teacherName: string) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <UserOutlined />
          <span>{teacherName}</span>
        </div>
      )
    },
    {
      title: 'Holat',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="rounded-full">
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: "O'quvchilar",
      dataIndex: 'studentCount',
      width: 120,
      render: (count: number) => (
        <Tag color={count > 0 ? "purple" : "default"} className="rounded-full">
          {count} ta
        </Tag>
      )
    },
    {
      title: 'Amallar',
      dataIndex: 'actions',
      width: 100,
    },
  ];

  const [teacherId, setTeacherId] = useState<number | string | null>(null)
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const { data = [], isLoading } = GetAll([name, teacherId], "/groups", cookies.token, QueryPATH.groupMore, { name, teacherId })

  const groups = (data ?? []).map((item, index) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name,
    studentCount: item.students?.length || 0,
    teacherName: `${item.teacher?.firstName || ''} ${item.teacher?.lastName || ''}`.trim() || 'Belgilanmagan',
    actions: (
      <Button
        onClick={() => navigate(`/groups/${item.id}`)}
        type="text"
        className="text-muted-foreground hover:text-primary hover:bg-primary/10"
        icon={<MoreOutlined />}
      />
    )
  }))

  return (
    <div>
      <Caption icon={<PlusCircleOutlined />} count={groups.length} title={`Guruhlar ${title ? title : ""}`} />

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
            size="large"
            allowClear
            placeholder="Guruh nomi bo'yicha qidirish..."
            prefix={<SearchOutlined className="text-muted-foreground" />}
          />
          <CustomSelect
            value={teacherId}
            setValue={setTeacherId}
            queryKey={QueryPATH.teachers}
            stackId={stackId}
            requestTitle="/teachers"
          />
        </div>
      </div>

      <CustomTable loading={isLoading} columns={columns} data={groups} />
    </div>
  )
}

export default Groups
