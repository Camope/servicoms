import axios from 'axios'

const host = 'https://servicomsapi-camorpe.b4a.run/api'// 'http://localhost:8080/api'
const HTTP_TO_HTTPS_ENABLE = true

function apiRequest(path, method, body) {
  let config = {
    method: method ?? 'get',
    maxBodyLength: Infinity,
    url: path,
    timeout: 10000,
    headers: {}
  }

  config.url = httpToHttps(path)

  if (body) {
    config.data = body,
      config.headers['Content-Type'] = 'application/json'
  }

  return axios.request(config)
}

function getApi(url) {
  return apiRequest(url, 'get')
}

function postApi(url, body) {
  return apiRequest(url, 'post', body)
}

function putApi(url, body) {
  return apiRequest(url, 'put', body)
}

function deleteApi(url) {
  return apiRequest(url, 'delete')
}

function patchApi(url, body) {
  return apiRequest(url, 'patch', body)
}


export async function getUsuariosApi() {
  return getApi(`${host}/usuarios`)
}

export async function getUsuarioPorLinkApi(userLink) {
  return getApi(userLink)
}

export async function loginUsuarioApi(usuarioId) {
  return getApi(`${host}/usuarios/${usuarioId}`)
}

export async function postUsuarioApi(user) {
  return postApi(`${host}/usuarios`, user)
}

export async function putUsuarioApi(userLink, user) {
  return putApi(userLink, user)
}

export async function patchUsuarioPasswordApi(userLink, password) {
  return patchApi(`${userLink}/password`, { password })
}

export async function deleteUsuarioApi(userLink) {
  return deleteApi(userLink)
}



export async function getComisionesApi() {
  return getApi(`${host}/comisiones`)
}

export async function getComisionApi(comisionLink) {
  return getApi(comisionLink)
}

export async function getComisionesPorUsuarioApi(userLink) {
  return getApi(`${userLink}/comisiones`)
}

export async function postComisionApi(comision) {
  return postApi(`${host}/comisiones`, comision)
}

export async function deleteComisionApi(comisionLink) {
  return deleteApi(comisionLink)
}

export async function putComisionApi(comisionLink, body) {
  return putApi(comisionLink, body)
}

export async function getStatsApi(params) {
  return getApi(`${host}/comisiones/stats${params ? ('?' + params) : ''}`)
}


export async function getSolicitantesPorComisionApi(comisionLink) {
  return getApi(`${comisionLink}/usuarios`)
}

export async function getSolicitudesPorUsuarioApi(userLink) {
  return getApi(`${userLink}/solicitudes`)
}

export async function postSolicitudApi(body) {
  return postApi(`${host}/solicitudes`, body)
}

export async function deleteSolicitudApi(solicitudLink) {
  return deleteApi(solicitudLink)
}


function httpToHttps(link) {

  if(HTTP_TO_HTTPS_ENABLE && link.startsWith('http:')) {
    link = link.replace('http:', 'https:')
  }

  return link
}
