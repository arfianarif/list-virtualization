import Layout from '@components/layout'
import { generateFakeItems, type Item } from './lib/faker'
import { useEffect, useState, useMemo, useCallback } from 'react'
import VirtualizedList from '@components/virtualized-list'
import { useQueryState } from 'nuqs'
import useDebounce from './hooks/use-debounce' // Import the useDebounce hook

const data = generateFakeItems(1000)

const App = () => {
  const [name, setName] = useQueryState('name')
  const debouncedName = useDebounce(name, 500) // Apply debounce to 'name' with a 500ms delay

  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  // Memoize the handleResize function to avoid recreating it on every render
  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  // Memoize filtered data to prevent recalculating it on every render
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(debouncedName?.toLowerCase() || ''),
    )
  }, [debouncedName])

  // Use effect to listen to window resize events
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  // Memoize the Row component so it's not recreated on each render
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
    [], // Empty dependency array means it will only be created once
  )

  return (
    <Layout>
      {/* Input for filtering by name */}
      <input
        value={name || ''}
        onChange={(e) => setName(e.target.value)} // Update query parameter
        placeholder='Search by name'
      />
      <button onClick={() => setName(null)}>Clear</button>

      {/* Display the filtered data */}
      {filteredData?.length > 0 && (
        <VirtualizedList
          items={filteredData} // Pass filtered data to the virtualized list
          renderRow={renderRow} // Pass memoized row renderer
          height={windowHeight} // Dynamic height based on window size
          itemSize={100} // Each item height
          width='100%' // Full width
        />
      )}
    </Layout>
  )
}

export default App
