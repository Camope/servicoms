import axios from 'axios'

const host = 'http://localhost:8080/api'

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


export async function getUsersApi() {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios`, 'get')
}

export async function getUserByLinkApi(userLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${userLink}`, 'get')
}

export async function loginUserApi(usuarioId) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios/${usuarioId}`, 'get')
}

export async function postUserApi(user) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/usuarios`, 'post', user)
}

export async function putUserApi(userLink, body) {
  await resolveAfterXSeconds(2000)
  return apiRequest(userLink, 'put', body)
}

export async function patchUserPasswordApi(userLink, password) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${userLink}/password`, 'patch', { password })
}

export async function deleteUserApi(userLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(userLink, 'delete')
}



export async function getComisionesApi() {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones`, 'get')
}

export async function getVacancyApi(vacancyLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(vacancyLink, 'get')
}

export async function getVacanciesByUserApi(userLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${userLink}/comisiones`, 'get')
}

export async function postComisionesApi(comision) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/comisiones`, 'post', comision)
}

export async function deleteVacancyApi(vacancyLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(vacancyLink, 'delete')
}

export async function putVacancyApi(vacancyLink, body) {
  await resolveAfterXSeconds(2000)
  return apiRequest(vacancyLink, 'put', body)
}



export async function getApplicantsByVacancyApi(VacancyLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${VacancyLink}/usuarios`, 'get')
}

export async function getApplicationsByUserApi(userLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${userLink}/solicitudes`, 'get')
}

export async function postApplicationApi(body) {
  await resolveAfterXSeconds(2000)
  return apiRequest(`${host}/solicitudes`, 'post', body)
}

export async function deleteApplicationApi(ApplicationLink) {
  await resolveAfterXSeconds(2000)
  return apiRequest(ApplicationLink, 'delete')
}

function resolveAfterXSeconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, x)
  });
}

