import './App.css'
import Calculator from './components/Calculator'
import { useEffect, useState } from 'react'

// import data from './data.json'
import { getDollar } from './services/getDollar'

function App () {
  const [amount, setAmount] = useState(0);
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

  return (
    <main >
      <section className='absolute top-0 left-0 z-1' >
        <img className='h-screen w-screen object-cover' src="https://res.cloudinary.com/demf45vva/image/upload/v1685492713/descarga_inkqao.webp" alt="bg" />
      </section >
      <section className='z-40 flex relative h-screen w-screen items-center justify-center'>
        <section className='grid md:flex bg-white gap-4 p-4 rounded-3xl shadow-xl'>
          <div className='md:flex-[0.75]'>
            <Calculator amount={amount} onChange={value => setAmount(value)} />
          </div>
          <div className='grid md:flex-1 bg-emerald-600 rounded-3xl'>
            <ul className='flex  flex-col gap-4'>
              {
                dollar?.map(({ nombre, venta }) => {
                  const total = amount ? Number(amount / venta) : venta
                  return (
                    <li key={nombre} className='flex text-md items-center gap-6 md:gap-14 justify-between px-4 py-2'>
                      <div className='text-emerald-100 font-medium'>{nombre}</div>
                      <div className='text-3xl flex items-center gap-4'>
                        {
                          amount ? (<div className='font-bold font-mono text-emerald-400 text-lg md:text-xl'>{Number(total).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'USD'
                          })
                          }
                          </div>) : null
                        }
                        <div className='font-bold font-mono text-emerald-300 text-2xl md:text-3xl'>{Number(venta).toLocaleString('es-AR', {
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
