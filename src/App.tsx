import Layout from '@components/layout'
import { useEffect, useState, useMemo, useCallback } from 'react'
import VirtualizedList from '@components/virtualized-list'
import { useQueryState } from 'nuqs'
import { generateFakeItems, type Item } from '@lib/faker'
import useDebounce from '@hooks/use-debounce'

const data = generateFakeItems(1000)

const App = () => {
  const [name, setName] = useQueryState('name')
  const debouncedName = useDebounce(name, 500)

  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(debouncedName?.toLowerCase() || ''),
    )
  }, [debouncedName])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const renderRow = useCallback(
    (item: Item) => (
      <div className='flex p-4'>
        <img src={item.image} alt={item.name} className='w-16 h-16 mr-4' />
        <div>
          <h2 className='font-bold'>{item.name}</h2>
          <p>{item.desc}</p>
        </div>
      </div>
    ),
    [],
  )

  return (
    <Layout>
      <div className='w-full my-2 max-w-md flex flex-col gap-4 p-2'>
        <input
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search by name'
          className='p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={() => setName(null)}
          className='bg-slate-500 w-fit text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition duration-200'
        >
          Clear
        </button>
      </div>

      {filteredData?.length > 0 && (
        <VirtualizedList
          items={filteredData}
          renderRow={renderRow}
          height={windowHeight}
          itemSize={100}
          width='100%'
        />
      )}
    </Layout>
  )
}

export default App
