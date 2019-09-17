import Api from 'edgy-api';
import mockApiData from './MockApiData';

class ApiExt extends Api {
  constructor() {
    super(mockApiData);
  }
}

export default new ApiExt();
