import SourceMaker from 'Utils/sourcemaker'
// 报告查询
import other from './other'
import user from './user'
export default new SourceMaker({
    other,
    user
}, 'API')