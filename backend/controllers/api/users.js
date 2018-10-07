import { getModel } from '../../services/models';const createUser = (req, res) => {    const { role } = req.body;    const model = getModel(role);    let data;    if (role === 'manager') {        data = Object.assign({}, req.body, { full_name: req.body.fullName });    } else {        data = Object.assign({}, req.body);    }    return model.create(data)        .then(result => {            if (result) {                return res.status(201).json({                    ok: 1,                    message: `${role} is created`,                });            }            return res.status(400).json({                ok: 0,                message: `${role} is not created`,            });        })        .catch(err => res.status(500).json({            ok: 0,            message: err.message,        }));};export {    createUser,};