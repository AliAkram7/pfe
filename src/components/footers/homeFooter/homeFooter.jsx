import React from "react";
import './homeFooter.css'
import mapimg  from '../../../imges/Screenshot_20221126_202006.png'
import univImg from '../../../imges/univPic.png'
import { IconBrandFacebook, IconBrandGoogleDrive, IconBrandYoutube, IconLayersLinked } from "@tabler/icons";
function HomeFooter() {
  return (
    <footer  className="homeFooter" >
      <div className='univ-info'>
        <div className='location'>
          <div className='images'>
            <div className='location-img'>
              <img src={mapimg}  alt='' />
            </div>
            <div className='univ-img'>
              <img src={univImg} alt='' />
            </div>
          </div>

          <div className='contact-info'>
            <h4>mustapha  stambouli  university</h4>

            <div className='address'>Cheikh El Khaldi, Mascara 29000</div>

            <div className='tel'>
              <span>Telephone :</span>
              <br />
              045716689
            </div>

            <div className='email'>univ.mascara.dz</div>
          </div>
        </div>

        <hr />

        <div className='suivez-nous'>
          <h3>suivez nous :</h3>
          <ul>
            <li>
              {/* <i className='fa-brands fa-facebook-f fa-2x'></i> */}
              <IconBrandFacebook  size={30}  key='fb'  />
            </li>
            <li>
              {/* <i className='fa-brands fa-youtube fa-2x'></i> */}
              <IconBrandYoutube size={30}  key='yt' />
            </li>
            <li>
              {/* <i className='fa-brands fa-google-drive fa-2x'></i> */}
              <IconBrandGoogleDrive  size={30} key='gd'  />
            </li>
          </ul>
        </div>
      </div>
      <div className='copy-right'>
        <h5>© 2023 Université mascara | Tous droits réservés</h5>
      </div>
    </footer>
  );
}

export default HomeFooter;
