import { Request, Response } from 'express'
import AddressController from '../controllers/address';
const addressController = new AddressController();


export class Routes {       
    public routes(app: any): void {     
        

        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/info/:address')
        .get(addressController.getAddressInfo);
      
    }
}