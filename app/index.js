import 'whatwg-fetch'

export function complexify(s) {
    fetch('/transform/' + encodeURIComponent(s))
        .then(response => response.text())
        .then(body => { document.getElementById('result').textContent = body })
}