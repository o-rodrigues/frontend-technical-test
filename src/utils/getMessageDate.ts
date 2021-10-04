import moment, { Moment } from "moment";
import { DATE_FORMAT } from "utils/constants";

export function getMessageDate(timestamp: number): string {
  const today: Moment = moment().startOf('day')
  const yesterday: Moment = moment().subtract(1, 'days').startOf('day')
  const date: Moment = moment.unix(timestamp)


  if (date.isSame(today, 'd')) return 'today'
  if (date.isSame(yesterday, 'd')) return 'yesterday'
  return date.format(DATE_FORMAT)
}
