// Util de API centralizado
// - helpers: get/post/patch/delete
// - adiciona credentials
// - adiciona CSRF token para métodos mutantes
// - parsing seguro de JSON
// - handler global para 401/403 (setAuthHandler)

function getCookie(name) {
  const v = `; ${document.cookie}`
  const parts = v.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

let _authHandler = null
export function setAuthHandler(fn) {
  _authHandler = fn
}

async function safeParseJSON(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch (err) {
    return text
  }
}

async function request(path, { method = 'GET', body = null, headers = {} } = {}) {
  const opts = {
    method,
    credentials: 'include',
    headers: { ...headers },
  }

  if (body != null) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body)
    if (!opts.headers['Content-Type']) opts.headers['Content-Type'] = 'application/json'
  }

  // Adiciona token CSRF para métodos mutantes
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = getCookie('csrftoken') || getCookie('csrf') || getCookie('CSRF-TOKEN')
    if (csrf) opts.headers['X-CSRFToken'] = csrf
  }

  try {
    const res = await fetch(path, opts)

    // Autenticação inválida
    if (res.status === 401 || res.status === 403) {
      if (typeof _authHandler === 'function') _authHandler(res.status)
      return { ok: false, status: res.status, error: 'autenticacao' }
    }

    if (res.status === 204) return { ok: true, status: 204, data: null }

    const data = await safeParseJSON(res)

    if (res.ok) return { ok: true, status: res.status, data }

    // Tenta extrair mensagem de erro útil
    let message = null
    if (data) {
      if (typeof data === 'string') message = data
      else if (data.detail) message = data.detail
      else if (data.error) message = data.error
      else message = JSON.stringify(data)
    }

    return { ok: false, status: res.status, error: message || res.statusText }
  } catch (err) {
    return { ok: false, status: 0, error: err.message || 'network_error' }
  }
}

export const get = (path) => request(path, { method: 'GET' })
export const post = (path, body) => request(path, { method: 'POST', body })
export const patch = (path, body) => request(path, { method: 'PATCH', body })
export const del = (path) => request(path, { method: 'DELETE' })
