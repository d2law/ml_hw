const axios = require('axios');
const fs = require('fs');
//var jequal = require('node-json-equal');

describe("Test getData", () => {

  var axiosConfig = {
    headers: {
      'content-type': 'multipart/form-data'  // Is set automatically
    }
  }

//   beforeAll(async (done) => {
//     var data = await axios.post('http://localhost:8000/api/auth', bodyFormData, axiosConfig)
//       .then(function (response) {
//         return response.data;
//       });

//     token = {
//       headers: { 'authorization': `Bearer ${data.token} ` }
//     }

//     done();
//   })

  test("insertData Test case #1, correct data insert", async () => {
    var insertBody = new FormData();
    const stream = fs.createReadStream('./__tests__/testfile.csv');;
    insertBody.append("uploadFile", stream);

    var res = await axios.post('http://localhost:43001/sales/record', insertBody
    // { headers: { "content-type": formHeaders, "Content-Length": fs.statSync(stream)['size']},
    // }
    )

    expect(res.data.message).toEqual("data inserted");

    //I should check the insert record in DB too, but no time to implement 
  });

//   test("insertData Test case #4, error return", async () => {
//     var insertBody = new FormData();

//     insertBody.append('name', 'apple_t4');
//     insertBody.append('valid', 99);
//     insertBody.append('count', 100);

//     var res = await axios.post('http://localhost:8000/api/insertData', insertBody, token)
//     expect(res.data.error).toEqual("invalid type (BOOLEAN)");
//   });


//   test("insertData Test case #12, error return", async () => {
//     var insertBody = new FormData();
//     insertBody.append('name', 'apple_t4');
//     insertBody.append('name', 'apple_t4');

//     var res = await axios.post('http://localhost:8000/api/insertData', insertBody, token)
//     expect(res.data.error).toEqual("not support multiple fields");

//   });

});
