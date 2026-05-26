import { useRef, useState } from 'react'
import { Upload, X, FileText, Image } from 'lucide-react'

export function FileUpload({ onFile, accept = '*', maxSizeMB = 5, label = 'Upload file', multiple = false }) {
  const inputRef = useRef(null)
  const [files, setFiles]   = useState([])
  const [error, setError]   = useState('')
  const [drag,  setDrag]    = useState(false)

  function handleFiles(fileList) {
    setError('')
    const arr = Array.from(fileList)
    const tooBig = arr.find(f => f.size > maxSizeMB * 1024 * 1024)
    if (tooBig) { setError(`File "${tooBig.name}" exceeds ${maxSizeMB}MB limit.`); return }
    setFiles(multiple ? arr : [arr[0]])
    onFile(multiple ? arr : arr[0])
  }

  function remove(idx) {
    const next = files.filter((_, i) => i !== idx)
    setFiles(next)
    onFile(multiple ? next : null)
  }

  const Icon = accept.includes('image') ? Image : FileText

  return (
    <div className="space-y-2">
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${drag ? 'border-brand-blue bg-brand-ice scale-[1.01]' : 'border-gray-300 hover:border-brand-blue/60 hover:bg-brand-ice/40'}
        `}
      >
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-xs text-gray-400 mt-1">Drag & drop or click — max {maxSizeMB}MB</p>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden"
          onChange={e => handleFiles(e.target.files)} />
      </div>

      {error && <p className="error-msg">{error}</p>}

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 bg-brand-ice rounded-lg px-3 py-2">
              <Icon className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span className="text-xs text-gray-700 flex-1 truncate">{f.name}</span>
              <span className="text-xs text-gray-400">{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={e => { e.stopPropagation(); remove(i) }} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
