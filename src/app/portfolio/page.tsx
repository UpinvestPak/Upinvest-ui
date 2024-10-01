import DefaultLayout from '@/components/Layouts/DefaultLayout'
import StatsGrid from '@/components/Portfolio/HomeSection'
import React from 'react'

function Page() {
  return (
    <div>
      <DefaultLayout>
      <div className="bg-white">
        <StatsGrid/>

        </div>
      </DefaultLayout>
    </div>
  )
}

export default Page
