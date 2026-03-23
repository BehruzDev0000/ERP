import { MoreOutlined, PlusCircleOutlined, SearchOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons"
import { Button, Card, Input, Spin, Empty, Tag } from "antd"
import { debounce } from "../../../hooks"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAll } from "../../../services"
import { Caption, QueryPATH } from "../../../components"

const Rooms = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 500)
  const { data: rooms = [], isLoading } = GetAll([name], "/rooms", cookies.token, QueryPATH.rooms, { name })

  return (
    <div>
      <Caption title="Xonalar" count={rooms.length} icon={<PlusCircleOutlined />} />

      {/* Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <Input
          onChange={e => setSearch(e.target.value)}
          className="max-w-md"
          allowClear
          size="large"
          placeholder="Xona nomi bo'yicha qidirish..."
          prefix={<SearchOutlined className="text-muted-foreground" />}
        />
      </div>

      {/* Rooms Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <Empty
            image={<HomeOutlined className="text-6xl text-muted-foreground" />}
            description={<span className="text-muted-foreground">Xonalar topilmadi</span>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map(item => (
            <Card
              key={item.id}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-400/20 rounded-lg flex items-center justify-center">
                    <HomeOutlined className="text-orange-500 text-lg" />
                  </div>
                  <span className="text-foreground font-semibold">{item.name}</span>
                </div>
              }
              extra={
                <Button
                  onClick={() => navigate(`${item.id}`)}
                  type="text"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                  icon={<MoreOutlined />}
                />
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Sig'imi:</span>
                <Tag icon={<TeamOutlined />} color="blue" className="rounded-full">
                  {item.capacity} kishi
                </Tag>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Rooms
