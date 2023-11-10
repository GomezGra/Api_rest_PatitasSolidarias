import {pool} from './database.js';

class MascotaController{


    //funcionalidad para consulta y ver todos los campos de la tabla
    async getAll(req, res) {
      try {
        const [result] = await pool.query('SELECT * FROM mascota');
        res.json(result);
      } catch (error) {
        console.log('Error al obtener las mascotas:', error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }


// agregar mascota 
async add(req, res) {
      const mascota = req.body;
  
      // guarda los atributos validos
      const atributosRequeridos = ['nombre', 'edad', 'fecha_ingreso', 'id_tipo_mascota', 'estado'];
      //compara los atributos con los de atributosRequeridos
      const atributosExtra = Object.keys(mascota).filter(attr => !atributosRequeridos.includes(attr));
  
      try{ 
        //si tiene más atributos o menos atributos
      if ((atributosExtra.length > 0) ){
        return res.json({ error: `Atributos invalido: ${atributosExtra.join(' , ')}` });
      }
     
        const [result] = await pool.query(
          `INSERT INTO mascota (nombre, edad, fecha_ingreso, id_tipo_mascota, estado) VALUES(?, ?, ?, ?, ?)`,
          [mascota.nombre, mascota.edad, mascota.fecha_ingreso, mascota.id_tipo_mascota, mascota.estado]
        );
        res.json({ "Id insertado": result.insertId });
      }catch (error) {
      console.log('Error al añadir mascota:', error);
    }
  }


/* sync delete(req, res){
    const mascota = req.body; 
    const [result] = await pool.query(`DELETE FROM mascota WHERE id_mascota=(?)`, [mascota.id_mascota]); 
    res.json({"Registros eliminados": result.affectedRows});
}
 */



async update(req, res){
  try {
      const mascota = req.body;
      const [result] = await pool.query(`UPDATE mascota SET nombre=(?), edad=(?), fecha_ingreso=(?), id_tipo_mascota=(?), estado=(?) WHERE id_mascota=(?)`,[mascota.nombre, mascota.edad, mascota.fecha_ingreso, mascota.id_tipo_mascota, mascota.estado, mascota.id_mascota]);
      
      if (result.changedRows === 0) {
          throw new Error('No se encontró mascota con el ID proporcionado o los datos proporcionados ya existen.');
      }
      res.json({"Registros Actualizados": result.changedRows});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al actualizar la mascota, compruebe los campos requeridos.' });
  }
}



 async getOne(req, res) {
        try {
                const mascota = req.body
                const id = parseInt(mascota.id_mascota);

            const [result] = await pool.query('SELECT * FROM mascota WHERE id_mascota = ?', [id]);
            if (result [0]!= undefined) {
                res.json(result);
            } else {
                res.json({"error": "No se encontro mascota con el id especificado"}); 
            }
            } catch (e) {
      console.log(e);

    }
   } 


   async deleteID(req, res) {
    try {
      const mascota = req.body;
      const ID = parseInt(mascota.id_mascota);
  
      const [result] = await pool.query(`DELETE FROM mascota WHERE id_mascota = ?`, [ID]);
  
      if (result.affectedRows === 0) {
        return res.json({ "error": "No se encontró la mascota con el id indicado" });
      } else {
        res.json({ "Registros eliminados": result.affectedRows });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ "error": "Error en el servidor" });
    }
  }
}




export const mascota = new MascotaController();