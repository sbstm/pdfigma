'use client' // This directive indicates the code will run on the client-side

import React, { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { saveAs } from 'file-saver'

const Codeeditor = () => {
  const [code, setCode] = useState('// Start coding here...')

  useEffect(() => {
    const storedCode = localStorage.getItem('code')
    if (storedCode) {
      setCode(storedCode)
    }
  }, [])

  const handleEditorChange = (value: string = '', event: any) => {
    setCode(value)
    localStorage.setItem('code', value) // Automatically save to local storage
  }

  const handleRunCode = () => {
    try {
      // eslint-disable-next-line
      const result = eval(code)
      alert(result) // Simple alert for now, consider more advanced output
    } catch (error) {
      alert('Error in code: ' + error)
    }
  }

  const handleSaveCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    saveAs(blob, 'script.js')
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <Editor
        width="100%"
        height="600px"
        theme="vs-dark" // Choose a suitable theme
        language="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: true }, lineNumbers: 'on' }} // Customize options
      />

      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRunCode}
        >
          Run
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveCode}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default Codeeditor
