import React from 'react'
import {ReactComponent as TotalOrder} from '../../../../Assets/Icon/totalOrder.svg'
import {ReactComponent as TotalDelivered} from '../../../../Assets/Icon/orderDelivered.svg'
import {ReactComponent as TotalCancelled} from '../../../../Assets/Icon/orderCancelled.svg'
import {ReactComponent as TotalRevenue} from '../../../../Assets/Icon/Revenue.svg'
import {ReactComponent as TotalChef} from '../../../../Assets/Icon/Chef.svg'
import {ReactComponent as TotalCustomer} from '../../../../Assets/Icon/totalCustomer.svg'
import {ReactComponent as Orderinprogress} from '../../../../Assets/Icon/orderinprogress.svg'

export const DashboardCardData = [
    {
        title: "Total Orders",
        icon: <TotalOrder/> ,
        number: "80"
    },  
    {
        title: "Total Delivered",
        icon: <TotalDelivered/> ,
        number: "75"
    },
    {
        title: "Total Cancelled",
        icon: <TotalCancelled /> ,
        number: "5"
    },
    {
        title: "Total Revenue",
        icon: <TotalRevenue /> ,
        number: "2000"
    },
    {
        title: "Total Chef",
        icon: <TotalChef /> ,
        number: "50"
    },
    {
        title: "Total Customer",
        icon: <TotalCustomer /> ,
        number: "200"
    },
    {
        title: "Order in Progress",
        icon: <Orderinprogress /> ,
        number: "10"
    },
]