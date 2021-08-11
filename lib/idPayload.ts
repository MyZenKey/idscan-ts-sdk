import axios, {AxiosResponse} from 'axios';

// @ts-ignore
import {v4 as uuidv4} from 'uuid';

const host = `https://idscan-qa.xcijv.com/`;


// @ts-ignore
/**
 * @export
 * @implements {IOneKosmos}
 */
const PayloadService = {
  async getSessionId(correlation_id: string, client_id :string ): Promise<AxiosResponse<any> | string>{
    const url = `https://idscan-qa.xcijv.com/auth/lookupSessionId/?correlation_id=${correlation_id}&client_id=${client_id}`;
    const retRep = await axios.get(`${url}`)
      .then(data => {
        if(!!data){
        const session_id = data.data.message.session_id;
        return session_id;
      }
      }).catch(error => {
        console.log(error);
        return error;
      });
return retRep;
  
  },

  async getStoredData(sessionId: string, publicKeyProvided: string): Promise<AxiosResponse<any> | string> {
    // let sp_pub = 'PSJ1sEgVCWRmvZ4TkyBGoyieXl9p852LcejD5fOHUxBJV4Q8Z5a6i+VltTJUsfzmuTkDn5+846OIXpjp+7VE4A==';
    // let sp_pr = 'ULcYSfv+5etTqBr2RxEF9HSJ33uJlkep9EL4+xzsWkI=';
    // const licenseKey = '5809b7b7-886f-4c88-9061-59a2baf485be';
    // const licenseKey_pilot = 'c77aa0ce-f00d-4843-86a9-38e6c1bf7d8e';
    //return `{“first_name“:“Ben“, “last_name“:“Dover“, “last_4_social” :“3844“}`;
    const url = `https://idscan-qa.xcijv.com/auth/getDataWithSessionId/`;
    const retRep = await axios.get(`${url}?session_id=${sessionId}&ppk=${publicKeyProvided}`)
      .then(data => {
        console.log('GetCall :' + data.data.message.payloadData);
        const proof = data.data.message.payloadData.data
        return proof;
      }).catch(error => {
        console.log(error);
        return error;
      });
    return retRep;


  },

};

export default PayloadService;
