import fetch from '@/utils/fetch'

export function addSource(data) {
  return fetch({
    url: 'source/create',
    method: 'POST',
    data
  })
}

export function updateSource(data) {
  return fetch({
    url: 'source/update',
    method: 'POST',
    data
  })
}

export function deleteSource(data) {
  return fetch({
    url: 'source/delete',
    method: 'POST',
    data
  })
}

export function sourceList() {
  return fetch({
    url: '/db/meta/projects',
    method: 'get'
  })
}

export function tablesByBase(sourceId) {
  return fetch({
    url: `/db/meta/projects/${sourceId}/tables`,
    method: 'get'
  })
}

export function saveTableConfig(data) {
  return fetch({
    url: 'source/tables/save',
    method: 'POST',
    data
  })
}

export function getTableColumns(tableId) {
  return fetch({
    url: `/db/meta/tables/${tableId}`,
    method: 'get'
  })
}

export function getTableRows(data) {
  return fetch({
    url: `/db/data/noco/${data.sourceName}/${data.tableName}`,
    method: 'get',
    params: {
      fields: data.fields
    }
  })
}

export function linkedTablesByBase(sourceId) {
  return fetch({
    url: `/db/meta/projects/${sourceId}/tables`,
    method: 'get'
  })
}
