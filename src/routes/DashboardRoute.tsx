import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboardHome, GroupMore, Groups, GroupsCrud, Rooms, StackCrud, StackMore, Stacks, Students, StudentsCrud, StudentsMore, TeacherCrud, TeacherMore, Teachers } from "../pages"
import { Header, Sitebar } from "../modules"
import { useContext } from "react"
import { Context } from "../context/Context"
import RoomMore from "../pages/Dashboard/Rooms/RoomMore"
import RoomCrud from "../pages/Dashboard/Rooms/RoomCrud"

const DashboardRoute = () => {
  const { collepsed } = useContext(Context)
  const list = [
    { id: 1, path: PATH.home, element: <DashboardHome /> },
    { id: 2, path: PATH.stacks, element: <Stacks /> },
    { id: 3, path: PATH.stacksMore, element: <StackMore /> },
    { id: 4, path: PATH.stacksCreate, element: <StackCrud /> },
    { id: 5, path: PATH.stacksUpdate, element: <StackCrud /> },
    { id: 6, path: PATH.groups, element: <Groups /> },
    { id: 7, path: PATH.teachers, element: <Teachers /> },
    { id: 8, path: PATH.students, element: <Students /> },
    { id: 9, path: PATH.rooms, element: <Rooms /> },
    { id: 10, path: PATH.groupsCreate, element: <GroupsCrud /> },
    { id: 11, path: PATH.stacksCreateByGroup, element: <GroupsCrud /> },
    { id: 12, path: PATH.groupsMore, element: <GroupMore /> },
    { id: 13, path: PATH.groupsUpdate, element: <GroupsCrud /> },
    { id: 14, path: PATH.teachersMore, element: <TeacherMore /> },
    { id: 15, path: PATH.teachersUpdate, element: <TeacherCrud /> },
    { id: 16, path: PATH.studentsMore, element: <StudentsMore /> },
    { id: 17, path: PATH.studentsUpdate, element: <StudentsCrud /> },
    { id: 18, path: PATH.teachersCreate, element: <TeacherCrud /> },
    { id: 19, path: PATH.studentsCreate, element: <StudentsCrud /> },
    {
      id: 20, path: PATH.roomsMore, element: <RoomMore />
    },
    {
      id: 21, path: PATH.roomsCreate, element: <RoomCrud />
    },
    {
      id: 22, path: PATH.roomsUpdate, element: <RoomCrud />
    }
  ]
  return (
    <div className="flex bg-background min-h-screen">
      <Sitebar />
      <div className={`flex-1 duration-300 h-screen overflow-y-auto`}>
        <Header />
        <div className="p-6">
          <Routes>{list.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
        </div>
      </div>
    </div>
  )
}

export default DashboardRoute
