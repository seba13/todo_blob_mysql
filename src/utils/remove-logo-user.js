
import { dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'



import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(join(__filename))

/**
 * funcion que elimina el logo de usuario antiguo 
 * cuando cambia de avatar
 * @param {*} filename  
 */
export const removeLogoUser = async (fileName, fileExtension) => {

    const dir = join(__dirname, '../public/uploads')

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }


    fs.readdir(dir, (err, files) => {

        console.log("entra aca file");

        files.forEach(file => {
            let name = file.split('.').slice(0, -1).join('')
            let extension = extname(file)

            console.log(extension);
            console.log(fileExtension);


            if (fileName === name && extension !== fileExtension) {
                fs.unlink(join(dir, file), err => {
                    console.log(err);
                })
            }

        })
    })




}

/**
 * Redimensiona y optimiza la calidad de imagen
 * @param {*} filePath ruta de la imagen
 */
export async function optimizeImg(filePath) {

    console.log(filePath);

    try {
        console.log("ENTRANDO A SHARP OPTIMIZER");

        const buffer = await fs.promises.readFile(filePath)

        let resizedImage = undefined

        // cada informacion de fotograma de un gif se almacena en una pagina
        // se almacena en metadata().pages
        if (extname(filePath) === '.gif') {
            resizedImage = await sharp(buffer, { animated: true })
                .gif({
                    animated: true,
                    // colors: 64,
                    loop: 0,
                    lossy: false,
                    quality: 100
                })
                .resize({ width: 150, height: 150, fit: 'cover', position: 'top' })
                .toBuffer();

        }
        else {
            
            // cada cuadro de la animación se almacena como una "página" separada dentro del archivo WebP
            // si tiene mas de 1 quiere decir que es una imagen animada webp
            if (await (await sharp(buffer).metadata()).pages > 1) {

                console.log("entra en este if");

                resizedImage = await sharp(buffer, { animated: true })
                    .gif({
                        animated: true,
                        // colors: 64,
                        loop: 0,
                        lossy: false,
                        quality: 100
                    })
                    .resize({ width: 150, height: 150, fit: 'cover', position: 'top' })
                    .toBuffer();
            }else{
                resizedImage = await sharp(buffer, {
                    lossy: false,
                    quality: 100
                })
                    .resize({ width: 150, height: 150, fit: 'cover', position: 'top' })
                    .toBuffer();
            }
        }


        console.log("resizedImage");
        console.log(resizedImage);

        await fs.promises.writeFile(filePath, resizedImage)


        // obtener el nuevo buffer de imagen reducida
        return await fs.promises.readFile(filePath);

        // return resizedImage

    } catch (err) {

        if (err.code === 'ERR_INVALID_ARG_TYPE') {

            throw new Error('Error al encontrar ruta de imagen')
        } else {
            throw new Error(err)
        }

    }


}