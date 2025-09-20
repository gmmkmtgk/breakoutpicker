import { HeartOutlined,MedicineBoxOutlined,SafetyOutlined } from "@ant-design/icons";

const icons = {
    HeartOutlined,
    MedicineBoxOutlined,
    SafetyOutlined
}

const health = {
    id:'health',
    title:'Become Healthy',
    type:'group',
    children:[
        {
            id:'yoga',
            title:'Yoga',
            type:'item',
            url:'/yoga',
            icon: icons.SafetyOutlined
        },
        {
            id:'pranayam',
            title:'Pranayam',
            type:'item',
            url:'/pranayam',
            icon: icons.MedicineBoxOutlined,

        }
    ]
}

export default health;
