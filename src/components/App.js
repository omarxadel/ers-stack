import React, { useState, useEffect } from 'react'
const electron = require('electron')
const ipc = electron.ipcRenderer

const App = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        ipc.send('mainWindowLoaded')
        ipc.on('resultSent', function (evt, result) {
            setUser(result[0].name)
        })
    })

    return (
        <div className="app">
            <h1>Good Morning, {user}</h1>
        </div>
    )
}

export default App
