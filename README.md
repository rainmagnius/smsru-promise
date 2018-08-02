smsru-promise
======

Nodejs module for API of [sms.ru](http://sms.ru) with Promises

The full API documentation(on Russian only) – [http://sms.ru/?panel=api](http://sms.ru/?panel=api)

## Usage

```js
const SMS = require('smsru-promise');
```

Authorization (with api_id):
```js
const sms = new SMS({apiID: "YOUR_SECRET_APP_ID"});
```

Authorization (with a login/password pair):
```js
let sms = new SMSru({
    login: 'YOUR_LOGIN',
    password: 'YOUR_PASSWORD'
});
```

Send SMS:
```js
sms.send({
    to: 'PHONE_NUMBER',
    text: 'text'
}).then(res=> {
    //process
}).catch(err=> {
    //process
});
```

Check status of sent SMS:
```js
sms.status({
    ids: 'SMS_ID'
}).then(res=> {
    //process
});
```

Check cost of SMS:
```js
sms.cost({
    to: 'PHONE_NUMBER',
    text: 'text'
}).then(res=> {
    //process
})
```

## License (ISC)

See the [License file]('https://github.com/rainmagnius/smsru-promise/blob/master/LICENSE') for details