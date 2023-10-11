import Calculator from './components/Calculator'
import { useEffect, useState } from 'react'

import { getDollar } from './services/getDollar'

function App () {
  const [amount, setAmount] = useState();
  const [dollar, setDollar] = useState()

  useEffect(() => {
    const getCotizacion = async () => {
      try {
        const result = await getDollar()
        setDollar(result)
      } catch (error) {
        console.error(error)
      }
    }
    getCotizacion()
  }, [])

  const onChange = (value) => {

    if (value < 0) return
    setAmount(value)

  }

  return (
    <main >
      <section className='absolute top-0 left-0 z-1' >
        <img className='object-cover w-screen h-screen' src="https://res.cloudinary.com/demf45vva/image/upload/v1685492713/descarga_inkqao.webp" alt="bg" />
      </section >
      <section className='relative z-40 flex items-center justify-center w-screen h-screen'>
        <section className='grid gap-4 p-4 bg-white shadow-xl md:flex rounded-3xl'>
          <div className='md:flex-[0.75]'>
            <Calculator amount={amount} onChange={onChange} />
          </div>
          <div className='grid md:flex-1 md:min-w-[550px]  items-center  min-h-[300px] bg-emerald-600 rounded-3xl'>
            <ul className='flex flex-col gap-4'>
              {
                dollar?.map(({ nombre, venta }) => {
                  const total = amount ? Number(amount / venta) : venta
                  return (
                    <li key={nombre} className='flex items-center justify-between gap-6 px-4 py-2 text-md md:gap-14'>
                      <div className='text-emerald-100 max-w-[125px] md:max-w-lg font-medium'>{nombre}</div>
                      <div className='flex items-center gap-4 text-3xl'>
                        {
                          amount ? <div className='font-mono text-lg font-bold text-emerald-400 md:text-xl'>{Number(total).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'USD'
                          })
                          }
                          </div> : null
                        }
                        <div className='font-mono text-2xl font-bold text-emerald-300 md:text-3xl'>{Number(venta).toLocaleString('es-AR', {
                          style: 'currency',
                          currency: 'ARS'
                        })}
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </section>
      </section>
    </main >
  )
}

export default App
