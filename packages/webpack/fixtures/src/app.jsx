import Counter from './components/Counter'
import styles from './app.module.css'

const app = () => (
  <div className={styles.content}>
    <h1>App</h1>

    <Counter title="Counter title" />
  </div>
)

export default app
