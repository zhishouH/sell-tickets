import request from '@/utils/request'

export function cinemaAPI (id) {
  return request({
    url: `gateway?cityId=${id}&ticketFlag=1&k=9613154`,
    method: 'GET',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16335854152126803380469761","bc":"440100"}',
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  })
}
