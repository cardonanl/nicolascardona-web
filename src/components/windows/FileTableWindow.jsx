export default function FileTableWindow({ items, dirLabel }) {
  return (
    <div style={{ padding: '4px 8px' }}>
      <p style={{ fontSize: 11, margin: '0 0 6px', color: '#444' }}>{dirLabel}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #808080' }}>
            <th style={{ textAlign: 'left', padding: '2px 4px', fontWeight: 'bold' }}>Título</th>
            <th style={{ textAlign: 'left', padding: '2px 4px', fontWeight: 'bold' }}>Publicación</th>
            <th style={{ textAlign: 'left', padding: '2px 4px', fontWeight: 'bold' }}>Año</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '3px 4px' }}>
                <img
                  src="https://win98icons.alexmeub.com/icons/png/notepad-0.png"
                  alt=""
                  width={16}
                  height={16}
                  style={{ imageRendering: 'pixelated', verticalAlign: 'middle', marginRight: 4 }}
                />
                {item.url && item.url !== '#' ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                ) : (
                  <span>{item.title}</span>
                )}
              </td>
              <td style={{ padding: '3px 4px', fontSize: 11, color: '#444' }}>
                {item.venue || item.date}
              </td>
              <td style={{ padding: '3px 4px', whiteSpace: 'nowrap' }}>
                {item.date ? item.date.slice(0, 4) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="status-bar" style={{ marginTop: 10 }}>
        <p className="status-bar-field">{items.length} object(s)</p>
      </div>
    </div>
  )
}
