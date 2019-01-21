const conf = require('../config/http');
const Controller = {};

Controller.beforeSave = (Parse) => {
    return async (req) => {
        const user = req.user,
            credit = req.object;
        try {
            if (!credit) throw new Parse.Error(400, 'You cannot save purchase a null credit');

            // New Credit
            if (!credit.existed()) {
                if (!user) throw new Parse.Error(401, 'You must be logged in to purchase credit.');
                const acl = new Parse.ACL();
                acl.setPublicReadAccess(false);
                acl.setRoleWriteAccess('admin', true);
                acl.setRoleReadAccess('admin', true);
                acl.setReadAccess(user, true);

                credit.setACL(acl);
                credit.set('user', user);
                credit.set('paid', false);
            }
        } catch (error) {
            throw error;
        }
    };
};

Controller.afterSave = (Parse) => {
    return async (req) => {
        const credit = req.object;
        const user = req.user;

        if (!credit) throw new Parse.Error(404, "Cannot store a non-existent Credit request.");
        if (!user) throw new Parse.Error(404, "User must be logged in to purchase credits.");

        if (!credit.existed()) {
            try {
                const res = await conf.http.post(conf.baseURL, {
                    'reference': `${credit.id}`,
                    'email': `${user.get('email')}`,
                    'amount': `${credit.get('amount')}`
                }, conf.headers);

                const d = res.data
                const authorization_url = d.data.authorization_url;
                const access_code = d.data.access_code;
                const message = d.message;

                credit.set('authorization_url', authorization_url);
                credit.set('access_code', access_code);
                credit.set('message', message);

                credit.save(null, {
                    useMasterKey: true
                });
            } catch (error) {
                throw error;
            }
        }
    }
}
module.exports = Controller;