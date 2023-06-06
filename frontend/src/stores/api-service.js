import axios from 'axios'

const host = 'http://localhost:8080/api'
const URL_COMISION_ID_PATTERN = /\/comisiones\/[0-9]+\/*$/
const URL_USUARIO_ID_PATTERN = /\/usuarios\/[0-9]+\/*$/
const URL_SOLICITUD_ID_PATTERN = /\/solicitudes\/[0-9]+\/*$/


function apiRequest(path, method, body) {
  let config = {
    method: method ?? 'get',
    maxBodyLength: Infinity,
    url: path,
    headers: {}
  }

  if (body) {
    config.data = body,
      config.headers['Content-Type'] = 'application/json'
  }

  return axios.request(config)
}

export async function getUsuarioPorIdApi(usuarioId) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios/${usuarioId}`, 'get')
}

export async function getSolicitudesPorUsuarioApi(usuarioId) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios/${usuarioId}/solicitudes`, 'get')
}

export async function getComisionesPorUsuarioApi(usuarioId) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios/${usuarioId}/comisiones`, 'get')
}

// Endpoints de Comisiones

export async function getComisionesApi() {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones`, 'get')
}

export async function postComisionesApi(comision) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones`, 'post', comision)
}

export async function getComisionesPorIdApi(id) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones/${id}`, 'get')
}

export async function putComisionApi(comision, id) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones/${id}`, 'put', comision)
}

export async function deleteComisionApi(id) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones/${id}`, 'delete')
}

export async function getUsuariosPorComisionApi(id) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones/${id}/usuarios`, 'get')
}


export async function postSolicitudApi(comision, usuario) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/solicitudes`, 'post', {comision, usuario})
}

export async function deleteSolicitudApi(id) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/solicitudes/${id}`, 'delete')
}


export function getComisionIdApi(url) {
  return getIdApi(url, URL_COMISION_ID_PATTERN)
}

export function getUsuarioIdApi(url) {
  return getIdApi(url, URL_USUARIO_ID_PATTERN)
}

export function getSolicitudIdApi(url) {
  return getIdApi(url, URL_SOLICITUD_ID_PATTERN)
}

export function getIdApi(url, pattern) {
  const ID_PATTERN = /[0-9]+/

  let id = url.match(pattern);
  return id.length == 1 ? id[0].match(ID_PATTERN)[0] : null
}

function resolveAfterXSeconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, x);
  });
}
// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
