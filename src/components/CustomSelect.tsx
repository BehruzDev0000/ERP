import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'
import { type ChangeEvent, type FC } from 'react'
import { instance } from '../hooks'
import { useCookies } from 'react-cookie'
import { USE_MOCK_DATA, getMockDataByUrl } from '../mockData'

interface CustomSelectType {
    extraClass?:string,
    requestTitle:`/teachers` | "/students" | "/groups" | "/rooms" | "/stacks",
    stackId?:string | number | null,
    queryKey:string,
    setValue:any
    value:any,
    disabled?:boolean,
    params?:any,
    filterProps?:any[]
}

const CustomSelect:FC<CustomSelectType> = ({extraClass, requestTitle, params, filterProps, queryKey, setValue, value, disabled}) => {
    const [cookies] = useCookies(['token'])
    const {data = []} = useQuery({
        queryKey:[queryKey, filterProps && [...filterProps]],
        queryFn: async () => {
            if (USE_MOCK_DATA) {
                // Return mock data when server is not available
                const mockData = getMockDataByUrl(requestTitle, params)
                return mockData.map((item: any) => ({
                    label: requestTitle === "/teachers" || requestTitle === "/students" 
                        ? `${item.firstName} ${item.lastName}` 
                        : `${item.name}`,
                    value: item.id
                }))
            }
            return instance(cookies.token).get(requestTitle, {
                params: params ? params : {}
            }).then(res => res.data.data.map((item: any) => ({
                label: requestTitle === "/teachers" || requestTitle === "/students" 
                    ? `${item.firstName} ${item.lastName}` 
                    : `${item.name}`,
                value: item.id
            })))
        }
    }) 

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        setValue(e)
    }
    return (
        <Select
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={`w-70! ${extraClass}`}
            allowClear
            size="large"
            showSearch={{ optionFilterProp: 'label' }}
            placeholder={`Choose ${requestTitle.split("").splice(1).join("")}`}
            options={data}
        />
    )
}

export default CustomSelect
