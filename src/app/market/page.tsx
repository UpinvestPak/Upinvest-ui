import DefaultLayout from '@/components/Layouts/DefaultLayout'
import MarketTable from '@/components/market/marketTable'
import React from 'react'

function page() {
  return (
    <div>
      <DefaultLayout>
        <MarketTable/>
      </DefaultLayout>
    </div>
  )
}

export default page
