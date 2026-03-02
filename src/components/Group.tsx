// import { Button, Input } from "antd"
// import { Caption, CustomSelect, CustomTable, QueryPATH } from "./"
// import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
// import { GetAll } from "./../services";
// import { useCookies } from "react-cookie";
// import { useState } from "react";
// import { debounce } from "../hooks";
// import { useNavigate } from "react-router-dom";

// const Group = ({ stackId, title, teacherId, groupId, path }: { stackId?: string | undefined, title?: string, teacherId?: number | undefined, groupId?: string | undefined, path: string }) => {
//   const navigate = useNavigate()
//   const [cookies] = useCookies(['token'])
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id'
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name'
//     },
//     {
//       title: 'Stacks name',
//       dataIndex: "stackName"
//     },
//     {
//       title: 'Teacher name',
//       dataIndex: 'teacherName'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status'
//     },
//     {
//       title: 'Actions',
//       dataIndex: 'actions'
//     },
//   ];
//   const students=[
//     {
//         title: 'ID',
//         dataIndex: 'id'
//     },
//     {
//         title: 'Name',
//         dataIndex: 'name'
//     },
//     {
//         title: 'Email',
//         dataIndex: 'email'
//     },
//     {
//         title: 'Phone',
//         dataIndex: 'phone'
//     },
//     {
//       title: 'Actions',
//       dataIndex: 'actions'
//     }
//   ]
//   const [teachersId, setTeachersId] = useState<number | string | null>(teacherId || null)
//   const [stacksId, setStacksId] = useState<number | string | null>(stackId || null)
//   const [search, setSearch] = useState<string>("")
//   const name = debounce(search, 1000)
//   const { data = [], isLoading } = GetAll([name, teacherId, groupId], path, cookies.token, QueryPATH.groups, { name, teacherId, groupId })
//   const groups = (data ?? []).map((item, index) => ({
//     ...item,
//     key: index + 1,
//     name: `${item?.firstName} ${item?.lastName}`,
//     email: item?.email,
//     phone: item?.phone,
//     actions: <Button onClick={() => navigate(`/${path==="groups" ? "groups" : "students"}/${item.id}`)} type="primary" icon={<MoreOutlined />} />
//   }))
//   return (
//     <div className="p-5">
//       <Caption icon={<PlusCircleOutlined />} count={groups.length} title={`Groups ${title ? title : ""}`} />
//       <div className="flex gap-3 my-5">
//         <Input onChange={(e) => setSearch(e.target.value)} className="w-70!" size="large" allowClear placeholder={`Search group by ${path}`} />
//         {path==="groups"&&<CustomSelect value={teachersId} setValue={setTeachersId} queryKey={`QueryPATH.${path}`} teacherId={teacherId} stackId={stackId} requestTitle="/students" />}
//       </div>
//       <CustomTable loading={isLoading} columns={path==="groups" ? columns : students} data={groups} />
//     </div>
//   )
// }

// export default Group