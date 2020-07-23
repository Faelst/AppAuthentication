const db = require('../DataBase/Control')

module.exports.authentication = async (req, res) => {

    let { username, password } = req.query;

    username = username.replace(/[.,-\s]/g, ''); // username vai ser o numero contrato
    password = password.replace(/[.,-\s]/g, ''); // vai ser o CPF do cliente.

    const selectQuery = `SELECT 
                            c.* 
                        FROM contracts c 
                            INNER JOIN people p on p.id = c.client_id 
                        WHERE c.contract_number = '${username}' 
                            AND p.tx_id = '${password}'`;

    db.select(selectQuery,
        function (err, result) {
            if (!result.length) return res.send({
                "access": false,
                "subscriber_id": "", //ID único por usuario
                "country_code": ""
            })
            return res.send({
                "access": true,
                "subscriber_id": result[0].contract_number, //ID único por usuario
                "country_code": 'BR'
            })
        }
    );

}

module.exports.authorizationService = async (req, res) => {

    const { subscriber_id,
        country_code,
        resource_id,
        action_id,
        ip_address } = req.query;

    let serviceId;
    switch (resource_id) {
        case 'urn:tve:noggin': // id Noggin
            serviceId = '2572'
            break;
        case 'urn:tve:paramountplus': // id Noggin
            serviceId = '2571'
            break;
    }

    const selectQuery = `SELECT
                            ci.*
                        FROM contract_items ci 
                            INNER JOIN contracts c ON c.id = ci.contract_id AND c.status IN (1)
                        WHERE c.contract_number = ${subscriber_id}
                            AND ci.deleted = 0
                            AND ci.service_product_id = ${serviceId}`

    db.select(selectQuery,
        function (err, result) {
            if (!result.length) return res.status(404).send({
                "access": false
            })
            return res.status(200).send({
                "access": true,
                "rating": "G",
                "ttl": 3600
               })
        }
    )
}
