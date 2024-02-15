import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../componentes/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const {data, error} = useSWR('/api/get-promo', fetcher) 

  return (
    <div>
      <PageTitle title={'Home'}/>
      <p className='mt-12 text-center'>O restaurante x sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>
      <div className='text-center my-12'>
        <Link href='/pesquisa'>
          <a className='px-12 py-4 bg-blue-400 rounded-lg font-bold shadow-lg hover:bg-blue-300 hover:text-white '>Dar opinião ou sugestão</a>
        </Link>
      </div>
      {!data && <p className='text-center'>Caregando...</p>}
      {data && data.showCoupon &&
      <p className='my-12 text-center'>
        {data.message}
      </p>
      }
    </div>
  )
}

export default Index