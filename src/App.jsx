import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Editor from './pages/Editor.jsx'
import Viewer, { Exemples } from './pages/Viewer.jsx'
import Installer from './pages/Installer.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/editeur" element={<Editor />} />
      <Route path="/exemples" element={<Exemples />} />
      <Route path="/installer" element={<Installer />} />
      <Route path="/exemples/:key" element={<Viewer sample />} />
      <Route path="/partage" element={<Viewer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
