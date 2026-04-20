#!/usr/bin/env node
// Placeholder wrapper for the OpenRouter API.
// Configure OPENROUTER_API_URL and OPENROUTER_API_KEY in environment variables.

const base = process.env.OPENROUTER_API_URL || 'https://api.openrouter.example'
const key = process.env.OPENROUTER_API_KEY || 'REPLACE_ME'

async function call(method, path, body) {
  const url = new URL(path, base).toString()
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await res.text()
  console.log('Status:', res.status)
  console.log(text)
}

// Simple CLI: node openrouter-wrapper.js GET /status
const [,, method='GET', path='/'] = process.argv
call(method, path).catch(err => { console.error(err); process.exit(1) })
