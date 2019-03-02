import Datastore from 'nedb'
import path from 'path'

const db = {
  tableData: new Datastore({ filename: path.join('tableData.db'), autoload: true }),
}

export default {
  db
}
