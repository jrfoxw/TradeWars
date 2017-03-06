/**
 * Created by PY-DEV on 3/1/2017.
 */
import Jimp from 'jimp';
import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import fs from 'graceful-fs';



// process images to sm, md, lg, xl



class processAvatar{
    constructor(){
        this.finalImage = "";
    }

    proccess(avatar, loc, slug){

        let avatarFolder = uuidV4();
        fs.mkdirSync('./public/avatars/'+avatarFolder);
        let pImage = loc+"/"+avatar;
        console.log(avatarFolder, pImage);

        // let fImage = avatar+"_sm.jpg".toString();
        // console.log('Final Image ',fImage);

        Jimp.read(pImage).then((image) =>{

            image.resize(32,32)
                .quality(80)
                .write(`./public/avatars/${avatarFolder}/${slug}_${avatar}_sm.jpg`);

        }).catch((err) =>{
            console.log("Error ",err);
        });

        Jimp.read(pImage,(err, image) =>{
            if(err) throw err;
            image.resize(64,64)
                .quality(80)
                .write(`./public/avatars/${avatarFolder}/${slug}_${avatar}_md.jpg`);
        });

        Jimp.read(pImage,(err, image) =>{
            if(err) throw err;
            image.resize(128,128)
                .quality(80)
                .write(`./public/avatars/${avatarFolder}/${slug}_${avatar}_lg.jpg`);
        });

        console.log('Conversion complete..')
    };



}

export default processAvatar;


