//main.js

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/songs', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'New Slang',
            artist: 'The Shins'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/songs', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'New Slang'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No slang to boot') {
            messageDiv.textContent = 'No new slang to boot'
        } else {
        window.location.reload(true)
        }
    })
    .catch(console.error)
})
