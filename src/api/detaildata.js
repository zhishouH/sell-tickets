import request from '@/utils/request'

export function detaildataAPI (id) {
  return request({
    url: `https://m.maizuo.com/gateway?filmId=${id}&k=9460280`,
    method: 'GET',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16335854152126803380469761"}',
      'X-Host': 'mall.film-ticket.film.info'
    }
  })
}
