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
      const atributosRequeridos = ['nombre', 'edad', 'fecha_ingreso', 'id_tipo_mascota'];
      //compara los atributos con los de atributosRequeridos
      const atributosExtra = Object.keys(mascota).filter(attr => !atributosRequeridos.includes(attr));
  
      try{ 
        //si tiene más atributos o menos atributos
      if ((atributosExtra.length > 0) ){
        return res.json({ error: `Atributos invalido: ${atributosExtra.join(' , ')}` });
      }
     
        const [result] = await pool.query(
          `INSERT INTO mascota (nombre, edad, fecha_ingreso, id_tipo_mascota) VALUES(?, ?, ?, ?)`,
          [mascota.nombre, mascota.edad, mascota.fecha_ingreso, mascota.id_tipo_mascota]
        );
        res.json({ "Id insertado": result.insertId });
      }catch (error) {
      console.log('Error al añadir mascota:', error);
    }
  }


async delete(req, res){
    const mascota = req.body; 
    const [result] = await pool.query(`DELETE FROM mascota WHERE id_mascota=(?)`, [mascota.id_mascota]); 
    res.json({"Registros eliminados": result.affectedRows});
}




async update(req, res){
  try {
      const mascota = req.body;
      const [result] = await pool.query(`UPDATE mascota SET nombre=(?), edad=(?), fecha_ingreso=(?), id_tipo_mascota=(?)`,[mascota.nombre, mascota.edad, mascota.fecha_ingreso, mascota.id_tipo_mascota]);
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

            const [result] = await pool.query('SELECT * FROM mascota WHERE id_mascota = ?', [id_mascota]);
            if (result [0]!= undefined) {
                res.json(result);
            } else {
                res.json({"error": "No se encontro mascota con el id especificado"}); 
            }
            } catch (e) {
      console.log(e);

    }
   } 


async deleteId(req, res){
    const mascota = req.body; 
    const id_mascota = parseInt(mascota.id_mascota);

    try{ 
    if ([id_mascota] != undefined) {
        return res.json({ error: `Atributos invalido: No se encontro la mascota con el id especificado` });
    }
    const [result] = await pool.query(`DELETE FROM mascota WHERE id_mascota=(?)`, [id_mascota]);
        res.json({"Registros eliminados": result.affectedRows});

    } catch (e) {
        console.log(e);
               }
   }
}




export const mascota = new MascotaController();