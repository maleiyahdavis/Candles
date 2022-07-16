const client = require('../client');

async function createScent_Name(name) {
    console.log(name.name)

    try{
        const {rows:[scent]} = await client.query(`
            INSERT INTO scent_name(name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name.name])
        console.log(scent)
        return scent
    } catch(error){
        console.error("Error creating scents");
        throw error
    }
}

async function getAllScentNames() {
    try{
        const {rows: scents} = await client.query(`
            SELECT *
            FROM scent_name;
        `)
        return scents
    } catch(error){
        console.error("Error getting all scent errors")
    }
}


module.exports = {
    createScent_Name,
    getAllScentNames
}