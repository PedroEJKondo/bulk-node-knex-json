const knex = require('../config/database');
const json = require('../file-json/comuna.json')

async function migrateData(trx) {
 
    let cont = 0
    for (const iterator of json) {
        cont = cont + 1
        trx.into('comunas')
            .insert({
                id: cont++,
                ...iterator,
                description: 'Criado automaticamente pelo sistema',
                created_at: new Date(),
                updated_at: new Date(),
            })
            .then(() => {
                trx.commit();
                console.log('Insert successful!');
            })
            .catch(() => {
                trx.rollback();
                console.log(' - Insert error!', iterator);
            });
    } 

}

async function main() {

    const trx = await knex.transaction();

    try {
        await migrateData(trx) 
    } catch (err) { 
        console.log(err); 
    }
    finally {
        console.log('Fim da migração da actualização dos dados !!!')
    }
}


main();
