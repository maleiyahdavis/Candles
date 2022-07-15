const client = require('../client');

async function createScent_Name(name) {
    try{
        const {rows:[scent]} = await client.query(`
            INSERT INTO scent_names(name)
            VALUES ${name}
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `)

        return scent
    } catch(error){
        console.error("Error creating scents");
        throw error
    }
}


module.exports = {
    createScent_Name
}