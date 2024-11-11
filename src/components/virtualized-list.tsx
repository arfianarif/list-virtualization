import React from 'react'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

type VirtualizedListProps<T> = {
  items: T[]
  renderRow: (item: T, index: number) => React.ReactNode
  height?: number
  itemSize: number
  width?: string | number
}

const VirtualizedList = <T,>({
  items,
  renderRow,
  height = 400,
  itemSize,
  width = '100%',
}: VirtualizedListProps<T>) => {
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style} className='border-b border-gray-200'>
      {renderRow(items[index], index)}
    </div>
  )

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemSize}
      width={width}
    >
      {Row}
    </List>
  )
}

export default VirtualizedList
