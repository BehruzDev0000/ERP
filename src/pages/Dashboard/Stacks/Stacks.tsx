import { MoreOutlined, PlusCircleOutlined, SearchOutlined, AppstoreOutlined } from "@ant-design/icons"
import { Button, Card, Input, Spin, Empty } from "antd"
import { debounce } from "../../../hooks"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAll } from "../../../services"
import { Caption, QueryPATH } from "../../../components"

const Stacks = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 500)
  const { data: stacks = [], isLoading } = GetAll([name], "/stacks", cookies.token, QueryPATH.stacks, { name })

  return (
    <div>
      <Caption title="Stacks" count={stacks.length} icon={<PlusCircleOutlined />} />

      {/* Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <Input
          onChange={e => setSearch(e.target.value)}
          className="max-w-md"
          allowClear
          size="large"
          placeholder="Stack nomi bo'yicha qidirish..."
          prefix={<SearchOutlined className="text-muted-foreground" />}
        />
      </div>

      {/* Stacks Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      ) : stacks.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <Empty
            image={<AppstoreOutlined className="text-6xl text-muted-foreground" />}
            description={<span className="text-muted-foreground">Stacklar topilmadi</span>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stacks.map(item => (
            <Card
              key={item.id}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                    <AppstoreOutlined className="text-primary text-lg" />
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
              <p className="text-muted-foreground line-clamp-2">{item.description || "Tavsif mavjud emas"}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Stacks
