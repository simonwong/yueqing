// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react'
import './Counter.scss'
import styles from './Counter.module.scss'

interface CounterProps {
  // eslint-disable-next-line react/require-default-props
  title?: string
}

const Counter: React.FC<CounterProps> = ({ title }) => {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrapper}>
      <h3 className="title3">{title}</h3>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(c => c + 1)}>
        increase
      </button>
    </div>
  )
}

export default Counter
