import { Routes, Route } from 'react-router-dom'
import Desktop from './components/Desktop/Desktop'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/single-post/:slug" element={<BlogPost />} />
      <Route path="/single-post/:year/:month/:day/:slug" element={<BlogPost />} />
    </Routes>
  )
}
