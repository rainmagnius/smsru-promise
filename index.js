'use strict';

const request = require('request-promise-native');
const url = require('url');

module.exports = class SmsRu {

    constructor({ apiID, login, password, from, translit, test, partnerID }) {
        this.params = {
            json: 1
        };
        if (apiID)
            this.params.api_id = apiID;
        else if (login && password) {
            this.params.login = login;
            this.params.password = password;
        }
        this.sendSMSParams = {
            from: from,
            translit: (translit) ? 1 : undefined,
            test: (test) ? 1 : undefined,
            partner_id: partnerID
        };
    }

    async apiCall({ method, params }) {
        let uri = url.format({
            protocol: 'https',
            hostname: 'sms.ru',
            pathname: method,
        });

        let res = await request.post(uri, {
            json: true,
            form: { ...this.params, ...params }
        });
        if (res.status && res.status === 'OK')
            return res;
        else
            throw res;
    }

    balance() {
        return this.apiCall({ method: 'my/balance' });
    }

    limit() {
        return this.apiCall({ method: 'my/limit' });
    }

    free() {
        return this.apiCall({ method: 'my/free' });
    }

    senders() {
        return this.apiCall({ method: 'my/senders' });
    }

    stopList() {
        return this.apiCall({ method: 'stoplist/get' });
    }

    stopListAdd({ phone, comment }) {
        return this.apiCall({ method: 'stoplist/add', params: { stoplist_phone: phone, stoplist_text: comment } });
    }

    stopListDel({ phone }) {
        return this.apiCall({ method: 'stoplist/add', params: { stoplist_phone: phone } });
    }

    ucm({ phone }) {
        return this.apiCall({ method: 'ucs/sms' });
    }

    status({ ids }) {
        return this.apiCall({ method: 'sms/status', params: { sms_id: Array.isArray(ids) ? ids.join() : ids } });
    }

    cost({ to, msg, from, translit }) {
        let params = {}
        if (to) params.to = to;
        if (msg) params.msg = msg;
        if (from) params.from = from;
        if (translit) params.translit = translit;

        return this.apiCall({
            method: 'sms/cost',
            params: { ...this.sendSMSParams, ...params }
        });
    }

    send({ to, msg, messages, from, time, delay, translit, test, partnerID }) {
        let params = {}
        if (from) params.from = from;
        if (test) params.test = test;
        if (partnerID) params.partner_id = partnerID;
        if (translit) params.translit = translit;

        if (messages) {
            params.multi = [];
            messages.forEach(m => params.multi[m.to] = m.msg);
        }
        else {
            params.to = to;
            params.msg = msg;
        }

        if (time)
            params.time = time;
        else if (delay)
            params.time = ((Date.now() + delay) / 1000).toFixed();

        return this.apiCall({
            method: 'sms/send',
            params: { ...this.sendSMSParams, ...params }
        });
    }
}