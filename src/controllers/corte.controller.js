import {pool} from '../db.js'

export const getSede = async (req, res) => {
    try {
        
        const [rows] = await pool.query('SELECT * FROM SEDE')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }    
}

export const getSedes = async (req, res) => {    
    try {
        const [rows] = await pool.query('SELECT * FROM SEDE WHERE IN_ID_SEDE = ? ', [req.params.id])    
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'Corte not fount'
        })
        res.json(rows[0])
    } catch (error) {
        return  res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const createSede = async (req, res) => {
    const {IN_ID_USUARIO,VC_SEDE,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_ESTADO} = req.body

    try {           
    const [rows] = await pool.query('INSERT INTO SEDE (IN_ID_USUARIO,VC_SEDE,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_ESTADO) VALUES(?, ?, ?, ?, ?,?)', [IN_ID_USUARIO,VC_SEDE,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_ESTADO] )
    res.send({
        IN_ID_SEDE: rows.insertId,
        IN_ID_USUARIO,
        VC_SEDE,VC_DISTRITO,
        VC_PROVINCIA,
        VC_DEPARTAMENTO,
        VC_ESTADO
    })
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}

export const deleteSede = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM SEDE WHERE IN_ID_SEDE = ?', [req.params.id]) 
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Sede not fount'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}


export const updateSede = async (req, res) => {
    const {id} = req.params
    const { IN_ID_USUARIO,VC_SEDE,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_ESTADO} = req.body
       
    try {
        const [result] = await pool.query('UPDATE SEDE SET IN_ID_USUARIO = IFNULL(?, IN_ID_USUARIO), VC_SEDE =  IFNULL(?, VC_SEDE), VC_DISTRITO =   IFNULL(?, VC_DISTRITO), VC_PROVINCIA = IFNULL(?, VC_PROVINCIA), VC_DEPARTAMENTO = IFNULL(?, VC_DEPARTAMENTO)), VC_ESTADO = IFNULL(?, VC_ESTADO) WHERE IN_ID_CORTXMAN = ?', [IN_ID_USUARIO,VC_SEDE,VC_DISTRITO,VC_PROVINCIA,VC_DEPARTAMENTO,VC_ESTADO, id])
    
        console.log(result)
    
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Sede not found'
        })
    
        const [rows] = await pool.query('SELECT * FROM SEDE WHERE IN_ID_SEDE = ?', [id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message:  'Something goes wrong'
        })
    }
}

