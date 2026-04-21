import FileTableWindow from './FileTableWindow'
import { papers } from '../../data/papers'

export default function PapersWindow() {
  return (
    <FileTableWindow
      items={papers}
      dirLabel="Index of /research/papers_media"
    />
  )
}
