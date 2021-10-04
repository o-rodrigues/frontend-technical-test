import moment from "moment";
import { TIME_FORMAT } from "utils/constants";

export const getMessageTime = (timestamp: number): string => moment.unix(timestamp).format(TIME_FORMAT)
