import { useWindowManager } from '../Window/useWindowManager'
import Window from '../Window/Window'
import DesktopIcon from './DesktopIcon'
import Taskbar from '../Taskbar/Taskbar'
import AboutWindow from '../windows/AboutWindow'
import ArticlesWindow from '../windows/ArticlesWindow'
import ProjectsWindow from '../windows/ProjectsWindow'
import VisualArtWindow from '../windows/VisualArtWindow'
import PapersWindow from '../windows/PapersWindow'

const ICONS = {
  about:    'https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png',
  articles: 'https://win98icons.alexmeub.com/icons/png/notepad-0.png',
  projects: 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-0.png',
  art:      'https://win98icons.alexmeub.com/icons/png/paint_old-0.png',
  papers:   'https://win98icons.alexmeub.com/icons/png/msagent-3.png',
  email:    'https://win98icons.alexmeub.com/icons/png/address_book_users.png',
}

export default function Desktop() {
  const { windows, openWindow, closeWindow, bringToFront, updatePosition } =
    useWindowManager()

  function makeWindowProps(id) {
    return {
      id,
      isOpen: windows[id].isOpen,
      zIndex: windows[id].zIndex,
      initialPosition: windows[id].position,
      onClose: () => closeWindow(id),
      onFocus: () => bringToFront(id),
      onPositionChange: updatePosition,
    }
  }

  return (
    <div className="desktop">
      <div className="desktop-icons">
        <DesktopIcon label="About Me"   icon={ICONS.about}    onClick={() => openWindow('about')} />
        <DesktopIcon label="Articles"   icon={ICONS.articles} onClick={() => openWindow('articles')} />
        <DesktopIcon label="Projects"   icon={ICONS.projects} onClick={() => openWindow('projects')} />
        <DesktopIcon label="Visual Art" icon={ICONS.art}      onClick={() => openWindow('art')} />
        <DesktopIcon label="Papers"     icon={ICONS.papers}   onClick={() => openWindow('papers')} />
        <DesktopIcon
          label="Email Me"
          icon={ICONS.email}
          href="mailto:nicolascardonal96@gmail.com"
        />
      </div>

      <Window {...makeWindowProps('about')} title="Welcome — Nicolas Cardona" icon={ICONS.about} width={520}>
        <AboutWindow />
      </Window>

      <Window {...makeWindowProps('articles')} title="C:\My_Docs\Articles" icon={ICONS.articles}>
        <ArticlesWindow />
      </Window>

      <Window {...makeWindowProps('projects')} title="C:\Dev\Projects" icon={ICONS.projects} width={560}>
        <ProjectsWindow onOpenWindow={openWindow} />
      </Window>

      <Window {...makeWindowProps('art')} title="C:\Art\Pop_Art_&_Toys" icon={ICONS.art} width={550}>
        <VisualArtWindow />
      </Window>

      <Window {...makeWindowProps('papers')} title="C:\Research\Papers_&_Media" icon={ICONS.papers}>
        <PapersWindow />
      </Window>

      <Taskbar />
    </div>
  )
}
